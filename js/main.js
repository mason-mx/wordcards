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
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart);
});
