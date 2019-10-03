/**
 * @Author: Toke Raabjerg <nadgryzione>
 * @Date:   11-Oct-2018
 * @Email:  tokermc@hotmail.com
 * @Project: Lectio Expert
 * @Last modified by:   nadgryzione
 * @Last modified time: 06-Nov-2018
 */
 /*
 # Description: Sort of dynamic landing page setting up the primary settings
 */
theme = 0;

 document.addEventListener('DOMContentLoaded', function (event) {
   document.getElementById('buttonSave').addEventListener('click', secondContent);
   document.getElementById('buttonSkip').addEventListener('click', secondContent);
   // document.getElementById('supportIframe').addEventListener('click', supportIframe);
 });
//
// function supportIframe () {
//   document.getElementById('injectable').innerHTML = "div#support:hover div#supportPopup {height:120px;}";
//   document.getElementById('supportPopup').style = "top:-470px;height:450px;z-index:10;";
//   setTimeout(function() {
//     document.getElementById('iframe').style = "height:310;";
//     document.getElementById('bottomSection').style = "margin-top:10px;";
//     setTimeout(function() {
//       document.getElementById('iframe').style = "height:310;iframe:10;opacity:1;";
//     }, 500);
//   }, 1000);


  // if((document.getElementById('background')) == null) {
  //   var background = document.createElement('div');
  //       background.id = "background";
  //       background.style = "width:100%;height:100%;position:fixed;top:0;left:0;";
  //       background.addEventListener('click', closeSupportIframe);
  //       document.body.prepend(background);
  // } else {
  //   var existingBackground = document.getElementById('background');
  //       existingBackground.style = "width:100%;height:100%;position:fixed;top:0;left:0;";
  //       existingBackground.addEventListener('click', closeSupportIframe);
  // }
//
//   function closeSupportIframe () {
//     document.getElementById('bottomSection').style = "margin-top:0px;";
//     document.getElementById('iframe').style = "opacity: 0;";
//     document.getElementById('supportPopup').style = "top:-240px;";
//     document.getElementById('supportPopup').style = "height:120px;";
//     document.getElementById('background').style = "display:none;";
//     document.getElementById('background').removeEventListener('click', closeSupportIframe);
//     setTimeout(function() {
//       document.getElementById('supportPopup').style = "height:0px;";
//     },1000);
//     document.getElementById('injectable').innerHTML = "div#support:hover div#supportPopup {height:120px!important;}";
//   }
// }
/* --------------------------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------------------------- */

function secondContent () {
  var b = document.getElementById('brugernavn').value;
  var a = document.getElementById('adgangskode').value;
  if(b != "" && a != "") {
    var encB_one=btoa(b); var encB_two=btoa(encB_one);var encB_three=btoa(encB_two);var encB_four=btoa(encB_three);var encB=btoa(encB_four);
    var encA_one=btoa(a); var encA_two=btoa(encA_one);var encA_three=btoa(encA_two);var encA_four=btoa(encA_three);var encA=btoa(encA_four);
    chrome.storage.local.set({Lectio_Brugernavn:encB, Lectio_Adgangskode:encA});
  }

  document.getElementById('buttonSave').removeEventListener('click', secondContent);
  document.getElementById('buttonSkip').removeEventListener('click', secondContent);

  document.getElementById('content').style = "visibility:hidden !important; opacity:0!important;transition: visibility 0s, opacity 0.5s linear;";
  document.getElementById('centerContent').style = "top:8%!important;max-height:630px;";
  document.getElementById('mainContent').style = "visibility:hidden !important; opacity:0!important;transition: visibility 0s, opacity 0.5s linear;";
  // document.getElementById('content').style = "";
  //Set new description
  setTimeout(function() {
    var newDescription = "Hvilket tema ønsker du til dit Lectio?";
    document.getElementById('description').innerHTML = newDescription;
    //Set new content
    var newContent = ""+
    "<div id='theme1'><img id='themeIMG' class='themeIMG' src='../../images/themes/simple.png'></img><img id='themeIMG' class='themeIMG' src='../../images/themes/simpleDark.png'></img></div><br>"+
    "<div id='theme2'><img id='themeIMG' class='themeIMG' src='../../images/themes/modern.png'></img><img id='themeIMG' class='themeIMG' src='../../images/themes/modernDark.png'></img></div>"+
    "";
    document.getElementById('content').innerHTML = newContent;
    document.getElementById('centerContent').style.width = "620px";
      //Show content
      setTimeout(function(){
       document.getElementById('content').style = "visibility:visible!important;opacity:1!important;";
       document.getElementById('mainContent').style = "visibility:visible!important;opacity:1!important;";
      //Event Listener for choice
      document.getElementById('theme1').addEventListener('click', theme1);
      document.getElementById('theme2').addEventListener('click', theme2);
      }, 800);
  }, 500);

  //Handle choice
  function theme1 () {
    theme = 1;
    document.getElementById('theme1').style = "background:pink!important;";
    document.getElementById('theme2').style = "background:none!important;";
  }
  function theme2 () {
    theme = 2;
    document.getElementById('theme2').style = "background:pink!important;";
    document.getElementById('theme1').style = "background:none!important;";
  }

   document.getElementById('buttonSave').addEventListener('click', handleClick);
   document.getElementById('buttonSkip').addEventListener('click', handleClick);

  //Handle next
  function handleClick () {
   if (theme == 1 || theme == 2) thirdContent('save'); else thirdContent('skip');
   document.getElementById('buttonSave').removeEventListener('click', handleClick);
   document.getElementById('buttonSkip').removeEventListener('click', handleClick);
  }
}

/* --------------------------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------------------------- */

function thirdContent (reason) {
  if(reason == "save") {
    switch (theme) {
     case 1:
        chrome.storage.local.set({Lectio_useTheme:false});
        chrome.storage.local.set({Lectio_useSimpleTheme:true});
        break;
    case 2:
        chrome.storage.local.set({Lectio_useTheme:true});
        chrome.storage.local.set({Lectio_useSimpleTheme:false});
        break;
    }
  }
  //Hide content
  document.getElementById('mainContent').style = "visibility:hidden !important; opacity:0!important;transition: visibility 0s, opacity 0.5s linear;";
  //Function to change content
  setTimeout(function() {
     document.getElementById('centerContent').style = "max-height:365px;top:20%;";
    var newDescription = "Fedt, vil du bruge det mørke tema om natten eller hele tiden?";

    var newContent = "<br><label for='omNatten'><input class='checkbox' type='checkbox' id='omNatten'>Om natten</input></label><br>"+
    "<label for='heleTiden'><input class='checkbox' type='checkbox' id='heleTiden'>Hele tiden</input></label><br>";
    document.getElementById('content').innerHTML = newContent;
    document.getElementById('description').innerHTML = newDescription;

    document.getElementById('omNatten').addEventListener('click', omNatten);
    document.getElementById('heleTiden').addEventListener('click', heleTiden);
      //Show content
      setTimeout(function() {
      document.getElementById('mainContent').style = "visibility:visible!important;opacity:1!important;";
      }, 800);
  }, 500);
  function omNatten () {
    document.getElementById('omNatten').checked = true;
    document.getElementById('heleTiden').checked = false;
  }
  function heleTiden () {
    document.getElementById('heleTiden').checked = true;
    document.getElementById('omNatten').checked = false;
  }

  document.getElementById('buttonSave').addEventListener('click', handleClickThree);
  document.getElementById('buttonSkip').addEventListener('click', handleClickThree);

  function handleClickThree () {
    if((document.getElementById('heleTiden').checked) == true) {fourthContent("save", "heleTiden"); return;}
    if((document.getElementById('omNatten').checked) == true) {fourthContent("save", "omNatten"); return;}
    fourthContent();
  }
}

/* --------------------------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------------------------- */

function fourthContent (reason, choice) {
  if(reason == "save") {console.log('save');
    switch (choice) {
     case "omNatten":
        chrome.storage.local.set({darkTheme:false});
        chrome.storage.local.set({darkThemeNight:true});
        break;
    case "heleTiden":
        chrome.storage.local.set({darkThemeNight:false});
        chrome.storage.local.set({darkTheme:true});
        break;
    }
  }
  document.getElementById('mainContent').style = "visibility:hidden !important; opacity:0!important;transition: visibility 0s, opacity 0.5s linear;";
  document.getElementById('centerContent').style = "max-height:274px;top:20%;";

  //new content
  setTimeout(function() {
    var newDescription = "Tak for din tid. Dit Lectio er nu indstillet. Husk du altid kan bruge popup-vinduet til at ændre "+
    "de her indstillinger, og flere. <br><b>Ha' en god dag!</b>";
    document.getElementById('description').innerHTML = newDescription;
    document.getElementById('content').style = "display:none;";
    document.getElementById('buttonSave').style = "display:none;";
    document.getElementById('buttonSkip').style = "display:none;";
    document.getElementById('mainContent').style = "visibility:visible!important;opacity:1!important;";
  }, 500);
}
