'use strict';
module.exports = function auth() {
  // let that = this;
  return async (ctx, next) => {
    const { token, type } = ctx.request.header;
    const options = {};
    if (type === 'server') {
      options.server_token = token;
    } else {
      options.app_token = token;
    }
    const user = await ctx.app.mysql.get('user', options);
    if (token && user) {
      ctx.user = user;
      await next();
    } else {
      ctx.body = {
        code: 1,
        error: 'login error',
      };
    }
  };
};
