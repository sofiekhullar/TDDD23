Game.PlanetMenu = function (game) {
	var planetType = null;
};

Game.PlanetMenu.prototype = {


	create:function(game){

		var background = game.add.sprite(0,0, 'mainMenuBackground'); 
		background.scale.setTo(2,2);

		game.add.sprite(40,0, 'choosePlanetMenu');

		saturnButton = game.add.button(this.game.width - 270, this.game.height - 500 , 'neptune', this.actionOnClickSaturn, this, 2, 1, 0);
		earthButton = game.add.button(this.game.width - 470 , this.game.height - 500, 'earth', this.actionOnClickEarth, this, 2, 1, 0);
		moonButton = game.add.button(this.game.width - 670, this.game.height - 500, 'moon', this.actionOnClickMoon, this, 2, 1, 0);
		venusButton = game.add.button(this.game.width - 870, this.game.height - 500, 'venus', this.actionOnClickVenus, this, 2, 1, 0);
		chooseButton = game.add.button(game.world.centerX - 250, this.game.height - 200, 'chooseButton', this.actionOnClickChoose, this, 2, 1, 0);
		
		saturnButton.width = 150;
		saturnButton.height = 150;
		earthButton.width = 150;
		earthButton.height = 150;
		moonButton.width = 150;
		moonButton.height = 150;
		venusButton.width = 150;
		venusButton.height = 150;

		chooseButton.alpha = 0.5;
		chooseButton.input.enabled = false;
	},

	update:function(){

	},

	actionOnClickSaturn:function(){
		saturnButton.alpha = 1;
		earthButton.alpha = 0.5;
		moonButton.alpha = 0.5;
		venusButton.alpha = 0.5;

		planetType = "saturn";

		chooseButton.alpha = 1;
		chooseButton.input.enabled = true;

	},

	actionOnClickEarth:function(){
		earthButton.alpha = 1;
		saturnButton.alpha = 0.5;
		moonButton.alpha = 0.5;
		venusButton.alpha = 0.5;

		planetType = "earth";

		chooseButton.alpha = 1;
		chooseButton.input.enabled = true;
	},

	actionOnClickMoon:function(){
		moonButton.alpha = 1;
		saturnButton.alpha = 0.5;
		earthButton.alpha = 0.5;
		venusButton.alpha = 0.5;

		planetType = "moon";

		chooseButton.alpha = 1;
		chooseButton.input.enabled = true;
	},

	actionOnClickVenus:function(){
		venusButton.alpha = 1;
		saturnButton.alpha = 0.5;
		earthButton.alpha = 0.5;
		moonButton.alpha = 0.5;

		planetType = "venus";

		chooseButton.alpha = 1;
		chooseButton.input.enabled = true;

	},

	actionOnClickChoose:function(){
		console.log("go to play " + planetType);
		this.state.start('Lobby', { output: planetType });
	}
}
