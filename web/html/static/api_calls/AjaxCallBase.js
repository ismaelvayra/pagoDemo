function HTTPOperation(inUrl, inParams, inReqType, inAsyncReq, inDataType, inCallBackFunction, inCallBackErrFunction) {
	/*
	Esta clase representa una llamada ajax general. En base a los campos
	del parametro request, se compondra la llamada ajax correspondiente.

	Request es un json contentente los valores para la  Se compone
	de esta manera:
	{
		url: url de la request,
		params: parametros para la llamada,
		reqType: tipo de request (POST, GET, DELETE),
		asyncReq: valor booleano de la llamada al api,
		dataType: tipo de dato enviado (json, text),
		callBackFunction: funcion donde se requiere que se devuelva el callback,
		callBackErrFunction: funcion donde se mandara el callback en caso de error;
	}
	*/


	// Variables privadas de la clase
	var url = inUrl;
	var params = inParams;
	var reqType = inReqType;
	var asyncReq = inAsyncReq;
	var dataType = inDataType;
	var callBackFunction = inCallBackFunction;
	var callBackErrFunction = inCallBackErrFunction;

	// Get de las variables privdas
	this.getUrl = function() {
		return url;
	}

	this.getParams = function() {
		return params;
	}

	this.getReqType = function() {
		return reqType;
	}

	this.getIsAsync = function() {
		return asyncReq;
	}

	this.getDataType = function() {
		return dataType;
	}

	// Manda la request con los parametros del objeto
	this.sendAjaxRequest = function() {
		$.ajax({
			url: url,
			type: reqType,
			data: params,
			async: asyncReq,
			type: reqType,
			dataType: dataType,
			jsonpCallback: "resp",
			success: function(data) {
				if(callBackFunction != null) {
					callBackFunction(data.datos);
				} 
			},
			error: function(e) {
				if(callBackErrFunction != null) {
					callBackErrFunction(e);
				}
			}
		});
	}
}