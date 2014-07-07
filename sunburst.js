$(document).ready(function () {
		
	var vis = d3.select("#sunburst");
	var width = 600, height = 400;

	var color = d3.scale.ordinal()
		.range(["#5DA5DA", "#FAA43A", "4D4D4D"]);

	var innerArc = d3.svg.arc()
		.innerRadius(50)
		.outerRadius(100);

	var pie = d3.layout.pie()
		.sort(null)
		.value(function(d) {return d.population;});

	var svg = d3.select("#sunburst").append("svg")
		.attr("width", width)
		.attr("height", height)
		.append("g")
		.attr("transform", "translate(" +width/2+ "," +height/2+ ")");

	// DATA NOT IN CSV FORM
	var dataset = [{"age": "< 5", "population": 5},
					{"age": "5-13", "population": 10}];

	console.log(dataset);

	/*
	dataset.forEach(function(d) {
		console.log("run d function");
		d.population = +d.population;
	});
	*/

	// Draw each arc, named g
	var g = svg.selectAll(".arc")
		 	.data(pie(dataset))
		.enter().append("g")
			.attr("class", "arc");

	// Fill path (each segment) with appropriate color
	g.append("path")
		.attr("d", innerArc)
		.style("fill", function(d) {return color(d.data.age);});

	// Add label within segment
	g.append("text")
		.attr("transform", function(d) {return "translate(" +innerArc.centroid(d)+ ")";})
		.attr("dy", ".35em")
		.style("text-anchor", "middle")
		.text(function(d) {return d.data.age /* + d.data.population */ ;});

});