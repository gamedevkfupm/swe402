Goals of the lecuture:

Can we develop a game without a game engine?
Why do we need a game engine to begin with?
what are some examples of games built with known engines?
Do companies use game engines or have their own code? 
why do they do with their engines?
what other tools do they use?
what are the commonaliies between game engines?
What are some well known frameworks/pipelines?


--------------------------------

Welcome again, 

We've talkd about hardware last lecture, What about software? do I jump Directly to VS code and start building? do I have to use what we call a game engine? What is a game engine? Can I develop games without a game engine? What are the differences between game engines? Which one is better? How can I choose which one to use? 

Short answer no you don't have to use a game engine. Let's think of a simple game, ping-pong for example. Think of it as a software. What are the different elements that ping-pong has? It has two bars, a ball, a score lable, an algorith to decide if a player hits the ball, an algorithm (aka a function) to control the opponent, a function to determine whether a player scores, and response to keyboard or mouse inputs, And finally, a sound that appears when the ball hits the bar. 

Can you build that using Java? Can you build it using C? Can you build it using python? Can you build using HTML, CSS and javascript? Yes, you can. 

So the question is, why do we need game engines? Short answer: efficiency. A game engine Is basically a bundle of systems you don't have to reinvent: rendering, physics, audio input, and the pipeline to build the game for different platforms. 

/+
A game engine is also not only "code". It's usually two things: a runtime (the part that runs the game) and an editor (the part that lets you build levels/scenes, place objects, adjust lighting, tweak physics, connect animations, and test quickly).

Also, when we say “pipeline”, we mean the boring-but-important stuff: importing assets (models, textures, sounds), organizing them, converting them into game-ready formats, and then building the game for Windows, console, mobile, etc.
+/

So yes, you can do it from scratch, but the engine saves you a lot of time, and more importantly it saves your whole team time.

In order to build ping-pong from scratch, you will need to do the following steps: 

1. Write the code to render the game
2. Write the code to handle the physics
3. Write the code to handle the audio
4. Write the code to handle the input
5. Write the code to handle the output
6. Write the code to handle the UI
8. Write the code to handle the game logic

However, with a game engine, like Unity for example, you just need to focus on the game logic. The engine will handle the rest. 

Finally, an important point to note is that game engines have downside also, like any library/framework/tool. Such as the learning curve, cost, overhead, and more. However, the benefits outweigh the drawbacks for most cases, especially for complex games.

Different engines come with different workflows and different expectations. For example, Unity is commonly used across many platforms and project types. Unreal is known for high-end visuals and big 3D workflows. Godot is lightweight and open source, and often easier to run on modest hardware.

/+
Also, engines are different in how you interact with them:

Unity usually expects you to write gameplay in C# scripts, while using the editor to build scenes and connect components. (Unity Personal is free with eligibility limits, and Pro is required above certain revenue/funding thresholds.)

Unreal is famous for big 3D workflows, and it gives you Blueprints (visual scripting) and C++. Unreal’s standard game licensing is “free to start”, and royalties kick in after the first $1M USD in lifetime gross revenue (typical case).

Godot is lightweight, and it’s free and open source under the MIT license, so you can use it, modify it, and ship commercially without paying engine royalties. Godot scripting is often GDScript, but it also supports C# (with the .NET editor build).
+/

The table below summarizes the differences between different engines:
| Engine            | Best for                                             | How you build things                    | Code / scripting                               | Strengths                                                                    | Downsides / tradeoffs                                                                                                     |
| ----------------- | ---------------------------------------------------- | --------------------------------------- | ---------------------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Unity**         | 2D/3D, mobile, indie, cross‑platform, lots of genres | Drag-drop components + scenes + prefabs | Mostly **C#**                                  | Huge ecosystem + tutorials + asset store, very common for small/medium teams | Can feel “heavy”, learning curve, licensing/pricing terms matter for teams/businesses ([Unity][1])                        |
| **Unreal Engine** | High-end 3D, AAA style visuals, big worlds           | Editor + Blueprints + C++               | **Blueprints + C++**                           | Great visuals pipeline, strong tools, source access                          | Larger downloads, bigger builds, C++ complexity, higher hardware demands; royalties after thresholds ([Unreal Engine][2]) |
| **Godot**         | 2D, lightweight 3D, open-source workflows            | Nodes/scenes, simple iteration          | **GDScript**, **C#** (and more via extensions) | MIT license, small + fast, easy to run on modest hardware                    | Smaller ecosystem vs Unity/Unreal, fewer “enterprise” integrations ([Godot Engine][3])                                    |
| **GameMaker**     | 2D games (especially fast prototypes)                | Room editor + objects                   | **GML** (plus visual tools)                    | Very quick for 2D                                                            | Less “AAA 3D” focused                                                                                                     |
| **Construct**     | 2D, no‑code/low‑code                                 | Event sheets + editor                   | Visual logic                                   | Very fast to build                                                           | You trade power/flexibility for speed                                                                                     |

[1]: https://unity.com/products?utm_source=chatgpt.com "Unity Plans & Pricing: Pro, Personal, Enterprise, Industry"
[2]: https://www.unrealengine.com/en-US/license?utm_source=chatgpt.com "Unreal Engine (UE5) licensing options"
[3]: https://godotengine.org/license/?utm_source=chatgpt.com "License"


-


Now, let me ask you a question, Do companies use game engines or have their own code? Short answer: both.

Some studios use Unity/Unreal/Godot. Others build an engine in-house because it fits their games perfectly, and it becomes their “factory”.

Examples of companies with in-house engines:

- Ubisoft has Anvil, built for Assassin’s Creed style games.
Capcom has RE ENGINE, and they explicitly talk about engine + game teams upgrading it together.
- Guerrilla has Decima, powering big titles like Horizon and also used with Kojima Productions.
- EA has Frostbite, used across multiple EA studios.

Why do they do that?
Because engines are not just “graphics”. A company engine is:
- a long-term investment
- a way to standardize tools across teams
- a way to control performance and memory for specific game types
- a way to build custom workflows for designers, artists, animators, and QA

And even when a company uses Unreal, they often customize it heavily (one reason Unreal being available with source access matters).

-

Now, what are some examples of games built with known engines?

Unity examples:
- Among Us (Unity case study)
- Pokémon GO (there is even a dedicated “Unity Architecture in Pokémon Go” talk)
- Genshin Impact (engine listed as Unity)

Unreal examples:
- Epic literally describes Unreal as the tech they use to ship their own games (like Gears of War)
- Gears of War: E‑Day (announced as built in Unreal Engine 5)
- Tekken 7

Godot examples:
- Cassette Beasts (Godot showcase)
- Dome Keeper (Godot showcase)


- 

But put in mind that although there are many game engines, most of them actually have the same building blocks:

Most engines — even if they look different — share the same core ideas:

- A game loop (update → simulate → render)
- A way to represent a world: scene / level / map
- A way to represent objects: entities / nodes / actors / components
- Rendering (2D/3D drawing)
- Input (keyboard/mouse/controller/touch)
- Audio (music + sound effects) 
- Physics (collisions, triggers, rigidbodies — even if simple)
- Animation systems
- UI systems
- Asset management (importing, compressing, building)
- A build/export pipeline (make it run on a target platform)
- Debugging/profiling tools (so you can find performance problems)


-

But wait, Are we going to use game engines alone or are we going to use them with a set of other tools? For instance, are we going to write code inside of unity? Are we going to model our objects inside Unity? Are we going to create sounds inside of Unity? Or do we need specialized tools in order to build these? For sure, we will need specialized tools in order to build these. So unity is used along with other tools like Blender, Audacity, etc. Table below shows some of the most common tools used for the whole game development workflow. 

- 3D Modeling: 
- 2D Animation
- Audio Editing
- Video Editing
- Version Control
- Project Management
- Collaboration
- Communication
- Documentation
- Testing

| Part of the workflow     | Common tools                                      | Why it’s used                                 |
| ------------------------ | ------------------------------------------------- | --------------------------------------------- |
| 3D Modeling              | Blender, Maya, 3ds Max                            | Create models, UVs, props, environments       |
| 2D Art                   | Photoshop, Krita, Clip Studio Paint, Illustrator  | Sprites, UI, textures, concept art            |
| 2D Animation / Rigging   | Spine, DragonBones, Adobe Animate                 | Character rigs, 2D skeletal animation         |
| 3D Animation             | Maya, Blender, MotionBuilder                      | Character animation, retargeting, export      |
| Texturing / Materials    | Substance 3D Painter/Designer, Quixel Mixer       | PBR textures, smart materials                 |
| Audio Editing            | Audacity, Reaper                                  | Record, clean, and edit sounds                |
| Audio Middleware         | FMOD, Wwise                                       | Interactive audio (mixing, events, snapshots) |
| Video Editing / Trailers | DaVinci Resolve, Premiere Pro                     | Trailers, marketing videos                    |
| IDE / Code Editor        | VS Code, Visual Studio, Rider                     | Writing and debugging code                    |
| Version Control          | Git (+ GitHub/GitLab), Perforce                   | Track changes, team collaboration, rollback   |
| Project Management       | Jira, Trello, Notion                              | Tasks, sprint planning, tracking              |
| Collaboration            | GitHub, GitLab, Plastic SCM                       | Code reviews, merges, CI integration          |
| Communication            | Discord, Slack, Teams                             | Fast team communication                       |
| Documentation            | Notion, Confluence, Google Docs                   | Specs, notes, design docs                     |
| Testing / QA             | Playtesting builds, bug trackers, automated tests | Find crashes/bugs, verify fixes               |
| Profiling / Debugging    | RenderDoc, PIX, Unreal Insights                   | Find performance bottlenecks                  |


