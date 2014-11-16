function Loc(pic_list, no_geo) {
	this.pic_list = pic_list;
	this.no_geo = no_geo;
	this.current_lat = undefined;
	this.current_lng = undefined;
}

Loc.prototype.checkForGPS = function() {
	if (Ti.Geolocation.locationServicesEnabled) {
		this.pic_list.getPicList().setVisible(true);
	    this.no_geo.getView().setVisible(false);
		return true;
	} else {
		this.no_geo.getView().setVisible(true);
		this.pic_list.getPicList().setVisible(false);
		alert('Please enable location services in your phone\'s Settings');
		return false;
	}
}

Loc.prototype.enableLocationServices = function() {
	if (this.checkForGPS()) {
	    Ti.Geolocation.purpose = 'Get Current Location';
	    Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_HUNDRED_METERS;
	    Ti.Geolocation.distanceFilter = 10;
	    Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;
	} 
}

Loc.prototype.getLocation = function(xhr, callback) {
	 Ti.Geolocation.getCurrentPosition(function(e) { // Gets starting position
	        if (e.error) {
	        	this.no_geo.getView().setVisible(true);
				this.pic_list.getPicList().setVisible(false);
	            alert('Couldn\'t get location. Please check your connection.');
	            return {};
	        } else {
	        	this.pic_list.getPicList().setVisible(true);
	        	this.no_geo.getView().setVisible(false);
	        	this.current_lng = e.coords.longitude;
	        	this.current_lat = e.coords.latitude;
	        	if (callback && typeof callback === 'function') {
	        		callback(xhr, {"lat": this.current_lat, "lng": this.current_lng});
	        	}
	        }
	    });
}


module.exports = Loc;