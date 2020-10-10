require('marko/node-require').install();
require('marko/express');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require("method-override")
const templates = require('../app/views/templates');

app.use('/static', express.static('./src/app/public/'));

app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

const routes = require('../app/routes/routes');
routes(app);

app.use((req, res, next) => {
  return res.status(404).marko(
    templates.base.error404
  );
});

app.use((error, req, res, next) => {
  return res.status(500).marko(
    templates.base.error500
  );
});

module.exports = app;