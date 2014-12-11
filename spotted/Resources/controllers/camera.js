var constants = require('./controller-constants');

function cameraControl(loc, paintview) {
	this.loc = loc;
	this.paintview = paintview;
	this.takePictureButtonBackground = Ti.UI.createView({
		height: constants.pictureButtonHeight + 10,
		width: constants.pictureButtonWidth + 10,
		bottom: constants.pictureButtonBottom,
		borderRadius: (constants.pictureButtonHeight + 10)/2,
		borderWidth: 4,
		borderColor: '#555',
		backgroundColor: '#FFF'
	});
	this.takePictureButton = Ti.UI.createImageView({
		height: constants.pictureButtonHeight,
		width: constants.pictureButtonWidth,
		bottom: 5,
		image: 'images/temp_logo.png'
	});
}

cameraControl.prototype.showCamera = function(){
		var self = this;
		var overlay = Ti.UI.createView({ 
			bottom: 0,
			width: constants.deviceWidth,
			height: constants.pictureButtonHeight + constants.pictureButtonBottom*2
		});
		this.takePictureButtonBackground.add(this.takePictureButton);
		overlay.add(this.takePictureButtonBackground);
		var cameraTransform = Ti.UI.create2DMatrix();
		cameraTransform = cameraTransform.scale(1);
		Titanium.Media.showCamera({
		overlay: overlay,
		showControls: false,
		transform: cameraTransform,
		success:function(event) {
			// called when media returned from the camera
			Ti.API.debug('Our type was: '+event.mediaType);
			if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
				self.paintview.setPaintImage(event.media);
				self.paintview.showPaintView();
			} else {
				alert("got the wrong type back ="+event.mediaType);
			}
		},
		cancel:function() {
			// called when user cancels taking a picture
		},
		error:function(error) {
			// called when there's an error
			var a = Titanium.UI.createAlertDialog({title:'Camera'});
			if (error.code == Titanium.Media.NO_CAMERA) {
				a.setMessage('Please run this test on device');
			} else {
				a.setMessage('Unexpected error: ' + error.code);
			}
			a.show();
		},
		// We're saving it to the app data directory instead of the photo gallery
		saveToPhotoGallery:false,
	    // allowEditing and mediaTypes are iOS-only settings
		allowEditing:false,
		// Only allow photos
		mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]
	});
}

cameraControl.prototype.getPictureButton = function() {
	return this.takePictureButtonBackground;
}

// Making this public
module.exports = cameraControl;