"use strict";
// Basic example of UDP server. Taken directly from https://www.hacksparrow.com/node-js-udp-server-and-client-example.html
const HOST = process.env.IP || "localhost";
const PORT = process.env.PORT || 8080;
const dgram = require('dgram');
const server = dgram.createSocket('udp4');

server.on('listening', function () {
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

server.on('message', function (message, remote) {
    console.log(remote.address + ':' + remote.port +' - ' + message);

});

server.bind(PORT, HOST);