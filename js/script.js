/* To identify current page type and prevent typo */
const landingPage = "landing-page";
const resumePage = "resume-page";
const programmingList = "programming-list";
const musicList = "music-list";
const programmingItem = "programming-item";
const musicItem = "music-item";
var currentPageType = landingPage;

// Animation timing
const fadeOutTime = 220;
const fadeInTime = 400;

// To set resume expandable detail's height, will change accroding to page width
var resumeDetailExpandHeight = 74;

/* Initialize some items, called on page load */
function init(){

	// Initialize the main slick which holds most of the site's content
	$(".slick").slick({
		infinite: true,
		speed: 0,
		fade: true,
		arrows: false,
		cssEase: 'ease-out',
		swipe: false
	});

	// Removes hover effect if touch is enabled
	var touch = 'ontouchstart' in document.documentElement
            || navigator.maxTouchPoints > 0
            || navigator.msMaxTouchPoints > 0;

	if (touch) { // remove all :hover stylesheets
	    try { // prevent exception on browsers not supporting DOM styleSheets properly
	        for (var si in document.styleSheets) {
	            var styleSheet = document.styleSheets[si];
	            if (!styleSheet.rules) continue;

	            for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
	                if (!styleSheet.rules[ri].selectorText) continue;

	                if (styleSheet.rules[ri].selectorText.match(':hover')) {
	                    styleSheet.deleteRule(ri);
	                }
	            }
	        }
	    } catch (ex) {}
	}

	// Set text according to screen size
	if($(window).width() < 840){
		document.getElementById("back-button").innerHTML = '<span><b>✕</b></span>';
		document.getElementById("programming-button").innerHTML = 'PROGM';
	}else{
		document.getElementById("back-button").innerHTML = '<span>BACK | <b>✕</b></span>';
		document.getElementById("programming-button").innerHTML = 'PROGRAMMING';
	}

	if($(window).width() < 768){
		resumeDetailExpandHeight = 60;
	}else{
		resumeDetailExpandHeight = 74;
	}

	// Initialize title and buttons
	$('#title').text("");
	$('#back-button').css( "display", "none" );
	$('#demo-prev').hide();
	$('#demo-next').hide();

	reInitTrack(false);
	refreshMidiTrackList();

	// Fade out initial white screen
	setTimeout(function(){
		$('#initial-screen').hide(1500);
	}, 300);

	// Change things according to screen size
	$(window).on('resize', _.debounce(function() {
	    console.log("Debouncing");
	    $('#volume-slider').val(audio.volume * 100).change();
		$('#seek-slider').rangeslider('update', true);

		if($(window).width() < 840){
			document.getElementById("back-button").innerHTML = '<span><b>✕</b></span>';
			document.getElementById("programming-button").innerHTML = 'PRGMG';
		}else{
			document.getElementById("back-button").innerHTML = '<span>BACK | <b>✕</b></span>';
			document.getElementById("programming-button").innerHTML = 'PROGRAMMING';
		}

		if($(window).width() < 768){
			resumeDetailExpandHeight = 60;
		}else{
			resumeDetailExpandHeight = 74;
		}
	}, 100));



	/*
		======================================================================
			Page Navigation
		======================================================================
	*/

	/* The lightbox image gallery that can be found in PROGRAMMING and DRUM, toggle via clicking the image of the demo page */
	$('.flexslider-toggle').each(function(){
		var self = this;
		$(this).magnificPopup({

			// Delay in milliseconds before popup is removed
			removalDelay: fadeOutTime,

			// Class that is added to popup wrapper and background
			// make it unique to apply your CSS animations just to this exact popup
			mainClass: 'mfp-fade',
			navigateByImgClick: false,
			closeBtnInside: false,

			items: [
			{
				src: $(this).attr('toggle-target'),
				type: 'inline'
			}
			],

			callbacks: {
				beforeOpen: function() {

			    	//console.log("Opening - " + $(self).attr('toggle-target'));
			    	$($(self).attr('toggle-target')).flexslider({
			    		startAt: 0, 
			    		directionNav : false,
			    		slideshow: false,
			    		animation:"fade",
			    		animationSpeed: 500,
			    		controlNav: false
			    	});

			    	$($(self).attr('toggle-target') + '-prev').on('click', function(){
			    		//console.log("SLIDE");
			    		$($(self).attr('toggle-target')).flexslider("previous");
			    	});  
			    	$($(self).attr('toggle-target') + '-next').on('click', function(){
			    		//console.log("SLIDE");
			    		$($(self).attr('toggle-target')).flexslider("next");
			    	});
				},
				open: function() {
					$('.slick').animate({opacity:'0'}, fadeOutTime);
					$('#demo-prev').animate({opacity:'0'}, fadeOutTime);
					$('#demo-next').animate({opacity:'0'}, fadeOutTime);
				},
				close: function(){
					// Unbind navigation button
					$($(self).attr('toggle-target') + '-prev').off('click');
					$($(self).attr('toggle-target') + '-next').off('click');

					// Remove instance
					$($(self).attr('toggle-target')).removeData('flexslider');

		    		$('.slick').animate({opacity:'1'}, fadeOutTime);
		    		$('#demo-prev').animate({opacity:'1'}, fadeOutTime);
		    		$('#demo-next').animate({opacity:'1'}, fadeOutTime);
		    	}
		    }
		})
	});

	// Button: BACK | X
	$('#back-button-container').on("click",function(){
		//console.log("#back-button-container - BACK BUTTON | X");
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

	// Button: Bottom - PROGRAMMING
	$("#programming-button").on("click",function(){
		switchPage("programming-list");
	});

	// Button: Bottom - RESUME
	$("#resume-button").on("click",function(){
		switchPage("resume-page");
	});

	// Button: Bottom - MUSIC
	$("#music-button").on("click",function(){
		switchPage("music-list");
	});

	$(".programming-card").on("click",function(){
		//console.log("index = " + $(this).attr('target-index'));
		switchPage("programming-item", $(this).attr('target-index'));
	});

	$(".music-card").on("click",function(){
		//console.log("index = " + $(this).attr('target-index'));
		switchPage("music-item", $(this).attr('target-index'))
	});

	$('#demo-prev').click(function(){
		//console.log("PREV");
		// Stop midi player when user move to the other slide
		if(currentPageType == musicItem && (audio.paused == false)){
			stopAudio();
		}
		prevNextButton("prev");

	})

	$('#demo-next').click(function(){
		//console.log("NEXT");
		// Stop midi player when user move to the other slide
		if(currentPageType == musicItem && (audio.paused == false)){
			stopAudio();
		}
		prevNextButton("next");
	})



	/*
		======================================================================
			MIDI Player
		======================================================================
	*/

	audio.addEventListener("timeupdate", function(){seekTimeUpdate();});
	audio.addEventListener("ended", function(){switchTrack("next");})

	/* Midi playlist's song button */
	$('.midi-track-button').click(function(){

		/* To solve a problem where the audio volume would suddenly turned into 0 */
		if(audio.volume == 0){
			//console.log("audio = " + audio.volume);
			audio.volume = 0.8;
			$('#volume-slider').val(audio.volume * 100).change();
		}

		var thisTarget = $(this).attr('track-id');
		currentPlaylistIndex = thisTarget;
		reInitTrack(true);
		refreshMidiTrackList();
	});

	/* MIDI player seeker */
	$('#seek-slider').rangeslider({
		polyfill:false,
		onInit:function(){
			seeking = false;
			//$('.header .pull-right').text($('input[type="range"]').val()+'K');
		},
		onSlide:function(position, value){
			$('#midi-current-time').text(secondToString(audio.duration * (value/100)));
			//console.log('SEEK - position: ' + position, 'value: ' + value);
			
			//$('.header .pull-right').text(value+'K');
		},
		onSlideEnd:function(position, value){
			//console.log('onSlideEnd');
			//console.log("DURATION - " + audio.duration);
			//console.log('SEEK - position: ' + position, 'value: ' + value);
			seeking = false;
			audio.currentTime = audio.duration * (value/100);
		}
	});

	/* MIDI player volume changer. Doesn't work in mobile */
	$('#volume-slider').rangeslider({
		polyfill:false,
		onInit:function(){
			audio.volume = 0.8;
		},
		onSlide:function(position, value){
			//console.log('onSlide');
			//console.log('VOL - position: ' + position, 'value: ' + value);
			audio.volume = value / 100;
			//$('.header .pull-right').text(value+'K');
			
		},
		onSlideEnd:function(position, value){
			//console.log('onSlideEnd');
			//console.log('VOL - position: ' + position, 'value: ' + value);
			audio.volume = value / 100;
		}
	});


	/* MIDI Button: << PREV */
	$('#midi-prev-button').click(function(){
		if(audio.currentTime > 2){
			audio.currentTime = 0;
		}
		else{
			//console.log("PREV TRACK");
			switchTrack("prev");
			refreshMidiTrackList();
		}
	})

	/* MIDI Button: >> NEXT */
	$('#midi-next-button').click(function(){
		//console.log("NEXT TRACK");
		switchTrack("next");
		refreshMidiTrackList();
	})


	// For other browser
	document.getElementById('seek-slider-container').addEventListener("mousedown", function(){
		seeking = true;
	})

	document.getElementById('seek-slider-container').addEventListener("mouseup", function(){
		if(seeking == true){
			seeking = false;
		}
	})

	// For chrome
	document.getElementById('seek-slider-container').addEventListener("pointerdown", function() {
		seeking = true;
	}, false)

	document.getElementById('seek-slider-container').addEventListener("pointerup", function() {
		if(seeking == true){seeking = false;}
	}, false)

	// Mobile
	document.getElementById('seek-slider-container').addEventListener("touchstart", function() {
		seeking = true;
	})

	document.getElementById('seek-slider-container').addEventListener("touchend", function() {
		if(seeking == true){seeking = false;}
	})


	/* MIDI Button: > Play */
	$('#midi-play-button').click(function(){
		//console.log("MIDI PLAY");
		if(audio.volume == 0){
			audio.volume = 0.8;
			$('#volume-slider').val(audio.volume * 100).change();
		}
		if(audio.paused){
			audio.play();
			$('#midi-play-button').html('<i class="fa fa-pause" aria-hidden="true"></i>');
		}
		else{
			audio.pause();
			$('#midi-play-button').html('<i class="fa fa-play" aria-hidden="true"></i>');
		}
	})



	/*
		======================================================================
			GUITAR DEMO
		======================================================================

	*/

	/* For Music -> Guitar */
	$('.video-popup-toggle').each(function(){
		var self = this;
		$(this).magnificPopup({

		// Delay in milliseconds before popup is removed
			removalDelay: 100,

			// Class that is added to popup wrapper and background
			// make it unique to apply your CSS animations just to this exact popup
			mainClass: 'mfp-fade',
			navigateByImgClick: false,
			closeBtnInside: false,

			items: [
			{
				src: $('<div class="container d-flex align-items-center justify-content-center"> <iframe src="https://player.vimeo.com/video/' + $(self).attr('toggle-target') + '?autoplay=1&title=0&byline=0&portrait=0" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> </div>'),
				type: 'inline'
			}
			],

			callbacks: {

				beforeOpen: function() {
			    	//console.log("Opening = " + $(self).attr('toggle-target'));
				},
				open: function() {
					$('.slick').animate({opacity:'0'}, 150);
					$('#demo-prev').animate({opacity:'0'}, 150);
					$('#demo-next').animate({opacity:'0'}, 150);
				},
				close: function(){
		    		$('.slick').animate({opacity:'1'}, 150);
		    		$('#demo-prev').animate({opacity:'1'}, 150);
		    		$('#demo-next').animate({opacity:'1'}, 150);
		    	}
		    }
		})
	});
} // End init()


$(document).ready(function(){

	init();

	// Load background video for landing page
	if(!isMobileDevice()){
		var video = document.getElementById('background-video');
		var sourceMp4 = document.createElement('source');
		sourceMp4.setAttribute('src', 'video/grass-3.mp4');
		sourceMp4.setAttribute('type', 'video/mp4');
		sourceMp4.setAttribute('onerror', 'playerError()');

		video.appendChild(sourceMp4);
		video.play();

		// If somehow the video still can't be played
		if(video.paused === true){
			video.src = "";
			video.load();
			video.remove();
			playerError();
		}
	}
	else{
		backgroundAnimation();
	}


	/* ==================== KEEP FOR STUDY PURPOSE ==================== */
	/*	$('.slick').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		console.log($(slick.$slides.get(currentSlide)).attr('page-type'));
		$('#title').text($(slick.$slides.get(nextSlide)).attr('top-title'));

	});*/
});



/*
	======================================================================
		PAGE NAVIGATION
	======================================================================
*/

/* Handle page switching */
/* pageType is the target page type, currentPageType is the previous one */
function switchPage(pageType, pageIndex){

	//console.log("target index = " + pageIndex);

	if(currentPageType != pageType){
		// Stop current animation (eg. if the user switch pages rapidly and the previous animation is still going on)
		$('#title').stop();
		$('#back-button').stop();
		$('.slick').stop();

		$('#demo-prev').animate({opacity:'0'}, fadeOutTime);
		$('#demo-next').animate({opacity:'0'}, fadeOutTime);
		$('#title').animate({opacity:'0'}, fadeOutTime);
		$('.slick').animate({opacity:'0'}, fadeOutTime, 'swing', function(){

			// Re-filter .slick
			$('.slick').slick('slickUnfilter');
	    	$('.slick').slick('slickFilter', "[page-type= '" + pageType +"']");
	    	$('.slick').slick('slickGoTo', pageIndex, false);

	    	if(pageType == musicItem){
	    		//console.log("initializing midi scrollbar");
	    		$('#midi-tracklist-container-scroller').nanoScroller();
	    		reInitTrack(false);
	    		$('#volume-slider').rangeslider('update', true);
				$('#seek-slider').rangeslider('update', true);
	    	}

	    	$('.slick').animate({opacity:'1'}, fadeInTime, 'swing');

	    	// Show navigation buttons (PREV & NEXT) only in programmingItem/musicItem pages
	    	if(currentPageType == programmingItem || currentPageType == musicItem){
	    		$('#demo-prev').show();
				$('#demo-next').show();
	    		$('#demo-prev').animate({opacity:'1'}, fadeInTime);
				$('#demo-next').animate({opacity:'1'}, fadeInTime);
	    	}
	    	else{
	    		$('#demo-prev').hide();
				$('#demo-next').hide();
	    	}

	    	// Change top title
	    	var currentIndex = $(".slick").slick("slickCurrentSlide");
			var $slides = $(".slick").slick("getSlick").$slides;
			var topTitle = $slides.eq( currentIndex ).attr('top-title');
			$('#title').text(topTitle);
	    	$('#title').animate({opacity:'1'}, fadeInTime, 'swing');

	    });

		// Destroy nanoscroller plugin
		// Placed outside of animation because currentPageType and pageType will already be the same after animation delay
		if((currentPageType == musicItem || currentPageType == musicList) && (pageType != musicItem && pageType != musicList)){
			//console.log("Destroying nanoscroller");
			stopAudio();

			// Destroy after 300 miliseconds so that the user won't see it destroying before the slide faded out
			setTimeout(function(){
				$(".nano").nanoScroller({ destroy: true });
			}, 300);

		}

		if((currentPageType != landingPage) && (pageType == landingPage)){
    		//Back to landing page
    		$('#background-video-container').animate({opacity:'1'}, fadeInTime, 'swing');
    		changeTextColor();
    		$('#back-button').animate({opacity:'0'}, fadeInTime);
    		$('#back-button').hide(fadeInTime);
    	}
    	else if((currentPageType == landingPage) && (pageType != landingPage)){
    		// From landing page to somewhere else
    		$('#background-video-container').animate({opacity:'0'}, fadeInTime, 'swing');
    		changeTextColor();
    		$('#back-button').show(fadeInTime);
			$('#back-button').animate({opacity:'1'}, fadeInTime);
    	}

	    currentPageType = pageType;
	}
}

/* Change buttons font color to black when user navigate from landing page to other page */
function changeTextColor(){
	$('#navigation-bottom button').toggleClass('black');
	$("#navigation-bottom .row .bottom-vertical-divider").toggleClass('black');
}

/* PREV/NEXT button in programming-item and music-item page */
function prevNextButton(direction){
	$('#title').stop();
	$('.slick').stop();
	$('#title').animate({opacity:'0'}, fadeOutTime);
	$('.slick').animate({opacity:'0'}, fadeOutTime, 'swing', function(){

		if(direction == "prev"){
    		$('.slick').slick('prev');
    	}
    	else if (direction == "next"){
    		$('.slick').slick('next');
    	}

    	$('.slick').animate({opacity:'1'}, fadeInTime, 'swing');

    	// Change top title
    	var currentIndex = $(".slick").slick("slickCurrentSlide");
		var $slides = $(".slick").slick("getSlick").$slides;
		var topTitle = $slides.eq( currentIndex ).attr('top-title');
		$('#title').text(topTitle);
    	$('#title').animate({opacity:'1'}, fadeInTime, 'swing');
    });
}


/*
	======================================================================
		RESUME DETAIL
	======================================================================
*/

var previousExpandedDetailID = "";

function toggleDetail(id) {
	if(previousExpandedDetailID != id && previousExpandedDetailID != ""){
		//console.log("PREVIOUS DETAIL");
		document.getElementById(previousExpandedDetailID+"-toggle").innerHTML = '<i class="fa fa-angle-right" aria-hidden="true"></i>' + " " + document.getElementById(previousExpandedDetailID+"-toggle").getAttribute("value");
		document.getElementById(previousExpandedDetailID).style.height = '0px';
		previousExpandedDetailID = id;
	}

	if (document.getElementById(id).style.height == '0px') {
    	document.getElementById(id+"-toggle").innerHTML = '<i class="fa fa-angle-down" aria-hidden="true"></i>' + " " + document.getElementById(id+"-toggle").getAttribute("value");
    	document.getElementById(id).style.height = resumeDetailExpandHeight + 'px';
    	previousExpandedDetailID = id;
    }
    else {
        document.getElementById(id+"-toggle").innerHTML = '<i class="fa fa-angle-right" aria-hidden="true"></i>' + " " + document.getElementById(id+"-toggle").getAttribute("value");
        document.getElementById(id).style.height = '0px';
        previousExpandedDetailID = id;
    }
}


/*
	======================================================================
		MIDI PLAYER CONTROL
	======================================================================
*/

// Default extension = mp3
var extension = ".mp3";
var agent = navigator.userAgent.toLowerCase();


//Rumor said that firefox & opera won't support mp3, but mp3 seem to work fine for my firefox browser. still haven't tested on Opera though 
if(agent.indexOf('opera') != -1){
	//console.log("using .ogg");
	extension = ".ogg";
}

/* File name of the tracks */
var playlist = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"];

/* Track title */
var trackTitle = ["Welcome Back", "Night Season", "Air Forest", "Bar Fight", 
"Punk", "Sherd Master", "Gear Up", "RAWR", "Panic", "Insomnia", "See Ya"];

/* Track compose date */
var trackDate = ["September 4, 2015", "March 5th, 2017", "April 15, 2010", "December 4, 2012", "May 19, 2015",
 "Unknown", "Febuary 29, 2016", "September 27, 2014", "January 27, 2012", "July 17, 2015", "October 3, 2012"];

/* Track description */
var trackDescription = [
"Welcome back, you did great.", 
"This is an ongoing draft that I've been working on since March of 2017.", 
"Instrumental solo part of one of my oldest piece.", 
"Hold my beer.", 
" ", 
"When I first started learning guitar, this is what I imagined how being a guitar sherd master would feel like.", 
" ", 
" ", 
" ", 
"Zzz", 
"Okay bye."];

var audio = new Audio();
var currentPlaylistIndex = 0;
var seeking = false; // Determine if user is pressing the player seeking bar

audio.src = 'audio/' + playlist[currentPlaylistIndex] + extension;
audio.controls = true;
audio.loop = false;
audio.autoplay = false;
audio.volume = 0.8;

function switchTrack(direction){
	if(direction == "next"){
		if(currentPlaylistIndex == playlist.length - 1){
			currentPlaylistIndex = 0
		}
		else{
			currentPlaylistIndex++;
		}
	}
	else{
		if(currentPlaylistIndex == 0){
			currentPlaylistIndex = playlist.length - 1
		}
		else{
			currentPlaylistIndex--;
		}
	}
	//console.log("SWITCH TO " + playlist[currentPlaylistIndex]);
	reInitTrack(true);
	audio.play();
	seekTimeUpdate();
	refreshMidiTrackList();
}

function seekTimeUpdate(){
	var time = (audio.currentTime / audio.duration) * 100;
	if(seeking === false){
		$('#seek-slider').val(time).change();
		$('#midi-current-time').text(secondToString(audio.currentTime));
	}else{
		//console.log("seeking = true");
	}

	// Re-print just in case if reInitTrack() failed to print at initialization
	$('#midi-end-time').text(secondToString(audio.duration));
}

function reInitTrack(autoPlay){
	audio.pause();
	audio.src = 'audio/' + playlist[currentPlaylistIndex] + extension;
	audio.play();

	if(autoPlay == false){
		// Play for 50miliseconds just to get audio duration
		window.setTimeout(function(){
			$('#midi-end-time').text(secondToString(audio.duration));
			audio.pause();
		}, 50);
		// Reset play time after getting audio duration
		audio.currentTime = 0;
		$('#midi-current-time').text(secondToString(audio.currentTime));
		$('#midi-play-button').html('<i class="fa fa-play" aria-hidden="true"></i>');
	}
	else{
		$('#midi-current-time').text(secondToString(audio.currentTime));
		$('#midi-end-time').text(secondToString(audio.duration));
		$('#midi-play-button').html('<i class="fa fa-pause" aria-hidden="true"></i>');
	}


	$('#midi-title-text').html(trackTitle[currentPlaylistIndex]);
	$('#midi-date-text').text(trackDate[currentPlaylistIndex]);
	$('#midi-description-text').text(trackDescription[currentPlaylistIndex]);
}

/* Update playlist item's highlight */
function refreshMidiTrackList(){
	var playlistChildren = $('#midi-tracklist').children().toArray();

	for(var i = 0; i <= playlist.length - 1; i++){
		if($(playlistChildren[i]).attr('track-id') == currentPlaylistIndex){
			//console.log("EQUAL TO PLAYLIST = " +  i);
			//$(playlistChildren[i]).addClass('hovered');
			$(playlistChildren[i]).css("background-color", "rgba(143,195,31, 0.5)");

			$(playlistChildren[i]).hover(function(){
				$(this).css("background-color", "rgba(143,195,31, 0.5)");
			}, function(){
				$(this).css("background-color", "rgba(143,195,31, 0.5)");
			});
		}
		else{
			//console.log("NOT EQUAL = " + i);
			//$(playlistChildren[i]).removeClass('hovered');
			$(playlistChildren[i]).css("background-color", "rgba(143,195,31, 0.1)");
			$(playlistChildren[i]).hover(function(){
				$(this).css("background-color", "rgba(143,195,31, 0.5)");
				$(this).css("transition", "background-color 0s");
			}, function(){
				$(this).css("background-color", "rgba(143,195,31, 0.1)");
				$(this).css("transition", " background-color 0.15s ease-out");
			});
		}
	}
}

/* Convert second into MM:SS format */
function secondToString(input){
	var min = Math.floor(input / 60);
	var sec = Math.floor(input - min * 60);
	if(sec < 10){sec = "0" + sec;}

	return (min + " : " + sec);
}

/* Stop the audio and reset the current play time */
function stopAudio(){
	audio.pause();
	audio.currentTime = 0;
	$('#midi-play-button').html('<i class="fa fa-play" aria-hidden="true"></i>');
}

/*
	======================================================================
		BACKGROUND VIDEO /IMAGE
	======================================================================
*/

// Detect if the website is running on a mobile device
function isMobileDevice() {
	return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

// If somehow the video still can't be played
function playerError(){
	backgroundAnimation();
}

function backgroundAnimation(){
	// Substitute by moving the background around 
	$('#background-video-container').css("animation", "background-animationX 12s, background-animationY 8s");
	$('#background-video-container').css("animation-timing-function", "ease-in-out");
	$('#background-video-container').css("animation-iteration-count", "infinite");
}