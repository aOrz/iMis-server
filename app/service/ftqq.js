'use strict';
const http = require('http');

module.exports = app => {
  class Ftqq extends app.Service {
    async send(text = '', desp = '', type = 'sc') {
      await new Promise((resolve, reject) => {
        // console.log(test, 'ghgjkjkj')
        let { ftqq_token } = this.ctx.user;
        if (type === 'sc') {
          http.get(`http://sc.ftqq.com/${ftqq_token}.send?text=${encodeURIComponent(text.slice(0, 256))}&desp=${encodeURIComponent(desp.slice(0, 5700))}`, res => {
            let rawData = '';
            res.on('data', chunk => {
              rawData += chunk;
            });
            res.on('end', () => {
              resolve(rawData);
            });
          });
        } else {
          http.get(
            `http://pushbear.ftqq.com/sub?sendkey=${ftqq_token}&text=${encodeURIComponent(text.slice(0, 256))}&desp=${encodeURIComponent(desp.slice(0, 5700))}`,
            res => {
              let rawData = '';
              res.on('data', chunk => {
                rawData += chunk;
              });
              res.on('end', () => {
                resolve(rawData);
              });
            }
          );
        }
      });
    }
  }
  return Ftqq;
};
