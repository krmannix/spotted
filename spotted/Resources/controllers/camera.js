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
				var img = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'photo.jpg');
				img.write(event.media);
				
	            self.loc.getLocation(img, self.sendPicturePostRequest);
	    
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

cameraControl.prototype.sendPicturePostRequest = function(img, obj) {
	if (JSON.stringify(obj) !== '{}' && typeof obj != 'undefined' && obj != null) {
		var params = {
			"file" : img.read(),
			"name" : "test",
			"lat" : obj.lat,
			"lng" : obj.lng
		};

        // Send photo via post to API
		var xhr = Ti.Network.createHTTPClient();
		xhr.onload = function(e) {
            console.log('onload');
            console.log('response: ' + this.responseText);
            //handle response, which at minimum will be an HTTP status code
        };

        xhr.setRequestHeader("enctype", "multipart/form-data");
        xhr.setRequestHeader("Content-Type", "image/jpg");
        xhr.open('POST','http://spottd.herokuapp.com/s3/upload');

        xhr.send(params);

    } else {
    	Ti.API.info(location);
    	alert("Could not get location. Please check your settings.");
    }
}

// Making this public
module.exports=cameraControl;