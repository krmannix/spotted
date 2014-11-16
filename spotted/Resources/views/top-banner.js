var constants = require('./view-constants');
var customFont = 'Dosis';

function TopBanner() {
	this.photo_button = this.createPhotoButton();
	this.top_banner = this.createTopBanner();
}

TopBanner.prototype.createPhotoButton = function() {
	return Ti.UI.createImageView({
		image: 'images/camera.png',
		top: constants.bannerButtonTop,
		height: constants.bannerButtonHeight,
		width: constants.bannerButtonHeight,
		right: constants.bannerButtonSpaceFromSide
	});
}

TopBanner.prototype.createTopBanner = function() {
	var banner = Ti.UI.createView({
		height: constants.bannerHeightWithBuffer,
		width: constants.deviceWidth,
		backgroundColor: constants.primaryColor,
		top: 0
	});
	var border = Ti.UI.createView({
		height: constants.bannerBorderWidth,
		width: constants.deviceWidth,
		backgroundColor: constants.borderColor,
		top: banner.height
	});
	var title = Ti.UI.createLabel({
		top: banner.height/2 - 10,
		color: 'white',
		width: constants.deviceWidth,
		text: 'Spottd',
		textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
		font: {fontFamily: customFont, fontSize: 26}
	});
	var logo = Ti.UI.createImageView({
		image: 'images/temp_logo.png',
		top: constants.bannerButtonTop,
		height: constants.bannerButtonHeight,
		width: constants.bannerButtonHeight,
		left: constants.bannerButtonSpaceFromSide
	});
	banner.add(this.photo_button);
	banner.add(title);
	banner.add(logo);
	//banner.add(border);
	return banner;
}

TopBanner.prototype.getOptionsButton = function() {
	return this.options_button;
}

TopBanner.prototype.getPhotoButton = function() {
	return this.photo_button;
}

TopBanner.prototype.getTopBanner = function() {
	return this.top_banner;
}


module.exports = TopBanner;