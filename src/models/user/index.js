'use strict';

class User {
    /**
     * Create new User instance
     *
     * @param id {Number} User ID
     * @param redis {Object} Redis DB
     */
    constructor (id, redis) {
        this.id = id;
        this.redis = redis;
    }

    /**
     * Save user cloud message registration key
     *
     * @param key {String} Registration Key
     * @returns {Promise}
     */
    save_key(key) {
        return new Promise(save_user_key.bind(this));

        function save_user_key (resolve, reject) {
            this.redis.set('users:user_key:' + this.id, key, (err) => {
                err ? reject(err) : resolve();
            });
        }
    }

    /**
     * Get user cloud message registration key
     *
     * @returns {Promise}
     */
    get_key() {
        return new Promise(get_user_key.bind(this));

        function get_user_key (resolve, reject) {
            this.redis.get('users:user_key:' + this.id, (err, key) => {
                err ? reject(err) : resolve(key);
            });
        }
    }
}

module.exports = User;
