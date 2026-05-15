---
title: "Multiple environments on same Service Fabric Cluster"
publishedOn: 2020-10-09
updatedOn: 2020-10-18
description: "How to deploy the same application type multiple times on the same Service Fabric cluster, to act like multiple environments"
---

When developing a service on [Azure Service Fabric](https://azure.microsoft.com/en-us/services/service-fabric/) you can work on your local cluster, it works quite well. You can decide between 1 or 5 node local cluster (check [how to prepare your development environment](https://docs.microsoft.com/en-us/azure/service-fabric/service-fabric-get-started) from Microsoft docs). But if you are part of a team, you probably want everyone on the team to access the cluster. In our team, we have deployed a cluster in Azure for this, we called it `dev` environment, but then you have the QA team that needs to test, but this environment is too volatile for that, one minute is fine and the next is gone after we deployed something that broke the application. We needed an `staging` environment but we didn't want to deploy another cluster (you need to pay for it and all that). 

### Deploying same application type multiple times on the same cluster

Follow these 2 steps to deploy the same application type multiple times on the same cluster, to act like multiple environments.

#### Parametrise any service URLs

If you have multiple services talking to each other, you need to parametrise any service URLs into your environment parameters file, in our `dev.xml` application parameters we'll have something like this

```xml
<Application 
    xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
    Name="fabric:/MyApp.dev" 
    xmlns="http://schemas.microsoft.com/2011/01/fabric">
  <Parameters>
     <Parameter Name="MyApiServiceOneUri" Value="fabric:/MyApp.dev/ServiceOne" />
     <Parameter Name="MytActorUri" Value="fabric:/MyApp.dev/ActorOne" />
  </Parameters>
</Application>
```
and below is our `staging.xml` parameters file

```xml
<Application 
    xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
    Name="fabric:/MyApp.staging" 
    xmlns="http://schemas.microsoft.com/2011/01/fabric">
  <Parameters>
     <Parameter Name="MyApiServiceOneUri" Value="fabric:/MyApp.staging/ServiceOne" />
     <Parameter Name="MytActorUri" Value="fabric:/MyApp.staging/ActorOne" />
  </Parameters>
</Application>
```

The important thing to notice from both parameters files above is the name of your application, we added a suffix with the environment name, in this case `.dev` and `.staging`, and used the right URIs for same app services and actors.

#### Use different ports

If you are specifying ports explicitly in your service endpoints, then you need to be sure to use different ports for your different environments. We could add another parameter in our 'dev.xml' and 'staging.xml' parameters files.

```xml
<Application 
    xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
    Name="fabric:/MyApp.staging" 
    xmlns="http://schemas.microsoft.com/2011/01/fabric">
  <Parameters>
     <Parameter Name="MyApiServiceOneUri" Value="fabric:/MyApp.staging/ServiceOne" />
     <Parameter Name="MyApiServiceOnePort" Value="9051" />
     <Parameter Name="MytActorUri" Value="fabric:/MyApp.staging/ActorOne" />
  </Parameters>
</Application>
```

When picking static ports remember this:

> "*By design static ports should not overlap with application port range specified in the ClusterManifest. If you specify a static port, assign it outside of application port range, otherwise it will result in port conflicts*" *([Specify resources in a service manifest](https://docs.microsoft.com/en-us/azure/service-fabric/service-fabric-service-manifest-resources#endpoints))*.

To use the port from your parameters file in your service, you can add a `ResourceOverride` section in the `ApplicationManifest` as indicated in the [Service Fabric endpoint override docs](https://docs.microsoft.com/en-us/azure/service-fabric/service-fabric-service-manifest-resources#overriding-endpoints-in-servicemanifestxml). Locate the `ServiceManifestImport` of the service you want to override the endpoint port and add the `ResourceOverride` section.

```xml
<ResourceOverrides>
   <Endpoints>
      <Endpoint Name="ServiceEndpoint" Port="[MyApiServiceOnePort]" />
   </Endpoints>
</ResourceOverrides>
```

Also, remember to declare the parameters at the top of the `ApplicationManifest` file.

```xml
<Parameters>
    <Parameter Name="MyApiServiceOnePort" DefaultValue="9999" />
</Parameters>
```
And that's it, ready to deploy 🚀



