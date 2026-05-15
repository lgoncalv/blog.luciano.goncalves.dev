---
title: "Azure Service Fabric in production"
publishedOn: 2020-02-04
---

It's been a while since we deployed our first project to a Service Fabric cluster at work.

I'd like to share what we've done and the bits we've learned in the process.

The first thing...

## Deploying the cluster

We had to create a cluster and we had to be able to recreate exactly the same cluster quickly and with minimum effort, using Azure Portal interface was not an option, an [ARM template](https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-group-authoring-templates) was the way to go.

We based our cluster template on one of [Ivan Gavryliuk's templates](https://github.com/aloneguid/pluralsight-using-azureservicefabric-in-production), I recommend his Pluralsight course [Using Azure Service Fabric in Production](https://app.pluralsight.com/library/courses/azure-service-fabric-production). Ivan's powershell script will create the resource group (if needed), [key vault](https://azure.microsoft.com/en-gb/services/key-vault/), import certificate and then apply the ARM template.

You can find more template examples on [Azure Samples repository](https://github.com/Azure-Samples/service-fabric-cluster-templates) on GitHub.

Your template will change based on your needs, like operating system, VM size, load balancer, durability tier, et cetera. I'll describe the changes we've done in the template and powershell scripts.

### Load balancer

In our case we use two Azure load balancers, a public load balancer for cluster management and a private one with rules to expose the services we need to access from our private virtual network, we use an nginx load balancer as a reverse proxy for the services that need to be accessed from internet.

Check the load balancers configuration on this [gists](https://gist.github.com/lgoncalv/7ddce5e9b1a9443c3bbe7b491f799cd3).

### Docker images cleanup

After a couple of months of pushing upgrades to a container based service in our staging cluster we ran into disk space problems, if you are going to run containers in your cluster and don't want to login to each node to prune your docker images you will need a couple of settings.

* *PruneContainerImages* if set to true will:
> Remove unused application container images from nodes. When an ApplicationType is unregistered from the Service Fabric cluster, the container images that were used by this application will be removed on nodes where it was downloaded by Service Fabric. The pruning runs every hour, so it may take up to one hour (plus time to prune the image) for images to be removed from the cluster.
Service Fabric will never download or remove images not related to an application. Unrelated images that were downloaded manually or otherwise must be removed explicitly.

* *ContainerImagesToSkip* will prevent the deletion of the listed images

More info about this settings can be found [here](https://docs.microsoft.com/en-us/azure/service-fabric/service-fabric-cluster-fabric-settings#hosting) and [here](https://github.com/MicrosoftDocs/azure-docs/blob/master/articles/service-fabric/service-fabric-get-started-containers.md). This is how the settings look like on the template.


```json
{
    "fabricSettings": [
        {
            "name": "Hosting",
            "parameters": [
                {
                    "name": "PruneContainerImages",
                    "value": "True"
                },
                {
                    "name": "ContainerImagesToSkip",
                    "value": "microsoft/windowsservercore|microsoft/nanoserver"
                }
            ]
        }
    ]
}
```


### Service instance count

Another problem we ran into was changing the instance count when upgrading an application, suppose you deployed your application for the first time on your cluster with `InstanceCount="2"` and later you realise you actually need one instance of your service running on every node, so you change it to `InstanceCount="-1"` and deploy just to receive something like:

```bash
Start-ServiceFabricApplicationUpgrade : Default service descriptions can not be modified as part of upgrade.
To allow it, set EnableDefaultServicesUpgrade to true.
``` 

And that's all you need to do actually, just add it to the cluster settings on your template as below.



```json
{
    "fabricSettings": [
        {
            "name": "ClusterManager",
            "parameters": [
                {
                    "name": "EnableDefaultServicesUpgrade",
                    "value": "true"
                }
            ]
        }
    ]
}
```

You can read a bit more about the behaviour of changing default services during application upgrades [here](https://docs.microsoft.com/en-us/azure/service-fabric/service-fabric-application-upgrade#upgrade-default-services).


### Security

There is a good article from Microsoft describing all the [cluster security scenarios](https://docs.microsoft.com/en-us/azure/service-fabric/service-fabric-cluster-security)

In our case, we use:

* Wildcard certificate for server identity and SSL encryption of http communication
* Self signed client certificates for users and Azure DevOps Pipelines.

The powershell script to prepare for cluster deployment looks really similar to [Ivan's script](https://github.com/aloneguid/pluralsight-using-azureservicefabric-in-production/blob/master/M8/prepare.ps1). Instead of uploading a self signed certificate to the Vault we upload our wildcard certificate and create 3 self signed certificates for client access:

* Read only access
* Admin access
* Another admin access for DevOps Pipelines

```powershell
. "$PSScriptRoot\..\Common.ps1"

# The declare come variables
$ResourceGroupName = "everything-sfcluster"
$Location = "North Europe"
$KeyVaultName = "cluster-vault"

# Check that you're logged in to Azure 
# before running anything at all, the call will
# exit the script if you're not
CheckLoggedIn

# Ensure resource group we are deploying to exists.
EnsureResourceGroup $ResourceGroupName $Location

# Ensure that the Key Vault resource exists.
$keyVault = EnsureKeyVault $KeyVaultName $ResourceGroupName $Location

# Upload buyagift wildcard certificate
$cert = UploadCertificate $KeyVaultName "certName" $PSScriptRoot "certPassword"

# Create three self signed certificates and return thumb to use on cluster template
$readOnlyThumb, $adminThumb, $devOpsThumb = EnsureSelfSignedClientCertificates $PSScriptRoot

```

To use our wildcard certificate we also had to change the service fabric explore url and create a DNS A record pointing to the public IP DNS name associated to our public load balancer, our A record looks like this `service-fabric-explorer.our-domain.com => xxxxxxx.northeurope.cloudapp.azure.com`

Check below the relevant properties of the service fabric resource on the ARM Template

```json
"properties": {
                "certificateCommonNames": {
                    "commonNames": [
                    {
                        "certificateCommonName": "*.our-domain.com", # remember to add * if wildcard certificate
                        "certificateIssuerThumbprint": ""
                    }
                    ],
                    "x509StoreName": "My"
                },
                "clientCertificateThumbprints": [
                    {
                        "isAdmin": false,
                        "certificateThumbprint": "[parameters('readOnlyThumb')]" # cert thumb from previous powershell script
                    },
                    {
                        "isAdmin": true,
                        "certificateThumbprint": "[parameters('adminThumb')]" # cert thumb from previous powershell script
                    },
                    {
                        "isAdmin": false,
                        "certificateThumbprint": "[parameters('devOpsThumb')]" # cert thumb from previous powershell script
                    }
                ],
                "managementEndpoint": "[concat('https://service-fabric-explorer.our-domain.com:',variables('fabricHttpGatewayPort'))]",
            }
```

And the following on the Virtual Machine Scale Set resource

```json
"osProfile": {
                        "adminPassword": "[parameters('adminPassword')]",
                        "adminUsername": "[parameters('adminUsername')]",
                        "computernamePrefix": "[parameters('vmNodeType0Name')]",
                        "secrets": [
                            {
                                "sourceVault": {
                                    "id": "[parameters('sourceVaultValue')]"
                                },
                                "vaultCertificates": [
                                    {
                                        "certificateStore": "My",
                                        "certificateUrl": "[parameters('certificateUrlValue')]" # secretId from cert uploaded to vault on previous powershell script.
                                    }
                                ]
                            }
                        ]
                    },
```

One important thing to remember is to replace your server certificate before it expires, if the certificate expires you'll lose connection to the cluster (Service Fabric Explorer will stop working and you would not be able to deploy anything). It happened to the cluster of another team in the company and you'll get a "Upgrade service unreachable" message on [Azure Portal](https://portal.azure.com), the list of nodes and applications will be empty.

The message had a link to a [Cluster not reachable](https://github.com/Azure/Service-Fabric-Troubleshooting-Guides/blob/master/Cluster/Cluster%20Not%20Reachable%20%20UpgradeServiceNotreachable.md) document on github describing possible causes and mitigations. In our case it was the certificate.

If already happened then head on to [fix expired cluster certificate steps](https://github.com/Azure/Service-Fabric-Troubleshooting-Guides/blob/master/Security/Fix%20Expired%20Cluster%20Certificate%20Manual%20Steps.md) document by Microsoft.

## Follow up

I think it is enough for now, will continue on a follow up post soon.