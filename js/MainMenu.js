var lastBlink = 0;
var blinkingTime = 1;
var lastBlink2 = 1;
var blinkingTime2 = 1;
var timer;

Game.MainMenu = function (game) {

};

Game.MainMenu.prototype = {


	create:function(game){

		var background = game.add.sprite(0,0, 'mainMenuBackground'); 
		game.add.sprite(0,0,'mainMenuTitle');

		var style = { font: "normal 65px DK", fill: "#ff0044", align: "center" };
		text = game.add.text(0, 0, "", style);

		var playButton = game.add.button(this.game.width/2 - 150, this.game.height/2 - 100, 'playButton', this.actionOnClickPlay, this, 2, 1, 0);
		var helpButton = game.add.button(this.game.width - 170, this.game.height - 170, 'helpButton', this.actionOnClickHelp, this, 2, 1, 0);
		helpButton.width = 150;
		helpButton.height = 150;
		var settingsButton = game.add.button(this.game.width - 980, this.game.height - 170, 'settingsButton', this.actionOnClickMultiSetting, this, 2, 1, 0);
		settingsButton.width = 150;
		settingsButton.height = 150;
	
	},

	update:function(){

		timer = Math.floor(this.game.time.now / 1000);

		if(timer > lastBlink + blinkingTime)
            {
            	console.log("yeah blink");
                shiningStar = this.add.sprite(100, 100, 'blinkingStar');
                var blink = shiningStar.animations.add("blinkingStar");
                shiningStar.width = 150;
                shiningStar.height = 150;
                shiningStar.position.x = this.rnd.integerInRange(50, 300);
                shiningStar.position.y = this.rnd.integerInRange(100, 600);
                shiningStar.animations.play("blinkingStar", 15, false, true);
                lastBlink = timer;
            }

        if(timer > lastBlink2 + blinkingTime2)
            {
                shiningStar2 = this.add.sprite(100, 100, 'blinkingStar');
                var blink2 = shiningStar2.animations.add("blinkingStar");
                shiningStar2.width = 150;
                shiningStar2.height = 150;
                shiningStar2.position.x = this.rnd.integerInRange(700, 950);
                shiningStar2.position.y = this.rnd.integerInRange(100, 600);
                shiningStar2.animations.play("blinkingStar", 15, false, true);
                lastBlink2 = timer;
            }

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
