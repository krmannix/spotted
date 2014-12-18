var constants = require('./view-constants');

/* * * * * * * * * * * * * * * * * * *
 *
 * I moved this to a seperate file 
 * because this has the potential
 * to be moved to a different screen 
 * or changed overall. Better to 
 * keep it modular.
 *
 * * * * * * * * * * * * * * * * * */

 function TagView() {
 	this.allTags = ['awkward', 'bananaU', 'freefood'];
 	this.allTagLabels = this.createTabLabels(this.allTags);
 	this.leftArrow = this.createLeftArrow();
 	this.rightArrow = this.createRightArrow();
 	this.tagView = this.createTagView();
 }

/* * * * * * * * * * * * * * * * * * * * *
 * 
 *  CREATES
 *
 * * * * * * * * * * * * * * * * * * * * */

 TagView.prototype.createTagLabels = function(textArray) {
 	var i, ls = [];
 	for (i = 0; i < textArray.length; i++) {
 		ls.push(this.createTagLabel(textArray[i]));
 	}
 	ls[0].setVisible(true);
 	return ls;
 }

 TagView.prototype.createTagLabel = function(text) {
 	return Ti.UI.createLabel({
 		color: '#FFF',
 		backgroundColor: '#000',
 		font: { fontSize: 10 },
 		text: text,
 		visible: false
 	});
 }

 TagView.prototype.createTagView = function() {
 	var tv = Ti.UI.createView({
 		width: constants.deviceWidth,
 		height: constants.tagViewHeight,
 		top: constants.tagViewTop,
 		backgroundColor: '#000000'
 	});
 	tv.add(this.rightArrow);
 	tv.add(this.leftArrow);
 	var i;
 	for (i = 0; i < this.allTagLabels.length; i++) {
 		tv.add(this.allTagLabels[i]);
 	}
 	return tv;
 }

 TagView.prototype.createLeftArrow = function() {
 	return Ti.UI.createImageView({
 		image: 'images/left_arrow.png',
 		height: constants.tagArrowHeight,
 		left: 5
 	});
 }

 TagView.prototype.createRightArrow = function() {
 	return Ti.UI.createImageView({
 		image: 'images/right_arrow.png',
 		height: constants.tagArrowHeight,
 		right: 5
 	});
 }

/* * * * * * * * * * * * * * * * * * * * *
 * 
 *  GETS
 *
 * * * * * * * * * * * * * * * * * * * * */

 TagView.prototype.getRightArrow = function() {
 	return this.rightArrow;
 }

 TagView.prototype.getLeftArrow = function() {
 	return this.LeftArrow;
 }

 TagView.prototype.getTagLabels = function() {
 	return this.allTagLabels;
 }

 TagView.prototype.getTagView = function() {
 	return this.tagView;
 }








