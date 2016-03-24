'use strict';

var EventEmitter = require('events');

class MessageServer extends EventEmitter {

    message_received(id, msg) {
        this.emit('message', id, msg);
    }

    registration_received(id, key) {
        this.emit('registration', id, key);
    }

    listen() {
        throw new Error('Not implemented exception');
    }
}

module.exports = MessageServer;
