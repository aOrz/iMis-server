'use strict';

module.exports = app => {
  app.get('/', 'home.index');
  app.post('/api/v1/log/:type', 'api.v1.log.create');
};
