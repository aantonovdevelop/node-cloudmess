'use strict';

var assert = require('assert');
var redis = require('../mocks/redis');

var User = require('../../src/models/user');

describe('UserModel', function () {
    beforeEach(() => {
        redis.store = [];
    });

    var user_id = 1,
        key = 'test_key';

    describe('#save_key', function () {

        it('Should save user registration key into db', function (done) {
            var user = new User(user_id, redis);

            user.save_key(key)
            .then(() => {
                assert.equal(redis.store['users:user_key:' + user_id], key);

                done();
            }).catch((err) => done(err));
        });
    });

    describe('#get_key', function () {

        it('Should return saved user registration key from db', function (done) {
            var user = new User(user_id, redis);

            redis.store['users:user_key:' + user_id] = key;

            user.get_key().then((result) => {
                assert.equal(result, key);

                done();
            }).catch((err) => done(err));
        });
    });
});
