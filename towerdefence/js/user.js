var health = 1000;
var money = 1000;
var planetType = 'earth';
var name;
var towers = [];

function user(name, type) {

	this.name = name;
	this.planetType = type;
	this.towers = towers;

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

this.getName = function(){
	return name;
}

this.getType = function(){
	return planetType;
}
}