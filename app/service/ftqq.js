'use strict';
const http = require('http');
const request = require('request');

module.exports = app => {
  class Ftqq extends app.Service {
    async send(text = 'title', desp = '', type = 'sc') {
      await new Promise((resolve, reject) => {
        // console.log(test, 'ghgjkjkj')
        let { ftqq_token } = this.ctx.user;
        if (type === 'sc') {
          request.post(
            `http://sc.ftqq.com/${ftqq_token}.send`,
            {
              form: {
                text: text.slice(0, 256),
                desp: desp.slice(0, 3700),
              },
            },
            function(error, response, body) {
              if (!error && response.statusCode === 200) {
                resolve(body);
              } else {
                resolve({
                  code: 1,
                  error,
                  response,
                  body,
                });
              }
            }
          );
        } else {
          http.get(
            `http://pushbear.ftqq.com/sub?sendkey=${ftqq_token}&text=${encodeURIComponent(
              text.slice(0, 256)
            )}&desp=${encodeURIComponent(desp.slice(0, 5700))}`,
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
