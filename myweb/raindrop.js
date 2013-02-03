// RainDrop
Raindrop=function(canvas){
	this.setCanvas(canvas);
	this.wind=-1;//风向,负为向左,正为向右,单位:N
	this.gravity=4;//下降速度
	
	this.fillStyle= "#a53f17";
	
	//随机位置  
	this.y=185;
//	this.x=Math.random()*canvas.width;
this.x=parseInt(Math.random()*(400-100+1)+100);
//alert(this.x);
	
	
};

Raindrop.prototype={
	setCanvas:function(canvas)
	{
		this.canvas=canvas;
		this.context=this.canvas.getContext('2d');
		this.width=this.canvas.width;
		this.height=this.canvas.height;
	},
	
	next:function()
	{
		this.draw();
		this.die();
	},
	
	draw:function()
	{
		var context=this.context;
		context.save();

		context.fillStyle=this.fillStyle;
		this.x+=this.wind;
		this.y+=this.gravity;
		
		context.drawImage(this.img,this.x,this.y);
		//this.y=this.y>this.height?0:this.y+2;
		context.restore();
		//console.log(this.index);
	},
	die:function()
	{
		if(this.y>this.canvas.height||this.x>this.canvas.width||this.x<0)
		this.collection.remove(this);
	}
}