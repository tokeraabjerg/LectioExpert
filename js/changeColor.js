/**
 * @Author: Toke Raabjerg <nadgryzione>
 * @Date:   10-Sep-2018
 * @Email:  tokermc@hotmail.co
 * @Project: Lectio Expert
 * @Last modified by:
 * @Last modified time: 2019-02-25T19:49:32+01:00
 */


chrome.storage.local.get([
  'Lectio_useCustomColor',
  'Lectio_customColor'
], function (result) {

  if(result.Lectio_useCustomColor == true)  {
    if(result.Lectio_customColor != undefined) {
      var url = window.location.href;
      if ((url.indexOf('lectio')) > -1) {url = true;} else {url = false;}
      color = "#";
      color += result.Lectio_customColor;
      hover = "#" + result.Lectio_customColor + 90;
      if (url == true) {
        setTheme(color);console.log(true);
      } else if (url == false) {
        setThemeLocal(color);
      }
    }
  }
});

function setTheme (color) {
  var head = document.getElementsByTagName('head')[0];
  head.innerHTML += ""+
  "<style>"+
  ".yearselect,a#m_ForsideLink,a#m_defaultaspxLink,a#m_LoginOutLink,a#m_kontaktLink,a#m_HelpLink,a#m_mastersearchbtn,a#m_mastersearchbtn,a#s_m_ForsideLink,a#s_m_defaultaspxLink,a#s_m_LoginOutLink,a#s_m_kontaktLink,a#s_m_HelpLink,a#s_m_mastersearchbtn,a#m_Content_submitbtn2,.s2weekHeaderTD,.activityHeader,TD.activityHeader,.lectioTabContainer.lectioTabToolbar.buttonA,BUTTON.button,INPUT.button,.ls-button-disabled-hover,BUTTON.button,INPUT.button,.ui-dialog.ui-dialog-buttonpanebutton,SECTION.island .islandHeaderContainer, span.islandHeader, .s2weekHeader td, A.button, DIV.button A, SPAN.button A,TABLE.island .islandHeader, TABLE.island .islandHeaderRight, TABLE.island .islandHeaderRight, th.islandHeader, .activityHeaderRow, TABLE.island .islandHeaderRight, .ui-dialog .ui-dialog-buttonpane button,.ui-corner-all, .s2weekHeader td"+
  "{background-color:"+color+"!important;border:0px white !important;}"+
//  ""+
  "</style>";
}

function setThemeLocal (color) {
  var head = document.getElementsByTagName('head')[0];
  head.innerHTML += ""+
  "<style>"+
  ".headerButton"+
  "{background-color:"+color+"!important;border:0px white !important;}"+
  ".headerButton:hover"+
  "{background-color:"+hover+"!important;border:0px white !important;}"+
  " .verticalLine"+
  "{border-color:"+color+"!important;}"+
  "</style>";
}
