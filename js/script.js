$(document).ready(function(){

	

	
	$("#project-toggle").on("click",function(){
		console.log("Project");
		//show projects section
		if($("#projects").is(':visible')){
			$("#projects").fadeOut();
		}else{
			//hide projects section if it is visible
			if($("#demo").is(':visible')){
				$("#demo").fadeOut(function(){
					$("#projects").fadeIn();
				})
			}else{
				$("#projects").fadeIn();
			}
		}
	});

	$(".video-game").on("click",function(){
		//fade list out
		$("#projects").fadeOut(function(){
			//fade demo in
			$("#demo").fadeIn();

			$(".slick").slick({
				infinite: true,
				speed: 500,
				fade: true,
				cssEase: 'linear'
			});
		});
	});

});