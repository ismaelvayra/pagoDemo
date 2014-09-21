//---------------------------------------------------
//		STATUS NOTIFICATION FUNCTIONS
//---------------------------------------------------
$( document ).ready(function (){
	delayTime = 100;
	colorRed = "rgb(86, 200, 176)";
	colorGreen = "#D54A43";

	leftFunction = function() {
		$(".notification-status-text").find("p").css("color", colorGreen);
		$(".notification-status-text").find("p").text("El dispositivo no esta conectado");
		$('#notification-unplugged').addClass("notification-current-base notification-current-red device-unplugged");
		$('#notification-plugged').removeClass("notification-current-base notification-current-red notification-current-green");
		$('#notification-reading').removeClass("notification-current-base");
	};

	middleFunction = function() {
		$('#notification-unplugged').removeClass("device-unplugged");
		if(($('#sale-price').val() !== "") && ($('#sale-description').val() !== "")){
			$(".notification-status-text").find("p").css("color", colorRed);
			$(".notification-status-text").find("p").text("Dispositivo pronto para realizar lectura de tarjeta");			
			$('#notification-plugged').removeClass("notification-current-red");
			$('#notification-plugged').addClass("notification-current-base notification-current-green");
			$('#notification-unplugged').removeClass("notification-current-base");
			$('#notification-reading').removeClass("notification-current-base");
		}
		else{
			$(".notification-status-text").find("p").css("color", colorGreen);
			$(".notification-status-text").find("p").text("Los campos monto y concepto deben ingresarse");			
			$('#notification-plugged').removeClass("notification-current-green");
			$('#notification-plugged').addClass("notification-current-base notification-current-red");
			$('#notification-unplugged').removeClass("notification-current-base");
			$('#notification-reading').removeClass("notification-current-base");			
		}

	};

	rightFunction = function() {
		if(($('#sale-price').val() !== "") && ($('#sale-description').val() !== "")){		
			$(".notification-status-text").find("p").css("color", colorRed);
			$(".notification-status-text").find("p").text("Realizando lectura");
			$('#notification-reading').addClass("notification-current-base notification-current-green");
			$('#notification-plugged').removeClass("notification-current-base notification-current-red notification-current-green");
			$('#notification-unplugged').removeClass("notification-current-base");
			
			//reading animation
			setTimeout(function() {
				$(".notification-status-text").find("p").text("Realizando lectura.");
			}, delayTime*3);
			setTimeout(function() {
				$(".notification-status-text").find("p").text("Realizando lectura..");
			}, delayTime*6);
			setTimeout(function() {
				$(".notification-status-text").find("p").text("Realizando lectura...");
			}, delayTime*9);
			setTimeout(function() {
				$(".notification-status-text").find("p").text("Realizando lectura....");
			}, delayTime*12);

			setTimeout(function() {
				$("#sale-confirmation").removeClass("mipago-hidden");
				$("#confirmation-content").removeClass("mipago-hidden");
				loadSaleData();
				$(".notification-status-text").find("p").text("");
			}, delayTime*15);
		}	
	};

	$("#left").click(function() {
		leftFunction();
	});

	$("#middle").click(function() {
		middleFunction();
	});
	$("#sale-price").keydown(function() {
		if ($('#notification-unplugged').hasClass("device-unplugged")){
		}
		else{
			middleFunction();
		}
	});
	$("#sale-description").keydown(function() {
		if ($('#notification-unplugged').hasClass("device-unplugged")){
		}
		else{
			middleFunction();
		}
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
		$('body').css("top", "-" + pos.top - 1 + "px" );
		$("#login-password-result").text("");
		$("#login-name-result").text("");		
	});

	$('#login-name-input').focusout(function() {
		setTimeout(function() {
			if($('#login-password-input').hasClass("inputActive")){
		
			}
			else{
				$('body').css("top", "0px" );		
			}
		}, delayTime);	
	});

//password field
	$('#login-password-input').focus(function() {
		$('#login-password-input').addClass("inputActive");
		if (($('body').position().top) !== 0){
			setTimeout(function() {
			var pos = $('#login-password-input').position();
				$('body').css("top", "-" + pos.top - 1 + "px" );
				$("#login-password-result").text("");
				$("#login-name-result").text("");
			}, delayTime + 100);
		}
		else{
			var pos = $('#login-password-input').position();
			$('body').css("top", "-" + pos.top - 1 + "px" );
			$("#login-password-result").text("");
			$("#login-name-result").text("");			
		}
	});

	$('#login-password-input').focusout(function() {
		$('#login-password-input').removeClass("inputActive");
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
		if ($('#login-password-input').val() === ""){
			$("#login-password-result").text("No has ingresado contraseña");
		}
		else{
			window.location.href = "/menu?user=" + user;
		}
	};

	var loginFailed = function (loginResponse) {
		$("#login-name-result").text("Nombre de usuario incorrecto");
		if ($('#login-password-input').val() === ""){
			$("#login-password-result").text("No has ingresado contraseña");
		}
	};

	$("#login-button").click(function() {
		var user = $('#login-name-input').val();
		if(user !== "") {
			var login_request = new GetUserRequest({username:user}, loginSuccess, loginFailed);
			login_request.sendAjaxRequest();
		}
	});
//---------------------------------------------------
//		SALE CONFIRMATION FUNCTIONS
//---------------------------------------------------
	$('#sale-fees > div > button').click(function() {
		$('#sale-fees > div >button').removeClass("button-active button-green");
		$(this).addClass("button-active button-green");
	});

	$('#sale-button-cancel').click(function() {
		$("#sale-confirmation").addClass("mipago-hidden");
		$("#confirmation-content").addClass("mipago-hidden");
		$('#sale-fees > div >button').removeClass("button-active button-green");
		middleFunction();		
	});	

	$('#sale-button-send').click(function() {
		$("#confirmation-content > h1").text("Venta completada");
		var fees_number = $(".button-active").attr("value");
		$("#sale-fees").remove();
		$("#sale-fees-title").remove();
		$("#sale-button-send").remove();
		$("#sale-button-cancel").remove();
		$("#confirmation-content" ).append( "<p id='transaction-id' style='margin-top:20px;'>ID de transacción :  1234-DC12</p>" );
		$("#confirmation-content" ).append( "<p id='transaction-fees'>Cuotas :  " + fees_number + "</p>" );
		$("#confirmation-content" ).append( "<button id='transaction-completed' class='btn btn-primary btn-lg input-button-size button-green'>Finalizar</p>" );
		$('#transaction-completed').click(function() {
			var name = getParameterByName("user");
			window.location.href = "/menu?user=" + name;
		});	
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
	var name = getParameterByName("user");
	$("#navbar-username").text(name);
	if (getParameterByName("mode") === "manual"){
		$("#sale-simple").trigger("click");
	}
	else{
		$("#sale-grid").trigger("click");
	}
}

function addUserToMenuHeader(){
	var name = getParameterByName("user");
	$("#navbar-username").text(name);
	$("#manual-mode-link").attr("href", "sales?mode=manual&user="+name);
	$("#grid-mode-link").attr("href", "sales?mode=grid&user="+name);
}

function loadSaleData(){
	$("#confirmation-sale-price").text("Precio :  $ " + $("#sale-price").val());
	$("#confirmation-sale-description").text("Descripción :  " + $("#sale-description").val());
}





