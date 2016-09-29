var cost;
var damage = 5;
var health = 100;
var type;

function SpaceShip(pathIndex, type, rotation) {

	this.pathIndex = pathIndex; 
	this.type = type;
	this.rotation = rotation;

	this.getCost = function(){
		return cost;
	}

	this.setDamage = function(){
		if(type == "ship1"){
			damage = 10;
		}
		if(type == "ship2"){
			damage = 20;
		}
		if(type == "ship3"){
			damage = 50;
		}
	}

	this.setDamage();

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

	this.getType = function(){
		return type;
	}

	this.addPathIndex = function(){
		pathIndex++;
	}
}