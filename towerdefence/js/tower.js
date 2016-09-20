var level = 1;
var damage = 10;
var id = 1;

function tower(level, id) {
	//this.x = x;
	//this.y = y;
	//this.damage = damage;
	this.id = id;
	this.level = level;

	this.getLevel = function(){
		return level;
	}

	this.setLevel = function(){
		level++;
	}
	this.getId = function(){
		return id;
	}
}