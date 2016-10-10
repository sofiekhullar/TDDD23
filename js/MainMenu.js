Game.MainMenu = function (game) {

};

Game.MainMenu.prototype = {


	create:function(game){
		game.stage.backgroundColor = '#182d3b';

		var background = game.add.sprite(0,0, 'mainMenuBackground'); 
		background.scale.setTo(2,2);

		playButton = game.add.button(game.world.centerX - 250, this.game.height - 700, 'play_button', this.actionOnClickPlay, this, 2, 1, 0);
		multiPlayButton = game.add.button(game.world.centerX - 250, this.game.height - 450, 'multi_button', this.actionOnClickMultiPlay, this, 2, 1, 0);
		helpButton = game.add.button(game.world.centerX - 250, this.game.height-200, 'help_button', this.actionOnClickHelp, this, 2, 1, 0);
	
	},

	update:function(){

	},

	actionOnClickPlay:function(){
		this.state.start('Play');
	},
	actionOnClickMultiPlay:function(){

	},
	actionOnClickHelp:function(){

	}
}
