# Demo 7 - Install Grafana as a Service

we need to do some steps to to install `Grafana`.

[Grafana github](https://github.com/grafana/grafana)

## 1.1 Installing Grafana as a service steps

> 1. Update the system:

```
sudo apt update
```
> 2. Add `Grafana` APT repository:

```
sudo apt-get install -y gnupg2 curl software-properties-common
curl https://packages.grafana.com/gpg.key | sudo apt-key add -
```
```
sudo add-apt-repository "deb https://packages.grafana.com/oss/deb stable main"
```

> 3. Install `Grafana`:
```
sudo apt-get update
sudo apt-get -y install grafana
```

> 4. Start `Grafana` service.:
```
sudo systemctl enable --now grafana-server
```
The `Grafana` listens on HTTP port `3000` by default.