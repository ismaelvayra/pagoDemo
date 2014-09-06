// function CardReader(devicePlugInFunction, devicePlugOutFunction, beginReceiveFunction, endReceiveFunction, decodeFinishedFunction ) {

function CardReader(devicePlugInFunction, devicePlugOutFunction, beginReceiveFunction, endReceiveFunction, decodeFinishedFunction) {

	this.startReading = function () {
		window.JSCardReader.startReading();
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

	this.eventDecodeFinish = function () {
		decodeFinishedFunction();
	}
}