'use strict';

var assert = require('assert');
var redis = require('./mocks/redis');

var UserFactory;

describe('UserFactory', function () {
    describe('#init_instances', function () {
        it('Should init UserFactory instance', function () {
            UserFactory = require('../src/factories/model-factory');
        });
    });

    describe('#create_instance', function () {
        it('Should return User model instance', function () {
            var user_factory = new UserFactory(redis);
            var user = user_factory.create_instance(1);

            assert.ok(user);
            assert.equal(user.constructor.name, 'User');
        });
    });
});