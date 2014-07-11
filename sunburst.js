$(document).ready(function () {

	// Define raw data.  In meme-prop, this should just be piped in from prepData().
	var rawData = [{ "id": "1000", "rt": 1, "fav": 0 },
					{ "id": "2000", "rt": 0, "fav": 1 },
					{ "id": "3000", "rt": 0, "fav": 0 },
					{ "id": "4000", "rt": 1, "fav": 1 },
					{ "id": "5000", "rt": 1, "fav": 0 },
					{ "id": "6000", "rt": 1, "fav": 0 },
					{ "id": "7000", "rt": 0, "fav": 1 },
					{ "id": "8000", "rt": 0, "fav": 1 },
					{ "id": "9000", "rt": 1, "fav": 1 },
					{ "id": "10000", "rt": 1, "fav": 1 }];

	// Pull out necessary information from rawData.
	var countOverlap = 0, countNone = 0, countRt = 0, countFav = 0;
	var memeLength = rawData.length;

	for (var i = 0; i < memeLength; i++) {
		if (rawData[i].rt==1 && rawData[i].fav==1) { countOverlap++; };
		if (rawData[i].rt==0 && rawData[i].fav==0) { countNone++; };
		if (rawData[i].rt==1) { countRt++; };
		if (rawData[i].rt==0) { countFav++; };
	};

	var counts = {"memeLength": memeLength,
					"countNone": countNone,
					"countOverlap": countOverlap,
					"countRt": countRt,
					"countFav": countFav};
	//console.log(counts);

	var renderData = { "startRtArc": countNone, 
						"endRtArc": countNone+countRt,
						"startFavArc": countNone+countRt-countOverlap, 
						"endFavArc": countNone+countRt-countOverlap+countFav };
	//console.log(renderData);

	// Convert radians to linear based on tweets.
	var scale = d3.scale.linear().domain([0, memeLength]).range([0, 2*Math.PI]);

	// Select HTML defined SVG and set dimensions.
	var width = 600, height = 400;

	var vis = d3.select("#sunburst")
		.attr("width", width)
		.attr("height", height);

	// Draw arcs.
	var rtArc = d3.svg.arc()
		.innerRadius(50)
		.outerRadius(100)
		.startAngle(scale(renderData.startRtArc))
		.endAngle(scale(renderData.endRtArc));

	var favArc = d3.svg.arc()
		.innerRadius(75)
		.outerRadius(125)
		.startAngle(scale(renderData.startFavArc))
		.endAngle(scale(renderData.endFavArc));

	vis.append("path")
		.attr("d", rtArc)
		.attr("fill", "#5DA5DA")
		.attr("opacity", "0.75")
		.attr("transform", "translate(" +(width/2)+ "," +(height/2)+ ")");

	vis.append("path")
		.attr("d", favArc)
		.attr("fill", "#FAA43A")
		.attr("opacity", "0.55")
		.attr("transform", "translate(" +(width/2)+ "," +(height/2)+ ")");

	// Add text.
	var rtLabel = vis.append("svg:text")
		.attr("dx", width/2)
		.attr("dy", height/2)
		.attr("text-anchor", "middle")
		.attr("fill", "#5DA5DA")
		.text("RT'd: " + countRt);

	var favLabel = vis.append("svg:text")
		.attr("dx", width/2)
		.attr("dy", height/2 + 16) // line break hard-coded
		.attr("text-anchor", "middle")
		.attr("fill", "#FAA43A")
		.text("Fav'd: " + countFav);

});