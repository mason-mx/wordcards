function drawChart() {
  var tags_pie_chart = $("#tags_pie_chart");
	var easy = Number(tags_pie_chart.attr("data-easy"));
	var good = Number(tags_pie_chart.attr("data-good"));
	var fail = Number(tags_pie_chart.attr("data-fail"));

  var data = google.visualization.arrayToDataTable([
    ['Tags', 'Words'],
    ['EASY',     easy],
    ['GOOD',      good],
    ['FAIL',  fail]
  ]);

  var options = {
    title: 'The Words Distributioin'
  };

  var chart = new google.visualization.PieChart(document.getElementById('tags_pie_chart'));

  chart.draw(data, options);
}

$(document).ready(function(){
  $(".flippable").click(function(){
		$(this).toggleClass("flipme");
	});

  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart);
/*
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

	Plotly.newPlot('tags_pie_chart', data, layout);*/
});
