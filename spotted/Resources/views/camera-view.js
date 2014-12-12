var constants = require('./view-constants');

function CameraView() {
	this.takePictureButton = this.makeTakePhotoButton();
	this.overlay 		   = this.makeOverlay();
}

CameraView.prototype.makeTakePhotoButton = function() {
	var bg = Ti.UI.createView({
		height: constants.pictureButtonHeight + 10,
		width: constants.pictureButtonWidth + 10,
		bottom: constants.pictureButtonBottom,
		borderRadius: (constants.pictureButtonHeight + 10)/2,
		borderWidth: 4,
		borderColor: '#555',
		backgroundColor: '#FFF'
	});
	var pb = Ti.UI.createImageView({
		height: constants.pictureButtonHeight,
		width: constants.pictureButtonWidth,
		bottom: 5,
		image: 'images/temp_logo.png'
	});
	bg.add(pb);
	return bg;
}

CameraView.prototype.makeOverlay = function() {
	var o = Ti.UI.createView({ 
		bottom: 0,
		width: constants.deviceWidth,
		height: constants.pictureButtonHeight + constants.pictureButtonBottom*2
	});
	o.add(this.takePictureButton);
	return o;
}

CameraView.prototype.getTakePhotoButton = function() {
	return this.takePictureButton;
}

CameraView.prototype.getOverlay = function() {
	return this.overlay;
}

module.exports = CameraView;