var constants = require('./view-constants');

function NoGeoView() {
	this.view = this.createView();
}

NoGeoView.prototype.createView = function() {
	var v = Ti.UI.createView({
		width: constants.deviceWidth,
		height: constants.noGeoHeight,
		top: constants.bannerHeightWithBuffer,
		backgroundColor: constants.secondaryColor,
		visible: false
	});

	var l = Ti.UI.createLabel({
		text: constants.noGeoText,
		top: constants.noGeoTextTop,
		width: constants.noGeoTextWidth,
		font: {fontFamily: 'Helvetica', fontSize: 20},
		color: constants.primaryColor,
		textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER
	});

	v.add(l);
	return v;
}

NoGeoView.prototype.getView = function() {
	return this.view;
}

module.exports = NoGeoView;