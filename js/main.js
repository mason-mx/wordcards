
$(document).ready(function(){
	$("#easy-tag").css("content","22");
  $("#good-tag").css("content","0");
  $("#fail-tag").css("content","0");
	$(".flippable").click(function(){
		$(this).toggleClass("flipme");
	});
});
