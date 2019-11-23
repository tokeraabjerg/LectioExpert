/**
 * @Author: Toke Raabjerg <TokeDK>
 * @Date:   02-May-2018
 * @Email:  tokermc@hotmail.co
 * @Project: Lectio Expert
 * @Last modified by:   nadgryzione
 * @Last modified time: 10-Nov-2019
 */

/*--- VARIABLES START ---*/
var storage = chrome.storage.local;
var sync = chrome.storage.sync;
/*--- VARIABLES END ---*/

/*----------------------------------------------------------------*/
//                        uninsall event                          //
/*----------------------------------------------------------------*/

var uninstallGoogleFormLink = "https://goo.gl/forms/8OiFuoND6ZeA1FPw1";
if (chrome.runtime.setUninstallURL) {
  chrome.runtime.setUninstallURL(uninstallGoogleFormLink);
}

/*----------------------------------------------------------------*/
//               Setup chrome storage on install                  //
/*----------------------------------------------------------------*/

chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install") {
      chrome.storage.local.set({
        brugernavn: undefined,
        adgangskode: undefined,
        Lectio_opgaverCountDown: true,
        Lectio_gradeAverage: true,
        Lectio_hovedMenuPlus: true,
        Lectio_useTheme: false,
        Lectio_useSimpleTheme: true,
        Lectio_useThemeSkema: true,
        darkThemeNight: true,
        darkTheme: false,
        Lectio_antiAFK: true,
        Lectio_zoomLevel: true,
        Lectio_moveSkemaIsland: true,
        Lectio_moveUndervisningIsland: true,
        Lectio_changeTitle: true,
        Lectio_addSearchIcon: true,
        Lectio_importantInfoHeight: true,
        Lectio_dayNote: true,
        Lectio_hintEnabled: true,
        Lectio_standardBackground: true
      });
        window.open("chrome-extension://"+chrome.runtime.id+"/html/welcomePage/welcome_v2.html", "_blank");
    } else if (details.reason == "update") {
        var thisVersion = chrome.runtime.getManifest().version;
        if(details.previousVersion != thisVersion) {
            console.log("Updated from " + details.previousVersion + " to " + thisVersion + "!");
              chrome.storage.local.set({
                Lectio_dontAskAgainNews: false
              });
            if(thisVersion == "20182.1.4") {
              chrome.storage.local.set({Lectio_standardBackground: true});
            }
              // window.open("chrome-extension://"+chrome.runtime.id+"/update.html", "_blank");
        }
    }
});

/*----------------------------------------------------------------*/
//                           Functions                            //
/*----------------------------------------------------------------*/
var d = new Date();

function fSaveData (key, variable) {
  chrome.storage.local.set({key:variable});
}

// fNotfication();
function fNotfication () {
  parsedObj = {"man": [],"tir": [],"ons": [],"tor": [],"fre": []};
  var notificationDOM = "";

  chrome.storage.local.get([
    'lectio_skoleId',
    'lectio_elevId',

    // 'notificationDOM'
  ], function (r) {
    if (r.lectio_skoleId != undefined && r.lectio_elevId != undefined) {//console.log(r.lectio_skoleId, r.lectio_elevId);
      // if(r.notificationDOM) notificationDOM = r.notificationDOM; else notificationDOM = ""; fThrowError(r.notifcationDOM);

      fGetXML(r.lectio_skoleId, r.lectio_elevId);
    }
  });

      function fGetXML (skoleId, elevId) {console.log(skoleId, elevId);
        var xhttpUrl = "https://www.lectio.dk/lectio/" + skoleId + "/SkemaNy.aspx?type=elev&elevid=" + elevId;
        console.log(xhttpUrl);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            fStoreXML(xhttp.responseXML.getElementById('s_m_Content_Content_SkemaNyMedNavigation_skema_skematabel'));
          }
        };
        xhttp.open("GET", xhttpUrl, true);
        xhttp.responseType = "document";
        xhttp.send();
      }

          function fStoreXML(obj) {
            document.getElementById('dataHolder').appendChild(obj);
            // if(notificationDOM != obj.innerHTML) {}
              fSortData();
              // fSaveData("notificationDOM",obj.innerHTML); fThrowError(obj.innerHTML);
          }

              function fSortData () {//s = skema    d = day   m = module    sm = skema module     e = element
                var dHeader = document.getElementsByClassName('s2dayHeader')[0].children;
                var sModule = document.getElementsByClassName('s2bgbox');
                var sMClassE = document.getElementsByClassName('s2skemabrikcontent');

                var sMDate = ""; var sMMonth = ""; var prev = ""; var dayChild = 1; sMClass = ""; var status = ""; var x = 0; var l = 0; var hCount = document.getElementsByClassName('s2dayHeader')[0].childElementCount - 1;
                for(var i=0;i < sModule.length;i++) {h=i+hCount;
                    var sMData = sModule[i].dataset.additionalinfo;

                        //parse Date
                        if(sMData.slice(0,1) >= 0 && sMData.slice(0,1) <= 9) {
                          sMDate = sMData.slice(0, sMData.indexOf("/"));
                          sMMonth = sMData.slice((sMData.indexOf("/") + 1), sMData.indexOf("-"));
                        } else {
                          var nD = sMData.replace( /^\D+/g, '').slice(0,10);
                          sMDate = nD.slice(0, nD.indexOf("/"));
                          sMMonth = nD.slice((nD.indexOf("/") + 1), nD.indexOf("-"));
                        }

                          //dHeader
                          if(prev.sMDate == sMDate && prev.sMMonth == sMMonth || prev == "") {
                            day = dHeader[dayChild].innerHTML.slice(0, dHeader[dayChild].innerHTML.indexOf(" "));
                            prev = {sMDate:sMDate, sMMonth:sMMonth};
                            l++;
                          } else {
                            prev = {sMDate:sMDate, sMMonth:sMMonth};
                            dayChild++;
                            day = dHeader[dayChild].innerHTML.slice(0, dHeader[dayChild].innerHTML.indexOf(" "));
                            l=1;
                          }

                            //class
                            sMClass = sMClassE[h].children[0].innerHTML;
                            if(sMClass == "") {
                              sMClass = sMData.slice(sMData.indexOf('Hold:') + 6, sMData.indexOf('rer:') - 2);
                            }

                              //status
                              if(isNaN(sMData.slice(0,1))) {
                                status = sMData.slice(0, 6);
                                if(status.slice(1,6) != "ndret" && status != "Aflyst") {
                                  status = "";
                                }
                              } else {status="";}

                    console.log("Dag: ", day, " Dato: ", sMDate, " Måned: ", sMMonth, " Type: ", sMClass, " Modul: ", l, (status ? " Status: " +status+ "" : ""));
                    fStore(day, sMDate, sMMonth, sMClass, l, status);
                }
                fCompare();

                                function fStore (day, date, month, sMClass, stat) {console.log(status);
                                  switch(day) {
                                    case "Mandag":
                                        parsedObj.man.push([{day:day, date:date, month:month, class:sMClass, status:status}]);
                                        break;
                                        case "Tirsdag":
                                            parsedObj.tir.push([{day:day, date:date, month:month, class:sMClass, stat:status}]);
                                            break;
                                            case "Onsdag":
                                                parsedObj.ons.push([{day:day, date:date, month:month, class:sMClass, status:status}]);
                                                break;
                                                case "Torsdag":
                                                    parsedObj.tor.push([{day:day, date:date, month:month, class:sMClass, status:status}]);
                                                    break;
                                                    case "Fredag":
                                                        parsedObj.fre.push([{day:day, date:date, month:month, class:sMClass, status:status}]);
                                                        break;

                                                        case "":
                                                            return fThrowError("case empty string");
                                                            default:
                                                                return fThrowError("case default");
                                  }
                                  return parsedObj;
                                }     console.table([parsedObj]);console.log(parsedObj);

                                        function fCompare () {var obj = "";
                                          chrome.storage.local.get(['notificationObj'], function (r) {
                                            if(r.notificationObj != undefined) {
                                              obj = r.notificationObj;
                                            }
                                          });
                                          compareObj = []; compareObj.push(parsedObj);
                                            console.log(obj, compareObj);
                                          if(obj != compareObj) {
                                            // fThrowError("WE'VE GOT IT");
                                          } else {
                                            fSaveData("notificationObj",parsedObj);
                                            //fThrowError("no GOT IT");
                                          }
                                        }
              }
}

function fThrowError (msg) {
  console.warn("------------- ERROR ------------");
  console.warn("---------- " + msg + " ---------");
  // console.log("---------- " + chrome.extension.lastError + " ---------");
  console.warn("------------- ERROR ------------");
}


/**/
