'use strict';

var stdio = require('stdio');

var gcm = require('node-gcm');

var ExpressMessageServer = require('./src/express-message-server');
var MessageSender = require('./src/message-sender');
var MessageController = require('./src/controllers/message-controller');
var UserFactory = require('./src/factories/model-factory');

var options = stdio.getopt({
    app_port: {
        description: 'message server port',
        args: 1
    },

    key: {
        description: 'cloud message api key',
        args: 1,
        mandatory: true
    },

    redis_port: {
        description: 'redis server port',
        args: 1
    },

    redis_host: {
        description: 'redis server host addr',
        args: 1
    }
});

var redis_port = options.redis_port || 6379;
var redis_host = options.redis_host || '127.0.0.1';

console.log('T: ', redis_port, redis_host);

var redis = require('redis').createClient(redis_port, redis_host);

var server_port = Number(options.port) || 3000;
var api_key = options.key.toString();

var message_server = new ExpressMessageServer();
var message_sender = new MessageSender(gcm, api_key);
var user_factory = new UserFactory(redis);

var message_controller = new MessageController(message_server, message_sender, user_factory);

message_controller.bind();

message_server.listen(server_port).then(() => console.log('Application started on port %d...', server_port));
