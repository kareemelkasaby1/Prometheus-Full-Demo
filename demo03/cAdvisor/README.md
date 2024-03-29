# Demo 3 - Run C-Advisor

## Monitoring Docker Engine itself

> 1. go to `/etc/docker/daemon.json` and add the following lines:
```
sudo vi /etc/docker/daemon.json

{
  "metrics-addr" : "127.0.0.1:9323",
  "experimental" : true
}
```
> 2.  restart `docker` service:

```
sudo systemctl restart docker
```
go to `/etc/prometheus/prometheus.yml` to add another item in the scrabers section.

## Run C-Advisor Container to Monitor Containers

we need run `C-Advisor` as a container.

[C-Advisor github](https://github.com/google/cadvisor)


> 1. Run `C-Advisor` Container:

```
sudo docker run \
  --volume=/:/rootfs:ro \
  --volume=/var/run:/var/run:ro \
  --volume=/sys:/sys:ro \
  --volume=/var/lib/docker/:/var/lib/docker:ro \
  --volume=/dev/disk/:/dev/disk:ro \
  --publish=8080:8080 \
  --detach=true \
  --name=cadvisor \
  --privileged \
  --device=/dev/kmsg \
  gcr.io/cadvisor/cadvisor
```

The `C-Advisor` listens on HTTP port `8080` by default.

go to `/etc/prometheus/prometheus.yml` to add another item in the scrabers section.

Next: [Demo 4 - Use Client Library](../../demo04/client-library/README.md)
