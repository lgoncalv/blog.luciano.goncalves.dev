---
title: "Search Non-ASCII characters"
publishedOn: 2019-10-23
updatedOn: 2019-10-24
description: "How to find non-ASCII characters in your code using the regex pattern [^\\x00-\\x7f] in VS Code with regex mode enabled."
---

I can't remember where I got this one, but here it is:

```
[^\x00-\x7f]
```

Just be sure to search using regular expressions.

![Visual Studio Code regular expression search](./search-non-ascii-characters.png)
