
/* To identify current page type*/
const landingPage = "landing-page";
const resumePage = "resume-page";
const programmingList = "programming-list";
const musicList = "music-list";
const programmingItem = "programming-item";
const musicItem = "music-item";
var currentPageType = landingPage;

var enableButton = true;

// Animation timing
const fadeOutTime = 120;
const fadeInTime = 350;


$(document).ready(function(){			

	programmingListResize();

	$( window ).resize(function(){
		//console.log("WIDTH = " + $(window).width()); 

		if($(window).width() < 840){
			document.getElementById("back-button").innerHTML = '<span><b>✕</b></span>';
		}else{
			document.getElementById("back-button").innerHTML = '<span>BACK | <b>✕</b></span>';
		}


		programmingListResize();

		/*$('.programming-cards-container').height( ($(window).height()) * 0.65 );

		$('.programming-cards-container').width((($(window).height()) * 1.2));

		$('.programming-card').height(($('.programming-cards-container').height()) * 0.5 );

		$('.programming-card').width($('.programming-card').height());*/


		/*// 0.8 = programming cards 3x2 break point (0.83)
		var screenRatio = ( ($(window).height()) /  ($(window).width()));
		//console.log("RATIO: " + screenRatio);

		// 1.4 = real vertical
		if(screenRatio > 1.4){
			// Vertical 2x3

			console.log("1.4 - " + screenRatio);
			$('.programming-cards-container').height( ($(window).width()) * 1 );
			$('.programming-cards-container').width((($(window).width()) * 0.8));
			$('.programming-card').height(($('.programming-cards-container').width()) * 0.45 );
			$('.programming-card').width($('.programming-card').height());
		}
		else if(screenRatio > 1.04){
			// Vertical 2x3

			console.log("1.04 - " + screenRatio);
			$('.programming-cards-container').height( ($(window).width()) * 0.8 );
			$('.programming-cards-container').width((($(window).width()) * 0.72));
			$('.programming-card').height(($('.programming-cards-container').width()) * 0.38 );
			$('.programming-card').width($('.programming-card').height());
		}
		else if(screenRatio > 0.8){
			// Square
			console.log("0.8 - " + screenRatio);
			$('.programming-cards-container').height( ($(window).height()) * 0.5 );
			$('.programming-cards-container').width((($(window).height()) * 1.1));
			$('.programming-card').height(($('.programming-cards-container').height()) * 0.5 );
			$('.programming-card').width($('.programming-card').height());
		}else{
			// < 0.8
			// Horizontal 3x2
			console.log("less than 0.8 - " + screenRatio);
			$('.programming-cards-container').height( ($(window).height()) * 0.65 );
			$('.programming-cards-container').width((($(window).height()) * 1.2));
			$('.programming-card').height(($('.programming-cards-container').height()) * 0.5 );
			$('.programming-card').width($('.programming-card').height());
		}*/
	});

	$(".slick").slick({
		infinite: true,
		speed: 0,
		fade: true,
		arrows: false,
		cssEase: 'ease-out'
	});
	
	$('#title').text("");
	$('#back-button').hide();
	$('.custom-slick-prev').hide();
	$('.custom-slick-next').hide();

	//$('.programming-cards-container').height();
/*	$('.programming-cards-container').height( ($(window).height()) * 0.5 );
	$('.programming-cards-container').width((($(window).height()) * 0.8));
	$('.programming-card').height($('.programming-cards-container').height() * 0.3);
	$('.programming-card').width($('.programming-card').height());*/

	programmingListResize();

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
			src: $(this).attr('toggle-target'),
			type: 'inline'
		}
		],

		callbacks: {
			beforeOpen: function() {
				console.log('Start of popup initialization');

		    	//$('.programming-flexslider-toggle').attr('toggle-target');
		    	console.log("HEH = " + $(self).attr('toggle-target'));

		    	$($(self).attr('toggle-target')).flexslider({
		    		startAt: 0, 
		    		directionNav : false,
		    		slideshow: false,
		    		animation:"fade",
		    		animationSpeed: 300,
		    		controlNav: false
		    	});

		    	$($(self).attr('toggle-target') + '-prev').on('click', function(){
		    		console.log("SLIDE PLEASE");
		    		$($(self).attr('toggle-target')).flexslider("previous");
		    	});  
		    	$($(self).attr('toggle-target') + '-next').on('click', function(){
		    		console.log("SLIDE PLEASE");
		    		$($(self).attr('toggle-target')).flexslider("next");
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
				$($('.programming-flexslider-toggle').attr('toggle-target')).flexslider("destroy");
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

    // BACK BUTTON
    $('.back-button-extended-area').on("click",function(){
    	console.log("BACK BUTTON | X");
    	if(currentPageType == programmingList || currentPageType == resumePage || currentPageType == musicList){
    		switchPage(landingPage);
    	}
    	else if(currentPageType == programmingItem){
    		switchPage(programmingList);
    	}
    	else if(currentPageType == musicItem){
    		switchPage(musicList);
    	}
	});

    $("#programming-button").on("click",function(){
    	console.log("Programming");
    	switchPage("programming-list");
	});

	$("#resume-button").on("click",function(){
    	console.log("Resume");
    	switchPage("resume-page");
    });

    $("#music-button").on("click",function(){
    	//this = $(self)
    	console.log("Music");
    	switchPage("music-list");
    	
    });

    $(".programming-card").on("click",function(){

    	console.log("Programming Card");
    	console.log("index = " + $(this).attr('target-index'));
    	switchPage("programming-item", $(this).attr('target-index'));

    	
	});

    $(".music-card").on("click",function(){
    	console.log("Music Card");
    	console.log("index = " + $(this).attr('target-index'));
    	switchPage("music-item", $(this).attr('target-index'))
	});

    $('.custom-slick-prev').click(function(){
    	console.log("PREV");
    	prevNextButton("prev");
    })

    $('.custom-slick-next').click(function(){
    	console.log("NEXT");
    	prevNextButton("next");
    })

	/* ==================== KEEP FOR STUDY PURPOSE ==================== */
	/*	$('.slick').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		console.log($(slick.$slides.get(currentSlide)).attr('page-type'));
		$('#title').text($(slick.$slides.get(nextSlide)).attr('top-title'));

	});*/
});



function switchPage(pageType, pageIndex){

	console.log("target index = " + pageIndex);

	if(currentPageType != pageType){
		$('#title').stop();
		$('#back-button').stop();
		$('.slick').stop();

		$('.custom-slick-prev').animate({opacity:'0'}, fadeOutTime);
		$('.custom-slick-next').animate({opacity:'0'}, fadeOutTime);
		$('#title').animate({opacity:'0'}, fadeOutTime);
		$('#back-button').animate({opacity:'0', display:'none'}, fadeOutTime);
		$('.slick').animate({opacity:'0'}, fadeOutTime, 'swing', function(){
			$('#back-button').hide();
			// Re-filter .slick
			$('.slick').slick('slickUnfilter');
	    	$('.slick').slick('slickFilter', "[page-type= '" + pageType +"']");
	    	$('.slick').slick('slickGoTo', pageIndex, false);

	    	if(pageType == programmingList){
	    		console.log("PRO LIST RESET");
	    		programmingListResize();
	    	}

	    	$('.slick').animate({opacity:'1'}, fadeInTime, 'swing');

	    	// Show navigation buttons (PREV & NEXT) only in programmingItem/musicItem pages
	    	if(currentPageType == programmingItem || currentPageType == musicItem){
	    		$('.custom-slick-prev').show();
				$('.custom-slick-next').show();
	    		$('.custom-slick-prev').animate({opacity:'1'}, fadeInTime);
				$('.custom-slick-next').animate({opacity:'1'}, fadeInTime);
	    	}
	    	else{
	    		$('.custom-slick-prev').hide();
				$('.custom-slick-next').hide();
	    	}

	    	// Change top title
	    	var currentIndex = $(".slick").slick("slickCurrentSlide");
			var $slides = $(".slick").slick("getSlick").$slides;
			var topTitle = $slides.eq( currentIndex ).attr('top-title');
			$('#title').text(topTitle);
	    	$('#title').animate({opacity:'1'}, fadeInTime, 'swing');

	    	// Show back button as long as use is not in landing page
	    	if(currentPageType != landingPage){
	    		$('#back-button').show();
	    		$('#back-button').animate({opacity:'1'}, fadeInTime);
	    	}
	    });
	    currentPageType = pageType;
	}

	/*if(currentPageType == programmingItem || currentPageType == musicItem){
		$('.custom-slick-prev').animate({opacity:'0'}, 80, 'swing', function(){
			$('.custom-slick-prev')
	}else{
		$('.custom-slick-prev').hide();
	}*/
}

function prevNextButton(direction){
	$('#title').stop();
	$('#back-button').stop();
	$('.slick').stop();
	
	$('#title').animate({opacity:'0'}, fadeOutTime);
	$('#back-button').animate({opacity:'0'}, fadeOutTime);
	$('.slick').animate({opacity:'0'}, fadeOutTime, 'swing', function(){

		if(direction == "prev"){
    		$('.slick').slick('prev');
    	}
    	else if (direction == "next"){
    		$('.slick').slick('next');
    	}
    	else{
    		console.log("something wrong with prevNextButton()");
    	}

    	$('.slick').animate({opacity:'1'}, fadeInTime, 'swing');

    	// Change top title
    	var currentIndex = $(".slick").slick("slickCurrentSlide");
		var $slides = $(".slick").slick("getSlick").$slides;
		var topTitle = $slides.eq( currentIndex ).attr('top-title');
		$('#title').text(topTitle);
    	$('#title').animate({opacity:'1'}, fadeInTime, 'swing');

    	$('#back-button').animate({opacity:'1'}, fadeInTime);
    });
}


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

function programmingListResize(){
		var screenRatio = ( ($(window).height()) /  ($(window).width()));

		// 1.4 = real vertical
		if(screenRatio > 1.4){
			// Vertical 2x3
			//console.log("1.4 - " + screenRatio);
			$('.programming-cards-container').height( ($(window).width()) * 1 );
			$('.programming-cards-container').width((($(window).width()) * 0.8));
			$('.programming-card').height(($('.programming-cards-container').height()) * 0.34 );
			$('.programming-card').width($('.programming-card').height());
		}
		else if(screenRatio > 1.04){
			// Vertical 2x3
			//console.log("1.04 - " + screenRatio);
			$('.programming-cards-container').height( ($(window).width()) * 0.8 );
			$('.programming-cards-container').width((($(window).width()) * 0.72));
			$('.programming-card').height(($('.programming-cards-container').height()) * 0.34 );
			$('.programming-card').width($('.programming-card').height());
		}
		else if(screenRatio > 0.8){
			// Square
			//console.log("0.8 - " + screenRatio);
			$('.programming-cards-container').height( ($(window).height()) * 0.5 );
			$('.programming-cards-container').width((($(window).height()) * 1.1));
			$('.programming-card').height(($('.programming-cards-container').height()) * 0.5 );
			$('.programming-card').width($('.programming-card').height());
		}else{
			// < 0.8
			// Horizontal 3x2
			//console.log("less than 0.8 - " + screenRatio);
			$('.programming-cards-container').height( ($(window).height()) * 0.65 );
			$('.programming-cards-container').width((($(window).height()) * 1.2));
			$('.programming-card').height(($('.programming-cards-container').height()) * 0.5 );
			$('.programming-card').width($('.programming-card').height());
		}
}