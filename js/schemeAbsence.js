/**
 * @Author: Toke Raabjerg <nadgryzione>
 * @Date:   14-Feb-2019
 * @Email:  tokermc@hotmail.com
 * @Project: Lectio Expert
 * @Last modified by:
 * @Last modified time: 2019-03-07T23:14:51+01:00
 */
var absenceTarget;
if(!/forside.aspx/.test(window.location.href)) {
  absenceTarget=window.location.href.slice(0,window.location.href.indexOf('SkemaNy.aspx'))+"subnav/fravaerelev_fravaersaarsager.aspx?"+window.location.href.slice(window.location.href.indexOf('elevid='),window.location.href.length);
} else {
  absenceTarget=window.location.href.slice(0,window.location.href.indexOf('forside.aspx'))+"subnav/fravaerelev_fravaersaarsager.aspx?"+"elevid="+document.getElementById('s_m_HeaderContent_MainTitle').dataset.lectiocontextcard.replace("S","");
}console.log(absenceTarget);
get();

function get () {
	var absenceAr=[]; var classesAr=[];
	fXMLGet(absenceTarget, "html", function (r) {
		var e=r.querySelectorAll('.s2skemabrik');
		for(var i=0;i<e.length;i++) {
			absenceAr.push(e[i].href.slice(e[i].href.indexOf('absid='),e[i].href.indexOf('&prevurl')));
		}

		e=document.querySelectorAll('.s2bgbox');
       for(var ii=0;ii<e.length;ii++) {
           classesAr.push(e[ii].href.slice(e[ii].href.indexOf('absid='),e[ii].href.indexOf('&prevurl')));
       }
		compare(absenceAr, classesAr);
		//console.log(absenceAr, classesAr);
	});
}

function compare (absenceAr, classesAr) {
	for(var i=0;i<absenceAr.length;i++) {
		if(classesAr.includes(absenceAr[i])){
			change(absenceAr[i]);
		} else {
			//console.log('false');
		}
	}
}

function change (value) {
	document.querySelector('.s2bgbox[href*="'+value+'"]').className += ' classAbsence';
}



function fXMLGet (url, type, callback) {
 var xhttp = new XMLHttpRequest();
 xhttp.onreadystatechange = function() {
   if (this.readyState == 4 && this.status == 200) {
     // action
     switch (type) {
       case "html":
           callback(xhttp.responseXML);
           break;
       case "json":
           callback(JSON.parse(xhttp.response));
           break;
     }
   }
 };
 xhttp.open("GET", url, true);
 if(type == "html") { xhttp.responseType = "document"; }
 xhttp.send();
}
