var constants = require('./view-constants');

var openInputTextBox = function() {
	return Ti.UI.createAnimation({ 
		top: constants.textInputBottomOpen,
		duration: 500
	});
}

var closeInputTextBox = function() {
	return Ti.UI.createAnimation({ 
		top: constants.textInputBottomClosed,
		duration: 500
	});
}

var closePaintView  = function() {
	return Ti.UI.createAnimation({
		top: constants.deviceHeight,
		curve: Titanium.UI.ANIMATION_CURVE_EASE_IN,
		duration: 500
	});
}

var openTopBar = function() {
	return Ti.UI.createAnimation({
		left: 0,
		curve: Titanium.UI.ANIMATION_CURVE_EASE_IN,
		duration: 300
	});
}

var closeTopBar = function() {
	return Ti.UI.createAnimation({
		left: constants.bannerLeft,
		curve: Titanium.UI.ANIMATION_CURVE_EASE_IN,
		duration: 300
	});
}

module.exports.openInputTextBox = openInputTextBox;
module.exports.closeInputTextBox = closeInputTextBox;
module.exports.closeTopBar = closeTopBar;
module.exports.openTopBar = openTopBar;