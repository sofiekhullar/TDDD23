Game.HelpMenu = function (game) {

};

var step; 
var buttonNext;
var buttonSkip;
var counter;

Game.HelpMenu.prototype = {

	create:function(game){
		counter = 1;
		var background = game.add.sprite(0,0, 'mainMenuBackground'); 

		step = game.add.sprite(0,0, 'step1'); 

		buttonSkip = game.add.button(this.game.width/2 - 250  , this.game.height/2 + 240, 'buttonSkip', this.actionOnClicSkip, this, 2, 1, 0);	
		buttonNext = game.add.button(this.game.width/2 + 100, this.game.height/2 + 240, 'buttonNext', this.actionOnClickNext, this, 2, 1, 0);	

	},

	actionOnClickNext: function(){
		counter++;
		if(counter <= 7){
			console.log('step' + counter);
			step.loadTexture('step' + counter, 1);
		}
	},

	actionOnClicSkip: function(){
		console.log("buttonSkip");
		this.state.start('MainMenu');
	},

	update:function(){
		if(counter == 7){
			buttonNext.alpha = 0.5;
			buttonNext.input.enable = false;
		}
	}
}