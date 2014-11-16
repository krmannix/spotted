var constants = require('./controller-constants');

function PicData(pic_view) {
	this.pic_view = pic_view;
	this.addPicturesToList(this.getPictures());
}

PicData.prototype.getPictures = function() {

}

PicData.prototype.addPicturesToList = function(pics) {

}

module.exports = PicData;