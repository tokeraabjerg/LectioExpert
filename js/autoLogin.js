/**
 * @Author: Toke Raabjerg <nadgryzione>
 * @Date:   04-May-2018
 * @Email:  tokermc@hotmail.co
 * @Project: Lectio Expert
 * @Last modified by:
 * @Last modified time: 2019-02-25T21:01:15+01:00
 */

var storage = chrome.storage.local;
var currentTime = Date.now();

/*----------------------------------------------------------------*/
//                        Check if login                          //
/*----------------------------------------------------------------*/

storage.get([
  'Lectio_useAutoLogin',
  'Lectio_lastAutoLogin',

  'Lectio_Brugernavn',
  'Lectio_Adgangskode',

  'Lectio_nologin'
], function(r) {
  if (r.Lectio_useAutoLogin != false && r.Lectio_Brugernavn != undefined && r.Lectio_Adgangskode != undefined && r.Lectio_nologin != true) {
    if (r.Lectio_lastAutoLogin != undefined && (currentTime - r.Lectio_lastAutoLogin) > 3000) {
      //If last is more than 3000ms ago
      chrome.storage.local.set({Lectio_lastAutoLogin:currentTime});
      login ();

    } else if (r.Lectio_lastAutoLogin == undefined) {
        //If last login isn't set
        login();
        chrome.storage.local.set({Lectio_lastAutoLogin:currentTime});

    } else if ((currentTime - r.Lectio_lastAutoLogin) < 3000 && r.Lectio_Brugernavn != "" && r.Lectio_Adgangskode != "") {
      //If last is less than 3000ms ago
      chrome.storage.local.set({Lectio_lastAutoLogin:currentTime});
      document.getElementById('capsWarning').style = "";
      document.getElementById('capsWarning').innerHTML = "Det går for hurtigt... Vent venligst 3 sekunder, tak.";
    }
  } else {
    chrome.storage.local.set({'Lectio_nologin':false});
  }
});

/*----------------------------------------------------------------*/
//                              Login                             //
/*----------------------------------------------------------------*/

function login () {
  storage.get([
    'Lectio_Brugernavn',
    'Lectio_Adgangskode',

    'usePinCode',
    'pinCode'
  ], function (r) {//console.log(r.Lectio_Brugernavn, r.Lectio_Adgangskode);

    if(r.Lectio_Brugernavn != undefined && r.Lectio_Adgangskode != undefined || r.Lectio_Brugernavn != "" && r.Lectio_Adgangskode != "") {var decB_one=atob(r.Lectio_Brugernavn);var decB_two=atob(decB_one);var decB_three=atob(decB_two);var decB_four=atob(decB_three);var decB=atob(decB_four);document.getElementById('m_Content_username2').value = decB;var decA_one=atob(r.Lectio_Adgangskode); var decA_two=atob(decA_one);var decA_three=atob(decA_two);var decA_four=atob(decA_three);var decA=atob(decA_four);document.getElementById('password2').value = decA;//console.log(decB, decA);

      var dialog = document.getElementsByClassName('ui-dialog ui-corner-all ui-widget ui-widget-content ui-front ui-dialog-buttons ui-draggable ui-resizable')[0];
      var dialogTwo = document.getElementsByClassName('ui-dialog-titlebar ui-corner-all ui-widget-header ui-helper-clearfix ui-draggable-handle')[0];
      if (!dialog && !dialogTwo) {
        if(r.usePinCode != true) {
          if((document.getElementById('m_Content_username2').value) != "" && (document.getElementById('password2').value) != "")
          document.getElementById('m_Content_submitbtn2').click();


        } else if (r.usePinCode == true && r.pinCode != undefined || r.usePinCode == true && r.pinCode != "") {

          var prompt = window.prompt("Indtast din pin-kode for at fortsætte:","");
          if(prompt !== null || prompt !== "") {
            if(prompt == r.pinCode) {
              document.getElementById('m_Content_submitbtn2').click();
            } else {
              alert('Forkert pin...');
              document.getElementById('m_Content_username2').value = "";
              document.getElementById('password2').value = "";
            }
          }
        }
      }
    }
  });
}
