function Events(top_banner, pic_list, pic_data, camera, location, paint) {
	this.top_banner = top_banner;
	this.pic_list = pic_list;
	this.pic_data = pic_data;
	this.paint = paint;

	this.location = location;
	this.photo_button = this.top_banner.getPhotoButton();
	this.options_button = this.top_banner.getOptionsButton();
	this.cameraControl = camera;
	this.pic_list_view = this.pic_list.getPicList();

	// For the reload puller
	this.pulling = false;
	this.reloading = false;
	this.offset = 0;
	this.imageArrow = this.pic_list.getImageArrow();
	this.actInd = this.pic_list.getActInd();
	this.labelStatus = this.pic_list.getLabelStatus();
	this.labelLastUpdated = this.pic_list.getLabelLastUpdated();

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
			self.paint.changeStrokeColor(e.source.backgroundColor);
		});
	}
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

	this.allColorHandlers();

}


module.exports = Events;