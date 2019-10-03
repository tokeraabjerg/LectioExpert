/**
 * @Author: Toke Raabjerg <nadgryzione>
 * @Date:   21-Nov-2018
 * @Email:  tokermc@hotmail.com
 * @Project: Lectio Expert
 * @Last modified by:   nadgryzione
 * @Last modified time: 21-Nov-2018
 */

var xhttpUrl = "chrome-extension://"+chrome.runtime.id+"/changelog.json";
//Request xhttp
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
 if (this.readyState == 4 && this.status == 200) {
   // Action
   obj = JSON.parse(xhttp.response);
   fParse(obj);
 }
};
xhttp.open("GET", xhttpUrl, true);
xhttp.send();

function fParse () {

  for(i = 0; i < obj.updates.length; i++) {
    fChangeDOM (obj.updates[i].version, fGetSubStr(obj, i));
  }

  function fGetSubStr (obj, c) {
    var r = "";
    for(var i = 0;i < obj.updates[c].changelog.length;i++) {
      r += obj.updates[c].changelog[i];
    }
    return r;
  }
}

//Enter
function fChangeDOM (version, content) {
  console.log("no");
  document.getElementById('changeLog').innerHTML += "<h3>"+version+"</h3><ul>"+content+"</ul>";
}
