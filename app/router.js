'use strict';

module.exports = app => {
  app.get('/', 'home.index');
  app.post('/api/v1/log/:type', 'api.v1.log.create');
  app.post('/api/v1/github-log', 'api.v1.github.create');

  app.get('/api/v1/log/:page/:type', 'api.v1.log.getLogBytype');
  app.get('/api/v1/log/:page', 'api.v1.log.getLogBytype');
  app.get('/api/v1/get/log/types', 'api.v1.log.getTypes');
  app.get('/api/v1/send/send', 'api.v1.send.send');
  
};
