Game.Preload = function (game) {
	this.preloadBar = null;
};

Game.Preload.prototype = {
	preload:function(){

		this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloadBar');
		this.preloadBar.anchor.setTo(0.5,0.5);
		this.time.advancedTiming = true;

		// Makes the loadingbar working automagic!
		this.load.setPreloadSprite(this.preloadBar);

		// Load all assets!
	    this.load.image('background2', 'assets/backgroundw.png');
	    this.load.image('ship1', 'assets/ships/ship1.png');
	    this.load.image('ship2', 'assets/ships/ship2.png');
	    this.load.image('ship3', 'assets/ships/ship3.png');
	    this.load.image('blackhole', 'assets/blackhole.png');
	    this.load.image('coin', 'assets/diamond.png');
	    this.load.image('heart', 'assets/health.png');
	    this.load.image('bullet1', 'assets/bullet.png');
	    this.load.image('bullet2', 'assets/bullet2.png');
	    this.load.image('bullet3', 'assets/bullet3.png');
	    this.load.image('towerDenied', 'assets/towerDenied.png');
	    this.load.image('satellite', 'assets/satellite.png');
	    this.load.image('satellite-denied', 'assets/satellite-denied.png');
	    this.load.image('blackhole-denied', 'assets/blackhole-denied.png');
	    this.load.spritesheet('blackhole-animation', 'assets/blackhole-animation.png', 100, 100);
	    this.load.image('asteroid', 'assets/asteroidsprite.png');
	    this.load.image('asteroid-denied', 'assets/asteroidsprite-denied.png');
	    this.load.spritesheet('asteroid-animation', 'assets/asteroidspritesheet2.png', 97, 99);
	    this.load.image('menuItem', 'assets/menu-item.png');
	    this.load.image('menuBackground', 'assets/menu-background.png');
	    this.load.image('towerRange50', 'assets/towerRange_50.png');
	    this.load.image('towerRange100', 'assets/towerRange_100.png');
	    this.load.image('towerRange150', 'assets/towerRange_150.png');
	    this.load.spritesheet('explosion', 'assets/explode.png', 128,128);
	    this.load.spritesheet('fallingStar', 'assets/falling-star-animation.png', 50, 50);
	    this.load.spritesheet('blinkingStar', 'assets/star-animation.png', 50, 50);
	    this.load.spritesheet('sun-animation', 'assets/sun-animation.png', 100, 100);
	    this.load.image('sun', 'assets/sun.png');
	    this.load.image('sun-denied', 'assets/sun-denied.png');

	    // Lobby.sj
	    this.load.image('readyButton', 'assets/readyButton.png');
	    this.load.image('1_2connected', 'assets/1_2connected.png');
	    this.load.image('2_2connected', 'assets/2_2connected.png')
	    this.load.image('waitingForOpponent', 'assets/waitingForOpponent.png');
	    this.load.image('countdown2', 'assets/countdown1.png');
	    this.load.image('countdown1', 'assets/countdown2.png');
	    this.load.image('countdown0', 'assets/countdown3.png');
	    this.load.image('countdown3', 'assets/countdownGo.png');

	    // planetMenu.js
	    this.load.image('choosePlanetMenu', 'assets/choosePlanetMenu.png');
	    this.load.image('chooseButton', 'assets/chooseButton.png');
	   	this.load.image('earth', 'assets/planets/earth.png');
	    this.load.image('venus', 'assets/planets/venus.png');
	    this.load.image('moon', 'assets/planets/moon.png');
	    this.load.image('neptune', 'assets/planets/neptune.png');

	    // MainMenu.js
	    this.load.image('play_button', 'assets/play_button.png');
	    this.load.image('multi_button', 'assets/multi_button.png');
	    this.load.image('help_button', 'assets/help_button.png');
	    this.load.image('mainMenuBackground', 'assets/space2.jpg');
	    this.load.image('playButton', 'assets/playButton.png');
	    this.load.image('helpButton', 'assets/helpButton.png');
	    this.load.image('settingsButton', 'assets/settingsButton.png');
	    this.load.image('mainMenuTitle', 'assets/mainMenuTitle.png');

	    // gameOver 
	    this.load.image('gameoverMenu_win', 'assets/gameoverMenu_win.png');
	    this.load.image('gameoverMenu_lost', 'assets/gameoverMenu_lost.png')
	    this.load.image('playAgainButton', 'assets/playAgainButton.png');
	    this.load.image('backToMenuButton', 'assets/backToMenuButton.png');

	    // HelpMenu.js
	    this.load.image('help', 'assets/help.jpeg');
	},

	create:function(){
		this.state.start('MainMenu');
		//this.state.start('Play');
	}
}
