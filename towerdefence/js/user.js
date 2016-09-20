var money = 1000;
var health = 1000;

function user(name, type) {

	this.name = name;
	this.type = type;
	// this.health = 1000;
	// this.money = 1000;
	this.towers = [];

	this.getName = function(){
		return name;
	}

	this.loseHealth = function(damage){
		health -= damage;
	}

	this.buy = function(towerCost){
		money -= towerCost;
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
}
