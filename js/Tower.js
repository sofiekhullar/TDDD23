function Tower(x, y, id, damage, type, cost) {

	this.x = x;
	this.y = y;
	this.damage = damage;
	this.level = 1;
	this.id = id;
	this.type = type;
	this.cost = cost;

	this.getLevel = function(){
		return level;
	}

	this.getCost = function(){
		
	}

	this.getDamage = function(){
		return damage;
	}

	this.setLevel = function(){

		this.level++;
	}

	this.getID = function(){
		return id;
	}
}	

