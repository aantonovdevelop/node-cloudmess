'use strict';

/**
 * Create UserFactory instance
 *
 * @param db {Object} DB use with user model
 * @constructor
 */
function UserFactory (db) {

    this.db = db;
    this.model = require('../models/user');

    /**
     * Create User Model instance
     *
     * @param id {Number} User ID
     * @returns {User}
     */
    this.create_instance = function (id) {
        return new this.model(id, this.db);
    };
}

module.exports = UserFactory;
