/* alert("hello world!"); */

var vis = d3.select(".svg_donut");
var arc = d3.svg.arc()
	.innerRadius(50)
	.outerRadius(100)
	.startAngle(0)
	.engAngle(1.5*Math.PI);

vis.append("path")
	.attr("d",arc)
	.attr("transform", "translate(300,200)"); 