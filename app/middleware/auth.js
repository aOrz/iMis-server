'use strict';
module.exports = function auth() {
  // let that = this;
  return async (ctx, next) => {
    const { token: queryTokens } = ctx.queries;
    const queriesToken = Array.isArray(queryTokens) ? queryTokens[0] : queryTokens;
    const { token, type } = ctx.request.header;
    const options = {};
    if (type === 'server' || queriesToken) {
      options.server_token = token || queriesToken;
    } else {
      options.app_token = token;
    }
    const credential = options.server_token || options.app_token;
    if (typeof credential !== 'string' || !credential.trim()) {
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
