var constants = require('./view-constants');

function CameraView() {
	this.takePictureButton  = this.makeTakePhotoButton();
	this.switchCameraButton = this.makeSwitchCameraButton();
	this.cancelButton 		= this.makeCancelButton();
	this.overlay 		    = this.makeOverlay();
}

/* * * * * * * * * * * * * * * * * * * * *
 * 
 *  MAKES
 *
 * * * * * * * * * * * * * * * * * * * * */

CameraView.prototype.makeTakePhotoButton = function() {
	var bg = Ti.UI.createView({
		height: constants.pictureButtonBGHeight,
		width: constants.pictureButtonBGWidth,
		bottom: constants.pictureButtonBottom,
		borderRadius: constants.pictureButtonBGHeight/2,
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

CameraView.prototype.makeCancelButton = function() {
	var cb = Ti.UI.createImageView({
		height: constants.switchCameraButtonHeight,
		left: constants.cameraSpaceFromSide,
		bottom: constants.pictureButtonBottom + (constants.pictureButtonBGHeight - constants.switchCameraButtonHeight)/2,
		image: 'images/cancel.png'
	});
	return cb;
}

CameraView.prototype.makeSwitchCameraButton = function() {
	var scb = Ti.UI.createImageView({
		height: constants.switchCameraButtonHeight,
		right: constants.cameraSpaceFromSide,
		bottom: constants.pictureButtonBottom + (constants.pictureButtonBGHeight - constants.switchCameraButtonHeight)/2,
		image: 'images/switch_camera.png'
	});
	return scb;
}

CameraView.prototype.makeOverlay = function() {
	var o = Ti.UI.createView({ 
		bottom: 0,
		width: constants.deviceWidth,
		height: constants.pictureButtonHeight + constants.pictureButtonBottom*2
	});
	o.add(this.takePictureButton);
	o.add(this.switchCameraButton);
	o.add(this.cancelButton);
	return o;
}

/* * * * * * * * * * * * * * * * * * * * *
 * 
 *  GETS
 *
 * * * * * * * * * * * * * * * * * * * * */

CameraView.prototype.getTakePhotoButton = function() {
	return this.takePictureButton;
}

CameraView.prototype.getOverlay = function() {
	return this.overlay;
}

CameraView.prototype.getSwitchCameraButton = function() {
	return this.switchCameraButton;
}

CameraView.prototype.getCancelButton = function() {
	return this.cancelButton;
}

module.exports = CameraView;