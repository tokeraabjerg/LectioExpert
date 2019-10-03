/**
 * @Date:   2019-03-06T20:15:09+01:00
 * @Last modified time: 2019-03-06T20:15:26+01:00
 */

 var url = window.location.href;
 var d=document;
 d.b=d.body;
 d.h=d.head;
 d.t=d.title;
 d.q=d.querySelector;
 d.qAll=d.querySelectorAll;
 d.gId=d.getElementById;
 d.gClass=d.getElementsByClassName;
 d.gTag=d.getElementsByTagName;
 d.c=d.createElement;
 d.aE=d.addEventListener;

 var p = {
   e: Element.prototype
 };
 var sG = function (value) {return localStorage.getItem(value);};
 var sS = function (key, value) {return localStorage.setItem(key, value);};

 /* Time variables */
 var nSec = 1000;
 var nMin = nSec * 60;
 var nQuarter = nMin * 15;
 var nHour = nMin * 60;
 var nDay = nHour * 24;
 var nWeek = nDay * 7;
 var nMonth = nDay * 30;
 var nYear = nDay * 365;
 var aDays = ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"];

 var c=console;
     c.l=c.log;
     c.w=c.warn;
     c.t=c.table;
     c.e=c.error;

 var url=window.location.href;
 var schoolId=/\/lectio\//.test(url) ? url.slice(url.indexOf('/lectio/')+8,url.indexOf('lectio/')+10) : sG(schoolId);    sS("schoolId",schoolId);
 var studentId= /elevid=/.test(url) ? url.slice(url.indexOf('elevid=') + 7, /&prevurl=/.test(url) ? url.indexOf('=prevurl=') : url.length) : sG(studentId);     sS("studentId",studentId);
 c.l(schoolId, studentId);

 var dT=new Date();
     dT.t=dT.getTime();
     dT.d=dT.getDate();
     dT.h=dT.getHours();
     dT.min=dT.getMinutes();
     dT.s=dT.getSeconds();
     dT.m=dT.getMonth();
     dT.y=dT.getFullYear();

 /*################################################################################################################################*/

 p.e.aC = function(el) {
     el.appendChild(this);
     return this;
 };

 p.e.aE = function (ev, f) {
   this.addEventListener(ev, f);
 };
 p.e.rE = function (ev, f) {
   this.removeEventListener(ev, f);
 };

 p.e.q = p.e.querySelector;
 p.e.qAll = p.e.querySelectorAll;
