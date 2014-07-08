$(document).ready(function () {

/*
// RINGS KINDA WORK
var rawData = [{"rt": 0, "fav": 1},
				{"rt": 0, "fav": 1},
				{"rt": 1, "fav": 1},
				{"rt": 1, "fav": 0}];

var rtCount = 0, favCount = 0;
for (var i = 0; i < rawData.length; i++) {
	rtCount += rawData[i].rt;
	favCount += rawData[i].fav;
};

var total = rawData.length;
var overlap = rtCount + favCount - total;
var dataset = {
		rtCount: [rtCount, total-rtCount],
		favCount: [favCount, total-favCount] };

var width = 600, height = 400, cwidth = 25;

// var color = d3.scale.category20();
var color = d3.scale.ordinal()
	// blue, orange
//	.range(["#5DA5DA", "#FFFFFF"]);
	.range(["#5DA5DA", "#FAA43A"]);

var pie = d3.layout.pie()
	.sort(null);

var arc = d3.svg.arc();

var svg = d3.select("#sunburst").append("svg")
	.attr("width", width)
	.attr("height", height)
	.append("g")
	.attr("transform", "translate(" +width/2+ "," +height/2+ ")");

var gs = svg.selectAll("g").data(d3.values(dataset)).enter().append("g");
var path = gs.selectAll("path")
	.data(function(d) { return pie(d); })
  .enter().append("path")
	.attr("fill", function(d, i) { return color(i); })
	.attr("d", function(d, i, j) { return arc.innerRadius(50+cwidth*j).outerRadius(cwidth*(j+1))(d); });
});
*/

	
// ALL SEGMENTS IN ONE RING


	var vis = d3.select("#sunburst");
	var width = 600, height = 400;

	/* ----- INNER ARC ----- */

	var innerColor = d3.scale.ordinal()
		.range(["#5DA5DA", "#FFFFFF"]);

	var innerArc = d3.svg.arc()
		.innerRadius(50)
		.outerRadius(100);

	/* ----- OUTER ARC ----- */
	var outerColor = d3.scale.ordinal()
		.range(["#FFFFFF", "#FAA43A"])

	var outerArc = d3.svg.arc()
		.innerRadius(100)
		.outerRadius(150);

	var pie = d3.layout.pie()
		.sort(null)
		.value(function(d) {return d.population;});

	var svg = d3.select("#sunburst").append("svg")
		.attr("width", width)
		.attr("height", height)
		.append("g")
		.attr("transform", "translate(" +width/2+ "," +height/2+ ")");

	// DATA NOT IN CSV FORM
	var dataset = [{"age": "blue", "population": 1},
					{"age": "orange", "population": 3}];
	console.log(dataset);
	
//	dataset.forEach(function(d) {
//		console.log("run d function");
//		d.population = +d.population;
//	});

	// Draw each arc, named g
	var g = svg.selectAll(".arc")
			.data(pie(dataset))
		.enter().append("g")
			.attr("class", "arc");

	// ----- INNER ARC, YO ----- //
	// Fill path (each segment) with appropriate color
	g.append("path")
		.attr("d", innerArc)
		.style("fill", function(d) {return innerColor(d.data.age);});

	// Add label within segment
	g.append("text")
		.attr("transform", function(d) {return "translate(" +innerArc.centroid(d)+ ")";})
		.attr("dy", ".35em")
		.style("text-anchor", "middle")
		.text(function(d) {return d.data.age /* + d.data.population */ ;});


	// ----- OUTER ARC, YO ----- //
	g.append("path")
		.attr("d", outerArc)
		.style("fill", function(d) {return outerColor(d.data.age);});

	// Add label within segment
	g.append("text")
		.attr("transform", function(d) {return "translate(" +outerArc.centroid(d)+ ")";})
		.attr("dy", ".35em")
		.style("text-anchor", "middle")
		.text(function(d) {return d.data.age /* + d.data.population */ ;});


});