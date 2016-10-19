	var addTowerButton = null;
    var tower = null;
    var towerSprite = null;
    var placingTower = false;
    var updateText = false;
    var user; 
    var opponent;
    var path = [];
    var id = 0;
    var centerTower = 25;
    var centerRange = 150;
    var SIZE_OF_PATH = 30;
    var pathArray = [];
    var pathSprite = null;
    var denied = false;
    var menuBackground = null;
    var levelText = null;
    var sell = null;
    var sellText;
    var upgradeText;
    var upgrade;
    var available = true;
    var towerSpriteNow;
    var costNow;
    var damageNow;
    var typeNow;
    var menuActive = false;

    var shipButton1 = null;
    var shipButton2 = null;
    var shipButton3 = null;

    var ship = null;
    var spaceShip = null;
    var spaceSpriteArray = [];
    var attackTowerArray = [];
    var attackTowers = [];
    var healthArray = [];
    var towerRangeArray = [];

    var bullet;
    var ship1Bullet = null;
    var ship2Bullet = null;
    var ship3Bullet  = null;

    var explosions = null;
    var firingTimer = 0;

    var planetSprite1 = null;
    var planetSprite2 = null;

    var towerBullet = null;
    var towerBullets = null;
    var towerFiringTime = 1;
    var timer = 0;
    var prevTime = 0;
    var bitmaphealth = null;

    var ship1Bullet = null;
    var ship2Bullet = null;
    var ship3Bullet = null;

    var ship1Bullets = null;
    var ship2Bullets = null;
    var ship3Bullets = null;

    var towerRange = 150;
    var towerRangeSprite;
    var localUser;
    var remotePlayers;

    var gameCopy;
    var thisCopy;
    var currType;
    var currRot;
    var pathReversed = [];
    var localName;
    var localType;
    var opponentName;
    var opponentType;
    var uniqeID;
    var number = 0;
    var attackTowerRangeSprite;
    var shiningStar;
    var blinkingTime = 1;
    var lastBlink = 0;
    var starFall;
    var starFallTime = 2;
    var lastStarFall = 0;



Game.Play = function (game) {

 	this.bmd = null;
    this.mode = 0;
    var background = null; 

    this.points = {
        'x': [ 100, 200, 400, 600, 800, 900 ],
        'y': [ 350, 200, 500, 200, 500, 350 ]
    };
};

Game.Play.prototype = {

    init: function(type, name, type1, name1, data){
        localName = name;
        localType = type;
        opponentName = name1;
        opponentType = type1;
        uniqeID = data.id;
    },

	create: function(game){

        gameCopy = this.game;
        thisCopy = this;

        socket = io.connect("http://localhost", {port: 8000, transports: ["websocket"]});

        // Initialise the local player
        user = new User(localName, localType);
        opponent = new User(opponentName, opponentType);

		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        this.scale.maxHeight = 500;
        this.scale.maxWidth = 1000;

        var background = this.game.add.sprite(0,0, 'background2'); 
        background.inputEnabled = true;
        background.events.onInputDown.add(this.availableSpot, this);

	 	var graphics = this.game.add.graphics(100, 100);
        graphics.beginFill(0x999999);
        graphics.drawRect(-100, this.game.height - 150, 1000, 50);
        window.graphics = graphics;

        var style = { font: "bold 16px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

        moneyTextUser = this.game.add.text(30, this.game.height - 50, user.getMoney() , style);
        this.game.add.sprite(0, this.game.height - 50, 'coin');

        healthTextUser = this.game.add.text(30, this.game.height - 20, user.getHealth(), style);
        this.game.add.sprite(0, this.game.height - 20, 'heart');

        moneyTextOpponent = this.game.add.text(this.game.width - 50, this.game.height - 50, opponent.getMoney() , style);
        this.game.add.sprite(this.game.width - 80, this.game.height - 50, 'coin');

        healthTextOpponent = this.game.add.text(this.game.width - 50, this.game.height - 20, opponent.getHealth(), style);
        this.game.add.sprite(this.game.width - 80, this.game.height - 20, 'heart');

        this.bmd = this.add.bitmapData(this.game.width, this.game.height);
        this.bmd.addToWorld();

        this.bitmaphealth = this.add.bitmapData(this.game.width, this.game.height);
        this.bitmaphealth.addToWorld();

        shipButton1 = this.game.add.button(this.game.width - 150, 650, 'ship1', this.addShip , this, 2, 1, 0);
        shipButton2 = this.game.add.button(this.game.width - 250, 650, 'ship2', this.addShip, this, 2, 1, 0);
        shipButton3 = this.game.add.button(this.game.width - 350, 650, 'ship3', this.addShip, this, 2, 1, 0);

        shipButton1.type = "ship1";
        shipButton2.type = "ship2";
        shipButton3.type = "ship3";

        shipButton1.cost = 200;
        shipButton2.cost = 300;
        shipButton3.cost = 500;

        shipButton1.rot = true;
        shipButton2.rot = false;
        shipButton3.rot = true;
 	
	 	addTowerButton1 = this.game.add.button(200, 650, "blackhole", this.placeTower);
	    addTowerButton1.height = 50;
	    addTowerButton1.width = 50;
        addTowerButton1.range = 50;

	    addTowerButton2 = this.game.add.button(300, 650, "sun", this.placeTower);
	    addTowerButton2.height = 50;
	    addTowerButton2.width = 50;
        addTowerButton2.range = 100;

	    addTowerButton3 = this.game.add.button(400, 650, "asteroid", this.placeTower);
	    addTowerButton3.height = 50;
	    addTowerButton3.width = 50;
        addTowerButton3.range = 150;

	    addTowerButton1.cost = 100;
	    addTowerButton2.cost = 200;
	    addTowerButton3.cost = 300;

	    addTowerButton1.damage = 10;
	    addTowerButton2.damage = 20;
	    addTowerButton3.damage = 30;

	    addTowerButton1.type = "blackhole";
        addTowerButton2.type = "sun";
        addTowerButton3.type = "asteroid";

        addTowerButton1.spriteName = "blackhole";
        addTowerButton2.spriteName = "sun";
        addTowerButton3.spriteName = "asteroid";

        if(uniqeID == 1){
            planetSprite1 = this.game.add.sprite(60, this.game.height/2 - 20, user.getType());
            healthArray.push(this.createHealthBar(planetSprite1.width, 8, planetSprite1.x , planetSprite1.y - 20));
            this.game.physics.enable(planetSprite1, Phaser.Physics.ARCADE);
            planetSprite1.enableBody = true;
            planetSprite1.immovable = true;

            planetSprite2 = this.game.add.sprite(this.game.width - 140, this.game.height/2 - 60, opponent.getType());
            healthArray.push(this.createHealthBar(planetSprite2.width , 8, planetSprite2.x , planetSprite2.y - 20));
            this.game.physics.enable(planetSprite2, Phaser.Physics.ARCADE);
            planetSprite2.enableBody = true;
            planetSprite2.immovable = true;
          }

          else
          {
            planetSprite1 = this.game.add.sprite(60, this.game.height/2 - 20, opponent.getType());
            healthArray.push(this.createHealthBar(planetSprite1.width, 8, planetSprite1.x , planetSprite1.y - 20));
            this.game.physics.enable(planetSprite1, Phaser.Physics.ARCADE);
            planetSprite1.enableBody = true;
            planetSprite1.immovable = true;


            planetSprite2 = this.game.add.sprite(this.game.width - 140, this.game.height/2 - 60, user.getType());
            healthArray.push(this.createHealthBar(planetSprite2.width, 8, planetSprite2.x , planetSprite2.y - 20));
            this.game.physics.enable(planetSprite2, Phaser.Physics.ARCADE);
            planetSprite2.enableBody = true;
            planetSprite2.immovable = true;
        }
       
        this.plot();

        // An explosion pool
        explosions = this.game.add.group();
        explosions.enableBody = true;
        explosions.physicsBodyType = Phaser.Physics.ARCADE;
        explosions.createMultiple(30, 'explosion');
        explosions.setAll('anchor.x', 0.5);
        explosions.setAll('anchor.y', 0.5);

        explosions.forEach( function(explosion) {explosion.animations.add('explosion');});

        

        // shiningStar.animations.play('blinkingStar', 15, false);

        towerBullets = this.game.add.group();
        towerBullets.enableBody = true;

        for (var i = 0; i < 20; i++)
        {
            var b = towerBullets.create(0, 0, 'bullet1');
            b.exists = false;
            b.visible = false;
            b.checkWorldBounds = true;
            b.events.onOutOfBounds.add(this.resetBullet, this);
        }


        ship1Bullets = this.game.add.group();
        ship1Bullets.enableBody = true;

        ship2Bullets = this.game.add.group();
        ship2Bullets.enableBody = true;

        ship3Bullets = this.game.add.group();
        ship3Bullets.enableBody = true;
        
        for (var i = 0; i < 20; i++)
        {
            var b = ship1Bullets.create(0, 0, 'bullet1');
            b.exists = false;
            b.visible = false;
            b.checkWorldBounds = true;
            b.events.onOutOfBounds.add(this.resetBullet, this);
        }

        for (var i = 0; i < 20; i++)
        {
            var b = ship2Bullets.create(0, 0, 'bullet2');
            b.exists = false;
            b.visible = false;
            b.checkWorldBounds = true;
            b.events.onOutOfBounds.add(this.resetBullet, this);
        }

        for (var i = 0; i < 20; i++)
        {
            var b = ship3Bullets.create(0, 0, 'bullet3');
            b.exists = false;
            b.visible = false;
            b.checkWorldBounds = true;
            b.events.onOutOfBounds.add(this.resetBullet, this);
        }

        // Initialise remote players array
        remotePlayers = [];
        this.setEventHandlers(game);
	},

    /**************************************************
    ** GAME EVENT HANDLERS
    **************************************************/

    setEventHandlers: function(game) {
        console.log("setEventHandlers");
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

        socket.on("add ship", this.onAddShip);

        socket.on("add tower", this.onAddTower);

        socket.on("sell tower", this.onSellTower);

        socket.on("level up", this.onLevelUp);

    },

    // Socket connected
    onSocketConnected: function() {
        console.log("Connected to socket server");
        // Send local player data to the game server
        socket.emit("new player", {x: user.getName(), y: user.getType()});
    },

    // Socket disconnected
    onSocketDisconnect:function() {
        console.log("Disconnected from socket server");
    },

    // New player
    onNewPlayer:function(data) {  // should not add player!
        console.log("I onNewPalyer New player connected: "+ data.id);

        // Initialise the new player
        /*var newUser = new User("Sofie", data.getType());
        newUser.id = data.id;

        // Add new player to the remote players array
        remotePlayers.push(newUser);*/
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

    onAddShip:function(data){
        thisCopy.addShipStep2(data.rot, data.type, data.id);
    },

    onAddTower: function(input){
        var object = {x: input.x, y: input.y, id: input.id, damage: input.damage, type: input.type, cost: input.cost, range: input.range, rangeX: input.rangeX, rangeY: input.rangeY}
        thisCopy.addTowerStep2(object);
    },

    onSellTower: function(input){

        attackTowerArray[input.number].position.x = 2000;
        attackTowers[input.number].position.x = 2000;
        towerRangeArray[input.number].position.x = 2000;
    },

    onLevelUp: function(input){

        user.towers[input.number].levelUp();

    },

 	plot: function () {
        var x = 1 / this.game.width;
        var j = 0;
        this.path = [];

        for (var i = 0; i <= 1; i += x, j++)
        {
            var px = this.math.catmullRomInterpolation(this.points.x, i);
            var py = this.math.catmullRomInterpolation(this.points.y, i);
       
            path.push( { x: px, y: py });

            if(j % 10 == 0)
            {
                pathSprite = this.game.add.sprite(px, py, 'blackhole');
                pathSprite.height = SIZE_OF_PATH;
                pathSprite.width = SIZE_OF_PATH;
                pathSprite.anchor.setTo(0.5, 0.5);
                pathSprite.alpha = 0;
                pathArray.push(pathSprite);
            }

            this.bmd.rect(px, py, 1, 1, 'rgba(255, 255, 255, 1)'); 
         }

         for (var i = 0; i < path.length; i++)
         {
            pathReversed[i] = path[path.length - i - 1];
         }
    },

	update: function(game){
            planetSprite1.x = 60;
            planetSprite1.y = this.game.height/2 - 20;
            planetSprite2.x = this.game.width - 140;
            planetSprite2.y = this.game.height/2 - 60;
   
	    if(updateText){
            moneyTextUser.setText(user.getMoney());
            healthTextUser.setText(user.getHealth());
            moneyTextOpponent.setText(opponent.getMoney());
            healthTextOpponent.setText(opponent.getHealth());

            updateText = false;
	     }

	      if(user.spaceShips.length != 0 && healthArray.length != 0)
            {
                for( i = 0; i < user.spaceShips.length; i++)
                {

                    if(spaceSpriteArray[i].id == 1)
                    {
                        spaceSpriteArray[i].x = path[user.spaceShips[i].getPathIndex()].x;
                        spaceSpriteArray[i].y = path[user.spaceShips[i].getPathIndex()].y;
                        spaceSpriteArray[i].index = i;

                        healthArray[i+2].x = path[user.spaceShips[i].getPathIndex()].x - spaceSpriteArray[i].width/2;
                        healthArray[i+2].y = path[user.spaceShips[i].getPathIndex()].y - spaceSpriteArray[i].height;
                        
                        if(user.spaceShips[i].getRotation())
                        {
                            if(spaceSpriteArray[i].y > 350)
                                spaceSpriteArray[i].angle -= 0.45;
                            else
                                spaceSpriteArray[i].angle += 0.45;
                        }
                    }

                    else if(spaceSpriteArray[i].id == 2)
                    {
                        spaceSpriteArray[i].x = pathReversed[user.spaceShips[i].getPathIndex()].x;
                        spaceSpriteArray[i].y = pathReversed[user.spaceShips[i].getPathIndex()].y;
                        spaceSpriteArray[i].index = i;

                        healthArray[i+2].x = pathReversed[user.spaceShips[i].getPathIndex()].x - spaceSpriteArray[i].width/2;
                        healthArray[i+2].y = pathReversed[user.spaceShips[i].getPathIndex()].y - spaceSpriteArray[i].height;

                        if(user.spaceShips[i].getRotation())
                        {
                            if(spaceSpriteArray[i].y < 350)
                                spaceSpriteArray[i].angle -= 0.45;
                            else
                                spaceSpriteArray[i].angle += 0.45;
                        }
                    }


                    user.spaceShips[i].addPathIndex();

                    if (user.spaceShips[i].getPathIndex() >= path.length && spaceSpriteArray[i].id == 1)
                    {
                        var explosion = explosions.getFirstExists(false);
                        explosion.reset(spaceSpriteArray[i].x, spaceSpriteArray[i].y);
                        //explosion.body.velocity.y = enemy.body.velocity.y;
                        explosion.alpha = 0.7;
                        explosion.play('explosion', 30, false, true);

                        if(healthArray[1].width > 0){
                            updateHealthBar(1, user.spaceShips[i].getDamage());
                        } else {
                            updateText = true;
                            this.gameOver(this.game);
                        }

                        spaceSpriteArray[i].kill();
                        spaceSpriteArray.splice(i, 1);
                        healthArray[i+2].kill();
                        healthArray.splice(i+2,1);
                        user.spaceShips.splice(i, 1);
                    }
                    else if(user.spaceShips[i].getPathIndex() >= path.length && spaceSpriteArray[i].id == 2)
                    {
                        var explosion = explosions.getFirstExists(false);
                        explosion.reset(spaceSpriteArray[i].x, spaceSpriteArray[i].y);
                        //explosion.body.velocity.y = enemy.body.velocity.y;
                        explosion.alpha = 0.7;
                        explosion.play('explosion', 30, false, true);

                        if(healthArray[0].width > 0){
                            updateHealthBar(0, user.spaceShips[i].getDamage());
                        } else {
                            updateText = true;
                            this.gameOver(this.game);
                        }

                        spaceSpriteArray[i].kill();
                        spaceSpriteArray.splice(i, 1);
                        healthArray[i+2].kill();
                        healthArray.splice(i+2,1);
                        user.spaceShips.splice(i, 1);
                    }

                    this.game.physics.arcade.collide(spaceSpriteArray[i], towerBullets, collisionHandlerTower, null, {i:i});
                }
            }

             if(placingTower)
            {
                towerSprite.position.x = this.game.input.x - centerTower;
                towerSprite.position.y = this.game.input.y - centerTower;
                towerRangeSprite.position.x = this.game.input.x - 150;
                towerRangeSprite.position.y = this.game.input.y -150;

                available = true;

                for (var i = 0; i < pathArray.length; i++)
                {
                    
                        if(this.checkCollision(towerSprite, pathArray[i]))
                        {
                            towerSprite.loadTexture(towerSpriteNow + "-denied", 1);
                            available = false;
                            break;
                        }
                        else
                        {
                            towerSprite.loadTexture(towerSpriteNow, 1);
                        }
                }

                for (var i = 0; i < attackTowerArray.length; i++)
                {
                        if(this.checkCollision(towerSprite, attackTowerArray[i]))
                        {
                            towerSprite.loadTexture(towerSpriteNow + "-denied", 1);
                            available = false;
                            break;
                        }
                }
            }

            // check planet health
            if(healthArray[0].width > 0 && healthArray[1].width > 0){
                this.game.physics.arcade.collide(planetSprite1, ship1Bullets, collisionHandlerPlanet, null, {i:i, planet:0});
                this.game.physics.arcade.collide(planetSprite1, ship2Bullets, collisionHandlerPlanet, null, {i:i, planet:0});
                this.game.physics.arcade.collide(planetSprite1, ship3Bullets, collisionHandlerPlanet, null, {i:i, planet:0});

                this.game.physics.arcade.collide(planetSprite2, ship1Bullets, collisionHandlerPlanet, null, {i:i, planet:1});
                this.game.physics.arcade.collide(planetSprite2, ship2Bullets, collisionHandlerPlanet, null, {i:i, planet:1});
                this.game.physics.arcade.collide(planetSprite2, ship3Bullets, collisionHandlerPlanet, null, {i:i, planet:1});
            }
             else{
                updateText = true;
                this.gameOver(this.game);
            }

            timer = Math.floor(this.game.time.now / 1000);

            for( var i = 0; i < spaceSpriteArray.length; i++){

                if(timer > (user.spaceShips[i].fireTime + user.spaceShips[i].lastFiringTime))
                {
                    //console.log(spaceSpriteArray[i].key + "  " + user.spaceShips[i].lastFiringTime + " timer " + timer);
                    if(spaceSpriteArray[i].id == 1){
                        if(spaceSpriteArray[i].key == 'ship1'){
                             this.ship1Fire(i, 1);
                             user.spaceShips[i].lastFiringTime = timer;
                        }
                        if(spaceSpriteArray[i].key == 'ship2'){
                            this.ship2Fire(i, 1);
                            user.spaceShips[i].lastFiringTime = timer;
                        }
                        if(spaceSpriteArray[i].key == 'ship3'){
                            this.ship3Fire(i, 1);
                            user.spaceShips[i].lastFiringTime = timer;
                        }
                    }

                    if(spaceSpriteArray[i].id == 2){
                        if(spaceSpriteArray[i].key == 'ship1'){
                             this.ship1Fire(i, 2);
                             user.spaceShips[i].lastFiringTime = timer;
                        }
                        if(spaceSpriteArray[i].key== 'ship2'){
                            this.ship2Fire(i, 2);
                            user.spaceShips[i].lastFiringTime = timer;
                        }
                        if(spaceSpriteArray[i].key == 'ship3'){
                            this.ship3Fire(i, 2);
                            user.spaceShips[i].lastFiringTime = timer;
                        }
                    }
                }
            }


            if(timer > lastBlink + blinkingTime)
            {
                shiningStar = game.add.sprite(100, 100, 'blinkingStar');
                var blink = shiningStar.animations.add("blinkingStar");
                shiningStar.position.x = this.rnd.integerInRange(100, 900);
                shiningStar.position.y = this.rnd.integerInRange(100, 600);
                shiningStar.animations.play("blinkingStar", 15, false, true);
                lastBlink = timer;
            }

            if(timer > lastStarFall + starFallTime)
            {
                starFall = game.add.sprite(200, 200, 'fallingStar');
                var fall = starFall.animations.add('fallingStar');
                starFall.width = 200;
                starFall.position.x = this.rnd.integerInRange(100, 900);
                starFall.position.y = this.rnd.integerInRange(100, 600);
                starFall.angle = this.rnd.integerInRange(-180, 180);
                starFall.animations.play("fallingStar", 15, false, true);
                lastStarFall = timer;
            }

            for (var i = 0; i < attackTowers.length; i++)
            {
                for(var j = 0; j < user.spaceShips.length; j++)
                {
                    if(Math.abs(attackTowers[i].position.x - spaceSpriteArray[j].x) < user.towers[i].getRange() && Math.abs(attackTowers[i].position.y - spaceSpriteArray[j].y) < user.towers[i].getRange() && attackTowers[i].id != spaceSpriteArray[j].id)
                    {
                        if(user.towers[i].lastFiringTime < timer + user.towers[i].fireTime)
                        {
                            this.towerFire(i, j);
                            user.towers[i].lastFiringTime = timer;
                        }
                    }
                }
            }
        },

    gameOver: function(game){

        shipButton1.inputEnabled = false;
        shipButton2.inputEnabled = false;
        shipButton3.inputEnabled = false;

        addTowerButton1.inputEnabled = false;
        addTowerButton2.inputEnabled = false;
        addTowerButton3.inputEnabled = false;

        for(var i = 0; i < spaceSpriteArray.length; i++){
            spaceSpriteArray[i].destroy();
            healthArray[i+2].destroy();
        }

        ship1Bullets.callAll('kill');
        ship2Bullets.callAll('kill');
        ship3Bullets.callAll('kill');
        towerBullets.callAll('kill');

        game.add.sprite(0,0, 'gameoverMenu_win');
        playAgainButton = game.add.button(game.world.centerX - 250, this.game.height/2, 'playAgainButton', this.actionOnClickAgainPlay, this, 2, 1, 0);
        exitButton = game.add.button(game.world.centerX - 250,  this.game.height/2 + 200, 'backToMenuButton', this.actionOnClickExit, this, 2, 1, 0);
    },

    actionOnClickAgainPlay:function(){
        this.resetVariables();
        this.game.state.start(this.game.state.current);
    },

    actionOnClickExit:function(){
        this.resetVariables();
        this.game.state.start('MainMenu');
    },

	/*********************************/
    /********  Tower functions *******/
    /*********************************/

    setTower: function(){

        if(user.getMoney() >= costNow)
        {
            placingTower = false;
            user.buy(costNow);
            socket.emit('add tower',{x: towerSprite.position.x, y: towerSprite.position.y, id: uniqeID, damage: damageNow, 
                type: typeNow, cost: costNow, range: rangeNow, rangeX: towerRangeSprite.position.x, rangeY: towerRangeSprite.position.y
            });
            attackTowerRangeSprite = this.game.add.sprite(towerRangeSprite.position.x, towerRangeSprite.position.y, 'towerRange' + rangeNow);
            console.log("placing tower and setting alpha on range");
            attackTowerRangeSprite.alpha = 0.1;
        }
    },

    addTowerStep2: function(input){

            var tower1 = new Tower(input.x, input.y, input.id, input.damage, input.type, input.cost);

            if(!attackTowerRangeSprite)
                attackTowerRangeSprite = this.game.add.sprite(2000, 2000, 'sun');

            towerRangeArray.push(attackTowerRangeSprite);
            attackTower = this.game.add.button(input.x, input.y, input.type, this.towerMenu, this);
            attackTower.height = 50;
            attackTower.width = 50;   
            attackTower.alpha = 0;
            attackTower.id = input.id;
            attackTowerSprite = this.game.add.sprite(input.x, input.y, input.type);
            if(input.id == 1)
                attackTowerSprite.tint = 0xCC3333;
            else
                attackTowerSprite.tint = 0xff00ff;


            if(input.type == "blackhole")
            {
                attackTowerSprite.loadTexture("blackhole-animation", 1);
                var spin = attackTowerSprite.animations.add('spins');
                attackTowerSprite.animations.play('spins', 8, true);
            }

            if(input.type == "asteroid")
            {
                attackTowerSprite.loadTexture("asteroid-animation", 1);
                var spin = attackTowerSprite.animations.add('spins');
                attackTowerSprite.animations.play('spins', 4, true);
            }

            if(input.type == 'sun')
            {
                attackTowerSprite.loadTexture("sun-animation", 1);
                var spin = attackTowerSprite.animations.add('spins');
                attackTowerSprite.animations.play('spins', 8, true);
            }
            
            attackTowerSprite.scale.setTo(0.5, 0.5);
            attackTowerSprite.inputEnabled = true;
            attackTowerSprite.id = input.id;
            attackTowerSprite.number = number;

            if(input.id == uniqeID)
            {
                attackTowerSprite.input.useHandCursor = true;
                attackTowerSprite.events.onInputDown.add(this.towerMenu, this);
            }

            updateText = true;

            user.towers.push(tower1);
            attackTowers.push(attackTower);
            attackTowerArray.push(attackTowerSprite);
            number++;
    },

    availableSpot: function(){

        if(placingTower && available)
            this.setTower();

        if(menuActive)
            this.killMenu();

        towerSprite.kill();
        towerRangeSprite.kill();
        placingTower = false;
    },



    towerFire: function(id1, id2){

        towerBullet = towerBullets.getFirstExists(false);

        if (towerBullet)
        {
            towerBullet.reset(user.towers[id1].x, user.towers[id1].y);
            this.game.physics.arcade.moveToObject(towerBullet, spaceSpriteArray[id2], 400);
        }
    },

    ship1Fire: function(id1, id2){
        var shipBullet;
        var opponetPlanet;

        shipBullet = ship1Bullets.getFirstExists(false);

        if(id2 == 1) {
            opponetPlanet = planetSprite2;
        }
        else{
            opponetPlanet = planetSprite1;
        }

        if (shipBullet)
        {
            shipBullet.reset(spaceSpriteArray[id1].x, spaceSpriteArray[id1].y);
            this.game.physics.arcade.moveToObject(shipBullet, opponetPlanet, 300);
        }
    },

        ship2Fire: function(id1, id2){
            var shipBullet;
            var opponetPlanet;

            shipBullet = ship2Bullets.getFirstExists(false);
            
            if(id2 == 1) {
                opponetPlanet = planetSprite2;
            }
            else{
                opponetPlanet = planetSprite1;
            }

            if (shipBullet)
            {
                shipBullet.reset(spaceSpriteArray[id1].x, spaceSpriteArray[id1].y);
                this.game.physics.arcade.moveToObject(shipBullet, opponetPlanet, 300);
            }
    },

        ship3Fire: function(id1, id2){
        console.log("ship3fire Key " + this.ship.key);
        var shipBullet;
        var opponetPlanet;

        shipBullet = ship3Bullets.getFirstExists(false);

        if(id2 == 1) {
            opponetPlanet = planetSprite2;
        }
        else{
            opponetPlanet = planetSprite1;
        }

        if (shipBullet)
        {
            shipBullet.reset(spaceSpriteArray[id1].x, spaceSpriteArray[id1].y);
            this.game.physics.arcade.moveToObject(shipBullet, opponetPlanet, 300);
        }
    },

    placeTower:function(button){

        damageNow = button.damage;
        costNow = button.cost;
        towerSpriteNow = button.spriteName;
        typeNow = button.type;
        rangeNow = button.range;
        placingTower = true;

        towerRangeSprite = this.game.add.sprite(this.game.input.x - 150 , this.game.input.y - 150, 'towerRange' + rangeNow);
        towerSprite = this.game.add.sprite(this.game.input.x - centerTower, this.game.input.y - centerTower, towerSpriteNow); 
        towerSprite.height = 50;
        towerSprite.width = 50;

        towerRangeSprite.alpha = 0.5;

        if(menuActive)
        {            
            this.killMenu();
        }
    },

    towerMenu:function(button){

        if(!placingTower)
        {

            if(menuActive)
                this.killMenu();

            menuActive = true;
            console.log(button);
            menuBackground = this.game.add.sprite(user.towers[button.number].x, user.towers[button.number].y, 'menuBackground');

            if(menuBackground.position.x > 750)
                menuBackground.position.x = 750;
            if(menuBackground.position.x < 50)
                menuBackground.position.x = 50;
            if(menuBackground.position.y > 500)
                menuBackground.position.y = 500;
            if(menuBackground.position.y < 50)
                menuBackground.position.y = 50;

            levelText = this.game.add.text(menuBackground.position.x + 50, menuBackground.position.y + 20, "Level " + user.towers[button.number].getLevel());
            menuBackground.scale.setTo(2.5,2);
            upgrade = this.game.add.button(menuBackground.position.x + 25, menuBackground.position.y + 60, 'menuItem', function() {this.levelUp(button)}, this);
            upgradeText = this.game.add.text(menuBackground.position.x + 35, menuBackground.position.y + 70, "Upgrade $" + costNow);
            upgrade.scale.setTo(2.9,2);
            sell = this.game.add.button(menuBackground.position.x + 25, menuBackground.position.y + 120, 'menuItem', function() {this.sellTower(button)}, this);
            sellText = this.game.add.text(menuBackground.position.x + 35, menuBackground.position.y + 130, "Sell $" + user.towers[button.number].getLevel() * 100 * 0.9);
            sell.scale.setTo(2.9,2);
        }
        else {
            towerSprite.kill();
            towerRangeSprite.kill();
            placingTower = false;
        }
    },

    sellTower:function(button){

        user.sell(user.towers[button.number].cost);
        updateText = true;
        attackTowerArray[button.number].position.x = 2000;
        attackTowers[button.number].position.x = 2000;
        towerRangeArray[button.number].position.x = 2000;

        socket.emit("sell tower", {number: button.number});

        if(menuActive)
        {            
            this.killMenu();
        }

    },

    levelUp:function(button){

        user.towers[button.number].levelUp();

        socket.emit("level up", {number : button.number});

        if(menuActive)
        {            
            this.killMenu();
        }
    },


    killMenu:function() {

        levelText.kill();
        menuBackground.kill();
        upgradeText.kill();
        upgrade.kill();
        sell.kill();
        sellText.kill();
        menuActive = false;
    },

    resetBullet:function (bullet) {

        bullet.kill();
        console.log("bullet out of this world");
    },

    checkCollision:function(spriteA, spriteB){

        var boundsA = spriteA.getBounds();
        var boundsB = spriteB.getBounds();
        return Phaser.Rectangle.intersects(boundsA, boundsB);
    },

	/*********************************/
    /********  Ship functions ********/
    /*********************************/
    addShip: function(input){

        // currRot = input.rot;
        // currType = input.type;

        if(user.getMoney() >= input.cost)
        {
            socket.emit("add ship", {rot: input.rot, type: input.type, id: uniqeID});
            user.buy(input.cost);
        }
    },

    addShipStep2: function(rot, type, idShip){

        updateText = true;
        this.ship = this.add.sprite(0,0, type);
        this.ship.anchor.set(0.5);
        this.ship.id = idShip;

        if(idShip == 2 && type != "ship2")
        {
            this.ship.angle += 180;
        }

        if(idShip == 1)
            this.ship.tint = 0xCC3333;
        else
            this.ship.tint = 0x00CC00;

        spaceSpriteArray.push(this.ship);


        healthArray.push(this.createHealthBar(40, 5,0,0));

        this.game.physics.enable(this.ship, Phaser.Physics.ARCADE);
        this.ship.body.immovable = true;
        spaceShip = new SpaceShip(0, type, rot, idShip);
        user.spaceShips.push(spaceShip);
        console.log(spaceShip);

    },


        resetVariables:function(){

            healthArray = [];
            spaceSpriteArray = [];
            attackTowerArray = [];
            attackTowers = [];
            healthArray = [];
            towerRangeArray = [];

            shipButton1 = null;
            shipButton2 = null;

            addTowerButton = null;
            tower = null;
            towerSprite = null;
            placingTower = false;
            updateText = false;

            user = null;
            opponent = null;

            path = [];
            id = 0;
            centerTower = 25;
            SIZE_OF_PATH = 30;
            pathArray = [];
            pathSprite = null;
            denied = false;
            menuBackground = null;
            levelText = null;
            sell = null;
            sellText;
            upgradeText;
            upgrade;
            available = true;
            towerSpriteNow;
            costNow;
            damageNow;
            typeNow;
            currRot;
            currType;
            menuActive = false;
            shipButton3 = null;

            moneyTextUser = null;
            moneyTextOpponent = null;

            ship = null;
            spaceShip = null;
        },


	/*********************************/
    /******  Healthbar functions *****/
    /*********************************/

    createHealthBar:function(w,h,x,y){
		// create a red rectangle to use as the health meter itself
        var healthBitmap = this.game.add.bitmapData(w, h);
        healthBitmap.ctx.beginPath();
        healthBitmap.ctx.rect(0, 0, healthBitmap.width, healthBitmap.height);
        healthBitmap.ctx.fillStyle = '#00e600';
        healthBitmap.ctx.fill();
     
        // create the health Sprite using the red rectangle bitmap data
        return health = this.game.add.sprite(x, y, healthBitmap);
	}
};

	function updateHealthBar(id, damage) {
        if(id < 2)
        {
            if((opponent.getHealth() - damage) > 0)
            {
                healthArray[id].width -= damage;  // user.getHealth 
                opponent.loseHealth(damage);
                updateText = true;
             } else
             {
                healthArray[id].width = 0;
                opponent.killPlanet();
            }
        } else{

            if((user.spaceShips[id-2].getHealth() - damage) > 0)
            {
                healthArray[id].width -= damage;
                user.spaceShips[id -2].loseHealth(damage);
            }else
            {
                healthArray[id].width = 0;
                user.spaceShips[id-2].killShip();
            } 
        }
	};


	/*********************************/
    /******  Collisionhandlers *******/
    /*********************************/

    function collisionHandlerPlanet (planetSprite, bullet){
        console.log(this);
	    var bulletType = bullet.key;
	    var damage;

	    switch(bulletType){
	    case 'bullet1':
	        damage = 1;
	    break;
	    case 'bullet2':
	        damage = 2;
	    break;
	    case 'bullet3':
	        damage = 5;
	    break;
	    }
        console.log("damage " + damage +"planernr"+ this.planet);
	    bullet.kill();
        updateHealthBar(this.planet, damage);
	};

   function collisionHandlerTower(ship, bullet) {
	    if(healthArray[this.i+2].width > 0)
	    {
	        updateHealthBar(this.i +2, 7);
	    } 
	    else 
	    {
	        spaceSpriteArray.splice(this.i, 1);
	        user.spaceShips.splice(this.i, 1);
	        healthArray[this.i+2].kill();
	        healthArray.splice(this.i+2,1); 
	        ship.kill();
	    }
	    bullet.kill();
	};

    // Find player by ID
    function playerById(id) {
        var i;
        for (i = 0; i < remotePlayers.length; i++) {
            if (remotePlayers[i].id == id)
                return remotePlayers[i];
        };
        
        return false;
    };   

