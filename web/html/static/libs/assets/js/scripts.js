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