var cost;
var damage = 5;
var health;
var type;

function SpaceShip(pathIndex, type, rotation, id, cost, fireTime) {

	this.pathIndex = pathIndex; 
	this.type = type;
	console.log(type);
	this.rotation = rotation;
	this.id = id;
	this.lastFiringTime = 0;
	this.fireTime = fireTime;
	this.cost = cost;

	this.getCost = function(){
		return cost;
	}

	this.setDamage = function(){
		if(type == "ship1"){
			damage = 2;
		}
		if(type == "ship2"){
			damage = 6;
		}
		if(type == "ship3"){
			damage = 8;
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