
$(document).ready(function(){
    

	//window.PLOTLYENV = window.PLOTLYENV || {};
	//window.PLOTLYENV.BASE_URL = "https://plot.ly";
	//Plotly.newPlot("cd52e831-399a-403d-9bb2-0c56214b1d38", [{"type": "pie", "values": [4500, 2500, 1053, 500], "labels": ["Oxygen", "Hydrogen", "Carbon_Dioxide", "Nitrogen"]}], {}, {"linkText": "Export to plot.ly", "showLink": true})
	$(".flippable").click(function(){
		$(this).toggleClass("flipme");
	});

	var tags_pie_chart = $("#tags_pie_chart");
	var easy = Number(tags_pie_chart.attr("data-easy"));
	var good = Number(tags_pie_chart.attr("data-good"));
	var fail = Number(tags_pie_chart.attr("data-fail"));
	var total = easy + good + fail;
	easy = Math.round((easy * 100)/total);
	good = Math.round((good * 100)/total);
	fail = Math.round((fail * 100)/total);

	var data = [{
	  values: [easy, good, fail],
	  labels: ['EASY', 'GOOD', 'FAIL'],
	  type: 'pie'
	}];

	var layout = {
	  height: 400,
	  width: 500
	};

	Plotly.newPlot('tags_pie_chart', data, layout);
});
