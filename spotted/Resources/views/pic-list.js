var constants = require('./view-constants');

function PicList() {
	this.labelLastUpdated = this.createLabelLastUpdated();
	this.labelStatus = this.createLabelStatus();
	this.border = this.createBorder();
	this.actInd = this.createActInd();
	this.imageArrow = this.createImageArrow();
	this.table_header = this.createTableHeader();
	this.pic_list_view = this.createPicList();
	this.current_pics = [];
}

/* * * * * * * * * * * * * * * * * * * * *
 * 
 *  Creators
 *
 * * * * * * * * * * * * * * * * * * * * */

PicList.prototype.createPicList = function() {
	// Table views seem easier than lists in titanium
	return Ti.UI.createTableView({
		top: constants.tableTop,
		selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
		backgroundColor: constants.secondaryColor,
		headerPullView: this.table_header
	});
}

PicList.prototype.createTableHeader = function() {


	var t = Ti.UI.createView({
	    backgroundColor:'#e2e7ed',
	    width:320, height:60
	});
	t.add(this.border);
	t.add(this.imageArrow);
	t.add(this.labelStatus);
	t.add(this.labelLastUpdated);
	t.add(this.actInd);
	return t;
}

PicList.prototype.createLabelLastUpdated = function() {
	var date = new Date();	
	return Ti.UI.createLabel({
	    color:'#576c89',
	    font:{fontSize:12},
	    text:'Last Updated: ' + date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes(),
	    textAlign:'center',
	    left:55, bottom:15,
	    width:200
	});
}

PicList.prototype.createLabelStatus = function() {
	return Ti.UI.createLabel({
	    color:'#576c89',
	    font:{fontSize:13, fontWeight:'bold'},
	    text:'Pull down to refresh...',
	    textAlign:'center',
	    left:55, bottom:30,
	    width:200
	});
}

PicList.prototype.createBorder = function() {
	return Ti.UI.createView({
	    backgroundColor:'#576c89',
	    bottom:0,
	    height:2
	});
}

PicList.prototype.createImageArrow = function() {
	return Ti.UI.createImageView({
	    image:'/images/whiteArrow.png',
	    left:20, bottom:10,
	    width:23, height:60
	});
}

PicList.prototype.createActInd = function() {
	return Ti.UI.createActivityIndicator({
	    left:20, bottom:13,
	    width:30, height:30
	});
}

PicList.prototype.createPictureRow = function(pic, i) {
	var row = Ti.UI.createTableViewRow({
			className:'user_pics',
			selectedBackgroundColor: 'white',
			rowIndex: this.current_pics.length + i,
			backgroundColor: (i%2 == 0) ? constants.secondaryColor : constants.tertiaryColor
	});

	var pic = Ti.UI.createImageView({
		image: pic,
		width: constants.imageWidth,
		height: 'auto',
		top: constants.imageTop/2,
		bottom: constants.imageTop/2
	});

	var timestamp_row = Ti.UI.createView({
		width: constants.imageWidth,
		height: constants.timeStampHeight,
		top: constants.imageTop/2,
		backgroundColor: (i%2 == 0) ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'
	});

	var timestamp = Ti.UI.createLabel({
		top: constants.timeStampTextTop/2,
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

/* * * * * * * * * * * * * * * * * * * * *
 * 
 *  Getters
 *
 * * * * * * * * * * * * * * * * * * * * */

PicList.prototype.getPicList = function() {
	return this.pic_list_view;
}

PicList.prototype.getImageArrow = function() {
	return this.imageArrow;
}

PicList.prototype.getActInd = function() {
	return this.actInd;
}

PicList.prototype.getLabelStatus = function() {
	return this.labelStatus;
}

PicList.prototype.getLabelLastUpdated = function() {
	return this.labelLastUpdated;
}

/* * * * * * * * * * * * * * * * * * * * *
 * 
 *  Headers
 *
 * * * * * * * * * * * * * * * * * * * * */

PicList.prototype.addPicturesToPicList = function(pics) {
	// For now, we'll just generate these pics
	for (var i = 0; i < pics.length; i++) {
		var row = this.createPictureRow(pics[i], i);
		this.current_pics.push(row);
		this.pic_list_view.appendRow(row);
	}
}





module.exports = PicList;