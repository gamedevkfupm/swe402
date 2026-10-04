#!/usr/bin/env python3
"""Copy the approved Unity lecture reference into a new lecture directory."""

from __future__ import annotations

import argparse
import shutil
from pathlib import Path


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Scaffold a Unity learning article from the semester reference page."
    )
    parser.add_argument(
        "--output",
        required=True,
        type=Path,
        help="New lecture directory, normally learning_material/<lecture-slug>.",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    skill_dir = Path(__file__).resolve().parent.parent
    source = skill_dir / "assets" / "reference-page"
    output = args.output.expanduser().resolve()

    if not source.is_dir():
        raise SystemExit(f"Reference page is missing: {source}")
    if output.exists():
        raise SystemExit(
            f"Refusing to overwrite existing path: {output}. Edit it in place instead."
        )

    output.parent.mkdir(parents=True, exist_ok=True)
    shutil.copytree(source, output)
    print(f"Scaffolded Unity lecture at {output}")
    print("Replace all reference content, identifiers, progress keys, links, and unused assets.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
