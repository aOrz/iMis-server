'use strict';
module.exports = function auth() {
  // let that = this;
  return async (ctx, next) => {
    const { token, type, 'x-hub-signature': githubToken } = ctx.request.header;
    const options = {};
    if (type === 'server' || githubToken) {
      options.server_token = token || githubToken;
    } else {
      options.app_token = token;
    }
    if (!Object.keys(options).length) {
      ctx.body = {
        code: 1,
        error: 'login error,缺少token 或者 type',
      };
    } else {
      const user = await ctx.app.mysql.get('user', options);
      if (user) {
        ctx.user = user;
        await next();
      } else {
        ctx.body = {
          code: 1,
          error: 'login error',
        };
      }
    }
  };
};
