# Demo 5 - Configure Prometheus Rules

we need to do some steps to to configure Prometheus `Rules`.

## 1.1 Adding rules to Prometheus

> 1. go to `/etc/prometheus/prometheus.yml` to enable `Rules`:
```
sudo vi /etc/prometheus/prometheus.yml
```
> 2. Create [rules file](rules.yml) under `/etc/prometheus/` directory:

```
sudo vi /etc/prometheus/rules.yml
```
> 3. Restart Prometheus service:
```
sudo systemctl restart prometheus
```
Next: [Demo 6 - Install Alert Manager as a Service](../../demo06/install-alert-manager-as-service/README.md)
