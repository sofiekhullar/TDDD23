Game.MainMenu = function (game) {

};

Game.MainMenu.prototype = {


	create:function(game){

		var background = game.add.sprite(0,0, 'mainMenuBackground'); 
		game.add.sprite(0,0,'mainMenuTitle');

		playButton = game.add.button(this.game.width/2 - 150, this.game.height/2 - 100, 'playButton', this.actionOnClickPlay, this, 2, 1, 0);
		helpButton = game.add.button(this.game.width - 140, this.game.height - 150, 'helpButton', this.actionOnClickHelp, this, 2, 1, 0);
		settingButton = game.add.button(this.game.width - 980, this.game.height - 150, 'settingsButton', this.actionOnClickMultiSetting, this, 2, 1, 0);
	
	},

	update:function(){

	},

	actionOnClickPlay:function(){
		this.state.start('PlanetMenu');
	},

	actionOnClickMultiSetting:function(){
		this.state.start('');
	},
	
	actionOnClickHelp:function(){
		this.state.start('HelpMenu');

	}
}
