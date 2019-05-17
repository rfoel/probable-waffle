const nextRoutes = require('@yolkai/next-routes').default;

const routes = nextRoutes()
  .add('index', '/')
  .add('user', '/:user', 'user')
  .add('repository', '/:user/:repository');

module.exports = routes;
