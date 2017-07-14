$(document).ready(function(){			
	$(".slick").slick({
		infinite: true,
		speed: 200,
		fade: true,
		arrows: false,
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



	$('.ajax-popup-link').magnificPopup({
		type: 'ajax',
		// Delay in milliseconds before popup is removed
		removalDelay: 300,

		// Class that is added to popup wrapper and background
		// make it unique to apply your CSS animations just to this exact popup
		mainClass: 'mfp-fade'
	});

	$('#VideoGameGallery').magnificPopup({

		// Delay in milliseconds before popup is removed
		removalDelay: 150,

		// Class that is added to popup wrapper and background
		// make it unique to apply your CSS animations just to this exact popup
		mainClass: 'mfp-fade',
		closeBtnInside:true,
		navigateByImgClick: false,

		items: [
		{
			src: 'images/VideoGameEngine01.jpg',
			title: 'DEMO 01'
		},
		{
			src: 'images/VideoGameEngine01.jpg',
			title: 'DEMO 02'
        },
        {
	        src: 'images/VideoGameEngine03.jpg',
			title: 'DEMO 03'
	    }
	    ],
	    gallery: {
	      enabled: true
	    },
	    type: 'image', // this is a default type


	});

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