$(document).ready(function () {

	// Define data.
	// Of 12 tweets, 10 were RT'd and all were fav'd. 
	var total = 12;
	var rawData = [{"type": "RT", "yes": 10},
					{"type": "Fav", "yes": 12}];

	// Convert radians to linear based on tweets.

	// Select HTML defined SVG and set dimensions.
	var width = 600, height = 400;

	var vis = d3.select("#sunburst")
		.attr("width", width)
		.attr("height", height);

	var rtArc = d3.svg.arc()
		.innerRadius(50)
		.outerRadius(100)
		.startAngle(0.5*Math.PI)
		.endAngle(1.0*Math.PI);

	var favArc = d3.svg.arc()
		.innerRadius(75)
		.outerRadius(125)
		.startAngle(0)
		.endAngle(1.5*Math.PI);

	vis.append("path")
		.attr("d", rtArc)
		.attr("fill", "#5DA5DA")
		.attr("opacity", "0.75")
		.attr("transform", "translate(" +(width/2)+ "," +(height/2)+ ")");


	vis.append("path")
		.attr("d", favArc)
		.attr("fill", "#FAA43A")
		.attr("opacity", "0.75")
		.attr("transform", "translate(" +(width/2)+ "," +(height/2)+ ")");

});