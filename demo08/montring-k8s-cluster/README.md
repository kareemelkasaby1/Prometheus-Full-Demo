# Demo 6 - Monitor K8s Cluster

we will use kube `Prometheus` stack HELM chart.

[Kube Prometheus Stack Github](https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack)

# 6.1 kube-prometheus-stack

Installs the [kube-prometheus stack](https://github.com/prometheus-operator/kube-prometheus), a collection of Kubernetes manifests, [Grafana](http://grafana.com/) dashboards, and [Prometheus rules](https://prometheus.io/docs/prometheus/latest/configuration/recording_rules/) combined with documentation and scripts to provide easy to operate end-to-end Kubernetes cluster monitoring with [Prometheus](https://prometheus.io/) using the [Prometheus Operator](https://github.com/prometheus-operator/prometheus-operator).

See the [kube-prometheus](https://github.com/prometheus-operator/kube-prometheus) README for details about components, dashboards, and alerts.

_Note: This chart was formerly named `prometheus-operator` chart, now renamed to more clearly reflect that it installs the `kube-prometheus` project stack, within which Prometheus Operator is only one component._

## Prerequisites

- Kubernetes 1.16+
- Helm 3+

## Get Helm Repository Info

```console
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
```

_See [`helm repo`](https://helm.sh/docs/helm/helm_repo/) for command documentation._

## Install Helm Chart

```console
helm install [RELEASE_NAME] prometheus-community/kube-prometheus-stack
```

_See [configuration](#configuration) below._

_See [helm install](https://helm.sh/docs/helm/helm_install/) for command documentation._

## Dependencies

By default this chart installs additional, dependent charts:

- [prometheus-community/kube-state-metrics](https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-state-metrics)
- [prometheus-community/prometheus-node-exporter](https://github.com/prometheus-community/helm-charts/tree/main/charts/prometheus-node-exporter)
- [grafana/grafana](https://github.com/grafana/helm-charts/tree/main/charts/grafana)

To disable dependencies during installation, see [multiple releases](#multiple-releases) below.

_See [helm dependency](https://helm.sh/docs/helm/helm_dependency/) for command documentation._

## Uninstall Helm Chart

```console
helm uninstall [RELEASE_NAME]
```

This removes all the Kubernetes components associated with the chart and deletes the release.

_See [helm uninstall](https://helm.sh/docs/helm/helm_uninstall/) for command documentation._

CRDs created by this chart are not removed by default and should be manually cleaned up:

```console
kubectl delete crd alertmanagerconfigs.monitoring.coreos.com
kubectl delete crd alertmanagers.monitoring.coreos.com
kubectl delete crd podmonitors.monitoring.coreos.com
kubectl delete crd probes.monitoring.coreos.com
kubectl delete crd prometheuses.monitoring.coreos.com
kubectl delete crd prometheusrules.monitoring.coreos.com
kubectl delete crd servicemonitors.monitoring.coreos.com
kubectl delete crd thanosrulers.monitoring.coreos.com
```

## Upgrading Chart

```console
helm upgrade [RELEASE_NAME] prometheus-community/kube-prometheus-stack
```

With Helm v3, CRDs created by this chart are not updated by default and should be manually updated.
Consult also the [Helm Documentation on CRDs](https://helm.sh/docs/chart_best_practices/custom_resource_definitions).

_See [helm upgrade](https://helm.sh/docs/helm/helm_upgrade/) for command documentation._

> You may need to run the below command because of a known bug:

```
kubectl patch ds prometheus-prometheus-node-exporter --type "json" -p '[{"op": "remove", "path" : "/spec/template/spec/containers/0/volumeMounts/2/mountPropagation"}]'
```


# 6.2 Apply a Simple App to Be Monitored

> 6.2.1. Apply [Deployment](deploy.yaml) and its [Service](svc.yaml):
```
kubectl apply -f deploy.yaml
kubectl apply -f svc.yaml
```
> 6.2.2. Apply [Service Monitor](api-servicemonitor.yaml) to add the deployed app to the targets:
```
kubectl apply -f api-servicemonitor.yaml
```
# 6.3 Configure Rules
> 6.3.1 Apply [Prometheus Rules](rules.yaml):
```
kubectl apply -f rules.yaml
```
# 6.4 Configure targets
> 6.3.1 Apply [Prometheus Rules](rules.yaml):
```
kubectl get prometheus -o yaml | grep -A 3 -i ruleSelector

kubectl apply -f api-servicemonitor.yaml
```
# 6.5 Configure Alert Manager Configurations
> 6.5.1 Search about `alertmanagerConfigSelector` in the values file and update it to have a selector:
```
helm show values prometheus-community/kube-prometheus-stack > values-update.yaml
```
> 6.5.2 upgrade HELM release using the updated values file:
```
helm upgrade prometheus prometheus-community/kube-prometheus-stack --values values-update.yaml
```
> 6.5.3 Apply [Alert Manager Configuration CRD](alertmanager-rule.yaml):
```
kubectl get alertmanager -o yaml | grep -A 3 -i alertmanagerConfigSelector

kubectl apply -f alertmanager-rule.yaml
```