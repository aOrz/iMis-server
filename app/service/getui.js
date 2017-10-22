'use strict';
const Getui = require('getui-rest');

module.exports = app => {
  class Ge extends app.Service {
    async send(text = '', desp = '') {
      const getuiConfig = this.config.getui;
      const getui = new Getui(getuiConfig.appId, getuiConfig.appKey, getuiConfig.masterSecret);
      await getui.auth();
      await getui.pushApp(
        {
          is_offline: true,
          offline_expire_time: 604800000,
          push_network_type: 0,
          msgtype: 'notification',
        },
        {
          style: {
            text,
            type: 0,
            title: desp,
          },
        }
      );
    }
  }
  return Ge;
};
