Snake = function(canvas) {
	this.setCanvas(canvas);
	
	this.x = this.canvasWidth/2;
	this.y = this.canvasHeight;
	this.radius = 20;
	this.speed = this.canvasWidth/500;//控制延伸的增量大小
	this.angle = Math.PI/2;
	this.angleDiversion = 
	this.fillStyle = "#a53f17";
	this.shadowColor = "#a53f17";
	this.shadowBlur = 2;
	this.generation = 0;
	this.lifespan = 0;
	this.totalDistance = 0;
	this.distance = 0;
};

Snake.prototype = {
	//set up canvas enviroment
	setCanvas: function(canvas) {
		this.canvas = canvas;
		this.context = canvas.getContext("2d");
		this.$canvas = jQuery(canvas);
		this.canvasWidth = $canvas.width();
		this.canvasHeight = $canvas.height();
	},
	
	next: function() {
		this.draw();
		this.iterate();
		this.randomize();
 	//	this.limitSpeed();
 	//	this.reset(context);
		this.split();
	//	this.lifespan++;
		this.die();
	},
	
	draw: function() {
		var context = this.context;
		context.save();
		context.fillStyle = this.fillStyle;
		context.shadowColor = this.shadowColor;
		context.shadowBlur = this.shadowBlur;
		context.beginPath();
		context.moveTo(this.x, this.y);
		//alert(this.radius);
		context.arc(this.x, this.y, this.radius, 0, 2*Math.PI, true);
		context.closePath();
		context.fill();
		context.restore();
	},
	
	iterate: function() {
		var lastX = this.x;
		var lastY = this.y;
		this.x += this.speed * Math.cos(this.angle);
		this.y += this.speed * -Math.sin(this.angle);
		this.radius *= (0.99 - this.generation/2048); // minus 0.004 per generation
		//this.radius*=0.991;
		var deltaDistance = Math.sqrt(Math.abs(lastX-this.x) + Math.abs(lastY-this.y));
		this.distance += deltaDistance;
		this.totalDistance += deltaDistance;
		if (this.speed > this.radius*2)
			this.speed = this.radius*2;
	},
	
	randomize: function() {
		this.angle += Math.random()/5 - 1/5/2;
	},
	
	reset: function(context) {
		var $canvas = jQuery(context.canvas);
		var margin = 30+this.radius;
		var width = $canvas.width();
		var height = $canvas.height();
		
		if (this.x < -margin || this.x > width+margin || this.y < -margin || this.y > height+margin) {
// 			this.x = width/2;
			this.y = height;
			// New color
			var grey = Math.floor(Math.random()*255).toString(16);
			this.fillStyle = "#" + grey + grey + grey;
			this.shadowColor = this.fillStyle;
		}
	},
	//Recursive
	split: function() {
		// Calculate split chance
		var splitChance = 0;
		// Trunk
		if (this.generation == 0)
			splitChance = (this.distance-this.canvasHeight/5)/100;//change splitChance to %,means like 20% of canvasHeight
		//splitChance=0.026;
		// Branch
		else if (this.generation < 3)//for performance
			{
				//console.log(this.generation);
				splitChance = (this.distance-this.canvasHeight/10)/100;
			//	splitChance=0.01;
				}
				//else

		// Split if we are allowed
		//console.log(splitChance);
		var randomNumber=Math.random();

		if (randomNumber < splitChance) {//Math.random() initial a number between 0 to 1;
			//var n = 2+Math.round(Math.random()*2);//branch will be added more than 2
			var n=2;
			for (var i=0 ; i<n ; i++) {
				var snake = new Snake(this.canvas);
				snake.x = this.x;
				snake.y = this.y;
				snake.angle = this.angle;
				snake.speed = this.speed;
				snake.radius = this.radius * 0.9;
				snake.generation = this.generation + 1;
				snake.fillStyle = this.fillStyle;
				snake.shadowColor = this.shadowColor;
				snake.shadowBlur = this.shadowBlur;
				snake.totalDistance = this.totalDistance;
				this.collection.add(snake);
			}
			this.collection.remove(this);//remove the current branch to stop it spliting;
		}
		//if(splitChance==0) this.collection.remove(this);
	},
	
	die: function() {
		if (this.radius < 0.2) {
			this.collection.remove(this);
// 			console.log(this.distance);
		}
	}
}
