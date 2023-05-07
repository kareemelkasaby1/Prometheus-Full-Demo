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
> 5. finally create the service file to be able to restart the [Node Exporter Service](node_exporter.service):
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
## OPtional: Enable Encryption and Authintication while Communicating with Node Exporter
### Enable Encryption:


> 1. generate self signed certificate with its key with the name of node_exporter
```
openssl req -new -newkey rsa:2048 -days 365 -nodes -x509 -keyout node_exporter.key -out node_exporter.crt -subj "/C=US/ST=California/L=Oakland/O=MyOrg/CN=localhost" -addext "subjectAltName = DNS:localhost"
```

> 2. configure node exporter config to enable HTTBS protocol with [Node Exporter Config File](config.yml):

```
sudo mkdir /etc/node_exporter

sudo cp node_exporter.* /etc/node_exporter

sudo vi /etc/node_exporter/config.yml

sudo chown -R node_exporter:node_exporter /etc/node_exporter
```
- go to this file [Node_Exporter Config File](config.yml)

> 3. edit the [Service File](node_exporter_with_web_config.service) to be able to restart the `Node_Exporter` service:
```
sudo vi /etc/systemd/system/node_exporter.service
```
- go to this file [Node_Exporter Service File (with custom config)](node_exporter_with_web_config.service)

> 4. restart `Node_Exporter` service:
```
sudo systemctl daemon-reload

sudo systemctl restart node_exporter

sudo systemctl status node_exporter
```
> 5. go to `Prometheus` machine and do the following:
```
sudo cp node_exporter.crt /etc/prometheus/

sudo chown prometheus:prometheus /etc/prometheus/node_exporter.crt

sudo vi /etc/prometheus/prometheus.yml
```
add the lines marked with + from [Prometheus Config File with Encryption](prometheus-updated-encryption-and-authintication.yml) to `/etc/prometheus/prometheus.yml`

> 6. restart `Prometheus` service:
```
sudo systemctl restart prometheus

sudo systemctl status prometheus
```

### Enable `Authintication`:
> 1. go to Node Exporter Machine and generate hashed password from a custom password you want:
```
sudo apt update

sudo apt install apache2-utils -y

htpasswd -nBC 10 "" | tr -d ':\n'; echo
```
> 2. configure `Node_Exporter` config to enable HTTBS protocol

```
sudo vi /etc/node_exporter/config.yml

sudo systemctl restart node_exporter

sudo systemctl status node_exporter
```
[Node_Exporter Config File with the Authintication Config](config-with-password.yml)

> 3. go to `Prpmetheus` machine and restart its service:

```
sudo vi /etc/prometheus/prometheus.yml

sudo systemctl restart prometheus

sudo systemctl status prometheus
```
add the lines marked with ++ from [Prometheus Config File with Encryption](prometheus-updated-encryption-and-authintication.yml) to `/etc/prometheus/prometheus.yml`


## Advanced Topic (Service Discovery):
we need to configure some dynamic way to automaticaly or to make it easy to add new target in prometheus:

### File Service Discovery:
We can use file service descovery in order not to always edit `/etc/prometheus/prometheus.yml` to add new target, instead we can use the following:
>1. Create [Targets File](targets.json) with the name `/etc/prometheus/targets.json`:
```
sudo vi /etc/prometheus/targets.json

sudo chown prometheus:prometheus /etc/prometheus/targets.json
```

> 2. Go to `/etc/prometheus/prometheus.yml` and add the following under scrabers section:
```
sudo vi /etc/prometheus/prometheus.yml

- job_name: "file"
    scheme: https
    tls_config:
        ca_file: /etc/prometheus/node_exporter.crt
        insecure_skip_verify: true
    basic_auth:
        username: prometheus
        password: #Password in plain texet not HASHED
    file_sd_configs:
      - files:
          - /etc/prometheus/targets.json
          - /etc/prometheus/*.json
```
> 3. go to `Prpmetheus` machine and restart its service:
```
sudo systemctl restart prometheus

sudo systemctl status prometheus
```
### AWS Service Discovery
In AWS environments we always have a dynamic pool of ec2s specialy if we have an aouto scaling group, so we need to automatically discover new ec2s https://codewizardly.com/prometheus-on-aws-ec2-part3/

> 1. Create IAM user with programatic access only and `ec2ReadOnlyAccess` policy.

>2. Go to `/etc/prometheus/prometheus.yml` and add the following under scrabers section:

```
- job_name: 'aws-service-discovery'
    scheme: https
    tls_config:
        ca_file: /etc/prometheus/node_exporter.crt
        insecure_skip_verify: true
    basic_auth:
        username: prometheus
        password: #Password in plain texet not HASHED
    ec2_sd_configs:
      - region: eu-central-1
        access_key: PUT_THE_ACCESS_KEY_HERE
        secret_key: PUT_THE_SECRET_KEY_HERE
        port: 9100
```

> 3. restart `Prpmetheus` service:

```
sudo vi /etc/prometheus/prometheus.yml

sudo systemctl restart prometheus

sudo systemctl status prometheus
```
## Relabling:
Search about relabling and how to ovride some labels or filter some targets to scrabe only with some tag or so.



The `Node_Exporter` listens on HTTP port `9100` by default.

go to `/etc/prometheus/prometheus.yml` to add another item in the scrabers section.

Next: [Demo 3 - Run C-Advisor](../../demo03/cAdvisor/README.md)
