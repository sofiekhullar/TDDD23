// var level = 1;

function Tower(x, y, id, damage, type, cost) {

	this.x = x;
	this.y = y;
	this.damage = damage;
	this.level = 1;
	this.id = id;
	this.type = type;
	this.cost = cost;
	this.lastFiringTime = 2;
	this.fireTime = 0;

	this.getLevel = function(){
		return level;
	}

	this.getCost = function(){
		return cost;
	}

	this.getDamage = function(){
		return damage;
	}

	this.levelUp = function(){

		level++;
	}

	this.getID = function(){
		return id;
	}
}	
