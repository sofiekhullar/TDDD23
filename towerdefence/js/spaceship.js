var cost = 50;
var damage = 100;
var health = 100;
var type;

function SpaceShip(pathIndex, type) {

	this.pathIndex = pathIndex; 
	this.type = type;
	
	this.getCost = function(){
		return cost;
	}

	this.getDamage = function(){
		return damage;
	}

	this.getHealth = function(){
		return health;
	}

	this.getPathIndex = function(){
		return pathIndex;
	}

	this.addPathIndex = function(){
		pathIndex++;
	}

}