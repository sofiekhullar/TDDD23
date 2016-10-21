var lastBlink = 0;
var blinkingTime = 1;
var lastBlink2 = 1;
var blinkingTime2 = 1;
var timer;

var helpBackgroundMenu;
var yesShowMeButton;
var noThanksButton;
var settingsButton;
var helpButton;
var gameTitle;

Game.MainMenu = function (game) {

};

Game.MainMenu.prototype = {


	create:function(game){

		var background = game.add.sprite(0,0, 'mainMenuBackground'); 
	 	gameTitle =  game.add.sprite(0,0,'mainMenuTitle');

		var style = { font: "normal 65px DK", fill: "#ff0044", align: "center" };
		text = game.add.text(0, 0, "", style);
		
		var playButton = game.add.button(this.game.width/2 - 150, this.game.height/2 - 100, 'playButton', this.actionOnClickPlay, this, 2, 1, 0);
		helpButton = game.add.button(this.game.width - 170, this.game.height - 170, 'helpButton', this.actionOnClickHelp, this, 2, 1, 0);
		helpButton.width = 150;
		helpButton.height = 150;
		settingsButton = game.add.button(this.game.width - 980, this.game.height - 170, 'settingsButton', this.actionOnClickMultiSetting, this, 2, 1, 0);
		settingsButton.width = 150;
		settingsButton.height = 150;

		// Help menu if first time user
		if (typeof(Storage) !== "undefined") {
		    if (localStorage.getItem("hasCodeRun") === null) {
			 	console.log("Show the helpshit");
			 	helpBackgroundMenu = game.add.sprite(0, 120, 'helpmenu');

			 	noThanksButton = game.add.button(this.game.width/2 - 270, this.game.height/2 + 100, 'noThanksButton', this.actionOnClickNoThanks, this, 2, 1, 0);
		 		yesShowMeButton = game.add.button(this.game.width/2 + 20, this.game.height/2 + 100, 'yesShowMeButton', this.actionOnClickYesButton, this, 2, 1, 0);
		 		
		 		settingsButton.alpha = 0.5;
		 		settingsButton.input.enabled = false;
		 		helpButton.alpha = 0.5;
		 		helpButton.input.enabled = false;
		 		gameTitle.alpha = 0.5;

				localStorage.setItem("hasCodeRun", true);
			}
			else{
				console.log('Dont show it');
			}
		}
	},

	actionOnClickNoThanks: function(){
		settingsButton.alpha = 1;
 		settingsButton.input.enabled = true;
 		helpButton.alpha = 1;
 		helpButton.input.enabled = true;
 		gameTitle.alpha = 1;

		helpBackgroundMenu.kill();
		noThanksButton.kill();
		yesShowMeButton.kill();
	},

	actionOnClickYesButton: function(){
		this.state.start('HelpMenu');
	},

	update:function(){

		timer = Math.floor(this.game.time.now / 1000);

		if(timer > lastBlink + blinkingTime)
            {
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
