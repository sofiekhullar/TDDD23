var health = 1000;
var money = 1000;
var planetType;
var name;

function user(name, type) {



	this.name = name;
	this.planetType = type;
	
}

user.prototype.loseHealth = function(damage){
	health -= damage;
}

user.prototype.buy = function(towerCost){
	money -= towerCost;
}

user.prototype.sell = function(towerCost){
	money += towerCost;
}

user.prototype.getMoney = function(){
	return money;
}

user.prototype.getHealth = function(){
	return health;
}

user.prototype.getName = function(){
	return name;
}

user.prototype.getType = function(){
	return planetType;
}