$(document).ready(function () {

	/** ----- CREATE DATA: Data has elements: id, rtCount ----- **/

	var dataset = [];
	var count = [];
	function getId() { return Math.floor(Math.random()*(20000-10000+1) + 10000); };
	function getCount() { return Math.floor(Math.random()*(50-1+1) + 1); };


	for (var i = 0; i < 5; i++) {
		dataset.push( /* "id": getId(), "count": */ getCount() );
	};

	console.log(dataset);


	/** ----- RENDER GRAPH ----- **/

	// ----- SVG setup -----
	var width = 500, height = 300, barPadding = 1;

	// ----- Setup axes -----
	var labels = ["1-10", "11-20", "21-30", "31-40", "41-50"];
	var xScale = d3.scale.ordinal()
		.domain(labels)
		.rangeRoundBands([0, width]);

	var yScale = d3.scale.linear()
		.domain([0, d3.max(dataset, function(d) { return d[1]; })])
		.range([0, height]);



	// ----- Draw rectangles and qty text -----
	var svg = d3.select("#bar")
		.append("svg")
		.attr("width", width)
		.attr("height", height);

	svg.selectAll("rect")
		.data(dataset)
		.enter()
		.append("rect")

		// Change the bar spacing based on bar count.
		.attr("x", function(d,i) { return i*(width/dataset.length);})

		// Grow the bars from bottom up, rather from top down.
		.attr("y", function(d) { return height - d; })

		.attr("width", width / dataset.length - barPadding)

		// Scale bar height by 10, otherwise the bars are too short.
		.attr("height", function(d) { return d; })

		// Color!
		.attr("fill", "#5DA5DA");

	svg.selectAll("text")
		.data(dataset)
		.enter()
		.append("text")
		.text(function(d) { return d; })
		.attr("x", function(d,i) { return i * (width / dataset.length); })
		.attr("y", function(d) { return height - (d); });

	// ----- Draw axes -----
	svg.append("g")
		.attr("class", "axis")
		//.attr("transform", "translate(0," +(height-10)+ ")")
		.call(d3.svg.axis()
			.scale(xScale)
			.orient("bottom"));
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