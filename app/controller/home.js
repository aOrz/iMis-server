'use strict';

module.exports = app => {
  class HomeController extends app.Controller {
    * index() {
      this.ctx.body = 'hi, eggssssssssswww';
    }
  }
  return HomeController;
};
