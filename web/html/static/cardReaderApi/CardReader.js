function CardReader(inDevicePlugInFunction, inDevicePlugOutFunction, inBeginReceiveFunction, inEndReceiveFunction, inDecodeFinishedFunction) {

	// Variables privadas de la clase
	var instance;
	var devicePlugInFunction = inDevicePlugInFunction;
	var devicePlugOutFunction = inDevicePlugOutFunction;
	var beginReceiveFunction = inBeginReceiveFunction;
	var endReceiveFunction = inEndReceiveFunction;
	var decodeFinishedFunction = inDecodeFinishedFunction;

	this.startReading = function () {
		JSCardReader.startReading();
	}

	this.stopReading = function () {
		JSCardReader.stopReading();
	}

	this.eventPlugIn = function (message) {
		devicePlugInFunction(message);
	}

	this.eventPlugOut = function (message) {
		devicePlugOutFunction(message);
	}

	this.eventBeginReceive = function () {
		beginReceiveFunction();
	}

	this.eventEndReceive = function () {
		endReceiveFunction();
	}

	this.eventDecodeFinish = function () {
		decodeFinishedFunction();
	}
}