// JavaScript Document

RaindropCollection=function(canvas,img)
{
	this.setCanvas(canvas);
	this.img=img;
	this.drops=[];
	
}


RaindropCollection.prototype={
	setCanvas:function(canvas)
	{
		this.canvas=canvas;
		this.context=canvas.getContext('2d');
	},
	
	next:function()
	{
		//this.context.fillStyle='#ececec';
		//this.context.fillRect(0,0, 400,400);
		var rainChance=0;
		if(Math.random()<0.1)
			this.add(new Raindrop(this.canvas));
		this.context.clearRect(0,185,this.canvas.width,this.canvas.height);
		for (var s in this.drops) {
			if (this.drops[s])
				this.drops[s].next();
		}
	},
	
	add:function(drop)
	{
		drop.collection=this;
		drop.img=this.img;
		this.drops.push(drop);
		
	},
	
	remove:function(drop)
	{
		for(var d in this.drops)
			if(this.drops[d]==drop)
				this.drops.splice(d,1);
	},
	
	getLength:function()
	{
		return this.drops.length;
	}
}