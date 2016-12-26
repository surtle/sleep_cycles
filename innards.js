var sleepButton = document.getElementById('sleepButton');
var wakeButton = document.getElementById('wakeButton');
var timeSelection = document.getElementById('timeSelection');

sleepButton.onclick = function() {
	if(timeSelection.style.display !== 'inline-block') {
		div.style.display = 'inline-block'; 
	}
};

wakeButton.onclick = function() {
	
}

var showTimeSelection = function() {
	if(timeSelection.style.display !== 'inline-block') {
		div.style.display = 'inline-block';
	}
};


