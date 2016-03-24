'use strict';

var assert = require('assert');
var ExpressMessageServer = require('../src/express-message-server');

describe('ExpressMessageServer', function () {
    describe('#message_received', function () {
        it('Should emit "message" event', function (done) {
            var express_message_server = new ExpressMessageServer();

            express_message_server.on('message', (id, message) => {
                assert.ok(id);
                assert.ok(message);

                done();
            });

            var test_id = 1,
                test_message = {
                    title: 'Hello',
                    body: 'Test'
                };

            express_message_server.message_received(test_id, test_message);
        });
    });

    describe('#registration_received', function (done) {
        it('Should emit "registration event"', function (done) {
            var express_message_server = new ExpressMessageServer();

            express_message_server.on('registration', (id, key) => {
                assert.ok(id);
                assert.ok(key);

                done();
            });

            var test_id = 1,
                test_key = 'test_key';

            express_message_server.registration_received(test_id, test_key);
        });
    });
});
