/**
 * @Date:   2019-01-27T00:59:39+01:00
 * @Last modified time: 2019-02-25T20:44:49+01:00
 */
/*----------------------------------------------------------------*//*----------------------------------------------------------------*/
/*                                                                *//*                                                                */
//                            PREFAB                              ////                            PREFAB                              //
/*                                                                *//*                                                                */
/*----------------------------------------------------------------*//*----------------------------------------------------------------*/
var target = window.location.href;
if(/&week/.test(target)) {
	target=target.slice(0,target.indexOf('&week'));
}
var tempAr=[];var lessonsAr=[];
var week=getWeek(); var tempWeek=week;var standard_weeks=10; active=false;
var year=new Date().getFullYear();
var data; var options; var chart='chart_div2';
var contenttable=document.querySelector('#contenttable');

/*	SETUP DOM	*/
/*	SETUP DOM	*/
/*	SETUP DOM	*/
var div=document.createElement('div');
		div.id="chart_container";
		div.innerHTML='<table id="chart_container_header"></table><div id="chart_mainContent"></div>';
		contenttable.insertBefore(div,contenttable.children[2]);
		var chart_header=document.getElementById('chart_container_header');
		var chart_content=document.getElementById('chart_mainContent');
		document.querySelector('.ls-std-rowblock').style="display:none;";

var script = document.createElement("script");
	script.src="https://www.gstatic.com/charts/loader.js";
	script.type="text/javascript";
	document.querySelector('head').appendChild(script);
	script.onload=function(){
		google.charts.load('current', {packages: ['corechart', 'line']});
	};

var chart = document.createElement('div');
	chart.id="chart";
	chart.innerHTML="<h1>Timer over x uger:</h1><p style='width:40vw;'>Denne funktioner henter dit/andres klassers skema x antal uger frem, og tæller hvor mange timer du har i netop den uge. Derefter kan du sammenligne med andres skema. Den øverste række hvor der står 'status' henter din skema, hvorimod 'sammenlign med' henter hvis ends skema du har valgt.<br><br> Hvis du vil sammenligne med en specifik elev kan du blot vælge eleven efter du har valgt klassen. (Dette er anbefalet da den ellers sammenlægger alle klassens timer, heriblandt alle valgfag osv.)<br><br><i>Brug spørgsmålstegnet i højre hjørne hvis der opstår en fejl, tak.</i></p><div><h4>Dit skema</h2><div id='chart_div'></div></div><br><br><div><h4>Andres skema</h2><div id='chart_div2'></div></div>";
	chart_content.appendChild(chart);
		chart_header.innerHTML +=
		"<tr>"+
			"<td>"+
				"<span class='description'>Status</span>"+
			"</td>"+
			"<td colspan='2'>"+
				"<progress id='skema_xml_get_progress'></progress>"+
			"</td>"+
			"<td>"+
				"<span class='description'>Antal uger frem</span>"+
			"</td>"+
			"<td>"+
				"<input id='weeks' value='10'>"+
			"</td>"+
			"<td>"+
				"<div id='submitChart'>Vis</div>"+
			"</td>"+
		"</tr>"+
		"<tr>"+
			"<td>"+
				"<span class='description'>Sammenlign med</span>"+
			"</td>"+
			"<td>"+
				"<select id='classes_compare'></selection>"+
				"<select id='students_compare'></selection>"+
			"</td>"+
			"<td>"+
				"<select id='students_compare'></selection>"+
			"</td>"+
			"<td>"+
				"<span class='description'>Antal uger frem</span>"+
			"</td>"+
			"<td>"+
				"<input id='weeks_compare' value='10'>"+
			"</td>"+
			"<td>"+
				"<div id='submitCompare'>Vis</div>"+
			"</td>"+
		"</tr>";

var progress=document.getElementById('skema_xml_get_progress');
		progress.value=0;
		progress.max=Number(standard_weeks)+1;
var weeks_value = document.getElementById('weeks');
var weeks_value_compare = document.getElementById('weeks_compare');
var submitChart = document.getElementById('submitChart');
var submitCompare = document.getElementById('submitCompare');
var select=document.getElementById('classes_compare');

/*----------------------------------------------------------------*/
/*                                                                */
//                            event listeners                     //
/*                                                                */
/*----------------------------------------------------------------*/
// this fucker gets the students from the chosen class and fills them in compare_students
select.addEventListener('click', function(e) {
	getStudents(
		window.location.href.slice(0,window.location.href.indexOf('SkemaNy.aspx')) + "subnav/members.aspx?klasseid="+document.getElementById('classes_compare').value+"&showstudents=1"
	);
});

// this fucker just pulls the chart from your own skema
submitChart.addEventListener('click', function(e) {console.log(active);
	if(/^\d+$/.test(weeks_value.value) && weeks_value.value > 0 && !active) {
		active=true;//to prevent bugs limits to getting one skema at a time
		tempAr=[];lessonsAr=[];gvjs_R.jc=[];//reset the chart
		progress.value=0;//reset progress
		progress.max=Number(weeks_value.value)+1;
		get(
			weeks_value.value,
			/&week/.test(window.location.href) ? window.location.href.slice(0,window.location.href.indexOf('&week')) : window.location.href
		);
		chart="chart_div";setup();

		var activeInterval1 = window.setInterval(function(){if(progress.value==progress.max){active=false;clearInterval(activeInterval1);}},500);//set status to active
	//just to prevent bugs
	} else if(!/^\d+$/.test(weeks_value.value)) {
		alert("Der må kun være numre i 'Antal uger'");
	} else if(weeks_value.value<=0) {
		alert("Antal uger skal være større end 0.");
	} else if(active) {
		alert("En ting af gangen...");
	}
});

//this ol fucker compares it to either the chosen class or the chosen student
submitCompare.addEventListener('click', function(e) {
	if(/^\d+$/.test(weeks_value_compare.value) && weeks_value_compare.value > 0 && !active) {
		active=true;//to prevent bugs limits to getting one skema at a time
		tempAr=[];lessonsAr=[];gvjs_R.jc=[];//reset chart
		progress.value=0;//reset progress
		progress.max=Number(weeks_value_compare.value)+1;
		//console.log(document.getElementById('students_compare').value ? window.location.href.slice(0,window.location.href.indexOf('elevid=')+7)+document.getElementById('students_compare').value : window.location.href.slice(0,window.location.href.indexOf('SkemaNy.aspx'))+"SkemaNy.aspx?type=stamklasse&klasseid="+document.getElementById('classes_compare').value );
		get(
			weeks_value_compare.value,
			//here we check if theres a chosen student, and if there is we'll get the student skema instead of class skema
			document.getElementById('students_compare').value ? window.location.href.slice(0,window.location.href.indexOf('elevid=')+7)+document.getElementById('students_compare').value : window.location.href.slice(0,window.location.href.indexOf('SkemaNy.aspx'))+"SkemaNy.aspx?type=stamklasse&klasseid="+document.getElementById('classes_compare').value
		);
		chart='chart_div2';setup();

		var activeInterval2 = window.setInterval(function(){if(progress.value==progress.max){active=false;clearInterval(activeInterval2);}},500);//set status to active
	//just to prevent bugs
	} else if(!/^\d+$/.test(weeks_value_compare.value)) {
		alert("Der må kun være numre i 'Antal uger'");
	} else if(weeks_value_compare.value<=0) {
		alert("Antal uger skal være større end 0.");
	} else if(active) {
		alert("En ting af gangen...");
	}
});
/*----------------------------------------------------------------*//*----------------------------------------------------------------*/
/*                                                                *//*                                                                */
//                            PREFAB DONE                             ////                            PREFAB DONE                              //
/*                                                                *//*                                                                */
/*----------------------------------------------------------------*//*----------------------------------------------------------------*/
//this gets the classes from the school
getClasses();

//sets up the chart
function setup () {
	if(!chart) {chart="chart_div";}
	data = new google.visualization.DataTable();
	data.addColumn('number', 'X');
	data.addColumn('number', 'Timer');

	options = {//options for chart
		chartArea:{width:'80%',height:'50%',left:'10%'},
	  hAxis: {
	    title: 'Uger'
	  },
	  vAxis: {
	    title: 'Timer'
	  }
	};

	chart = new google.visualization.LineChart(document.getElementById(chart));

	if(progress.value!=progress.max) {//wait til progress bar is at 9/10 or whatever to build the chart - to prevent it from building before it has all the data
			var interval=window.setInterval(function(){
				if(progress.value==progress.max-1) {
					clearInterval(interval);
					build();
				}
			},2500);
		}
}

function build() {//this just builds the chart ones it has the data it needs, activated from the interval
	for(var i=0;i<tempAr.length;i++) {
		var pos=tempAr[i][0];
		lessonsAr[pos] = tempAr[i];
	}//console.log(lessonsAr, tempAr, data);
	data.addRows(lessonsAr);
	chart.draw(data, options);
	progress.value++;
}

//get the skema
function get (weeks, url, compareClass) {var tempTarget;var tempWeek=week;
	for(var i=0;i<weeks;i++){
		if(tempWeek<10) {newWeek=0+tempWeek.toString();} else {newWeek=tempWeek;}
		if(tempWeek>52) {alert('Der er opstået en fejl pga årskifte.');}
		if(i!=0){tempTarget=url+"&week="+newWeek+year;} else {tempTarget=url;}

		fXMLSimple(tempTarget, true,i,function(result,c) {
			var ec = result.responseXML.querySelectorAll('.s2bgbox:not(.s2cancelled)').length;
			tempAr.push([c,ec]);
			lessonsAr.push([]);
			progress.value++;
		});
		tempWeek++;
	}//console.log(tempAr,lessonsAr);
}

//get the classes in the school
function getClasses() {
	var tempTarget; var r="";
	tempTarget=target.slice(0,target.indexOf('SkemaNy.aspx'))+"FindSkema.aspx?type=stamklasse";
	fXMLSimple(tempTarget, true, 0,function(result,c){
		var el = result.responseXML.querySelectorAll('#m_Content_listecontainer a');
		for(var i=0;i<el.length;i++) {//loop through xml content
			var href=el[i].href;
			r+="<option value='"+href.slice(href.indexOf('klasseid=')+9,href.length)+"'>"+el[i].innerHTML+"</option>";
		}
		document.getElementById('classes_compare').innerHTML = r;//load em into the select
	});
}

//get the students in the class
function getStudents(url) {
	var r="<option></option>";
	fXMLSimple(url, true, 0,function(result,c){
		var el = result.responseXML.querySelectorAll('#s_m_Content_Content_laerereleverpanel_alm_gv td.largeCol.printUpscaleFontFornavn a');
		for(var i=0;i<el.length;i++) {//loop through xml content
			var href=el[i].href;
			r+="<option value='"+href.slice(href.indexOf('elevid=')+7,href.length)+"'>"+el[i].innerHTML+"</option>";
		}
		document.getElementById('students_compare').innerHTML = r;//load em into the select
	});
}

//multi purpose xml get function
function fXMLSimple (url, response,c, callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
   		callback(xhttp,c);
      }
  };
  xhttp.open("GET", url, true);
  if(response) {xhttp.responseType = "document";}
  xhttp.send();
}

//get the week of the year
function getWeek () {
  var d = new Date();
  var dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  return Math.ceil((((d - yearStart) / 86400000) + 1)/7);
}
