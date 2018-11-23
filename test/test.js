const pushNotification = require('./../server/index');
var assert = require('assert');
let correctParams = {};
let incorrectParams = {};
let context = '';
let status = false;
// Please change the parameters with valid values and parameters to run the test case
correctParams.env = {
  serverKey: 'serverKey'
};
// Please change the parameters with valid values and parameters to run the test case
correctParams.current = {
  to: 'deviceId',
  notification: {
    title : 'TEST',
    body : 'TEST',
    sound : 'default'
  }
};
incorrectParams.env = {
  serverKey : '***************************************'
};
// Please change the parameters with valid values and parameters to run the test case
incorrectParams.current = {
  to: '********************',
  notification: {
    title : 'TEST',
    body : 'TEST',
    sound : 'default'
  }
};
describe('testing push notification', function () {
  it('testing push notification', function (done) {
    this.timeout(15000);
    setTimeout(done, 15000);
    pushNotification.handler(correctParams, context, function testHandler ( error, res) {
      if ( res && res.success && res.success == 1) {
        status = true;
      }
      assert.equal(status, true);
      done();
    });
  })
})
status = false;
describe('testing push notification with invalid keys', function () {
  it('testing push notification with invalid keys', function () {
    pushNotification.handler(incorrectParams, context, function testHandler ( error, res) {
      if ( error && error == 'InvalidServerResponse' ) {
        status = true;
      }
      assert.equal(status, true);
      done();
    });
  })
})
