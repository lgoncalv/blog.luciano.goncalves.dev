---
title: "Wikidata Dump file processing finished!"
publishedOn: 2026-05-24
description: "Wikidata dump processing is complete: 120M+ lines processed into Neo4j with current node, edge, and queue backlog statistics."
---

The app processing the Wikidata dump file finished today! It took less than a week, even with pauses in the middle to correct some issues. I still need to run some cleanup (duplicated edges or relationships) and wait for all messages to be processed.

Latest numbers:

* `120,266,937` lines processed
* `86,371,957` nodes
* `259,702,039` edges
* `14,525` messages behind in the nodes topic
* `3,913,389` messages behind in the edges topic
* I've used `7%` of the new disk (around `127 GB`)

I will now work on a dedup script to remove duplicated relationships, and then wait for all messages to be processed before sharing more updates.