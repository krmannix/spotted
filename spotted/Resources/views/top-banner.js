var constants = require('./view-constants');

function TopBanner() {
	this.photo_button = this.createPhotoButton();
	this.options_button = this.createOptionsButton();
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

TopBanner.prototype.createOptionsButton = function() {
	return Ti.UI.createImageView({
		image: 'images/gear.png',
		top: constants.bannerButtonTop,
		height: constants.bannerButtonHeight,
		width: constants.bannerButtonHeight,
		left: constants.bannerButtonSpaceFromSide
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
	banner.add(this.photo_button);
	banner.add(this.options_button);
	//banner.add(border);
	return banner;
}

TopBanner.prototype.getOptionsButton = function() {
	return this.options_button;
}

TopBanner.prototype.getPhotoBanner = function() {
	return this.photo_button;
}

TopBanner.prototype.getTopBanner = function() {
	return this.top_banner;
}


module.exports = TopBanner;