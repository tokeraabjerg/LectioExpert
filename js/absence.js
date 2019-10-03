/**
 * @Author: Toke Raabjerg <nadgryzione>
 * @Date:   06-Feb-2019
 * @Email:  tokermc@hotmail.com
 * @Project: Lectio Expert
 * @Last modified by:
 * @Last modified time: 2019-05-08T20:05:41+02:00
 */
 //
 // absenceAr=[0,0,0];
 // var totalHours=document.querySelectorAll('#s_m_Content_Content_SFTabStudentAbsenceDataTable tbody tr:last-child td')[6].innerText;
 // totalHours=totalHours.slice(totalHours.indexOf('/')+1,totalHours.length).replace(",",".");
 // var periodHours=document.querySelectorAll('#s_m_Content_Content_SFTabStudentAbsenceDataTable tbody tr:last-child td')[4].innerText;
 // periodHours=periodHours.slice(periodHours.indexOf('/')+1,periodHours.length).replace(",",".");
 //
 // get(document.querySelector('#s_m_HeaderContent_subnavigator_ctl02').href, function (callback) {
 //     for(var i=1;i<callback.length;i++) {
 //       absenceAr[0]++;
 //       if(callback[i].querySelector('img[src="/lectio/img/ok.gif"]')) {
 //         absenceAr[1]++;
 //       } else {
 //         absenceAr[2]++;
 //       }
 //     }
 // 	console.log(absenceAr);
 // 	build();
 // }, "html");
 //
 // function build () {
 //   var spacer=document.createElement('tr');spacer.innerHTML="<td colspan='14'></td>";document.querySelector('#s_m_Content_Content_SFTabStudentAbsenceDataTable tbody').appendChild(spacer);
 // 	var e=document.createElement('tr');
 //    e.className='lectioTR';
 // 		e.innerHTML="<td colspan='7'><b class='center'>Fraværsprocent perioden - ink. godskrevet: "+((absenceAr[0]/periodHours)*100).toFixed(2)+"%</b></td>"+"<td colspan='6'><b class='center'>Fraværsprocent året - ink. godskrevet: "+((absenceAr[0]/totalHours)*100).toFixed(2)+"%</b></td>";
 // 		document.querySelector('#s_m_Content_Content_SFTabStudentAbsenceDataTable').appendChild(e);
 // }
 //
 // function get(url, callback, responseType) {
 // var xhttp = new XMLHttpRequest();
 //   xhttp.onreadystatechange = function() {
 //     if (this.readyState == 4 && this.status == 200) {
 //     	callback(xhttp.responseXML.querySelectorAll('#s_m_Content_Content_FatabAbsenceFravaerGV tr'));
 //     }
 //   };
 //   xhttp.open("GET", url, true);
 //   if(responseType == "html") {xhttp.responseType="document";}
 //   xhttp.send();
 // }
