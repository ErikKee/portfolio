$(document).ready(function(){			
	$(".slick").slick({
		infinite: true,
		speed: 500,
		fade: true,
		cssEase: 'ease-out'
	});

	$("#demo").hide();

	
	$("#programming-toggle").on("click",function(){
		console.log("Programming");
		//show programming section
		$("#demo").fadeOut(function(){
				$("#programming").fadeIn();
			});

		/*
		if($("#programming").is(':visible')){
			$("#programming").fadeOut();
		}else{
			$("#demo").fadeOut(function(){
				$("#programming").fadeIn();
			});
		}
		*/
	});

	$(".video-game").on("click",function(){
		$("#programming").fadeOut(function(){
			$("#demo").fadeIn();
		});
	});

});