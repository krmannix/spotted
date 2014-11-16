var constants = require('./view-constants');

function NoGeoView() {
	this.view = this.createView();
}

NoGeoView.prototype.createView = function() {
	var v = Ti.UI.createView({
		width: constants.deviceWidth,
		height: constants.noGeoHeight,
		top: constants.bannerHeightWithBuffer,
		backgroundColor: constants.secondaryColor
	});

	var l = Ti.UI.createLabel({
		text: constants.noGeoText,
		top: constants.noGeoTextTop,
		width: constants.noGeoTextWidth,
		font: {fontFamily: 'Helvetica', fontSize: 25},
		color: constants.primaryColor
	});
}