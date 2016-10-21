
function Tower(x, y, id, damage, type, cost, range, fireTime) {

	this.x = x;
	this.y = y;
	var damage = damage;
	var level = 1;
	this.id = id;
	this.type = type;
	this.cost = cost;
	this.lastFiringTime = 0;
	var fireTime = fireTime;
	this.range = range;

	this.getFireTime = function(){
		return fireTime;
	}

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
		damage += damage + 10;
		fireTime /= 2;
	}

	this.getID = function(){
		return id;
	}

	this.getRange = function(){
		return range;
	}

	this.setRange = function(){
		if(type == "blackhole"){
			range = 50;
		}
		if(type == "sun"){
			range = 100;
		}
		if(type == "asteroidsprite"){
			range = 150;
		}
	}
}	