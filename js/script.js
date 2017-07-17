$(document).ready(function(){			
	$(".slick").slick({
		infinite: true,
		speed: 200,
		fade: true,
		arrows: false,
		cssEase: 'ease-out'
	});



	$(".slickGallery").slick({
		infinite: true,
		speed: 200,
		fade: true,
		arrows: true,
		cssEase: 'ease-out'
	});


	$("#demo").hide();

	$('.image-link').magnificPopup({
		type:'image',
		// Delay in milliseconds before popup is removed
		removalDelay: 300,

		// Class that is added to popup wrapper and background
		// make it unique to apply your CSS animations just to this exact popup
		mainClass: 'mfp-fade'
	});



/*	$('.ajax-popup-link').magnificPopup({
		type: 'ajax',
		// Delay in milliseconds before popup is removed
		removalDelay: 300,

		// Class that is added to popup wrapper and background
		// make it unique to apply your CSS animations just to this exact popup
		mainClass: 'mfp-fade'
	});
	*/



/*	$('#VideoGameGallery').magnificPopup({

		// Delay in milliseconds before popup is removed
		removalDelay: 100,

		// Class that is added to popup wrapper and background
		// make it unique to apply your CSS animations just to this exact popup
		mainClass: 'mfp-fade',
		navigateByImgClick: false,

		items: [
		{
			src: '#slickGallery',
			type: 'inline'
		}
	    ],

	    callbacks: {
	    	open: function() {
	    		$('.slick').animate({opacity:'0'}, 0);
		    },
	    	close: function(){
	    		$('.slick').animate({opacity:'1'}, 50);
	    	}
	    }
	});*/
	
	$('.programming-flexslider-toggle').each(function(){
		var self = this;
		$(this).magnificPopup({

		// Delay in milliseconds before popup is removed
		removalDelay: 100,

		// Class that is added to popup wrapper and background
		// make it unique to apply your CSS animations just to this exact popup
		mainClass: 'mfp-fade',
		navigateByImgClick: false,

		items: [
		{
			src: $(this).attr('toggleTarget'),
			type: 'inline'
		}
		],

		callbacks: {
			beforeOpen: function() {
				console.log('Start of popup initialization');

		    	//$('.programming-flexslider-toggle').attr('toggleTarget');
		    	console.log("HEH = " + $(self).attr('toggleTarget'));

		    	$($(self).attr('toggleTarget')).flexslider({
		    		startAt: 0, 
		    		directionNav : false,
		    		slideshow: false,
		    		animation:"fade",
		    		animationSpeed: 300,
		    		controlNav: false
		    	});

		    	$($(self).attr('toggleTarget') + '-prev').on('click', function(){
		    		console.log("SLIDE PLEASE");
		    		$($(self).attr('toggleTarget')).flexslider("previous");
		    	});  
		    	$($(self).attr('toggleTarget') + '-next').on('click', function(){
		    		console.log("SLIDE PLEASE");
		    		$($(self).attr('toggleTarget')).flexslider("next");
		    	});


		    	/*$('.programming-1-flexslider').flexslider({
					startAt: 0, 
					directionNav : false,
			    	slideshow: false,
					animation:"fade",
					animationSpeed: 300,
					controlNav: false
				});*/
			},
			open: function() {
				$('.slick').animate({opacity:'0'}, 150);
				$('#demo-prev').animate({opacity:'0'}, 150);
				$('#demo-next').animate({opacity:'0'}, 150);

			},
			close: function(){
				console.log("DESTROY");
				$($('.programming-flexslider-toggle').attr('toggleTarget')).flexslider("destroy");
	    		//$('body').height(50+'px'); 
	    		$('.slick').animate({opacity:'1'}, 150);
	    		$('#demo-prev').animate({opacity:'1'}, 150);
	    		$('#demo-next').animate({opacity:'1'}, 150);

	    		/*console.log("POST HEIGHT = " + $('.slick').height() );*/
	    		//$('.flexslider').flexslider(0);
	    	}
	    }
	})
	});

	// $('.programming-flexslider-toggle').magnificPopup({

	// });




	/*$('.programming-1-flexslider').flexslider({
		startAt: 0, 
		directionNav : false,
    	slideshow: false,
		animation:"fade",
		animationSpeed: 300,
		controlNav: false
	});*/

/*	$('#programming-1-flexslider-prev').on('click', function(){
		console.log("SLIDE PLEASE");
        $('.programming-1-flexslider').flexslider("previous");
    });  
    $('#programming-1-flexslider-next').on('click', function(){
		console.log("SLIDE PLEASE");
        $('.programming-1-flexslider').flexslider("next");
    });  */

/*	$('.flexslider').on('click', function () {
		$(this).siblings('.slides').children('li').children('a.flex-next').trigger('click');
	});*/

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

	/*$('.slick').on('afterChange', function(event, slick, currentSlide, nextSlide){
		console.log($(slick.$slides.get(currentSlide)).attr('type'));
	});
	*/
	/* Change title */
	$('.slick').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		console.log($(slick.$slides.get(currentSlide)).attr('type'));
		$('#title').text($(slick.$slides.get(nextSlide)).attr('top-title'));
	});
	

});

var previousExpandedDetailID = "";

function toggleDetail(id) {
	console.log("DETAIL");
	if(previousExpandedDetailID != id && previousExpandedDetailID != ""){
		console.log("PREVIOUS DETAIL");
		document.getElementById(previousExpandedDetailID+"-toggle").innerHTML = '<i class="fa fa-angle-right" aria-hidden="true"></i>' + " " + document.getElementById(previousExpandedDetailID+"-toggle").getAttribute("value");
		document.getElementById(previousExpandedDetailID).style.height = '0px';
		previousExpandedDetailID = id;
	}


	if (document.getElementById(id).style.height == '0px') {
    	//document.getElementById(id+"-toggle").innerHTML = document.getElementById(id+"-toggle").getAttribute("value") + " " + '<i class="fa fa-caret-down" aria-hidden="true"></i>';
    	document.getElementById(id+"-toggle").innerHTML = '<i class="fa fa-angle-down" aria-hidden="true"></i>' + " " + document.getElementById(id+"-toggle").getAttribute("value");
    	document.getElementById(id).style.height = '75px';
    	previousExpandedDetailID = id;
    	console.log("OFFSET = " + document.getElementById(id).offsetHeight);

    }
    else {
        //document.getElementById(id+"-toggle").innerHTML = document.getElementById(id+"-toggle").getAttribute("value") + " " + '<i class="fa fa-caret-right" aria-hidden="true"></i>';
        document.getElementById(id+"-toggle").innerHTML = '<i class="fa fa-angle-right" aria-hidden="true"></i>' + " " + document.getElementById(id+"-toggle").getAttribute("value");
        document.getElementById(id).style.height = '0px';
        previousExpandedDetailID = id;
        console.log("OFFSET = " + document.getElementById(id).offsetHeight);
    }
}
