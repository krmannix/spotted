function cameraControl(loc) {
	this.loc = loc;
}

cameraControl.prototype.showCamera = function(){
		var self = this;
		Titanium.Media.showCamera({
		success:function(event) {
			// called when media returned from the camera
			Ti.API.debug('Our type was: '+event.mediaType);
			if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {

				// Save photo to application data directory
				img = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'photo.jpg');
				img.write(event.media);

				// get full image path
	            imgPath = img.resolve();
	            Ti.API.info(imgPath);

				// Send photo via post to API
				var xhr = Ti.Network.createHTTPClient();
				xhr.onload = function(e) {
	                console.log('onload');
	                console.log('response: ' + this.responseText);
	                //handle response, which at minimum will be an HTTP status code
	            };

	            xhr.open('POST','http://spottd.herokuapp.com/upload');
	            xhr.setRequestHeader('Content-Type','application/json');
	            var location = self.loc.getLocation(xhr, self.sendPicturePostRequest);
	    
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
	    // allowEditing and mediaTypes are iOS-only settings
		allowEditing:false,

		mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]
	});

}

cameraControl.prototype.sendPicturePostRequest = function(xhr, obj) {
	if (JSON.stringify(location) !== '{}' && typeof location != 'undefined' && location != null) {
	            	var params = {
		            	path : '~' + imgPath,
		            	lat: location.lat,
		            	lng: location.lng
		            };
		            xhr.send(JSON.stringify(params));
	            } else {
	            	Ti.API.info(location);
	            	alert("Could not get location. Please check your settings.");
	            }
}

// Making this public
module.exports=cameraControl;