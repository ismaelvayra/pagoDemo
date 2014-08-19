/*
Objetos que haran las llamadas asyncronicas (o no) a las api. Ya estan hechas las llamadas,
de modo que se semplifica el proceso.
*/
culoClass.prototype = new HTTPOperation;
var baseParameters = function() {
	return {
		url: "",
		dataType: "jsonp",
		params: {},
		asyncReq: true,
		contentType: "application/json; charset=utf-8",
	}
}

// function getUser(param, callBackSuccess, callBackError) {
// 	/*
// 	Devuelve un usuario en base al parametro que se le paso
// 	*/
// 	var request = $.extend({}, baseParameters(), {
// 		id: param,
// 		url: "http://localhost:9000/get_users",
// 		reqType: "GET",
// 		callBackFunction: callBackSuccess,
// 		callBackErrFunction: callBackError,
// 	});
// 	HTTPOperation.call(this, request);
// }
function culoClass(paramt, callBackSuccess, callBackError) {
	/*
	Devuelve un usuario en base al parametro que se le paso
	*/
	
	var request = $.extend({}, baseParameters(), {
		param: paramt,
		url: "http://localhost:9000/papein",
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
		request.callBackError
	);
}

// function getUsers(paramList) {
// 	var datos = {'list': paramList};
// }

// function getTransaction(param) {
// 	var datos = {'id': param};
// }

// function getTransactions(paramList) {
// 	var datos = {'list': param};
// }



/*
####################################################################
Herencia de las clases
*/

// getUser.prototype = new HTTPOperation;
// getUsers.prototype = new HTTPOperation;
// getTransaction.prototype = new HTTPOperation;
// getTransactions.prototype = new HTTPOperation;
