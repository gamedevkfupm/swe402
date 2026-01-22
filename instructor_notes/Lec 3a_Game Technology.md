By the end of this lecture I want students to be able to understnad: 

I want students to understand the tech side of things in game development including the needed hardware and software to build a game and play a game and how these affect the games they build such as refresh reate and graphics. 

Specifically I want to discuss:

- Hardware reqs for game dev
- Game engines & tools 
- Game consoles & controls

--------------------------------

The story is as follows: 
Game development is not only about the idea or the art, but it is about making the game feel good. In order to do that we need to understand the tech that will allow the game to run smoothly and feel good.

--------------------------------

Slides narrative:

Ok, now, all of you have greate ideas This is great, but not enough. You wanna make sure that you implement in a way that makes the game feel good and when I say feel good, I'm talking about pixels and frames and milliseconds. You wanted to look right on PC you want to look right on console and you wanted to look right on each and every screen that is played on. This is not easy. However, it can be done. And in order to achieve that level of details, you need to understand the software hardware and many technical concerts that will allow you to do that. Because believe it or not, All of what you have learned before and other courses, computer engineering and software engineering and programming, they all matter. 

-

In this lecture, I'm going to give a brief overview about the concept that you need to understand in order to make your game run smoothly. Specifically, we are going to discuss hardware requirements for development, game engines game, consoles, and controls. 

Let's start by looking at the following video clips of video games. A Tetris element falling, a Super Mario jump, A dark souls boss fight. 

The question is what is the difference between the three? What made the Tetris element fall slowly? Why are the graphics of super Mario do not look like dark souls can we actually play dark souls on an old console yes or no and why? What if we try to make a version of dark souls on an old machine what would be different? We will say it will become slow. The graphics will be less vibrant.
The sponsor rate will be low. What does that mean in technical terms? 

All of that goes back to hardware and software components. Things like CPU, GPU, RAM, SSD, Refresh rate, frames per second, Algorithm, Etc. And how they all work together to make the game run smoothly.

Think of it like a pipeline: hardware and software Determines what your engine can do, which determines what platform you can ship on which shapes the players experience like smoothness graphics, and help controlled feel. 

-

Let's start by discussing the hardware that matters for you as a game developer, CPU, GPU, RAM and Storage. The first thing that you want is that you want your belt to run quickly to isolate much faster to run your algorithms fast that's the role of the CPU. if you have a slow CPU Your code would take a very long time to compile and run. (? what about during the game ...). 

Then comes the GPU. The GP is what will show your graphics, including lightning, shaders environment, game, objects, and more. It's important, especially for 3-D games. So if you see that your game is slow on complex scenes, know that the problem is probably in the GPU. 

Then comes the random access memory (RAM), which, as you know, holds the temporary objects and assets that you are using currently in your current session. 

Storage or currently mostly the SSD, which will affect how fast can you load assets and open your project which for sure you don't wanna waste. 

-

A natural question comes after this is what is the minimum viable development set up that I need to have in order to develop games? The answer is it depends. Are you going to develop 2D games? 3-D games? iOS, mobile games, VR games, Small indie-games or AAA games. 

If you are building 2D and simple 3D games, then most development laptops will do the job. However, you are building a more complex 3-D game then you will need more powerful machine. The table below summarizes this very easy: 

[TABLE HERE]

-

So this is regarding hardware, What about software do I jump Directly to VS code and start building? do I have to use what we call a game engine? What is a game engine? Can I develop games without a game engine? What are the differences between game engines? Which one is better? How can I choose which one to use? 

Short answer no you don't have to use a game engine. Let's think of ping-pong for example. Think of it as a software. What are the different elements that ping-pong has? It has two bars, a ball, a score lable, an algorith to decide if a player hits the ball, an algorithm (aka a function) to control the opponent, a function to determine weather a player scores, and response to keyboard or mouse inputs, And finally, a sound that appears when the ball hits the bar. 

Can you build that using Java? Can you build it using C? Can you build it using python? Can you build using HTML, CSS and javascript? Yes, you can. 

So the question is, why do we need game engines? Short answer: effeciency. A game engine Is basically a bundle of systems you don't have to reinvent rendering physics, audio input, and the pipeline to build the game for different platforms. 

In order to build ping-pong from scratch, you will need to do the following steps: 

1. Write the code to render the game
2. Write the code to handle the physics
3. Write the code to handle the audio
4. Write the code to handle the input
5. Write the code to handle the output
7. Write the code to handle the UI
8. Write the code to handle the game logic

However, with a game engine, like Unity for example, you just need to focus on the game logic. The engine will handle the rest. Began logic

Finally, an important point to note is that game engines have downside also, like any library/framework/tool. Such as the learning curve, cost, overhead, and more. However, the benefits outweigh the drawbacks for most cases, especially for complex games.

Different engines come with different workflows and different expectations. For example, Unity is commonly used across many platforms and project types. Unreal is known for high-end visuals and big 3D workflows. Godot is lightweight and open source, and often easier to run on modest hardware.

The table below summarizes the differences between different engines:
[TABLE HERE]

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

[TABLE HERE]

-

All of what we've been talking about until now was on the developer side but what about the player side? Let's talk a little bit about consoles, and controls. 

What is a gaming console? Consoles are different for pieces in one major way they have fixed hardware and software. That means every player on that console family is roughly on the same performance budget. Which is actually good because you as a developer, you know specifically what are ther technical limitations and you can design your game accordingly. Unlike PC, which is a whole different story.

History of consoles and what have you is a long story and I would refer it to a video that did explain the history of consoles very well. Please watch the full video on your own time.

-

Of course, games come with controls to play them. When you design your game, you have to think: will the player use a mouse and keyboard, a game controller, a touchscreen, a VR headset, or a motion sensor? All of these options matter a lot and can dramatically change the game design experience.

The table below shows the different controls, their features and their advantages and disadvantages.

[TABLE HERE]

-

The final piece of hardware that I want to discuss is the Monitor. Monitor comes with a challenge, which is the refresh rate. And when people talk about refresh rate, they also talk about frames per second (FPS). These are two different things but they are related. 

So what are these and what is the difference between the two? How do they affect the game experience? What are some principles that we have to put in mind regarding the refresh rate and frame per second? 

Refresh reate is basically the number of times per second the screen can update, while FPS is the number of times per second the game can render a frame. 

Most modern game consoles, like the PS5 supports ..... ( NEEDS_RESEARCH )..

A challenge that happens between the game and the monitor is the syncronization between FPS and refresh rate ..... (NEEDS_RESEARCH)..

-

To conclude, a key takeaway is that you have to be aware of the specs of the hardware (GPU, CPU, RAM, SSD) and software, (Game engine, tools, controls, etc.) and the concepts related to them (FPS, Refresh rate, Sync, etc.) in order to produce a high quality game. 

I will leave you with a questions here: If you were to choose between high frame rate or high graphics quality, which one would you choose and why? 



--------------------------------

Interesting slides ideas:

- Connect each lever to a symptom:
• “Shader-heavy scene runs slow” → GPU bound
• “Build takes forever” → CPU/SSD bound
• “Editor crashes / stalls importing” → RAM bound 

- Tech reqs comparisor between different engines & non-engine.


--------------------------------

Questions:

- FPS vs Refresh rate
FPS is what the game makes. Refresh rate is what the screen can show.

- I want to see an example of stutter (a game running at 30 FPS but the screen is only showing 20 FPS)
....

- Then I want to see after applying VRR (Variable Refresh Rate):
....

- I want to see stutter vs tearing video
....

- What are some examples of games that have both performace mode vs hq mode? 
....

- where in Unity can I find the performance settings?
....

- If your game runs at 45 FPS on a 60Hz display, what do players notice first: blur, stutter, or input lag?
answer: stutter. justificaiton: the game is running at 45 FPS, but the screen is only showing 60 FPS, so the game is stuttering. meaning the game is not able to keep up with the screen's refresh rate. stutter is defined as a loss of frames, and is a symptom of a performance issue..

- RAM vs SSD roles?
SSD is the hard drive that the game is installed on. RAM is the temporary storage that the game uses to run.


