function Events(top_banner) {
	this.top_banner = top_banner;
	this.photo_button = this.top_banner.getPhotoButton();
	this.options_button = this.top_banner.getOptionsButton();

	this.addEventListeners();
}

/* * * * * * * * * * * * * * * * * * * * *
 * 
 *  Events, which will be added in 
 *  addEventListeners
 *
 * * * * * * * * * * * * * * * * * * * * */

Events.prototype.openPhotoView = function() {

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

}


module.exports = Events;