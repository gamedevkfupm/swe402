#!/usr/bin/env python3
"""Validate structural invariants for an SWE 402 Unity learning article."""

from __future__ import annotations

import argparse
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlparse


class ArticleParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.counts: dict[str, int] = {}
        self.ids: set[str] = set()
        self.id_list: list[str] = []
        self.images: list[dict[str, str]] = []
        self.video_posters: list[str] = []
        self.links: list[dict[str, str]] = []
        self.meta_description = ""
        self.in_title = False
        self.title_parts: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = {key: value or "" for key, value in attrs}
        self.counts[tag] = self.counts.get(tag, 0) + 1
        if values.get("id"):
            self.ids.add(values["id"])
            self.id_list.append(values["id"])
        if tag == "video" and values.get("poster"):
            self.video_posters.append(values["poster"])
        if tag == "img":
            self.images.append(values)
        elif tag == "a":
            self.links.append(values)
        elif tag == "meta" and values.get("name", "").lower() == "description":
            self.meta_description = values.get("content", "").strip()
        elif tag == "title":
            self.in_title = True

    def handle_endtag(self, tag: str) -> None:
        if tag == "title":
            self.in_title = False

    def handle_data(self, data: str) -> None:
        if self.in_title:
            self.title_parts.append(data)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Validate a Unity lecture index.html file.")
    parser.add_argument("article", type=Path, help="Path to the lecture index.html.")
    return parser.parse_args()


def local_asset_path(article: Path, src: str) -> Path | None:
    parsed = urlparse(src)
    if parsed.scheme in {"http", "https", "data"} or src.startswith("#"):
        return None
    if parsed.scheme == "file" or Path(unquote(parsed.path)).is_absolute():
        return Path("/__invalid_absolute_path__")
    return (article.parent / unquote(parsed.path)).resolve()


def main() -> int:
    article = parse_args().article.expanduser().resolve()
    errors: list[str] = []
    warnings: list[str] = []

    if not article.is_file():
        print(f"ERROR: file not found: {article}")
        return 1

    text = article.read_text(encoding="utf-8")
    parser = ArticleParser()
    parser.feed(text)

    title = "".join(parser.title_parts).strip()
    if not title:
        errors.append("Missing document title.")
    if len(parser.meta_description) < 40:
        errors.append("Meta description is missing or too short.")
    if parser.counts.get("h1", 0) != 1:
        errors.append("The page must contain exactly one h1.")
    if parser.counts.get("article", 0) != 1:
        errors.append("The page must contain exactly one article element.")
    duplicate_ids = sorted({item for item in parser.id_list if parser.id_list.count(item) > 1})
    for duplicate_id in duplicate_ids:
        errors.append(f"Duplicate id: {duplicate_id}.")

    required_ids = {
        "top",
        "readingProgress",
        "themeToggle",
        "themeLabel",
        "resetProgress",
    }
    for required_id in sorted(required_ids - parser.ids):
        errors.append(f"Missing required id: {required_id}.")

    lecture_slug = article.parent.name
    if lecture_slug != "reference-page":
        expected_progress_key = f'"{lecture_slug}-article-progress"'
        if expected_progress_key not in text:
            errors.append(
                f"Progress-storage key must match the lecture slug: {lecture_slug}-article-progress."
            )

    required_fragments = [
        ':root[data-theme="dark"]',
        "prefers-color-scheme: dark",
        "unity-editor-reference-theme",
        "@media (max-width: 960px)",
        "@media (max-width: 680px)",
        "@media print",
        "<aside class=\"toc\"",
    ]
    for fragment in required_fragments:
        if fragment not in text:
            errors.append(f"Missing design or interaction contract fragment: {fragment}")

    breakout_match = re.search(
        r"\.source-figure\.breakout\s*\{(?P<body>.*?)\}", text, flags=re.DOTALL
    )
    if breakout_match and re.search(r"margin-left\s*:\s*-", breakout_match.group("body")):
        errors.append("Breakout figures must not use a negative left margin.")

    if re.search(r"(?:src|href)=[\"']file:", text, flags=re.IGNORECASE):
        errors.append("file:// URLs are not portable to GitHub Pages.")

    responsive_tables = re.findall(
        r'<table\b[^>]*class=["\'][^"\']*(?:window-table|shortcut-table)[^"\']*["\'][^>]*>(.*?)</table>',
        text,
        flags=re.DOTALL | re.IGNORECASE,
    )
    for table_index, table_html in enumerate(responsive_tables, start=1):
        cells = re.findall(r"<td\b([^>]*)>", table_html, flags=re.IGNORECASE)
        for cell_index, attributes in enumerate(cells, start=1):
            if not re.search(r'\bdata-label\s*=\s*["\'][^"\']+["\']', attributes):
                errors.append(
                    f"Responsive table {table_index}, cell {cell_index} is missing data-label."
                )

    if re.search(
        r"\.window-table[^{}]*nth-child\(3\)[^{]*\{[^}]*display\s*:\s*none",
        text,
        flags=re.DOTALL | re.IGNORECASE,
    ):
        errors.append("Responsive tables must not hide their third column on mobile.")

    referenced_local_images: set[Path] = set()
    for index, image in enumerate(parser.images, start=1):
        src = image.get("src", "").strip()
        alt = image.get("alt", "").strip()
        if not src:
            errors.append(f"Image {index} has no src.")
            continue
        if not alt:
            errors.append(f"Image {src} has empty alt text.")
        local_path = local_asset_path(article, src)
        if local_path == Path("/__invalid_absolute_path__"):
            errors.append(f"Image uses an absolute local path: {src}")
        elif local_path is not None and not local_path.is_file():
            errors.append(f"Referenced image does not exist: {src}")
        elif local_path is not None:
            referenced_local_images.add(local_path)

    for poster in parser.video_posters:
        local_path = local_asset_path(article, poster)
        if local_path == Path("/__invalid_absolute_path__"):
            errors.append(f"Video poster uses an absolute local path: {poster}")
        elif local_path is not None and not local_path.is_file():
            errors.append(f"Referenced video poster does not exist: {poster}")
        elif local_path is not None:
            referenced_local_images.add(local_path)

    assets_dir = article.parent / "assets"
    image_suffixes = {".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".avif"}
    if assets_dir.is_dir():
        for asset in sorted(path for path in assets_dir.rglob("*") if path.is_file()):
            if asset.suffix.lower() in image_suffixes and asset.resolve() not in referenced_local_images:
                errors.append(f"Unused image asset: {asset.relative_to(article.parent)}")

    external_links = 0
    for link in parser.links:
        href = link.get("href", "")
        if href.startswith("#") and href[1:] not in parser.ids:
            errors.append(f"Internal link points to a missing id: {href}")
        if href.startswith(("http://", "https://")):
            external_links += 1
            if link.get("target") != "_blank":
                warnings.append(f"External link does not open in a new tab: {href}")
            if "noreferrer" not in link.get("rel", "").split():
                warnings.append(f"External link is missing rel=noreferrer: {href}")

    if not parser.images:
        warnings.append("The article contains no screenshots.")
    if not external_links:
        warnings.append("The article contains no external source links.")

    for warning in warnings:
        print(f"WARNING: {warning}")
    for error in errors:
        print(f"ERROR: {error}")

    if errors:
        print(f"FAILED: {len(errors)} error(s), {len(warnings)} warning(s).")
        return 1

    print(
        f"PASS: {article} ({len(parser.images)} image(s), "
        f"{external_links} external link(s), {len(warnings)} warning(s))."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
