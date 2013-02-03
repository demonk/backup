

var x;
var y;

var speed;
var onMouse;
var evt;
var currectDirection;
FootCollection=function(canvas,img)
{
	this.setCanvas(canvas);
	this.maxLength=20;//最大保存十个脚印
	this.img=img;
	
	x=100;
	y=100;
	
	this.isLeft=true;
	currentDirection=20;
	speed=30;

	evt=new Object();
	evt.layerX=x;
	evt.layerY=y;
	this.foots=[];
	
	this.direction=0;
};

FootCollection.prototype={
	setCanvas:function(canvas){
		this.canvas=canvas;
		this.context=this.canvas.getContext('2d');
		this.canvas.addEventListener("mousemove",this.onMouseMove,false);
	},
	
	onMouseMove:function(e)
	{
		onMouse=true;
		var dx=e.layerX-x;
		var dy=e.layerY-y;
		
		evt.layerX=e.layerX;
		evt.layerY=e.layerY;
		if(Math.sqrt(dx*dx+dy*dy)>speed){
		var radian=Math.atan2(dy,dx);
		var angle=180*radian/Math.PI;
		
		angle=angle<0?(360+angle):angle;
		currectDirection=20*(parseInt(angle/20));
		console.log(currectDirection);
		x+=parseInt(Math.cos(radian)*speed);
		y+=parseInt(Math.sin(radian)*speed);
		}
		//console.log("x="+x+",y="+y);
		
	},
	
	slide:function()
	{
		if(!onMouse)
		{
			/*
			var nx=parseInt(Math.random()*(this.canvas.width+1));
			var ny=parseInt(Math.random()*(this.canvas.height+1));
			
			if(Math.abs(evt.layerX-nx)>170||Math.abs(evt.layerY-ny)>170)
			{
				evt.layerX=nx;
				evt.layerY=ny;
				this.onMouseMove(evt);
			}*/
			//else
			//return;
			
		}
		
		
		/*
		switch(this.direction)
		{
			case 0:
			if(x>=this.canvas.width-200) 
			{
				++this.direction;
				this.currectDirection=340;
				
				this.isLeft=true;
			}
			else
			{
				if(this.isLeft)
				{
					this.currectDirection=20;
					y+=18;
				}else
				{
					this.currectDirection=340;
					y-=18;
				}
				x+=18;
			}
			break;
			case 1:
			var angle=(340-this.currectDirection+20);
			if(angle>90) ++this.direction;
			else
			{
				//console.log("angle="+Math.cos(angle));
				if(this.isLeft)
				{
					x+=Math.cos(angle*Math.PI/180)*20;
					y+=Math.sin(angle*Math.PI/180)*20;
				}else{
					//x+=20;
					//y+=10;
				}
				this.currectDirection-=20;
			alert(angle);
			}
			break;
			case 2:
			if(y>=this.canvas.height-18) ++this.direction;
			else
			{
				if(this.isLeft)
				{
					x+=18;
						
				}else{
					x-=18;
				}
				y+=18;
			}
			break;
			case 3:
			if(this.currection==20) ++this.direction;
			else
			{
				
			}
			break;
			case 4:
			if(x<=18) ++this.direction;
			else
			{
				
			}
			break;
			case 5:
			if(this.currectDirection==280) ++this.direction;
			else
			{
				
			}
			break;
			case 6:if(y<=18) ++this.direction;
			else
			{
				
			}
			break;
			case 7:
			if(this.currectionDirection==200)
			this.currection=0;
			else
			{
				
			}
			break;
		}
		*/
		/*
		if(x<this.canvas.width-18)
		{
		if(this.isLeft)
		{
			this.currentDirection=20;
			y-=18;
			
		}else{
			this.currentDirection=340;
			y+=18;
		}
		x+=18;
		}else if(y<this.canvas.height-18)
		{
			if(this.isLeft)
			{
				this.currentDirection=280;
				x+=18;
			}else{
				this.currentDirection=240;
				x-=18;
			}
			y+=18;
		}
		
		*/
		
		if(onMouse){
		this.isLeft=!this.isLeft;
		var foot=new Foot(this.canvas,this.img,currectDirection,x,y);
		
		this.add(foot);
		this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
		for(var foot in this.foots)//不用全部重画
		{
			if(this.foots[foot])
				this.foots[foot].draw();
		}
		onMouse=false;
		}else{
				evt.layerX+=(Math.random()*100-50)*2;
				if(evt.layerX<0) evt.layerX+=50;
				else if(evt.layerX>this.canvas.width) evt.layerX-=50;
				
				evt.layerY+=(Math.random()*100-50)*2;
				if(evt.layerY<0) evt.layerY+=50;
				else if(evt.layerY>this.canvas.height) evt.layerY-=50;
				//evt.layerY+=10;
				//evt.layerY-=10;
				this.onMouseMove(evt);
		}
	},
	
	add:function(foot)
	{
		this.fadeout();
		this.foots.push(foot);
	},
	
	fadeout:function()
	{
		if(this.foots.length>=this.maxLength)
			this.foots.shift();
	}
};

// Foot Paint
Foot=function(canvas,img,direction,xs,ys)
{
	this.setCanvas(canvas);	
	this.img=img;
	
	this.direction=direction;//初始方向顺时45度
	this.fillStyle="#a53f17";
	this.x=xs;
	this.y=ys;
	
};

Foot.prototype={
	setCanvas:function(canvas){
		this.canvas=canvas;
		this.context=this.canvas.getContext('2d');
	},
	
	draw:function()
	{
		//this.context.save();
		this.context.fillStyle=this.fillStyle;
		this.context.drawImage(this.img,0,(this.direction/20)*17,17,17,this.x,this.y,17,17);
		
		//this.context.restore();
	}
}