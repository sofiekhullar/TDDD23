    var game = new Phaser.Game(1000, 700, Phaser.AUTO, 'game');

    var towerButton1;
    var towerButton2;
    var towerButton3;

    var tower;
    var towers = [];
    var setTower = false;
    
    var user = new user("Love", "Earth");
    var text1;
    var text2;
    var id = 0;
    var tower1;


    var PhaserGame = function () {

        this.bmd = null;
        this.alien = null;
        this.mode = 0;
        var background = null; 

        this.points = {
            'x': [ 50, 200, 400, 600, 800, 950 ],
            'y': [ 350, 100, 500, 100, 500, 350 ]
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
        },

        create: function () {
        
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.maxHeight = 500;
            this.scale.maxwidth = 1000;

             
            background = game.add.sprite(0,0, 'background'); 
            background.height = game.world.height;
            background.width = game.world.width;


            this.bmd = this.add.bitmapData(this.game.width, this.game.height); // bitmap data som är som en canvas ish
            this.bmd.addToWorld();

            this.alien = this.add.sprite(0, 0, 'alien');
            this.alien.anchor.set(0.5); // hur mycket off spriten är från banan

            text1 = game.add.text(game.world.centerX, 100, user.getName(), { fill: '#ffffff' });
            text2 = game.add.text(game.world.centerX + 80, 100, user.getType(), { fill: '#ffffff' });

            var addTowerButton = game.add.button(100, 100, "tower", addTower, 2, 1, 0);
            addTowerButton.height = 50;
            addTowerButton.width = 50;
        
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
            for (var p = 0; p < this.points.x.length; p++)
            {
                this.bmd.rect(this.points.x[p]-3, this.points.y[p]-3, 6, 6, 'rgba(255, 0, 0, 1)');
            }

        },

        update: function () {

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


    function addTower(){

        id++;

        towerButton2 = game.add.button(0 + id * 60, 610, 'tower', levelUp, 2, 1, 0);
        towerButton2.height = 50;
        towerButton2.width = 50;
        towerButton2.onInputOver.add(hoverTower, this);

        tower1 = new tower(0 + id * 60, 610, id);
        tower1.setLevel();

        user.towers.push(tower1);
        console.log(user.towers);
        console.log(tower1);

    };

    function hoverTower(){

        console.log(user.name);

    }

    function levelUp(tower){

       // tower.setLevel();
        //console.log(tower1.level);

    }

    game.state.add('Game', PhaserGame, true);
