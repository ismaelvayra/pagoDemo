/*
Objetos que haran las llamadas asyncronicas (o no) a las api. Ya estan hechas las llamadas,
de modo que se semplifica el proceso.
*/

// var data_url = "http://enzoalberdi.zapto.org:9000/";
var web_url = "http://enzoalberdi.zapto.org:9999/";

var data_url = "http://192.168.0.117:9000/";
// var web_url = "http://localhost:9999/";

var baseParameters = function() {
	return {
		url: "",
		dataType: "jsonp",
		params: {},
		reqType: "GET",
		asyncReq: true,
		contentType: "application/json; charset=utf-8",
	}
}


// *************************** USERS CRUD ************************** \\

function GetUserRequest(paramt, callBackSuccess, callBackError) {
	
	var request = $.extend({}, baseParameters(), {
		param: paramt,
		url: data_url + "api/user/get",
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

function GetUsersRequest(paramt, callBackSuccess, callBackError) {
	
	var request = $.extend({}, baseParameters(), {
		param: paramt,
		url: data_url + "api/users",
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




// *************************** TRANSACTIONS CRUD ************************** \\

function GetTransactionRequest(paramt, callBackSuccess, callBackError) {
	var request = $.extend({}, baseParameters(), {
		param: paramt,
		url: data_url + "api/transaction/get",
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

function GetTransactionsRequest(paramt, callBackSuccess, callBackError) {
	
	var request = $.extend({}, baseParameters(), {
		param: paramt,
		url: data_url + "api/transactions",
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

function AddTransactionRequest(paramt, callBackSuccess, callBackError) {
	var request = $.extend({}, baseParameters(), {
		param: paramt,
		url: data_url + "api/transaction/add",
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

function DeleteTransactionRequest(paramt, callBackSuccess, callBackError) {
	var request = $.extend({}, baseParameters(), {
		param: paramt,
		url: data_url + "api/transaction/delete",
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
Classes inheritances
*/

// user
GetUserRequest.prototype = new HTTPOperation;
GetUsersRequest.prototype = new HTTPOperation;
AddUserRequest.prototype = new HTTPOperation;
EditUserRequest.prototype = new HTTPOperation;
DeleteUserRequest.prototype = new HTTPOperation;

// transaction
GetTransactionRequest.prototype = new HTTPOperation;
GetTransactionsRequest.prototype = new HTTPOperation;
AddTransactionRequest.prototype = new HTTPOperation;
DeleteTransactionRequest.prototype = new HTTPOperation;
