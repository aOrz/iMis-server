'use strict';

module.exports = app => {
  class HomeController extends app.Controller {
    * index() {
      this.ctx.body = JSON.stringify(this.ctx.user);
    }
  }
  return HomeController;
};
