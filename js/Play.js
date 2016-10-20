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
    var healthArray = [];
    var towerRangeArray = [];

    var bullet;
    var ship1Bullet = null;
    var ship2Bullet = null;
    var ship3Bullet  = null;

    var explosions = null;
    var explosions2 = null;
    var firingTimer = 0;

    var planetSprite1 = null;
    var planetSprite2 = null;

    var towerBullets = null;

    var towerBulletBlackhole = null;
    var towerBulletsAsteroid = null;
    var towerbulletsSun = null;

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
    var restartedGame = false;

    var playAgainButton;
    var exitButton;
    var moveUp = -50;
    var esc;
    var gameOverBool = false;
    var gameoverSprite;
    var localType;


Game.Play = function (game) {

 	this.bmd = null;
    this.mode = 0;
    var background = null; 

    this.points = {
        'x': [ 100, 200, 400, 600, 800, 900 ],
        'y': [ 350 + moveUp, 200 + moveUp, 500 + moveUp, 200 + moveUp, 500 + moveUp, 350 + moveUp ]
    };
};

Game.Play.prototype = {

    init: function(type, name, type1, name1, data){
        if(!restartedGame)
        {
            localName = name;
            localType = type;
            opponentName = name1;
            opponentType = type1;
            uniqeID = data.id;
        }
    },

	create: function(game){

        gameCopy = this.game;
        thisCopy = this;

        esc = game.input.keyboard.addKey(Phaser.Keyboard.ESC);

        socket = io.connect("http://localhost", {port: 8000, transports: ["websocket"]});

        // Initialise the local player
        user = new User(localName, localType);
        opponent = new User(opponentName, opponentType);

		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        this.scale.maxHeight = 500;
        this.scale.maxWidth = 1000;

        if((opponentType == "venus" || localType == "venus") && (opponentType == "neptune" || localType == "neptune"))
        {
            var background = this.game.add.sprite(0,0, 'background-neptune-venus');
            console.log("opponent: " + opponentType + " \nlocal: " + localType + "\nID: " + uniqeID);
            if((uniqeID == 2 && localType == "neptune") || (uniqeID == 1 && localType == "venus"))
                var background = this.game.add.sprite(0,0, 'background-venus-neptune');
        }

        if((opponentType == "neptune" || localType == "neptune") && (opponentType == "earth" || localType == "earth"))
        {
            var background = this.game.add.sprite(0,0, 'background-neptune-earth');
            console.log("opponent: " + opponentType + " \nlocal: " + localType + "\nID: " + uniqeID);
            if((uniqeID == 2 && localType == "neptune") || (uniqeID == 1 && localType == "earth"))
                var background = this.game.add.sprite(0,0, 'background-earth-neptune');
        }

        if((opponentType == "neptune" || localType == "neptune") && (opponentType == "moon" || localType == "moon"))
        {
            var background = this.game.add.sprite(0,0, 'background-neptune-moon');
            console.log("opponent: " + opponentType + " \nlocal: " + localType + "\nID: " + uniqeID);
            if((uniqeID == 2 && localType == "neptune") || (uniqeID == 1 && localType == "moon"))
                var background = this.game.add.sprite(0,0, 'background-moon-neptune');

        }

        if((opponentType == "earth" || localType == "earth") && (opponentType == "moon" || localType == "moon"))
        {
            var background = this.game.add.sprite(0,0, 'background-moon-earth');
            console.log("opponent: " + opponentType + " \nlocal: " + localType + "\nID: " + uniqeID);
            if((uniqeID == 2 && localType == "moon") || (uniqeID == 1 && localType == "earth"))
                var background = this.game.add.sprite(0,0, 'background-earth-moon');
        }

        if((opponentType == "venus" || localType == "venus") && (opponentType == "moon" || localType == "moon"))
        {
            var background = this.game.add.sprite(0,0, 'background-moon-venus');
            console.log("opponent: " + opponentType + " \nlocal: " + localType + "\nID: " + uniqeID);
            if((uniqeID == 2 && localType == "moon") || (uniqeID == 1 && localType == "venus"))
                var background = this.game.add.sprite(0,0, 'background-venus-moon');
        }

        if((opponentType == "earth" || localType == "earth") && (opponentType == "venus" || localType == "venus"))
        {
            var background = this.game.add.sprite(0,0, 'background-earth-venus');
            console.log("opponent: " + opponentType + " \nlocal: " + localType + "\nID: " + uniqeID);
            if((uniqeID == 2 && localType == "earth") || (uniqeID == 1 && localType == "venus"))
                var background = this.game.add.sprite(0,0, 'background-venus-earth');
        }


        // var background = this.game.add.sprite(0,0, 'background2'); 
        background.inputEnabled = true;
        background.events.onInputDown.add(this.availableSpot, this);

	 	var graphics = this.game.add.graphics(0, 0);
        graphics.beginFill(0x000000);
        graphics.alpha = 0.6;
        graphics.drawRect(0, this.game.height - 80, 1000, 120);
        window.graphics = graphics;


        var style = { font: "bold 25px DK", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        var style1 = { font: "bold 35px DK", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

        moneyTextUser = this.game.add.text(90, this.game.height - 77, user.getMoney() , style1);
        var coinSprite = this.game.add.sprite(30, this.game.height - 75, 'coin');
        coinSprite.width = 35;
        coinSprite.height = 35;

        healthTextUser = this.game.add.text(90, this.game.height - 40, user.getHealth(), style1);
        var lifeSprite = this.game.add.sprite(30, this.game.height - 40, 'heart');
        lifeSprite.width = 35;
        lifeSprite.height = 35;

        this.bmd = this.add.bitmapData(this.game.width, this.game.height);
        this.bmd.addToWorld();

        this.bitmaphealth = this.add.bitmapData(this.game.width, this.game.height);
        this.bitmaphealth.addToWorld();

        shipButton1 = this.game.add.button(this.game.width - 150, 625, 'ship1-' + localType, this.addShip , this, 2, 1, 0);
        shipButton2 = this.game.add.button(this.game.width - 250, 625, 'ship2-' + localType, this.addShip, this, 2, 1, 0);
        shipButton3 = this.game.add.button(this.game.width - 350, 625, 'ship3-' + localType, this.addShip, this, 2, 1, 0);


        shipButton1.height = 50;
        shipButton1.width = 50;
        shipButton2.height = 50;
        shipButton2.width = 50;
        shipButton3.height = 50;
        shipButton3.width = 50;

        shipButton1.type = "ship1";
        shipButton2.type = "ship2";
        shipButton3.type = "ship3";

        shipButton1.cost = 500;
        shipButton2.cost = 300;
        shipButton3.cost = 200;

        shipButton1.rot = true;
        shipButton2.rot = false;
        shipButton3.rot = true;
    
        shipCostText1 = this.game.add.text(this.game.width - 150, 675, "$ " + shipButton1.cost, style);
        shipCostText2 = this.game.add.text(this.game.width - 250, 675, "$ " + shipButton2.cost, style);
        shipCostText3 = this.game.add.text(this.game.width - 350, 675, "$ " + shipButton3.cost, style);
        
        addTowerButton1 = this.game.add.button(230, 625, "blackhole-" + localType, this.placeTower);
        addTowerButton1.height = 50;
        addTowerButton1.width = 50;
        addTowerButton1.range = 100;

	    addTowerButton2 = this.game.add.button(330, 625, "sun-" + localType, this.placeTower);
	    addTowerButton2.height = 50;
	    addTowerButton2.width = 50;
        addTowerButton2.range = 125;

	    addTowerButton3 = this.game.add.button(430, 625, "asteroidsprite-" + localType, this.placeTower);
	    addTowerButton3.height = 50;
	    addTowerButton3.width = 50;
        addTowerButton3.range = 150;

	    addTowerButton1.cost = 100;
	    addTowerButton2.cost = 200;
	    addTowerButton3.cost = 300;

	    addTowerButton1.damage = 10;
	    addTowerButton2.damage = 20;
	    addTowerButton3.damage = 30;

	    addTowerButton1.type = "blackhole-";
        addTowerButton2.type = "sun-";
        addTowerButton3.type = "asteroidsprite-";

        addTowerButton1.spriteName = "blackhole-" + localType;
        addTowerButton2.spriteName = "sun-" + localType;
        addTowerButton3.spriteName = "asteroidsprite-" + localType;

        towerCostText1 = this.game.add.text(232, 675, "$ " + addTowerButton1.cost, style);
        towerCostText2 = this.game.add.text(332, 675, "$ " + addTowerButton2.cost, style);
        towerCostText3 = this.game.add.text(432, 675, "$ " + addTowerButton3.cost, style);

        if(uniqeID == 1){
            planetSprite1 = this.game.add.sprite(60, this.game.height/2 + moveUp - 20, user.getType());
            healthArray.push(this.createHealthBar(planetSprite1.width, 8, planetSprite1.x , planetSprite1.y - 20));
            this.game.physics.enable(planetSprite1, Phaser.Physics.ARCADE);
            planetSprite1.enableBody = true;
            planetSprite1.immovable = true;

            planetSprite2 = this.game.add.sprite(this.game.width - 140, this.game.height/2 - 60 + moveUp, opponent.getType());
            healthArray.push(this.createHealthBar(planetSprite2.width , 8, planetSprite2.x , planetSprite2.y - 20));
            this.game.physics.enable(planetSprite2, Phaser.Physics.ARCADE);
            planetSprite2.enableBody = true;
            planetSprite2.immovable = true;
            console.log(planetSprite1.width + ", " + planetSprite2.width);
          }

          else
          {
            planetSprite1 = this.game.add.sprite(60, this.game.height/2 - 20 + moveUp, opponent.getType());
            healthArray.push(this.createHealthBar(planetSprite1.width, 8, planetSprite1.x , planetSprite1.y - 20));
            this.game.physics.enable(planetSprite1, Phaser.Physics.ARCADE);
            planetSprite1.enableBody = true;
            planetSprite1.immovable = true;


            planetSprite2 = this.game.add.sprite(this.game.width - 140, this.game.height/2 - 60 + moveUp, user.getType());
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

        towerBulletBlackhole = this.game.add.group();
        towerBulletBlackhole.enableBody = true;


        towerbulletsSun = this.game.add.group();
        towerbulletsSun.enableBody = true;

        towerBulletsAsteroid = this.game.add.group();
        towerBulletsAsteroid.enableBody = true;


        for (var i = 0; i < 20; i++)
        {
            var b = towerBulletBlackhole.create(0, 0, 'bullet1');
            b.exists = false;
            b.visible = false;
            b.checkWorldBounds = true;
            b.events.onOutOfBounds.add(this.resetBullet, this);
        }
        
        for (var i = 0; i < 20; i++)
        {
            var b = towerbulletsSun.create(0, 0, 'bulletSun');
            b.exists = false;
            b.visible = false;
            b.checkWorldBounds = true;
            b.events.onOutOfBounds.add(this.resetBullet, this);
        }
                for (var i = 0; i < 20; i++)
        {
            var b = towerBulletsAsteroid.create(0, 0, 'bulletAsteroid');
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

        socket.on("play again", this.onPlayAgain);

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
        thisCopy.addShipStep2(data.rot, data.type, data.id, data.cost);

    },

    onAddTower: function(input){
        var object = {x: input.x, y: input.y, id: input.id, damage: input.damage, type: input.type, cost: input.cost, range: input.range, rangeX: input.rangeX, rangeY: input.rangeY, localType: input.localType}
        thisCopy.addTowerStep2(object);
        console.log("onAddTower");
    },

    onSellTower: function(input){

        attackTowerArray[input.number].position.x = 2000;
        towerRangeArray[input.number].position.x = 2000;
    },

    onLevelUp: function(input){

        console.log(input.texture);
        attackTowerArray[input.number].loadTexture(String(input.texture));
        var spin = attackTowerArray[input.number].animations.add('spins');
        attackTowerArray[input.number].animations.play('spins', 8, true);
        user.towers[input.number].levelUp();

        if(attackTowerArray[input.number].key.indexOf("blackhole") >= 0)
        {
            attackTowerArray[input.number].width += 20;
            attackTowerArray[input.number].position.x -= 10;
            attackTowerArray[input.number].height += 20;
            attackTowerArray[input.number].position.y -= 10;
        }

    },

    onPlayAgain: function(){
        thisCopy.resetVariables();
        thisCopy.game.state.start(thisCopy.game.state.current);
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
            planetSprite1.y = this.game.height/2 - 20 + moveUp;
            planetSprite2.x = this.game.width - 140;
            planetSprite2.y = this.game.height/2 - 60 + moveUp;

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

                if(healthArray[0].width <= 0){
                    updateText = true;
                    if(!gameOverBool){
                        this.gameOver(this.game, 1);
                    }
                }
                if(healthArray[1].width <= 0)
                    updateText = true;
                    if(!gameOverBool){
                        this.gameOver(this.game, 2);
                    }
                }

            this.checkIfAfford();

            if(!gameOverBool){

    	    if(updateText){
                moneyTextUser.setText(user.getMoney());
                healthTextUser.setText(user.getHealth());

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
                                if(spaceSpriteArray[i].y > path[0].y)
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
                                if(spaceSpriteArray[i].y < path[0].y)
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

                            if(healthArray[1].width > 0)
                            {
                                updateHealthBar(1, user.spaceShips[i].getDamage());
                            } 
                            else 
                            {
                                if(!gameOverBool){
                                    this.gameOver(this.game, 2);
                                }
                            }
                            updateText = true;
                            

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
                                if(!gameOverBool){
                                    this.gameOver(this.game,1);
                                }
                            }

                            spaceSpriteArray[i].kill();
                            spaceSpriteArray.splice(i, 1);
                            healthArray[i+2].kill();
                            healthArray.splice(i+2,1);
                            user.spaceShips.splice(i, 1);
                        }

                        this.game.physics.arcade.collide(spaceSpriteArray[i], towerBulletBlackhole, collisionHandlerTower, null, {i:i});
                        this.game.physics.arcade.collide(spaceSpriteArray[i], towerbulletsSun, collisionHandlerTower, null, {i:i});
                        this.game.physics.arcade.collide(spaceSpriteArray[i], towerBulletsAsteroid, collisionHandlerTower, null, {i:i});
                    }
                }

                if(placingTower)
                {

                    if(esc.isDown || this.game.input.activePointer.rightButton.isDown)
                    {
                        //console.log("come on");
                        towerSprite.kill();
                        towerRangeSprite.kill();
                        placingTower = false;
                    }

                    towerSprite.position.x = this.game.input.x - centerTower;
                    towerSprite.position.y = this.game.input.y - centerTower;
                    towerRangeSprite.position.x = this.game.input.x - 150;
                    towerRangeSprite.position.y = this.game.input.y -150;

                    available = true;

                    for (var i = 0; i < pathArray.length; i++)
                    {
                        
                            if(this.checkCollision(towerSprite, pathArray[i]) || towerSprite.position.y > 580)
                            {
                                towerSprite.loadTexture(towerSpriteNow + "-denied", 1);
                                towerRangeSprite.tint = 0xff0000;
                                available = false;
                                break;
                            }
                            else
                            {
                                towerRangeSprite.tint = 0xffffff;
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


                timer = Math.floor(this.game.time.now / 1000);

                for( var i = 0; i < spaceSpriteArray.length; i++){

                    if(timer > (user.spaceShips[i].fireTime + user.spaceShips[i].lastFiringTime))
                    {

                        if(uniqeID == 1){
                            if(spaceSpriteArray[i].id == 1){
                                if(spaceSpriteArray[i].key == 'ship1-animation-' + localType){
                                     this.ship1Fire(i, 1);
                                     user.spaceShips[i].lastFiringTime = timer;
                                }
                                if(spaceSpriteArray[i].key == 'ship2-animation-' + localType){
                                    this.ship2Fire(i, 1);
                                    user.spaceShips[i].lastFiringTime = timer;
                                }
                                if(spaceSpriteArray[i].key == 'ship3-animation-' + localType){
                                    this.ship3Fire(i, 1);
                                    user.spaceShips[i].lastFiringTime = timer;
                                }
                            }

                            if(spaceSpriteArray[i].id == 2){
                                if(spaceSpriteArray[i].key == 'ship1-animation-' + opponentType){
                                     this.ship1Fire(i, 2);
                                     user.spaceShips[i].lastFiringTime = timer;
                                }
                                if(spaceSpriteArray[i].key== 'ship2-animation-' + opponentType){
                                    this.ship2Fire(i, 2);
                                    user.spaceShips[i].lastFiringTime = timer;
                                }
                                if(spaceSpriteArray[i].key == 'ship3-animation-' + opponentType){
                                    this.ship3Fire(i, 2);
                                    user.spaceShips[i].lastFiringTime = timer;
                                }
                            }
                        }

                        if(uniqeID == 2){
                            if(spaceSpriteArray[i].id == 1){
                                if(spaceSpriteArray[i].key == 'ship1-animation-' + opponentType){
                                     this.ship1Fire(i, 1);
                                     user.spaceShips[i].lastFiringTime = timer;
                                }
                                if(spaceSpriteArray[i].key == 'ship2-animation-' + opponentType){
                                    this.ship2Fire(i, 1);
                                    user.spaceShips[i].lastFiringTime = timer;
                                }
                                if(spaceSpriteArray[i].key == 'ship3-animation-' + opponentType){
                                    this.ship3Fire(i, 1);
                                    user.spaceShips[i].lastFiringTime = timer;
                                }
                            }

                            if(spaceSpriteArray[i].id == 2){
                                if(spaceSpriteArray[i].key == 'ship1-animation-' + localType){
                                     this.ship1Fire(i, 2);
                                     user.spaceShips[i].lastFiringTime = timer;
                                }
                                if(spaceSpriteArray[i].key== 'ship2-animation-' + localType){
                                    this.ship2Fire(i, 2);
                                    user.spaceShips[i].lastFiringTime = timer;
                                }
                                if(spaceSpriteArray[i].key == 'ship3-animation-' + localType){
                                    this.ship3Fire(i, 2);
                                    user.spaceShips[i].lastFiringTime = timer;
                                }
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

                for (var i = 0; i < attackTowerArray.length; i++)
                {
                    for(var j = 0; j < user.spaceShips.length; j++)
                    {
                        if(Math.abs(attackTowerArray[i].position.x - spaceSpriteArray[j].x) < user.towers[i].getRange() && Math.abs(attackTowerArray[i].position.y - spaceSpriteArray[j].y) < user.towers[i].getRange() && attackTowerArray[i].id != spaceSpriteArray[j].id)
                        {
                            if(user.towers[i].lastFiringTime < timer + user.towers[i].fireTime)
                            {
                                //console.log(attackTowers[i].key);
                                if(attackTowerArray[i].key.indexOf("sun") >= 0){
                                    this.towerFireSun(i, j);
                                    user.towers[i].lastFiringTime = timer;
                                }
                                if(attackTowerArray[i].key.indexOf("blackhole") >= 0){
                                    this.towerFireBlack(i, j);
                                    user.towers[i].lastFiringTime = timer;
                                }
                                if(attackTowerArray[i].key.indexOf("asteroidsprite") >= 0){
                                    this.towerFireAsteroid(i, j);
                                    user.towers[i].lastFiringTime = timer;
                                }  
                            }
                        }
                    }
                }
            }

        },

    checkIfAfford: function(){
        if(user.getMoney() < shipButton1.cost){
            shipButton1.input.enabled = false;
            shipButton1.alpha = 0.5;
        }else{
            shipButton1.input.enabled = true;
            shipButton1.alpha = 1;
        }
        if(user.getMoney() < shipButton2.cost){
            shipButton2.input.enabled = false;
            shipButton2.alpha = 0.5;
        }else{
            shipButton2.input.enabled = true;
            shipButton2.alpha = 1;
        }
        if(user.getMoney() < shipButton3.cost){
            shipButton3.input.enabled = false;
            shipButton3.alpha = 0.5;
        }else{
            shipButton3.input.enabled = true;
            shipButton3.alpha = 1;
        }
        if(user.getMoney() < addTowerButton1.cost){
            addTowerButton1.input.enabled = false;
            addTowerButton1.alpha = 0.5;
        }else{
            addTowerButton1.input.enabled = true;
            addTowerButton1.alpha = 1;
        }
        if(user.getMoney() < addTowerButton2.cost){
            addTowerButton2.input.enabled = false;
            addTowerButton2.alpha = 0.5;
        }else{
            addTowerButton2.input.enabled = true;
            addTowerButton2.alpha = 1;
        }
        if(user.getMoney() < addTowerButton3.cost){
            addTowerButton3.input.enabled = false;
            addTowerButton3.alpha = 0.5;
        }else{
            addTowerButton3.input.enabled = true;
            addTowerButton3.alpha = 1;
        }
    },

    gameOver: function(game, id){
        if(!gameOverBool){
            gameOverBool = true;

            restartedGame = true;

            shipButton1.inputEnabled = false;
            shipButton2.inputEnabled = false;
            shipButton3.inputEnabled = false;

            addTowerButton1.inputEnabled = false;
            addTowerButton2.inputEnabled = false;
            addTowerButton3.inputEnabled = false;

            for(var i = 0; i < spaceSpriteArray.length; i++){
                spaceSpriteArray[i].destroy();
                healthArray[i+2].kill();
            }

            for(var i = 0; i < attackTowerArray.length; i++){
                attackTowerArray[i].kill();
            }

            for(var i = 0; i< towerRangeArray.length; i++){
                towerRangeArray[i].kill();
            }

            ship1Bullets.callAll('kill');
            ship2Bullets.callAll('kill');
            ship3Bullets.callAll('kill');

            towerBulletsAsteroid.callAll('kill');
            towerbulletsSun.callAll('kill');
            towerBulletBlackhole.callAll('kill');

            explosions.callAll('kill');

            
            if(id == 2 && uniqeID == 1)
            {
                gameoverSprite =  game.add.sprite(0,0, 'gameoverMenu_win');
            }
            if(id == 2 && uniqeID == 2){
                gameoverSprite = game.add.sprite(0,0, 'gameoverMenu_lost');
            }
            if(id == 1 && uniqeID == 1)
            {
                gameoverSprite =  game.add.sprite(0,0, 'gameoverMenu_lost');
            }
            if(id == 1 && uniqeID == 2){
                gameoverSprite = game.add.sprite(0,0, 'gameoverMenu_win');
            }
            
            playAgainButton = game.add.button(game.world.centerX - 250, 270, 'playAgainButton', this.actionOnClickAgainPlay, this, 2, 1, 0);
            exitButton = game.add.button(game.world.centerX - 250,  450, 'backToMenuButton', this.actionOnClickExit, this, 2, 1, 0);
        }
    },

    actionOnClickAgainPlay:function(){
        playAgainButton.kill();
        exitButton.kill();
        gameCopy.add.sprite(0,0, 'waitingForOpponent');

        socket.emit("play again");
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
            updateText = true;
            socket.emit('add tower',{x: towerSprite.position.x, y: towerSprite.position.y, id: uniqeID, damage: damageNow, localType: localType,
                type: typeNow, cost: costNow, range: rangeNow, rangeX: towerRangeSprite.position.x, rangeY: towerRangeSprite.position.y
            });
            attackTowerRangeSprite = this.game.add.sprite(towerRangeSprite.position.x, towerRangeSprite.position.y, 'towerRange' + rangeNow);
            //console.log("placing tower and setting alpha on range");
            attackTowerRangeSprite.alpha = 0.1;
        }
    },

    addTowerStep2: function(input){

            var tower1 = new Tower(input.x, input.y, input.id, input.damage, input.type + input.localType, input.cost, input.range);

            if(!attackTowerRangeSprite)
                attackTowerRangeSprite = this.game.add.sprite(2000, 2000, 'sun');

            towerRangeArray.push(attackTowerRangeSprite);
            attackTowerSprite = this.game.add.sprite(input.x, input.y, input.type + "" + input.localType);


            if(input.type == "blackhole-")
            {
                attackTowerSprite.loadTexture("blackhole-animation-" + input.localType + "-level1", 1);
                var spin = attackTowerSprite.animations.add('spins');
                attackTowerSprite.animations.play('spins', 8, true);
            }

            if(input.type == "asteroidsprite-")
            {
                attackTowerSprite.loadTexture("asteroidsprite-animation-" + input.localType + "-level1", 1);
                var spin = attackTowerSprite.animations.add('spins');
                attackTowerSprite.animations.play('spins', 4, true);
            }

            if(input.type == 'sun-')
            {
                attackTowerSprite.loadTexture("sun-animation-" + input.localType + "-level1", 1);
                var spin = attackTowerSprite.animations.add('spins');
                attackTowerSprite.animations.play('spins', 8, true);
            }
            
            attackTowerSprite.scale.setTo(0.5, 0.5);
            attackTowerSprite.inputEnabled = true;
            attackTowerSprite.id = input.id;
            attackTowerSprite.number = number;
            attackTowerSprite.type = input.type;
            attackTowerSprite.localType = input.localType;

            if(input.id == uniqeID)
            {
                attackTowerSprite.input.useHandCursor = true;
                attackTowerSprite.events.onInputDown.add(this.towerMenu, this);
            }

            updateText = true;

            user.towers.push(tower1);
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


    towerFireBlack: function(id1, id2){

        towerBullet = towerBulletBlackhole.getFirstExists(false);

        if (towerBullet)
        {
            towerBullet.reset(user.towers[id1].x, user.towers[id1].y);
            this.game.physics.arcade.moveToObject(towerBullet, spaceSpriteArray[id2], 400);
        }
    },

    towerFireSun: function(id1, id2){

        towerBullet = towerbulletsSun.getFirstExists(false);

        if (towerBullet)
        {
            towerBullet.reset(user.towers[id1].x, user.towers[id1].y);
            this.game.physics.arcade.moveToObject(towerBullet, spaceSpriteArray[id2], 400);
        }
    },

    towerFireAsteroid: function(id1, id2){

        towerBullet = towerBulletsAsteroid.getFirstExists(false);

        if (towerBullet)
        {
            towerBullet.reset(user.towers[id1].x, user.towers[id1].y);
            this.game.physics.arcade.moveToObject(towerBullet, spaceSpriteArray[id2], 400);
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
            //console.log(button);
            menuBackground = this.game.add.sprite(user.towers[button.number].x + 30, user.towers[button.number].y, 'backgroundTowerMenu');

            if(menuBackground.position.x > 750)
                menuBackground.position.x = 750;
            if(menuBackground.position.x < 50)
                menuBackground.position.x = 50;
            if(menuBackground.position.y > 500)
                menuBackground.position.y = 500;
            if(menuBackground.position.y < 50)
                menuBackground.position.y = 50;

            var style = { font: "normal 22px DK", fill: "#ffffff", align: "center" };

            levelText = this.game.add.text(menuBackground.position.x + 50, menuBackground.position.y + 3, "Level " + user.towers[button.number].getLevel(), style);
            upgrade = this.game.add.button(menuBackground.position.x + 6, levelText.position.y + 35, 'towerMenuButton', function() {this.levelUp(button)}, this);
            upgradeText = this.game.add.text(menuBackground.position.x + 12, upgrade.position.y + 3, "Upgrade $" + costNow, style);
            if(user.towers[button.number].getLevel() == 3)
            {
                upgrade.input.enabled = false;
                upgrade.alpha = 0.1;
                upgradeText.text = "Max Level";
            }

            sell = this.game.add.button(menuBackground.position.x + 6, upgradeText.position.y + 27, 'towerMenuButton', function() {this.sellTower(button)}, this);
            sellText = this.game.add.text(menuBackground.position.x + 12, sell.position.y + 3, "Sell $" + user.towers[button.number].getLevel() * 100 * 0.9, style);
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
        towerRangeArray[button.number].position.x = 2000;

        socket.emit("sell tower", {number: button.number});

        if(menuActive)
        {            
            this.killMenu();
        }

    },

    levelUp:function(button){

        var level = user.towers[button.number].getLevel() + 1;
        var texture = button.type + "animation-" + button.localType +  "-level" + level;

        socket.emit("level up", {number: button.number, texture: texture});

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
        //console.log("bullet out of this world");
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

        if(user.getMoney() >= input.cost)
        {
            socket.emit("add ship", {rot: input.rot, type: input.type, id: uniqeID, cost: input.cost});
            user.buy(input.cost);
            updateText = true;
        }
    },

    addShipStep2: function(rot, type, idShip, cost){
        var whatType;

        updateText = true;
        this.ship = this.add.sprite(0,0, type);
        this.ship.anchor.set(0.5);
        this.ship.id = idShip;

        if(uniqeID == 1){
            if(idShip == 1)
            {
                whatType = localType;
            }
            else{
                whatType = opponentType;
            }
        }

        if(uniqeID == 2){
            if(idShip == 2)
            {
                whatType = localType;
            }
            else{
                whatType = opponentType;
            }
        }

        if(type == 'ship1')
        {
            this.ship.loadTexture("ship1-animation-" + whatType, 1);
            var spin = this.ship.animations.add('spins');
            this.ship.animations.play('spins', 5, true);
        }
        if(type == 'ship2')
        {
            this.ship.loadTexture("ship2-animation-" + whatType, 1);
            var spin = this.ship.animations.add('spins');
            this.ship.animations.play('spins', 2, true);
        }
        if(type == 'ship3')
        {
            this.ship.loadTexture("ship3-animation-" + whatType, 1);
            var spin = this.ship.animations.add('spins');
            this.ship.animations.play('spins', 5, true);
        }

        if(idShip == 2 && type != "ship2")
        {
            this.ship.angle += 180;
        }

        spaceSpriteArray.push(this.ship);
        healthArray.push(this.createHealthBar(40, 5,0,0));

        this.game.physics.enable(this.ship, Phaser.Physics.ARCADE);
        this.ship.body.immovable = true;
        spaceShip = new SpaceShip(0, type, rot, idShip, cost);
        user.spaceShips.push(spaceShip);
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


        resetVariables:function(){

            healthArray = [];
            spaceSpriteArray = [];
            attackTowerArray = [];
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

            ship = null;
            spaceShip = null;
            gameOverBool = false;
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
            console.log(damage);
            if(id < 2)
            {
                if((opponent.getHealth() - damage) > 0)
                {
                    if(id == 0){
                        if(uniqeID == 1){
                            console.log("for uniqeID 1");
                            user.loseHealth(damage);
                            healthArray[0].width  = 77 * ((user.getHealth()/100));
                        }
                        if(uniqeID == 2){
                            console.log("for uniqeID 2");
                            opponent.loseHealth(damage);
                            healthArray[0].width  = 77 * ((opponent.getHealth()/100)); 
                        }
                    } 
                   
                     if(id == 1) {
                        if(uniqeID == 2){
                            console.log("for uniqeID 2");
                            user.loseHealth(damage);
                            healthArray[1].width  = 77 * ((user.getHealth()/100));
                        }
                        if(uniqeID == 1){
                            console.log("for uniqeID 1");
                            opponent.loseHealth(damage);
                            healthArray[1].width  = 77 * ((opponent.getHealth()/100)); 
                        }
                    } 
                    updateText = true;
                } 
                    else
                    {
                         if(id == 0){
                            if(uniqeID == 1){
                                healthArray[0].width = 0;
                                user.killPlanet();
                            }
                            if(uniqeID == 2){
                                healthArray[0].width = 0;
                                opponent.killPlanet();
                            }
                        } 
                         if(id == 1) {
                            if(uniqeID == 2){
                                healthArray[1].width = 0;
                                user.killPlanet();
                            }
                            if(uniqeID == 1){
                                healthArray[1].width = 0;
                                opponent.killPlanet();
                            }
                        } 
                    }
                }
                 else{
                    if((user.spaceShips[id-2].getHealth() - damage) > 0)
                    {
                        console.log("In updateHealthBar " + damage  + " uniqeID " + uniqeID);
                        healthArray[id].width -= damage;
                        user.spaceShips[id -2].loseHealth(damage);
                        updateText = true;
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
	    var bulletType = bullet.key;
	    var damage = 0;

	    switch(bulletType){
	    case 'bullet1':
	        damage = 3;
	    break;
	    case 'bullet2':
	        damage = 2;
	    break;
	    case 'bullet3':
	        damage = 1;
	    break;
	    }

	    bullet.kill();
        updateHealthBar(this.planet, damage);
	};

   function collisionHandlerTower(ship, bullet) {
    
        var bulletType = bullet.key;
        var damage = 0;


        switch(bulletType){
        case 'bulletAsteroid':
            damage = 30;
        break;
        case 'bulletSun':
            damage = 5;
        break;
        case 'bullet1':  // ÄNDRA TILL BLACKHOLE SEN!!!
            damage = 10;
        break;
        }

	    if(healthArray[this.i+2].width > 0)
	    {
	        updateHealthBar(this.i +2, damage);
	    } 
	    else 
	    {
            if(ship.id == 2 && uniqeID == 1){
                user.sell(user.spaceShips[this.i].getCost() * 0.5);
                updateText = true;
            }
            if(ship.id == 1 && uniqeID == 2){
                user.sell(user.spaceShips[this.i].getCost() * 0.5);
                updateText = true;
            }

            var explosion = explosions.getFirstExists(false);
            explosion.reset(ship.x, ship.y);
            //explosion.body.velocity.y = enemy.body.velocity.y;
            explosion.alpha = 0.7;
            explosion.play('explosion', 30, false, true);

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

