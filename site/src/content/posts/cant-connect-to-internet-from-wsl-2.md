---
title: "Can't connect to internet from WSL 2?"
publishedOn: 2020-05-22
updatedOn: 2020-10-09
description: "If you are using WSL 2 and can't connect to the internet, here is what worked for me to fix it"
---

Seems to be pretty common, check below what worked for me, found it in [this WSL GitHub issue comment](https://github.com/microsoft/WSL/issues/4275#issuecomment-632596425)

From `cmd` execute
``` cmd
netsh winsock reset
netsh int ip reset all
netsh winhttp reset proxy
ipconfig /flushdns
```
From `WSL` execute
``` bash
sudo bash -c 'echo "nameserver 8.8.8.8" > /etc/resolv.conf'
sudo bash -c 'echo "nameserver 8.8.4.4" >> /etc/resolv.conf'
```