var cost;
var damage = 5;
var health;
var type;

function SpaceShip(pathIndex, type, rotation, id) {

	this.pathIndex = pathIndex; 
	this.type = type;
	this.rotation = rotation;
	this.id = id;
	this.lastFiringTime = 10;
	this.fireTime = 0;

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

	this.setHealth = function(){
		health = 40;
	}

	this.setHealth();

	this.getHealth = function(){
		return health;
	}

	this.loseHealth = function(damage){
		health -= damage;
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
	this.killShip = function(){
		health = 0;
	}

	this.setTimer = function(input){
		lastFiringTime = input;
	}
}