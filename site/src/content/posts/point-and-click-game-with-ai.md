---
title: "Why I'm making a point-and-click game with AI"
publishedOn: 2026-08-04
description: "My first game was a simple numbers game for my daughter, built with a book, libgdx and Corona SDK. Now I'm starting a point-and-click adventure with AI help."
---

As a developer, who hasn't thought about making a game? I think most of us have. I had a go a long time ago with something very simple, this was around 15 years ago I think.

Again, like probably many dad developer with a young child, I had the perfect excuse: "there are no good educational games out there", or they are "full of ads". So I embarked on a journey with a friend to make a game for my daughter.

## Chamo Games

My friend is a very talented designer. He did all the drawings, I did all the code. We named our little studio: **Chamo Games**, to add that Venezuelan mark ;) 

The first game was called **Numbers at Home**. A very simple game for kids to get familiar with numbers, all the way to 20. Nothing fancy, and that was exactly the point.

## Three frameworks, one game

We ended up building the same game three times, each time on a different framework.

### 1. The framework from the book

The first version was built with the framework from [Beginning Android Games](https://www.waterstones.com/book/beginning-android-games/mario-zechner/9781430230427), by Mario Zechner, [badlogic on X](https://x.com/badlogicgames). Looking back, it was very good to understand how 2D games work: game loop, sprites, rendering, the works. You learn a lot when you type a whole game engine following a book.

### 2. libgdx

But the book's framework was for learning, not for shipping. So we ported the game to [libgdx](https://libgdx.com/), the free, open-source Java game framework, also by Mario Zechner. It runs on Android, iOS, desktop and the web, which meant one codebase for all the stores.

### 3. Corona SDK

And then we ported it again, this time to [Corona SDK](https://solar2d.com/), a Lua-based 2D engine, the project that later became Solar2D when it was open sourced. For a simple 2D game like ours, iterating in Lua was so much faster.

## The release

The game made it to a lot of stores at the time: the Play Store, the App Store, and other smaller Android stores. We had no ads (as far as I can remember), but we did have a free version and a paid version.

We were very excited when a small school bought the game. It happened on the App Store, through [Apple's Volume Purchase Program for Education](https://developer.apple.com/news/?id=08092010a), which let schools buy apps in bulk.

But over time it got hard to keep up with the changes. Store policies, OS updates, new screen sizes, keeping a game alive across stores and platforms takes real time. We started a second game, but it wasn't really producing any money, so we didn't spend more time on it. Sadly, we abandoned it and stopped the development of the second one.

## Why I'm telling you all this

Because I'm thinking about starting a new game. This time, it's for me.

When I was a teenager I loved point-and-click games: [The Secret of Monkey Island](https://en.wikipedia.org/wiki/The_Secret_of_Monkey_Island), [Full Throttle](https://en.wikipedia.org/wiki/Full_Throttle_(1995_video_game)), [Day of the Tentacle](https://en.wikipedia.org/wiki/Day_of_the_Tentacle). The story, the puzzles, the humour.

With AI help these days, you don't need as much time as before. I've been experimenting with [pi](https://github.com/earendil-works/pi), the AI agent harness (I wrote about it [here](/post/oh-my-pi-first-impressions)), and building a whole game with it feels... possible.

The plan is to build it in [Godot](https://godotengine.org/), the free and open-source game engine. For a 2D point-and-click adventure, it's a great fit.

The hardest part, I think, is the story. So that's what I'm working on right now, figuring out the story.

And by the way, Mario (the guy from the book at the begining of the post and the creator of libgdx) is also the creator of [pi](https://github.com/earendil-works/pi), the AI harness I've been using.

I'll share the game story when I have something...
