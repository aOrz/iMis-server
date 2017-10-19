'use strict';

module.exports = appInfo => {
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1508166096522_5298';

  // add your config here
  config.middleware = [ 'auth' ];

  config.mysql = {
    client: {
      // host
      host: '',
      // 端口号
      port: '3306',
      // 用户名
      user: '',
      // 密码
      password: '',
      // 数据库名
      database: 'imis',
    },
  };
  config.security = {
    csrf: {
      enable: false,
    },
  };
  return config;
};
