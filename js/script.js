$(document).ready(function(){			
	$(".slick").slick({
		infinite: true,
		speed: 500,
		fade: true,
		cssEase: 'linear'
	});

	$("#demo").hide();

	
	$("#project-toggle").on("click",function(){
		console.log("Project");
		//show projects section
		if($("#projects").is(':visible')){
			$("#projects").fadeOut();
		}else{
			$("#demo").fadeOut(function(){
				$("#projects").fadeIn();
			});
		}
	});

	$(".video-game").on("click",function(){
		$("#projects").fadeOut(function(){
			$("#demo").fadeIn();
		});
	});

});