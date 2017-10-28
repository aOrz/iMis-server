'use strict';
const moment = require('moment');
const tmsg = require('tmsg2');
const { sendTMsg, getAccessToken } = tmsg;
const url = 'https://fddcn.cn';

module.exports = app => {
  class SendController extends app.Controller {
    async send() {
      const { ctx, app: { mysql } } = this;
      const { title, desp } = ctx.queries;
      // const { notice = false, logs = '', title = '' } = ctx.request.body;
      const { userid, wx_appid: appid, wx_appsecret: secret, wx_user_token: toUser, wx_template_id: templateId, wx_token = '{}' } = this.ctx.user;
      let { token, time } = wx_token && JSON.parse(wx_token) || {};
      if (!token || time <= new Date().getTime()) {
        const res = await getAccessToken(appid, secret);
        const { access_token, expires_in } = res;
        mysql.update('user', {
          wx_token: JSON.stringify({
            token: access_token,
            time: new Date().getTime() + expires_in * 1000,
          }),
        }, {
          where: { userid },
        });
        token = access_token;
      }
      const data = {
        title: {
          value: title && title[0],
          color: '#ff0000',
        },
        time: {
          value: moment().format('YYYY-M-D HH:mm:ss'),
          color: '#ff0000',
        },
        content: {
          value: desp && desp[0],
        },
      };
      const error = await sendTMsg({
        access_token: token,
        toUser,
        templateId,
        url,
        data,
      });
      if (error.errcode) {
        ctx.body = {
          code: 1,
          msg: error,
        };
      } else {
        ctx.body = {
          code: 0,
          msg: 'ok',
        };
      }
    }
  }
  return SendController;
};
