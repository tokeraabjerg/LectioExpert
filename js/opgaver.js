 /**
  * @Author: Toke Raabjerg <nadgryzione>  * @Date:   05-Oct-2018
  * @Email:  tokermc@hotmail.co
  * @Project: Lectio Expert
 * @Last modified by:
 * @Last modified time: 2019-05-08T19:26:19+02:00
  */
//
//  /*----------------------------------------------------------------*/
//  //                              Check                             //
//  /*----------------------------------------------------------------*/
//
// chrome.storage.local.get([
//   'Lectio_hideAfleverede'
// ], function (result) {
//   if (result.Lectio_hideAfleverede != undefined) {
//     if(result.Lectio_hideAfleverede == true) {
//       hideAfleverede("display:none;");
//     }
//   } else {
//     chrome.storage.local.set({
//       Lectio_hideAfleverede:false
//     });
//   }
//   setupDOM(result.Lectio_hideAfleverede);
// });
//
// /*----------------------------------------------------------------*/
// //                            setupDOM                            //
// /*----------------------------------------------------------------*/
//
// function setupDOM (checked) {
//   var input = document.createElement('input');
//   var label =  document.createElement('label');
//     input.id = "skjulAfleverede";
//     input.type = "checkbox";
//     input.style = "margin-left:15px;";
//     input.checked = checked;
//
//
//     label.id = "labelForSkjulAfleverede";
//     label.htmlFor = "skjulAfleverede";
//     label.innerHTML = "Skjul afleverede opgaver ";
//     label.style = "user-select:none;";
//
//   document.getElementsByClassName('textMid')[1].appendChild(input);
//   document.getElementsByClassName('textMid')[1].appendChild(label);
//
//   input.addEventListener('click',clickInput);
//   label.addEventListener('click',clickInput);
//
//   function clickInput () {
//     var input = document.getElementById('skjulAfleverede').checked;
//     chrome.storage.local.set({Lectio_hideAfleverede:input});
//
//     switch (input) {
//       case false:
//           hideAfleverede("display:inline:");
//           break;
//       case true:
//           hideAfleverede("display:none;");
//           break;
//     }
//   }
// }
//
// /*----------------------------------------------------------------*/
// //                             hideAFL                            //
// /*----------------------------------------------------------------*/
//
// function hideAfleverede (style) {
//   var getTR = document.getElementsByTagName('tbody')[0].childElementCount;
//   var GetinnerHTML = document.getElementsByTagName('tbody')[0];
//
//   //var inner = document.getElementsByTagName('tr')[10].children[5].innerHTML;
//
//   for(var i = 1;i < getTR;i++) {
//     var status = GetinnerHTML.rows[i].cells[5].innerHTML;
//     if (status == "Afleveret") {
//       GetinnerHTML.rows[i].style = style;
//     }
//   }
//
// }
