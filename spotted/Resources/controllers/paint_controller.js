var Paint = require('ti.paint');
var constants = require('./controller-constants');

function PaintController() {
	this.colorButtons = this.createColorButtons();
	this.paintView = this.createPaintView();
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

PaintController.prototype.createPaintView = function() {
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
											 (constants.paintColorButtonSize + constants.paintColorButtonBuffer)*1))
	}
	return bs;
}

PaintController.prototype.getPaintView = function() {
	return this.paintView;
}


module.exports = PaintController;