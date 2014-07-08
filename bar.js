$(document).ready(function () {

	// Create data
	// Data has elements: id, rtCount

	var dataset = [];

	function getId() { return Math.floor(Math.random()*(20000-10000+1) + 10000); };
	function getCount() { return Math.floor(Math.random()*(50-1+1) + 1); };


	for (var i = 0; i < 10; i++) {
		dataset.push({"id": getId(), "count": getCount()});
	};

	console.log(dataset);

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


});