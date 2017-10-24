'use strict';
const moment = require('moment');
module.exports = app => {
  class githubController extends app.Controller {
    async create() {
      const ctx = this.ctx;
      // const { type } = ctx.params;
      const notice = true;
      const { action: title = '' } = ctx.request.body;
      const logs = JSON.stringify(ctx.request.body);
      // const { , logs = '', title = '' } = ctx.request.body;
      const { userid } = this.ctx.user;
      if (notice) {
        await ctx.service.ftqq.send(title, logs);
        await ctx.service.getui.send(title, logs);
      }
      this.app.mysql.insert('logs', {
        type: 'github',
        notice: Boolean(notice),
        logs,
        userid,
        title,
      });
      this.ctx.body = JSON.stringify(this.ctx.request.body);
    }
  }
  return githubController;
};
