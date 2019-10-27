const express = require('express')

const server = express();

// importing WS module
const webSocketServer = require('websocket').server; 

server.use(express.json())

// creating the web socket 
const wsServer = new webSocketServer({
	httpServer: server
}); 

// maintaining all active connections in an object
const clients = {};

// generating a random user id for each client (there are a million ways to do this)
const getUniqueId = () => {
	const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1); 
	return s4() + s4() '-' + s4(); 
}

wsServer.on('request', function(request) {
	const userId = getUniqueId(); 
	
	console.log(new Date(0) + ' Recieved a new connection from origin ' + request.origin + '.');

	// can use this part to only accept requests from allowed origins
	const connection = request.accept(null, request.origin); 
 
	// establishing connection for a specific client
	clients[userId] = connection; 

	console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients))

	// example of a successful server handshake
	//HTTP GET ws://127.0.0.1:8000/ 101 Switching Protocols
	//Connection: Upgrade
	//Sec-WebSocket-Accept: Nn/XHq0wK1oO5RTtriEWwR4F7Zw=
	//Upgrade: websocket
})


module.exports = server; 
