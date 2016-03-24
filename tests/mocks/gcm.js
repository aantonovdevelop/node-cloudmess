'use strict';

var assert = require('assert');

function Sender(key) {

    assert.ok(key);

    this.send = function (message, keys, trycount, callback) {

        assert.ok(message instanceof Message);

        assert.ok(keys instanceof Array);
        assert.ok(keys.length > 0);

        assert.ok(trycount > 0);

        callback(null, null);
    }
}

function Message() {
    this.store = [];

    this.addData = function (name, data) {
        assert.ok(name);
        assert.ok(data);

        this.store.push({name: name, data: data});
    }
}

module.exports = {
    Sender: Sender,
    Message: Message
};
