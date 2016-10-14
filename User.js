function User(name, type) {

	this.name = name;
	this.type = type;
	// this.health = 1000;
	// this.money = 1000;
	this.towers = [];
	this.spaceShips = [];
    var health = 100;
    var money = 60000;

	this.getName = function(){
		return name;
	}

	this.loseHealth = function(damage){
		health -= damage;
	}

	this.buy = function(towerCost){
		money -= towerCost;
	}

	this.killPlanet = function(){
		health = 0;
	}
	this.sell = function(towerCost){
		money += towerCost;
	}

	this.getMoney = function(){
		return money;
	}

	this.getHealth = function(){
		return health;
	}
	
	this.getType = function(){
		return type;
	}
};

// Export the Player class so you can use it in
// other files by using require("Player").Player
exports.User = User;