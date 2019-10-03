/**
 * @Date:   2019-03-06T20:13:32+01:00
 * @Last modified time: 2019-03-07T17:22:54+01:00
 */
var page=0;
var sStatus;
d.q(".headerContent").aE('click', function (e) {
  if(e.target.dataset.unlocked == "true") {
    getIndex(e.target);
    show(e.target);
    if(d.qAll(".headerContent a")[page+1]) {
      d.qAll(".headerContent a")[page+1].dataset.unlocked="true";
    }
    if(page == 1 && !sStatus) {settings();sStatus=true;}
   }
});


function show (e) {
  var p=d.qAll('.page');
  for(var i=0;i<p.length;i++) {
    if(p[i].id != e.href.slice(e.href.indexOf(".html#")+6, e.href.length)) {
      p[i].style.display="none";
      d.qAll(".headerContent a")[i].style.fontWeight="400";
    } else {
      p[i].style.display="block";
      d.qAll(".headerContent a")[i].style.fontWeight="600";
    }
  }
}
function getIndex (e) {
  var p=e.parentElement.qAll("a");
  for(var i=0;i<p.length;i++) {
    if(p[i].href == e.href) {
      page=i;
    }
  }
}

d.b.aE('click', function (e) {
  switch (e.target.id) {
    case "nextPage":
        if(d.qAll(".headerContent a")[page+1]) {
          page++;
          d.qAll(".headerContent a")[page].click();
        }
        break;
    case "previousPage":
        if(d.qAll(".headerContent a")[page-1]) {
        page--;
        d.qAll(".headerContent a")[page].click();
        }
        break;
  }
});

function settings () {
  var s =
  [
  	["",																"Temaer",																																"section"			],
  	///////////////////////////////////////////////////////////////////////////////////	///////////////////////////////////////////////////////////////////////////////////
  	["Lectio_useSimpleTheme",						"Simpelt grå/hvid tema <a title='Se tema' href='../../images/themes/simple.png' target='_blank' style='color:#444;'><i class='fas fa-external-link-alt'></i></a>",																"checkbox"		],
  	["Lectio_useTheme",									"Blå tema <a title='Se tema' href='../../images/themes/modern.png' target='_blank' style='color:#444;'><i class='fas fa-external-link-alt'></i></a>",																							"checkbox"		],
  	["Lectio_useThemeSkema",						"Forbedringer til skema <a title='Se tema' href='../../images/themes/scheme.png' target='_blank' style='color:#444;'><i class='fas fa-external-link-alt'></i></a>",																								"checkbox"		],
  	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  	["",																"<i class='fas fa-moon'></i>  <i class='far fa-moon'></i>  Mørkt tema  <a title='Se tema' href='../../images/themes/simpleDark.png' target='_blank' style='color:#444;'><i class='fas fa-external-link-alt'></i></a>",	"section"			],
  	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  	["darkThemeNight",									"Mørkt tema efter solnedgang",																					"checkbox"		],
  	["darkTheme",												"Mørkt tema hele tiden",																								"checkbox"		]

  ];

  var p = document.querySelector('#settingContent div#settingsThemes table');

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

  		} else if (s[i][2] == "section") {
  		var spacer=document.createElement('tr');
  				spacer.innerHTML="<td><br></td>";
  				p.appendChild(spacer);
          if(d.q("#settingsThemes table tr:first-child td").className == "") {d.q("#settingsThemes table tr:first-child td").style.display="none";}
  		if(s[i][1] != "") {
  			var section = document.createElement('tr');
  					section.innerHTML=
  							'<td colspan="2">'+
  									"<p id='section'><b>"+s[i][1]+"</b></p><hr>"+
  								'</td>';
  					p.appendChild(section);
  		}
  	}
  }


  /*			GET THE STORAGE AND FILL		*/
  for(var i=0;i<s.length;i++) {
  	if(s[i][0] != "") {
  		chrome.storage.local.get([s[i][0]], function (r) {
  			if(r) {
  				if(typeof r[Object.keys(r)[0]] == "boolean" ) {
  					document.querySelector('#'+Object.keys(r)[0]).checked =r[Object.keys(r)[0]];

  				} else if (typeof r[Object.keys(r)[0]] == "string" ) {

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
  			if(s[i][3] == "numb" && isNan(el.value)) {store(s[i][0],el.value);console.log('1');}
  			else if (s[i][3] == undefined && document.querySelector("#"+s[i][0]+"[type='checkbox']")) {store(s[i][0],el.checked);console.log('2');}
  			else if (s[i][3] == undefined) {store(s[i][0],el.value);console.log('3');}
  		}
  	}
  	function store (key, value) {
  		chrome.storage.local.set({[key]:value});
  	}
    // d.q("#settingContent").style.width=d.q("#settingContent tr:first-child").clientWidth+"px";
  }


  document.getElementById('Lectio_useSimpleTheme').addEventListener('click',radioButtonSimple);
  document.getElementById('Lectio_useTheme').addEventListener('click',radioButtonModern);

  function radioButtonSimple () {
    var simple = document.getElementById('Lectio_useSimpleTheme').checked;
    var modern = document.getElementById('Lectio_useTheme').checked;

    if (simple == true) {
        document.getElementById('Lectio_useTheme').checked = false;
    }
  }
  function radioButtonModern () {
    var simple = document.getElementById('Lectio_useSimpleTheme').checked;
    var modern = document.getElementById('Lectio_useTheme').checked;

    if (modern == true) {
        document.getElementById('Lectio_useSimpleTheme').checked = false;
    }
  }

  document.getElementById('darkThemeNight').addEventListener('click',radioButtonDark);
  document.getElementById('darkTheme').addEventListener('click',radioButtonNight);

  function radioButtonDark () {
    var dark = document.getElementById('darkThemeNight').checked;
    var night = document.getElementById('darkTheme').checked;

    if (dark == true) {
        document.getElementById('darkTheme').checked = false;
    }
  }
  function radioButtonNight () {
    var dark = document.getElementById('darkThemeNight').checked;
    var night = document.getElementById('darkTheme').checked;

    if (night == true) {
        document.getElementById('darkThemeNight').checked = false;
    }
  }
}
