/**
 * @Author: Toke Raabjerg <nadgryzione>
 * @Date:   25-Sep-2018
 * @Email:  tokermc@hotmail.co
 * @Project: Lectio Expert
 * @Last modified by:
 * @Last modified time: 2019-05-08T20:05:44+02:00
 */

// chrome.storage.local.get(['Lectio_dayNote'], function (r) {
//  if(r.Lectio_dayNote != false) {dayNote();}
// });
//
// //Run
// function dayNote () {
//   var statusExpanded=false;
//   var style = document.createElement('style');
//   style.innerHTML = ".s2skema .s2infoHeader, .s2skema .s2infoHeader > div {overflow:hidden;max-height: 35px!important;}";
//   document.body.appendChild(style);
//
//   var weekNotes = document.getElementsByTagName('tbody')[0].children[2];
//   var dayNotesCount = weekNotes.childElementCount;
//
//   for (var i=1; i < dayNotesCount; i++) {
//     var parent = document.getElementsByClassName('s2infoHeader')[i];
//
//
//
//     closeDiv = document.createElement('div');
//     closeDiv.innerHTML = "Vis mere";
//
//     closeDiv.className = "dayNoteShow";
//     closeDiv.style = "background-color:#F8F8F8;z-index:2;text-align:center;font-style:italic;text-decoration:underline;cursor:pointer;";
//     //parent.appendChild(closeDiv);
//     parent.insertBefore(closeDiv, parent.firstChild);
//   }
//
//   weekNotes.addEventListener('click', function (event) {expand ();});
//
//
//
//   function expand () {
//
//     var dayNoteCount = document.querySelectorAll('.dayNoteShow').length;
//
//     switch(statusExpanded) {
//
//       case false:
//           for(var i=0;i<dayNoteCount;i++) {
//
//             document.getElementsByClassName('dayNoteShow')[i].innerHTML = "Vis mindre";
//           }
//           style.innerHTML = ".s2skema .s2infoHeader, .s2skema .s2infoHeader > div {max-height: 500px!important;}";
//           statusExpanded = true;
//
//           break;
//
//       case true:
//           for(var y=0;y<dayNoteCount;y++) {
//             document.getElementsByClassName('dayNoteShow')[y].innerHTML = "Vis mere";
//           }
//           style.innerHTML = ".s2skema .s2infoHeader, .s2skema .s2infoHeader > div {overflow:hidden;max-height: 35px!important;}";
//           statusExpanded = false;
//           break;
//     }
//   }
// }
