# Completed core reference scene

Use after implementing sections 01–08. This is a worked reference, not a starter.

1. Create a fresh Unity 6.3 Built-In project. Install Input System and uGUI if absent.
2. Enable Input System Package (New) in Player settings and accept the Editor restart.
3. Import completed-reference.unitypackage. Do not import alongside another copy of Target, GameManager or DifficultyButton.
4. Add tags Bad and DestroyZone in Project Settings → Tags and Layers if not already present. Assign Bad to the Bad 1 prefab and DestroyZone to Sensor. Packages do not include project tag settings.
5. Open Assets/Scenes/User Interface.unity and add it to the active Build Profiles scene list.
6. Press Play, choose a difficulty, click good and bad targets, miss a good target and restart.

The scene includes the same final scripts, Canvas, menu, score, restart, target prefabs and dependent course assets. It uses a neutral camera background instead of the official decorative scene backdrop. The full chapter explains how to import and replace that backdrop. The supplied models have simple root box colliders for a reproducible reference; adapt their bounds when replacing artwork.

Verification in Unity 6000.3.2f1 with Input System 1.17.0 and uGUI 2.0.0: 14 automated Play-mode checks passed. These exercised title state, a difficulty listener, Easy timing, coroutine spawning, an injected Input System mouse press with real Physics.Raycast, particle instantiation, negative score, bad/good sensor outcomes, post-game scoring, pending-wait spawning, the persistent restart event, Hard timing and a second restart. This does not claim that the asset lab or human user testing was performed for the learner.

All four core script checkpoints, the challenge repair scripts and optional timer variant compile against the same Unity references. Challenge scene Inspector changes are taught separately.
