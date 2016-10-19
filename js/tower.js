
function Tower(x, y, id, damage, type, cost) {

	this.x = x;
	this.y = y;
	this.damage = damage;
	var level = 1;
	this.id = id;
	this.type = type;
	this.cost = cost;
	this.lastFiringTime = 2;
	this.fireTime = 0;
	var range;

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
		console.log(level);
		level++;
	}

	this.getID = function(){
		return id;
	}

	this.getRange = function(){
		return range;
	}

	this.setRange = function(){
		if(type == "blackhole"){
			range = 100;
		}
		if(type == "sun"){
			range = 100;
		}
		if(type == "asteroid"){
			range = 150;
		}
	}

	this.setRange();
}	

