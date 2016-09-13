var game = new Phaser.Game(640, 480, Phaser.AUTO, 'game');

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
        },

        create: function () {
            game.add.sprite(0,0, 'background'); 
            
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

    game.state.add('Game', PhaserGame, true);
