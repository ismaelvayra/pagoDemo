function CardReader(inDevicePlugInFunction, inDevicePlugOutFunction, inBeginReceiveFunction, inEndReceiveFunction, inDecodeFinishedFunction, inTimeOutFunction) {

	// Variables privadas de la clase
	var instance;
	var devicePlugInFunction = inDevicePlugInFunction;
	var devicePlugOutFunction = inDevicePlugOutFunction;
	var beginReceiveFunction = inBeginReceiveFunction;
	var endReceiveFunction = inEndReceiveFunction;
	var decodeFinishedFunction = inDecodeFinishedFunction;
	var timeoutFunction = inTimeOutFunction;

	this.startReading = function () {
		JSCardReader.startReading();
	}

	this.stopReading = function () {
		JSCardReader.stopReading();
	}

	this.eventPlugIn = function () {
		devicePlugInFunction();
	}

	this.eventPlugOut = function () {
		devicePlugOutFunction();
	}

	this.eventBeginReceive = function () {
		beginReceiveFunction();
	}

	this.eventEndReceive = function () {
		endReceiveFunction();
	}

	this.eventDecodeFinish = function (message) {
		decodeFinishedFunction(message);
	}

	this.eventTimeOut = function () {
		timeoutFunction();
	}
}