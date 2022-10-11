// Load, Save, Delete Gamefiles
//#################################################################

var gamefile;
var gameload;
var gamedb;
var debug = 0;

function loadGame(){
	var x = 0;
	var lastseconds = 0;
	var compressed_saveGamefile;
	var saveGamefile = '';
	
	// load gamedb.json to gamedb
	loadJSON('game/gamedb.json',gameversion,function(response) {
		gamedb = JSON.parse(response);
	});
	
	// load gamedb.json to gameload
	loadJSON('game/gamedb.json',gameversion,function(response) {
		gameload = JSON.parse(response);
	});
	
	// set default value for gamefile
	gamefile = {
		'gamename' : gameload.gamename,
		'copyright' : gameload.copyright,
		'save' : { },
		'resource' : { }
	};
	
	// default values
	gamefile.save.version = gamesaveversion;
	gamefile.save.sync = Math.round(Math.random()*100000000000000000,0);
	gamefile.save.create = Date.now();
	gamefile.save.buymore = 1;
	
	try {
		// load saveGame if exists in local storeage
		compressed_saveGamefile = localStorage.getItem('saveGamefile' + '_' + gamesaveversion);

		if(compressed_saveGamefile !== null) {
			saveGamefile = JSON.parse(LZString.decompressFromUTF16(compressed_saveGamefile));
		}
		
		if(typeof saveGamefile !== 'undefined' && saveGamefile !== null) {
			for(x in saveGamefile.resource) {
				if(typeof gameload.resource[x] !== 'undefined') {
					gamefile.resource[x] = gameload.resource[x];
					gamefile.resource[x].save = saveGamefile.resource[x].save;					
					gamefile.save = saveGamefile.save;
					
					setResourceCosts(gamefile.resource[x]);
					
					if(typeof gamefile.resource[x].buymax !== 'undefined') {
						if(gamefile.resource[x].buymax === 0) {
							gamefile.save.owned = 1;
							gamefile.save.bought = 1;
						}
					}
				}
			}
		}
	}
	catch(e) {
		console.error(e);
		console.log(saveGamefile);
	}
	// Check for awaytime
	if(typeof gamefile !== 'undefined') {
		if(typeof gamefile.save.lastlogin !== 'undefined') {
			getAwayInfo();
			saveGame();
		}
	}
	
	// Show Menu
	showMenu('M1000');
	
	// check for current progress and refresh
	setGameProgress();
	refreshGame();
	
	// Start gameloop
	requestAnimationFrame(gameloop);
};

function saveGame(){	
	var x = 0;
	var compressed_saveGamefile;
	
	var saveGamefile = {
		'resource': { }
	};
	
	for(x in gamefile.resource) {
		saveGamefile.resource[x] = { 
			'save' : { }
		};
		saveGamefile.resource[x].save = gamefile.resource[x].save;
	}
	
	saveGamefile.save = gamefile.save;
	saveGamefile.save.lastlogin = Date.now();
	saveGamefile.save.version = gamesaveversion;
	
	compressed_saveGamefile = LZString.compressToUTF16(JSON.stringify(saveGamefile));
	localStorage.setItem('saveGamefile' + '_' + gamesaveversion,compressed_saveGamefile);
};

function deleteGame(){	
	
	var x=0;
	
	for(x in localStorage) {
		if(x.indexOf('saveGamefile') !== -1) {
			localStorage.removeItem(x);
		}
	}
	
	//localStorage.removeItem('saveGamefile' + '_' + gamesaveversion);
	document.getElementById('buymore').style = 'display:none;';
	document.getElementById('popup').innerHTML = '';
	toggleBuyMore(1);
	loadGame();
};

function importGame(inewgamefile=null) {
	
	var newgamefile = JSON.parse(atob(inewgamefile));
	
	if(typeof newgamefile !== 'undefined' && newgamefile !== null) {
		
		if(typeof newgamefile.save !== 'undefined') {
			
			if(typeof newgamefile.save.lastlogin !== 'undefined') {
				
				// load gamedb.json to gamedb
				loadJSON('game/gamedb.json',gameversion,function(response) {
					gamedb = JSON.parse(response);
				});
				
				// load gamedb.json to gameload
				loadJSON('game/gamedb.json',gameversion,function(response) {
					gameload = JSON.parse(response);
				});
				
				// set default value for gamefile
				gamefile = {
					'gamename' : gameload.gamename,
					'copyright' : gameload.copyright,
					'save' : { },
					'resource' : { }
				};
				
				// load all resources
				for(x in newgamefile.resource) {
					if(typeof gameload.resource[x] !== 'undefined') {
						gamefile.resource[x] = gameload.resource[x];
						
						gamefile.resource[x].save = newgamefile.resource[x].save;
						gamefile.save = newgamefile.save;			
						setResourceCosts(gamefile.resource[x]);
						
						if(typeof gamefile.resource[x].buymax !== 'undefined') {
							if(gamefile.resource[x].buymax === 0) {
								gamefile.resource[x].save.owned = 1;
								gamefile.resource[x].save.bought = 1;
							}
						}
					}
				}
				
				if(typeof gamefile.save.create === 'undefined') {
					gamefile.save.create = Date.now();
				}
				
				if(typeof gamefile.save.buymore === 'undefined') {
					gamefile.save.buymore = 1;	
				}
				
				// Show Menu
				showMenu('M1000');
				
				// check for current progress and refresh
				setGameProgress();
				refreshGame();
				
				document.getElementById('popup').appendChild(drawPopup('syncImportGame','<b>Import savegame...</b>'));
			}
		}else {
			document.getElementById('popup').appendChild(drawPopup('syncImportGame','<b>Import failed...</b>'));
		}
	}else {
		document.getElementById('popup').appendChild(drawPopup('syncImportGame','<b>Import failed...</b>'));
	}
};

function addResource(iresourceid){
	try {
		gamefile.resource[iresourceid] = gameload.resource[iresourceid];
	}
	catch(e) {
		console.error(e);
		console.log('addResource:'+iresourceid);
	}
};

function setResource(iresourceid,number=0){
	try {
		if(typeof gamefile.resource[iresourceid] !== 'undefined') {
			gamefile.resource[iresourceid].save.owned = number;
			gamefile.resource[iresourceid].save.bought = number;
		}
	}
	catch(e) {
		console.error(e);
		console.log('setResource:'+iresourceid);
	}
};

function setResourceOwned(iresourceid,number=0){
	try {
		if(typeof gamefile.resource[iresourceid] !== 'undefined') {
			gamefile.resource[iresourceid].save.owned = number;
		}
	}
	catch(e) {
		console.error(e);
		console.log('setResourceOwned:'+iresourceid);
	}
};

function setResourceBought(iresourceid,number=0){
	try {
		if(typeof gamefile.resource[iresourceid] !== 'undefined') {
			gamefile.resource[iresourceid].save.bought = number;
		}
	}
	catch(e) {
		console.error(e);
		console.log('setResourceBought:'+iresourceid);
	}
};

function getResourceOwned(iresourceid){
	try {
		if(typeof gamefile.resource[iresourceid] !== 'undefined') {
			return noNaN(gamefile.resource[iresourceid].save.owned);
		}else {
			return 0;
		}
	}
	catch(e) {
		console.error(e);
		console.log('getResourceOwned:'+iresourceid);
		return 0;
	}
};

function getResourceBought(iresourceid){
	try {
		if(typeof gamefile.resource[iresourceid] !== 'undefined') {
			return noNaN(gamefile.resource[iresourceid].save.bought);
		}else {
			return 0;
		}
	}
	catch(e) {
		console.error(e);
		console.log('getResourceBought:'+iresourceid);
		return 0;
	}
};

function removeResource(iresourceid){
	try {
		delete gamefile.resource[iresourceid];
	}
	catch(e) {
		console.error(e);
		console.log('removeResource:'+iresourceid);
	}
};

function resetResource(iresourceid){
	try {
		if(typeof gamefile.resource[iresourceid] !== 'undefined') {
			gamefile.resource[iresourceid].save.owned = 0;
			gamefile.resource[iresourceid].save.bought = 0;
			
			setResourceCosts(gamefile.resource[iresourceid],1);
		}
	}
	catch(e) {
		console.error(e);
		console.log('resetResource:'+iresourceid);
	}
};

function loadJSON(file,parameter,callback) {
	var xobj = new XMLHttpRequest();
	
	xobj.overrideMimeType('application/json');
	xobj.open('GET', file+'?v='+parameter, false);
	
	xobj.onreadystatechange = function () {
		if (xobj.readyState == 4 && xobj.status == '200') {
			callback(xobj.responseText);
		}
	};
	xobj.send(null);
};

function noNaN(n) {
	return isNaN( n ) ? 0 : n;
};

function debugGame(){
	if(debug === 0) {
		debug = 1;
	} else {
		debug = 0;
	}
};
