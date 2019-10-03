/**
 * @Author: Toke Raabjerg <nadgryzione>
 * @Date:   09-Sep-2018
 * @Email:  tokermc@hotmail.co
 * @Project: Lectio Expert
 * @Last modified by:
 * @Last modified time: 2019-03-07T17:34:17+01:00
 */

 var url = window.location.href;
 var schoolId=/\/lectio\//.test(url) ? url.slice(url.indexOf('/lectio/')+8,url.indexOf('lectio/')+10) : "";
 var studentId= /elevid=/.test(url) ? url.slice(url.indexOf('elevid=') + 7, /&prevurl=/.test(url) ? url.indexOf('=prevurl=') : url.length) : "";
 if(schoolId != "") {
   chrome.storage.local.set({
     lectio_skoleId:schoolId
   });
 }
 if(studentId != "") {
   chrome.storage.local.set({
     lectio_elevId:studentId
   });
 }
