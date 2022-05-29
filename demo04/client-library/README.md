# Demo 4 - Use Client Library

we need to import client library in the code itself and expose the metrics to /metrics endpoint or any end point you need.

[Client Libraries](https://prometheus.io/docs/instrumenting/clientlibs/)

[NodeJs Client Library](https://github.com/siimon/prom-client)

## 1.1 Run C-Advisor Container

> 1. Start to write the [nodeJs code example](index.js):
```
vi index.js
```

> 2. Run the nodeJs code:

```
npm i express prom-client

node index.js
```

The `nodeJs code` listens on HTTP port `8000`.

go to `/etc/prometheus/prometheus.yml` to add another item in the scrabers section.

Next: [Demo 5 - Configure Prometheus Rules](../../demo05/prometheus-rule/README.md)
