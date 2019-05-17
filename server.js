const express = require('express');
const next = require('next');

const routes = require('./routes');

const port = parseInt(process.env.PORT, 10) || 80;
const app = next({ dev: process.env.NODE_ENV !== 'production' });

const handler = routes.getRequestHandler(app, ({ req, res, route, query }) => {
  app.render(req, res, route.page, query);
});

app.prepare().then(() => {
  express()
    .use(handler)
    .listen(port);
});
