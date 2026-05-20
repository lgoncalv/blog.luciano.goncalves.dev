---
title: "Wikidata dumps and Neo4j - Day 3"
publishedOn: 2026-05-20
description: "Today I swapped the disks and changed the Neo4j configuration to use the new disk for data storage. The disk upgrade didn't go as expected, but I managed to get it working by plugging the new disk as an external drive."
---

The disk upgrade didn't go as expected (as usual). I used `dd` to clone the disk, but when I swapped the disks, the new one wasn't bootable. For some reason, the BIOS recognized the new disk randomly, so every other boot it would see the disk and sometimes it wouldn't. After some reading, this might be because this is such an old PC/BIOS that it doesn't support it. I might try to update the BIOS at some point, but for now, I swapped the disks back and plugged the new one as an external drive.

Next step was to change `neo4j` to use the new disk for data storage, in my case neo4j is running on a docker container, so I just had to change the volume mapping to point to the new disk. After that I just started the workers again and they are now writing to the new disk.

I'll post another update in a couple of days to see how the new disk is performing.
