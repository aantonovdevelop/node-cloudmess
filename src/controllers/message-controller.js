'use strict';

var async = require('async');

/**
 * Create MessageController instance
 *
 * @param messageServer {Object} MessageServer instance
 * @param messageSender {Object} MessageSender instance
 * @param userFactory {Object} UserFactory instance
 *
 * @constructor
 */
function MessageController (messageServer, messageSender, userFactory) {

    this.message_server = messageServer;
    this.message_sender = messageSender;
    this.user_factory = userFactory;

    /**
     * Bind message server with message sender
     */
    this.bind = function () {

        this.message_server.on('message', (ids, message) => {
            var self = this;
            var keys = [];

            async.eachSeries(ids, (id, done) => {
                var user = this.user_factory.create_instance(id);

                user.get_key().then((key) => {
                    keys.push(key);

                    done();
                }).catch(done);
            }, (err) => {
                err ? console.log(err) : () => {};

                self.message_sender.send_message(keys, message);
            });
        });

        this.message_server.on('registration', (id, key) => {

            var user = this.user_factory.create_instance(id);

            user.save_key(key);
        });
    }
}

module.exports = MessageController;
