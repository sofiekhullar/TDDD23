var game = new Phaser.Game(1000, 700, Phaser.AUTO, 'game');

    var tower;
    var towers = [];
    var setTower = false;
    var user = new User("Love", "earth");

    var updateText = false;

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

        this.path = [];
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
        },

        create: function () {
        
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

            this.scale.maxHeight = 500;
            this.scale.maxWidth = 1000;

            var background = game.add.sprite(0,0, 'background'); 
            background.scale.setTo(2,2);

            var graphics = game.add.graphics(100, 100);
            graphics.beginFill(0x999999);
            graphics.drawRect(-100, this.game.height - 150, 1000, 50);
            window.graphics = graphics;

            var planetSprite = game.add.sprite(0, this.game.width/4, user.getType());
            planetSprite.scale.setTo(0.5, 0.5);

            var planetSprite2 = game.add.sprite(this.game.height, this.game.width/2, 'saturn');
            planetSprite2.scale.setTo(0.3, 0.3);

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

            this.plot();
        },

        plot: function () {

            this.path = [];

            var x = 1 / (game.width); // ta *5 för långsammare!!

            for (var i = 0; i <= 1; i += x)
            {
                var px = this.math.catmullRomInterpolation(this.points.x, i);
                var py = this.math.catmullRomInterpolation(this.points.y, i);
           
                this.path.push( { x: px, y: py });

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

                    spaceSpriteArray[i].x = this.path[user.spaceShips[i].getPathIndex()].x;
                    spaceSpriteArray[i].y = this.path[user.spaceShips[i].getPathIndex()].y;

                    user.spaceShips[i].addPathIndex();

                    if (user.spaceShips[i].getPathIndex() >= this.path.length)
                    {
                        spaceSpriteArray[i].kill();
                        spaceSpriteArray.splice(i, 1);
                        user.spaceShips.splice(i, 1);
                    }
                }
            }
        }
    };

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

    function addTower(){

        id++;

        towerButton2 = game.add.button(0 + id * 60, 610, 'tower', levelUp, 2, 1, 0);
        towerButton2.height = 50;
        towerButton2.width = 50;
        towerButton2.onInputOver.add(hoverTower, this);

        tower1 = new Tower(0 + id * 60, 610, id);
        tower1.setLevel();

        user.towers.push(tower1);
        console.log(user.towers);
        console.log(tower1);
    };

    game.state.add('Game', PhaserGame, true);
