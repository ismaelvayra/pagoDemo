//---------------------------------------------------
//		STATUS NOTIFICATION FUNCTIONS
//---------------------------------------------------
$( document ).ready(function (){
	delayTime = 100;

	leftFunction = function() {
		$(".notification-status-text").find("p").css("color", "#D54A43");
		$(".notification-status-text").find("p").text("El dispositivo no esta conectado");
		$('#notification-unplugged').addClass("notification-current-base notification-current-red");
		$('#notification-plugged').removeClass("notification-current-base notification-current-red notification-current-green");
		$('#notification-reading').removeClass("notification-current-base");
	};

	middleFunction = function() {
		if(($('#sale-price').val() !== "") && ($('#sale-description').val() !== "")){
			$(".notification-status-text").find("p").css("color", "rgb(86, 200, 176)");
			$(".notification-status-text").find("p").text("Dispositivo pronto para realizar lectura de tarjeta");			
			$('#notification-plugged').removeClass("notification-current-red");
			$('#notification-plugged').addClass("notification-current-base notification-current-green");
			$('#notification-unplugged').removeClass("notification-current-base");
			$('#notification-reading').removeClass("notification-current-base");
		}
		else{
			$(".notification-status-text").find("p").css("color", "#D54A43");
			$(".notification-status-text").find("p").text("Los campos monto y concepto no se han completado correctamente");			
			$('#notification-plugged').removeClass("notification-current-green");
			$('#notification-plugged').addClass("notification-current-base notification-current-red");
			$('#notification-unplugged').removeClass("notification-current-base");
			$('#notification-reading').removeClass("notification-current-base");			
		}

	};

	rightFunction = function() {
		$(".notification-status-text").find("p").css("color", "rgb(86, 200, 176)");
		$(".notification-status-text").find("p").text("Realizando lectura...");
		$('#notification-reading').addClass("notification-current-base notification-current-green");
		$('#notification-plugged').removeClass("notification-current-base notification-current-red notification-current-green");
		$('#notification-unplugged').removeClass("notification-current-base");
	};

	$("#left").click(function() {
		leftFunction();
	});

	$("#middle").click(function() {
		middleFunction();
	});
	$("#sale-price").keydown(function() {
		middleFunction();
	});
	$("#sale-description").keydown(function() {
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
		setTimeout(function() {
			$('body,html').css("top", "0px" );
		}, delayTime);
	});

//password field
	$('#login-password-input').focus(function() {
		var pos = $('#login-password-input').position();
		$('body,html').css("top", "-" + pos.top - 10 + "px" );
	});

	$('#login-password-input').focusout(function() {
		setTimeout(function() {
			$('body,html').css("top", "0px" );
		}, delayTime);
	});

//price field
	$('#sale-price').focus(function() {
		$('body,html').css("top", "-220px" );
		$(".upper-fixed").addClass("mipago-hidden");
	});

	$('#sale-price').focusout(function() {
		setTimeout(function() {
			$('body,html').css("top", "0px" );
			$(".upper-fixed").removeClass("mipago-hidden");
		}, delayTime);
	});

//price field
	$('#sale-description').focus(function() {
		setTimeout(function() {
			$('body,html').css("top", "-290px" );
			$(".upper-fixed").addClass("mipago-hidden");
		}, delayTime);
	});

	$('#sale-description').focusout(function() {
		setTimeout(function() {
			$('body,html').css("top", "0px" );
			$(".upper-fixed").removeClass("mipago-hidden");
		}, delayTime);
	});

//---------------------------------------------------
//		LOGIN HANDLING
//---------------------------------------------------
	var loginSuccess = function (loginResponse) {
		var user = loginResponse.data.username;
		window.location.href = "/menu?user=" + user;
	};

	var loginFailed = function (loginResponse) {
		alert("caca!");
	};

	$("#login-button").click(function() {
		var user = $('#login-name-input').val();
		if(user !== "") {
			var login_request = new GetUserRequest({username:user}, loginSuccess, loginFailed);
			login_request.sendAjaxRequest();
		}
	});


});


//---------------------------------------------------
//		MISCELANEOUS
//---------------------------------------------------
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function startSaleMode(){
	if (getParameterByName("mode") === "manual"){
		$("#sale-simple").trigger("click");
	}
	else{
		$("#sale-grid").trigger("click");
	}
}





