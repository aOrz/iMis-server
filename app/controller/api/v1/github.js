'use strict';
module.exports = app => {
  class githubController extends app.Controller {
    async create() {
      const ctx = this.ctx;
      // const { type } = ctx.params;
      const notice = true;
      let { payload = {} } = ctx.request.body;
      payload = JSON.parse(payload);
      const { forkee, action = 'unknow', repository = {}, sender, head_commit } = payload;
      const { login, avatar_url, html_url: sender_html_url } = sender;
      let { full_name: title, html_url } = repository;
      title = title ? title : 'github';
      title = `${action} ${title}`;
      if (login === 'aOrz') {
        this.ctx.body = 'ok';
        return;
      }
      let logs = '';
      if (forkee) {
        const { name, full_name, html_url } = forkee;
        title = `fork ${name} to ${full_name}`;
        logs = `fork ${name} to [${full_name}](${html_url})`;
      } else if (action !== 'push' && !head_commit) {
        logs = `[${login}](${sender_html_url})
        ${action}
        [${title}](${html_url})
        ![${login}](${avatar_url})
        `;
      } else {
        const { url, message } = head_commit;
        logs = `[${login}](${sender_html_url})
        ${action}
        [${title}](${html_url})
        [${message}](${url})
        `;
      }
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
      this.ctx.body = JSON.stringify({ title, logs });
    }
  }
  return githubController;
};
