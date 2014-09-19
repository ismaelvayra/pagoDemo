//---------------------------------------------------
//		STATUS NOTIFICATION FUNCTIONS
//---------------------------------------------------
$( document ).ready(function (){

	leftFunction = function() {
		$('#notification-unplugged').addClass("notification-current");
		$('#notification-plugged').removeClass("notification-current");
		$('#notification-reading').removeClass("notification-current");
	}

	middleFunction = function() {
		$('#notification-plugged').addClass("notification-current");
		$('#notification-unplugged').removeClass("notification-current");
		$('#notification-reading').removeClass("notification-current");
	}

	rightFunction = function() {
		$('#notification-reading').addClass("notification-current");
		$('#notification-plugged').removeClass("notification-current");
		$('#notification-unplugged').removeClass("notification-current");
	}

	$("#left").click(function() {
		leftFunction();
	});


	$("#middle").click(function() {
		middleFunction();
	});


	$("#right").click(function() {
		rightFunction();
	});

//---------------------------------------------------
//		SALES MODE SWITCHER
//---------------------------------------------------
	$("#sale-simple").click(function() {
		$('#sale-simple-container').removeClass("mipago-hidden");
		$('#sale-grid-container').addClass("mipago-hidden");
		$('#sale-simple').addClass("sale-mode-active");
		$('#sale-grid').removeClass("sale-mode-active");
	});

	$("#sale-grid").click(function() {
		$('#sale-grid-container').removeClass("mipago-hidden");
		$('#sale-simple-container').addClass("mipago-hidden");
		$('#sale-simple').removeClass("sale-mode-active");
		$('#sale-grid').addClass("sale-mode-active");
	});

//---------------------------------------------------
//		INPUT FIELDS BODY ADAPTATION
//---------------------------------------------------

//name field

	$('#login-name-input').focus(function() {
		var pos = $('#login-name-input').position();
		$('body,html').css("top", "-" + pos.top - 10 + "px" );
	});

	$('#login-name-input').focusout(function() {
		$('body,html').css("top", "0px" );
	});

//password field
	$('#login-password-input').focus(function() {
		var pos = $('#login-password-input').position();
		$('body,html').css("top", "-" + pos.top - 10 + "px" );
	});

	$('#login-password-input').focusout(function() {
		$('body,html').css("top", "0px" );
	});

//price field
	$('#sale-price').focus(function() {
		$('body,html').css("top", "-220px" );
		$(".upper-fixed").addClass("mipago-hidden");
	});

	$('#sale-price').focusout(function() {
		$('body,html').css("top", "0px" );
		$(".upper-fixed").removeClass("mipago-hidden");
	});

//price field
	$('#sale-description').focus(function() {
		$('body,html').css("top", "-290px" );
		$(".upper-fixed").addClass("mipago-hidden");
	});

	$('#sale-description').focusout(function() {
		$('body,html').css("top", "0px" );
		$(".upper-fixed").removeClass("mipago-hidden");
	});
});







