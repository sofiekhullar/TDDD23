var cost = 50;
var damage = 100;
var health = 100;
var type;

function SpaceShip(pathIndex, type, rotation) {

	this.pathIndex = pathIndex; 
	this.type = type;
	this.rotation = rotation;
	

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

	this.getRotation = function(){
		return rotation;
	}

	this.addPathIndex = function(){
		pathIndex++;
	}

}