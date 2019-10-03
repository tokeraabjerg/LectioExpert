// /**
//  * @Author: Toke Raabjerg <TokeDK>
//  * @Date:   04-Sep-2018
//  * @Email:  tokermc@hotmail.co
//  * @Project: Lectio Expert
 * @Last modified by:
 * @Last modified time: 2019-05-08T19:24:49+02:00
//  */
//  /*----------------------------------------------------------------*/
//  //                            Enabled?                            //
//  /*----------------------------------------------------------------*/
//
//  chrome.storage.local.get([
//    'Lectio_opgaverCountDown'
//  ], function (result) {
//    if (result.Lectio_opgaverCountDown != false) {
//      getDueDateRun();
//    }
//  }
// );
//
//  /*----------------------------------------------------------------*/
//  //                           Variables                            //
//  /*----------------------------------------------------------------*/
//
// var dom_id = ""; var afleveret = false;
//
// /*----------------------------------------------------------------*/
// //                           Loop query                           //
// /*----------------------------------------------------------------*/
//
// function getDueDateRun () {
//   var style = document.getElementById('LectioCSS');
//       style.innerHTML += ".afleveret {text-decoration:line-through;}";
//
//   getData();
//   function getData () {
//
//     document.getElementsByTagName('tbody')[0].id = 'opgaverDue';
//
//      var getChildren = document.getElementById('opgaverDue').childElementCount;
//      var GetinnerHTML = document.getElementById('opgaverDue');
//
//      for(var i = 0; i < getChildren; i++)
//      {
//         if (i != 0) {
//             setDate = GetinnerHTML.rows[i].cells[3];
//             var inner = GetinnerHTML.rows[i].cells[3].innerHTML;
//             var status = GetinnerHTML.rows[i].cells[5].innerHTML;
//
//             if (status == "Afleveret") {
//               afleveret = true;
//             } else if (status != "Afleveret") {
//               afleveret = false;
//             }
//
//             if (inner != null && inner != undefined && inner != "") {sortDate (inner);}
//         }
//      }
//   }
//
//   /*----------------------------------------------------------------*/
//   //                         Sort DOM data                          //
//   /*----------------------------------------------------------------*/
//   var dateStr; var monthStr; var yearStr; var hourStr; var minuteStr;
//   function sortDate (innerHTML) {
//     dateStr = innerHTML.slice(0, innerHTML.indexOf("/"));
//     monthStr = innerHTML.slice(innerHTML.indexOf("/") + 1, innerHTML.indexOf("-")); monthStr--; //months go 0-11 in javascript...
//     yearStr = innerHTML.substr(innerHTML.indexOf("-") + 1, 4);
//     hourStr = innerHTML.slice(innerHTML.indexOf(" ") + 1, innerHTML.indexOf(":"));
//     minuteStr = innerHTML.slice(innerHTML.indexOf(":") + 1);
//
//     console.log(dateStr,"/",monthStr,"-",yearStr," ",hourStr,":",minuteStr);
//     createDom();
//   }
//
//
//   /*----------------------------------------------------------------*/
//   //                        Create DOM data                         //
//   /*----------------------------------------------------------------*/
//   var dom;
//   function createDom () {
//     dom_id += 'countDown'+1+'';
//     dom = document.createElement('span');
//     dom.id = dom_id;
//     if(afleveret == true) {
//       dom.className = "afleveret";
//     }
//
//
//     dom.style = 'background:#080!important;color:white;';
//
//
//     setDate.appendChild(dom);
//     CountDownTimer (dom_id);
//
//   }
//
//     function CountDownTimer(dom_id)
//     {
//         var end = new Date(yearStr, monthStr, dateStr, hourStr, minuteStr);
//
//         var _second = 1000;
//         var _minute = _second * 60;
//         var _hour = _minute * 60;
//         var _day = _hour * 24;
//         var timer;
//
//         function showRemaining() {
//             var now = new Date();
//             var distance = end - now;
//             if (distance < 0) {
//
//                 clearInterval(timer);
//                 dom.innerHTML = 'Udløbt!';
//                 return;
//             }
//
//             var days = Math.floor(distance / _day);
//             var hours = Math.floor((distance % _day) / _hour);
//             var minutes = Math.floor((distance % _hour) / _minute);
//             var seconds = Math.floor((distance % _minute) / _second);
//
//             document.getElementById(dom_id).innerHTML = "<br>" + days + "d " + hours + "t " + minutes + "m " + seconds + "s ";
//
//             styleIt (days);
//         }
//         timer = setInterval(showRemaining, 1000);
//
//     function styleIt (days) {
//       if (days < 3) {
//         document.getElementById(dom_id).style = 'background:orange !important;color:white;';
//       }
//
//       if (days == 0) {
//         document.getElementById(dom_id).style = 'background:red !important;color:white;';
//       }
//     }
//   }
// }
