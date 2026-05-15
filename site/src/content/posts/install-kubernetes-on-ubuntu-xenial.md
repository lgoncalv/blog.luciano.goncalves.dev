---
title: "Install Kubernetes on Ubuntu Xenial"
publishedOn: 2019-10-24
---

Set a static IP address or ensure the server always receive the same IP address

Move to root
```bash
sudo -i
```
\
Install `apt-transport-https`
```bash
apt-get update & apt-get install -y apt-transport-https
```
\
Add google kubernetes repository
```bash
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add -
cat <<EOF >/etc/apt/sources.list.d/kubernetes.list
deb http://apt.kubernetes.io/ kubernetes-xenial main
EOF
```
\
Install `docker.io kubeadm kubectl kubelet kubernetes-cni`
```bash
apt-get update
apt-get install -y docker.io kubeadm kubectl kubelet kubernetes-cni
```
\
Turn off swap and exit root
```bash
swapoff -a
exit
```
\
Initialize kubernetes
```bash
kubeadm init --apiserver-advertise-address=\[server static IP\]
```
Check kubeadm init instructions at the end of `kubeadm init` result, something similar to this:
```bash
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```
Also on result of `kubeadm init` search the command to join the cluster, something similar to this:
```bash
kubeadm join --token e25d48.da8680d0642f2a54 192.168.1.138:6443 --discovery-token-ca-cert-hash sha256:50897b3c57a5a98658ee9021534b9163d16e75320c57e357624d726b9a5b9362
```
\
Add KUBECONFIG environmental variable to bash profile => $HOME/.profile
```bash
export KUBECONFIG=$HOME/.kube/config
```
\
Create networking pod and check all pods and nodes
```bash
kubectl apply --filename https://git.io/weave-kube-1.6
kubectl get pods --all-namespaces
kubectl get nodes
```
\
Copy `$HOME/.kube/config` to client machine
On local machine do this:
```bash
mkdir -p $HOME/.kube
scp username@masterHost:$HOME/.kube/config $HOME/.kube/
```
\
Add KUBECONFIG environmental variable to bash profile => $HOME/.profile
```bash
export KUBECONFIG=$HOME/.kube/config
```
\
Remove master node NoSchedule taint
```bash
kubectl taint nodes NODE_NAME node-role.kubernetes.io/master:NoSchedule-
```