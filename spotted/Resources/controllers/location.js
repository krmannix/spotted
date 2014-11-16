function Loc() {
	this.current_lat = undefined;
	this.current_lng = undefined;
}

Loc.prototype.checkForGPS = function() {
	if (Ti.Geolocation.locationServicesEnabled) {
		return true;
	} else {
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

Loc.prototype.getLocation = function() {
	 Ti.Geolocation.getCurrentPosition(function(e) { // Gets starting position
	        if (e.error) {
	            alert('Couldn\'t get location. Please check your connection.');
	            return {};
	        } else {
	        	this.current_lng = e.coords.longitude;
	        	this.current_lng = e.coords.latitude;
	        	return {"lat": this.current_lat, "lng": this.current_lng};
	        }
	    });
}


module.exports = Loc;