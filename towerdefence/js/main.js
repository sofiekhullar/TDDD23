var game = new Phaser.Game(1000, 700, Phaser.AUTO, 'game');

    var addTowerButton;
    var tower;
    var towerSprite;
    var placingTower = false;
    var updateText = false;
    var user = new User("Love", "earth");
    var path = [];
    var id = 0;
    var centerTower = 25;
    var DISTANCE_FROM_PATH = 50;
    var SIZE_OF_PATH = 70;
    var pathArray = [];
    var pathSprite;
    var denied = false;

    var shipButton1;
    var shipButton2;

    var ship;
    var spaceShip;
    var spaceSpriteArray = [];

    var PhaserGame = function () {

        this.bmd = null;
        this.mode = 0;
        var background = null; 

        this.points = {
            'x': [ 50, 200, 400, 600, 800, 950 ],
            'y': [ 350, 100, 500, 100, 500, 350 ]
        };
    };

    PhaserGame.prototype = {

        preload: function () {
            // load assets
            this.load.image('background', 'assets/space.jpeg');
            this.load.image('ship1', 'assets/ship1.png');
            this.load.image('ship2', 'assets/alien.png');
            this.load.image('tower', 'assets/tower.png');
            this.load.image('coin', 'assets/coin.png');
            this.load.image('heart', 'assets/heart.png');
            this.load.image('earth', 'assets/earth.png');
            this.load.image('saturn', 'assets/saturn.png');
            this.load.image('towerDenied', 'assets/towerDenied.png');
            // this.load.image('tower1Level1', 'assets/tower1Level1.png');
            // this.load.image('tower1Level2', 'assets/tower1Level2.png');
            // this.load.image('tower1Level3', 'assets/tower1Level3.png');
            // this.load.image('tower1Level4', 'assets/tower1Level4.png');
            // this.load.image('tower1Level5', 'assets/tower1Level5.png');
        },

        create: function () {
        
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

            this.scale.maxHeight = 500;
            this.scale.maxWidth = 1000;

            var background = game.add.sprite(0,0, 'background'); 
            background.inputEnabled = true;
            background.scale.setTo(2,2);
            background.events.onInputDown.add(availableSpot, this);

            var graphics = game.add.graphics(100, 100);
            graphics.beginFill(0x999999);
            graphics.drawRect(-100, this.game.height - 150, 1000, 50);
            window.graphics = graphics;

            var planetSprite = game.add.sprite(0, this.game.width/4, user.getType());
            planetSprite.scale.setTo(0.5, 0.5);

            var planetSprite2 = game.add.sprite(this.game.height, this.game.width/2, 'saturn');
            planetSprite2.scale.setTo(0.5, 0.5);

            var style = { font: "bold 16px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

            moneyText = game.add.text(30, 0, user.getMoney() , style);
            var coinSprite = game.add.sprite(0, 0, 'coin');
            coinSprite.scale.setTo(0.1,0.1);

            healthText = game.add.text(30, 20, user.getHealth(), style);
            var heartSprite = game.add.sprite(0, 20, 'heart');
            heartSprite.scale.setTo(0.02, 0.02);

            this.bmd = this.add.bitmapData(this.game.width, this.game.height);
            this.bmd.addToWorld();

            shipButton1 = game.add.button(this.game.width - 100, 650, 'ship1', addShip , this, 2, 1, 0);
            shipButton2 = game.add.button(this.game.width - 300, 600, 'ship2', addShip, this, 2, 1, 0);

            shipButton1.type = "ship1";
            shipButton2.type = "ship2";

            shipButton1.cost = 200;
            shipButton2.cost = 300;

            addTowerButton = game.add.button(300, 650, "tower", placeTower, 2, 1, 0);
            addTowerButton.height = 50;
            addTowerButton.width = 50;

            this.plot();
        },

        plot: function () {

            var x = 1 / game.width;
            var j = 0;
            this.path = [];

            for (var i = 0; i <= 1; i += x, j++)
            {
                var px = this.math.catmullRomInterpolation(this.points.x, i);
                var py = this.math.catmullRomInterpolation(this.points.y, i);
           
                path.push( { x: px, y: py });

                if(j % 10 == 0)
                {
                    pathSprite = game.add.sprite(px, py, 'tower');
                    pathSprite.height = SIZE_OF_PATH;
                    pathSprite.width = SIZE_OF_PATH;
                    pathSprite.anchor.setTo(0.5, 0.5);
                    pathSprite.alpha = 0;
                    pathArray.push(pathSprite);
                }

                this.bmd.rect(px, py, 1, 1, 'rgba(255, 255, 255, 1)'); // skapar linjen/vägen
             }
        },

        update: function () {

            if(updateText){
                moneyText.setText(user.getMoney());
                healthText.setText(user.getHealth());

                updateText = false;
            }

            if(user.spaceShips.length != null){
                for( i = 0; i < user.spaceShips.length; i++){

                    spaceSpriteArray[i].x = path[user.spaceShips[i].getPathIndex()].x;
                    spaceSpriteArray[i].y = path[user.spaceShips[i].getPathIndex()].y;

                    user.spaceShips[i].addPathIndex();

                    if (user.spaceShips[i].getPathIndex() >= path.length)
                    {
                        spaceSpriteArray[i].kill();
                        spaceSpriteArray.splice(i, 1);
                        user.spaceShips.splice(i, 1);
                    }
                }
            }


            if(placingTower)
            {
                towerSprite.position.x = game.input.x - centerTower;
                towerSprite.position.y = game.input.y - centerTower;

                for (var i = 0;i < pathArray.length; i++)
                {
                    if(checkCollision(towerSprite, pathArray[i]))
                    {
                        towerSprite.loadTexture("towerDenied", 1);
                        break;
                    }
                    else
                    {
                        towerSprite.loadTexture("tower", 1);
                    }
                }
            }
        }
    };

    function checkCollision(spriteA, spriteB){
        var boundsA = spriteA.getBounds();
        var boundsB = spriteB.getBounds();
        
        return Phaser.Rectangle.intersects(boundsA, boundsB);
    }

    function addShip(input){

        if(user.getMoney() >= input.cost){

            updateText = true; 
            this.ship = this.add.sprite(0,0, input.type);
            this.ship.anchor.set(0.5);
            spaceSpriteArray.push(this.ship);

            spaceShip = new SpaceShip(0, type); 
            user.spaceShips.push(spaceShip);
            console.log(user.spaceShips);
            user.buy(input.cost);
        }
    }

    
    function availableSpot(){

        var available = true;

        if(!placingTower)
        {
            return;
        }
        else
        {
            for (var i = 0; i < pathArray.length; i++)
            {
                if(checkCollision(towerSprite, pathArray[i]))
                {
                    available = false;
                }
            }

            if(available)
                setTower();
        }
    }

    function setTower(){

        var towerCost = 100;

        if(user.getMoney() >= towerCost)
        {
            user.buy(towerCost);
            var tower1 = new Tower(towerSprite.position.x, towerSprite.position.y, id);

            attackTower = game.add.button(towerSprite.position.x, towerSprite.position.y, "tower", levelUp, 2, 1, 0);
            attackTower.height = 50;
            attackTower.width = 50;
            attackTower.id = id;
            attackTower.alpha = 0;

            attackTowerSprite = game.add.sprite(towerSprite.position.x, towerSprite.position.y, "tower");
            attackTowerSprite.height = 50;
            attackTowerSprite.width = 50;

            updateText = true;
            placingTower = false;

            user.towers.push(tower1);
            pathArray.push(attackTowerSprite);

            id++;

        }
        else{
            console.log("no money!");
            placingTower = false;
            towerSprite.position.x = 1000;
            towerSprite.position.y = 1000;
        }
    }

    function levelUp(button){
        
        console.log(user.towers[button.id].level);
        user.towers[button.id].level++;
        user.towers[button.id].damage += 10;

        // if(user.towers[button.id].level == 2)
        //     attackTowerSprite = loadTexture("tower1Level2", 1);
        // if(user.towers[button.id].level == 3)
        //     attackTowerSprite = loadTexture("tower1Level3", 1);
        // if(user.towers[button.id].level == 4)
        //     attackTowerSprite = loadTexture("tower1Level4", 1);
        // if(user.towers[button.id].level == 5)
        //     attackTowerSprite = loadTexture(, 1);
    }


    function placeTower(){
        
        placingTower = true;
        towerSprite = game.add.sprite(game.input.x - centerTower, game.input.y - centerTower, "tower");
        towerSprite.height = 50;
        towerSprite.width = 50;
    };

    game.state.add('Game', PhaserGame, true);
