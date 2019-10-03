/**
 * @Author: Toke Raabjerg <nadgryzione>
 * @Date:   28-Nov-2018
 * @Email:  tokermc@hotmail.com
 * @Project: Lectio Expert
 * @Last modified by:
 * @Last modified time: 2019-05-08T20:08:47+02:00
 */

//function absenceChart () {
  (function (){
    var p = document.getElementById('s_m_Content_Content_SFTabGraphicViewIsland_pa');

    var e = document.createElement('div');
        e.id = "absenceChart";
        e.style = "width:100%;";
        e.innerHTML = "<div id='absenceChart-period'></div><div id='absenceChart-year'></div>";
        p.insertBefore(e,p.children[0]);

        var ee = document.createElement('div');
            ee.id = "absenceChart-skriftlig";
            ee.style = "width:100%;";
            ee.innerHTML = "<div id='absenceChart-skriftlig-period'></div><div id='absenceChart-skriftlig-year'></div>";
            p.insertBefore(e,p.children[1]);
  }());

// First chart

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var data = new google.visualization.DataTable();
      data.addColumn('string', 'Fag');
      data.addColumn('number', 'Procent');

      (function (){
        var table = document.getElementById('s_m_Content_Content_SFTabStudentAbsenceDataTable');
        var tbody = table.children[0];
        var str = ""; var number = 0; var n;

        for(var i = 4; i < tbody.childElementCount - 1; i++) {
          string = tbody.children[i].children[0].children[0].innerHTML + '';
          number = tbody.children[i].children[4].innerHTML;
          n = number.slice(0,number.indexOf("/"));
          data.addRow([   string     ,    Number(n)    ]);
        }
      }());

          var options = {
            title: 'Fravær ift. fag',
            is3D: 'true',
            chartArea:{left:20,top:20,width:'400%',height:'210%'},
            fontSize: "15"
          };

              var chart = new google.visualization.PieChart(document.getElementById('absenceChart-period'));
              chart.draw(data, options);
}


//CHART 2 SKRIFTLIGT FRAVÆR
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(draw2Chart);

function draw2Chart() {
  var data = new google.visualization.DataTable();
      data.addColumn('string', 'Fag');
      data.addColumn('number', 'Procent');

          (function (){
            var table = document.getElementById('s_m_Content_Content_SFTabStudentAbsenceDataTable');
            var tbody = table.children[0];
            var str = ""; var number = 0; var n;

            for(var i = 4; i < tbody.childElementCount - 1; i++) {
              string = tbody.children[i].children[0].children[0].innerHTML + '';
              number = tbody.children[i].children[10].innerHTML;
              n = number.slice(0,number.indexOf("/"));

              data.addRow([   string     ,    Number(n)    ]);
            }
          }());

              var options = {
                title: 'Skriftligt fravær ift. fag',
                is3D: 'true',
                chartArea:{left:0,top:20,width:'400%',height:'210%'},
                fontSize: "15"
              };

                  var chart = new google.visualization.PieChart(document.getElementById('absenceChart-year'));
                  chart.draw(data, options);
  }
//}

var interval = window.setInterval(function(){
  if(document.getElementById('nightTheme')) {
    document.getElementById('LectioCSS').innerHTML += "#absenceChart svg > rect {fill: #3F3F3F;}";
  } else {
    document.getElementById('LectioCSS').innerHTML += "#absenceChart svg > rect {fill: white;}";
  }
},1000);
