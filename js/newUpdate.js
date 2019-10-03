/**
 * @Author: Toke Raabjerg <nadgryzione>
 * @Date:   13-Sep-2018
 * @Email:  tokermc@hotmail.co
 * @Project: Lectio Expert
 * @Last modified by:
 * @Last modified time: 2019-03-06T17:16:16+01:00
 */
 /*----------------------------------------------------------------*/
 //                     Create HTML document                       //
 /*----------------------------------------------------------------*/
 var dt = new Date();
 dt.m = dt.getMonth();

 chrome.storage.local.get(['Lectio_dontAskAgainNews'], function (result) {
   if(result.Lectio_dontAskAgainNews != true) {
     start();
   }
 });

function start () {
  var xhttpUrl = "chrome-extension://"+chrome.runtime.id+"/changelog.json";
  //Request version info
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      obj = JSON.parse(xhttp.response);
      //console.log(obj.updates[0].version + obj.updates[0].changelog);
      fEnterUpdate(obj);
    }
  };
  xhttp.open("GET", xhttpUrl, true);
  xhttp.send();

  function fEnterUpdate (obj) {
    //christmas logo
    var iconPath; //console.log(d.getMonth());
    if(dt.m == 10) {iconPath = "icon512_christmas.png";} else {iconPath = "icon512.png";}


     var popup = document.createElement('div');
       popup.class = "modal";
       popup.id = "updateDue";
       popup.style = "float:right;overflow-y:scroll;text-align:center;background-color:gray;opacity:.9;width: 30%;padding: 20px 20px 20px 20px;color:white; border-radius:5px;transition:1s;max-height:0px;";
       popup.innerHTML = "<button id='closeUpdateDue' style='font-size:120%;cursor:pointer;border:none;background:none;color:white;float:right;width:0px;' href='#'><i class='fas fa-times'></i></button><img style='height:128px' src='chrome-extension://"+chrome.runtime.id+"/icons/"+iconPath+"'></img>";
       popup.innerHTML += "<h1 style='color:white;'>Nyheder!</h1><p>Version "+chrome.runtime.getManifest().version_name+"</p></span><hr>";
       popup.innerHTML += "<ul id='changelog'>"+fGetSubStr(obj, 0)+"</ul><hr><br>"+
       "Version "+obj.updates[1].version+"</p></span><hr>"+
       "<ul>"+fGetSubStr(obj, 1)+"</ul><hr>";
       popup.innerHTML += "<br><form style='text-align:center;'><label for='dontAskAgain'>Vis mig ikke dette igen indtil næste opdatering<input type='checkbox' id='dontAskAgain'></input></label></form><br><div style='text-align:center;font-style:italic;' id='updateMe'></div>";
       //document.getElementById('m_outerContentFrameDiv').appendChild(popup);
       var h = document.getElementById('m_outerContentFrameDiv');
       var s = document.getElementById('contenttable');
       h.insertBefore(popup, s);
       setTimeout(function(){
         document.getElementById('LectioCSS').innerHTML += "#updateDue {max-height:500px!important;}";
       },200);

     document.getElementById('closeUpdateDue').onclick = function () {
       document.getElementById('LectioCSS').innerHTML += "#updateDue {max-height:0px!important;}";
       setTimeout(function(){
         document.getElementById('updateDue').style = 'display:none;';
       },900);
     };

     var checked = document.getElementById('dontAskAgain').checked;

     window.addEventListener('click', function (event) {
       var update = document.getElementById('dontAskAgain').checked;

       if (checked != update) {

         chrome.storage.local.set({Lectio_dontAskAgainNews:update});
         document.getElementById('updateMe').innerHTML = "Gemt!";

       }
     });
   }
   function fGetSubStr (obj, c) {
     var r = "";
     for(var i = 0;i < obj.updates[c].changelog.length;i++) {
       r += obj.updates[c].changelog[i];
     }
     return r;
   }
}
