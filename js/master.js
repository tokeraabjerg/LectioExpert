/*
 * @Author: Toke Raabjerg <TokeDK>
 * @Date:   23-Aug-2018
 * @Email:  tokermc@hotmail.co
 * @Project: Lectio Expert
 * @Last modified by:
 * @Last modified time: 2019-12-09T19:40:21+01:00
 */

console.time("Finished master.js in");
/*----------------------------------------------------------------*//*----------------------------------------------------------------*/
/*                                                                *//*                                                                */
//                        GLOBAL VARIABLES                        ////                        GLOBAL VARIABLES                        //
/*                                                                *//*                                                                */
/*----------------------------------------------------------------*//*----------------------------------------------------------------*/
/*----------------------------------------------------------------*//*----------------------------------------------------------------*/
/*                                                                *//*                                                                */
//                        GLOBAL VARIABLES                        ////                        GLOBAL VARIABLES                        //
/*                                                                *//*                                                                */
/*----------------------------------------------------------------*//*----------------------------------------------------------------*/
/*----------------------------------------------------------------*//*----------------------------------------------------------------*/
/*                                                                *//*                                                                */
//                        GLOBAL VARIABLES                        ////                        GLOBAL VARIABLES                        //
/*                                                                *//*                                                                */
/*----------------------------------------------------------------*//*----------------------------------------------------------------*/

var url = window.location.href;
var d=document;
d.b=d.body;
d.h=d.head;
d.t=d.title;
d.q=d.querySelector;
d.qAll=d.querySelectorAll;
d.gId=d.getElementById;
d.gClass=d.getElementsByClassName;
d.gTag=d.getElementsByTagName;
d.c=d.createElement;
d.aE=d.addEventListener;

var p = {
  e: Element.prototype
};
var sG = function (value) {return localStorage.getItem(value);};
var sS = function (key, value) {return localStorage.setItem(key, value);};

/* Time variables */
var nSec = 1000;
var nMin = nSec * 60;
var nQuarter = nMin * 15;
var nHour = nMin * 60;
var nDay = nHour * 24;
var nWeek = nDay * 7;
var nMonth = nDay * 30;
var nYear = nDay * 365;
var aDays = ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"];

var c=console;
    c.l=c.log;
    c.w=c.warn;
    c.t=c.table;
    c.e=c.error;

var url=window.location.href;

var schoolId=/\/lectio\//.test(url);
    if(schoolId==true) {
      schoolId=url.slice(url.indexOf('/lectio/')+8,url.indexOf('lectio/')+10);
      chrome.storage.local.set({"schoolId":schoolId});
    } else {
      chrome.storage.local.get(["schoolId"], function (r) {
        schoolId=r.schoolId;
      });
    }

var studentId= /elevid=/.test(url) ?
    url.slice(url.indexOf('elevid=') + 7,
    /&prevurl=/.test(url) ?
    url.indexOf('&')
    :
    url.length)
    :
    sG(studentId);
    if(/&/.test(studentId)) {
      studentId = studentId.slice(0,studentId.indexOf("&"));
    }
    sS("studentId",studentId);
    //chrome.storage.local.set({"studentId": studentId});

//var studentId= /elevid=/.test(url) ? url.slice(url.indexOf('elevid=') + 7, /&prevurl=/.test(url) ? url.indexOf('=prevurl=') : url.length) : sG(studentId);     sS("studentId",studentId);
c.l(schoolId, studentId);

var dT=new Date();
    dT.t=dT.getTime();
    dT.d=dT.getDate();
    dT.h=dT.getHours();
    dT.min=dT.getMinutes();
    dT.s=dT.getSeconds();
    dT.m=dT.getMonth();
    dT.y=dT.getFullYear();

/*################################################################################################################################*/

p.e.aC = function(el) {
    el.appendChild(this);
    return this;
};

p.e.aE = function (ev, f) {
  this.addEventListener(ev, f);
};
p.e.rE = function (ev, f) {
  this.removeEventListener(ev, f);
};

p.e.q = p.e.querySelector;
p.e.qAll = p.e.querySelectorAll;

/*----------------------------------------------------------------*//*----------------------------------------------------------------*/
/*                                                                *//*                                                                */
//                            PREFAB                              ////                            PREFAB                              //
/*                                                                *//*                                                                */
/*----------------------------------------------------------------*//*----------------------------------------------------------------*/
/*----------------------------------------------------------------*//*----------------------------------------------------------------*/
/*                                                                *//*                                                                */
//                            PREFAB                              ////                            PREFAB                              //
/*                                                                *//*                                                                */
/*----------------------------------------------------------------*//*----------------------------------------------------------------*/
/*----------------------------------------------------------------*//*----------------------------------------------------------------*/
/*                                                                *//*                                                                */
//                            PREFAB                              ////                            PREFAB                              //
/*                                                                *//*                                                                */
/*----------------------------------------------------------------*//*----------------------------------------------------------------*/

  (function () {
    // Setup handler for multi-purpose CSS injections.
    var style = document.createElement('style');
      style.id = "LectioCSS";
      style.innerHTML =
      ".ui-button.ui-corner-all.ui-widget.ui-button-icon-only.ui-dialog-titlebar-close"+
      "{-webkit-mask-image:URL(chrome-extension://"+chrome.runtime.id+"/icons/close.svg)!important; background:white!important;}"+
      ".ls-master-header-institution {"+
      "background-image: url(chrome-extension://"+chrome.runtime.id+"/icons/icon128.png)!important;"+
      "background-size: 30px;}"+
      "";
      document.head.appendChild(style);

    var fontAwesome = document.createElement('link');
      fontAwesome.rel = "stylesheet";
      fontAwesome.href = "https://use.fontawesome.com/releases/v5.3.1/css/all.css";
      fontAwesome.integrity = "sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU";
      fontAwesome.crossOrigin = "anonymous";
      document.head.appendChild(fontAwesome);


    d.h.appendChild(fAddElement("script", "libary", "", "chrome-extension://"+chrome.runtime.id+"/js/lib.js", "text/javascript"));

    chrome.storage.local.get(["Lectio_examMode"], function (r) {
      if(r.Lectio_examMode != true) {
      fXMLGet(
          "https://api.sunrise-sunset.org/json?lat=55.39594&lng=-10.38831&formatted=0",
          "json",
          function (c) {
            var sunrise = new Date(c.results.sunrise);
              sunrise.setTime(sunrise.getTime() + new Date().getTimezoneOffset()*60*1000);
            var sunset = new Date(c.results.sunset);
              sunset.setTime(sunset.getTime() + new Date().getTimezoneOffset()*60*1000);
              console.log(sunrise);
            if((sunrise.getDate()) == (sunset.getDate()) && dT > sunrise) {
              sunrise.setDate(sunrise.getDate() + 1);
            }
            chrome.storage.local.set({sunset:""+sunset+"", sunrise:""+sunrise+""});
            // console.log(sunset, sunrise);
            // console.log(sunrise.getDate() == sunset.getDate() && dT > sunrise);
        });
      }
    });

      // //Request sunset/sunrise
      // var xhttp = new XMLHttpRequest();
      // xhttp.onreadystatechange = function() {
      //   if (this.readyState == 4 && this.status == 200) {
      //     // Typical action to be performed when the document is ready:
      //     sunrise = new Date(c.results.sunrise); sunrise.setTime(sunrise.getTime() + new Date().getTimezoneOffset()*60*1000);
      //     sunset = new Date(api.results.sunset); sunset.setTime(sunset.getTime() + new Date().getTimezoneOffset()*60*1000);
      //
      //     if((sunrise.getDate()) == (sunset.getDate()) && d > sunrise) {
      //       sunrise.setDate(sunrise.getDate() + 1);
      //     }
      //     chrome.storage.local.set({sunset:""+sunset+"", sunrise:""+sunrise+""});
      //     //console.log(sunset, sunrise);
      //   }
      // };
      // xhttp.open("GET", xhttpUrl, true);
      // xhttp.send();
  }());
  function changeCheckboxes () {
    var check=d.qAll("input[type='checkbox']:not(.homework-checkbox)");
    var label; var span;
    for(var i=0;i<check.length;i++) {
      if(d.q("label[for='"+check[i].id+"'")) {
        label=d.q("label[for='"+check[i].id+"'");
        span=document.createElement("span");
          span.className="lxcustomCheckbox";
        label.className += " lx_checkbox";
        label.appendChild(check[i]);
        label.appendChild(span);
      } else {
        var old=check[i];
        label=document.createElement("label");
              label.className = "lx_checkbox";
        span=document.createElement("span");
          span.className="lxcustomCheckbox";
        check[i].replaceWith(label);
        label.appendChild(old);
        label.appendChild(span);
      }
    }
  }
  /*
  // get next page dynamically beta to prevent loading the entire page just for loading a chunk
  // (function () {
  //   var contenttable=d.q("#contenttable");
  //   var navMenuA=d.qAll("#s_m_HeaderContent_subnav_div div.buttonlink a[href]");
  //
  //   for(var i=0;i<navMenuA.length;i++) {
  //   	navMenuA[i].addEventListener("click", function (e) {
  //   		//change active button
  //   		d.q("#s_m_HeaderContent_subnav_div div.buttonlink.ls-subnav-active").className="buttonlink";
  //   		e.target.parentNode.className += " ls-subnav-active";
  //   		//get content
  //   		fXMLGet(e.target.dataset.oldLink, "html", function (c, url) {
  //   			sessionStorage.setItem("lastPage",window.location.href);	//remember lastPage
  //         document.body.innerHTML = c.body.innerHTML;
  //   			// contenttable.innerHTML = c.querySelector("#contenttable").innerHTML;	//set the new content
  //   			window.history.pushState({"html":c.html,"pageTitle":c.pageTitle},"", url);		//set the new url
  //   			//sub nav change/remove whatever necessary.
  //   			// if(c.querySelector("#s_m_HeaderContent_subnavigator_genericSecondRow_tr")) {
  //   			// 	if(d.q("#s_m_HeaderContent_subnavigator_genericSecondRow_tr")) {//if subnav already exists
  //   			// 		d.q("#s_m_HeaderContent_subnavigator_genericSecondRow_tr").innerHTML = c.querySelector("#s_m_HeaderContent_subnavigator_genericSecondRow_tr").innerHTML;
  //   			// 	} else {//if subnav doesn't exist
  //   			// 		d.q("#s_m_HeaderContent_subnavigator_navigatortbl").appendChild(c.querySelector("#s_m_HeaderContent_subnavigator_genericSecondRow_tr"));
  //         //           }
  //         //       } else if (d.q("#s_m_HeaderContent_subnavigator_genericSecondRow_tr")) { //if theres no subnav in callback then remove the existing one, if there is one
  //   			//  d.q("#s_m_HeaderContent_subnavigator_genericSecondRow_tr").remove();
  //   			// }
  //         // //change header title
  //         // if(d.q("#s_m_HeaderContent_MainTitle") && c.querySelector("#s_m_HeaderContent_MainTitle")) {
  //         //   d.q("#s_m_HeaderContent_MainTitle").innerHTML = c.querySelector("#s_m_HeaderContent_MainTitle").innerHTML;
  //         // }
  //   		eventFired();
  //   		});
  //   	});
  //   	navMenuA[i].dataset.oldLink=navMenuA[i].href;
  //   	navMenuA[i].removeAttribute("href");
  //   }
  //
  //   function fXMLGet (url, type, callback) {
  //         if(!url) {return console.warn('Missing url to change page');}
  //
  //         var xhttp = new XMLHttpRequest();
  //         xhttp.onreadystatechange = function() {
  //           if (this.readyState == 4 && this.status == 200) {
  //             // action
  //                 callback(xhttp.responseXML, url);
  //           }
  //         };
  //         xhttp.open("GET", url, true);
  //         if(type == "html") { xhttp.responseType = "document"; }
  //         xhttp.send();
  //   }
  //
  //   //on arrow back
  //   window.onpopstate = function(e){
  //       if(e.state){
  //           fXMLGet(sessionStorage.getItem("lastPage"), "html", function (c, url) {
  //   			sessionStorage.setItem("lastPage",url);
  //   			contenttable.innerHTML = c.querySelector("#contenttable").innerHTML;
  //   			window.history.pushState({"html":c.html,"pageTitle":c.pageTitle},"", url);
  //   		});
  //       }
  //   };
  //
  //   function eventFired () {
  //       //console.log('Location changed, new url: '+window.location.href+"old url: "+sessionStorage.getItem("lastPage"));
  //       mCheck();
  //   }
  // }());
  */
/*----------------------------------------------------------------*//*----------------------------------------------------------------*/
/*                                                                *//*                                                                */
//                             CHECKS                             ////                             CHECKS                             //
/*                                                                *//*                                                                */
/*----------------------------------------------------------------*//*----------------------------------------------------------------*/
/*----------------------------------------------------------------*//*----------------------------------------------------------------*/
/*                                                                *//*                                                                */
//                             CHECKS                             ////                             CHECKS                             //
/*                                                                *//*                                                                */
/*----------------------------------------------------------------*//*----------------------------------------------------------------*/
/*----------------------------------------------------------------*//*----------------------------------------------------------------*/
/*                                                                *//*                                                                */
//                             CHECKS                             ////                             CHECKS                             //
/*                                                                *//*                                                                */
/*----------------------------------------------------------------*//*----------------------------------------------------------------*/

mCheck();
function mCheck () {
  url = window.location.href;
  chrome.storage.local.get([
     'lectio_skoleId',
     'lectio_elevId',

     'Lectio_hovedMenuPlus',
     'Lectio_antiAFK',
     'Lectio_zoomLevel',
     'Lectio_customBackground',
     'Lectio_customBackgroundURL',
     'Lectio_customBackgroundOnlyDay',

     'Lectio_gradeAverage',
     'Lectio_moveSkemaIsland',
     'Lectio_moveUndervisningIsland',
     'Lectio_changeTitle',
     'Lectio_addSearchIcon',
     'Lectio_importantInfoHeight',
     'Lectio_changeIcons',
     'Lectio_checkAbsence',

     'Lectio_xmas'
     ], function (r) {
     //hovedMenu+
     if (r.Lectio_hovedMenuPlus != false && r.lectio_skoleId != undefined && r.lectio_elevId != undefined && !d.q(".lxHovedMenuPlus")) {
       lectio_skoleId = r.lectio_skoleId;
       lectio_elevId = r.lectio_elevId;
       hovedMenu();
     } else if (r.lectio_skoleId != undefined && r.lectio_elevId != undefined && r.Lectio_hovedMenuPlus == false) {
       lectio_skoleId = r.lectio_skoleId;
       lectio_elevId = r.lectio_elevId;
     }
     xmas = r.Lectio_xmas;
     switch (dT.m) {
       case 11:
           fChristmas();
           break;
     }
     if(r.Lectio_customBackground != false &&
        r.Lectio_customBackgroundURL != undefined &&
         r.Lectio_customBackgroundURL != "" &&
          r.Lectio_customBackgroundURL != "undefined" || r.Lectio_standardBackground != false) {c.l("i passed");
            if(r.Lectio_standardBackground == false) {
              if(r.Lectio_customBackgroundOnlyDay == true) {
                if(!document.querySelector("#nightTheme")) {fCustomBackground(r.Lectio_customBackgroundURL);}
              } else {
                fCustomBackground(r.Lectio_customBackgroundURL);
              }
          } else {c.l("i passed v2");
            if(document.querySelector("#nightTheme")) {
              fCustomBackground("chrome-extension://"+chrome.runtime.id+"/images/bgNight.png", true); //night
            } else {
              fCustomBackground("chrome-extension://"+chrome.runtime.id+"/images/bg.jpg", true); //day
            }
          }
     } else {c.l("i didnt pass");}

     //change icons
     if(r.Lectio_changeIcons != false) {fChangeIcons();}

     //Zoom level
     if (r.Lectio_zoomLevel != undefined) {zoomLevel (r.Lectio_zoomLevel);}

     //moveIslands
     if ((document.getElementsByClassName('island  mediumBlock mediumBlockHeight')[1]) != null) {
       if(r.Lectio_moveSkemaIsland != false) {moveIsland("1");}
       if(r.Lectio_moveUndervisningIsland != false) {moveIsland("2");}
     }

     //Anti AFK
     if(r.Lectio_antiAFK != false) {setInterval(checkAFK, 1830000);}

     //add search icons
     if(r.Lectio_addSearchIcon != false && !d.q(".lxSearchIcon")) {
       addSearchIcon();
     }

     //importantInfoHeight
    if(r.Lectio_importantInfoHeight != false && (document.getElementById('s_m_Content_Content_importantInfo')) != null) {
       importantInfoHeight();
    }

    if(
      r.Lectio_checkAbsence != false && /SkemaNy.aspx/.test(url) && !/prevurl=SkemaNy.aspx/.test(url) ||
      r.Lectio_checkAbsence != false && /forside.aspx/.test(url) && !/prevurl=forside.aspx/.test(url)
    ) {fSchemeAbsence();}
    //  switch for url
    switch (true) {
      case (/grade_report.aspx/.test(url) && (r.Lectio_gradeAverage != false)): //Karakter
          fGradeAverage();
          break;
      case url == "https://www.lectio.dk/":
          document.title = "Lectio | Skoler";
          pFrontPage();
          break;
      case /forside.aspx/.test(url) && (!/prevurl=forside.aspx/.test(url)): //Forside url
          document.title = "Lectio | Forside";
          //check if the user was redirected
          chrome.storage.local.get(["redirected"], function (r) {
            if(r.redirected == true) {
              chrome.storage.local.set({"redirected":false});
              
            }
          });
          if((document.getElementsByClassName('island  mediumBlock mediumBlockHeight')[1]) != null) {
            var e = document.getElementById('s_m_Content_Content_skemaIsland_pa').innerHTML;
            //Remove href="*" and src="*"
            var h = e.replace(/href="[^"]*"/g, ""); var s = h.replace(/src="[^"]*"/g, "");
            //set d
            chrome.storage.local.set({'Lectio_skema':s, 'Lectio_lastSkemaUpdate' : dT.t});
          }
          pSkema();
          break;
      case /SkemaNy.aspx/.test(url) && (!/prevurl=SkemaNy.aspx/.test(url)): //Skema url
          document.title = "Lectio | Skema";
          pSkema();
          break;
      case /fravaerelev.aspx/.test(url):
          document.title = "Lectio | Fravær";
          pAbsence();
          break;
      case /fravaerelev_fravaersaarsager.aspx/.test(url): //Fravær url
          document.title = "Lectio | Fraværsårsager";
          pAbsenceReason();
          break;
      case /DokumentOversigt.aspx/.test(url):
          document.title = "Lectio | Dokumenter";
          pDocuments();
          break;
      case /lectab=aktivitetsinformation/.test(url):
          document.title = "Lectio | Aktivitetsinformation";
          pActivityInformation();
          break;
      case /OpgaverElev.aspx/.test(url) && ! /prevurl=OpgaverElev.aspx/.test(url):
          document.title = "Lectio | Opgaver";
          pTasks();
          break;
      default:
          document.title = "Lectio";
    }
  });

  switch (true) {
    case /beskeder2.aspx/.test(url): //Messages url
        document.title = "Lectio | Beskeder";
        pMessages();
        break;
    case /material_lektieoversigt.aspx/.test(url) && !/&prevurl=material_lektieoversigt.aspx/.test(url): //Homework url
        document.title = "Lectio | Lektier";
        pHomework();
        break;
    case /default.aspx/.test(url):
        pHovedmenu();
        break;
  }
  changeCheckboxes();
}

/*----------------------------------------------------------------*//*----------------------------------------------------------------*/
/*                                                                *//*                                                                */
//                          FUNCTIONS                             ////                          FUNCTIONS                             //
/*                                                                *//*                                                                */
/*----------------------------------------------------------------*//*----------------------------------------------------------------*/
/*----------------------------------------------------------------*//*----------------------------------------------------------------*/
/*                                                                *//*                                                                */
//                          FUNCTIONS                             ////                          FUNCTIONS                             //
/*                                                                *//*                                                                */
/*----------------------------------------------------------------*//*----------------------------------------------------------------*/
/*----------------------------------------------------------------*//*----------------------------------------------------------------*/
/*                                                                *//*                                                                */
//                          FUNCTIONS                             ////                          FUNCTIONS                             //
/*                                                                *//*                                                                */
/*----------------------------------------------------------------*//*----------------------------------------------------------------*/
/*----------------------------------------------------------------*//*----------------------------------------------------------------*/
/*                                                                *//*                                                                */
//                          FUNCTIONS                             ////                          FUNCTIONS                             //
/*                                                                *//*                                                                */
/*----------------------------------------------------------------*//*----------------------------------------------------------------*/

    /*----------------------------------------------------------------*/
    //                      Custom Background                         //
    /*----------------------------------------------------------------*/

    function fCustomBackground (href, bypass) {
      fAddCSS("html {background-color: rgba(0, 0, 0, 0) !important; background-size:cover; background-image: url("+href+");} body, #masterContent, .ls-master-container1, .ls-master-container2, .ls-std-island-layout-ltr {background-color:transparent !important;}");
      //Warn the user if not using https
      if(!/https/.test(href) && href.length > 2 && !bypass) {
        fWarn("Vi anbefaler at du bruger HTTPS til dit baggrund URL, på den måde kan ingen opsnappe dit data. (Prøv at erstat eks. 'http://www...' med 'https://www...')", 1, 15000);
      }
    }

    /*----------------------------------------------------------------*/
    //                      christmas theme xmas                      //
    /*----------------------------------------------------------------*/

    function fChristmas () {
      if(xmas != false) {
        var p = document.getElementsByClassName('ls-subnav-container')[0];
        if(p) {
          var img = document.createElement('div');
              img.id = "christmas-lights";
              img.style = "position:relative;z-index:1;margin-top:-10px;height:100px;width:"+p.offsetWidth+"px;background-size:"+p.offsetWidth+"px;background-image:url('chrome-extension://"+chrome.runtime.id+"/images/lights_christmas.png');pointer-events: none;";
              p.appendChild(img);
              fAddCSS("#contenttable{position:relative;top:-60px;}");
        }
        fAddLink('xmas', 'theme/stylesheet-xmas.css', false);
      }
      fAddCSS(".ls-master-header-institution{background-image: url(chrome-extension://"+chrome.runtime.id+"/icons/icon128_christmas.png)!important;}");

      var snow = document.createElement('div');
        	snow.className = "button snow";
        	snow.innerHTML = "<a id='snow'><i class='fas fa-snowflake'></i></a>";
        	if(document.getElementsByClassName('floatLeft')[0]) {document.getElementsByClassName('floatLeft')[0].appendChild(snow);

      snow = document.getElementById('snow');
      snow.addEventListener('click', add);

      chrome.storage.local.get([
        'snow'
      ], function (r) {
        if(r.snow == true) {
          add();
        }
      });
      }
      function add () {
        snow.style = "color:#d42426!important;";
        fAddCSS(".ls-master-container1, .ls-master-container2 {background-color:transparent!important;}");
        document.body.style = "background-image: url('http://lectioexpert.000webhostapp.com/img/snow.gif')";
        snow.removeEventListener('click', add);
        snow.addEventListener('click', remove);
        chrome.storage.local.set({'snow':true});
      }
      function remove () {
        snow.style = "color:#444!important;";
        document.body.style = "";
        snow.removeEventListener('click', remove);
        snow.addEventListener('click', add);
        chrome.storage.local.set({'snow':false});
      }
    }

    /*----------------------------------------------------------------*/
    //                      addCSS to document                        //
    /*----------------------------------------------------------------*/
    function fAddCSS (str) {
      document.getElementById('LectioCSS').innerHTML += str;
    }

    function fAddElement (element, id, innerHTML, src, type) {
      if(!element || typeof element != 'string') {return console.warn('invalid properties at fAddElement (master.js).');}
      var e=document.createElement(element);
          if (id)           {e.id=id;}
          if (src)          {e.src=src;}
          if (type)         {e.type=type;}
          if (innerHTML)    {e.innerHTML=innerHTML;}
          return e;
    }

    function fAddLink(id, stylesheet, boolean) {
        var link = document.createElement("link");
            link.type = "text/css";
            link.rel = "stylesheet";
            link.href = "chrome-extension://"+chrome.runtime.id+"/css/"+stylesheet+"";
            link.id = id;

        if(boolean) {//ADD CSS TO IFRAME
          document.getElementsByTagName('iframe')[0].contentDocument.head.appendChild(link);
        } else {
          document.head.appendChild(link);
        }
    }

    function fXMLGet (url, type, callback) {
      if(!url || !type) {return console.warn('Invalid parameters fXMLGet (master.js)');}

      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          // action
          switch (type) {
            case "html":
                callback(xhttp.responseXML);
                break;
            case "json":
                callback(JSON.parse(xhttp.response));
                break;
          }
        }
      };
      xhttp.open("GET", url, true);
      if(type == "html") { xhttp.responseType = "document"; }
      xhttp.send();
    }

    function fBackgroundIMG (url) {

      document.body.style = "background-image:url("+url+");background-size:cover;";
      document.getElementById('masterContent').style = "background:none!important;background-color:none!important;";
    }

    function fWarn (string, level, duration=5000) {//level 1 is yellow 2 is red //standard duration 5000
      var i;
      if(level == 1) {
        fAddCSS("#lectioWarning{color:#ffc107;}");
        i = "fas fa-exclamation-triangle";
      } else {
        fAddCSS("#lectioWarning{color:#dc3545}");
        i = "fas fa-exclamation-circle";
      }
      var warn = document.createElement('div');
          warn.id = "warningDiv";
          warn.innerHTML = "<i style='font-size:200%;margin:5px;' id='lectioWarning' class='"+i+"'></i><br><span id='lectioWarning'><b>Houston we have a problem!</b><br><hr style='border-color:white;'>"+string+"</span>";
          warn.style = "position:fixed;top:0px;left:40%;background:#65656590;min-height:50px;max-width:300px;padding:10px;border-radius:10px;margin-top:-150px;transition:1s;";
          document.body.appendChild(warn);
      setTimeout(function(){fAddCSS("#warningDiv {margin-top:10px !important;}");},50);
      setTimeout(function(){fAddCSS("#warningDiv {margin-top:-150px !important;}");},duration);
    }

    /*----------------------------------------------------------------*/
    //                            Set zoom                            //
    /*----------------------------------------------------------------*/

    function zoomLevel (value) {
      fAddCSS("body {zoom: "+value+"}");
    }

    /*----------------------------------------------------------------*/
    //                      addSearch icon                            //
    /*----------------------------------------------------------------*/

    function addSearchIcon () {
      if((document.getElementById('s_m_mastersearchbtn')) != null) {
        var inner = document.getElementById('s_m_mastersearchbtn').innerHTML;
        var newInner = '<i class="fas fa-search lxSearchIcon"></i>  '+inner+'';
        document.getElementById('s_m_mastersearchbtn').innerHTML = newInner;
      } else if ((document.getElementById('m_mastersearchbtn')) != null) {
        var inner2 = document.getElementById('m_mastersearchbtn').innerHTML;
        var newInner2 = '<i class="fas fa-search lxSearchIcon"></i>  '+inner2+'';
        document.getElementById('m_mastersearchbtn').innerHTML = newInner2;
      }
    }

    /*----------------------------------------------------------------*/
    //                   Forside importantInfo                        //
    /*----------------------------------------------------------------*/

    function importantInfoHeight () {
      var e = document.getElementsByClassName('DashWithScroll textTop');
      for(var i = 0; i < e.length; i++) {
      	var h = e[i].offsetHeight;
        var nh = h + 10;
      	var n = e[i].style.height = ""+nh+"px";
      }
    }

    /*----------------------------------------------------------------*/
    //                        Hovedmenu inject                        //
    /*----------------------------------------------------------------*/

    function hovedMenu () {
      var parent = document.getElementsByClassName('floatLeft')[0];
      if (parent != null) {
        var div = parent.children[0];
        var child = div.children[0];

        if (child.id == 's_m_defaultaspxLink' || child.id == 'm_defaultaspxLink') {
            injectDropdown (parent, div, child);
          } else {
            div = parent.children[1];
            trueChild = div.children[0];
            if (trueChild.id == 's_m_defaultaspxLink' || trueChild.id == 'm_defaultaspxLink') {
              injectDropdown (parent, div, trueChild);
            }
          }
      }
    }

    function injectDropdown(parent, div, child) {
      div.className += ' dropdown';
      child.href = '#';
      child.style = "display:none!important;";
      div.innerHTML += "<a type='button' class='dropbtn button lxHovedMenuPlus'>Hovedmenu <i style='font-size:75%;' class='fas fa-plus'></i></a>";

      var dropdown = document.createElement('div');
          dropdown.className = "dropdown-content";
          dropdown.innerHTML += "<a class='dropdownA' href='https://www.lectio.dk/lectio/"+lectio_skoleId+"/SkemaDagsaendringer.aspx'>Dagsændringer</a><br>";
          dropdown.innerHTML += "<a class='dropdownA' href='https://www.lectio.dk/lectio/"+lectio_skoleId+"/SkemaUgeaendringer.aspx'>Ugeændringer</a><br>";
          dropdown.innerHTML += "<a class='dropdownA' href='https://www.lectio.dk/lectio/"+lectio_skoleId+"/kalender.aspx'>Månedskalender</a><br>";
          dropdown.innerHTML += "<a class='dropdownA' href='https://www.lectio.dk/lectio/"+lectio_skoleId+"/FindSkema.aspx?type=elev'>Elev</a><br>";
          dropdown.innerHTML += "<a class='dropdownA' href='https://www.lectio.dk/lectio/"+lectio_skoleId+"/FindSkema.aspx?type=laerer'>Lærer</a><br>";
          dropdown.innerHTML += "<a class='dropdownA' href='https://www.lectio.dk/lectio/"+lectio_skoleId+"/FindSkema.aspx?type=stamklasse'>Klasse</a><br>";
          dropdown.innerHTML += "<a class='dropdownA' href='https://www.lectio.dk/lectio/"+lectio_skoleId+"/FindSkema.aspx?type=lokale'>Lokale</a><br>";
          dropdown.innerHTML += "<a class='dropdownA' href='https://www.lectio.dk/lectio/"+lectio_skoleId+"/FindSkema.aspx?type=ressource'>Ressource</a><br>";
          dropdown.innerHTML += "<a class='dropdownA' href='https://www.lectio.dk/lectio/"+lectio_skoleId+"/FindSkema.aspx?type=hold'>Hold</a><br>";
          dropdown.innerHTML += "<a class='dropdownA' href='https://www.lectio.dk/lectio/"+lectio_skoleId+"/FindSkema.aspx?type=hold&fag=1361688526'>Gruppe</a><br>";
          dropdown.innerHTML += "<a class='dropdownA' href='https://www.lectio.dk/lectio/"+lectio_skoleId+"/FindSkemaAdv.aspx'>Avanceret skema</a><br>";
          dropdown.innerHTML += "<a class='dropdownA' href='https://www.lectio.dk/lectio/"+lectio_skoleId+"/skift_password.aspx?prevurl=default.aspx'>Skift adgangskode</a><br>";
          dropdown.innerHTML += "<a class='dropdownA' href='https://www.lectio.dk/lectio/"+lectio_skoleId+"/default.aspx'>Lectio hovedmenu</a><br>";
          dropdown.innerHTML += "<a class='dropdownA' href='#'><hr></a><br>";
            dropdown.innerHTML += "<a class='dropdownA' href='https://docs.google.com/forms/d/e/1FAIpQLSf09LyWwIdxxAKFht_6cmAX-40UzZOgQiVHTIQhz9hG736Ydg/viewform?embedded=true'><i class='fas fa-exclamation'></i> Rapporter problem</a><br>";
              dropdown.innerHTML += "<a class='dropdownA' href='https://goo.gl/forms/yCV5EOjBohXrKslD2'><i class='fas fa-poo'></i> Indsend shitty fact </a><br>";
              dropdown.innerHTML += "<a class='dropdownA' href='https://lectioexpert.000webhostapp.com/'><i class='fas fa-home'></i> Vores hjemmeside </a><br>";

      div.appendChild(dropdown);
    }

    /*----------------------------------------------------------------*/
    //                       Move skema island                        //
    /*----------------------------------------------------------------*/

    function moveIsland (number) {
      var island = document.getElementsByClassName('island  mediumBlock mediumBlockHeight')[1].id = 'islandDOMparent';
      if(number == 2) {
        var islandchildchild = document.getElementsByClassName('island  mediumBlock mediumBlockHeight')[2].id = 'islandDOMchildChild';
        document.getElementById('islandDOMchildChild').children[0].id = 'islandDOMchildHeader';
        document.getElementById('islandDOMparent').appendChild(  document.getElementById('islandDOMchildChild') );
      }
      if(number == 1 || oldValue == 1) {
        var islandParent = document.getElementsByClassName('island  mediumBlock mediumBlockHeight')[3].id = 'islandDOMchild';
        document.getElementById('islandDOMchild').children[0].id = 'islandDOMchildHeader';
        document.getElementById('islandDOMparent').appendChild(  document.getElementById('islandDOMchild') ); oldValue = 1;
      }
    }

    /*----------------------------------------------------------------*/
    //                           Check afk                            //
    /*----------------------------------------------------------------*/

    function checkAFK () {
      var dialog = document.getElementsByClassName('ui-dialog ui-corner-all ui-widget ui-widget-content ui-front ui-dialog-buttons ui-draggable')[0];
      if(dialog != null) {
        var dialog_header = document.getElementsByClassName('ui-dialog-content ui-widget-content')[0].children[0].innerHTML;
        if (dialog_header == "Du bliver snart logget ud.") {
          location.reload();
        }
      }
    }

    /*----------------------------------------------------------------*/
    //                         Feedback dialog                        //
    /*----------------------------------------------------------------*/
    //(Suppose to only run on front page)
    function fFeedbackDialog () {
      //function executer
      chrome.storage.local.get(['Lectio_dontAskAgain'], function (r) {
        if(r.Lectio_dontAskAgain == "dontExecuteMe"/*!= true*/) {fFeedbackDialog();}
      });

      var date = Date.now();

      chrome.storage.local.get([
       'Lectio_lastDate'
      ], function (r) {
       if(r != undefined && r.Lectio_lastDate != undefined) { var dif = date - r.Lectio_lastDate;
         if(dif > 8640000) {
           chrome.storage.local.set({Lectio_lastDate:date});
           fFeedbackDialogStart();}
         } else {chrome.storage.local.set({Lectio_lastDate:date});
       }
     });

            function fFeedbackDialogStart () {
                document.getElementById('masterContent').WebkitFilter = 'blur(4px)';
                document.getElementById('masterContent').style.filter = 'blur(4px)';
              var popup = document.createElement('div');
                  popup.class = "modal";
                  popup.id = "updateDue";
                  popup.style = "background-color:gray;opacity:.9;position: absolute;top:50px;margin: auto;width: 25%;left: 38%;  padding: 20px 20px 20px 20px;color:white; border-radius:5px;";
                  popup.innerHTML = "<img style='background-color:white;' src='chrome-extension://"+chrome.runtime.id+"/icons/blue64.png'></img><button id='closeUpdateDue' style='font-size:120%;cursor:pointer;border:none;background:none;color:white;position:inherit;top:4px;right:3px;' href='#'>x</button><span>";
                  popup.innerHTML += "<h1 style='color:white;'>Vi har brug for din hjælp!</h1><p style='font-style:italic;'>Hvad kan vi gøre bedre?</p></span><hr>";
                  popup.innerHTML += "<iframe src='https://docs.google.com/forms/d/e/1FAIpQLSe0EPELDGQf-UMZhqc48wvkSMafMwEpj_6xn-knPtHy7TNTLA/viewform?embedded=true' width='360' height='350' frameborder='0' marginheight='0' marginwidth='0'>Indlæser...</iframe>";
                  popup.innerHTML += "<hr><form style='font-style:italic;text-align:center;'>Spørg mig ikke igen<input type='checkbox' id='dontAskAgain'></input></form><br><div style='text-align:center;font-style:italic;' id='updateMe'></div>";
                  popup.WebkitFilter = 'blur(0px) !important';
                  popup.style.filter = 'blur(0px) !important';
                  document.body.appendChild(popup);
              document.getElementById('closeUpdateDue').onclick = function () {
                document.getElementById('updateDue').style = 'display:none;';
                document.getElementById('masterContent').WebkitFilter = 'blur(0px)';
                document.getElementById('masterContent').style.filter = 'blur(0px)';
              };
              var checked = document.getElementById('dontAskAgain').checked;
              window.addEventListener('click', function (event) {
                var update = document.getElementById('dontAskAgain').checked;
                if (checked != update) {
                  chrome.storage.local.set({Lectio_dontAskAgain:update});
                  document.getElementById('updateMe').innerHTML = "Gemt!";
                }
              });
              }
            }

    /*----------------------------------------------------------------*/
    //                         Change icons                           //
    /*----------------------------------------------------------------*/

    function fChangeIcons () {
        //Actions
        replaceIcon("doc.gif", '<i class="far fa-file-alt"></i>', 'document');
        replaceIcon("doc.auto", '<i class="far fa-file-alt"></i>', 'document');
        replaceIcon("copytoexcel.gif", '<i class="far fa-file-excel"></i>', 'document-excel');
        replaceIcon("newfolder.auto", '<i class="fas fa-folder-plus"></i>', 'newfolder');
        replaceIcon("editfolder.auto", '<i class="fas fa-edit"></i>', 'editfolder');
        replaceIcon("movetofolder.auto", '<i class="fas fa-arrows-alt-h"></i>');
        replaceIcon("question-circle-blue.auto", '<i class="fas fa-question-circle"></i>', 'question');
        replaceIcon("note.auto", '<i class="far fa-sticky-note"></i>', 'iconNote');
        replaceIcon("padlock.auto", '<i class="fas fa-lock"></i>');
        replaceIcon("timelist.auto", '<i class="fas fa-list"></i>');

        replaceIcon("udskriv.gif", '<i class="fas fa-print"></i>', 'print');
        replaceIcon("folder.gif", '<i class="fas fa-folder"></i>');
        replaceIcon("trash.gif", '<i class="fas fa-trash-alt"></i>', "iconTrash");
        replaceIcon("mviewf.gi", '<i class="fas fa-flag"></i>', 'iconFlag');
        replaceIcon("newestm.gif", '<i class="fas fa-envelope"></i>');
        replaceIcon("mreadall.gif", '<i class="fas fa-check-square"></i>');
        replaceIcon("message.auto", '<i class="fas fa-envelope"></i>');
        replaceIcon("mread.gif", '<i class="fas fa-envelope-open"></i>');
        replaceIcon("munread.gif", '<i class="fas fa-envelope"></i>');
        replaceIcon("teacher.auto", '<i class="fas fa-user-circle"></i>', 'teacher');
        replaceIcon("student.auto", '<i class="fas fa-user-circle"></i>', 'student');
        replaceIcon("class.auto", '<i class="fas fa-users"></i>', 'group');
        replaceIcon("delete.auto", '<i class="fas fa-times"></i>', 'delete');
        replaceIcon("lesson.gif", '<i class="fas fa-calendar-alt"></i>', 'calendar');
        replaceIcon("lesson.auto", '<i class="fas fa-calendar-alt"></i>', 'calendar');

            //function for actions
            function replaceIcon (query, replace, id) {
              var e = document.querySelectorAll('img[src*="'+query+'"]');
              for(var i=0;i<e.length;i++) {
                var n = document.createElement('span');
                    n.innerHTML = replace;
                    n.className = 'TreeNode-icon ' + (id ? id : '');
                    e[i].parentNode.insertBefore(n, e[i]);
                e[i].remove();
              }
            }
    }

    function fGradeAverage () {
      //DOM Variables
      var tbody=document.querySelector('#s_m_Content_Content_karakterView_KarakterGV tbody');
      var tr=tbody.querySelectorAll('tr');
      var col=tbody.children[0].childElementCount;
      var a_class_array = []; var a_classes=0;

      //setup the array structure fyi. the structure is like this [[grade,weight]/*column 1*/,[grade,weight]/*column 2*/,[grade,weight]...] the grade is already weighted, so for later use of getting the average
      var array=[];
      for(var columnsI=2;columnsI<col;columnsI++) {   array.push([0,0,0]);  }

      //loop through the table rows
      for(var trI=1;trI<tr.length;trI++) {
        //loop through the table cells in the row
      	for(var colI=2;colI<col;colI++) {
          var e = tbody.rows[trI].cells[colI].querySelector('div');
          if (e) {
              var grade;
              var weight = Number(e.title.slice(e.title.indexOf("Vægt: ")+6,e.title.indexOf("Vægt: ")+10).replace(",","."));
              if(e.innerText.length >= 3) {
                if(/10/.test(e.innerText) || /12/.test(e.innerText)) {grade=e.innerText.slice(0,2);}
                else {grade=Number(e.innerText.slice(0,1));console.log(e.innerText.slice(0,1));}
              } else {
                grade=Number(e.innerText);
              }
              //console.log(grade, e, e.innerText.length);

              array[colI-2][0] += grade*weight;     array[colI-2][1] += weight; array[colI-2][2]++;

              var className = e.title.slice(e.title.indexOf('XPRSFag: ')+9,e.title.length);

              if(!a_class_array.includes(className.slice(0,className.indexOf(" ")))) {a_class_array.push(className.slice(0,className.indexOf(" ")));}
          }
      	}
      }//console.log(array);

      //setup the dom
      var etr=document.createElement('tr');
          etr.id="average";
          etr.style="border-top:1px solid black";
          etr.className="textCenter";
          etr.innerHTML="<td colspan='2'><b>Vægtet gennemsnit</b></td>";
          tbody.appendChild(etr);
          etr=document.getElementById('average');
      //check if 5 A classes
      for(var y=0;y<a_class_array.length;y++) {
        if(a_class_array[y].slice(a_class_array[y].length-1, a_class_array[y].length) == "A") {
          a_classes++;//amount of a classes
        }
      }

      //Calc the average
      for(var i=0;i<array.length;i++) {
        /*if(array[i][2] == 1) {//If more than 4 A classes
          addAverageDOM(array[i][0]);
        } else*/ if (a_classes>4) {
          addAverageDOM((array[i][0] / array [i][1])*1.03);//times the average by 1,03
        } else {
          addAverageDOM(array[i][0] / array [i][1]);
        }
      }

      //Add the dom
      function addAverageDOM(average) {
        var x = document.createElement('td');
            x.innerHTML = average.toFixed(2).toLocaleString().replace('.',',');
            x.className="textCenter";
            x.title=average;
            etr.appendChild(x);
      }
        (function(){
          var container=d.qAll("#s_m_Content_Content_karakterView_KarakterGV div.textCenter");
          var average=d.qAll("#average td.textCenter");
          var keyStr="";
          d.aE("keyup",function(e){
          	keyStr+=e.key;
            switch (true) {
              case /gimig12/.test(keyStr):
                  changeGrade(12);
                  break;
                  case /gimig10/.test(keyStr):
                      changeGrade(10);
                      break;
                      case /gimig7/.test(keyStr):
                          changeGrade(7);
                          break;
                          case /gimig4/.test(keyStr):
                              changeGrade(4);
                              break;
                              case /gimig02/.test(keyStr):
                                  changeGrade("02");
                                  break;
                                  case /gimig00/.test(keyStr):
                                      changeGrade("00");
                                      break;
                                      case /gimig-3/.test(keyStr):
                                          changeGrade(-3);
                                          break;
            }
          });
          function changeGrade (grade) {
            keyStr="";
            for(var i=0;i<container.length;i++) {
              container[i].innerHTML=grade;
            }
            for(var y=0;y<average.length;y++) {
              average[y].innerHTML=grade;
            }
          }
        }());
      }

    function getWeek () {
      var d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
      var dayNum = dT.getUTCDay() || 7;
      d.setUTCDate(dT.getUTCDate() + 4 - dayNum);
      var yearStart = new Date(Date.UTC(dT.getUTCFullYear(),0,1));
      return Math.ceil((((d - yearStart) / 86400000) + 1)/7);
    }

    function fSchemeAbsence () {
      //fAddElement (element, id, innerHTML, src, type)
      document.querySelector('head').appendChild(
        fAddElement("script", null, null, "chrome-extension://"+chrome.runtime.id+"/js/schemeAbsence.js", "text/javascript")
      );
    }

/*----------------------------------------------------------------*//*----------------------------------------------------------------*/
/*                                                                *//*                                                                */
//                              Pages                             ////                              Pages                             //
/*                                                                *//*                                                                */
/*----------------------------------------------------------------*//*----------------------------------------------------------------*/
/*----------------------------------------------------------------*//*----------------------------------------------------------------*/
/*                                                                *//*                                                                */
//                              Pages                             ////                              Pages                             //
/*                                                                *//*                                                                */
/*----------------------------------------------------------------*//*----------------------------------------------------------------*/
/*----------------------------------------------------------------*//*----------------------------------------------------------------*/
/*                                                                *//*                                                                */
//                              Pages                             ////                              Pages                             //
/*                                                                *//*                                                                */
/*----------------------------------------------------------------*//*----------------------------------------------------------------*/
/*----------------------------------------------------------------*//*----------------------------------------------------------------*/
/*                                                                *//*                                                                */
//                              Pages                             ////                              Pages                             //
/*                                                                *//*                                                                */
/*----------------------------------------------------------------*//*----------------------------------------------------------------*/

//page frontpage lectio.dk
function pFrontPage () {
  if((document.getElementById('nightTheme')) != null) {
    fAddLink("night", "darkTheme/stylesheet-darkThemeSimple.css", true);
    fAddLink("night", "stylesheet-main.css", true);
    fReplaceLogo('lectio_logoW.png');
  } else if ((document.getElementById('main')) != null && (document.getElementById('nightTheme')) == null) {
    fAddLink("night", "stylesheet-main.css", true);
    fReplaceLogo('lectio_logoB.png');
  }
  function fReplaceLogo (src) {
    var img = document.getElementsByTagName('img')[0];
        if(img.src == "https://www.lectio.dk/lectio/img/lectio_logo.gif") {
          img.src = "chrome-extension://" + chrome.runtime.id + "/icons/" + src;
        }
  }
  //Søg på forsiden
  (function () {
    if(d.q('iframe').contentDocument.body.children[0] != null) {
      fSearchQuery();
    } else {
      d.q('iframe').aE('load', fSearchQuery);
    }
    function fSearchQuery () {
      var iframe = d.q('iframe').contentDocument;
        var p = iframe.querySelector('#schoolsdiv');
        var e = iframe.createElement('div');
            e.id = "searchQuery-div";
            e.innerHTML = "Søg:    <input id='searchQuery-input' autocomplete='off'>  <br>  <div id='searchQuery-result'></div><hr>";
            p.insertBefore(e, p.children[0]);

            var inputE = iframe.querySelector('#searchQuery-input');
            iframe.querySelector('#searchQuery-input').addEventListener('keydown', function (e) {
              iframe.querySelector('#searchQuery-result').innerHTML = "";
              var input = inputE.value;
              var headings = iframe.evaluate("//a[contains(translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '"+input.toLowerCase()+"')]", p, null, XPathResult.ANY_TYPE, null );
              var el = headings.iterateNext();

              var r = "";
              var i = 0;

              while (el != null) {
                if(i > 5) {break;}
                r += "<a href='"+el.href+"' >"+el.innerHTML+"</a>";
                el = headings.iterateNext();
                i++;
              }
              iframe.querySelector('#searchQuery-result').innerHTML = r;
            });
    }
  }());
  // As I was writing this I realized I already have the users school id saved in localStorage.
  // Meaning I can just redirect the user to the last school they logged into.
  // Meaning I am a retard because I wasted a couple of hours writing this totally uneccesary code.
  //
  // I'm gonna leave this here for now, because I'm angry and disapointed...

  // schools to use for redirect
  (function () {
    chrome.storage.local.get(["schoolId", "Lectio_useRedirect"], function (r) {
      if(isNaN(r.schoolId) == false && r.Lectio_useRedirect == true) {c.l("https://www.lectio.dk/lectio/"+ r.schoolId +"/login.aspx");
        chrome.storage.local.set({"redirected":true});
        window.location.href="https://www.lectio.dk/lectio/"+ r.schoolId +"/login.aspx";
      }
    });
  //   var ar=[];
  //   var e=document.querySelectorAll(".buttonHeader.textLeft a");
  //   for (var i=0;i<e.length;i++) {
  //   	ar.push([[e[i].innerHTML],[e[i].href]]);
  //   }
  //   chrome.storage.local.set({"schools": ar});
  }());
}

//page skema SkemaNy.apsx
function pSkema () {
  //check if exam to show exam feauture
  if(/SkemaNy.aspx/.test(url) && !/prevurl=SkemaNy.aspx/.test(url)) {
    if(d.q(".s2bgboxeksamen")) {
      chrome.storage.local.set({"Lectio_examOnScheme":true});
      chrome.storage.local.get(["Lectio_examInfoDisplayed"], function (r) {
        if(r.Lectio_examInfoDisplayed != true) {
          var modalBG = document.createElement('div');
              modalBG.className="lxModalBG";
              document.getElementById('masterContent').WebkitFilter = 'blur(4px)';
              document.getElementById('masterContent').style.filter = 'blur(4px)';
          var modal = document.createElement("div");
              modal.className = "lxModal";
              modal.id = "lxExamInfo";
              modal.innerHTML =
                "<img id='iconModal' src='chrome-extension://"+chrome.runtime.id+"/icons/icon128.png'>"+
                '<i id="closeModal" class="fas fa-window-close"></i>'+
                "<div>"+
                  "<h1>Hello comrade</h1>"+
                  "<p><b>Vi kan se du snart skal til en eksamen</b>, det er vi ked af at høre, men"+
                  " til gengæld har vi implementeret en feauture, som gør at du ikke behøves "+
                  "at bekymre dig om, Lectio Expert bruger noget internet, som vi ikke burde under eksamen."+
                  "<br><br>"+
                  "<b>Du kan gå ind og slå denne eksamens funktion til i popup-vinduet under indstillinger</b>, den hedder sjovt "+
                  "nok 'eksamens tilstand'. Når denne funktion er til, henter vi ikke ting som tidspunkt for solnedgang/solopgang.</p>"+

                  "<br><p><b>Vi anbefaler naturligvis at du slår denne funktion til, når du er til eksamen.</b></p>"+

                  "<br>"+
                  "<p><b>Ha' det godt! Eller noget...</b></p>"+
                  "<p> - Yours truly, Lectio Expert.</p>"+
                "</div>";
              document.body.appendChild(modalBG);
              document.body.appendChild(modal);
              d.q(".lxModal #closeModal").aE('click', function(e) {
                d.q(".lxModal").style="display:none;";
                d.q(".lxModalBG").style="display:none;";
                document.getElementById('masterContent').WebkitFilter = 'blur(0px)';
                document.getElementById('masterContent').style.filter = 'blur(0px)';
                chrome.storage.local.set({"Lectio_examInfoDisplayed":true});

              });
            }
      });
    } else {
      chrome.storage.local.set({"Lectio_examOnScheme":false});
    }
  }
  //skema timeline
  (function(){
    if (d.qAll('.s2module-info')
        .length > 0) {
        var el = d.qAll('.s2module-info')[0].children[0];
        var time = el.innerHTML.slice(el.innerHTML.indexOf('<br>') + 4, el.innerHTML.length);
        var tStart = time.slice(0, time.indexOf('-') - 1);
        var tStart_hour = tStart.slice(0, tStart.indexOf(':'));
        var tStart_min = tStart.slice(tStart.indexOf(':') + 1, tStart.length);
        var tEnd = time.slice(time.indexOf('-') + 2, time.length);
        var tEnd_hour = tEnd.slice(0, tEnd.indexOf(':'));
        var tEnd_min = tEnd.slice(tEnd.indexOf(':') + 1, tEnd.length);
        var dStart = new Date(dT.y, dT.m, dT.d, tStart_hour, tStart_min)
            .getTime();
        var dEnd = new Date(dT.y, dT.m, dT.d, tEnd_hour, tEnd_min)
            .getTime();
        var totalHeight = d.q('td .s2skemabrikcontainer');
        var time_px_ratio = (dEnd - dStart) / d.q('.s2module-bg').clientHeight;

        var e = d.c('div');
        e.id = 'LectioExpertTimeLine';
        e.style.width = d.q('#s_m_Content_Content_SkemaNyMedNavigation_skema_skematabel')
            .clientWidth + 'px';
        if (totalHeight.clientHeight > (dT.t - dStart) / time_px_ratio && dT.t - dStart > 0) {
            e.style.top = (dT.t - dStart) / time_px_ratio + 1.6 + "px"; //13.390985
        } else {
            e.style = "display:none";
        }
        totalHeight.insertBefore(e, totalHeight.children[0]);
        var intv = window.setInterval(function() {
            var nD = new Date()
                .getTime();
            if (totalHeight.clientHeight >= (nD - dStart) / time_px_ratio && dT.t - dStart > 0) {
                e.style.top = (nD - dStart) / time_px_ratio + 1.6 + "px"; //+ 13.390985
            } else {
                e.style = "display:none";
            }
        }, nSec * 5);
        c.l(dStart, dT.t);
        c.l(time_px_ratio, (totalHeight*time_px_ratio.clientHeight)/nHour, "--- " , dStart, dEnd);
        c.l('########################################');
        c.l((dT.t - dStart)/nHour);
        c.l(((dT.t - dStart)/time_px_ratio));
    }
  }());
  (function () {
    var evtStr = "";
    document.addEventListener('keydown', function (evt) {
      if(evt.keyCode == 39) {//RIGHT
        document.getElementById('s_m_Content_Content_SkemaNyMedNavigation_datePicker_nextLnk').click();
      }
      if(evt.keyCode == 37) {//LEFT
        document.getElementById('s_m_Content_Content_SkemaNyMedNavigation_datePicker_prevLnk').click();
      }
      var p;
      evtStr += evt.key;
      if(/jeg orker ikke mere/.test(evtStr) == true || /jegorkerikkemere/.test(evtStr) == true || evt.keyCode == 220) {
        evtStr = "";
        p = document.getElementsByClassName('s2skemabrikInnerContainer');
        for(var i=0; i < p.length;i++) {
            p[i].style = "text-decoration:line-through;background:#DDBABA!important;color:#444!important;";
        }
      } else if (/jeg orker virkelig ikke mere/.test(evtStr) == true || /jegorkervirkeligikkemere/.test(evtStr) == true || evt.keyCode == 220) {
        evtStr = "";
        p = document.getElementsByClassName('s2skemabrikInnerContainer');
        for(var ii=0; ii < p.length;ii++) {
            p[ii].style = "display:none;";
        }
      }
    });
  }());
  (function () {
    if(document.querySelectorAll('.s2skemabrikcontainer.lec-context-menu-instance .s2module-bg')[0]) {
      var e=document.querySelectorAll('.s2bgbox');
      for(var ii=0;ii<e.length;ii++) {
        var width = document.querySelectorAll('.s2skemabrikcontainer.lec-context-menu-instance .s2module-bg')[ii].clientWidth;
        //5 day
      	if(e[ii].style.left.slice(0,1) == 0 && e[ii].style.width.slice(0,1) == 6) {e[ii].style.left="0.014em"; e[ii].style.width=width/2+"px";}//left 50% width
      	else if (e[ii].style.left.slice(0,1) == 0 && e[ii].style.width.slice(0,2) == 13) {e[ii].style.left="0.014em"; e[ii].style.width=width+"px";}//full regular
      	else if (e[ii].style.left.slice(0,1) == 7 && e[ii].style.width.slice(0,1) == 6) {e[ii].style.left="7.44em"; e[ii].style.width=width/2+"px";}//right 50% width
        //33% width
        else if (Number(e[ii].style.left.slice(0,4)) == 0.55 && (Number(e[ii].style.width.slice(0,4))) == 4.36) {e[ii].style.left="0em"; e[ii].style.width=width/3+"px";}
        else if (Number(e[ii].style.left.slice(0,4)) == 5.27 && (Number(e[ii].style.width.slice(0,4))) == 4.36) {e[ii].style.left="4.99em"; e[ii].style.width=width/3+"px";}
        else if (Number(e[ii].style.left.slice(0,2)) == 10 && (Number(e[ii].style.width.slice(0,4))) == 4.36) {e[ii].style.left="9.98em"; e[ii].style.width=width/3+"px";}
        //7 day
        if(e[ii].style.left.slice(0,4) == 0.55 && e[ii].style.width.slice(0,4) == 4.36) {e[ii].style.left="0em"; e[ii].style.width=width/2+"px";}//left 50% width 7 day week
        else if (e[ii].style.left.slice(0,4) == 0.55 && e[ii].style.width.slice(0,4) == 9.09) {e[ii].style.left="0em"; e[ii].style.width=width+"px";}//full regular 7 day week
        else if (e[ii].style.left.slice(0,4) == 5.27 && e[ii].style.width.slice(0,4) == 4.36) {e[ii].style.left="5.15em"; e[ii].style.width=width/2+"px";}//right 50% width 7 day week
        //33% width 7 day
        // else if (Number(e[ii].style.left.slice(0,4)) == 0.55 && (Number(e[ii].style.width.slice(0,4))) == 4.36) {e[ii].style.left="0em"; e[ii].style.width=width/3+"px";c(10);} // left 7 day
        // else if (Number(e[ii].style.left.slice(0,4)) == 5.27 && (Number(e[ii].style.width.slice(0,4))) == 4.36) {e[ii].style.left="4.51em"; e[ii].style.width=width/3+"px";c(11);}
        // else if (Number(e[ii].style.left.slice(0,2)) == 10 && (Number(e[ii].style.width.slice(0,4))) == 4.36) {e[ii].style.left="4.51em"; e[ii].style.width=width/3+"px";c(12);}
      }
    }

      var cp;
      if(/SkemaNy.aspx/.test(url)) {cp = document.querySelectorAll('div.s2skemabrikcontainer .lec-context-menu a[href]');} else {cp = document.querySelectorAll('div#s_m_Content_Content_skemaIsland_pa .lec-context-menu a[href]');}
      var sk = document.getElementsByClassName('s2skemabrikInnerContainer');
      var tInfo = ""; var cInfo = ""; var r=""; var urlDownload;
      for(var i = 0; i < sk.length;i++) { r="";
          te = sk[i].querySelectorAll('span[data-lectiocontextcard*="T"]');
      			for(var teI=0;teI<te.length;teI++) {
        			r+="<a id='showTeacher' class='contextmenuCustom nolink' target='_blank' href=https://www.lectio.dk/lectio/"+lectio_skoleId+"/SkemaNy.aspx?type=laerer&laererid="+te[teI].dataset.lectiocontextcard.replace("T","")+"><i class='fas fa-user'></i> Lærer skema ("+te[teI].innerHTML+")</a>";
              te[teI].dataset.lectiocontextcard = "";
      			}
          ce = sk[i].querySelectorAll('span[data-lectiocontextcard*="HE"]');
      			for(var ceI=0;ceI<ce.length;ceI++) {
        			r+="<a id='showClass' class='contextmenuCustom nolink' target='_blank' href=https://www.lectio.dk/lectio/"+lectio_skoleId+"/SkemaNy.aspx?type=holdelement&holdelementid="+ce[ceI].dataset.lectiocontextcard.replace("HE","")+"><i class='fas fa-users'></i> Hold skema ("+ce[ceI].innerHTML+")</a>";
              ce[ceI].dataset.lectiocontextcard = "";
            }
          urlDownload = "getDownloads('"+cp[i].href+"',"+i+");";
          r += '<a id="showDownloads" class="contextmenuCustom nolink" onmouseover='+urlDownload+'><i class="fas fa-download"></i> Se indhold</a>';
          cp[i].parentElement.parentElement.innerHTML = r;
      }

      //data holder
      var ec = document.createElement('div');
          ec.id = "lxDataHolder";
          ec.style="max-height:0px;overflow:hidden;opacity:0;";
          document.body.appendChild(ec);

      //fetch content
      var script = document.createElement('script');
          script.innerHTML =
            "function getDownloads(url,count) {var inProgress;"+
              "if(document.getElementById('homeworkContentContainer') == null && !inProgress || document.getElementById('homeworkContentContainer').className != count && !inProgress) {inProgress = true;"+
              "var xhttp = new XMLHttpRequest();"+
              "xhttp.onreadystatechange = function() {"+
                  "if (this.readyState == 4 && this.status == 200) {"+
                    ""+
              	"console.log(xhttp);"+
                "document.getElementById('lxDataHolder').innerHTML = '';"+
              	"document.getElementById('lxDataHolder').appendChild(xhttp.responseXML.getElementById('homeworkContentContainer'));"+
                "document.getElementById('homeworkContentContainer').className = count;"+
                  "}"+
              "};"+
              'xhttp.open("GET", url, true);'+
              'xhttp.responseType = "document";'+
              "xhttp.send();"+
              "inProgress = false;}"+
            "}";
          document.body.appendChild(script);

      //Add the fetched content to DOM
      document.getElementById('lxDataHolder').addEventListener('DOMNodeInserted', function (e) {var inProcess;
        if(!inProcess) {inProcess=true;
          var de = document.querySelectorAll('#lxDataHolder .lc-display-nakedlink');
          var context_menu = document.querySelector('.lec-context-menu[style] ul');
          var dir;// = document.querySelectorAll('.s2skemabrikcontainer .lec-context-menu ul');
          if(/SkemaNy.aspx/.test(url)) {dir = document.querySelectorAll('div.s2skemabrikcontainer .lec-context-menu ul');} else {dir = document.querySelectorAll('div#s_m_Content_Content_skemaIsland_pa .lec-context-menu ul');}
          setTimeout(function(){
            var p = document.getElementById('homeworkContentContainer').className;
            if(dir[p].dataset.downloaded != "true") {
              for (var i=0;i<de.length;i++) {
                de[i].id = "contextDownloads";
                dir[p].appendChild(de[i]);
                context_menu.appendChild(de[i].cloneNode(true));
              }
              if(!de[0]) {
                dir[p].innerHTML += "<a id='contextDownloads' class='nolink'><i>Intet af se her...</i></a>";
                context_menu.innerHTML += "<a id='contextDownloads' class='nolink'><i>Intet at se her...</i></a>";
              }
              dir[p].dataset.downloaded = "true";
            }

          },200);
        }
      });
  }());
    var p=document.querySelector('.ls-std-rowblock-ltr');
    var div=document.createElement('div');
        div.id="rdataisbeautiful";
        div.className="lxButton";
        div.innerHTML='<i class="far fa-chart-bar"></i>  Skema statistik';
        div.addEventListener('click', dataisbeautiful);
        if(p) p.appendChild(div);

    function dataisbeautiful () {
      div.removeEventListener('click', dataisbeautiful);
      var head=document.querySelector('head');
      var script=document.createElement('script');
          script.src="chrome-extension://"+chrome.runtime.id+"/js/skemaChart.js";
          script.type="text/javascript";
          head.appendChild(script);

      var island=document.querySelector("#s_m_Content_Content_SkemaNyMedNavigation_skemaprintarea");
      var height=island.offsetHeight;
      fAddCSS('#s_m_Content_Content_SkemaNyMedNavigation_skemaprintarea{display:none;}');
    }
    chrome.storage.local.get(['Lectio_dayNote'], function (r) {
     if(r.Lectio_dayNote != false) {dayNote();}
    });

    //Run
    function dayNote () {
      var statusExpanded=false;
      var style = document.createElement('style');
      style.innerHTML = ".s2skema .s2infoHeader, .s2skema .s2infoHeader > div {overflow:hidden;max-height: 35px!important;}";
      document.body.appendChild(style);

      var weekNotes = document.getElementsByTagName('tbody')[0].children[2];
      var dayNotesCount = weekNotes.childElementCount;

      for (var i=1; i < dayNotesCount; i++) {
        var parent = document.getElementsByClassName('s2infoHeader')[i];



        var closeDiv = document.createElement('div');
        closeDiv.innerHTML = "Vis mere";

        closeDiv.className = "dayNoteShow";
        closeDiv.style = "background-color:#F8F8F8;z-index:2;text-align:center;font-style:italic;text-decoration:underline;cursor:pointer;";
        //parent.appendChild(closeDiv);
        parent.insertBefore(closeDiv, parent.firstChild);
      }

      weekNotes.addEventListener('click', function (event) {expand ();});



      function expand () {

        var dayNoteCount = document.querySelectorAll('.dayNoteShow').length;

        switch(statusExpanded) {

          case false:
              for(var i=0;i<dayNoteCount;i++) {

                document.getElementsByClassName('dayNoteShow')[i].innerHTML = "Vis mindre";
              }
              style.innerHTML = ".s2skema .s2infoHeader, .s2skema .s2infoHeader > div {max-height: 500px!important;}";
              statusExpanded = true;

              break;

          case true:
              for(var y=0;y<dayNoteCount;y++) {
                document.getElementsByClassName('dayNoteShow')[y].innerHTML = "Vis mere";
              }
              style.innerHTML = ".s2skema .s2infoHeader, .s2skema .s2infoHeader > div {overflow:hidden;max-height: 35px!important;}";
              statusExpanded = false;
              break;
        }
      }
    }
}

//page fravær
function pAbsence () {
  var head = document.head;

  head.appendChild(fAddElement("script",null,null, "chrome-extension://"+chrome.runtime.id+"/js/absence.js", "text/javascript"));

  var source = document.createElement('script');
      source.type = "text/javascript";
      source.id = "googleCharts";
      source.src = "https://www.gstatic.com/charts/loader.js";
      head.appendChild(source);

    source.onload = function () {
      var script = document.createElement('script');
          script.type = "text/javascript";
          script.src = "chrome-extension://"+ chrome.runtime.id + "/js/absenceChart.js";
          head.appendChild(script);
    };
	fAddCSS("svg > g > g:last-child { pointer-events: none }");

   var absenceAr=[0,0,0];
   var totalHours=document.querySelectorAll('#s_m_Content_Content_SFTabStudentAbsenceDataTable tbody tr:last-child td')[6].innerText;
        totalHours=totalHours.slice(totalHours.indexOf('/')+1,totalHours.length).replace(",",".");
   var periodHours=document.querySelectorAll('#s_m_Content_Content_SFTabStudentAbsenceDataTable tbody tr:last-child td')[4].innerText;
        periodHours=periodHours.slice(periodHours.indexOf('/')+1,periodHours.length).replace(",",".");

   get(document.querySelector('#s_m_HeaderContent_subnavigator_ctl02').href, function (callback) {
       for(var i=1;i<callback.length;i++) {
         absenceAr[0]++;
         if(callback[i].querySelector('img[src="/lectio/img/ok.gif"]')) {
           absenceAr[1]++;
         } else {
           absenceAr[2]++;
         }
       }
   	console.log(absenceAr);
   	build();
   }, "html");

   function build () {
     var spacer=document.createElement('tr');spacer.innerHTML="<td colspan='14'></td>";document.querySelector('#s_m_Content_Content_SFTabStudentAbsenceDataTable tbody').appendChild(spacer);
   	var e=document.createElement('tr');
      e.className='lectioTR';
   		e.innerHTML="<td colspan='7'><b class='center'>Fraværsprocent perioden - ink. godskrevet: "+((absenceAr[0]/periodHours)*100).toFixed(2)+"%</b></td>"+"<td colspan='6'><b class='center'>Fraværsprocent året - ink. godskrevet: "+((absenceAr[0]/totalHours)*100).toFixed(2)+"%</b></td>";
   		document.querySelector('#s_m_Content_Content_SFTabStudentAbsenceDataTable').appendChild(e);
   }

   function get(url, callback, responseType) {
   var xhttp = new XMLHttpRequest();
     xhttp.onreadystatechange = function() {
       if (this.readyState == 4 && this.status == 200) {
       	callback(xhttp.responseXML.querySelectorAll('#s_m_Content_Content_FatabAbsenceFravaerGV tr'));
       }
     };
     xhttp.open("GET", url, true);
     if(responseType == "html") {xhttp.responseType="document";}
     xhttp.send();
   }
}

//page fravær fravaerelev_fravaersaarsager.aspx
function pAbsenceReason () {
  var checked;

  chrome.storage.local.get([
    'multiAbsence_active'
  ], function (r) {
    active = r.multiAbsence_active;

    switch (true) {
      case /lectio\/.*\/fravaerelev_fravaersaarsager.aspx/.test(url):
          absenceList();
          break;
      case /lectio\/.*\/fravaer_aarsag.aspx/.test(url):
          absenceSubmit();
          break;
    }
  });

  function absenceList () {
    if (active) {absenceRedirect(); return;}

    if (!document.getElementsByClassName('noRecord')[0] || document.getElementsByClassName('noRecord')[0].innerHTML != "Der er ingen manglende fraværsårsager...") {
      //Prefab
      (function () {
        var div = document.createElement('div');
            div.id = "multiAbsence";
            div.innerHTML =
                          "<h2>Multi-fraværsårsag</h2>"+
                          'Fraværsårsag:<br> <select id="multiAbsence-reason"><option id="0" selected="selected" value="0"></option><option value="1">Andet</option><option value="2">Kom for sent</option><option value="3">Skolerelaterede aktiviteter</option><option value="4">Private forhold</option><option value="5">Sygdom</option></select>'+
                          "<br><br>Kommentar:<br> <textarea id='multiAbsence-comment'></textarea>"+
                          "<br><br><div id='multiAbsence-button'> Angiv multi-fraværsårsag </div>";
            document.getElementById('s_m_Content_Content_FatabMissingAarsagerIsland_pa').insertBefore(div, document.getElementById('s_m_Content_Content_FatabMissingAarsagerIsland_pa').children[0]);

        document.getElementById('multiAbsence-reason').addEventListener('click', fSaveAbsence);
        document.getElementById('multiAbsence-comment').addEventListener('keydown', fSaveAbsence);
        document.getElementById('multiAbsence-button').addEventListener('click', fStartMultiAbsence);

        var table = document.getElementById('s_m_Content_Content_FatabMissingAarsagerGV');
        var tbody = table.children[0];

        var title = document.createElement('th');
            title.id = "multiAbsence-title";
            title.innerHTML = "Multi-<br>fravær";
            title.addEventListener('click', fSelectAll);
            tbody.children[0].insertBefore(title,tbody.children[0].children[0]);

        for (var i = 1;i < tbody.childElementCount; i++) {
          var check = document.createElement('label');
              check.innerHTML = "<input class='multiAbsence-checkbox' type='checkbox'><span class='customCheckbox'></span>";
              check.className = "container-checkbox";
              tbody.children[i].insertBefore(check, tbody.children[i].children[0]);
        }
      }());
    } else {
      console.log('Nothing to report here.');
    }
        //setup fraværstimer count
        (function(){
          var absenceAr=[0,0,0]; //total approved notapproved
          var e=document.querySelectorAll('#s_m_Content_Content_FatabAbsenceFravaerGV tr');
          if(e) {
            for(var i=1;i<e.length;i++) {
              absenceAr[0]++;
              if(e[i].querySelector('img[src="/lectio/img/ok.gif"]')) {
                absenceAr[1]++;
              } else {
                absenceAr[2]++;
              }
            }
            if(absenceAr[0]>1) {  fBuild(absenceAr); }
          }
          function fBuild(ar) {
            var target=document.querySelector('#s_m_Content_Content_FatabAbsenceFravaerGV tbody');
            var e=document.createElement('tr');
                e.className='lectioTR';
                e.innerHTML = '<td colspan="4"><b>I alt '+ar[0]+' fraværstimer.</b></td><td colspan="4"><b>'+Math.round(ar[1]/ar[0]*100)+'% / '+ar[1]+' timer er godskrevet.</b></td><td colspan="4"><b>'+Math.round(ar[2]/ar[0]*100)+'% / '+ar[2]+' timer er ikke godskrevet.</b></td>';
                target.insertBefore(e,target.children[0]);

          }
          console.log(absenceAr);
        }());

          //functions for absence
          function fSaveAbsence () {
            chrome.storage.local.set
            ({
              'multiAbsence_reason':      document.getElementById('multiAbsence-reason').value,
              'multiAbsence_comment':     document.getElementById('multiAbsence-comment').value,
              'multiAbsence_checked':     fGetChecked()
            });
            console.log(checked);
          }
              function fGetChecked () {
                checked = [];
                var e = document.getElementsByClassName('multiAbsence-checkbox');
                for(var i = 0; i < e.length; i++) {
                  if(e[i].checked) checked.push(i);
                }
                return checked;
              }
                  function fSelectAll () {
                    var e = document.getElementsByClassName('multiAbsence-checkbox');
                    for(var i = 0; i < e.length; i++) {
                      e[i].checked= e[i].checked ? false : true;
                    }
                  }

                      function fStartMultiAbsence () {
                        if(document.getElementById('multiAbsence-reason').value == 0) {return alert('Du skal vælge en fraværsårsag');}
                        fSaveAbsence();
                        chrome.storage.local.set({'multiAbsence_active':true});
                        absenceRedirect();
                      }


                          function absenceRedirect () {
                            var row;

                            chrome.storage.local.get(['multiAbsence_checked'], function (r) {
                              checked = r.multiAbsence_checked;

                              if (checked == "" || checked == null) {
                                chrome.storage.local.set({'multiAbsence_active':false}); active = false;
                                absenceList();
                                return;
                              }
                              var child = checked[0] + 1;console.log(child);
                              if(document.getElementById('s_m_Content_Content_FatabMissingAarsagerGV').children[0].children[child].children[9].children[0]) {row = 9;} else {row = 10;}
                              document.getElementById('s_m_Content_Content_FatabMissingAarsagerGV').children[0].children[child].children[row].children[0].click();

                              checked.shift();
                              for (var i = 0; i < checked.length; i++) {
                                checked[i]--;
                              }
                              chrome.storage.local.set({'multiAbsence_checked':checked});
                          });
                        }
        }

  function absenceSubmit () {
    chrome.storage.local.get
    ([
      'multiAbsence_active',
      'multiAbsence_reason',
      'multiAbsence_comment'
    ],function (r) {
      if(r.multiAbsence_active == true) {
        document.getElementById('s_m_Content_Content_StudentReasonDD_dd').children[r.multiAbsence_reason].selected = 'selected';
        document.getElementById('s_m_Content_Content_cancelStudentNote_tb').value = r.multiAbsence_comment;
        document.getElementById('s_m_Content_Content_savecancelapplyBtn_svbtn').click ();
      }
    });
  }
}

function pMessages () {
  (function () {
    var e = document.querySelectorAll('img[src*="folder.gif"]');
    for(var i=0;i<e.length;i++) {
      var n = document.createElement('span');
          n.innerHTML = (i==0) ? '<i class="fas fa-envelope"></i>' : '<i class="fas fa-folder"></i>';
          n.className = 'TreeNode-icon';
          e[i].parentNode.insertBefore(n, e[i]);

      e[i].remove();
    }
  }());
}

function pDocuments () {
  var p = document.querySelectorAll('#s_m_Content_Content_DocumentGridView_ctl00 a[href*="dokumenthent.aspx"]');

  for(var i=0;i<p.length;i++) {
  	if(/.docx/.test(p[i].innerText) || /.doc/.test(p[i].innerText))
    	p[i].children[0].children[0].className = 'far fa-file-word';
      //
        else if(/.xlsx/.test(p[i].innerText) || /.xls/.test(p[i].innerText))
          p[i].children[0].children[0].className = 'far fa-file-excel';
          //
              else if(/.ppt/.test(p[i].innerText) || /.pptx/.test(p[i].innerText))
                p[i].children[0].children[0].className = 'far fa-file-powerpoint';
                //
                    else if(/.pdf/.test(p[i].innerText))
                      p[i].children[0].children[0].className = 'far fa-file-pdf';
                      //
                        else if(/.jpg/.test(p[i].innerText) || /.jpeg/.test(p[i].innerText) || /.png/.test(p[i].innerText) || /.gif/.test(p[i].innerText))
                          p[i].children[0].children[0].className = 'far fa-image';
  }
}

function pHomework () {
  if(document.getElementById('s_m_Content_Content_contentPnl')) checkboxHomework();

  function checkboxHomework () {
    var obj = []; var id = ""; var homework = [];

    var tre = document.querySelectorAll('#s_m_Content_Content_contentPnl tr');
        var title = document.createElement('span');
            title.innerHTML = "";
            tre[0].insertBefore(title, tre[0].children[0]);

            for(var tr=1;tr<tre.length;tr++) {
              var check = document.createElement('label');
                  check.innerHTML = "<input class='homework-checkbox' type='checkbox'><span class='customCheckbox'></span>";
                  check.className = "container-checkbox";
              tre[tr].insertBefore(check, tre[tr].children[0]);
            }

    var p = document.querySelectorAll('.s2bgbox');
    var checkbox = document.querySelectorAll('.homework-checkbox');

    chrome.storage.local.get(['homework'], function (r) {if(r.homework != undefined) {
        homework = r.homework;
      }

      for (var i=0;i<p.length;i++) {
        id = p[i].href.slice(p[i].href.indexOf("absid=") + 6, p[i].href.indexOf("&prevurl"));

        checkbox[i].dataset.id = id;
        compare(id);

      }
    });

            function compare (id) {
              var status; var consists;

              for(var i=0;i<homework.length;i++) {
                  if(homework[i][0] == id) {
                      status = homework[i][1];
                      consists = true;
                      if(status == true) {update(id);}
                  }
              }
              if(!consists) {
                homework.push([id, 'false']);
                consists = false;
                console.log(homework);
              }

              function update (id) {
                document.querySelector('.homework-checkbox[data-id="'+id+'"]').checked = true;
              }

              var tre = document.querySelectorAll('#s_m_Content_Content_contentPnl tr');
              var check = document.querySelectorAll('.homework-checkbox');
              for(var x=0;x<check.length;x++) {
                if (check[x].checked == true)
                  tre[x+1].style = "text-decoration:line-through;";
              }
            }

    document.getElementById('s_m_Content_Content_contentPnl').addEventListener('click', save);
    function save() {
      var c = document.querySelectorAll('.homework-checkbox[data-id]');
      var save; var newHomework=[];

      for (var i=0;i<c.length;i++) {
          //console.log(c[i]);
        for(var ii=0;ii<homework.length;ii++) {
          if(homework[ii][0] == c[i].dataset.id) {
            homework[ii][1] = c[i].checked;
          }
        }
      }
      for(var iii=0;iii<homework.length;iii++) {
      	if(document.querySelector('.s2bgbox[href*="'+homework[iii][0]+'"]')) {newHomework.push(homework[iii]);}
      }console.log(newHomework);
      chrome.storage.local.set({'homework':newHomework});
      console.log(homework);
    }
  }
}

function pActivityInformation () {
  var section = document.querySelector('.ls-table-layout1 tr:nth-child(12)');
  var students = section.querySelector('td');
  var span = section.querySelectorAll('span');
  var data=[]; var studentCount = 1; var groupCount = 2;
  for(var i=0;i<span.length;i++) {
    data.push([span[i].innerHTML, span[i].dataset.lectiocontextcard]);
  }
  var button0 = document.createElement('div');
      button0.id="generateGroup";
      button0.innerHTML = "Generer gruppe<br> <br><div>Antal medlemmer pr. gruppe: <b><span id='groupMinus'>< </span><span id='groupCount'>2</span><span id='groupPlus'> ></span></b></div>";
      section.appendChild(button0);
      document.getElementById('generateGroup').addEventListener('click', generateGroup);
      document.getElementById('groupMinus').addEventListener('click', function(e){if(groupCount > 1) {groupCount--;document.getElementById('groupCount').innerHTML = groupCount;}});
      document.getElementById('groupPlus').addEventListener('click', function(e){groupCount++;document.getElementById('groupCount').innerHTML = groupCount;});


  var button = document.createElement('div');
      button.id="shuffleStudents";
      button.innerHTML = "Bland eleverne";
      section.appendChild(button);
      button.addEventListener('click', function(e) {shuffle(data, "update");});
  var pickedStudents=document.createElement('div');
      pickedStudents.id="pickedStudents";
      students.insertBefore(pickedStudents,students.children[0]);

  var button2 = document.createElement('div');
      button2.id="pickStudent";
      button2.innerHTML = "<span id='pickStudentText'>Udvælg elev(er)    </span><b>"+
      "<span id='pickStudentMinus'>< </span><span id='pickStudentCount'>1</span><span id='pickStudentPlus'> ></span></b>";
      section.appendChild(button2);
      document.getElementById('pickStudentText').addEventListener('click', pickStudent);
      document.getElementById('pickStudentMinus').addEventListener('click', function(e){if(studentCount > 1) {studentCount--;document.getElementById('pickStudentCount').innerHTML = studentCount;}});
      document.getElementById('pickStudentPlus').addEventListener('click', function(e){studentCount++;document.getElementById('pickStudentCount').innerHTML = studentCount;});

  var original = students.innerHTML;
  var button3 = document.createElement('div');
      button3.id="shuffleStudents";
      button3.innerHTML = "Nulstil";
      section.appendChild(button3);
      button3.addEventListener('click', reset);

  function generateGroup () {
    document.getElementById('pickedStudents').innerHTML = "";
    var slices = Number(document.getElementById('groupCount').innerHTML);
    var groupArray = chunkify(shuffle(data), data.length/slices, true);
    var r = "";
    console.log(groupArray);
    for(var i=0;i<groupArray.length;i++) {
      r+="<span style='font-size:20px;'><b>Gruppe "+(Number(i)+1)+":</b></span>";
      for(var ii=0;ii<groupArray[i].length;ii++) {
        r+= "<li class='columnLi' draggable='true' data-lectiocontextcard='"+groupArray[i][ii][1]+"'><header>"+groupArray[i][ii][0]+"</header></li>";
      }
      r+="<span><i>Antal elever: "+ii+"</span></i><br><br>";
    }
    document.getElementById('pickedStudents').innerHTML += "<ul id='columnsUl'>"+r+"<ul>";
    drag();
  }
  //  chunkify(a,n,balanced)
  function chunkify(a,n,balanced){if(n<2){return[a];}var len=a.length,out=[],i=0,size;if(len%n===0){size=Math.floor(len/n);while(i<len){out.push(a.slice(i,i+=size));}}else if(balanced){while(i<len){size=Math.ceil((len-i)/n--);out.push(a.slice(i,i+=size));}}else{n-=1;size=Math.floor(len/n);if(len%size===0){size-=1;}while(i<size*n){out.push(a.slice(i,i+=size));}out.push(a.slice(size*n));}return out;}

  //  shuffle(array,action) ect. shuffle(theArray)
  function shuffle(array,action){var currentIndex=array.length,temporaryValue,randomIndex;while(0!==currentIndex){randomIndex=Math.floor(Math.random()*currentIndex);currentIndex-=1;temporaryValue=array[currentIndex];array[currentIndex]=array[randomIndex];array[randomIndex]=temporaryValue;}if(action=="update"){update(array);}else{return array;}}

  function update(array) {
    students.innerHTML = "<div id='pickedStudents'></div>";
    for(var i=0;i<array.length;i++) {
      students.innerHTML += '<span data-lectiocontextcard="'+array[i][1]+'">'+array[i][0]+'</span><br>';
    }
    students.innerHTML += "<br><br> Antal elever: " + array.length;
  }
  function pickStudent () {
    var random; var studentsPicked = "";
    for(var i=0;i<studentCount;i++) {
      random = data[Math.floor(Math.random() * data.length)];
      studentsPicked += '<span data-lectiocontextcard="'+random[1]+'">'+random[0]+'</span><br>';
    }

    document.getElementById('pickedStudents').innerHTML = "<span><b>Det blev:</b><br>" + studentsPicked + "<br><br>";
  }
  function reset () {
    students.innerHTML = original;
  }
  //<ul id='columnsUl'><li class="columnLi"></li><ul> drag and drop
  function drag(){var dragSrcEl=null;function handleDragStart(e){dragSrcEl=this;e.dataTransfer.effectAllowed='move';e.dataTransfer.setData('text/html',this.outerHTML);this.classList.add('dragElem');}function handleDragOver(e){if(e.preventDefault){e.preventDefault();}this.classList.add('over');e.dataTransfer.dropEffect='move';return false;}function handleDragEnter(e){}function handleDragLeave(e){this.classList.remove('over');}function handleDrop(e){if(e.stopPropagation){e.stopPropagation();}if(dragSrcEl!=this){this.parentNode.removeChild(dragSrcEl);var dropHTML=e.dataTransfer.getData('text/html');this.insertAdjacentHTML('beforebegin',dropHTML);var dropElem=this.previousSibling;addDnDHandlers(dropElem);}this.classList.remove('over');return false;}function handleDragEnd(e){this.classList.remove('over');}function addDnDHandlers(elem){elem.addEventListener('dragstart',handleDragStart,false);elem.addEventListener('dragenter',handleDragEnter,false);elem.addEventListener('dragover',handleDragOver,false);elem.addEventListener('dragleave',handleDragLeave,false);elem.addEventListener('drop',handleDrop,false);elem.addEventListener('dragend',handleDragEnd,false);}var cols=document.querySelectorAll('#columnsUl .columnLi');[].forEach.call(cols,addDnDHandlers);}
}

function pHovedmenu () {
    var p = document.querySelector(".floatLeft");
    var el=fAddElement("div", "loginWO");
        el.className="button";
        el.innerHTML="<a href="+document.getElementById('m_LoginOutLink').href+" data-role='button' tabindex='0' id='m_LoginOutLink'>Login uden auto-login</a>";
        p.insertBefore(el,p.children[2]);
        el.addEventListener('click', function (e) {
          chrome.storage.local.set({'Lectio_nologin':true});
        });

}

function pTasks () {
   /*----------------------------------------------------------------*/
   //                            Enabled?                            //
   /*----------------------------------------------------------------*/

   chrome.storage.local.get([
     'Lectio_opgaverCountDown'
   ], function (result) {
     if (result.Lectio_opgaverCountDown != false) {
       getDueDateRun();
     }
   }
  );

   /*----------------------------------------------------------------*/
   //                           Variables                            //
   /*----------------------------------------------------------------*/

  var dom_id = ""; var afleveret = false;

  /*----------------------------------------------------------------*/
  //                           Loop query                           //
  /*----------------------------------------------------------------*/

  function getDueDateRun () {
    var style = document.getElementById('LectioCSS');
        style.innerHTML += ".afleveret {text-decoration:line-through;}";

    getData();
    function getData () {

      document.getElementsByTagName('tbody')[0].id = 'opgaverDue';

       var getChildren = document.getElementById('opgaverDue').childElementCount;
       var GetinnerHTML = document.getElementById('opgaverDue');

       for(var i = 0; i < getChildren; i++)
       {
          if (i != 0) {
              setDate = GetinnerHTML.rows[i].cells[3];
              var inner = GetinnerHTML.rows[i].cells[3].innerHTML;
              var status = GetinnerHTML.rows[i].cells[5].innerHTML;

              if (status == "Afleveret") {
                afleveret = true;
              } else if (status != "Afleveret") {
                afleveret = false;
              }

              if (inner != null && inner != undefined && inner != "") {sortDate (inner);}
          }
       }
    }

    /*----------------------------------------------------------------*/
    //                         Sort DOM data                          //
    /*----------------------------------------------------------------*/
    var dateStr; var monthStr; var yearStr; var hourStr; var minuteStr;
    function sortDate (innerHTML) {
      dateStr = innerHTML.slice(0, innerHTML.indexOf("/"));
      monthStr = innerHTML.slice(innerHTML.indexOf("/") + 1, innerHTML.indexOf("-")); monthStr--; //months go 0-11 in javascript...
      yearStr = innerHTML.substr(innerHTML.indexOf("-") + 1, 4);
      hourStr = innerHTML.slice(innerHTML.indexOf(" ") + 1, innerHTML.indexOf(":"));
      minuteStr = innerHTML.slice(innerHTML.indexOf(":") + 1);

      console.log(dateStr,"/",monthStr,"-",yearStr," ",hourStr,":",minuteStr);
      createDom();
    }


    /*----------------------------------------------------------------*/
    //                        Create DOM data                         //
    /*----------------------------------------------------------------*/
    var dom;
    function createDom () {
      dom_id += 'countDown'+1+'';
      dom = document.createElement('span');
      dom.id = dom_id;
      if(afleveret == true) {
        dom.className = "afleveret";
      }


      dom.style = 'background:#080!important;color:white;';


      setDate.appendChild(dom);
      CountDownTimer (dom_id);

    }

      function CountDownTimer(dom_id)
      {
          var end = new Date(yearStr, monthStr, dateStr, hourStr, minuteStr);

          var _second = 1000;
          var _minute = _second * 60;
          var _hour = _minute * 60;
          var _day = _hour * 24;
          var timer;

          function showRemaining() {
            if(document.getElementById(dom_id)) {
              var now = new Date();
              var distance = end - now;
              if (distance < 0) {

                  clearInterval(timer);
                  dom.innerHTML = 'Udløbt!';
                  return;
              }

              var days = Math.floor(distance / _day);
              var hours = Math.floor((distance % _day) / _hour);
              var minutes = Math.floor((distance % _hour) / _minute);
              var seconds = Math.floor((distance % _minute) / _second);

              document.getElementById(dom_id).innerHTML = "<br>" + days + "d " + hours + "t " + minutes + "m " + seconds + "s ";

              styleIt (days);
            } else {
              clearInterval(timer);
            }
          }
          timer = setInterval(showRemaining, 1000);

      function styleIt (days) {
        if (days < 3) {
          document.getElementById(dom_id).style = 'background:orange !important;color:white;';
        }

        if (days == 0) {
          document.getElementById(dom_id).style = 'background:red !important;color:white;';
        }
      }
    }
  }
  chrome.storage.local.get([
    'Lectio_hideAfleverede'
  ], function (result) {
    if (result.Lectio_hideAfleverede != undefined) {
      if(result.Lectio_hideAfleverede == true) {
        hideAfleverede("display:none;");
      }
    } else {
      chrome.storage.local.set({
        Lectio_hideAfleverede:false
      });
    }
    setupDOM(result.Lectio_hideAfleverede);
  });

  /*----------------------------------------------------------------*/
  //                            setupDOM                            //
  /*----------------------------------------------------------------*/

  function setupDOM (checked) {
    var input = document.createElement('input');
    var label =  document.createElement('label');
    var span = document.createElement("span");
        span.className="lxcustomCheckbox";
      input.id = "skjulAfleverede";
      input.type = "checkbox";
      input.style = "margin-left:15px;";
      input.checked = checked;

      label.className=" lx_checkbox";
      label.id = "labelForSkjulAfleverede";
      label.htmlFor = "skjulAfleverede";
      label.innerHTML = "Skjul afleverede opgaver ";
      label.style = "user-select:none;";

    label.appendChild(input); label.appendChild(span);
    d.q('#printStudentAssignmentsArea .textMid').appendChild(label);

    input.addEventListener('click',clickInput);
    label.addEventListener('click',clickInput);

    function clickInput () {
      var input = document.getElementById('skjulAfleverede').checked;
      chrome.storage.local.set({Lectio_hideAfleverede:input});

      switch (input) {
        case false:
            hideAfleverede("display:inline:");
            break;
        case true:
            hideAfleverede("display:none;");
            break;
      }
    }
  }

  /*----------------------------------------------------------------*/
  //                             hideAFL                            //
  /*----------------------------------------------------------------*/

  function hideAfleverede (style) {
    var getTR = document.getElementsByTagName('tbody')[0].childElementCount;
    var GetinnerHTML = document.getElementsByTagName('tbody')[0];

    //var inner = document.getElementsByTagName('tr')[10].children[5].innerHTML;

    for(var i = 1;i < getTR;i++) {
      var status = GetinnerHTML.rows[i].cells[5].innerHTML;
      if (status == "Afleveret") {
        GetinnerHTML.rows[i].style = style;
      }
    }

  }
}
/*----------------------------------------------------------------*//*----------------------------------------------------------------*/
/*                                                                *//*                                                                */
//                              Error                             ////                              Error                             //
/*                                                                *//*                                                                */
/*----------------------------------------------------------------*//*----------------------------------------------------------------*/
//....

console.timeEnd("Finished master.js in");




/**/
