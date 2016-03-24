'use strict';

var MessageServer = require('../abstract/message-server');

class ExpressMessageServer extends MessageServer {

    /**
     * Create ExpressMessageServer instance
     */
    constructor() {
        super();

        this.express = require('express');
        this.app = this.express();

        this.app.use(require('body-parser').json());

        this.app.post('/message', (req, res) => {
            if ((!req.body.user_ids) || (!req.body.message) || (!(req.body.user_ids instanceof Array)))
                return res.sendStatus(400);

            super.message_received(req.body.user_ids, req.body.message);

            res.sendStatus(200);
        });

        this.app.post('/registration', (req, res) => {
            if ((!req.body.user_id) || (!req.body.key)) return res.sendStatus(400);

            super.registration_received(req.body.user_id, req.body.key);

            return res.sendStatus(200);
        });
    }

    /**
     * Run server
     *
     * @param port {Number}
     * @returns {Promise}
     */
    listen (port) {
        return new Promise(run_server.bind(this));

        function run_server(resolve) {
            this.app.listen(port, resolve);
        }
    }
}

module.exports = ExpressMessageServer;
