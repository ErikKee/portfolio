$(document).ready(function(){			
	$(".slick").slick({
		infinite: true,
		speed: 200,
		fade: true,
		arrows: false,
		cssEase: 'ease-out'
	});

	$("#demo").hide();



/*	$(window).resize(function() {
        $('#master-container .slick-slide').height($('#master-container').height())
        $('#master-container .slick-slide').width($('#master-container').width())
    });
    
    $('#master-container .slick-slide').height($('#master-container').height())
    $('#master-container .slick-slide').width($('#master-container').width())*/


	
	$("#programming-toggle").on("click",function(){
		console.log("Programming");
		//show programming section
		/*$("#demo").fadeOut(function(){
				$("#programming").fadeIn();
			});*/

			$("#programming").fadeIn();

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

		console.log("Video Game Card");

		$(".slick").slick('slickFilter', "[name!='programming-list']");

		/*$("#programming").fadeOut(function(){
			$("#demo").fadeIn();
		});*/
	});


	$('.custom-slick-prev').click(function(){
	  $('.slick').slick('slickPrev');
	  console.log("PREV");
	})

	$('.custom-slick-next').click(function(){
	  $('.slick').slick('next');
	  console.log("NEXT");
	})

});