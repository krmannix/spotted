var animations = require('../views/animations');

function Events(top_banner, pic_list, pic_data, camera, location, paint, camera_view, tags) {
	// Get views
	this.top_banner = top_banner;
	this.pic_list = pic_list;
	this.pic_data = pic_data;
	this.camera_view = camera_view;
	this.paint = paint;
	this.camera = camera;
	this.tags = tags;

	// Get components in views
	this.location = location;
	this.banner = this.top_banner.getTopBanner();
	this.banner_logo = this.top_banner.getLogo();
	this.photo_button = this.top_banner.getPhotoButton();
	this.options_button = this.top_banner.getOptionsButton();
	this.cameraControl = camera;
	this.pic_list_view = this.pic_list.getPicList();
	this.photo_submit_button = this.paint.getSubmitButton();
	this.text_start_button = this.paint.getTextStartButton();
	this.text_input_box = this.paint.getTextInputBox();
	this.paint_loading = this.paint.getLoadingView();
	this.paint_view = this.paint.getPaintView();
	this.cancel_paint_button = this.paint.getCancelButton();
	this.erase_paint_button = this.paint.getEraseButton();
	this.erase_paint_background = this.paint.getEraseBackground();
	this.refresh_paint_button = this.paint.getRefreshButton();
	this.picture_button = this.camera_view.getTakePhotoButton();
	this.switch_camera_button = this.camera_view.getSwitchCameraButton();
	this.cancel_camera_button = this.camera_view.getCancelButton();
	this.tag_left_arrow = this.tags.getLeftArrow();
	this.tag_right_arrow = this.tags.getRightArrow();
	this.tag_labels = this.tags.getTagLabels();

	// Animations
	this.close_paint_view_animation = animations.closePaintView();
	this.open_banner = animations.openTopBar();
	this.close_banner = animations.closeTopBar();

	// For the reload puller
	this.pulling = false;
	this.reloading = false;
	this.offset = 0;
	this.imageArrow = this.pic_list.getImageArrow();
	this.actInd = this.pic_list.getActInd();
	this.labelStatus = this.pic_list.getLabelStatus();
	this.labelLastUpdated = this.pic_list.getLabelLastUpdated();

	// Boolean values
	this.textInputBoxOpen = false;
	this.topBarOpen = false;
	this.tagIndex = 0;

	this.addEventListeners();


}

/* * * * * * * * * * * * * * * * * * * * *
 * 
 *  Events, which will be added in 
 *  addEventListeners
 *
 * * * * * * * * * * * * * * * * * * * * */

Events.prototype.openPhotoView = function() {
	this.cameraControl.showCamera();
}

Events.prototype.listScroll = function(e) {
	this.offset = e.contentOffset.y;
    if (this.pulling && !this.reloading && this.offset > -80 && this.offset < 0){
        this.pulling = false;
        var unrotate = Ti.UI.create2DMatrix();
        this.imageArrow.animate({transform:unrotate, duration:180});
        this.labelStatus.text = 'Pull down to refresh...';
    } else if (!this.pulling && !this.reloading && this.offset < -80){
        this.pulling = true;
        var rotate = Ti.UI.create2DMatrix().rotate(180);
        this.imageArrow.animate({transform:rotate, duration:180});
        this.labelStatus.text = 'Release to refresh...';
    }
}

Events.prototype.listDragEnd = function(e) {
	var self = this;
	if (this.pulling && !this.reloading && this.offset < -80){
        this.pulling = false;
        this.reloading = true;
        this.labelStatus.text = 'Updating...';
        this.imageArrow.hide();
        this.actInd.show();
        e.source.setContentInsets({top:80}, {animated:true});
        setTimeout(function(){
        	this.location.getLocation('', self.pic_data.addPicturesToList, self.pic_data); // Calls the REST API to GET Pictures
            self.resetPullHeader(e.source);
        }, 2000);
    }
}

Events.prototype.resetPullHeader = function(table) {
	var date = new Date();
    var formatted_date = date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();
	this.reloading = false;
    this.labelLastUpdated.text = 'Last Updated: ' + formatted_date;
    this.actInd.hide();
    this.imageArrow.transform=Ti.UI.create2DMatrix();
    this.imageArrow.show();
    this.labelStatus.text = 'Pull down to refresh...';
    table.setContentInsets({top:0}, {animated:true});
}

Events.prototype.allColorHandlers = function() {
	var cbs = this.paint.getColorButtons();
	var self = this;
	for (var i = 0; i < cbs.length; i++) {
		cbs[i].addEventListener('click', function(e) {
			// Set canvas to non-erase mode
			self.paint.getCanvas().eraseMode = false;
			self.erase_paint_background.setVisible(false);
			self.paint.changeStrokeColor(e.source.backgroundColor);
		});
	}
}

Events.prototype.photoSendHttpRequest = function(img, obj) {
	if (JSON.stringify(obj) !== '{}' && typeof obj != 'undefined' && obj != null) {

		var params = {
			"file" : img,
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

Events.prototype.sendPhoto = function() {
	this.paint_loading.show();
	var img = this.paint.getCanvas().toImage();
	this.location.getLocation(img, this.photoSendHttpRequest);
	this.closePaintView();
}

Events.prototype.closePaintView = function() {
	this.paint_loading.hide();
	this.paint_view.animate(this.close_paint_view_animation);
}

Events.prototype.textStart = function() {
	if (this.textInputBoxOpen) {
		this.textInputBoxOpen = false;
		this.text_input_box.animate(animations.closeInputTextBox());
		this.text_input_box.value = "";
	} else {
		this.textInputBoxOpen = true;
		this.text_input_box.animate(animations.openInputTextBox());
	}
}

Events.prototype.switchCamera = function() {
	if (Ti.Media.camera == Ti.Media.CAMERA_FRONT) {
		Ti.Media.switchCamera(Ti.Media.CAMERA_REAR);
	} else {
		Ti.Media.switchCamera(Ti.Media.CAMERA_FRONT);
	}
}

Events.prototype.takePictureCustom = function() {
	Ti.Media.takePicture();
}

Events.prototype.hideCamera = function() {
	Ti.Media.hideCamera();
}

Events.prototype.setEraseMode = function() {
	this.paint.getCanvas().eraseMode = !this.paint.getCanvas().eraseMode;
	if (this.paint.getCanvas().eraseMode) 
		this.erase_paint_background.setVisible(true);
	else 
		this.erase_paint_background.setVisible(false);
}

Events.prototype.refreshImage = function() {
	this.paint.refreshImage();
}

Events.prototype.completeClosePaintViewAnimation = function() {
	this.paint_view.setVisible(false);
	this.paint_view.setTop(0);
}

Events.prototype.toggleTopBar = function() {
	if (this.topBarOpen) {
		this.banner.animate(this.close_banner);
		this.topBarOpen = !this.topBarOpen;
	} else {
		this.banner.animate(this.open_banner);
		this.topBarOpen = !this.topBarOpen;
	}
}

Events.prototype.changeTag = function(left) {
	var oldTag = this.tagIndex;
	if (left) {
		if (this.tagIndex == 0)
			this.tagIndex = this.tag_labels.length - 1;
		else
			this.tagIndex--;
	} else {
		if (this.tagIndex == this.tag_labels.length - 1)
			this.tagIndex = 0;
		else
			this.tagIndex++;
	}
	this.tag_labels[oldTag].setVisible(false);
	this.tag_labels[this.tagIndex].setVisible(true);
}

/* * * * * * * * * * * * * * * * * * * * *
 * 
 *  All event listeners should go in here
 *
 * * * * * * * * * * * * * * * * * * * * */

Events.prototype.addEventListeners = function() {

	var self = this;

	this.photo_button.addEventListener('click', function() {
		self.openPhotoView();
	});

	this.pic_list_view.addEventListener('dragEnd', function(e) {
		self.listDragEnd(e);
	});

	this.pic_list_view.addEventListener('scroll', function(e) {
		self.listScroll(e);
	});

	this.photo_submit_button.addEventListener('click', function() {
		self.sendPhoto();
	});

	this.text_start_button.addEventListener('click', function() {
		self.textStart();
	});

	this.paint_view.addEventListener('click', function() {
		self.text_input_box.blur();
	});

	this.picture_button.addEventListener('click', function() {
		self.takePictureCustom();
	});

	this.switch_camera_button.addEventListener('click', function() {
		self.switchCamera();
	});

	this.cancel_camera_button.addEventListener('click', function() {
		self.hideCamera();
	});

	this.cancel_paint_button.addEventListener('click', function() {
		self.closePaintView();
	});

	this.erase_paint_button.addEventListener('click', function() {
		self.setEraseMode();
	});

	this.refresh_paint_button.addEventListener('click', function() {
		self.refreshImage();
	});

	this.close_paint_view_animation.addEventListener('complete', function(e) {
		self.completeClosePaintViewAnimation();
	});

	this.banner_logo.addEventListener('click', function() {
		self.toggleTopBar();
	});

	this.tag_left_arrow.addEventListener('click', function() {
		self.changeTag(true);
	});

	this.tag_right_arrow.addEventListener('click', function() {
		self.changeTag(false);
	});

	this.allColorHandlers();

}


module.exports = Events;