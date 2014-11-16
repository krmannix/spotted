var constants = require('./controller-constants');

function PicData(pic_list) {
	this.pic_list = pic_list;
	this.addPicturesToList(this.getPictures());
}

PicData.prototype.getPictures = function() {
	return constants.localPictures;
}

PicData.prototype.addPicturesToList = function(pics) {
	// Possibly do some preprocessing here
	this.pic_list.addPicturesToPicList(pics);
}

module.exports = PicData;