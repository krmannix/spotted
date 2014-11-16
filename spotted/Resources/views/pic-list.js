var constants = require('./view-constants');

function PicList() {
	this.pic_list_view = this.createPicList();
	this.current_pics = [];
}

PicList.prototype.createPicList = function() {
	// Table views seem easier than lists in titanium
	return Ti.UI.createTableView({
		top: constants.tableTop,
		selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
		backgroundColor: constants.secondaryColor
	});
}

PicList.prototype.getPicList = function() {
	return this.pic_list_view;
}

PicList.prototype.addPicturesToPicList = function(pics) {
	// For now, we'll just generate these pics
	for (var i = 0; i < pics.length; i++) {
		var row = this.createPictureRow(pics[i], i);
		this.current_pics.push(row);
		this.pic_list_view.appendRow(row);
	}
}

PicList.prototype.createPictureRow = function(pic, i) {
	var row = Ti.UI.createTableViewRow({
			className:'user_pics',
			selectedBackgroundColor: 'white',
			rowIndex: this.current_pics.length + i
	});

	var pic = Ti.UI.createImageView({
		image: pic,
		width: constants.imageWidth,
		height: 'auto',
		top: constants.imageTop
	});

	var timestamp_row = Ti.UI.createView({
		width: constants.imageWidth,
		height: constants.timeStampHeight,
		top: constants.imageTop,
		backgroundColor: 'rgba(0,0,0,0.4)'
	});

	var timestamp = Ti.UI.createLabel({
		top: constants.timeStampTextTop,
		color: 'white',
		width: 'auto',
		text: '12:14',
		font: {fontFamily: 'Helvetica', fontSize: 11}
	});

	// Must be in this order
	row.add(pic);
	row.add(timestamp_row);
	row.add(timestamp);

	return row;
}

module.exports = PicList;