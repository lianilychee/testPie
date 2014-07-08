$(document).ready(function () {

	/** CREATE DATA
		* Data has elements: id, rtCount */

	var dataset = [];
	var count = [];
	function getId() { return Math.floor(Math.random()*(20000-10000+1) + 10000); };
	function getCount() { return Math.floor(Math.random()*(50-1+1) + 1); };


	for (var i = 0; i < 10; i++) {
		dataset.push( /* "id": getId(), "count": */ getCount() );
	};

	console.log(dataset);


	/** RENDER GRAPH 
		**/

	// Width and height
	var width = 500, height = 100, barPadding = 1;

	var svg = d3.select("#bar")
		.append("svg")
		.attr("width", width)
		.attr("height", height);

	svg.selectAll("rect")
		.data(dataset)
		.enter()
		.append("rect")

		// Change the bar spacing based on bar count.
		.attr("x", function(d, i) { return i*(width/dataset.length);})

		// Grow the bars from bottom up, rather from top down.
		.attr("y", function(d) { return height - d; })

		.attr("width", width / dataset.length - barPadding)

		// Scale bar height by 10, otherwise the bars are too short.
		.attr("height", function(d) { return d*10; })

		// Color!
		.attr("fill", "#5DA5DA");

/*
	var x = d3.scale.linear()
		.domain([0, d3.max(50)])
		.range([0, 500]);

	// Select HTML defined SVG and set dimensions.
	d3.select("#bar")
		.selectAll("div")
			.data(dataset)
		.enter().append("div")
			.style("width", function(d) {return x(d) + "px"; })
			.text(function(d) {return d; });
*/
});