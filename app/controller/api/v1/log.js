'use strict';

module.exports = app => {
  class LogController extends app.Controller {
    async create() {
      const ctx = this.ctx;
      let { type } = ctx.params;
      const { notice = false, logs = '', title = '' } = ctx.request.body;
      const { userid } = this.ctx.user;
      if (notice) {
        await ctx.service.ftqq.send(title, logs);
      }
      this.app.mysql.insert('logs', {
        type,
        notice: Boolean(notice),
        logs,
        userid,
        title,
      });
      this.ctx.body = JSON.stringify(this.ctx.request.body);
    }
  }
  return LogController;
};
