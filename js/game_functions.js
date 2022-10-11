// Gamefunctions
//#################################################################

function buyResource(iresourceid,inumber=1,iforce=0,event=null) {
	var x = 0;
	var canbuy = 1;
	var iresource = gamefile.resource[iresourceid];
	
	if(iforce === 0) {
		for(x in iresource.costs) {
			if((typeof gamefile.resource[x] !== "undefined")) {
				if(gamefile.resource[x].save.owned < iresource.costs[x]) {
					canbuy = 0;
					break;
				}
			}
		}
	}
	
	if(canbuy === 1) {
		if((typeof iresource.costs !== "undefined") && iforce === 0) {
			for(x in iresource.costs) {
				if((typeof gamefile.resource[x] !== "undefined")) {
					gamefile.resource[x].save.owned = gamefile.resource[x].save.owned - iresource.costs[x];
				}
			}
		}
		
		gamefile.resource[iresourceid].save.owned = gamefile.resource[iresourceid].save.owned + inumber;
		gamefile.resource[iresourceid].save.bought = gamefile.resource[iresourceid].save.bought + inumber;
		
		saveGame();		
		setResourceCosts(gamefile.resource[iresourceid],inumber);
		
		if((typeof iresource.buyfunction !== "undefined") && iforce === 0) {
			for(x=0;x<inumber;x++) {
				setFunction(iresource.buyfunction);
			}
		}
	}
	
	if((gamefile.resource[iresourceid].save.owned + inumber) > Number.MAX_VALUE) {
		gamefile.resource[iresourceid].save.owned = Number.MAX_VALUE;
	}
	
	refreshGame();
	
	if(event !== null) {
		
		var loopcount = 0;
		var maxloop = 1;
		var shownumber = 1;
		var frequency = Math.random()*250;
		
		if(inumber === 1) {
			frequency = 0;
		}else {
			maxloop = 1;
			shownumber = inumber;
		}
		
		var interval = setInterval(function() {
			loopcount++;			
			getFloatText(event,iresourceid,'+'+shownumber)
			
			if(loopcount>=maxloop) {
				clearInterval(interval);
			}
		}
		,frequency);
	}
};

function toggleBuyMore(itoggle=null) {
	var toggle = 1;
	
	if((typeof gamefile.save.buymore !== "undefined")) {
		toggle = gamefile.save.buymore;
	}
	
	if(toggle === 1) {
		toggle = 10;
	}else if(toggle === 10) {
		toggle = 50;
	}else if(toggle === 50) {
		toggle = 100;
	}else if(toggle === 100) {
		toggle = 1;
	}else {
		toggle = 1;
	}
	
	if(itoggle !== null) {
		toggle = itoggle;
	}
	
	gamefile.save.buymore = toggle;
	document.getElementById('buymore_number').innerHTML = gamefile.save.buymore;
	refreshGame();
};

function setGameProgress(){
	var x = 0;
	var y = 0;
	var canbuy = 1;
	var unlockprestige = 0;
	var unlockascension = 0;
	var unlockbuymore = 0;
	var d = new Date();
	
	try {
		// Check every resource
		for(x in gamedb.resource) {
			
			canbuy = 1;
			
			//Resource not unlocked?
			if((typeof gamedb.resource[x] !== "undefined")) {
			
				// Progress check
				if((typeof gamedb.resource[x].progress !== "undefined")) {
					//################ Input new progress system ################
					canbuy = 0;
					break;
				}else if((typeof gamedb.resource[x].progress_bought !== "undefined")) {
					
					for(y in gamedb.resource[x].progress_bought) {
						
						if((typeof gamedb.resource[x].progress_bought[y] !== "undefined") && (typeof gamefile.resource[y] !== "undefined")) {
							
							if(gamedb.resource[x].progress_bought[y] > gamefile.resource[y].save.bought) {
								canbuy = 0;
								break;
							}
						} else {
							canbuy = 0;
							break;
						}
					}
					
				}else if((typeof gamedb.resource[x].progress_owned !== "undefined")) {
					
					for(y in gamedb.resource[x].progress_owned) {
						
						if((typeof gamedb.resource[x].progress_owned[y] !== "undefined") && (typeof gamefile.resource[y] !== "undefined")) {
							
							if(gamedb.resource[x].progress_owned[y] > gamefile.resource[y].save.owned) {
								canbuy = 0;
								break;
							}
						} else {
							canbuy = 0;
							break;
						}
					}
				}else if((typeof gamedb.resource[x].progress_event !== "undefined")) {
					
					if((typeof gamedb.resource[x].progress_event.day !== "undefined")) {
						if(gamedb.resource[x].progress_event.day.includes(d.getDate()) !== true) {
							canbuy = 0;
						}
					}
					
					if((typeof gamedb.resource[x].progress_event.month !== "undefined")) {
						if(gamedb.resource[x].progress_event.month.includes(d.getMonth()+1) !== true) {
							canbuy = 0;
						}
					}
					
					if((typeof gamedb.resource[x].progress_event.year !== "undefined")) {
						if(gamedb.resource[x].progress_event.year.includes(d.getFullYear()) !== true) {
							canbuy = 0;
						}
					}
				}
				
				// Add Resource and display popup
				if(canbuy === 1 && (typeof gamefile.resource[x] === "undefined")) {
					addResource(gameload.resource[x].id);
					setResourceCosts(gamefile.resource[x]);
					
					if((typeof gamefile.resource[x].spawnfunction !== "undefined")) {
						setFunction(gamefile.resource[x].spawnfunction);
					}
					
					if((typeof gamefile.resource[x].hidepopup === "undefined")) {
						
						var countdivs = document.getElementById('popup').getElementsByTagName('div').length;
						
						if(countdivs>=12) {
							document.getElementById('popup').removeChild(document.getElementById('popup').childNodes[0]);
						}
						
						if(typeof gamefile.resource[x].hidepopupinfo === "undefined") {
							document.getElementById('popup').appendChild(drawPopup(gamedb.resource[x].id,'You unlocked: <b>' + gamedb.resource[x].name + '</b>',gamedb.resource[x].icon,'getGameObjInfo(\'' + gamedb.resource[x].id + '\')'));
						} else {
							document.getElementById('popup').appendChild(drawPopup(gamedb.resource[x].id,'You unlocked: <b>' + gamedb.resource[x].name + '</b>',gamedb.resource[x].icon));
						}
					}
				}
			}
			
			// Check stuff
			if((typeof gamefile.resource[x] !== "undefined")) {
				
				// Check buymore
				if((typeof gamefile.resource[x].unlockbuymore !== "undefined") && gamefile.resource[x].save.owned >= 1) {
					unlockbuymore++;
				}
				
				// Check prestige
				if((typeof gamefile.resource[x].unlockprestige !== "undefined") && gamefile.resource[x].save.owned >= 1) {
					if(gamefile.resource[x].unlockprestige > unlockprestige || unlockprestige === 0) {
						unlockprestige = gamefile.resource[x].unlockprestige;
					}
				}
				
				// Check ascension
				if((typeof gamefile.resource[x].unlockascension !== "undefined") && gamefile.resource[x].save.owned >= 1) {
					if(gamefile.resource[x].unlockascension > unlockascension || unlockascension === 0) {
						unlockascension = gamefile.resource[x].unlockascension;
					}
				}
				
				// Check event
				if((typeof gamefile.resource[x].eventendfunction !== "undefined") && gamefile.resource[x].save.owned === 0) {
					setFunction(gamefile.resource[x].eventendfunction);
				}
				
				// LoopFunction
				if(gamefile.resource[x].save.owned > 0 || gamefile.resource[x].save.bought > 0) {
					if((typeof gamefile.resource[x].loopfunction !== "undefined")) {
						setFunction(gamefile.resource[x].loopfunction);
					}
				}
			}
		}
		
		//Unlock prestige
		document.getElementById('prestige_nav').innerHTML = '';
		
		if(unlockprestige > 0) {
			document.getElementById('prestige_nav').innerHTML = '';
			document.getElementById('prestige_nav').appendChild(drawNav('prestige01_button','Get ' + getPrettify(getPrestigeEarning(),2) + ' Prestige!','fas fa-infinity','getPrestigeInfo();','red'));
		}
		
		//Unlock ascension
		document.getElementById('ascension_nav').innerHTML = '';
		
		if(unlockascension > 0) {
			
			document.getElementById('ascension_nav').innerHTML = '';
			
			if( getAscensionCosts()-getPrestige() <= 0 ) {
				document.getElementById('ascension_nav').appendChild(drawNav('ascension01_button','Ascend!','fas fa-trophy','getAscensionInfo();','purple'));
			}else {
				document.getElementById('ascension_nav').appendChild(drawNav('ascension01_button','Need  '+(getPrettify(getAscensionCosts()-getPrestige()))+' Prestige!','fas fa-trophy','','purple'));
			}
		}
		
		// Unlock buymore
		if(unlockbuymore > 0) {
			document.getElementById('buymore').style = '';
		}
	}catch(e) {
		console.error(e);
		console.log(x);
	}
};

function setResourceCosts(iresource,inumber=1) {
	
	var x = 0;
	
	var n = inumber; 	//the number of generators to buy
	var b = 0; 			//the base price
	var r = 0; 			//the price growth rate exponent
	var k = 0; 			//the number of generators currently owned
	
	var discount = getDiscount(iresource.id);
	
	for(x in iresource.costs) {
		if((typeof iresource.costs_base !== "undefined") && (typeof iresource.costs_growth !== "undefined")) {
			if((typeof iresource.costs_base[x] !== "undefined") && (typeof iresource.costs_growth[x] !== "undefined")) {
				
				b = iresource.costs_base[x];
				r = iresource.costs_growth[x];
				k = iresource.save.bought;
				
				if(r !== 1) {
					iresource.costs[x] = b * ((Math.pow(r,k) * (Math.pow(r,n)-1)) / (r-1));
				}else {
					iresource.costs[x] = b * n;
				}
			}
			
			if(iresource.costs[x] > 0) {
				iresource.costs[x] = iresource.costs[x] * discount
				
				if(iresource.costs[x] < 0) {
					iresource.costs[x] = 0;
				}
			}
			
			if(iresource.costs[x] > Number.MAX_VALUE) {
				iresource.costs[x] = Number.MAX_VALUE;
			}
		}
	}
};

function getDiscount(iresourceid) {
	var x = 0;
	var pow = 0;
	var discount = 1;
	
	for(x in gamefile.resource) {
		if(typeof gamefile.resource[x].discount !== "undefined") {
			if(typeof gamefile.resource[x].discount[iresourceid] !== "undefined") {
				pow = (Math.pow((1 - gamefile.resource[x].discount[iresourceid]),gamefile.resource[x].save.owned))
				discount = discount * pow;
			}
		}
	}
	
	if(discount < Number.MIN_VALUE) {
		discount = Number.MIN_VALUE;
	}
	
	return discount;
};

function getProfit(iresourceid) {
	var x = 0;
	var pow = 0;
	var profit = 1;
	
	for(x in gamefile.resource) {
		if(typeof gamefile.resource[x].profit !== "undefined") {
			if(typeof gamefile.resource[x].profit[iresourceid] !== "undefined") {
				
				pow = (gamefile.resource[x].profit[iresourceid] * gamefile.resource[x].save.owned) * getProfitMultiplier(x);
				profit = profit + pow;
			}
		}
	}
	
	return profit;
};

function getProfitMultiplier(iresourceid) {
	var x = 0;
	var pow = 0;
	var profit_multiplier = 0;
	
	for(x in gamefile.resource) {
		if(typeof gamefile.resource[x].profit_multiplier !== "undefined") {
			if(typeof gamefile.resource[x].profit_multiplier[iresourceid] !== "undefined") {
				
				pow = gamefile.resource[x].profit_multiplier[iresourceid] * gamefile.resource[x].save.owned;
				profit_multiplier = profit_multiplier + pow;
			}
		}
	}
	
	if(profit_multiplier === 0) {
		profit_multiplier = 1;
	}
	
	return profit_multiplier;
};

function setResourceProduce(seconds) {
	var x = 0;
	var resourcegain = 0;
	
	for(x in gamefile.resource) {
		resourcegain = (getResourceGain(gamefile.resource[x].id)*seconds);
		
		//if(resourcegain < 0) { resourcegain = 0; }
		
		if(gamefile.resource[x].save.owned + resourcegain >= 0) {
			gamefile.resource[x].save.owned = gamefile.resource[x].save.owned + resourcegain;
		}else {
			gamefile.resource[x].save.owned = 0;
		}
	}
};

function getResourceGain(iresourceid) {
	var x = 0;
	var y = 0;
	var z = 0;
	var i = 0;
	
	var gain = 0;
	var gainresource = 0;
	var owned = 0;
	var produce = 0;
	var multiplier = 0;
	var profit = getProfit(iresourceid);
	
	// gain resource
	for(x in gamefile.resource) {
		if((typeof gamefile.resource[x].save.owned !== "undefined")) {
			// produce
			if((typeof gamefile.resource[x].produce !== "undefined")) {
				for(y in gamefile.resource[x].produce) {
					// search for obj that produrce iresourceid
					if(y === iresourceid) {
						
						owned = gamefile.resource[x].save.owned;
						produce = gamefile.resource[x].produce[y];
						
						for(z in gamefile.resource) {
							if((typeof gamefile.resource[z].save.owned !== "undefined")) {
								
								// multiplier
								if((typeof gamefile.resource[z].produce_multiplier !== "undefined")) {
									for(i in gamefile.resource[z].produce_multiplier) {
										if(x === i) {
											multiplier = multiplier + (gamefile.resource[z].produce_multiplier[i] * gamefile.resource[z].save.owned);
										}
									}
								}
							}
						}

						if(multiplier === 0 || typeof multiplier === "undefined") {
							multiplier = 1;
						}
						
						if(profit === 0 || typeof profit === "undefined") {
							profit = 1;
						}
						gain = (owned * (produce * multiplier));
						gainresource = gainresource + (gain * profit);
						
						if((typeof gamefile.resource[iresourceid].buymax !== "undefined")) {
							if(gamefile.resource[iresourceid].save.owned + gainresource > gamefile.resource[iresourceid].buymax) {
								gamefile.resource[iresourceid].save.owned = gamefile.resource[iresourceid].buymax;
							}
						}
						
						if(gainresource > Number.MAX_VALUE) {
							gainresource = Number.MAX_VALUE;
						}
					}
				}
			}
		}
	}
	
	return gainresource;
};

function getMaxBuy(iresourceid) {
	var iresource = gamefile.resource[iresourceid];
};

function setPrestige() {
	
	var x = 0;
	var buymax = -1;
	var currentprestige_bought = new Array();
	var currentprestige_owned = new Array();	
	var sync = 0;
	
	if((typeof gamefile.save.sync !== 'undefined')) {
		sync = gamefile.save.sync;
	}
	
	// Current prestige
	for(x in gamedb.resource) {
	
		currentprestige_bought[x] = 0;
		currentprestige_owned[x] = 0;
	
		if((typeof gamefile.resource[x] !== 'undefined')) {
			if((typeof gamedb.resource[x].prestige !== 'undefined')) {
				currentprestige_bought[x] = gamefile.resource[x].save.bought;
				currentprestige_owned[x] = gamefile.resource[x].save.owned;
			}
		}
		
		if((typeof gamedb.resource[x].prestigecurrency !== 'undefined')) {
			currentprestige_bought[x] = currentprestige_bought[x] + getPrestigeEarning() * getProfit(x);
			currentprestige_owned[x] = currentprestige_owned[x] + getPrestigeEarning() * getProfit(x);
		}
	}	
	
	// Reset Game
	deleteGame();
	removeElement('prestige_alert');
	
	// Set prestige resource
	for(x in gamedb.resource) {
		
		buymax = -1;
		
		if((typeof gamedb.resource[x].buymax !== 'undefined')) {
			buymax = gamedb.resource[x].buymax;
		}
		
		if((typeof gamedb.resource[x].prestige !== 'undefined')) {
			
			if(currentprestige_bought[x] > 0 || currentprestige_owned[x] > 0) {
				addResource(gameload.resource[x].id);
				
				if(currentprestige_bought[x] >= 0 && buymax !== 0) {
					gamefile.resource[x].save.bought = currentprestige_bought[x];
				}
				
				if(currentprestige_owned[x] >= 0 && buymax !== 0) {
					gamefile.resource[x].save.owned = currentprestige_owned[x];
				}
			}
		}
		
		// Set prestige counter
		if((typeof gamedb.resource[x].prestigecounter !== 'undefined')) {
			buyResource(gameload.resource[x].id,gameload.resource[x].prestigecounter,1);
		}
	}
	
	// Save
	saveGame();
	gamefile.save.sync = sync;
};

function setAscension() {
	
	var x = 0;
	var buymax = -1;
	var currentprestige_bought = new Array();
	var currentprestige_owned = new Array();
	var sync = 0;
	
	if( getAscensionCosts()-getPrestige() <= 0 ) {
	
		if((typeof gamefile.save.sync !== 'undefined')) {
			sync = gamefile.save.sync;
		}
		
		// Current prestige/ascension
		for(x in gamedb.resource) {
		
			currentprestige_bought[x] = 0;
			currentprestige_owned[x] = 0;
		
			if((typeof gamefile.resource[x] !== 'undefined')) {
				if((typeof gamedb.resource[x].prestige !== 'undefined')) {
					if(gamedb.resource[x].prestige >= 2) {
						currentprestige_bought[x] = gamefile.resource[x].save.bought;
						currentprestige_owned[x] = gamefile.resource[x].save.owned;
					}
				}
			}
			
			if((typeof gamedb.resource[x].prestigecurrency !== 'undefined')) {
				currentprestige_bought[x] = 1;
				currentprestige_owned[x] = 1;
			}
			
			if((typeof gamedb.resource[x].ascensioncurrency !== 'undefined')) {
				currentprestige_bought[x] = currentprestige_bought[x] + 1;
				currentprestige_owned[x] = currentprestige_owned[x] + 1;
			}
		}	
		
		// Reset Game
		deleteGame();
		removeElement('ascension_alert');
		
		// Set prestige resource
		for(x in gamedb.resource) {
			
			buymax = -1;
			
			if((typeof gamedb.resource[x].buymax !== 'undefined')) {
				buymax = gamedb.resource[x].buymax;
			}
			
			if((typeof gamedb.resource[x].prestige !== 'undefined')) {
				
				if(gamedb.resource[x].prestige >= 2) {
					
					if(currentprestige_bought[x] > 0 || currentprestige_owned[x] > 0) {
						
						addResource(gameload.resource[x].id);
						
						if(currentprestige_bought[x] > 0 && buymax !== 0) {
							gamefile.resource[x].save.bought = currentprestige_bought[x];
						}
						
						if(currentprestige_owned[x] > 0 && buymax !== 0) {
							gamefile.resource[x].save.owned = currentprestige_owned[x];
						}
					}
				}
			}
			
			// Set prestige counter
			if((typeof gamedb.resource[x].prestigecounter !== 'undefined')) {
				
				buyResource(gameload.resource[x].id,gameload.resource[x].prestigecounter,1);
			}
		}
	}
	
	// Save
	saveGame();
	gamefile.save.sync = sync;
};

function getAscensionCosts() {
	
	var ascension = 0;
	var b = 1000; // base costs
	var r = 10; // growth
	
	// Current ascension
	for(x in gamefile.resource) {
		
		if((typeof gamefile.resource[x].ascensioncurrency !== 'undefined')) {
			ascension = ascension + gamefile.resource[x].save.owned;
		}
	}	
	
	return b * ((Math.pow(r,ascension) * (Math.pow(r,1)-1)) / (r-1));;
};

function getLifetimeSavings() {
	
	var x = 0;
	var y = 0;
	var current_earning = 0;
	var saving_multiplier = 1;
	
	for(x in gameload.resource) {
		if((typeof gameload.resource[x].produce_multiplier !== 'undefined')) {
			for(y in gameload.resource[x].produce_multiplier) {
				if((typeof gameload.resource[y].savingscount !== 'undefined')) {
						saving_multiplier = saving_multiplier + gameload.resource[x].produce_multiplier[y];
				}
			}
		}
	}
	
	for(x in gameload.resource) {
		if((typeof gameload.resource[x].savingscount !== 'undefined')) {
			current_earning = current_earning + (gameload.resource[x].save.owned * gameload.resource[x].savingscount) * saving_multiplier;
		}
	}
	
	return Math.floor(current_earning);
};

function getPrestigeEarning() {
	var lifetimesavings = getLifetimeSavings();
	
	return Math.ceil(141 * Math.sqrt(lifetimesavings / Math.pow(10,14.1)));
};

function getPrestige() {
	var prestige = 0;
	
	// Current ascension
	for(x in gamefile.resource) {
		
		if((typeof gamefile.resource[x].prestigecurrency !== 'undefined')) {
			prestige = prestige + gamefile.resource[x].save.owned;
		}
	}
	
	return prestige;
};

function getScore() {
	var score = 0;
	
	for(x in gamefile.resource) {
		if((typeof gamefile.resource[x] !== 'undefined')) {
			if((typeof gamefile.resource[x].score !== 'undefined')) {
				score = score + gamefile.resource[x].score;
			}
		}
	}
	
	return score;
};

// extra Gamefunctions
//#################################################################

function setFunction(ifunc) {
	eval(ifunc);
};

function setTimewarp(iseconds) {
	
	getAwayInfo(iseconds);
	saveGame();
};

function setRandom(iresourceid,inumber=1) {
	
	var iresource;
	var randomnumber = Math.round(Math.random()*inumber,1);
	
	if((typeof gamefile.resource[iresourceid] !== "undefined")) {
		iresource = gamefile.resource[iresourceid];
		iresource.save.owned = randomnumber;
		iresource.save.bought = randomnumber;
	}
};

function randomNum(numbers, min, max, same=false) {
	var n = [];
	
	while(n.length < numbers){
		var r = Math.floor(Math.random() * max) + min
		if(n.indexOf(r) === -1 || same === true) n.push(r);
	}
	
	return n;
};

function getRandomFromList (list) {
  return list[Math.floor((Math.random()*list.length))];
};

function setEventTimer(iresourceid,iproduce=1,itime=0,day=null,month=null,year=null) {
	var d = new Date();
	var now = new Date();
	
	if(day !== null) {
		d.setDate(day);
	}
	
	if(month !== null) {
		d.setMonth(month-1);
	}
	
	if(year !== null) {
		d.setFullYear(year);
	}
	
	d.setHours(0);
	d.setMilliseconds(0);
	d.setMinutes(0);
	
	gamefile.resource[iresourceid].save.owned = itime - (Math.floor((now - d) / (1000)))*iproduce;
};

function getMoneyLootBox() {

	var name = 'Working'
	var loot = new Array();
	var lootfunc = new Array();
	var outcome = new Array();
	
	loot[0] 		= getPrettify((gamefile.resource['R0'].save.owned)*0.70)+' Money';
	loot[1] 		= getPrettify((gamefile.resource['R0'].save.owned)*0.60)+' Money';
	loot[2] 		= getPrettify((gamefile.resource['R0'].save.owned)*0.70)+' Money';
	loot[3] 		= getPrettify((gamefile.resource['R0'].save.owned)*0.80)+' Money';
	loot[4] 		= getPrettify((gamefile.resource['R0'].save.owned)*0.90)+' Money';
	loot[5] 		= getPrettify((gamefile.resource['R0'].save.owned)*0.95)+' Money';
	
	lootfunc[0] 	= 'buyResource(\'R0\',(gamefile.resource[\'R0\'].save.owned)*0.60,1);buyResource(\'S0\',(gamefile.resource[\'R0\'].save.owned)*0.70,1);addResource(\'S5109\');';
	lootfunc[1] 	= 'buyResource(\'R0\',(gamefile.resource[\'R0\'].save.owned)*0.70,1);buyResource(\'S0\',(gamefile.resource[\'R0\'].save.owned)*0.60,1);addResource(\'S5108\');';
	lootfunc[2] 	= 'buyResource(\'R0\',(gamefile.resource[\'R0\'].save.owned)*0.60,1);buyResource(\'S0\',(gamefile.resource[\'R0\'].save.owned)*0.70,1);addResource(\'S5109\');';
	lootfunc[3] 	= 'buyResource(\'R0\',(gamefile.resource[\'R0\'].save.owned)*0.80,1);buyResource(\'S0\',(gamefile.resource[\'R0\'].save.owned)*0.80,1);addResource(\'S5110\');';
	lootfunc[4] 	= 'buyResource(\'R0\',(gamefile.resource[\'R0\'].save.owned)*0.90,1);buyResource(\'S0\',(gamefile.resource[\'R0\'].save.owned)*0.90,1);addResource(\'S5111\');';
	lootfunc[5] 	= 'buyResource(\'R0\',(gamefile.resource[\'R0\'].save.owned)*0.95,1);buyResource(\'S0\',(gamefile.resource[\'R0\'].save.owned)*0.95,1);addResource(\'S5112\');';
	
	outcome[0] 		= "img/lootbox/lootbox_uncommon.png";
	outcome[1] 		= "img/lootbox/lootbox_common.png";
	outcome[2] 		= "img/lootbox/lootbox_uncommon.png";
	outcome[3] 		= "img/lootbox/lootbox_rare.png";  
	outcome[4] 		= "img/lootbox/lootbox_epic.png";
	outcome[5] 		= "img/lootbox/lootbox_legendary.png";
	
	getLootboxInfo(name,loot,lootfunc,outcome);
};

function getPerkLootBox() {

	var name = 'Improvements'
	var loot = new Array();
	var lootfunc = new Array();
	var outcome = new Array();
	
	loot[0] 		= getPrettify((gamefile.resource['R0'].save.owned)*0.10)+' Money';
	loot[1] 		= 'Discount: Junior';
	loot[2] 		= 'Discount: Buy Option';
	loot[3] 		= 'Discount: Paperclip';
	loot[4] 		= 'Multiplier: Saving';
	loot[5] 		= 'Multiplier: Exp';
	
	lootfunc[0] 	= 'buyResource(\'R0\',(gamefile.resource[\'R0\'].save.owned)*0.10,1);buyResource(\'S0\',(gamefile.resource[\'R0\'].save.owned)*0.10,1);';
	lootfunc[1] 	= 'addResource(\'P051\');buyResource(\'P051\',1,1);';
	lootfunc[2] 	= 'addResource(\'P050\');buyResource(\'P050\',1,1);';
	lootfunc[3] 	= 'addResource(\'P052\');buyResource(\'P052\',1,1);';
	lootfunc[4] 	= 'addResource(\'P053\');buyResource(\'P053\',1,1);';
	lootfunc[5] 	= 'addResource(\'P054\');buyResource(\'P054\',1,1);';
	
	outcome[0] 		= "img/lootbox/perkbox_common.png";
	outcome[1] 		= "img/lootbox/perkbox_uncommon.png";
	outcome[2] 		= "img/lootbox/perkbox_common.png";
	outcome[3] 		= "img/lootbox/perkbox_rare.png";  
	outcome[4] 		= "img/lootbox/perkbox_epic.png";
	outcome[5] 		= "img/lootbox/perkbox_legendary.png";
	
	getLootboxInfo(name,loot,lootfunc,outcome);
};