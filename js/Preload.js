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
	    this.load.image('background', 'assets/background_blue-red.png');
	    this.load.image('ship1', 'assets/ships/ship1.png');
	    this.load.image('ship2', 'assets/ships/ship2.png');
	    this.load.image('ship3', 'assets/ships/ship3.png');
	    this.load.image('blackhole', 'assets/blackhole.png');
	    this.load.image('coin', 'assets/diamond.png');
	    this.load.image('heart', 'assets/health.png');
	    this.load.image('earth', 'assets/earth.png');
	    this.load.image('saturn', 'assets/saturn.png');
	    this.load.image('bullet1', 'assets/bullet.png');
	    this.load.image('bullet2', 'assets/bullet2.png');
	    this.load.image('bullet3', 'assets/bullet3.png');
	    this.load.image('towerDenied', 'assets/towerDenied.png');
	    this.load.image('satellite', 'assets/satellite.png');
	    this.load.image('satellite-denied', 'assets/satellite-denied.png');
	    this.load.image('blackhole-denied', 'assets/blackhole-denied.png');
	    this.load.spritesheet('blackhole-animation', 'assets/blackhole-animation.png', 100, 100);
	    this.load.image('menuItem', 'assets/menu-item.png');
	    this.load.image('menuBackground', 'assets/menu-background.png');
	    this.load.image('towerRange50', 'assets/towerRange_50.png');
	    this.load.image('towerRange100', 'assets/towerRange_100.png');
	    this.load.image('towerRange150', 'assets/towerRange_150.png');
	    this.load.spritesheet('explosion', 'assets/explode.png', 128,128);

	    // MainMenu.js
	    this.load.image('play_button', 'assets/play_button.png');
	    this.load.image('multi_button', 'assets/multi_button.png');
	    this.load.image('help_button', 'assets/help_button.png');
	    this.load.image('mainMenuBackground', 'assets/space.jpeg');

	    // HelpMenu.js
	    this.load.image('help', 'assets/help.jpeg');
	},

	create:function(){
		this.state.start('MainMenu');
		//this.state.start('Play');
	}
}
