// Cloud

Cloud=function(canvas)
{
	this.setCanvas(canvas);
	this.fillStyle = "#a53f17";
};

Cloud.prototype=
{
	
	setCanvas:function(canvas)
	{
		this.canvas=canvas;
		this.context=this.canvas.getContext('2d');
	},
	
	draw:function()
	{
		var context=this.context;
		context.save();
		context.fillStyle=this.fillStyle;
		var cx=200;
		var cy=200;
	
		var radius=100;
		context.beginPath();
		var nd=Math.PI/2;
		var pi=Math.PI;
		for(var i=0;i<360;i+=30)
		{
			var sd=(nd-i)/180;
		context.arc(cx+radius*Math.cos(i),cy+radius*Math.sin(i),50,sd,(pi+sd)/180,true);
		}
		
		context.fill();;
		context.stroke();
		context.restore();
	}
}