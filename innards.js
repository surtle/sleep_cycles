
// constants
var MINS_IN_HOUR = 60;
var MINS_IN_DAY = 1440;
var MINS_TO_SLEEP = 15;
var HOURS_IN_DAY = 24;
var SLEEP_CYCLE = 90; 

// buttons
var sleep = document.getElementById('sleepButton');
var wake = document.getElementById('wakeButton');
var timeSel = document.getElementById('timeSelection');
var submitButton = document.getElementById('submit'); 

// divs & html elements
var output = document.getElementById('output');
var inHour, inMin, inPod; 

//0 to find optimal sleep times, 1 to find optimal wake times
var mode = 0; 

sleep.onclick = function() {
	
	// shows time selection
	if(timeSel.style.display !== 'inline-block') {
		timeSel.style.display = 'inline-block'; 
	}
	
	// toggles mode
	sleep.style.backgroundColor = '#301860';
	mode = 0;
	
	// toggles color
	if(wake.style.backgroundColor = '#301860') {
		wake.style.backgroundColor = '#483078';
	}
};

wake.onclick = function() {
	
	// shows time selection
	if(timeSel.style.display !== 'inline-block') {
		timeSel.style.display = 'inline-block';
	}
	
	// toggles mode
	wake.style.backgroundColor = '#301860';
	mode = 1;
	
	// toggles color
	if(sleep.style.backgroundColor = '#301860') {
		sleep.style.backgroundColor = '#483078';
	}
}

submitButton.onclick = function() {
	
	if( mode == 0 ) {
		
		// edits text in div
		document.getElementById("output-title").innerHTML = 'You should go to sleep at one of these times:';
		
		calculateSleepTimes();
	}
	
	if( mode == 1 ) {
		
		// edits text in div
		document.getElementById("output-title").innerHTML = 'You should wake up at one of these times:';
		
		calculateWakeTimes();
	}
	
	// shows output div
	if(output.style.display !== 'inline-block') {
		output.style.display = 'inline-block';
	}
}

function calculateSleepTimes() {
	
	// grabs current hour and minute
	var d = new Date();
	var currentHour = d.getHours();
	var currentMin = d.getMinutes();
	var currentTimeAsMins = convertToMins( currentHour, currentMin );
	
	// helper variables to calculate
	var inputAsMins; 
	var amountOfSleep; 
	var numOfCycles = 1;
	var calculatedSleepTime = 0;
	var sleepTime = 0; 
	var stringOutput = '';
	
	// factors in amount of time it takes to fall asleep
	currentTimeAsMins = currentTimeAsMins + MINS_TO_SLEEP;
	
	// recalculates if current time is now over 24 hrs
	if( currentTimeAsMins >= MINS_IN_DAY ) {
		currentTimeAsMins = currTimeAsMins - MINS_IN_DAY; 
	}
	
	// gets input time
	inputTimeAsMins = getInputTime(); 
	
	// calculates amount of sleep
	if( inputTimeAsMins < currentTimeAsMins ) {
		amountOfSleep = ( MINS_IN_DAY - currentTimeAsMins ) + inputTimeAsMins;
	} else {
		amountOfSleep = inputTimeAsMins - currentTimeAsMins; 
	}
	
	// if the amount of sleep is less than 90 mins, break
	if( amountOfSleep < SLEEP_CYCLE ) {
		document.getElementById("output-title").innerHTML = 
			'Not enough time for at least one sleep cycle :-('; 
	} 
	
	else {
		while( calculatedSleepTime < amountOfSleep && numOfCycles < 12 ) {
			if( numOfCycles > 1 ) {
				stringOutput += ' <li class="list-group-item"> ' + convertToTime( sleepTime ) + '</li>';
			}
			
			// adds another sleep cycle and factors in the time
			sleepTime = inputTimeAsMins - ( numOfCycles * SLEEP_CYCLE );
			
			// reconfigures sleepTime if it is negative
			if( sleepTime < 0 ) {
				sleepTime = sleepTime + MINS_IN_DAY;
			}
			
			// calculates sleep time
			if( inputTimeAsMins < sleepTime ) {
				calculatedSleepTime = ( MINS_IN_DAY - sleepTime ) + inputTimeAsMins;
			} else {
				calculatedSleepTime = inputTimeAsMins - sleepTime;
			}
			
			numOfCycles += 1; 
			
		}
		
		// adds times to div element
		document.getElementById("times").innerHTML = stringOutput; 
	}
}

function calculateWakeTimes() {
	
	// grabs current hour and minute
	var d = new Date();
	var currentHour = d.getHours();
	var currentMin = d.getMinutes();
	var currentTimeAsMins = convertToMins( currentHour, currentMin );
	
	// helper variables to calculate
	var inputAsMins; 
	var inputPod = document.getElementById("pod").value; 
	var amountOfSleep; 
	var numOfCycles = 1;
	var calculatedSleepTime = 0;
	var wakeTime = 0; 
	var stringOutput = '';
	
	// factors in amount of time it takes to fall asleep
	currentTimeAsMins = currentTimeAsMins + MINS_TO_SLEEP;
	
	// recalculates if current time is now over 24 hrs
	if( currentTimeAsMins >= MINS_IN_DAY ) {
		currentTimeAsMins = currTimeAsMins - MINS_IN_DAY; 
		inputPod = togglePod( inputPod );
	}
	
	// gets input time
	inputTimeAsMins = getInputTime(); 
	
	// calculates amount of sleep
	if( inputTimeAsMins < currentTimeAsMins ) {
		amountOfSleep = ( MINS_IN_DAY - currentTimeAsMins ) + inputTimeAsMins;
	} else {
		amountOfSleep = inputTimeAsMins - currentTimeAsMins; 
	}
	
	while( calculatedSleepTime < amountOfSleep && numOfCycles < 12 ) {
		if( numOfCycles > 1 ) {
			stringOutput += '<li class="list-group-item"> ' + convertToTime( wakeTime ) + '</li>';
		}
		
		wakeTime = currentTimeAsMins + ( numOfCycles * SLEEP_CYCLE ); 
		
		// reconfigures wakeTime if it is over 24 hrs
		if( wakeTime >= MINS_IN_DAY ) {
			wakeTime = wakeTime - MINS_IN_DAY;
		}
		
		if( wakeTime < inputTimeAsMins ) {
				calculatedSleepTime = ( MINS_IN_DAY - wakeTime ) + inputTimeAsMins;
		} else {
				calculatedSleepTime = wakeTime - inputTimeAsMins;
		}
			
		numOfCycles++;
	}
	
	// adds times to div element
	document.getElementById("times").innerHTML = stringOutput; 
}

function convertToMins( hour, minute ) {
	return (hour * MINS_IN_HOUR) + minute; 
}

function convertToTime( mins ) {
	
	var hour = Math.floor(mins / MINS_IN_HOUR);
	var min = mins % MINS_IN_HOUR; 
	var pod = document.getElementById("pod").value; 
	if( hour < 12 && pod != "AM" ) {
		pod = togglePod ( pod );
	}
	
	if( mode == 0 ) {
		if( hour > 12 ) {
			hour = hour - 12; 
			
			if( pod != "PM" ) {
				pod = togglePod( pod );
			}
		}
	} else {
		if( hour > 12 ) { 
			hour = hour - 12;
			pod = togglePod( pod );
			
			
		}
	}
	
	if( hour <= 0 ) {
		hour = 12 + hour
		
		if( hour < 0 ) {
			pod = togglePod( pod ); 
		}
	}
	
	if( min < 0 ) {
		min = 60 + min
	}
	
	if( min < 10 ) {
		return hour + " : 0" + min + " " + pod;
	} else {
		return hour + " : " + min + " " + pod;
	}
}

function getInputTime() {
	
	// grabs input
	inHour = parseInt(document.getElementById("hour").value);
	inMin = parseInt(document.getElementById("minute").value);
	inPod = document.getElementById("pod").value;
	
	// if PM was selected
	if( inPod == "PM" && inHour < 12 ) {
		inHour += 12;
	}
	
	// if 12AM
	if( inPod == "AM" && inHour == 12 ) {
		inHour = 0;
	}
	
	return convertToMins( inHour, inMin );
	
}

function togglePod( inputPod ) {
	if( inputPod == "AM" ) {
		return "PM";
	} else {
		return "AM";
	}
}

var showTimeSelection = function() {
	if(timeSelection.style.display !== 'inline-block') {
		div.style.display = 'inline-block';
	}
};


