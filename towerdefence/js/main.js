var game = new Phaser.Game(1000, 700, Phaser.AUTO, 'game');

    var towerButton1;
    var towerButton2;
    var towerButton3;

    var tower;
    var towers = [];
    var setTower = false;
    
    var user = new user("Love", "earth");

    var updateText = false;

    var PhaserGame = function () {

        this.bmd = null;
        this.alien = null;
        this.mode = 0;

        this.points = {
            'x': [ 32, 128, 256, 384, 512, 608 ],
            'y': [ 240, 240, 240, 240, 240, 240 ]
        };

        this.pi = 0;
        this.path = [];

    };


    PhaserGame.prototype = {

        preload: function () {
            // load assets
            this.load.image('background', 'assets/space.jpeg');
            this.load.image('alien', 'assets/alien.png');
            this.load.image('tower', 'assets/tower.png');
            this.load.image('coin', 'assets/coin.png');
            this.load.image('heart', 'assets/heart.png');
            this.load.image('earth', 'assets/earth.png');
            this.load.image('saturn', 'assets/saturn.png');
        },

        create: function () {
        
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.maxHeigth = 700;
            this.scale.maxWidh = 1000;

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

            towerButton1 = game.add.button(this.game.width - 1000, 650, 'tower', addTower1, this, 2, 1, 0);
            towerButton1.height = 50;
            towerButton1.width = 50;

            towerButton2 = game.add.button(this.game.width - 950, 650, 'tower', addTower2, this, 2, 1, 0);
            towerButton2.height = 50;
            towerButton2.width = 50;

            towerButton3 = game.add.button(this.game.width - 900, 650, 'tower', addTower3, this, 2, 1, 0);
            towerButton3.height = 50;
            towerButton3.width = 50;

            var style = { font: "bold 16px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

            moneyText = game.add.text(30, 0, user.getMoney() , style);
            var coinSprite = game.add.sprite(0, 0, 'coin');
            coinSprite.scale.setTo(0.1,0.1);

            healthText = game.add.text(30, 20, user.getHealth(), style);
            var heartSprite = game.add.sprite(0, 20, 'heart');
            heartSprite.scale.setTo(0.02, 0.02);

            this.bmd = this.add.bitmapData(this.game.width, this.game.height); // bitmap data som är som en canvas ish
            this.bmd.addToWorld();

            this.alien = this.add.sprite(0, 0, 'alien');
            this.alien.anchor.set(0.5); // hur mycket off spriten är från banan

            var py = this.points.y; // Första punkten i y-led dvs 240

            for (var i = 0; i < py.length; i++)
            {
                py[i] = this.rnd.between(32, 432); // flyttar punkterna i y-led, just nu random men kan sättas till fasta punkter
            }
        
            this.plot();
        },

        plot: function () {

            this.path = [];

            var x = 1 / game.width;

            for (var i = 0; i <= 1; i += x)
            {
                var px = this.math.catmullRomInterpolation(this.points.x, i);
                var py = this.math.catmullRomInterpolation(this.points.y, i);
           
                this.path.push( { x: px, y: py });

                this.bmd.rect(px, py, 1, 1, 'rgba(255, 255, 255, 1)'); // skapar linjen/vägen
             }

             // to draw rects bra för debug
            /*for (var p = 0; p < this.points.x.length; p++)
            {
                this.bmd.rect(this.points.x[p]-3, this.points.y[p]-3, 6, 6, 'rgba(255, 0, 0, 1)');
            }*/

        },

        update: function () {

            if(updateText){
                moneyText.setText(user.getMoney());
                healthText.setText(user.getHealth());

                updateText = false;
            }

            // får alien att följa linjen
            this.alien.x = this.path[this.pi].x;
            this.alien.y = this.path[this.pi].y;

            this.pi++;

            if (this.pi >= this.path.length)
            {
                this.pi = 0;
            }
        }
    };

    function addTower1(){

        var cost = 100;

        if(user.getMoney() > cost){
            
            user.buy(cost);
            updateText = true;
            //console.log(user.getMoney());
        }
        tower = game.add.button(game.input.mousePointer.x, game.input.mousePointer.y, 'tower');
    };

    function addTower2(){
        
        var cost = 200;

        if(user.getMoney() > cost){
            
            user.buy(cost);
            updateText = true;
            console.log(user.getMoney());

        }

        tower = game.add.button(game.input.mousePointer.x, game.input.mousePointer.y, 'tower');
    }

    function addTower3(){
        
        var cost = 300;

        if(user.getMoney() > cost){
            
            tower1 = new tower(2,10);
            tower1.setLevel();
            user.towers.push(tower1);

            console.log("level " + tower1.getLevel());
            console.log(user.towers);

            user.buy(cost);
            updateText = true;
            console.log(user.getMoney());
        }

        tower = game.add.button(game.input.mousePointer.x, game.input.mousePointer.y, 'tower');
    }


    game.state.add('Game', PhaserGame, true);
