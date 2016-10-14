Game.Lobby = function (game, output) {
	var planetType = output;
	var updateText = false;
	var text;
	var localUser
	var opponentUser;
};

Game.Lobby.prototype = {

	create:function(game){

		socket = io.connect("http://localhost", {port: 8000, transports: ["websocket"]});

		var background = game.add.sprite(0,0, 'mainMenuBackground'); 
		background.scale.setTo(2,2);

		var style = { font: "32px Arial", fill: "#ff0044"};

    	game.add.text(game.world.centerX, 0, "LOBBY SCREEN", style);
		text = game.add.text(game.world.centerX, 20, "Players conected 1/2", style);
		
		playButton = game.add.button(game.world.centerX - 250, this.game.height - 200, 'play_button', this.actionOnClickPlay, this, 2, 1, 0);	
		playButton.input.enabled = false;
		playButton.alpha = 0.5;

		this.setEventHandlers();

		// Initialise the local player
        localUser = new User("Love", planetType);

        remotePlayers = [];
	},

    setEventHandlers: function() {
        // Socket connection successful
        socket.on("connect", this.onSocketConnected);

        // Socket disconnection
        socket.on("disconnect", this.onSocketDisconnect);

        // New player message received
        socket.on("new player", this.onNewPlayer);

        // Player move message received
        socket.on("move player", this.onMovePlayer);

        // Player removed message received
        socket.on("remove player", this.onRemovePlayer);
    },

 // Socket connected
    onSocketConnected: function() {
        console.log("Connected to socket server");
        // Send local player data to the game server
        socket.emit("new player", {x: localUser.getName(), y: localUser.getType()});
    },

    // Socket disconnected
    onSocketDisconnect:function() {
        console.log("Disconnected from socket server");
    },

    // New player
    onNewPlayer:function(data) {
        console.log("New player connected: "+data.id);
		console.log( "Name and type" + "    " + data.name + "   " + data.type);

        // Initialise the new player
        opponentUser = new User("Sofie", data.type);
        opponentUser.id = data.id;

        // Add new player to the remote players array
        remotePlayers.push(opponentUser);
        updateText = true;
    },

    // Move player
     onMovePlayer:function(data) {
        var movePlayer = playerById(data.id);

        // Player not found
        if (!movePlayer) {
            console.log("Player not found: "+data.id);
            return;
        };

        // Update player position
        movePlayer.setX(data.x);
        movePlayer.setY(data.y);
    },

    // Remove player
    onRemovePlayer:function(data) {
	    var removePlayer = playerById(data.id);
	    console.log("onRemovePlayer " + data.id + " id " + removePlayer.getName());
	    // Player not found
	    if (!removePlayer) {
	        console.log("Player not found: "+data.id);
	        return;
    };

        // Remove player from array
        remotePlayers.splice(remotePlayers.indexOf(removePlayer), 1);
    },
	update:function(){
		if(updateText){
			text.setText("Players conected 2/2");
			playButton.alpha = 1;
			playButton.input.enabled = true;
		};
	},

	actionOnClickPlay:function(){
		console.log(localUser.getName() + localUser.getType());
		var type = localUser.getType();
		var name = localUser.getName();
		var type1 = opponentUser.getType();
		var name1 = opponentUser.getName();

		this.state.start('Play', true, false, type, name, type1, name1);
	},
}