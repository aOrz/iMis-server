'use strict';
module.exports = function auth(params) {
  // let that = this;
  return async (ctx, next) => {
    console.log(ctx.query);
    if (ctx.query.token) {
      console.log(ctx.app.mysql)
      await next();
    } else {
      ctx.body = {
        code: 1,
        error: 'login error',
      };
    }
  };
};
