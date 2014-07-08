$(document).ready(function () {

	// Select HTML defined SVG and set dimensions.
	var vis = d3.select("#sunburst");
	var width = 600, height = 400;

	// Define data.
	var rawData = [{"id": "1", "rtCount": 1, "favCount": 0},
					{"id": "2", "rtCount": 1, "favCount": 0},
					{"id": "3", "rtCount": 1, "favCount": 1},
					{"id": "4", "rtCount": 0, "favCount": 0}];

	var rtCount = 0, favCount = 0;
	for (var i = 0; i < rawData.length; i++) {
		rtCount += rawData[i].rtCount;
		favCount += rawData[i].favCount;
	};

	var cleanData = [{"spreadType": "Retweeted", "tweets": rtCount},
					{"spreadType": "Favorited", "tweets": favCount}];



/** I AM HERE.
	* I've already got a radian to linear scale conversion.
	* Now, I have to get that conversion to translate into overlapping start/endAngles...
	* ... without making my segments vanish. */



	// Scale changed from radians to tweets.
	var scale = d3.scale.linear().domain([0, rawData.length]).range([0, 2*Math.PI]);

	// Define color scales.
	var innerColor = d3.scale.ordinal()
		.range(["#5DA5DA", "#FFFFFF"]);

	var outerColor = d3.scale.ordinal()
		.range(["#FFFFFF", "#FAA43A"]);

	// Define arc inner and outer radii.
	var innerArc = d3.svg.arc()
		.innerRadius(50)
		.outerRadius(100)

	var outerArc = d3.svg.arc()
		.innerRadius(100)
		.outerRadius(150);

	// Set sections to draw in the order that it appears in the data.
	var pie = d3.layout.pie()
		.sort(null)
		.value(function(d) {return d.tweets;});

	var svg = d3.select("#sunburst").append("svg")
		.attr("width", width)
		.attr("height", height)
		.append("g")
		.attr("transform", "translate(" +width/2+ "," +height/2+ ")");
	
//	dataset.forEach(function(d) {
//		console.log("run d function");
//		d.tweets = +d.tweets;
//	});

	// Draw each arc, named g
	var g = svg.selectAll(".arc")
			.data(pie(cleanData))
		.enter().append("g")
			.attr("class", "arc");

	// Fill path (each segment) with appropriate color
	g.append("path")
		.attr("d", innerArc)
		.style("fill", function(d) {return innerColor(d.data.spreadType);});

	g.append("path")
		.attr("d", outerArc)
		.style("fill", function(d) {return outerColor(d.data.spreadType);});

	// Add label within segment
	g.append("text")
		.attr("transform", function(d) {return "translate(" +innerArc.centroid(d)+ ")";})
		.attr("dy", ".35em")
		.style("text-anchor", "middle")
		.text(function(d) {return d.data.spreadType;});

	g.append("text")
		.attr("transform", function(d) {return "translate(" +outerArc.centroid(d)+ ")";})
		.attr("dy", ".35em")
		.style("text-anchor", "middle")
		.text(function(d) {return d.data.spreadType;});


});