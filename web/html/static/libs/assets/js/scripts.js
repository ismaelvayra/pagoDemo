//---------------------------------------------------
//		STATUS NOTIFICATION FUNCTIONS
//---------------------------------------------------
$( document ).ready(function (){

	$("#left").click(function() {
		$('#notification-unplugged').addClass("notification-current");
		$('#notification-plugged').removeClass("notification-current");
		$('#notification-reading').removeClass("notification-current");
	});
});

$( document ).ready(function (){

	$("#middle").click(function() {
		$('#notification-plugged').addClass("notification-current");
		$('#notification-unplugged').removeClass("notification-current");
		$('#notification-reading').removeClass("notification-current");
	});
});

$( document ).ready(function (){

	$("#right").click(function() {
		$('#notification-reading').addClass("notification-current");
		$('#notification-plugged').removeClass("notification-current");
		$('#notification-unplugged').removeClass("notification-current");
	});
});

//---------------------------------------------------
//		SALES MODE SWITCHER
//---------------------------------------------------
$( document ).ready(function (){
	$("#sale-simple").click(function() {
		$('#sale-simple-container').removeClass("mipago-hidden");
		$('#sale-grid-container').addClass("mipago-hidden");
		$('#sale-simple').addClass("sale-mode-active");
		$('#sale-grid').removeClass("sale-mode-active");
	});
});

$( document ).ready(function (){
	$("#sale-grid").click(function() {
		$('#sale-grid-container').removeClass("mipago-hidden");
		$('#sale-simple-container').addClass("mipago-hidden");
		$('#sale-simple').removeClass("sale-mode-active");
		$('#sale-grid').addClass("sale-mode-active");
	});
});

//---------------------------------------------------
//		INPUT FIELDS BODY ADAPTATION
//---------------------------------------------------

//name field
$( document ).ready(function (){
	$('#login-name-input').focus(function() {
		var pos = $('#login-name-input').position();
		$('body,html').css("top", "-" + pos.top - 10 + "px" );
	});
});
$( document ).ready(function (){
	$('#login-name-input').focusout(function() {
		$('body,html').css("top", "0px" );
	});
});

//password field
$( document ).ready(function (){
	$('#login-password-input').focus(function() {
		var pos = $('#login-password-input').position();
		$('body,html').css("top", "-" + pos.top - 10 + "px" );
	});
});
$( document ).ready(function (){
	$('#login-password-input').focusout(function() {
		$('body,html').css("top", "0px" );
	});
});

//price field
$( document ).ready(function (){
	$('#sale-price').focus(function() {
		$('body,html').css("top", "-220px" );
		$(".upper-fixed").addClass("mipago-hidden");
	});
});
$( document ).ready(function (){
	$('#sale-price').focusout(function() {
		$('body,html').css("top", "0px" );
		$(".upper-fixed").removeClass("mipago-hidden");
	});
});

//price field
$( document ).ready(function (){
	$('#sale-description').focus(function() {
		$('body,html').css("top", "-290px" );
		$(".upper-fixed").addClass("mipago-hidden");
	});
});
$( document ).ready(function (){
	$('#sale-description').focusout(function() {
		$('body,html').css("top", "0px" );
		$(".upper-fixed").removeClass("mipago-hidden");
	});
});







