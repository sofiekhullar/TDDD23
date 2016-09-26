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
    var SIZE_OF_PATH = 30;
    var pathArray = [];
    var pathSprite;
    var denied = false;
    var menuBackground;
    var levelText;
    var sell;
    var sellText;
    var upgradeText;
    var upgrade;
    var available = true;
    var towerSpriteNow;
    var costNow;
    var damageNow;
    var typeNow;
    var menuActive = false;

    var shipButton1;
    var shipButton2;

    var ship;
    var spaceShip;
    var spaceSpriteArray = [];
    var attackTowerArray = [];
    var attackTowers = [];

    var PhaserGame = function () {

        this.bmd = null;
        this.mode = 0;
        var background = null; 

        this.points = {
            'x': [ 50, 200, 400, 600, 800, 950 ],
            'y': [ 350, 200, 500, 200, 500, 350 ]
        };
    };

    PhaserGame.prototype = {

        preload: function () {
            // load assets
            this.load.image('background', 'assets/background_blue-red.png');
            this.load.image('ship1', 'assets/ships/ship1.png');
            this.load.image('ship2', 'assets/ships/ship2.png');
            this.load.image('ship3', 'assets/ships/ship3.png');
            this.load.image('blackhole', 'assets/blackhole.png');
            this.load.image('coin', 'assets/diamond.png');
            this.load.image('heart', 'assets/health.png');
            this.load.image('earth', 'assets/earth.png');
            this.load.image('saturn', 'assets/saturn.png');
            this.load.image('satellite', 'assets/satellite.png');
            this.load.image('satellite-denied', 'assets/satellite-denied.png');
            this.load.image('blackhole-denied', 'assets/blackhole-denied.png');
            this.load.spritesheet('blackhole-animation', 'assets/blackhole-animation.png', 100, 100);
            this.load.image('menuItem', 'assets/menu-item.png');
            this.load.image('menuBackground', 'assets/menu-background.png');
        },

        create: function () {
        
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

            this.scale.maxHeight = 500;
            this.scale.maxWidth = 1000;

            var background = game.add.sprite(0,0, 'background'); 
            background.inputEnabled = true;
            background.events.onInputDown.add(availableSpot, this);

            var graphics = game.add.graphics(100, 100);
            graphics.beginFill(0x999999);
            graphics.drawRect(-100, this.game.height - 150, 1000, 50);
            window.graphics = graphics;

            var style = { font: "bold 16px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

            moneyText = game.add.text(30, this.game.height - 50, user.getMoney() , style);
            game.add.sprite(0, this.game.height - 50, 'coin');

            healthText = game.add.text(30, this.game.height - 20, user.getHealth(), style);
            game.add.sprite(0, this.game.height - 20, 'heart');

            this.bmd = this.add.bitmapData(this.game.width, this.game.height);
            this.bmd.addToWorld();

            shipButton1 = game.add.button(this.game.width - 100, 650, 'ship1', addShip , this, 2, 1, 0);
            shipButton2 = game.add.button(this.game.width - 200, 650, 'ship2', addShip, this, 2, 1, 0);
            shipButton3 = game.add.button(this.game.width - 300, 650, 'ship3', addShip, this, 2, 1, 0);

            shipButton1.type = "ship1";
            shipButton2.type = "ship2";
            shipButton3.type = "ship3";

            shipButton1.cost = 200;
            shipButton2.cost = 300;
            shipButton3.cost = 500;

            shipButton1.rot = true;
            shipButton2.rot = false;
            shipButton3.rot = true;

            addTowerButton1 = game.add.button(200, 650, "blackhole", placeTower);
            addTowerButton1.height = 50;
            addTowerButton1.width = 50;

            addTowerButton2 = game.add.button(300, 650, "satellite", placeTower);
            addTowerButton2.height = 50;
            addTowerButton2.width = 50;

            addTowerButton3 = game.add.button(400, 650, "blackhole", placeTower);
            addTowerButton3.height = 50;
            addTowerButton3.width = 50;

            addTowerButton1.cost = 100;
            addTowerButton2.cost = 200;
            addTowerButton3.cost = 300;

            addTowerButton1.damage = 100;
            addTowerButton2.damage = 200;
            addTowerButton3.damage = 300;

            addTowerButton1.type = "blackhole";
            addTowerButton2.type = "satellite";
            addTowerButton3.type = "meteorite";

            addTowerButton1.spriteName = "blackhole";
            addTowerButton2.spriteName = "satellite";
            addTowerButton3.spriteName = "blackhole";

            var planetSprite = game.add.sprite(0, this.game.width/4, user.getType());
            planetSprite.scale.setTo(0.5, 0.5);

            var planetSprite2 = game.add.sprite(this.game.width - 150, game.world.centerY - 70, 'saturn');
            planetSprite2.scale.setTo(0.3, 0.3);
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
                    pathSprite = game.add.sprite(px, py, 'blackhole');
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

                    if(user.spaceShips[i].getRotation()){
                        if(spaceSpriteArray[i].y > 350)
                            spaceSpriteArray[i].angle -= 0.45;
                        else
                            spaceSpriteArray[i].angle += 0.45;
                    }

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
                available = true;

                for (var i = 0; i < pathArray.length; i++)
                {
                    
                        if(checkCollision(towerSprite, pathArray[i]))
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
                        if(checkCollision(towerSprite, attackTowerArray[i]))
                        {
                            towerSprite.loadTexture(towerSpriteNow + "-denied", 1);
                            available = false;
                            break;
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

            spaceShip = new SpaceShip(0, type, input.rot); 
            user.spaceShips.push(spaceShip);
            user.buy(input.cost);
        }
    }

    
    function availableSpot(){

        if(placingTower && available)
            setTower();

        towerSprite.kill();
        placingTower = false;
    }

    function setTower(){

        if(user.getMoney() >= costNow)
        {
            placingTower = false;
            user.buy(costNow);
            var tower1 = new Tower(towerSprite.position.x, towerSprite.position.y, id, damageNow, typeNow, costNow);

            attackTower = game.add.button(towerSprite.position.x, towerSprite.position.y, towerSpriteNow, towerMenu);
            attackTower.height = 50;
            attackTower.width = 50;
            attackTower.id = id;
            attackTower.alpha = 0;

            attackTowerSprite = game.add.sprite(towerSprite.position.x, towerSprite.position.y, towerSpriteNow);

            if(towerSpriteNow == "blackhole")
            {
                attackTowerSprite.loadTexture("blackhole-animation", 1);
                var spin = attackTowerSprite.animations.add('spins');
                attackTowerSprite.animations.play('spins', 8, true);
                
            }
            
            attackTowerSprite.scale.setTo(0.5, 0.5);
            attackTowerSprite.id = id;
            attackTowerSprite.inputEnabled = true;
            attackTowerSprite.input.useHandCursor = true;
            attackTowerSprite.events.onInputDown.add(towerMenu, this);

            updateText = true;

            user.towers.push(tower1);
            attackTowers.push(attackTower);
            attackTowerArray.push(attackTowerSprite);
            id++;
        }
        else{
            
        }
    }

    function towerMenu(button){

        if(!placingTower)
        {
            menuActive = true;
            
            menuBackground = game.add.sprite(user.towers[button.id].x, user.towers[button.id].y, 'menuBackground');

            if(menuBackground.position.x > 750)
                menuBackground.position.x = 750;
            if(menuBackground.position.x < 50)
                menuBackground.position.x = 50;
            if(menuBackground.position.y > 500)
                menuBackground.position.y = 500;
            if(menuBackground.position.y < 50)
                menuBackground.position.y = 50;

            levelText = game.add.text(menuBackground.position.x + 50, menuBackground.position.y + 20, "Level " + user.towers[button.id].level);
            menuBackground.scale.setTo(2.5,2);
            upgrade = game.add.button(menuBackground.position.x + 25, menuBackground.position.y + 60, 'menuItem', levelUp, button);
            upgradeText = game.add.text(menuBackground.position.x + 35, menuBackground.position.y + 70, "Upgrade $" + costNow);
            upgrade.scale.setTo(2.9,2);
            sell = game.add.button(menuBackground.position.x + 25, menuBackground.position.y + 120, 'menuItem', function() {sellTower(button)}, this);
            sellText = game.add.text(menuBackground.position.x + 35, menuBackground.position.y + 130, "Sell $" + user.towers[button.id].level * 100 * 0.9);
            sell.scale.setTo(2.9,2);
        }
        else {
            towerSprite.kill();
            placingTower = false;
        }
    }

    function sellTower(button){

        user.sell(user.towers[button.id].cost);
        updateText = true;
        attackTowerArray[button.id].position.x = 2000;
        attackTowers[button.id].position.x = 2000;

        if(menuActive)
        {            
            killMenu();
        }

    }

    function levelUp(button){

        if(menuActive)
        {            
            killMenu();
        }
    }

    function placeTower(button){

        damageNow = button.damage;
        costNow = button.cost;
        towerSpriteNow = button.spriteName;
        typeNow = button.type;

        placingTower = true;
        towerSprite = game.add.sprite(game.input.x - centerTower, game.input.y - centerTower, towerSpriteNow);
        towerSprite.height = 50;
        towerSprite.width = 50;

        if(menuActive)
        {            
            killMenu();
        }
    };

    function killMenu() {

        levelText.kill();
        menuBackground.kill();
        upgradeText.kill();
        upgrade.kill();
        sell.kill();
        sellText.kill();
        menuActive = false;
    };

    game.state.add('Game', PhaserGame, true);
