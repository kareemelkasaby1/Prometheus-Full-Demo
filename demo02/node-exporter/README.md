# Demo 2 - Install Node Exporter as a Service

we need to do some steps to to install `Node_Exporter`.

[Node Exporter github](https://github.com/prometheus/node_exporter)

## 1.1 Installing prometheus as a service steps

> 1. add `Node_Exporter` user with no shell:

```
sudo useradd --no-create-home --shell /bin/false node_exporter
```
> 2. download `Node_Exporter` instalation directory:

```
cd /tmp/

wget https://github.com/prometheus/node_exporter/releases/download/v1.3.1/node_exporter-1.3.1.linux-amd64.tar.gz
```
> 3. extraxt files:
```
tar -xvf node_exporter-1.3.1.linux-amd64.tar.gz

cd node_exporter-1.3.1.linux-amd64

ls
```
> 4. copy binary files like node_exporter and give it permission:
```
sudo mv node_exporter /usr/local/bin/

sudo chown node_exporter:node_exporter /usr/local/bin/node_exporter
```
> 5. finally create the service file to be able to restart the `Node_Exporter` service:
```
sudo vi /etc/systemd/system/node_exporter.service
```
- go to this file [Node_Exporter Service File](node_exporter.service)

> 6. finally start and enable `Node_Exporter` service:
```
sudo systemctl daemon-reload

sudo systemctl start node_exporter

sudo systemctl status node_exporter

sudo systemctl enable node_exporter
```
The `Node_Exporter` listens on HTTP port `9100` by default.

go to `/etc/prometheus/prometheus.yml` to add another item in the scrabers section.

Next: [Demo 3 - Run C-Advisor](../../demo03/cAdvisor/README.md)
