'use strict';

module.exports = app => {
  app.get('/', 'home.index');
  app.post('/api/v1/log/:type', 'api.v1.log.create');

  app.get('/api/v1/log/:page/:type', 'api.v1.log.getLogBytype');
  app.get('/api/v1/log/:page', 'api.v1.log.getLogBytype');
  app.get('/api/v1/get/log/types', 'api.v1.log.getTypes');
};
