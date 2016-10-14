Game.PlanetMenu = function (game) {
	var planetType = null;
};

Game.PlanetMenu.prototype = {


	create:function(game){

		var background = game.add.sprite(0,0, 'mainMenuBackground'); 
		background.scale.setTo(2,2);

		saturnButton = game.add.button(game.world.centerX + 200, this.game.height - 700, 'saturn', this.actionOnClickSaturn, this, 2, 1, 0);
		earthButton = game.add.button(game.world.centerX , this.game.height - 700, 'earth', this.actionOnClickEarth, this, 2, 1, 0);
		moonButton = game.add.button(game.world.centerX - 200, this.game.height - 700, 'moon', this.actionOnClickMoon, this, 2, 1, 0);
		chooseButton = game.add.button(game.world.centerX - 250, this.game.height - 200, 'play_button', this.actionOnClickChoose, this, 2, 1, 0);
		
		saturnButton.width = 200;
		saturnButton.height = 200;
		earthButton.width = 200;
		earthButton.height = 200;
		moonButton.width = 200;
		moonButton.height = 200;

		chooseButton.alpha = 0.5;
		chooseButton.input.enabled = false;
	},

	update:function(){

	},

	actionOnClickSaturn:function(){
		saturnButton.alpha = 1;
		earthButton.alpha = 0.5;
		moonButton.alpha = 0.5;
		planetType = "saturn";

		chooseButton.alpha = 1;
		chooseButton.input.enabled = true;

	},

	actionOnClickEarth:function(){
		earthButton.alpha = 1;
		saturnButton.alpha = 0.5;
		moonButton.alpha = 0.5;
		planetType = "earth";


		chooseButton.alpha = 1;
		chooseButton.input.enabled = true;
	},

	actionOnClickMoon:function(){
		moonButton.alpha = 1;
		saturnButton.alpha = 0.5;
		earthButton.alpha = 0.5;
		planetType = "moon";


		chooseButton.alpha = 1;
		chooseButton.input.enabled = true;
	},

	actionOnClickChoose:function(){
		console.log("go to play " + planetType);
		this.state.start('Lobby', { output: planetType });
	}
}
