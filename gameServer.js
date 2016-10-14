/**************************************************
** NODE.JS REQUIREMENTS
**************************************************/
var util = require("util"),					// Utility resources (logging, object inspection, etc)
	io = require("socket.io")
	User = require("./User.js").User;			// Socket.IO;	// Player class

/**************************************************
** GAME VARIABLES
**************************************************/
var socket,
	players;	// Socket controller	// Array of connected players

var counter = 0;
/**************************************************
** GAME INITIALISATION
**************************************************/
function init() {
	// Create an empty array to store players
	players = [];

	// Set up Socket.IO to listen on port 8000
	socket = io.listen(8000);

	// Configure Socket.IO
	socket.configure(function() {
		// Only use WebSockets
		socket.set("transports", ["websocket"]);

		// Restrict log output
		socket.set("log level", 2);
	});

	// Start listening for events
	setEventHandlers();
};

var setEventHandlers = function() {
	// Socket.IO
	socket.sockets.on("connection", onSocketConnection);
};

function onSocketConnection(client) {
	util.log("New player has connected: "+client.id);

	// Listen for client disconnected
	client.on("disconnect", onClientDisconnect);

	// Listen for new player message
	client.on("new player", onNewPlayer);

	// Listen for move player message
	client.on("move player", onMovePlayer);

	client.on("client ready", onClientReady);

	client.on("add ship", onAddShip)


};

// Socket client has disconnected
function onClientDisconnect() {
	util.log("Player has disconnected: "+this.id);

	var removePlayer = playerById(this.id);

	// Player not found
	if (!removePlayer) {
		util.log("Player not found: "+this.id);
		return;
	};

	// Remove player from players array
	players.splice(players.indexOf(removePlayer), 1);

	// Broadcast removed player to connected socket clients
	this.broadcast.emit("remove player", {id: this.id});
};

// New player has joined
function onNewPlayer(data) {
	// Create a new player
	var newUser = new User(data.x, data.y);
	newUser.id = this.id;

	// Broadcast new player to connected socket clients
	this.broadcast.emit("new player", {id: newUser.id, name: newUser.getName(), type: newUser.getType()});
	// Send existing players to the new player
	var i, existingPlayer;
	for (i = 0; i < players.length; i++) {
		existingPlayer = players[i];
		this.emit("new player", {id: existingPlayer.id, name: existingPlayer.getName(), type: existingPlayer.getType()});
	};
		
	// Add new player to the players array
	players.push(newUser);

	util.log("Name : " + newUser.getName() + "	Type: " + newUser.getType() +  " " + players.length);
};

// Player has moved
function onMovePlayer(data) {
	// Find player in array
	var movePlayer = playerById(this.id);

	// Player not found
	if (!movePlayer) {
		util.log("Player not found: "+this.id);
		return;
	};

	// Update player position
	movePlayer.setX(data.x);
	movePlayer.setY(data.y);

	// Broadcast updated position to connected socket clients
	this.broadcast.emit("move player", {id: movePlayer.id, x: movePlayer.getX(), y: movePlayer.getY()});
};


function onClientReady(){
	counter++;
	util.log("in onClientReady	" + counter);
	if(counter == 2){
		util.log("in onClientReady	if statement" + counter);
		this.emit("client ready", {id:1});
		this.broadcast.emit("client ready", {id:2});
		counter = 0;
	}
}


/**************************************************
** GAME HELPER FUNCTIONS
**************************************************/
// Find player by ID
function playerById(id) {

	for (var i = 0; i < players.length; i++) {
		if (players[i].id == id)
			return players[i];
	};
	
	return false;
};

function onAddShip(data){
	this.emit("add ship", {type: data.type, rot: data.rot});
	this.broadcast.emit("add ship", {type: data.type, rot: data.rot});
}

/**************************************************
** RUN THE GAME
**************************************************/
init();