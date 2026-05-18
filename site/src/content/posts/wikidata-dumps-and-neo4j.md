---
title: "Wikidata dumps and Neo4j"
publishedOn: 2026-05-18
description: "Wikidata dumps contain all the info you need. They are huge files compressed in bz2 format. They recommend using JSON dumps, but they also have XML dumps. I've downloaded the latest JSON one, it's 94.2GB, and the good thing is that each line is a JSON object, so it's easy to stream and process."
---

Wikidata dumps contain all the info you need. They are huge files compressed in bz2 format. They recommend using JSON dumps, but they also have XML dumps. I've downloaded the latest JSON one, it's 94.2GB, and the good thing is that each line is a JSON object, so it's easy to stream and process.

I've written a script to process it, and it's currently running. It has processed 4 million lines. Lots of things are ignored in my logic, but it has already added more than a million nodes to my `neo4j` graph DB, currently sitting at 16 million nodes and 56 million relationships.

Now that I'm using the dump file instead of API calls, this is going very fast, which made me realize my setup might not be able to handle all this data. Neo4j is currently running on an old HP ProDesk Mini with 16GB of RAM and a 240GB SSD (that's the only thing that machine is doing), and it's already down to 166GB left. I think I'll be ordering a 1TB SSD soon to replace the current one.

This graph DB is the backbone of a couple of pet projects, links at the bottom of this post. Bear in mind Wikidata is crowdsourced and not always accurate. I jump in now and then on Wikidata and add/edit some info.

There is the [Timelines Website](https://timeline.cronologia.co.uk), currently with just a handful of timelines, and the [Family tree website](https://tree.cronologia.co.uk), with some recommended collections, but it also allows you to search for any person (as long as they are in the graph) and see their family tree. Some people have a summary and video generated with AI based on the node relationships with other people, places, and events.