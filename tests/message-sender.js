'use strict';

var assert = require('assert');

var MessageSender = require('../src/message-sender');
var gcm = require('./mocks/gcm');

describe('MessageSender', function () {
    describe('#send_message', function () {
        it('Should create message and send it to gcm sender', function (done) {
            var gcm_api_key = 'test_api_key';
            var message_sender = new MessageSender(gcm, gcm_api_key);

            var keys = ['test_key'];
            var message = {
                title: 'Hello',
                body: 'Test message'
            };

            message_sender.send_message(keys, message).then((res) => {
                assert.equal(res, null);

                done();
            }).catch((err) => done(err))
        });
    });
});
