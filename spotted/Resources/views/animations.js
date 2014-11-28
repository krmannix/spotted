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

module.exports.openInputTextBox = openInputTextBox;
module.exports.closeInputTextBox = closeInputTextBox;