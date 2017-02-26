"use strict";
// Basic UDP client taken directly from https://www.hacksparrow.com/node-js-udp-server-and-client-example.html
const HOST = process.env.IP || "localhost";
const PORT = process.env.PORT || 8080;
const dgram = require('dgram');
const util = require('util');
const client = dgram.createSocket('udp4');
let message = new Buffer('Client has started');

function start(){
	process.stdin.resume();
	client.send(message, 0, message.length, PORT, HOST)
	process.stdin.on('data', handleInput);
}

function handleInput(data){

	let text = data.toString();
	text = text.substr(0, text.length - 2); // remove the newline at the end of each input statement
	if(text == 'q'){
		close();
	}
	else{
		send(text);
	}

}

function close(){
	console.log('closing');
	client.close();
	process.exit();	
}

function send(data){
	message = new Buffer(data);
	client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
	    if (err) {
	    	close();
	    	throw err;
	    }
	    console.log('UDP message sent to ' + HOST +':'+ PORT);
	});

}

start();