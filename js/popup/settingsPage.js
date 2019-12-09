/*
 * @Author: Toke Raabjerg <TokeDK>
 * @Date:   19-Aug-2018
 * @Email:  tokermc@hotmail.co
 * @Project: Lectio Expert
 * @Last modified by:
 * @Last modified time: 2019-12-09T19:10:21+01:00
 */
// key id type(checkbox/input), extra
var s =
[
	["",																"Temaer",																																"section"			],
	///////////////////////////////////////////////////////////////////////////////////	///////////////////////////////////////////////////////////////////////////////////
	["Lectio_useSimpleTheme",						"Simpelt grå/hvid tema <a href='../../images/themes/simple.png' target='_blank' style='color:#444;'><i class='fas fa-external-link-alt'></i></a>",																"checkbox"		],
	["Lectio_useTheme",									"<i style='color:red;cursor:pointer;' title='Dette tema er udgået og bliver ikke længere opdateret. Du skal forvente fejl hvis du benytter dette tema.' class='fas fa-exclamation'></i>   Blå tema <a href='../../images/themes/modern.png' target='_blank' style='color:#444;'><i class='fas fa-external-link-alt'></i></a>",																							"checkbox"		],
	["Lectio_useThemeSkema",						"Forbedringer til skema",																								"checkbox"		],
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	["",																"<i class='fas fa-moon'></i>  <i class='far fa-moon'></i>  Mørkt tema",	"section"			],
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	["darkThemeNight",									"Mørkt tema efter solnedgang",																					"checkbox"		],
	["darkTheme",												"Mørkt tema hele tiden",																								"checkbox"		],
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	["",																"Eget tema",																														"section"			],
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	["Lectio_useCustomColor",						"Benyt din egen farver",																								"checkbox"		],
	["Lectio_customColor",							"Farve:",																																"inputS"			],
	["Lectio_standardBackground",					"Benyt standard baggrund",																							"checkbox"		],
	["Lectio_customBackground",					"Benyt custom baggrund (URL):",																					"checkbox"		],
	["Lectio_customBackgroundURL",			"",																																			"inputB"			],
	["Lectio_customBackgroundOnlyDay",	"Benyt kun baggrund om dagen",																					"checkbox"		],
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	["",																"Funktioner",																														"section"			],
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	["Lectio_useRedirect",							"Benyt videresendelse fra forside",																			"checkbox"		],
	["Lectio_gradeAverage",							"Karakter gennemsnit",																									"checkbox"		],
	["Lectio_opgaverCountDown",					"Nedtælling på opgaver",																								"checkbox"		],
	["Lectio_hovedMenuPlus",						"Hovedmenu +",																													"checkbox"		],
	["Lectio_antiAFK",									"Anti-AFK",																															"checkbox"		],
	["","","section"],
	// [
	// 		"island_display",
	// 		"<td class='description'>Ø rækkefølge på forsiden</td><br><div id='section1'><div id='actualSection'><div class='text'>(1)</div></div></div>		<div id='section2'><div id='communicationSection'><div class='text'>(2)</div></div></div>		<div id='section3'><div id='schoolSection'><div class='text'>(3)</div></div></div>		<div id='section4'><div id='schemeSection'><div class='text'>(4)</div></div></div>",
	// 		"other"
	// ],
	// [	'Lectio_actualSection',		'"Aktuel" position',		'select',		["1","2","3","4"]		],
	// [	'Lectio_communicationSection',		'"Kommunikation" position',		'select',		["1","2","3","4"]		],
	// [	'Lectio_schoolSection',		'"Undervisning" position',		'select',		["1","2","3","4"]		],
	// [	'Lectio_schemeSection',		'"Skema" position',		'select',		["1","2","3","4"]		],

	// ["Lectio_zoomLevel",								"Zoom niveau (I decimal):",																							"inputS","num"],
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	["",																"Yderlige indstillinger",																								"section"			],
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	["Lectio_moveSkemaIsland",					"Flyt skema på forsiden",																								"checkbox"		],
	["Lectio_moveUndervisningIsland",		"Flyt undervisning på forsiden",																				"checkbox"		],
	["Lectio_addSearchIcon",						"Tilføj <i class='fas fa-search'></i>  til søg knappen",								"checkbox"		],
	["Lectio_importantInfoHeight",			"Tilføj 10px højde til 'importantInfo' på forsiden",										"checkbox"		],
	["Lectio_dayNote",									"Dag note",																															"checkbox"		],
	["Lectio_hintEnabled",							"Hints / Fun facts",																										"checkbox"		],
	["Lectio_checkAbsence",							"Check fravær og mørkgør på skemaet",																		"checkbox"		],
	["","","section"]
];

var p = document.querySelector('.masterContent');

for(var i=0;i<s.length;i++) {
	if(s[i][2] == "checkbox") {
		var e = document.createElement('tr');
				e.innerHTML=
						'<td class="description">'+
								s[i][1]+//description
							"</td>"+
							"<td>"+
								'<label class="switch">'+
									'<input class="check settingsSwitch" id="'+s[i][0]+'" type="checkbox" name="'+s[i][0]+'">'+
									'<span class="slider round"></span>'+
								'</label>'+
							'</td>';
				p.appendChild(e);

		} else if (s[i][2] == "inputS") {
			var e = document.createElement('tr');
					e.innerHTML=
							'<td class="description">'+
									s[i][1]+//description
								"</td>"+
								"<td>"+
									'<input id="'+s[i][0]+'" class="'+s[i][0]+' input small">'+
								'</td>';
					p.appendChild(e);

		} else if (s[i][2] == "inputB") {
				var e = document.createElement('tr');
						e.innerHTML=
									"<td colspan='2'>"+
										'<input id="'+s[i][0]+'" class="input big">'+
									'</td>';
						p.appendChild(e);

		} else if (s[i][2] == "select") {
			var e = document.createElement('tr');
					e.innerHTML=
								"<td class='description'>"+s[i][1]+"</td><td>"+
									'<select id="'+s[i][0]+'"></select>'+
								'</td>';
					p.appendChild(e);
						var o = e.q("#"+s[i][0]);
						c.l(o);
						s[i][3].forEach(function(str) {
							o.innerHTML += "<option value="+str+">"+str+"</option>";
						});
			}	else if (s[i][2] == "section") {
		var spacer=document.createElement('tr');
				spacer.innerHTML="<td><br></td>";
				p.appendChild(spacer);
		if(s[i][1] != "") {
			var section = document.createElement('tr');
					section.innerHTML=
							'<td colspan="2">'+
									"<p id='section'><b>"+s[i][1]+"</b></p><hr>"+
								'</td>';
					p.appendChild(section);
		}
	} else if (s[i][2] == "other") {
		var e = document.createElement('div');
				e.id = s[i][0];
				e.innerHTML = s[i][1];
				p.appendChild(e);
	}
}

/*			GET THE STORAGE AND FILL		*/
for(var i=0;i<s.length;i++) {
	if(s[i][0] != "") {
		chrome.storage.local.get([s[i][0]], function (r) {
			if(r) {
				if(typeof r[Object.keys(r)[0]] == "boolean" ) {
					document.querySelector('#'+Object.keys(r)[0]).checked =r[Object.keys(r)[0]];

				} else if (typeof r[Object.keys(r)[0]] == "string" || isNaN([Object.keys(r)[0]])) {
					document.querySelector('#'+Object.keys(r)[0]).value =r[Object.keys(r)[0]];
				}
			}
		});
	}
}

//For saving
document.body.addEventListener('click', save);
document.body.addEventListener('keyup', save);
function save () {
	for(var i=0;i<s.length;i++) {
		if(s[i][0]) {
			var el=document.querySelector("#"+s[i][0]);
			if(s[i][3] == "numb" && isNan(el.value)) {store(s[i][0],el.value);}
			else if (s[i][3] == undefined && document.querySelector("#"+s[i][0]+"[type='checkbox']")) {store(s[i][0],el.checked);}
			else if (document.querySelector("select"+"#"+s[i][0])) {store(s[i][0],el.value);}
			else if (s[i][3] == undefined) {store(s[i][0],el.value);}
		}
	}
	function store (key, value) {
		chrome.storage.local.set({[key]:value});
	}
}


//Prevent form submit
function stopRKey() {
  var evt = (evt) ? evt : ((event) ? event : null);
  var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
  if ((evt.keyCode == 13) && (node.type=="text") || (evt.keyCode == 13) && (node.type=="password"))  {return false;}
}
document.onkeypress = stopRKey;

//Google Analytics
var buttons = document.querySelectorAll('.check');
for (var i = 0; i < buttons.length; i++) {
	buttons[i].addEventListener('click', trackButton);
}
function trackButton(e) {
	_gaq.push(['_trackEvent', e.target.id, e.target.checked.toString()]);
	//_gaq.push(['_trackEvent', e.target.id, e.target.checked, 'other info']);
	// _gaq.push(['_trackEvent', e.target.id, e.target.checked]);
	// _gaq.push(['_trackEvent', "settingsInteract", e.target.id, e.target.checked ? 1 : 0]);
}


//Add christmas option
window.onload = function () {
	var d = new Date();
	var tbody = document.querySelectorAll('tbody')[1];
	var spacer = document.createElement('tr');
			spacer.innerHTML = "<tr><td><br></td></tr>";
	//xmas
	if(d.getMonth() == 11) {
		var xmas = document.createElement('tr');
				xmas.style = "";
				xmas.innerHTML = '<td class="description"><b><u>Juletema</u></b></td><td><label class="switch"><input class="check" id="xmas" type="checkbox" name="xmas" value="true" checked="checked"><span class="slider round"></span></label></td>';
				tbody.insertBefore(spacer, tbody.children[0]);
				tbody.insertBefore(xmas, tbody.children[1]);

		chrome.storage.local.get(['Lectio_xmas'], function (r) {
			if(r.Lectio_xmas == false)
			document.getElementById('xmas').checked = r.Lectio_xmas;
		});

		document.getElementById('xmas').addEventListener('click', function (e) {
			chrome.storage.local.set({'Lectio_xmas':document.getElementById('xmas').checked});
		});
	}
	//Exam mode
	chrome.storage.local.get(["Lectio_examOnScheme"], function (r) {
		if(r.Lectio_examOnScheme == true) {
			var exam = document.createElement('tr');
					exam.style = "margin-top:10px;";
					exam.innerHTML = '<td class="description"><b><u>EKSAMEN TILSAND</u></b></td><td><label class="switch"><input class="check" id="Lectio_examMode" type="checkbox" value="true"><span class="slider round"></span></label></td>';
					tbody.insertBefore(spacer, tbody.children[0]);
					tbody.insertBefore(exam, tbody.children[1]);

			chrome.storage.local.get(['Lectio_examMode'], function (r) {
				if(r.Lectio_examMode)
				document.getElementById('Lectio_examMode').checked = r.Lectio_examMode;
			});

			document.getElementById('Lectio_examMode').addEventListener('click', function (e) {
				chrome.storage.local.set({'Lectio_examMode':document.getElementById('Lectio_examMode').checked});
			});
		} else {
			chrome.storage.local.set({'Lectio_examMode':false});
		}
	});
};
