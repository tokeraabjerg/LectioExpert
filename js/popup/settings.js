/**
 * @Author: Toke Raabjerg <TokeDK>
 * @Date:   23-Aug-2018
 * @Email:  tokermc@hotmail.co
 * @Project: Lectio Expert
 * @Last modified by:   nadgryzione
 * @Last modified time: 26-Mar-2019
 */


 /*----------------------------------------------------------------*/
 //                          Variables                             //
 /*----------------------------------------------------------------*/

var storage = chrome.storage.local;
var pinEntered=false;
var pinCode = ""; var usePin;
var usePinCode = false;

/*----------------------------------------------------------------*/
//                           Storage get                          //
/*----------------------------------------------------------------*/

storage.get([
  'Lectio_useAutoLogin',

  'Lectio_Brugernavn',
  'Lectio_Adgangskode',

  'usePinCode',
  'pinCode'

], function(r) {

  if(r.Lectio_useAutoLogin != undefined) {
    document.getElementById('useAutoLogin').checked = r.Lectio_useAutoLogin;
  }

    if(r.Lectio_Brugernavn != undefined && r.Lectio_Adgangskode != undefined) {var decB_one=atob(r.Lectio_Brugernavn);var decB_two=atob(decB_one);var decB_three=atob(decB_two);var decB_four=atob(decB_three);var decB=atob(decB_four);var decA_one=atob(r.Lectio_Adgangskode); var decA_two=atob(decA_one);var decA_three=atob(decA_two);var decA_four=atob(decA_three);var decA=atob(decA_four);document.getElementById('brugernavn').value = decB;document.getElementById('adgangskode').value = decA;}

  if(r.usePinCode != true) {document.getElementById('usePinCode').checked=false;      usePin=r.usePin;}
  if(r.pinCode != undefined) {document.getElementById('pinCode').value=r.pinCode;     pinCode=r.pinCode;}

});

/*----------------------------------------------------------------*/
//                          Storage save                          //
/*----------------------------------------------------------------*/

//Save user & pass
document.addEventListener('keyup', function (event) {
  var pin=document.getElementById('pinCode').value;
  var getValueB = document.getElementById('brugernavn').value;
  var getValueA = document.getElementById('adgangskode').value;

  var encB_one=btoa(getValueB); var encB_two=btoa(encB_one);var encB_three=btoa(encB_two);var encB_four=btoa(encB_three);var encB=btoa(encB_four);
  var encA_one=btoa(getValueA); var encA_two=btoa(encA_one);var encA_three=btoa(encA_two);var encA_four=btoa(encA_three);var encA=btoa(encA_four);

  if(usePin == true && pinCode != pin && !pinEntered) {enterPin("input");}else{pinCode=pin;}

  storage.set({
    "Lectio_Brugernavn": encB,
    "Lectio_Adgangskode": encA,
    "pinCode": pinCode
  });
});

//Save check box
document.addEventListener('click', function (event) {
  var pinEl = document.getElementById('usePinCode');
  var checkbox = document.getElementById('useAutoLogin').checked;

  if(pinEl.checked!=usePin && usePin == true && document.getElementById('pinCode').value != "" && !pinEntered) {pinEl.checked=true; enterPin("check");}
  usePin=pinEl.checked;

  storage.set({
    "Lectio_useAutoLogin": checkbox,
    "usePinCode": pinEl.checked
  });
});

function enterPin (value) {
  var pin=document.getElementById('pinCode');
  var pass=document.getElementById('adgangskode').value;
  var prompt=window.prompt('Indtast pin-koden eller adgangskode for at lave ændringer i pin kode:', '');
  if(prompt !== null || prompt !== "") {
    if(prompt == pinCode || prompt == pass) {
      pinEntered=true;
      if(value == "check") {
        document.getElementById('usePinCode').checked=false;
        storage.set({
          "usePinCode": document.getElementById('usePinCode').checked
        });
      } else if (value == "input") {
        document.getElementById('pinCode').checked=false;
        storage.set({
          "usePinCode": document.getElementById('usePinCode').checked
        });
      }
    } else {
      alert('Forkert pin...');
      pin.value=pinCode;
      storage.set({
        "pinCode": pin
      });
    }
  }
}
