'use strict';

class MessageSender {
    /**
     * Create new MessageSender instance
     *
     * @param gcm {Object} Google Cloud Message Service
     * @param key {String} Google Cloud Message Api Key
     */
    constructor (gcm, key) {
        this.gcm = gcm;
        this.sender = new this.gcm.Sender(key);
        this.message_id = 1;
    }

    /**
     * Send message to users
     *
     * @param keys {Array} Users Registration Keys
     * @param message {Object} Message Object
     * @returns {Promise}
     */
    send_message (keys, message) {
        return new Promise(send_message_to_users.bind(this));

        function send_message_to_users(resolve, reject) {
            var push_message = new this.gcm.Message();

            push_message.addData('title', message.title);
            push_message.addData('message', message.body);

            push_message.addData('ledColor', [0, 50, 180, 10]);
            push_message.addData('notId', this.message_id);

            this.message_id += 1;

            push_message.timeToLive = 3000;

            this.sender.send(push_message, keys, 4, (err, res) => {
                err ? reject(err) : resolve(res);
            });
        }
    }
}

module.exports = MessageSender;
