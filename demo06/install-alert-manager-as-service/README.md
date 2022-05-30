# Demo 6 - Install Alert Manager as a Service

we need to do some steps to to install `Alert-Manager`.

[Alert-Manager github](https://github.com/prometheus/alertmanager)

## 1.1 Installing Alert-Manager as a service steps

> 1. add `Alert-Manager` user with no shell:

```
sudo useradd --no-create-home --shell /bin/false alertmanager
```
> 2. download `Alert-Manager` instalation directory:

```
cd /tmp/

wget https://github.com/prometheus/alertmanager/releases/download/v0.24.0/alertmanager-0.24.0.linux-amd64.tar.gz
```
> 3. extraxt files:
```
tar -xvf alertmanager-0.24.0.linux-amd64.tar.gz

cd alertmanager-0.24.0.linux-amd64

ls
```

> 4. copy binary files like `alertmanager` and `amtool`:
```
sudo mv alertmanager /usr/local/bin/
sudo mv amtool /usr/local/bin/
sudo chown alertmanager:alertmanager /usr/local/bin/alertmanager
sudo chown alertmanager:alertmanager /usr/local/bin/amtool
```
> 5. Make configuration directory for `Alert-Manager`:
```
sudo mkdir /etc/alertmanager
```

> 6. Create [Alert Manager Configuration file](alertmanager.yml):
```
sudo vi /etc/alertmanager/alertmanager.yml
```
> 7. Change the ownership of configuration directory to `Alert-Manager` user:
```
sudo chown alertmanager:alertmanager -R /etc/alertmanager
```

> 8. finally create the service file to be able to restart the `Alert-Manager` service:
```
sudo vi /etc/systemd/system/alertmanager.service
```
- go to this file [Alert-Manager service File](alertmanager.service)

> 9. finally start and enable `Alert-Manager` service:
```
sudo systemctl daemon-reload

sudo systemctl start alertmanager

sudo systemctl status alertmanager

sudo systemctl enable alertmanager
```
The `Alert-Manager` listens on HTTP port `9093` by default.

go to `/etc/prometheus/prometheus.yml` to enable talking to `Alert-Manager`.

Next: [Demo 7 - Install Grafana as a Service](../../demo07/install-grafana-as-service/README.md)
