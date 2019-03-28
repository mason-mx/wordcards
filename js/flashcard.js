$(document).ready(function(){
  $(".flippable").click(function(){
		$(this).toggleClass("flipme");
	});
  $(".btn-previous").click(function(){
    var next = $(this).closest(".control-container").siblings(".card-container").children(".next");
    if(next !== undefined && next !== null)
    {
      next.removeClass("next");
    }

    var current = $(this).closest(".control-container").siblings(".card-container").children(".current");

    var previous = current.prev();
    if(previous !== undefined && previous !== null && previous.length > 0)
    {
      if(previous == current)
      {
        console.log(previous);
      }
      current.removeClass("current").addClass("next");

      previous.removeClass("previous").addClass("current");
      previous = previous.prev();
      if(previous !== undefined && previous !== null)
      {
        previous.addClass("previous");
      }
    }
	});
  $(".btn-next").click(function(){
    var previous = $(this).closest(".control-container").siblings(".card-container").children(".previous");
    if(previous !== undefined && previous !== null)
    {
      previous.removeClass("previous");
    }

    var current = $(this).closest(".control-container").siblings(".card-container").children(".current");

    var next = current.next();
    if(next !== undefined && next !== null && next.length > 0)
    {
      current.removeClass("current").addClass("previous");

      next.removeClass("next").addClass("current");
      next = next.next();
      if(next !== undefined && next !== null)
      {
        next.addClass("next");
      }
    }
	});
});
