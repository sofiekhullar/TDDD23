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

		//Backgrounds
		this.load.image('background-earth-venus','assets/background-earth-venus.png');
		this.load.image('background-moon-earth','assets/background-moon-earth.png');
		this.load.image('background-moon-venus','assets/background-moon-venus.png');
		this.load.image('background-neptune-earth','assets/background-neptune-earth.png');
		this.load.image('background-neptune-moon','assets/background-neptune-moon.png');
		this.load.image('background-neptune-venus','assets/background-neptune-venus.png');
		this.load.image('background-venus-earth','assets/background-venus-earth.png');
		this.load.image('background-earth-moon','assets/background-earth-moon.png');
		this.load.image('background-venus-moon','assets/background-venus-moon.png');
		this.load.image('background-earth-neptune','assets/background-earth-neptune.png');
		this.load.image('background-moone-neptune','assets/background-moon-neptune.png');
		this.load.image('background-venus-neptune','assets/background-venus-neptune.png');

		// Load all assets!
	    this.load.image('background2', 'assets/backgroundw.png');
	    this.load.image('helpmenu', 'assets/helpmenu.png')
	    this.load.image('noThanksButton', 'assets/noThanksButton.png');
	    this.load.image('yesShowMeButton', 'assets/yesShowMeButton.png')

	    this.load.image('ship1-moon', 'assets/ships/ship1_moon.png');
	    this.load.image('ship1-venus', 'assets/ships/ship1_venus.png');
	    this.load.image('ship1-earth', 'assets/ships/ship1_earth.png');
	    this.load.image('ship1-neptune', 'assets/ships/ship1_neptune.png');
	    this.load.image('ship1', 'assets/ships/ship1.png');

	    this.load.spritesheet('ship1-animation-moon', 'assets/ships/ship1_animation_moon.png', 40,50);
	    this.load.spritesheet('ship1-animation-venus', 'assets/ships/ship1_animation_venus.png', 40,50);
	    this.load.spritesheet('ship1-animation-earth', 'assets/ships/ship1_animation_earth.png', 40,50);
	    this.load.spritesheet('ship1-animation-neptune', 'assets/ships/ship1_animation_neptune.png', 40,50);

	    this.load.image('ship2-moon', 'assets/ships/ship2_moon.png');
	    this.load.image('ship2-venus', 'assets/ships/ship2_venus.png');
	    this.load.image('ship2-earth', 'assets/ships/ship2_earth.png');
	    this.load.image('ship2-neptune', 'assets/ships/ship2_neptune.png');

	    this.load.spritesheet('ship2-animation-moon', 'assets/ships/ship2_animation_moon.png', 50,50);
	    this.load.spritesheet('ship2-animation-venus', 'assets/ships/ship2_animation_venus.png', 50,50);
	    this.load.spritesheet('ship2-animation-earth', 'assets/ships/ship2_animation_earth.png', 50,50);
	    this.load.spritesheet('ship2-animation-neptune', 'assets/ships/ship2_animation_neptune.png', 50,50);

	    this.load.image('ship3-moon', 'assets/ships/ship3_moon.png');
	    this.load.image('ship3-venus', 'assets/ships/ship3_venus.png');
	    this.load.image('ship3-earth', 'assets/ships/ship3_earth.png');
	    this.load.image('ship3-neptune', 'assets/ships/ship3_neptune.png');

	    this.load.spritesheet('ship3-animation-moon', 'assets/ships/ship3_animation_moon.png', 40,50);
	    this.load.spritesheet('ship3-animation-venus', 'assets/ships/ship3_animation_venus.png', 40,50);
	    this.load.spritesheet('ship3-animation-earth', 'assets/ships/ship3_animation_earth.png', 40,50);
	    this.load.spritesheet('ship3-animation-neptune', 'assets/ships/ship3_animation_neptune.png', 40,50);

	    // this.load.image('blackhole', 'assets/blackhole.png');
	    this.load.image('coin', 'assets/diamond.png');
	    this.load.image('heart', 'assets/health.png');
	    this.load.image('bullet1', 'assets/bullet.png');
	    this.load.image('bullet2', 'assets/bullet2.png');
	    this.load.image('bullet3', 'assets/bullet3.png');
	    // this.load.image('satellite', 'assets/satellite.png');
	    // this.load.image('satellite-denied', 'assets/satellite-denied.png');
	    // this.load.image('blackhole-denied', 'assets/blackhole-denied.png');
	    // this.load.spritesheet('blackhole-animation', 'assets/blackhole-animation.png', 100, 100);
	    this.load.image('bulletAsteroid', 'assets/bulletAsteroid.png');
	    this.load.image('bulletSun', 'assets/sun-bullet.png');
	    // this.load.image('asteroid', 'assets/asteroidsprite.png');
	    // this.load.image('asteroid-denied', 'assets/asteroidsprite-denied.png');
	    // this.load.spritesheet('asteroid-animation', 'assets/asteroidspritesheet2.png', 97, 99);
	    this.load.image('menuItem', 'assets/menu-item.png');
	    this.load.image('menuBackground', 'assets/menu-background.png');
	    this.load.image('towerRange100', 'assets/towerRange_100.png');
	    this.load.image('towerRange125', 'assets/towerRange_125.png');
	    this.load.image('towerRange150', 'assets/towerRange_150.png');
	    this.load.spritesheet('explosion', 'assets/explode.png', 128,128);
	    this.load.spritesheet('fallingStar', 'assets/falling-star-animation.png', 50, 50);
	    this.load.spritesheet('blinkingStar', 'assets/star-animation.png', 50, 50);
	    this.load.spritesheet('sun-animation', 'assets/sun-animation.png', 100, 100);
	    // this.load.image('sun', 'assets/sun.png');
	    // this.load.image('sun-denied', 'assets/sun-denied.png');
	    this.load.image('backgroundTowerMenu', 'assets/backgroundTowerMenu.png');
	    this.load.image('towerMenuButton','assets/towerMenuButton.png');

	    this.load.image('blackhole-moon', 'assets/towers/blackhole-moon.png');
	    this.load.image('blackhole-earth', 'assets/towers/blackhole-earth.png');
	    this.load.image('blackhole-neptune', 'assets/towers/blackhole-neptune.png');
	    this.load.image('blackhole-venus', 'assets/towers/blackhole-venus.png');

	    this.load.image('blackhole-moon-denied', 'assets/towers/blackhole-moon-denied.png');
	    this.load.image('blackhole-earth-denied', 'assets/towers/blackhole-earth-denied.png');
	    this.load.image('blackhole-neptune-denied', 'assets/towers/blackhole-neptune-denied.png');
	    this.load.image('blackhole-venus-denied', 'assets/towers/blackhole-venus-denied.png');

	    this.load.spritesheet('blackhole-animation-moon-level1', 'assets/towers/blackhole-animation-moon.png', 100, 100);
	    this.load.spritesheet('blackhole-animation-earth-level1', 'assets/towers/blackhole-animation-earth.png', 100, 100);
	    this.load.spritesheet('blackhole-animation-neptune-level1', 'assets/towers/blackhole-animation-neptune.png', 100, 100);
	    this.load.spritesheet('blackhole-animation-venus-level1', 'assets/towers/blackhole-animation-venus.png', 100, 100);

	    this.load.spritesheet('blackhole-animation-moon-level2', 'assets/towers/blackhole-animation-moon.png', 100, 100);
	    this.load.spritesheet('blackhole-animation-earth-level2', 'assets/towers/blackhole-animation-earth.png', 100, 100);
	    this.load.spritesheet('blackhole-animation-neptune-level2', 'assets/towers/blackhole-animation-neptune.png', 100, 100);
	    this.load.spritesheet('blackhole-animation-venus-level2', 'assets/towers/blackhole-animation-venus.png', 100, 100);

	    this.load.spritesheet('blackhole-animation-moon-level3', 'assets/towers/blackhole-animation-moon.png', 100, 100);
	    this.load.spritesheet('blackhole-animation-earth-level3', 'assets/towers/blackhole-animation-earth.png', 100, 100);
	    this.load.spritesheet('blackhole-animation-neptune-level3', 'assets/towers/blackhole-animation-neptune.png', 100, 100);
	    this.load.spritesheet('blackhole-animation-venus-level3', 'assets/towers/blackhole-animation-venus.png', 100, 100);

	    this.load.image('sun-moon', 'assets/towers/sun-moon.png');
	    this.load.image('sun-earth', 'assets/towers/sun-earth.png');
	    this.load.image('sun-neptune', 'assets/towers/sun-neptune.png');
	    this.load.image('sun-venus', 'assets/towers/sun-venus.png');

	    this.load.image('sun-moon-denied', 'assets/towers/sun-moon-denied.png');
	    this.load.image('sun-earth-denied', 'assets/towers/sun-earth-denied.png');
	    this.load.image('sun-neptune-denied', 'assets/towers/sun-neptune-denied.png');
	    this.load.image('sun-venus-denied', 'assets/towers/sun-venus-denied.png');

	    this.load.spritesheet('sun-animation-moon-level1', 'assets/towers/sun-animation-moon-level1.png', 100, 100);
	    this.load.spritesheet('sun-animation-earth-level1', 'assets/towers/sun-animation-earth-level1.png', 100, 100);
	    this.load.spritesheet('sun-animation-neptune-level1', 'assets/towers/sun-animation-neptune-level1.png', 100, 100);
	    this.load.spritesheet('sun-animation-venus-level1', 'assets/towers/sun-animation-venus-level1.png', 100, 100);

	    this.load.spritesheet('sun-animation-moon-level2', 'assets/towers/sun-animation-moon-level2.png', 100, 100);
	    this.load.spritesheet('sun-animation-earth-level2', 'assets/towers/sun-animation-earth-level2.png', 100, 100);
	    this.load.spritesheet('sun-animation-neptune-level2', 'assets/towers/sun-animation-neptune-level2.png', 100, 100);
	    this.load.spritesheet('sun-animation-venus-level2', 'assets/towers/sun-animation-venus-level2.png', 100, 100);

	    this.load.spritesheet('sun-animation-moon-level3', 'assets/towers/sun-animation-moon-level3.png', 100, 100);
	    this.load.spritesheet('sun-animation-earth-level3', 'assets/towers/sun-animation-earth-level3.png', 100, 100);
	    this.load.spritesheet('sun-animation-neptune-level3', 'assets/towers/sun-animation-neptune-level3.png', 100, 100);
	    this.load.spritesheet('sun-animation-venus-level3', 'assets/towers/sun-animation-venus-level3.png', 100, 100);

	    this.load.image('asteroidsprite-moon', 'assets/towers/asteroidsprite-moon.png');
	    this.load.image('asteroidsprite-earth', 'assets/towers/asteroidsprite-earth.png');
	    this.load.image('asteroidsprite-neptune', 'assets/towers/asteroidsprite-neptune.png');
	    this.load.image('asteroidsprite-venus', 'assets/towers/asteroidsprite-venus.png');

	    this.load.image('asteroidsprite-moon-denied', 'assets/towers/asteroidsprite-moon-denied.png');
	    this.load.image('asteroidsprite-earth-denied', 'assets/towers/asteroidsprite-earth-denied.png');
	    this.load.image('asteroidsprite-neptune-denied', 'assets/towers/asteroidsprite-neptune-denied.png');
	    this.load.image('asteroidsprite-venus-denied', 'assets/towers/asteroidsprite-venus-denied.png');

	    this.load.spritesheet('asteroidsprite-animation-moon-level1', 'assets/towers/asteroidsprite-animation-moon-level1.png', 98, 99);
	    this.load.spritesheet('asteroidsprite-animation-earth-level1', 'assets/towers/asteroidsprite-animation-earth-level1.png', 98, 99);
	    this.load.spritesheet('asteroidsprite-animation-neptune-level1', 'assets/towers/asteroidsprite-animation-neptune-level1.png', 98, 99);
	    this.load.spritesheet('asteroidsprite-animation-venus-level1', 'assets/towers/asteroidsprite-animation-venus-level1.png', 98, 99);

	    this.load.spritesheet('asteroidsprite-animation-moon-level2', 'assets/towers/asteroidsprite-animation-moon-level2.png', 98, 99);
	    this.load.spritesheet('asteroidsprite-animation-earth-level2', 'assets/towers/asteroidsprite-animation-earth-level2.png', 98, 99);
	    this.load.spritesheet('asteroidsprite-animation-neptune-level2', 'assets/towers/asteroidsprite-animation-neptune-level2.png', 98, 99);
	    this.load.spritesheet('asteroidsprite-animation-venus-level2', 'assets/towers/asteroidsprite-animation-venus-level2.png',98, 99);

	    this.load.spritesheet('asteroidsprite-animation-moon-level3', 'assets/towers/asteroidsprite-animation-moon-level3.png', 98, 99);
	    this.load.spritesheet('asteroidsprite-animation-earth-level3', 'assets/towers/asteroidsprite-animation-earth-level3.png', 98, 99);
	    this.load.spritesheet('asteroidsprite-animation-neptune-level3', 'assets/towers/asteroidsprite-animation-neptune-level3.png', 98, 99);
	    this.load.spritesheet('asteroidsprite-animation-venus-level3', 'assets/towers/asteroidsprite-animation-venus-level3.png', 98, 99);

	    // Lobby.sj
	    this.load.image('readyButton', 'assets/readyButton.png');
	    this.load.image('1_2connected', 'assets/1_2connected_new.png');
	    this.load.image('2_2connected', 'assets/2_2connected_new.png')
	    this.load.image('waitingForOpponent', 'assets/waitingForOpponent_new.png');
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
