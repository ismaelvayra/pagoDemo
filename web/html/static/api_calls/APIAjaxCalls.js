/*
Objetos que haran las llamadas asyncronicas (o no) a las api. Ya estan hechas las llamadas,
de modo que se semplifica el proceso.
*/

var data_url = "http://enzoalberdi.zapto.org:9000/";
var web_url = "http://enzoalberdi.zapto.org:9999/";

var baseParameters = function() {
	return {
		url: "",
		dataType: "jsonp",
		params: {},
		asyncReq: true,
		contentType: "application/json; charset=utf-8",
	}
}

function GetUserRequest(paramt, callBackSuccess, callBackError) {
	
	var request = $.extend({}, baseParameters(), {
		param: paramt,
		url: data_url + "api/user/get",
		reqType: "GET",
		callBackFunction: callBackSuccess,
		callBackErrFunction: callBackError,
	});

	HTTPOperation.call(
		this,
		request.url,
		request.param, 
		request.reqType,
		request.asyncReq,
		request.dataType,
		request.callBackFunction,
		request.callBackErrFunction
	);
}

function AddUserRequest(paramt, callBackSuccess, callBackError) {
	
	var request = $.extend({}, baseParameters(), {
		param: paramt,
		url: data_url + "api/user/add",
		reqType: "GET",
		callBackFunction: callBackSuccess,
		callBackErrFunction: callBackError,
	});

	HTTPOperation.call(
		this,
		request.url,
		request.param, 
		request.reqType,
		request.asyncReq,
		request.dataType,
		request.callBackFunction,
		request.callBackErrFunction
	);
}

function EditUserRequest(paramt, callBackSuccess, callBackError) {
	
	var request = $.extend({}, baseParameters(), {
		param: paramt,
		url: data_url + "api/user/edit",
		reqType: "GET",
		callBackFunction: callBackSuccess,
		callBackErrFunction: callBackError,
	});

	HTTPOperation.call(
		this,
		request.url,
		request.param, 
		request.reqType,
		request.asyncReq,
		request.dataType,
		request.callBackFunction,
		request.callBackErrFunction
	);
}

function DeleteUserRequest(paramt, callBackSuccess, callBackError) {

	var request = $.extend({}, baseParameters(), {
		param: paramt,
		url: data_url + "api/user/delete",
		reqType: "GET",
		callBackFunction: callBackSuccess,
		callBackErrFunction: callBackError,
	});

	HTTPOperation.call(
		this,
		request.url,
		request.param, 
		request.reqType,
		request.asyncReq,
		request.dataType,
		request.callBackFunction,
		request.callBackErrFunction
	);
}

/*
####################################################################
Herencia de las clases
*/

GetUserRequest.prototype = new HTTPOperation;
AddUserRequest.prototype = new HTTPOperation;
EditUserRequest.prototype = new HTTPOperation;
DeleteUserRequest.prototype = new HTTPOperation;
