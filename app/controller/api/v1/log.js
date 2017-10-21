'use strict';

module.exports = app => {
  class LogController extends app.Controller {
    * create() {
      const { notice = false, logs = '', type } = this.ctx.request.body;
      const { userid } = this.ctx.user;
      this.app.mysql.insert('logs', {
        type,
        notice: Boolean(notice),
        logs,
        userid,
      });
      this.ctx.body = JSON.stringify(this.ctx.request.body);
    }
  }
  return LogController;
};
