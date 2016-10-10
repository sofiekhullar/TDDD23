var game = new Phaser.Game(1000, 700, Phaser.AUTO, 'game');

    var addTowerButton;
    var tower;
    var towerSprite;
    var placingTower = false;
    var updateText = false;
    var user = new User("Love", "earth");
    var opponent = new User("Sofie", "saturn");
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
    var shipButton3;

    var ship;
    var spaceShip;
    var spaceSpriteArray = [];
    var attackTowerArray = [];
    var attackTowers = [];
    var healthArray = [];

    var ship1Bullet;
    var ship2Bullet;
    var ship3Bullet;

    var explosions;
    var firingTimer = 0;

    var planetSprite1;
    var planetSprite2;

    var towerBullet;
    var towerBullets;
    var towerFiringTime = 1;
    var timer = 0;
    var prevTime = 0;


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
            this.load.image('bullet1', 'assets/bullet.png');
            this.load.image('bullet2', 'assets/bullet2.png');
            this.load.image('bullet3', 'assets/bullet3.png');
            this.load.image('towerDenied', 'assets/towerDenied.png');
            this.load.image('satellite', 'assets/satellite.png');
            this.load.image('satellite-denied', 'assets/satellite-denied.png');
            this.load.image('blackhole-denied', 'assets/blackhole-denied.png');
            this.load.spritesheet('blackhole-animation', 'assets/blackhole-animation.png', 100, 100);
            this.load.image('menuItem', 'assets/menu-item.png');
            this.load.image('menuBackground', 'assets/menu-background.png');

            this.load.spritesheet('explosion', 'assets/explode.png', 128,128);
        },

        create: function () {

            game.physics.startSystem(Phaser.Physics.ARCADE);
            
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

            moneyTextUser = game.add.text(30, this.game.height - 50, user.getMoney() , style);
            game.add.sprite(0, this.game.height - 50, 'coin');

            healthTextUser = game.add.text(30, this.game.height - 20, user.getHealth(), style);
            game.add.sprite(0, this.game.height - 20, 'heart');

            moneyTextOpponent = game.add.text(this.game.width - 50, this.game.height - 50, opponent.getMoney() , style);
            game.add.sprite(this.game.width - 80, this.game.height - 50, 'coin');

            healthTextOpponent = game.add.text(this.game.width - 50, this.game.height - 20, opponent.getHealth(), style);
            game.add.sprite(this.game.width - 80, this.game.height - 20, 'heart');

            this.bmd = this.add.bitmapData(this.game.width, this.game.height);
            this.bmd.addToWorld();

            shipButton1 = game.add.button(this.game.width - 150, 650, 'ship1', addShip , this, 2, 1, 0);
            shipButton2 = game.add.button(this.game.width - 250, 650, 'ship2', addShip, this, 2, 1, 0);
            shipButton3 = game.add.button(this.game.width - 350, 650, 'ship3', addShip, this, 2, 1, 0);

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

            addTowerButton1.damage = 10;
            addTowerButton2.damage = 20;
            addTowerButton3.damage = 30;

            // addTowerButton1.damage = 100;
            // addTowerButton2.damage = 200;
            // addTowerButton3.damage = 300;

            addTowerButton1.type = "blackhole";
            addTowerButton2.type = "satellite";
            addTowerButton3.type = "meteorite";

            addTowerButton1.spriteName = "blackhole";
            addTowerButton2.spriteName = "satellite";
            addTowerButton3.spriteName = "blackhole";

            planetSprite1 = game.add.sprite(0, this.game.width/4, user.getType());
            healthArray.push(createHealthBar(95, 12, planetSprite1.x + 20 , planetSprite1.y - planetSprite1.y/6));
            planetSprite1.scale.setTo(0.5, 0.5);

            planetSprite2 = game.add.sprite(this.game.width - 150, game.world.centerY - 70, opponent.getType());
            healthArray.push(createHealthBar(95, 12, planetSprite2.x + 20 , planetSprite2.y - planetSprite2.y/6));
            planetSprite2.scale.setTo(0.3, 0.3);
            game.physics.enable(planetSprite2, Phaser.Physics.ARCADE);
            //planetSprite2.enableBody = true;
            planetSprite2.immovable = true;
            //planetSprite2.physicsBodyType = Phaser.Physics.ARCADE;

            this.plot();

            // The enemy's bullets
            ship1Bullet = game.add.group();
            ship1Bullet.enableBody = true;
            ship1Bullet.physicsBodyType = Phaser.Physics.ARCADE;
            ship1Bullet.createMultiple(30, 'bullet1');
            ship1Bullet.setAll('anchor.x', 0.5);
            ship1Bullet.setAll('anchor.y', 1);
            ship1Bullet.setAll('outOfBoundsKill', true);
            ship1Bullet.setAll('checkWorldBounds', true);

            ship2Bullet = game.add.group();
            ship2Bullet.enableBody = true;
            ship2Bullet.physicsBodyType = Phaser.Physics.ARCADE;
            ship2Bullet.createMultiple(30, 'bullet2');
            ship2Bullet.setAll('anchor.x', 0.5);
            ship2Bullet.setAll('anchor.y', 1);
            ship2Bullet.setAll('outOfBoundsKill', true);
            ship2Bullet.setAll('checkWorldBounds', true);

            ship3Bullet = game.add.group();
            ship3Bullet.enableBody = true;
            ship3Bullet.physicsBodyType = Phaser.Physics.ARCADE;
            ship3Bullet.createMultiple(30, 'bullet3');
            ship3Bullet.setAll('anchor.x', 0.5);
            ship3Bullet.setAll('anchor.y', 1);
            ship3Bullet.setAll('outOfBoundsKill', true);
            ship3Bullet.setAll('checkWorldBounds', true);
            ship3Bullet.setDamage = 20;

            // An explosion pool
            explosions = game.add.group();
            explosions.enableBody = true;
            explosions.physicsBodyType = Phaser.Physics.ARCADE;
            explosions.createMultiple(30, 'explosion');
            explosions.setAll('anchor.x', 0.5);
            explosions.setAll('anchor.y', 0.5);

            explosions.forEach( function(explosion) {explosion.animations.add('explosion');});

            towerBullets = game.add.group();
            towerBullets.enableBody = true;
            // towerBullets.physicsBodyType = Phaser.Physics.ARCADE;

            for (var i = 0; i < 20; i++)
            {
                var b = towerBullets.create(0, 0, 'bullet1');
                b.exists = false;
                b.visible = false;
                b.checkWorldBounds = true;
                b.events.onOutOfBounds.add(resetBullet, this);
            }
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

                this.bmd.rect(px, py, 1, 1, 'rgba(255, 255, 255, 1)'); 
             }
        },

        update: function () {


            planetSprite2.x = this.game.width - 150;
            planetSprite2.y = game.world.centerY - 70;

            if(updateText){

                moneyTextUser.setText(user.getMoney());
                healthTextUser.setText(user.getHealth());
                moneyTextOpponent.setText(opponent.getMoney());
                healthTextOpponent.setText(opponent.getHealth());

                updateText = false;
            }

            if(user.spaceShips.length != 0)
            {
                for( i = 0; i < user.spaceShips.length; i++)
                {
                    spaceSpriteArray[i].x = path[user.spaceShips[i].getPathIndex()].x;
                    spaceSpriteArray[i].y = path[user.spaceShips[i].getPathIndex()].y;
                    spaceSpriteArray[i].id = i;

                    healthArray[i+2].x = path[user.spaceShips[i].getPathIndex()].x - spaceSpriteArray[i].width/2;
                    healthArray[i+2].y = path[user.spaceShips[i].getPathIndex()].y - spaceSpriteArray[i].height;

                    if(user.spaceShips[i].getRotation())
                    {
                        if(spaceSpriteArray[i].y > 350)
                            spaceSpriteArray[i].angle -= 0.45;
                        else
                            spaceSpriteArray[i].angle += 0.45;
                    }

                    user.spaceShips[i].addPathIndex();

                    if (user.spaceShips[i].getPathIndex() >= path.length)
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
                            // player 1 won!!!
                        }

                        spaceSpriteArray[i].kill();
                        spaceSpriteArray.splice(i, 1);
                        healthArray[i+2].kill();
                        healthArray.splice(i+2,1);
                        user.spaceShips.splice(i, 1);
                    }

                    game.physics.arcade.collide(spaceSpriteArray[i], towerBullets,collisionHandlerTower, null, {i:i});
                }
            }

            if(user.spaceShips.length != 0){
                if (game.time.now > firingTimer)
                    {
                        fireShip();
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

            // check planet health
            if(healthArray[1].width > 0){
                game.physics.arcade.collide(planetSprite2, ship1Bullet, collisionHandlerPlanet);
                game.physics.arcade.collide(planetSprite2, ship2Bullet, collisionHandlerPlanet);
                game.physics.arcade.collide(planetSprite2, ship3Bullet, collisionHandlerPlanet);
            }
             else{
                updateText = true;
                // Player 1 won yeyy!
            }
        

            timer = Math.floor(game.time.now / 1000);

            for (var i = 0; i < attackTowers.length; i++)
            {
                for(var j = 0; j < user.spaceShips.length; j++)
                {
                    if(Math.abs(attackTowers[i].position.x - spaceSpriteArray[j].x) < 150 && Math.abs(attackTowers[i].position.y - spaceSpriteArray[j].y) < 150)
                    {
                        
                        
                        if(user.towers[i].lastFiringTime < timer + user.towers[i].fireTime)
                        {
                            towerFire(i, j);
                            user.towers[i].lastFiringTime = timer;
                        }
                    }
                }
            }
        }
    };


    function collisionHandlerPlanet(planetSprite2, bullet){
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

        bullet.kill();
        updateHealthBar(1, damage);
    }
    
    function resetBullet (bullet) {

        bullet.kill();
        console.log("bullet out of this world");
    }

    function collisionHandlerTower (ship, bullet) {
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
    }

    function towerFire(id1, id2){

        towerBullet = towerBullets.getFirstExists(false);

        if (towerBullet)
        {
            towerBullet.reset(user.towers[id1].x, user.towers[id1].y);
            game.physics.arcade.moveToObject(towerBullet, spaceSpriteArray[id2], 400);
        }

    }

    function checkCollision(spriteA, spriteB){

        var boundsA = spriteA.getBounds();
        var boundsB = spriteB.getBounds();
        return Phaser.Rectangle.intersects(boundsA, boundsB);
    }

    function addShip(input){

        if(user.getMoney() >= input.cost)
        {
            updateText = true; 
            this.ship = this.add.sprite(0,0, input.type);
            this.ship.anchor.set(0.5);
            this.ship.id = 0;
            spaceSpriteArray.push(this.ship);

            healthArray.push(createHealthBar(40, 5,0,0));

            game.physics.enable(this.ship, Phaser.Physics.ARCADE);
            this.ship.body.immovable = true;
            spaceShip = new SpaceShip(0, input.type, input.rot); 
            user.spaceShips.push(spaceShip);
            user.buy(input.cost);
        }
    }

    function fireShip() {

        // randomly select one of them
        var random = game.rnd.integerInRange(0,spaceSpriteArray.length-1);
        var shooter = spaceSpriteArray[random];

        var type = user.spaceShips[random].getType();
        
        switch(type){
            case 'ship1':
                bullet = ship1Bullet.getFirstExists(false);
            break;
            case 'ship2':
                bullet = ship2Bullet.getFirstExists(false);
            break;
            case 'ship3':
                bullet = ship3Bullet.getFirstExists(false);
            break;
        }

        // And fire the bullet from this enemy
        bullet.reset(shooter.x, shooter.y);
        game.physics.arcade.moveToObject(bullet,planetSprite2,120);


        /*if(spaceSpriteArray.length > 5 && spaceSpriteArray.length < 10){
            firingTimer = game.time.now + 2000;
        }
        if(spaceSpriteArray.length > 10 && spaceSpriteArray.length < 15){
            firingTimer = game.time.now + 1000;
        }
        if(spaceSpriteArray.length > 15 && spaceSpriteArray.length < 20){
            firingTimer = game.time.now + 500;
        }
        if(spaceSpriteArray.length > 20){
            firingTimer = game.time.now + 300;
        }
        else{*/
            firingTimer = game.time.now + 2000;
     //   }    
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
    }

    function towerMenu(button){

        if(!placingTower)
        {

            if(menuActive)
                killMenu();

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

        user.towers[button.id].levelUp();

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

    function createHealthBar(w,h,x,y) {
 
        // create a red rectangle to use as the health meter itself
        var healthBitmap = game.add.bitmapData(w, h);
        healthBitmap.ctx.beginPath();
        healthBitmap.ctx.rect(0, 0, healthBitmap.width, healthBitmap.height);
        healthBitmap.ctx.fillStyle = '#00e600';
        healthBitmap.ctx.fill();
     
        // create the health Sprite using the red rectangle bitmap data
        return health = game.add.sprite(x, y, healthBitmap);
    }

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
}
    game.state.add('Game', PhaserGame, true);
