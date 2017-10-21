'use strict';

module.exports = app => {
  class LogController extends app.Controller {
    async create() {
      const ctx = this.ctx;
      const { type } = ctx.params;
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

    async getLogBytype() {
      const { ctx } = this;
      const { user, params } = ctx;
      const { userid } = user;

      const { type, page = 0 } = params;
      const where = { userid };
      if (type) {
        where.type = type;
      }
      const results = await this.app.mysql.select('logs', {
        // 搜索 post 表
        where, // WHERE 条件
        columns: [ 'notice', 'title', 'logs', 'type', 'creat_time' ], // 要查询的表字段
        orders: [[ 'creat_time', 'desc' ]], // 排序方式
        limit: 20, // 返回数据量
        offset: page * 20, // 数据偏移量
      });
      this.ctx.body = {
        code: 200,
        data: results,
      };
    }

    async getTypes() {
      const { ctx } = this;
      const { user } = ctx;
      const { userid } = user;
      const results = await this.app.mysql.query(`select \`type\`,count(*) as c from logs WHERE \`userid\` = ${userid} group by \`type\` order by c desc;
      `);
      this.ctx.body = {
        code: 200,
        data: results,
      };
    }
  }
  return LogController;
};
