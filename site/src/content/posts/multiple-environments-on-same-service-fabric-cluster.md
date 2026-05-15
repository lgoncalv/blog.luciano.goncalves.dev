---
title: "Multiple environments on same Service Fabric Cluster"
publishedOn: 2020-10-09
updatedOn: 2020-10-18
description: "How to deploy the same application type multiple times on the same Service Fabric cluster, to act like multiple environments"
---

When developing a service on [Azure Service Fabric](https://azure.microsoft.com/en-us/services/service-fabric/) you can work on your local cluster, it works quite well. You can decide between 1 or 5 node local cluster (check [how to prepare your development environment](https://docs.microsoft.com/en-us/azure/service-fabric/service-fabric-get-started) from Microsoft docs). But if you are part of a team, you probably want everyone on the team to access the cluster. In our team, we have deployed a cluster in Azure for this, we called it `dev` environment, but then you have the QA team that needs to test, but this environment is too volatile for that, one minute is fine and the next is gone after we deployed something that broke the application. We needed an `staging` environment but we didn't want to deploy another cluster (you need to pay for it and all that). 

#### Deploying same application type multiple times on the same cluster

Follow these 2 steps to deploy the same application type multiple times on the same cluster, to act like multiple environments.