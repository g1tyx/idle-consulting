// Game Visuales
//#################################################################

function refreshGame(){
	var x = 0;
	var y = 0;
	var s = 0;
	var buymore = 1;
	var hideCategory = 0;
	var hideMenu = 0;
	
	var showmenu = new Array();
	var showmenu_alert = [];
	var showcategory = new Array();
	var showresource = new Array();
	
	var categorycounter_length = 0;
	var categorymax_length = 0;
	
	if((typeof gamefile.save.buymore !== "undefined")) {
		buymore = gamefile.save.buymore;
	}	
	
	// main
	document.title = gamedb.gamename;
	document.getElementById('version_nav').innerHTML = gameversion;
	document.getElementById('gamename_nav').innerHTML = gamedb.gamename;
	document.getElementById('copyright_nav').innerHTML = gamedb.copyright;
	document.getElementById('buymore_number').innerHTML = gamefile.save.buymore;
	
	// clear and add favorite box
	document.getElementById('favorite').innerHTML = '';
	
	// add all resource to favorite box & get categorys
	for(x in gamedb.resource) {
		if((typeof gamefile.resource[x] !== "undefined")) {
			if((typeof gamefile.resource[x].favorite !== "undefined")) {
				if((typeof gamefile.resource[x].hideowned !== "undefined")) {
					document.getElementById('favorite').appendChild(drawFavorite(gamedb.resource[x].id,' ',gamedb.resource[x].icon,'getGameObjInfo(\'' + gamedb.resource[x].id + '\')'));
				}else {
					document.getElementById('favorite').appendChild(drawFavorite(gamedb.resource[x].id,' ' + getPrettify(gamefile.resource[x].save.owned,1),gamedb.resource[x].icon,'getGameObjInfo(\'' + gamedb.resource[x].id + '\')'));
				}				
			}else if(typeof gamefile.resource[x].hide === "undefined") {
				showmenu.push(gamefile.resource[x].menu);
				showcategory.push(gamefile.resource[x].category);
				
				if(typeof gamefile.resource[x].menualert !== "undefined") {
					showmenu_alert[gamefile.resource[x].menu] = '!';
				}else if(showmenu_alert[gamefile.resource[x].menu] !== '!') {
					showmenu_alert[gamefile.resource[x].menu] = '';
				}
			}
		}
	}
	
	// sort menu
	showmenu = Array.from(new Set(showmenu))
	showmenu = showmenu.sort();
	document.getElementById('navbox').innerHTML = '';
	
	// add menu
	for(s in showmenu) {
		x = showmenu[s];
		//document.getElementById('navbox').appendChild(drawNav(x+'_nav',gamedb.menu[x].name,gamedb.menu[x].icon,'showMenu(\''+x+'\');'));
		document.getElementById('navbox').appendChild(drawNav(x+'_nav','',gamedb.menu[x].icon,'showMenu(\''+x+'\');','white',showmenu_alert[x]));
	}
	
	// sort category
	showcategory = Array.from(new Set(showcategory))
	showcategory = showcategory.sort();
	document.getElementById('container').innerHTML = '';
	
	// add category box
	for(s in showcategory) {
		
		x = showcategory[s];
		
		categorycounter_length = 0;
		categorymax_length = 0;
		hideMenu = 0;
		
		for(y in gamedb.resource) {
			
			if((typeof gamedb.menu[gamedb.resource[y].menu].hide !== "undefined")) {
				if(gamedb.menu[gamedb.resource[y].menu].hide === 1) {
					hideMenu = 1;
				}else {
					hideMenu = 0;
				}
			}
			
			if((typeof gamefile.resource[y] !== "undefined") && (typeof gamefile.resource[y].hide === "undefined")) {
				if(gamefile.resource[y].category === x && hideMenu === 0) {
					categorycounter_length++;
				}
			}
			
			if(gamedb.resource[y].category === x && (typeof gamedb.resource[y].hide === "undefined")) {
				categorymax_length++;
			}
		}
		
		if(categorycounter_length === 0) {
			hideCategory = 1;			
		}else {
			hideCategory = 0;
		}
		
		document.getElementById('container').appendChild(drawBox(x,gamedb.category[x].name+' <span class="w3-medium">('+categorycounter_length+'/'+categorymax_length+')</span>',hideCategory));
	}
	
	// sort all resources
	for(x in gamefile.resource) {
		if((typeof gamefile.resource[x].favorite === "undefined") && (typeof gamefile.resource[x].hide === "undefined")) {
			
			if(typeof gamefile.resource[x].menu !== "undefined") {
				if(gamedb.menu[gamedb.resource[x].menu].hide !== 1) {
					if(typeof gamefile.resource[x].buymax !== "undefined") {
						if(gamefile.resource[x].save.bought >= gamefile.resource[x].buymax || (typeof gamefile.resource[x].hideButton !== "undefined")) {
							showresource.push('2_'+gamefile.resource[x].id);
						}else {
							showresource.push('1_'+gamefile.resource[x].id);
						}
					}else if(typeof gamefile.resource[x].buymax === "undefined") {
						showresource.push('0_'+gamefile.resource[x].id);
					}
				}
			}
		}
	}
	
	showresource = Array.from(new Set(showresource))
	showresource = showresource.sort();
	
	// add all resources to box
	for(s in showresource) {
		
		x = showresource[s].substr(2, showresource[s].length);
		
		if((typeof gamefile.resource[x].favorite === "undefined") && (typeof gamefile.resource[x].hide === "undefined")) {
			document.getElementById(gamefile.resource[x].category).appendChild(drawGameObj(gamefile.resource[x].id));
		}
	}
	
	// add margin for header
	document.getElementById('game').style = 'margin-top:' + (document.getElementById('topbar').clientHeight) + 'px;';
	document.getElementById('popup').style = 'margin-top:' + (document.getElementById('topbar').clientHeight) + 'px;';
	document.getElementById('topbar2').style = 'margin-top:' + (document.getElementById('topbar').clientHeight) + 'px;';
};

function drawGameObj(iresourceid){
	
	// Variables
	var gameObj = gamefile.resource[iresourceid];
	var x = 0;
	var progress = 0;
	var progress_avg = 100;
	var progress_n = 1;
	var buymax = 0;
	var buymore = 1;
	var eventtimer = 0;
	var buybutton = 'Buy';
	var gameicon = 'fab fa-btc';
	var gamecolor = 'black';
	
	var hideObj = 0;
	var hideOwned = 0;
	var hideProgress = 1;
	var hideButton = 1;
	
	// Check Variables from gameObj
	if((typeof gameObj.icon !== "undefined")) {
		gameicon = gameObj.icon;
	}
	
	if((typeof gameObj.color !== "undefined")) {
		gamecolor = gameObj.color;
	}
	
	if((typeof gameObj.hide !== "undefined")) {
		hideObj = gameObj.hide;
	}
	
	if((typeof gameObj.hideowned !== "undefined")) {
		hideOwned = gameObj.hideowned;
	}
	
	if((typeof gameObj.eventtimer !== "undefined")) {
		eventtimer = gameObj.eventtimer;
	}
	
	if(typeof gameObj.hideButton !== "undefined") {
		hideButton = 1;
	}else if(typeof gameObj.buymax !== "undefined") {
		if(gameObj.save.bought < gameObj.buymax) {
			hideButton = 0;
		}
	}else if(typeof gameObj.buymax === "undefined") {
		hideButton = 0;
	}
	
	if((typeof gamefile.save.buymore !== "undefined") && (typeof gameObj.buymax === "undefined") && (typeof gameObj.disablebuymore === "undefined") /*&& (gameObj.save.owned > 0 || gameObj.save.bought > 0 )*/) {
		buymore = gamefile.save.buymore;
	}
	
	if((typeof gameObj.buybutton !== "undefined")) {
		buybutton = gameObj.buybutton;
	}
	
	// Mainbox
	var drawObj = document.createElement('div');
	var drawObj_Br = document.createElement('br');
		
	// Container
	var drawObj_Container = document.createElement('div');
	drawObj_Container.setAttribute("class", 'w3-padding');
	drawObj_Container.setAttribute("id", gameObj.category+'_element');
	
	var drawObj_Clear = document.createElement('div');
	drawObj_Clear.setAttribute("class", 'w3-clear');
	
	// Costs	
	if((typeof gameObj.costs !== "undefined")) {
		
		// Resource Costs
		setResourceCosts(gameObj,buymore);
	
		progress_avg = 0;
		progress_n = 0;
	
		for(x in gameObj.costs) {
			if((typeof gameload.resource[x] !== "undefined")) {
				if(gameObj.costs[x] !== 0 && gameload.resource[x].save.owned < gameObj.costs[x]) {
					progress = Math.floor((gameload.resource[x].save.owned/gameObj.costs[x])*100);
					progress_avg = progress_avg + progress;
					progress_n++;
				}
			}
		}
		
		if(progress_n > 0) {
			progress_avg = (progress_avg / progress_n);
		}else {
			progress_avg = 100;
		}
		
		hideProgress = 0;
	}
	
	// Progress
	var progress_color = '';
	
	if(progress_avg >= 0 && progress_avg < 25) {
		progress_color = 'w3-red';
	} else if(progress_avg >= 25 && progress_avg < 50) {
		progress_color = 'w3-orange';
	} else if(progress_avg >= 50 && progress_avg < 75) {
		progress_color = 'w3-amber';
	} else if(progress_avg >= 75 && progress_avg < 100 ) {
		progress_color = 'w3-yellow';
	} else if(progress_avg >= 100){
		progress_color = 'w3-green';
	}
	
	// Buybutton
	var drawObj_Buybutton = document.createElement('div');
	drawObj_Buybutton.setAttribute("style", 'margin-top: 8px;');
	drawObj_Buybutton.setAttribute('id', 'buybutton');
	
	if(progress_avg === 100) {
		drawObj_Buybutton.innerHTML = '<div class="w3-light-grey"><div id="buy_'+gameObj.id+'" class="w3-button w3-left-align ' + progress_color + '" style="width:' + progress_avg +'%" onclick="buyResource(\''+gameObj.id+'\',' + buymore + ',0,event)">' + getPrettify(progress_avg) + '% | ' + buybutton + ' +' + buymore + '</div></div>';
	} else {
		drawObj_Buybutton.innerHTML = '<div class="w3-light-grey"><div id="buy_'+gameObj.id+'" class="w3-button w3-left-align w3-disabled ' + progress_color + '" style="width:' + progress_avg +'%">' + getPrettify(progress_avg) + '% | ' + buybutton + ' +' + buymore + '</div></div>';
	}
	
	// Main
	var drawObj_Main = document.createElement('div');
	drawObj_Main.setAttribute("class", 'w3-row');
	drawObj_Main.setAttribute("style", 'cursor: pointer;');
	drawObj_Main.setAttribute("onclick", 'getGameObjInfo(\'' + gameObj.id + '\')');

	var drawObj_Main_Left = document.createElement('div');
	drawObj_Main_Left.setAttribute("class", 'w3-col s4 w3-text-'+gamecolor);
	drawObj_Main_Left.innerHTML = '<i class="w3-xxxlarge w3-padding-small ' + gameicon + '"></i>';	
	
	var drawObj_Main_Right = document.createElement('div');
	drawObj_Main_Right.setAttribute("class", 'w3-col s8 w3-right-align w3-large');
	drawObj_Main_Right.innerHTML = '<div id="name"><b style="white-space: nowrap;">&nbsp;' + gameObj.name + '</b></div>';
	
	// Numbers
	var drawObj_Numbers = document.createElement('div');
	drawObj_Numbers.setAttribute("id", 'numbers');
	
	if((typeof gameObj.eventtimer !== "undefined") && (typeof gameObj.buymax === "undefined")) {
		drawObj_Numbers.innerHTML = '<span id="owned">' + getTime(gameObj.buymax - gameObj.save.owned) + '&nbsp;</span>';
	}else if((typeof gameObj.eventtimer !== "undefined")) {
		drawObj_Numbers.innerHTML = '<span id="owned">' + getTime(gameObj.save.owned) + '&nbsp;</span>';
	}else if((typeof gameObj.buymax !== "undefined") && (typeof gameObj.hidebuymax === "undefined")) {
		drawObj_Numbers.innerHTML = '<span id="owned">' + getPrettify(gameObj.save.owned) + '/' + getPrettify(gameObj.buymax) + '&nbsp;</span>';
	}else {
		drawObj_Numbers.innerHTML = '<span id="owned">' + getPrettify(gameObj.save.owned) + '&nbsp;</span>';
	}
	
	// Put Objs togehter
	if(hideObj === 0) {
		
		drawObj.setAttribute('class', 'w3-col l3 m5 s12 w3-white w3-card w3-margin-bottom w3-margin-right');
		
		if(hideOwned === 0) {
			drawObj_Main_Right.appendChild(drawObj_Numbers);
		}
		
		drawObj_Main.appendChild(drawObj_Main_Left);
		drawObj_Main.appendChild(drawObj_Main_Right);
		drawObj_Container.appendChild(drawObj_Main);
		
		if(hideButton === 0) {
			drawObj_Container.appendChild(drawObj_Buybutton);
		}
		
		// Main Obj
		drawObj.appendChild(drawObj_Container);
	}
	
	return drawObj;
};

function drawBox(iid,iname,ihide=0){
	var drawObj 		= document.createElement('div');
	var drawObj_Name 	= document.createElement('h3');
	var drawObj_Id 		= document.createElement('div');
	
	if(ihide === 1) {
		drawObj.setAttribute('style', 'display:none');
	}
	
	drawObj.setAttribute('id', iid+'_box');
	drawObj_Id.setAttribute('id', iid);
	drawObj_Id.setAttribute('class', 'w3-row');
	
	drawObj_Name.innerHTML = iname;
	
	drawObj.appendChild(drawObj_Name);
	drawObj.appendChild(drawObj_Id);
	
	return drawObj;
};

function drawAlert(elementId,title,body,button='Okay',color='green') {
	
	history.pushState(null, null, null);
	
	var drawObj_Modal = document.createElement('div');
	var drawObj_Modal_Content = document.createElement('div');
	var drawObj_Modal_Content_Header = document.createElement('header');
	var drawObj_Modal_Content_Container = document.createElement('div');
	var drawObj_Modal_Button = document.createElement('div');
	var drawObj_Modal_Br = document.createElement('br');
	
	drawObj_Modal.setAttribute('id', elementId);
	drawObj_Modal.setAttribute('class', 'w3-modal');
	drawObj_Modal.setAttribute('style', 'z-index:999');
	
	drawObj_Modal_Content.setAttribute('class', 'w3-modal-content');
	drawObj_Modal_Content_Header.setAttribute('class', 'w3-container w3-'+color+' w3-large');
	drawObj_Modal_Content_Header.setAttribute('onclick', 'removeElement(\'' + elementId + '\');');
	drawObj_Modal_Content_Header.setAttribute('style', 'cursor:pointer;');
	drawObj_Modal_Content_Container.setAttribute("class", 'w3-container');
	drawObj_Modal_Button.setAttribute('class', 'w3-light-grey w3-margin');
	
	drawObj_Modal_Content_Header.innerHTML = title;
	drawObj_Modal_Content_Container.innerHTML = '<br/>' + body + '';
	
	if(button !== null) {
		drawObj_Modal_Button.innerHTML = '<div id="okay_button" class="w3-button" style="width:100%" onclick="removeElement(\'' + elementId + '\');">' + button + '</div>';
	}
	
	drawObj_Modal_Content.appendChild(drawObj_Modal_Content_Header);
	drawObj_Modal_Content_Container.appendChild(drawObj_Modal_Button);
	drawObj_Modal_Content.appendChild(drawObj_Modal_Content_Container);

	drawObj_Modal.appendChild(drawObj_Modal_Content);
	
	return drawObj_Modal;
};

function drawNav(elementId,text,icon='',onclick='',color='white' ,alert='') {
	var drawObj_Link = document.createElement('a');
	var drawObj_Icon = document.createElement('i');
	var drawObj_Text = document.createElement('span');
	var drawObj_Alert = document.createElement('span');
	
	drawObj_Link.setAttribute('id', elementId);
	drawObj_Link.setAttribute('onclick', onclick+'closeNav();');
	drawObj_Link.setAttribute('class', 'w3-bar-item w3-large w3-button w3-'+color);
	drawObj_Link.setAttribute('style', 'position:relative;');
	drawObj_Icon.setAttribute('class', 'w3-center '+icon);
	drawObj_Icon.setAttribute('style', 'height:25px;width:25px;');
	drawObj_Alert.setAttribute('class', 'w3-badge w3-red w3-tiny');
	drawObj_Alert.setAttribute('style', 'position:absolute;top:2px;right:2px;');
	
	drawObj_Text.innerHTML = ' '+text;
	drawObj_Alert.innerHTML = alert;
	
	drawObj_Link.appendChild(drawObj_Icon);
	drawObj_Link.appendChild(drawObj_Text);
	
	if(alert != '') {
		drawObj_Link.appendChild(drawObj_Alert);
	}
	
	return drawObj_Link;
};

function drawPopup(elementId,text,icon='',onclick='',time=5000) {

	var drawObj_Popup = document.createElement('div');
	var drawObj_Container0 = document.createElement('div');
	var drawObj_Container1 = document.createElement('div');
	var drawObj_Container2 = document.createElement('div');
	var drawObj_Icon = document.createElement('i');
	var drawObj_Text = document.createElement('span');
	var drawObj_Close = document.createElement('i');
	var drawObj_Script = document.createElement('script');
	
	drawObj_Popup.setAttribute('id', 'popup_' + elementId);
	drawObj_Popup.setAttribute('class', 'w3-panel w3-pale-green w3-animate-top');
	
	drawObj_Container0.setAttribute('class', 'w3-row w3-margin-top w3-margin-bottom');
	
	drawObj_Container1.setAttribute('class', 'w3-col l11 m11 s11');
	drawObj_Container1.setAttribute('style', 'cursor: pointer;');
	drawObj_Container1.setAttribute('onclick', 'removeElement(\'' + 'popup_' + elementId + '\');'+onclick);
	
	drawObj_Container2.setAttribute('class', 'w3-col l1 m1 s1 w3-center');
	drawObj_Container2.setAttribute('style', 'cursor: pointer;');	
	drawObj_Container2.setAttribute('onclick', 'removeElement(\'' + 'popup_' + elementId + '\');');
	
	drawObj_Icon.setAttribute('class', 'w3-large ' + icon);
	
	drawObj_Text.innerHTML = ' '+text;
	
	drawObj_Close.setAttribute('class', 'w3-large fas fa-times');
	
	drawObj_Script.innerHTML = 'var v'+ elementId +' = window.setInterval(function(){ removeElement(\'' + 'popup_' + elementId + '\'); clearInterval(v'+ elementId +'); v'+ elementId +' = false; },'+time+')';
	
	drawObj_Container1.appendChild(drawObj_Icon);
	drawObj_Container1.appendChild(drawObj_Text);
	drawObj_Container2.appendChild(drawObj_Close);
	
	drawObj_Container0.appendChild(drawObj_Container1);
	drawObj_Container0.appendChild(drawObj_Container2);
	
	drawObj_Popup.appendChild(drawObj_Container0);
	drawObj_Popup.appendChild(drawObj_Script);
	
	return drawObj_Popup;
};

function drawFavorite(elementId,text,icon='',onclick='') {

	var drawObj_Favorite = document.createElement('div');
	var drawObj_Container = document.createElement('div');
	var drawObj_Icon = document.createElement('i');
	var drawObj_Text = document.createElement('span');
	
	drawObj_Favorite.setAttribute('id', 'favorite_' + elementId);
	drawObj_Favorite.setAttribute('class', 'w3-cell w3-padding-small ');
	drawObj_Container.setAttribute('style', 'cursor: pointer;');
	drawObj_Container.setAttribute('onclick', onclick);
	drawObj_Icon.setAttribute('class', 'w3-large ' + icon);
	drawObj_Text.setAttribute('class', 'w3-medium ');
	
	drawObj_Text.innerHTML = ' '+text+' ';
	
	drawObj_Container.appendChild(drawObj_Text);
	drawObj_Container.appendChild(drawObj_Icon);	
	
	drawObj_Favorite.appendChild(drawObj_Container);
	
	return drawObj_Favorite;
};

function getGameObjInfo(iresourceid) {
	
	// Variables
	var gameObj = gamefile.resource[iresourceid];	//console.log(gameObj); // DEV
	var x = 0;	
	var buymax = 0;
	var gameicon = 'fab fa-btc';
	var resourcegain = 0.00;
	var resourcemultiplier = 0.00;
	var costdiscount = 0.00;
	var costtime = 0.00;
	var profit = 0.00;
	var profit_multiplier = 0.00;
	var buymore = 1;
	
	var hideOwned = 0;
	var hideCosts = 1;
	var hideProduce = 1;
	var hideProduceMulti = 1;
	var hideDiscount = 1;
	var hideProfit = 1;
	var hideProfitMultiplier = 1;
	var hideAll = 0;
	var positivnumber = '+';
	
	var alert_id = '';
	var alert_name = '';
	var alert_message = '';
	
	// Check Variables from gameObj
	if((typeof gameObj.icon !== "undefined")) {
		gameicon = gameObj.icon;
	}
	
	if((typeof gameObj.hideowned !== "undefined")) {
		hideOwned = gameObj.hideowned;
	}
	
	if(typeof gameObj.buymax !== "undefined") {
		if(gameObj.save.bought < gameObj.buymax) {
			hideCosts = 0;
		}
	}else if(typeof gameObj.buymax === "undefined") {
		hideCosts = 0;
	}
	
	if((typeof gameObj.produce !== "undefined")) {
		hideProduce = 0;
	}
	
	if((typeof gameObj.produce_multiplier !== "undefined")) {
		hideProduceMulti = 0;
	}
	
	if((typeof gamefile.save.buymore !== "undefined") && (typeof gameObj.buymax === "undefined") && (typeof gameObj.disablebuymore === "undefined")) {
		buymore = gamefile.save.buymore;
	}
	
	if((typeof gameObj.discount !== "undefined")) {
		hideDiscount = 0;
	}
	
	if((typeof gameObj.profit !== "undefined")) {
		hideProfit = 0;
	}
	
	if((typeof gameObj.profit_multiplier !== "undefined")) {
		hideProfitMultiplier = 0;
	}
	
	if((typeof gameObj.eventtimer !== "undefined")) {
		hideAll = 1;
	}
	
	// Name
	var drawObj_Name = document.createElement('div');
	drawObj_Name.innerHTML = '<h3><i class="w3-xxxlarge ' + gameicon + '"></i>&nbsp;<b class="w3-right">' + gameObj.name + '</b></h3>';
	
	// Infos
	var drawObj_Infos = document.createElement('div');
	drawObj_Infos.setAttribute('class', 'w3-margin-bottom');
	drawObj_Infos.innerHTML = '<i>' + gameObj.info + '</i>';
	
	// Owned
	var drawObj_Owned = document.createElement('div');
	drawObj_Owned.setAttribute('class', 'w3-margin-bottom');
	drawObj_Owned.innerHTML = '';
	drawObj_Owned.innerHTML = drawObj_Owned.innerHTML + '<h4 id="owned">Owned: ' + getPrettify(gameObj.save.owned) + '</h4>';
	
	if(hideCosts === 0 && gameObj.save.bought !== gameObj.save.owned) {
		drawObj_Owned.innerHTML = drawObj_Owned.innerHTML + '<h4 id="bought">Bought: ' + getPrettify(gameObj.save.bought) + '</h4>';
	}
	
	// Costs
	var costtimetext = '';
	var drawObj_Costs = document.createElement('div');
	var drawObj_Costs_li = document.createElement('ul');
	drawObj_Costs.setAttribute('class', 'w3-margin-bottom');
	drawObj_Costs.innerHTML = '<h4><u>Costs</u<></h4>';
	
	if((typeof gameObj.costs !== "undefined")) {
		
		for(x in gameObj.costs) {
			if(typeof gamedb.resource[x].hide === "undefined" && gameObj.costs[x] > 0) {
				
				if(typeof gamefile.resource[x] !== "undefined") {
					costtime = (gameObj.costs[x] - gamefile.resource[x].save.owned);
					
					if(costtime > 0 && getResourceGain(x) !== 0) {
						costtime = costtime / getResourceGain(x);
						costtimetext = '(~' + getTime(costtime) + ')';
					}else {
						costtimetext = '';
					}
				}else {
					costtimetext = '';
				}
				
				drawObj_Costs_li.innerHTML = drawObj_Costs_li.innerHTML + '<li><h5>' + gamedb.resource[x].name + ': ' + getPrettify((-1 * gameObj.costs[x])) + ' ' + costtimetext + '</h5></li>';
			}
		}
	}
	
	drawObj_Costs.appendChild(drawObj_Costs_li);
	
	// Gain
	var drawObj_Gain = document.createElement('div');
	var drawObj_Gain_li = document.createElement('ul');
	drawObj_Gain.setAttribute('class', 'w3-margin-bottom');
	drawObj_Gain.innerHTML = '<h4><u>Gain</u<></h4>';
	
	if((typeof gameObj.costs !== "undefined")) {
		
		for(x in gameObj.costs) {
			if(typeof gamedb.resource[x].hide === "undefined" && gameObj.costs[x] < 0) {
				
				drawObj_Gain_li.innerHTML = drawObj_Gain_li.innerHTML + '<li><h5>' + gamedb.resource[x].name + ': ' + getPrettify((-1 * gameObj.costs[x])) + '</h5></li>';
			}
		}
	}
	
	drawObj_Gain.appendChild(drawObj_Gain_li);
	
	// Resource Multiplier
	var drawObj_ResourceMultiplier = document.createElement('div');
	drawObj_ResourceMultiplier.setAttribute('class', 'w3-margin-bottom');
	drawObj_ResourceMultiplier.innerHTML = '';
	
	for(x in gamefile.resource) {
		if((typeof gamefile.resource[x].produce_multiplier !== "undefined") && (typeof gamefile.resource[x].save.owned !== "undefined")) {
			if((typeof gamefile.resource[x].produce_multiplier[iresourceid] !== "undefined")) {
				resourcemultiplier = resourcemultiplier + (gamefile.resource[x].save.owned * gamefile.resource[x].produce_multiplier[iresourceid]);
			}
		}
	}
	
	drawObj_ResourceMultiplier.innerHTML = drawObj_ResourceMultiplier.innerHTML + '<h4 id="gain">Produce Multiplier: x' + getPrettify(resourcemultiplier,2,true) + '</h4>';
	
	// Produce Multiplier
	var drawObj_Produce_Multi = document.createElement('div');
	var drawObj_Produce_Multi_li = document.createElement('ul');
	drawObj_Produce_Multi.setAttribute('class', 'w3-margin-bottom');
	drawObj_Produce_Multi.innerHTML = '<h4><u>Multiplier</u></h4>';
	
	if((typeof gameObj.produce_multiplier !== "undefined")) {
		for(x in gameObj.produce_multiplier) {
			if((typeof gameObj.hide === "undefined")) {
				drawObj_Produce_Multi_li.innerHTML = drawObj_Produce_Multi_li.innerHTML + '<li><h5>' + gamedb.resource[x].name + ': x' + getPrettify(gameObj.produce_multiplier[x],2,true) + '' + '</h5></li>';
			}
		}
	}
	
	drawObj_Produce_Multi.appendChild(drawObj_Produce_Multi_li);
	
	// Produce
	var drawObj_Produce = document.createElement('div');
	var drawObj_Produce_li = document.createElement('ul');
	drawObj_Produce.setAttribute('class', 'w3-margin-bottom');
	drawObj_Produce.innerHTML = '<h4><u>Produce</u></h4>';
	
	if((typeof gameObj.produce !== "undefined")) {
		for(x in gameObj.produce) {
			if(typeof gamedb.resource[x].hide === "undefined") {
				
				if(gameObj.produce[x] < 0) {
					positivnumber = '';
				}else {
					positivnumber = '+';
				}
				
				if(resourcemultiplier === 0) {
					drawObj_Produce_li.innerHTML = drawObj_Produce_li.innerHTML + '<li><h5>' + gamedb.resource[x].name + ': ' + getPrettify(gameObj.save.owned * gameObj.produce[x]) + '/s' + ' (' + positivnumber + getPrettify(gameObj.produce[x] * buymore) + ' /s)' + '</h5></li>';
				} else {
					drawObj_Produce_li.innerHTML = drawObj_Produce_li.innerHTML + '<li><h5>' + gamedb.resource[x].name + ': ' + getPrettify(gameObj.save.owned * gameObj.produce[x] * resourcemultiplier) + '/s' + ' (' + positivnumber + getPrettify(gameObj.produce[x] * resourcemultiplier * buymore) + '/s)' + '</h5></li>';
				}
			}
		}
	}
	
	drawObj_Produce.appendChild(drawObj_Produce_li);
	
	// Discount
	var drawObj_Discount = document.createElement('div');
	var drawObj_Discount_li = document.createElement('ul');
	drawObj_Discount.setAttribute('class', 'w3-margin-bottom');
	drawObj_Discount.innerHTML = '<h4><u>Discount</u></h4>';
	
	if((typeof gameObj.discount !== "undefined")) {
		for(x in gameObj.discount) {
			if(typeof gamedb.resource[x].hide === "undefined") {
				if(hideCosts === 0) {
					drawObj_Discount_li.innerHTML = drawObj_Discount_li.innerHTML + '<li><h5>' + gamedb.resource[x].name + ': ' + getPrettify(gameObj.save.owned) + 'x' + getPrettify(gameObj.discount[x] * 100) + '%' + ' (+' + buymore + 'x' + getPrettify(gameObj.discount[x] * 100) + '%)' + '</h5></li>';
				}else {
					drawObj_Discount_li.innerHTML = drawObj_Discount_li.innerHTML + '<li><h5>' + gamedb.resource[x].name + ': ' + ' +' + getPrettify(gameObj.save.owned) + 'x' + getPrettify(gameObj.discount[x] * 100) + '%' + '</h5></li>';
				}
			}
		}
	}
	
	drawObj_Discount.appendChild(drawObj_Discount_li);
	
	// Profit
	var drawObj_Profit = document.createElement('div');
	var drawObj_Profit_li = document.createElement('ul');
	drawObj_Profit.setAttribute('class', 'w3-margin-bottom');
	drawObj_Profit.innerHTML = '<h4><u>Profit</u></h4>';
	
	if((typeof gameObj.profit !== "undefined")) {
		for(x in gameObj.profit) {
			if(typeof gamedb.resource[x].hide === "undefined") {
				if(hideCosts === 0) {
					drawObj_Profit_li.innerHTML = drawObj_Profit_li.innerHTML + '<li><h5>' + gamedb.resource[x].name + ': ' + getPrettify(gameObj.save.owned) + 'x' + getPrettify(gameObj.profit[x] * 100,2,true) + '%' + ' (+' + buymore + 'x' + getPrettify(gameObj.profit[x] * 100,2,true) + '%)' + '</h5></li>';
				}else {
					drawObj_Profit_li.innerHTML = drawObj_Profit_li.innerHTML + '<li><h5>' + gamedb.resource[x].name + ': ' + ' +' + getPrettify(gameObj.save.owned) + 'x' + getPrettify(gameObj.profit[x] * 100,2,true) + '%' + '</h5></li>';
				}
			}
		}
	}
	
	drawObj_Profit.appendChild(drawObj_Profit_li);
	
	// Profit Multiplier
	var drawObj_Profit_Multiplier = document.createElement('div');
	var drawObj_Profit__Multiplier_li = document.createElement('ul');
	drawObj_Profit_Multiplier.setAttribute('class', 'w3-margin-bottom');
	drawObj_Profit_Multiplier.innerHTML = '<h4><u>Profit Multiplier</u></h4>';
	
	if((typeof gameObj.profit_multiplier !== "undefined")) {
		for(x in gameObj.profit_multiplier) {
			if(typeof gamedb.resource[x].hide === "undefined") {
				if(hideCosts === 0) {
					drawObj_Profit__Multiplier_li.innerHTML = drawObj_Profit__Multiplier_li.innerHTML + '<li><h5>' + gamedb.resource[x].name + ': ' + getPrettify(gameObj.save.owned) + 'x' + getPrettify(gameObj.profit_multiplier[x],2,true) + ' (+' + buymore + 'x' + getPrettify(gameObj.profit_multiplier[x],2,true) + ')' + '</h5></li>';
				}else {
					drawObj_Profit__Multiplier_li.innerHTML = drawObj_Profit__Multiplier_li.innerHTML + '<li><h5>' + gamedb.resource[x].name + ': ' + ' +' + getPrettify(gameObj.save.owned) + 'x' + getPrettify(gameObj.profit_multiplier[x],2,true) + '</h5></li>';
				}
			}
		}
	}
	
	drawObj_Profit_Multiplier.appendChild(drawObj_Profit__Multiplier_li);
	
	// Resource Gain
	var drawObj_ResourceGain = document.createElement('div');
	drawObj_ResourceGain.setAttribute('class', 'w3-margin-bottom');
	drawObj_ResourceGain.innerHTML = '';
	
	resourcegain = getResourceGain(iresourceid);
	
	drawObj_ResourceGain.innerHTML = drawObj_ResourceGain.innerHTML + '<h4 id="gain">Base Gain: ' + getPrettify(resourcegain) + '/s</h4>';
	
	// Cost Discount
	var drawObj_CostDiscount = document.createElement('div');
	drawObj_CostDiscount.setAttribute('class', 'w3-margin-bottom');
	drawObj_CostDiscount.innerHTML = '';
	
	costdiscount = 100 - getDiscount(iresourceid) * 100;
	drawObj_CostDiscount.innerHTML = drawObj_CostDiscount.innerHTML + '<h4 id="gain">Cost Discount: ' + getPrettify(costdiscount) + '%</h4>';
	
	// Profit Gain
	var drawObj_ProfitGain = document.createElement('div');
	drawObj_ProfitGain.setAttribute('class', 'w3-margin-bottom');
	drawObj_ProfitGain.innerHTML = '';
	
	profit = getProfit(iresourceid) * 100;	
	drawObj_ProfitGain.innerHTML = drawObj_ProfitGain.innerHTML + '<h4 id="gain">Profit: ' + getPrettify(profit) + '%</h4>';
	
	// Container
	var drawObj_Container = document.createElement('div');
	drawObj_Container.appendChild(drawObj_Infos);
	
	if(hideOwned === 0 && hideAll === 0) {
		drawObj_Container.appendChild(drawObj_Owned);
	}
	
	if(profit > 100 && hideAll === 0) {
		drawObj_Container.appendChild(drawObj_ProfitGain);
	}
	
	if(resourcegain !== 0 && hideAll === 0) {
		drawObj_Container.appendChild(drawObj_ResourceGain);
	}
	
	if(resourcemultiplier !== 0 && hideAll === 0) {
		drawObj_Container.appendChild(drawObj_ResourceMultiplier);
	}
	
	if(costdiscount !== 0 && hideAll === 0) {
		drawObj_Container.appendChild(drawObj_CostDiscount);
	}
	
	if(hideCosts === 0 && drawObj_Costs_li.innerHTML !== '' && hideAll === 0) {
		drawObj_Container.appendChild(drawObj_Costs);
	}
	
	if(hideCosts === 0 && drawObj_Gain_li.innerHTML !== '' && hideAll === 0) {
		drawObj_Container.appendChild(drawObj_Gain);
	}
	
	if(hideProduce === 0  && drawObj_Produce_li.innerHTML !== '' && hideAll === 0) {
		drawObj_Container.appendChild(drawObj_Produce);
	}
	
	if(hideProduceMulti === 0 && hideAll === 0) {
		drawObj_Container.appendChild(drawObj_Produce_Multi);
	}
	
	if(hideDiscount === 0 && hideAll === 0) {
		drawObj_Container.appendChild(drawObj_Discount);
	}
	
	if(hideProfit === 0 && hideAll === 0) {
		drawObj_Container.appendChild(drawObj_Profit);
	}
	
	if(hideProfitMultiplier === 0 && hideAll === 0) {
		drawObj_Container.appendChild(drawObj_Profit_Multiplier);
	}
	
	// Get gameObj data
	alert_id = gameObj.id+'_alert';
	alert_name = drawObj_Name.innerHTML;
	alert_message = drawObj_Container.innerHTML;
	
	// Output
	document.getElementById('alert').appendChild(drawAlert(alert_id,alert_name,alert_message));
	document.getElementById(gameObj.id+'_alert').style.display='block'
};

function getAwayInfo(iseconds=null) {
	var x = 0;
	var resourcegaintext = '';
	var ads = '';
	var lastseconds = Math.floor((Date.now() - gamefile.save.lastlogin)/1000);
	var hide = 0;
	
	if(iseconds !== null) {
		lastseconds = iseconds;
	}
	
	for(x in gamefile.resource) {
		
		hide = 0;
		
		if((typeof gamefile.resource[x].hide !== "undefined")) {
			hide = 1;
		}
		
		if((typeof gamefile.resource[x].eventtimer !== "undefined")) {
			hide = 1;
		}
		
		if((getResourceGain(gamefile.resource[x].id) * lastseconds) !== 0){
			
			if(hide === 0) {
				resourcegaintext = resourcegaintext + '<tr><td><b class="w3-large w3-padding-large">' + gamefile.resource[x].name + '</b></td><td>' + getPrettify(getResourceGain(gamefile.resource[x].id) * lastseconds) + '</td></tr>';
			}
			
			gamefile.resource[x].save.owned = gamefile.resource[x].save.owned + (getResourceGain(gamefile.resource[x].id) * lastseconds);
		}
	}
	
	if(lastseconds >= 10) {
		away_message = '';
		away_message = away_message + 'You were away for ' + getTime(lastseconds) + '!' + '<br/><br/>';
		
		if(resourcegaintext !== '') {
			away_message = away_message + '<table class="w3-table w3-bordered">' + resourcegaintext + '</table><br/>';
		}
		
		document.getElementById('alert').appendChild(drawAlert('away_alert','<h2><b>Welcome Back</b></h2>',away_message));
		document.getElementById('away_alert').style.display='block'
	}
};

function getPrestigeInfo() {
	
	// Header
	var drawObj_Name = document.createElement('div');
	drawObj_Name.innerHTML = '<h1><i class="w3-xxxlarge fas fa-infinity"></i>&nbsp;<b class="w3-right">Prestige</b></h1>';
	
	// Info
	var drawObj_Infos = document.createElement('div');
	drawObj_Infos.setAttribute('class', 'w3-center');
	drawObj_Infos.innerHTML = '<h2>Do you want to start with a new company?</h2><p class="w3-large">You earn prestige points and profit bonus!</p>';
	
	// Number 
	var drawObj_Number = document.createElement('h3');
	drawObj_Number.innerHTML = getPrettify(getPrestigeEarning(),2) + ' Prestige';
	
	// Lifetimesavings 
	var drawObj_Number2 = document.createElement('h6');
	drawObj_Number2.innerHTML = 'Savings: ' + getPrettify(getLifetimeSavings(),3);
	
	//Button
	var drawObj_Button = document.createElement('div');
	drawObj_Button.setAttribute('class', 'w3-light-grey w3-margin');
	drawObj_Button.innerHTML = drawObj_Button.innerHTML + '<div class="w3-button w3-red" style="width:100%" onclick="setPrestige();">Yes, restart the game!</div>';
	
	// Container
	var drawObj_Container = document.createElement('div');
	drawObj_Infos.appendChild(drawObj_Number);
	drawObj_Infos.appendChild(drawObj_Number2);
	drawObj_Container.appendChild(drawObj_Infos);
	drawObj_Container.appendChild(drawObj_Button);
	
	// Get gameObj data
	alert_id = 'prestige_alert';
	alert_name = drawObj_Name.innerHTML;
	alert_message = drawObj_Container.innerHTML;
	
	// Output
	document.getElementById('alert').appendChild(drawAlert(alert_id,alert_name,alert_message,'No not yet!'));
	document.getElementById('prestige_alert').style.display='block'
	
	closeNav();
};

function getAscensionInfo() {
	
	// Header
	var drawObj_Name = document.createElement('div');
	drawObj_Name.innerHTML = '<h1><i class="w3-xxxlarge fas fa-trophy"></i>&nbsp;<b class="w3-right">Ascension</b></h1>';
	
	// Info
	var drawObj_Infos = document.createElement('div');
	drawObj_Infos.setAttribute('class', 'w3-center');
	drawObj_Infos.innerHTML = '<h2>Do you want to ascend your company?</h2><p class="w3-large">This will restart some of your progress!</p>';
	
	// Number 
	var drawObj_Number = document.createElement('h3');
	drawObj_Number.innerHTML = '+1 Ascension Level';
	
	//Button
	var drawObj_Button = document.createElement('div');
	drawObj_Button.setAttribute('class', 'w3-light-grey w3-margin');
	drawObj_Button.innerHTML = drawObj_Button.innerHTML + '<div class="w3-button w3-purple" style="width:100%" onclick="setAscension();">Yes, ascend the game!</div>';
	
	// Container
	var drawObj_Container = document.createElement('div');
	drawObj_Infos.appendChild(drawObj_Number);
	drawObj_Container.appendChild(drawObj_Infos);
	drawObj_Container.appendChild(drawObj_Button);
	
	// Get gameObj data
	alert_id = 'ascension_alert';
	alert_name = drawObj_Name.innerHTML;
	alert_message = drawObj_Container.innerHTML;
	
	// Output
	document.getElementById('alert').appendChild(drawAlert(alert_id,alert_name,alert_message,'No not yet!'));
	document.getElementById('ascension_alert').style.display='block'
	
	closeNav();
};

function getSavegameInfo() {
	
	// Variables
	var upload;
	var alert_id = 'sync_alert';
	var syncid = Math.round(Math.random()*100000000000000000,0);;
	
	if(typeof gamefile.save.sync !== 'undefined') {
		syncid = gamefile.save.sync;
	}else {
		gamefile.save.sync = syncid;
	}
	
	// load saveGame if exists in local storeage
	var compressed_upload = localStorage.getItem('saveGamefile' + '_' + gamesaveversion);

	if(compressed_upload !== null) {
		upload = btoa((LZString.decompressFromUTF16(compressed_upload)));
	}
	
	// Header
	var drawObj_Name = document.createElement('div');
	drawObj_Name.innerHTML = '<h1><i class="w3-xxxlarge fa fa-cog fa-fw"></i>&nbsp;<b class="w3-right">Savegame</b></h1>';
	
	// Savegame
	var drawObj_Savegame = document.createElement('div');
	drawObj_Savegame.innerHTML = '<form class="w3-container"><label>Savegame</label><input id="savegame" class="w3-input" type="text" value="'+upload+'"></form>';
	
	// Import
	var drawObj_Import = document.createElement('div');
	drawObj_Import.setAttribute('class', 'w3-container w3-cell-row w3-margin-top');
	drawObj_Import.innerHTML = '<div class="w3-cell w3-button w3-green" onclick="importGame(document.getElementById(\'savegame\').value);removeElement(\''+alert_id+'\');">Import</div>';	
	
	// Sync code
	var drawObj_SyncCode = document.createElement('div');
	drawObj_SyncCode.setAttribute('class', 'w3-margin-top');
	drawObj_SyncCode.innerHTML = '<form class="w3-container"><label>Sync-Code</label><input id="syncode" class="w3-input" type="text" value="'+syncid+'"></form>';
	
	// Download Button
	var drawObj_DownloadButton = document.createElement('div');
	drawObj_DownloadButton.setAttribute('class', 'w3-container w3-cell-row w3-margin-top');
	drawObj_DownloadButton.innerHTML = '<div class="w3-cell w3-button w3-yellow" onclick="syncDownloadGame();removeElement(\''+alert_id+'\');">Download</div>';
	
	// Upload Button
	var drawObj_UploadButton = document.createElement('div');
	drawObj_UploadButton.setAttribute('class', 'w3-container w3-cell-row w3-margin-top');
	drawObj_UploadButton.innerHTML = '<div class="w3-cell w3-button w3-orange" onclick="syncUploadGame(true);removeElement(\''+alert_id+'\');">Upload</div>';
	
	// Delete Button
	var drawObj_DeleteButton = document.createElement('div');
	drawObj_DeleteButton.setAttribute('class', 'w3-container w3-cell-row w3-margin-top');
	drawObj_DeleteButton.innerHTML = '<div class="w3-cell w3-button w3-red" onclick="getDeleteInfo();removeElement(\''+alert_id+'\');">Delete</div>';
	
	// Break
	var drawObj_Break = document.createElement('br');
	
	// Container
	var drawObj_Container = document.createElement('div');
	drawObj_Container.appendChild(drawObj_Savegame);
	drawObj_Container.appendChild(drawObj_Import);
	drawObj_Container.appendChild(drawObj_DeleteButton);
	
	//drawObj_Container.appendChild(drawObj_SyncCode);
	//drawObj_Container.appendChild(drawObj_DownloadButton);
	//drawObj_Container.appendChild(drawObj_UploadButton);
	drawObj_Container.appendChild(drawObj_Break);	
	
	// Get gameObj data
	alert_name = drawObj_Name.innerHTML;
	alert_message = drawObj_Container.innerHTML;
	
	// Output
	document.getElementById('alert').appendChild(drawAlert(alert_id,alert_name,alert_message,'Close'));
	document.getElementById(alert_id).style.display='block'
	
	closeNav();
};

function getStatisticsInfo() {
	// Variables
	var x;
	var score = 0;
	var alert_id = 'statistics_alert';
	
	// Header
	var drawObj_Name = document.createElement('div');
	drawObj_Name.innerHTML = '<h1><i class="w3-xxxlarge fas fa-chart-bar"></i>&nbsp;<b class="w3-right">Statistics</b></h1>';
	
	// Create
	var create = gamefile.save.create;
	var utc = new Date(create).toJSON().slice(0,10).replace(/-/g,'/');
	
	var drawObj_Create = document.createElement('tr');
	drawObj_Create.innerHTML = '<td><b class="w3-large w3-padding-large">Save created</b></td><td>'+utc+'</td>';
	
	// Timer
	var drawObj_Timer = document.createElement('tr');
	drawObj_Timer.innerHTML = '<td><b class="w3-large w3-padding-large">Timer</b></td><td>'+getTime(gamefile.resource['C02'].save.owned)+'</td>';
	
	// Clicks
	var drawObj_Clicks = document.createElement('tr');
	drawObj_Clicks.innerHTML = '<td><b class="w3-large w3-padding-large">Clicks</b></td><td>'+getPrettify(gamefile.resource['C01'].save.owned)+'</td>';
	
	// Prestige Run
	var drawObj_Prestige = document.createElement('tr');
	drawObj_Prestige.innerHTML = '<td><b class="w3-large w3-padding-large">Prestige Run</b></td><td>'+getPrettify(gamefile.resource['C03'].save.owned)+'</td>';
	
	// Prestige Timer
	var drawObj_PrestigeTimer = document.createElement('tr');
	drawObj_PrestigeTimer.innerHTML = '<td><b class="w3-large w3-padding-large">Prestige Timer</b></td><td>'+getTime(gamefile.resource['C04'].save.owned)+'</td>';
	
	// Prestige Clicks
	var drawObj_PrestigeClicks = document.createElement('tr');
	drawObj_PrestigeClicks.innerHTML = '<td><b class="w3-large w3-padding-large">Prestige Clicks</b></td><td>'+getPrettify(gamefile.resource['C06'].save.owned)+'</td>';
	
	// Ascension Timer
	var drawObj_AscensionTimer = document.createElement('tr');
	drawObj_AscensionTimer.innerHTML = '<td><b class="w3-large w3-padding-large">Ascension Timer</b></td><td>'+getTime(gamefile.resource['C07'].save.owned)+'</td>';
	
	// Ascension Clicks
	var drawObj_AscensionClicks = document.createElement('tr');
	drawObj_AscensionClicks.innerHTML = '<td><b class="w3-large w3-padding-large">Ascension Clicks</b></td><td>'+getPrettify(gamefile.resource['C08'].save.owned)+'</td>';
	
	// Score
	var drawObj_Score = document.createElement('tr');
	drawObj_Score.innerHTML = '<td><b class="w3-large w3-padding-large">Score</b></td><td>'+getScore()+'</td>';
	
	// Container
	var drawObj_Container = document.createElement('div');
	drawObj_Container.setAttribute('class', 'w3-container');
	
	var drawObj_List = document.createElement('table');
	drawObj_List.setAttribute('class', 'w3-table w3-bordered');
	
	drawObj_List.appendChild(drawObj_Create);
	drawObj_List.appendChild(drawObj_Timer);
	drawObj_List.appendChild(drawObj_Clicks);
	
	// Prestige
	if((typeof gamefile.resource['C03'] !== 'undefined')) {
		if(gamefile.resource['C03'].save.owned > 0) {
			drawObj_List.appendChild(drawObj_Prestige);
			drawObj_List.appendChild(drawObj_PrestigeTimer);
			drawObj_List.appendChild(drawObj_PrestigeClicks);
		}
	}
	
	// Ascension
	if((typeof gamefile.resource['A0'] !== 'undefined')) {
		if(gamefile.resource['A0'].save.owned > 0) {
			drawObj_List.appendChild(drawObj_AscensionTimer);
			drawObj_List.appendChild(drawObj_AscensionClicks);
		}
	}
	
	drawObj_List.appendChild(drawObj_Score);
	drawObj_Container.appendChild(drawObj_List);
	drawObj_Container.appendChild(document.createElement('br'));
	
	// Get gameObj data
	alert_name = drawObj_Name.innerHTML;
	alert_message = drawObj_Container.innerHTML;
	
	// Output
	document.getElementById('alert').appendChild(drawAlert(alert_id,alert_name,alert_message));
	document.getElementById(alert_id).style.display='block'
	
	closeNav();
};

function getDeleteInfo() {
	
	// Variables
	var alert_id = 'delete_alert';
	
	// Header
	var drawObj_Name = document.createElement('div');
	drawObj_Name.innerHTML = '<h1><i class="w3-xxxlarge fa fa-cog fa-fw"></i>&nbsp;<b class="w3-right">Delete</b></h1>';
	
	// Info
	var drawObj_Infos = document.createElement('div');
	drawObj_Infos.setAttribute('class', 'w3-center');
	drawObj_Infos.innerHTML = '<h2>Do you really really want to delete your save?</h2><br/>';
	
	//Button
	var drawObj_Button = document.createElement('div');
	drawObj_Button.setAttribute('class', 'w3-light-grey w3-margin');
	drawObj_Button.innerHTML = drawObj_Button.innerHTML + '<div class="w3-button w3-red" style="width:100%" onclick="deleteGame();removeElement(\''+alert_id+'\');">Yes, delete the savegame!</div>';
	
	// Container
	var drawObj_Container = document.createElement('div');
	drawObj_Container.appendChild(drawObj_Infos);
	drawObj_Container.appendChild(drawObj_Button);
	
	// Get gameObj data
	alert_name = drawObj_Name.innerHTML;
	alert_message = drawObj_Container.innerHTML;
	
	// Output
	document.getElementById('alert').appendChild(drawAlert(alert_id,alert_name,alert_message,'Wait, noooooooooo!'));
	document.getElementById(alert_id).style.display='block'
	
	closeNav();
};

function spin(canvasid='',outcome=[],wantednumber=null,CallOnStop=function(){}){

	// Input
	var canvas = document.getElementById(canvasid);
	var wanted = 1;
	
	if(wantednumber === null) {
		wanted = (Math.floor(Math.random() * outcome.length) + 1);
	}else {
		wanted = wantednumber-1;
	}
	
	// Variables
	var xVel = 50;
	var accel = -0.1;
	var cwidth = 250;
	var centerEnd = 3.6;
	
	var rlocation = new Array();
	var imgArray = new Array();
	
	var frequency = 15 + (Math.floor(Math.random() * 3) + 1);
	canvas.width = cwidth;
	
	// Load amount of pictures used
	for(var x=0;x<outcome.length;x++) {
		imgArray[x] = new Image();
		imgArray[x].src = outcome[x];
		imgArray[x].width = canvas.width;
		imgArray[x].height = canvas.width;
		
		rlocation[x] = ((imgArray[x].height * x) + (canvas.height / 2)) - (imgArray[x].height * wanted) + (imgArray[x].height * centerEnd);
	}
	
	// Start spin
	var interval = setInterval(draw, frequency);

	function draw(){
		var ctx = canvas.getContext("2d");
		
		// Clear canvas before drawing again
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		// Draw pictures
		for(var x=0;x<imgArray.length;x++) {
			ctx.drawImage(imgArray[x], 0, rlocation[x], imgArray[x].width, imgArray[x].height);
		}

		// Spin
		if(xVel > 0) {
			
			xVel += accel;
			
			for(var x=0;x<imgArray.length;x++) {
				rlocation[x] = rlocation[x] + xVel;
				
				if(rlocation[x] >= canvas.height) {
					rlocation[x] -= imgArray[x].height * imgArray.length;
				}

			}
		}else {
			clearInterval(interval);
			CallOnStop();
		}
	}
};

function getLootboxInfo(name = 'Lootbox', loot = new Array(), lootfunc = new Array(), outcome = new Array()) {
	
	// Variables
	var alert_id = 'lootbox_alert';
	
	var randomnumber = (Math.floor(Math.random() * outcome.length) + 1);
	
	// Header
	var drawObj_Name = document.createElement('div');
	drawObj_Name.innerHTML = '<h1><i class="w3-xxxlarge fas fa-box-open"></i>&nbsp;<b class="w3-right">' + name + '</b></h1>';
	
	// Info
	var drawObj_Infos = document.createElement('div');
	drawObj_Infos.setAttribute('id', 'lootbox_container');
	drawObj_Infos.setAttribute('class', 'w3-center');
	drawObj_Infos.innerHTML = '<canvas id=\"lootbox\" height=\"350\"></canvas><div id="lootbox_container_text"><br/><br/><br/><br/></div>';
	
	// Container
	var drawObj_Container = document.createElement('div');
	drawObj_Container.appendChild(drawObj_Infos);
	
	// Get gameObj data
	alert_name = drawObj_Name.innerHTML;
	alert_message = drawObj_Container.innerHTML;
	
	// Output
	document.getElementById('alert').appendChild(drawAlert(alert_id,alert_name,alert_message,null));
	document.getElementById(alert_id).style.display='block'
	
	spin('lootbox',outcome,randomnumber,function() {
		
		document.getElementById('lootbox_container_text').innerHTML = '';
		
		// Reward
		var drawObj_Reward = document.createElement('h4');
		drawObj_Reward.setAttribute('class', 'w3-center');
		drawObj_Reward.innerHTML = loot[randomnumber-1];
		document.getElementById('lootbox_container_text').appendChild(drawObj_Reward);
		
		//Button
		var drawObj_Button = document.createElement('div');
		drawObj_Button.setAttribute('class', 'w3-light-grey w3-margin');
		drawObj_Button.innerHTML = drawObj_Button.innerHTML + '<div class="w3-button w3-red" style="width:100%" onclick="'+lootfunc[randomnumber-1]+';removeElement(\'' + alert_id + '\');">Get reward!</div>';
		document.getElementById('lootbox_container_text').appendChild(drawObj_Button);
	});
	closeNav();
};

function removeElement(elementId) {
	var element
	
	if(document.getElementById(elementId) !== null) {
		element = document.getElementById(elementId);
		
		if((typeof element.parentNode !== "undefined")) {
			element.parentNode.removeChild(element);
		}
	}
}

function getPrettify(input,floatpoint=2,forcefloat=false){
	var output = input;
	var letter = '';
	var outputstring = ''
	
	var suffixes = [
			"K","M","B",  "T",   "Qa",   "Qt",   "Sx",   "Sp",   "Oc",   "Nn",   "Dc", "UDc", "DDc", "TDc", "QaDc", "QtDc", "SxDc", "SpDc", "ODc",  "NDc",  "Vi", 
			"UVi", "DVi", "TVi", "QaVi", "QtVi", "SxVi", "SpVi", "OcVi", "NnVi", "Tg", "UTg", "DTg", "TTg", "QaTg", "QtTg", "SxTg", "SpTg", "OcTg", "NnTg", "Qd",
			"UQd", "DQd", "TQd", "QaQd", "QtQd", "SxQd", "SpQd", "OcQd", "NnQd", "Qq", "UQq", "DQq", "TQq", "QaQq", "QtQq", "SxQq", "SpQq", "OcQq", "NnQq", "Sg",
			"USg", "DSg", "TSg", "QaSg", "QiSg", "SxSg", "SpSg", "OSg",  "NSg",  "St", "USt", "DSt", "TSt", "QaSt", "QiSt", "SxSt", "SpSt", "OSt",  "NSt",  "Og",
			"UOg", "DOg", "TOg", "QaOg", "QiOg", "SxOg", "SpOg", "OOg",  "NOg",  "Nn", "UNn", "DNn", "TNn", "QaNn", "QtNn", "SxNn", "SpNn", "ONn",  "NNn",  "Ce"
		];
	
	if(Math.abs(input) < Number.MAX_VALUE && Math.abs(input) < 1e15) {
		
		for(var i = suffixes.length - 1; i >= 0; i--){
			
			if((Math.abs(input) >= Math.pow(10, 3*i + 3) * 0.99999)) {
				
				letter = suffixes[i];
				output = input/Math.pow(10, 3*i + 3);
				break;
			}
		}
		
		if(forcefloat == true || Math.abs(input) >= 1000 || (Math.abs(input) < 1 && Math.abs(input) !== 0)) {
			output = parseFloat(output).toFixed(floatpoint);
		}else {
			output = Math.round(output);
		}
		
		outputstring = output.toLocaleString()+''+letter;
		
	}else if(Math.abs(input) < Number.MAX_VALUE && Math.abs(input) >= 1e15) {
		outputstring = output.toExponential(2).replace('+','');
	}else {
		outputstring = 'Infinity';
	}
	
	return outputstring;
};

function getTime(time) {
	
	var timeoutput = ''
	var newtime = time;
	var minute = 60;
	var hour = 3600;
	var day = 86400;
	var year = 31536000;
	var max_year = 3153600000
	
	if(time >= max_year) {
		timeoutput = "??? "
	}else if(time >= year) {
		timeoutput = timeoutput + Math.floor(newtime / year) + "y "
		newtime = newtime - (Math.floor(newtime / year) * year);
		
		timeoutput = timeoutput + Math.floor(newtime / day) + "d "
		newtime = newtime - (Math.floor(newtime / day) * day);
	}else if(time >= day) {
		timeoutput = timeoutput + Math.floor(newtime / day) + "d "
		newtime = newtime - (Math.floor(newtime / day) * day);
		
		timeoutput = timeoutput + Math.floor(newtime / hour) + "h "
		newtime = newtime - (Math.floor(newtime / hour) * hour);
	}else if(time >= hour) {
		timeoutput = timeoutput + Math.floor(newtime / hour) + "h "
		newtime = newtime - (Math.floor(newtime / hour) * hour);
		
		timeoutput = timeoutput + Math.floor(newtime / minute) + "m "
		newtime = newtime - (Math.floor(newtime / minute) * minute);
	}else if(time >= minute) {
		timeoutput = timeoutput + Math.floor(newtime / minute) + "m "
		newtime = newtime - (Math.floor(newtime / minute) * minute);
		
		timeoutput = timeoutput + Math.floor(newtime) + "s"
	}else {
		timeoutput = timeoutput + Math.floor(newtime) + "s"
	}
	
	return timeoutput;
};

function getFloatText(event, ielementId, text) {
	
	var loop = 10;
	var random = (Math.floor(Math.random() * 60) + 1);	
	
	var x = event.pageX;
	var y = event.pageY;
	
	x = x+25+(-1*random);
	y = y-45;
	
	var element = document.getElementById('numberpopup');
	var countdivs = element.getElementsByTagName('div').length;
	var drawObj_Number = document.createElement('div');
	
	drawObj_Number.setAttribute('id', ielementId+'_number_'+random);
	drawObj_Number.setAttribute('style', 'position:absolute; top: '+y+'px; left: '+x+'px; text-shadow: 1px 1px black;');
	drawObj_Number.setAttribute('class', 'w3-xlarge w3-text-green');
	drawObj_Number.innerHTML = text;
	
	element.append(drawObj_Number);
	
	if(countdivs>=5) {
		element.innerHTML = '';
	}
	
	var myVar = setInterval(floatingText, 35);

	function floatingText() {
		
		y = y-2;
		drawObj_Number.setAttribute('style', 'position:absolute; top: '+y+'px; left: '+x+'px; text-shadow: 1px 1px black');
		
		if(loop<=0) {
			drawObj_Number.remove();
			clearInterval(myVar);
		}
		
		loop--;
	};
};

function showMenu(iid) {
	var x;
	
	for(x in gamedb.menu) {
		gamedb.menu[x].hide = 1;
	}
	
	gamedb.menu[iid].hide = 0;
};

function showAllMenu() {
	var x;
	
	for(x in gamedb.menu) {
		delete gamedb.menu[x].hide;
	}
};

function openNav() {
	var sidebar = document.getElementById('sidebar');
	var overlay = document.getElementById('overlay');
	
	if(sidebar.style.display === 'block') {
		closeNav();
	}else {
		sidebar.style.width = "300px";
		sidebar.style.display = 'block';
		overlay.style.display = 'block';
	}
};

function closeNav() {
	var sidebar = document.getElementById('sidebar');
	var overlay = document.getElementById('overlay');
	
	sidebar.style.display = 'none';
	overlay.style.display = 'none';
};
