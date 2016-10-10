var Game = {};

Game.Boot = function(game){
	
};

Game.Boot.prototype = {
	init: function(){
		// just one input
		this.input.maxPointers = 1;

		// stops the screen from locking
		this.stage.disableVisibilityChange = true;

		// set the correct scale
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.maxHeight = 500;
        this.scale.maxWidth = 1000;
	},

	preload:function(){
		this.load.image('preloadBar', 'assets/preloader.png');
	},

	create:function(){
		this.state.start('Preload');
	}
}