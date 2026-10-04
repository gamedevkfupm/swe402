# Content and Source Workflow

## Source priority

1. Instructor notes determine lecture scope, emphasis, demonstrations, and required practice.
2. Supplied Unity Learn pages determine current terminology, UI paths, controls, and procedural details.
3. Official Unity documentation may resolve missing or ambiguous technical details.
4. Do not use third-party tutorials unless the user requests them or official sources are insufficient.

Browse every supplied link. Note the Unity version in the URL or page and preserve meaningful version differences. Paraphrase source text; do not reproduce long passages.

## Source map

Before drafting, create an internal mapping with these fields:

- source URL or instructor-note fragment;
- concept students must understand;
- operation students must perform;
- screenshot or video needed, including the demonstrated actions and prerequisites;
- destination action group and exact substep range, in teaching order;
- verification evidence.

Use the map to account for each source and instructor requirement. A source unit is a pool of material, not a requirement to teach every topic. Record exclusions internally when narrowing scope. Do not expose the map unless the user asks.

## Lecture structure and teaching policy

Follow `teaching-contract.md` for the established course requirements. Start with a verified finished-result video and observation-based curiosity questions, followed by a contextual conceptual overview, then preparation and guided work, required applied tasks, completion criteria, sources, and a clear What to submit section. Put relevant visible refreshers and optional FAQs at the end of practical sections. Place up to 10 focused questions at relevant new-concept checkpoints after their explanations, with feedback on checked answers, saved progress, and a printable results export.

Keep everything in one scrolling article. Aim for approximately one hour of high-value new learning, with pre-class setup explicitly identified. Every required task needs a deliverable, procedure, observable evidence, and persistent completion controls. Do not automatically generate optional extensions.

Use the opening concepts as a first-exposure overview: explain the idea, its purpose, and observable examples without requiring prior familiarity with it. Follow the teaching sequence in `teaching-contract.md`; reserve technical mechanisms for the relevant post-step explanations. In each practical section, give a brief introduction, then numbered action groups with numbered individual substeps. After each group and its horizontal expandable video-reference row, teach the result and necessary concepts in a plain, flush-left subsection. Use short paragraphs and technical labels. Preserve complete self-sufficient instructions without reproducing the whole source tutorial.

## Technical teaching patterns

Use these patterns when the source material supports them:

- **System model:** map visible results to the assets, GameObjects, components, or settings that produce them.
- **Responsibility split:** separate easily confused layers such as geometry, appearance, collision, and motion.
- **Controlled test:** ask students to run the incomplete state, observe one failure, add one configuration, and test again.
- **Failure diagnosis:** connect an observable symptom to the likely missing component or incorrect setting.
- **Reusable-definition workflow:** configure one correct object, create a prefab, then instantiate or edit the shared definition.
- **Completion evidence:** describe what students should see or be able to explain, not only which steps they clicked.
- **Task synthesis:** combine the major concepts in the required applied task, then change one meaningful condition in further applied work so students must reason rather than repeat clicks.

Do not force every pattern into every lecture. Choose the smallest set that clarifies the supplied material.

## Screenshots and video

- Include screenshots only when they help locate a control, window, hierarchy, gizmo, or expected result.
- Store screenshots locally in `assets/`; do not hotlink source images.
- Crop only when the surrounding interface adds no context.
- Keep the Unity UI legible and provide specific alt text and a source attribution in the caption.
- Inspect official tutorial steps for relevant videos and record their lecture-step mapping. Embed them according to the teaching contract, retaining direct source and fallback links. Use official remote video URLs; do not download remote videos merely to embed them. Verify caption URLs before adding tracks.
- Never fabricate a screenshot or show a control that is absent from the cited Unity version.

## Append mode

When the user provides more material for an existing lecture:

- preserve completed sections and student progress keys;
- add new dependency-ordered sections before completion criteria;
- update section numbers, table-of-contents links, outcomes, and sources;
- remove duplicate explanations;
- keep the lecture as one article.
