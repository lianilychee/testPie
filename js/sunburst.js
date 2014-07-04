$(document).ready(function () {
        
    var dataset = {
    		  1: [1, 2],
    		  2: [3, 4],
    		  3: [5, 6]};

    		var width = 460,
    		    height = 300,
    		    cwidth = 50;

    		var color = d3.scale.category20();

    		var pie = d3.layout.pie()
    		    .sort(null);

    		var arc = d3.svg.arc();

    		var svg = d3.select("body").append("svg")
    		    .attr("width", width)
    		    .attr("height", height)
    		    .append("g")
    		    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    		var gs = svg.selectAll("g").data(d3.values(dataset)).enter().append("g");
    		
    		var path = gs.selectAll("path")
    		    .data(function(d) { return pie(d); })
    		  .enter().append("path")
    		    .attr("fill", function(d, i) { return color(i); })
    		    .attr("d", function(d, i, j) { return arc.innerRadius(10+cwidth*j).outerRadius(cwidth*(j+1))(d); });
    
    
    
    /*
    var color = d3.scale.ordinal()
    	.range(["#5DA5DA", "#FAA43A"]);
    var inner = 40, outer = 120, threshold = 80;
    	
    var dataset = [{"id": "1", "RT": 2, "Fav": 2},
                   {"id": "2", "RT": 4, "Fav": 4},
                   {"id": "3", "RT": 6, "Fav": 6}];
    
    
    
    var arcRt = d3.svg.arc()
        .innerRadius(inner)
        .outerRadius(threshold)
        .startAngle(0)
        .endAngle(1.5*Math.PI);
    
    var arcFav = d3.svg.arc()
	    .innerRadius(threshold)
	    .outerRadius(outer)
	    .startAngle(1.5*Math.PI)
	    .endAngle(2*Math.PI);

        
    vis.append("path")
        .attr("d",arcRt)
        .attr("d",arcFav)
        .attr("transform", "translate(300,200)"); */
});