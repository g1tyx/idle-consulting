// Game Loop
//#################################################################
var saveTimer = 0;
var saveTimerMax = 25;

var refreshTimer = 0;
var refreshTimerMax = 5;

var ticks = 100;
var seconds = 1000;

var lastTick = (new Date).getTime();

var gameloop = function() {
	
	try {	
		// current time in ms
		var now = (new Date).getTime();
		var deltaTime = (now - lastTick);
		
		if(deltaTime >= ticks) {
			if(debug === 0) {
				
				// Calc rescoure
				setResourceProduce(deltaTime / seconds);
				
				// Refresh game
				refreshTimer++;
				if(refreshTimer >= refreshTimerMax) {
					setGameProgress();
					refreshGame();
					refreshTimer = 0;
				}
			 
				// Save game
				saveTimer++;
				if(saveTimer >= saveTimerMax) {
					saveGame();
					saveTimer = 0;
				}
			}
			
			lastTick = now;
		}
	}catch(e) {
		console.error(e);
	}
	
	requestAnimationFrame(gameloop);
};

// Save before unload
//#################################################################
window.addEventListener("beforeunload", function(e){
   saveGame();
}, false);

// Popstate
//#################################################################
window.addEventListener('popstate', function(event) {

	if(document.getElementById('okay_button') !== null) {
		document.getElementById('okay_button').onclick();
		history.pushState(null, null, null);
	}
	
	if(document.getElementById('overlay') !== null) {
		document.getElementById('overlay').onclick();
		history.pushState(null, null, null);
	}
});

// Hotkeys
//#################################################################
window.addEventListener('keyup', function(event) {
	switch(event.keyCode) {
		
		case 27: // ESC
			if(document.getElementById('okay_button') !== null) {
				document.getElementById('okay_button').onclick();
				history.pushState(null, null, null);
			}
			
			if(document.getElementById('overlay') !== null) {
				document.getElementById('overlay').onclick();
				history.pushState(null, null, null);
			}
		break;
		
		case 65: // A
			if(document.getElementById('ascension01_button') !== null) {
				document.getElementById('ascension01_button').onclick();
			}
		break;
		
		case 80: // P
			if(document.getElementById('prestige01_button') !== null) {
				document.getElementById('prestige01_button').onclick();
			}
		break;
		
		case 84: // T
			if(document.getElementById('buymore_button') !== null) {
				document.getElementById('buymore_button').onclick();
			}
		break;

		default:
		break;
	}
}, false);