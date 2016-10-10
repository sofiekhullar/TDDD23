Game.HelpMenu = function (game) {

};

Game.HelpMenu.prototype = {
	create:function(game){
		game.add.sprite(game.world.centerX,game.world.centerY, 'help'); 
	}
}