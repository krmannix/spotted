var constants = require('./controller-constants');

function cameraControl(camera_view, paint_view) {
	this.paint_view = paint_view;
	this.camera_view = camera_view;
}

cameraControl.prototype.showCamera = function(){
		var self = this;

		Titanium.Media.showCamera({
			overlay: self.camera_view.getOverlay(),
			showControls: false,
			transform: Ti.UI.create2DMatrix().scale(1),
			success:function(event) {
				// called when media returned from the camera
				Ti.API.debug('Our type was: '+event.mediaType);
				if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
					self.paint_view.setPaintImage(event.media);
					self.paint_view.showPaintView();
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
			saveToPhotoGallery:false,
			allowEditing:false,
			mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]
		});
}

module.exports = cameraControl;