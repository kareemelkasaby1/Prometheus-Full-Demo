let express = require('express');
let app = express();

const client = require('prom-client');

// Create a Registry which registers the metrics
const register = new client.Registry()

// Add a default label which is added to all metrics
register.setDefaultLabels({
    app: 'example-nodejs-app'
})

// Enable the collection of default metrics
client.collectDefaultMetrics({ register })

app.get('/metrics', async function (req, res) {
    // Return all metrics the Prometheus exposition format
    res.set('Content-Type', register.contentType);
    let metrics = await register.metrics();
    res.send(metrics);
})

let server = app.listen(8000, function () {
    let port = server.address().port
    console.log("Application running on port: %s", port)
})
