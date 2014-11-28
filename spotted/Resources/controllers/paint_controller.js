var Paint = require('ti.paint');
var constants = require('./controller-constants');

function PaintController() {
	this.colorButtons = this.createColorButtons(['#FF0000', '#FFA500', '#FFFF00',
												 '#00FF00', '#0000FF', '#800080']);
	this.canvas = this.createCanvas();
	this.paintView = this.createPaintView();
}

/* * * * * * * * * * * * * * * * * * * * *
 * 
 *  ACTIONS
 *
 * * * * * * * * * * * * * * * * * * * * */

PaintController.prototype.changeStrokeColor = function(color) {
	this.canvas.strokeColor = color;
}

/* * * * * * * * * * * * * * * * * * * * *
 * 
 *  CREATES
 *
 * * * * * * * * * * * * * * * * * * * * */

PaintController.prototype.createPaintView = function() {
	var pv = Ti.UI.createView({
		top:0, right:0, bottom:0, left:0
	});
	pv.add(this.canvas);
	for (var i = 0; i < this.colorButtons.length; i++) {
		pv.add(this.colorButtons[i]);
	}
	// Add text button
	return pv;
}

PaintController.prototype.createColorButton = function(color, x_distance) {
	return Ti.UI.createView({
		backgroundColor: color,
		left: x_distance,
		bottom: 10,
		width: constants.paintColorButtonSize,
		height: constants.paintColorButtonSize,
		borderRadius: constants.paintColorButtonSize/2
	});
}

PaintController.prototype.createCanvas = function() {
	return Paint.createPaintView({
	    top:0, right:0, bottom:0, left:0,
	    // strokeWidth (float), strokeColor (string), strokeAlpha (int, 0-255)
	    strokeColor:'#0f0', strokeAlpha:255, strokeWidth:10,
	    eraseMode:false
	});
}

PaintController.prototype.createColorButtons = function(colors) {
	var bs = [];
	for (var i = 0; i < colors.length; i++) {
		bs.push(this.createColorButton(colors[i], constants.paintColorButtonInitialLeft + 
											 (constants.paintColorButtonSize + constants.paintColorButtonBuffer)*i))
	}
	return bs;
}

/* * * * * * * * * * * * * * * * * * * * *
 * 
 *  GETS
 *
 * * * * * * * * * * * * * * * * * * * * */

PaintController.prototype.getCanvas = function() {
	return this.canvas;
}

PaintController.prototype.getPaintView = function() {
	return this.paintView;
}

PaintController.prototype.getColorButtons = function() {
	return this.colorButtons;
}


module.exports = PaintController;