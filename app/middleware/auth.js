'use strict';
module.exports = function auth(params) {
  // let that = this;
  return async (ctx, next) => {
    const { token } = ctx.query;
    const user = await ctx.app.mysql.get('user', { server_token: token });
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
