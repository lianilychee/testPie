$(document).ready(function () {
		
	console.log("SUNBURST");

	var vis = d3.select("#sunburst");
	var width = 600, height = 400;

	var color = d3.scale.ordinal()
		.range(["#5DA5DA", "#FAA43A"]);

	var arc = d3.svg.arc()
		.innerRadius(0)
		.outerRadius(200);

	var pie = d3.layout.pie()
		.sort(null)
		.value(function(d) { return d.population; });

	var svg = d3.select("body").append("svg")
		.attr("width", width)
		.attr("height", height)
		.append("g")
		.attr("transform", "translate(" +width/2+ "," +height/2 + ")");

	/* DATA NOT IN CSV FORM */
	var dataset = [{"age": "< 5", "population": 2704659},
					{"age": "5-13", "population": 4499890}];

	console.log(dataset);

	  dataset.forEach(function(d) {
		d.population = +d.population;
	  });

	  var g = svg.selectAll(".arc")
		  .data(pie(dataset))
		.enter().append("g")
		  .attr("class", "arc");

	  g.append("path")
		  .attr("d", arc)
		  .style("fill", function(d) {return color(d.data.age);});

	  g.append("text")
		  .attr("transform", function(d) {return "translate(" +arc.centroid(d)+ ")";})
		  .attr("dy", ".35em")
		  .style("text-anchor", "middle")
		  .text(function(d) {return d.data.age;});

});
