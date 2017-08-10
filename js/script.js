
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
const fadeOutTime = 220;
const fadeInTime = 400;

/* MIDI PLAYER*/
var extension = ".mp3";
var agent = navigator.userAgent.toLowerCase();

/*
Rumor said that firefox won't support mp3, but mp3 seem to work fine for my firefox browser. 
still haven't tested on Opera though 
*/
if(agent.indexOf('firefox') != -1 || agent.indexOf('opera') != -1){
	console.log("using .ogg");
	extension = ".ogg";
}

var audio = new Audio();

/* File name of the songs*/
var playlist = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"];
var currentPlaylistIndex = 0;


var trackTitle = ["Welcome Back", "Night Season", "Air Forest", "Bar Fight", 
"Punk", "Sherd Master", "Gear Up", "RAWR", "Panic", "Insomnia", "Bai"];

var trackDate = ["September 4, 2015", "March 5th, 2017", "April 15, 2010", "December 4, 2012", "May 19, 2015",
 "Unknown", "Febuary 29, 2016", "September 27, 2014", "January 27, 2012", "July 17, 2015", "October 3, 2012"];


var trackDescription = [
"Welcome back, you did great.", 
"This is an ongoing draft that I've been working on since March of 2017.", 
"Instrumental solo part of one of my oldest piece.", 
"I wrote this piece with a comedic bar fight scene in mind.", 
"Heyo This is Track 05", 
"When I first learn guitar, I imagined this is how being a guitar sherd master would feel like.", 
"Now imagine a video game briefing or choose your weapon/equipment screen.", 
" ", 
" ", 
"Zzz", 
" "];

audio.src = 'audio/' + playlist[currentPlaylistIndex] + extension;
audio.controls = true;
audio.loop = false;
audio.autoplay = false;
audio.volume = 0.8;
audio.addEventListener("timeupdate", function(){seekTimeUpdate();});
audio.addEventListener("ended", function(){switchTrack("next");})

var seeking = false;


//============


/*var videoInstance1 = new Vimeo.Player("guitar1");
var videoPlayer = videoInstance1;*/
/*var videoInstance2 = new Vimeo.Player("guitar2");
var videoInstance3 = new Vimeo.Player("guitar3");
var videoInstance4 = new Vimeo.Player("guitar4");*/

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
	//audio.src = 'audio/' + playlist[currentPlaylist][currentPlaylistIndex] + extension;
	console.log("SWITCH TO " + playlist[currentPlaylistIndex]);
	reInitTrack(true);

	audio.play();
	seekTimeUpdate();
	refreshMidiTrackList();
}

function seekTimeUpdate(){

	var time = (audio.currentTime / audio.duration) * 100;
	//console.log("update time, time = " + time + " | SEEKING = " + seeking);

	//console.log("seeking = " + seeking);

	if(seeking === false){
		$('#seek-slider').val(time).change();
		$('#midi-current-time').text(secondToString(audio.currentTime));
		console.log("seeking false - updating time");
	}else{
		console.log("seeking true - should stop updating");
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

/* Convert second into MM:SS format */
function secondToString(input){
	var min = Math.floor(input / 60);
	var sec = Math.floor(input - min * 60);

	if(sec < 10){sec = "0" + sec;}

	return (min + " : " + sec);
}


/* Initialize some items, called on page load */
function init(){


	$(".slick").slick({
		infinite: true,
		speed: 0,
		fade: true,
		arrows: false,
		cssEase: 'ease-out',
		swipe: false
	});

	if($(window).width() < 840){
		document.getElementById("back-button").innerHTML = '<span><b>✕</b></span>';
		document.getElementById("programming-button").innerHTML = 'PROGM';
	}else{
		document.getElementById("back-button").innerHTML = '<span>BACK | <b>✕</b></span>';
		document.getElementById("programming-button").innerHTML = 'PROGRAMMING';
	}
	$('#title').text("");
	$('#back-button').css( "display", "none" );
	$('#demo-prev').hide();
	$('#demo-next').hide();

	reInitTrack(false);
	refreshMidiTrackList();

	setTimeout(function(){
		$('#initial-screen').hide(1000);
		//$(".slick").css("opacity", '1');
	}, 300);

	var v = $('#background-video').get(0);
	v.play();

	/*$('#initial-screen').animate({}, 5500, 'swing', function(){
		$('#initial-screen').animate({opacity:'0'}, 1500, 'swing', function(){
			$('#initial-screen').hide();

		});
	});*/

}

/* Update playlist item's highlight */
function refreshMidiTrackList(){
	var playlistChildren = $('#midi-tracklist').children().toArray();

	for(var i = 0; i < playlist.length - 1; i++){
		if($(playlistChildren[i]).attr('track-id') == currentPlaylistIndex){
			console.log("EQUAL TO PLAYLIST = " +  i);
			$(playlistChildren[i]).addClass('hovered');
		}
		else{
			console.log("NOT EQUAL = " + i);
			$(playlistChildren[i]).removeClass('hovered');
		}
	}
}
/*
var videoInstance1 = new Vimeo.Player("guitar1");
var videoPlayer = videoInstance1;

function vimeoPlayer(command){
	if(command == "unload"){
		videoPlayer.unload();
	}
	if(command == "play"){
		videoPlayer.play();
	}
}*/

$(document).ready(function(){
	console.log("ON READY");
	/*var videoInstance1 = new Vimeo.Player("guitar1");
	var videoPlayer = videoInstance1;*/

  // Hide the div
  //$(".slick").hide();
  // Show the div after 5s
  //$(".slick").delay(5000).fadeIn(100); 

  	/*$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,

		fixedContentPos: false,
	});*/

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

		


	/*$('#debug-text').text($(window).width());*/




	/* Midi playlist's song button */
	$('.midi-track-button').click(function(){

		/* To solve a problem where the audio volume would suddenly turned into 0 */
		if(audio.volume == 0){
			console.log("audio = " + audio.volume);
			audio.volume = 0.8;
			$('#volume-slider').val(audio.volume * 100).change();
		}

		var thisTarget = $(this).attr('track-id');

		//console.log("currentPlaylistIndex " + currentPlaylistIndex);
		//console.log("target track-id = " + thisTarget);

		currentPlaylistIndex = thisTarget;
		reInitTrack(true);
		refreshMidiTrackList();

	});


	$(window).on('resize', _.debounce(function() {
	    console.log("Debouncing");
	    $('#volume-slider').val(audio.volume * 100).change();
		$('#seek-slider').rangeslider('update', true);

		//console.log("span position = " + $('.flexslider-text-container span').position().top);


		// Bootstrap smallest size
		if($(window).width() < 576){
			//var flexsliderImageHeight = $('.flexslider > ul > li > .flexslider-container > .row').height();
			//$('.flexslider-text-container span').css('top', '-' + flexsliderImageHeight + 'px');

		}else{
			
		}


		if($(window).width() < 840){
			document.getElementById("back-button").innerHTML = '<span><b>✕</b></span>';
		}else{
			document.getElementById("back-button").innerHTML = '<span>BACK | <b>✕</b></span>';
		}

		if($(window).width() < 840){
			document.getElementById("back-button").innerHTML = '<span><b>✕</b></span>';
			document.getElementById("programming-button").innerHTML = 'PRGMG';
		}else{
			document.getElementById("back-button").innerHTML = '<span>BACK | <b>✕</b></span>';
			document.getElementById("programming-button").innerHTML = 'PROGRAMMING';
		}
	}, 100));

	init();
	 //$('input[type="range"]').rangeslider();

	 /*var v = $('#background-video').get(0);
	 v.pause();

	if(v.paused === false){
		$('#debug-text2').text("PLAYING");
	}
	else{
		$('#debug-text2').text("NOT PLAYING");
	}*/

	 $(function(){
		$('#volume-slider').rangeslider({
			polyfill:false,
			onInit:function(){
				audio.volume = 0.8;
			},
			onSlide:function(position, value){
				//console.log('onSlide');
				console.log('VOL - position: ' + position, 'value: ' + value);
				audio.volume = value / 100;
				//$('.header .pull-right').text(value+'K');
				
			},
			onSlideEnd:function(position, value){
				//console.log('onSlideEnd');
				console.log('VOL - position: ' + position, 'value: ' + value);
				audio.volume = value / 100;

			}
		});

		$('#seek-slider').rangeslider({

			polyfill:false,
			onInit:function(){
				seeking = false;
				//console.log("SEEK");
				//$('.header .pull-right').text($('input[type="range"]').val()+'K');
			},
			onSlide:function(position, value){
				$('#midi-current-time').text(secondToString(audio.duration * (value/100)));
				//console.log('onSlide');
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

	});

	/* Handle MIDI player seek bar's behavior. Doesn't work on chrome */
	$(document)
	.on('mousedown', '.rangeslider', function(e) {
    	e.preventDefault();
    	console.log("ON MOUSDOWN");
    	if(this.id == "js-rangeslider-1"){
    		seeking = true;
    	}
    })
    .on('mouseup', function() {
    	if(seeking == true){
    		seeking = false;
    	}
    });
  
    $('#midi-prev-button').click(function(){
    	if(audio.currentTime > 2){
    		console.log("> 2");
    		audio.currentTime = 0;
    	}
    	else{
    		console.log("PREV TRACK");
    		switchTrack("prev");
    		refreshMidiTrackList();
    	}
    })
    $('#midi-next-button').click(function(){
    	console.log("NEXT TRACK");
    	switchTrack("next");
    	refreshMidiTrackList();

    })

	$('.programming-flexslider-toggle').each(function(){
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
				},
				open: function() {
					$('.slick').animate({opacity:'0'}, 150);
					$('#demo-prev').animate({opacity:'0'}, 150);
					$('#demo-next').animate({opacity:'0'}, 150);

					/*if($(window).width() < 576){
						var flexsliderImageHeight = $('.flexslider > ul > li > .flexslider-container > .row').height();
						$('.flexslider-text-container span').css('top', '-' + flexsliderImageHeight + 'px');
					}else{
						$('.flexslider-text-container span').css('top', '');
					}*/

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



	$('.guitar-popup-toggle').each(function(){
		var self = this;
		//var iframe = document.getElementById('video');
		// $f == Froogaloop
		//var player = $f(iframe);

		/*var targetId = $(self).attr('toggle-target');
		$videoId = $(targetId + " div").attr("id");
		console.log("VIDEO HEY = " + videoId);
		$videoPlayer = new Vimeo.Player($videoId);*/

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
					console.log('Start of popup initialization');
			    	//$('.programming-flexslider-toggle').attr('toggle-target');
			    	console.log("HEH = " + $(self).attr('toggle-target'));
				},
				open: function() {
					
					//player.api("play");
					

					/*var targetId = $(self).attr('toggle-target');
					var videoId = $(targetId + " div").attr("id");
					console.log("VIDEO HEY = " + videoId);*/
					//var videoPlayer = videoInstance1;

					//videoPlayer.play();

					/*videoPlayer.on('play', function(){
						console.log("playing video");
					});*/

					//vimeoPlayer("play");



					$('.slick').animate({opacity:'0'}, 150);
					$('#demo-prev').animate({opacity:'0'}, 150);
					$('#demo-next').animate({opacity:'0'}, 150);

					/*if($(window).width() < 576){
						var flexsliderImageHeight = $('.flexslider > ul > li > .flexslider-container > .row').height();
						$('.flexslider-text-container span').css('top', '-' + flexsliderImageHeight + 'px');
					}else{
						$('.flexslider-text-container span').css('top', '');
					}*/

				},
				close: function(){
					console.log("DESTROY");
					//$videoPlayer.unload(); 
					/*videoPlayer = videoInstance1;
					videoPlayer.unload();*/

					//vimeoPlayer("unload");

					//$($('.programming-flexslider-toggle').attr('toggle-target')).flexslider("destroy");
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

    // Button: BACK | X
    $('#back-button-container').on("click",function(){
    	console.log("#back-button-container --- BACK BUTTON | X");
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
    	console.log("Programming");
    	switchPage("programming-list");
    	//$(this).css("background-color", "rgba(143,195,31, 0.1)");
	});

    // Button: Bottom - RESUME
	$("#resume-button").on("click",function(){
    	console.log("Resume");
    	switchPage("resume-page");
    });

	// Button: Bottom - MUSIC
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

    $('#demo-prev').click(function(){
    	console.log("PREV");
    	prevNextButton("prev");
    })

    $('#demo-next').click(function(){
    	console.log("NEXT");
    	prevNextButton("next");
    })



	/* ==================== KEEP FOR STUDY PURPOSE ==================== */
	/*	$('.slick').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		console.log($(slick.$slides.get(currentSlide)).attr('page-type'));
		$('#title').text($(slick.$slides.get(nextSlide)).attr('top-title'));

	});*/
});



/* Handle page switching */
function switchPage(pageType, pageIndex){

	console.log("target index = " + pageIndex);

	/* pageType is the target page type, white currentPageType is the previous one */

	if(currentPageType != pageType){
		$('#title').stop();
		$('#back-button').stop();
		$('.slick').stop();

		$('#demo-prev').animate({opacity:'0'}, fadeOutTime);
		$('#demo-next').animate({opacity:'0'}, fadeOutTime);

		//if(pageType == landingPage){$('#back-button').animate({opacity:'0'}, fadeOutTime);}

		$('#title').animate({opacity:'0'}, fadeOutTime);
		//$('#back-button').animate({opacity:'0', display:'none'}, fadeOutTime);
		$('.slick').animate({opacity:'0'}, fadeOutTime, 'swing', function(){
			//$('#back-button').hide();
			// Re-filter .slick
			$('.slick').slick('slickUnfilter');
	    	$('.slick').slick('slickFilter', "[page-type= '" + pageType +"']");
	    	$('.slick').slick('slickGoTo', pageIndex, false);

	    	if(pageType == programmingList){
	    		console.log("PRO LIST RESET");
	    		//programmingListResize();
	    	}

	    	if(pageType == musicItem){
	    		console.log("MUSIC ITEM");
	    		//$('#midi-tracklist-container').nanoScroller();
	    		console.log("initializing midi scrollbar");
	    		$('#midi-tracklist-container-scroller').nanoScroller({

	    		});
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

	    	// Show back button as long as user is not in landing page
	    	if(currentPageType != landingPage){
	    		console.log("BACK = " + $('#back-button').css("display"));

	    		if ($('#back-button').css("display") === 'none') {
	    			console.log("SHOW BACK BUTTON");
					//$('#back-button').show(fadeInTime);
					//$('#back-button').animate({opacity:'1'}, fadeInTime);
				}
	    		//$('#back-button').show();
	    		//('#back-button').animate({opacity:'1'}, fadeInTime);
	    	}
	    	else{
	    		console.log("BACK = " +$('#back-button').css("display"));
	    		//$('#back-button').hide(fadeInTime);
	    		//var v = $('#background-video').get(0);
	    		//v.play();
	    		//changeTextColor("white");
	    	}

	    	if(pageType == landingPage){
	    		var v = $('#background-video').get(0);
	    		v.play();
	    	}

	    });
		/*console.log("currentPageType = " + currentPageType  + " | pageType: " + pageType);
		console.log("T = " + (currentPageType != "landing-page"));
		console.log("T = " + (pageType == "landing-page"));
		console.log("T = " + (currentPageType == "landing-page"));
		console.log("T = " + (pageType != "landing-page"));*/

		// Destroy nanoscroller plugin
		// Placed outside of animation because currentPageType and pageType will already be the same after animation delay
		if((currentPageType == musicItem || currentPageType == musicList) && (pageType != musicItem && pageType != musicList)){
			console.log("Destroying nanoscroller");

			audio.pause();
			audio.currentTime = 0;
			$('#midi-play-button').html('<i class="fa fa-play" aria-hidden="true"></i>');
			$(".nano").nanoScroller({ destroy: true });

		}

		if((currentPageType != landingPage) && (pageType == landingPage)){
    		//toggleClass
    		//Back to landing page
    		console.log("IF == ");
    		$('#back-button').hide(fadeInTime);
    		$('#background-video-container').animate({opacity:'1'}, fadeInTime, 'swing');
    		
    		changeTextColor();
    		//var v = $('#background-video').get(0);
    		//$('#background-video').get(0).play();
    		
    	}
    	else if((currentPageType == landingPage) && (pageType != landingPage)){
    		//toggle
    		// From landing page to somewhere else
    		console.log("ELSE == ");
    		$('#background-video-container').animate({opacity:'0'}, fadeInTime, 'swing');
    		changeTextColor();
    		$('#back-button').show(fadeInTime);
			$('#back-button').animate({opacity:'1'}, fadeInTime);
    	}

	    currentPageType = pageType;
	}

	/*if(currentPageType == programmingItem || currentPageType == musicItem){
		$('.custom-slick-prev').animate({opacity:'0'}, 80, 'swing', function(){
			$('.custom-slick-prev')
	}else{
		$('.custom-slick-prev').hide();
	}*/
}

function changeTextColor(){
	//if(color == "white"){
		console.log("CHANGING COLOR");
		$('#navigation-bottom button').toggleClass('black');
		$("#navigation-bottom .row .bottom-vertical-divider").toggleClass('black');
	//}
}

function prevNextButton(direction){
	$('#title').stop();
	//$('#back-button').stop();
	$('.slick').stop();
	
	$('#title').animate({opacity:'0'}, fadeOutTime);
	//$('#back-button').animate({opacity:'0'}, fadeOutTime);
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

    	//$('#back-button').animate({opacity:'1'}, fadeInTime);
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


/* MIDI PLAYER */



$('#midi-play-button').click(function(){
	console.log("MIDI PLAY");
	if(audio.volume == 0){
		console.log("audio = " + audio.volume);
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

$('#midi-prev-button').click(function(){
	console.log("MIDI PREV");
})

$('#midi-next-button').click(function(){
	console.log("MIDI NEXT");
})


/* load video after page load */
$(window).bind("load", function() {  

	if (WURFL.is_mobile === true && WURFL.form_factor === "Smartphone") {
	    // targetSmartPhoneDevices();
	    console.log("is mobile!!!!!!!!!!!!!!!!!");
	    $('#debug-text').text("THIS IS MOBILE");
	}
	else{
		$('#debug-text').text("NOT MOBILE");
		var video = document.getElementById('background-video');

		var sourceMp4 = document.createElement('source');
		var sourceWebm = document.createElement('source'); 
		var sourceOgv = document.createElement('source'); 
		sourceMp4.setAttribute('src', 'video/grass-35.mp4');
		sourceMp4.setAttribute('type', 'video/mp4');
		sourceWebm.setAttribute('src', 'video/grass-35.webm');
		sourceWebm.setAttribute('type', 'video/webm');
		sourceOgv.setAttribute('src', 'video/grass-35.ogv');
		sourceOgv.setAttribute('type', 'video/ogv');

		video.appendChild(sourceMp4);
		video.appendChild(sourceWebm);
		video.appendChild(sourceOgv);
		video.play();

		if(video.play == true){
			$('#debug-text2').text("PLAYING");
		}else{
			$('#debug-text2').text("NOT PLAYING");
		}

		//var v = $('#background-video').get(0);
		 //v.pause();

		if(video.paused === true){
			$('#video-credit').hide();
			$('#debug-text2').text("PAUSED REMOVING VIDEO");
			//video.children('source').prop('src', '');
			video.src = "";
			video.load();
			video.remove();

		}
		else{
			$('#debug-text2').text("PLAYING");
		}
	}

	
}); 