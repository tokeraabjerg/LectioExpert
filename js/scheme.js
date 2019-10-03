/**
 * @Date:   2018-11-01T14:48:31+01:00
 * @Last modified time: 2019-02-20T20:57:37+01:00
 */
window.addEventListener('DOMContentLoaded', function (event) {

  chrome.storage.local.get(['Lectio_skema', 'Lectio_lastSkemaUpdate'], function (result) {
    if(result.Lectio_skema != undefined) {
    var s = document.getElementById('skema');
    document.getElementById('skema').innerHTML = result.Lectio_skema;

    if(/Der er ingen aktiviteter at vise./.test(document.getElementById('skema').innerHTML)) {
      document.getElementById('skema').innerHTML =
      "<div id='noClasses'>"+
      '<h1 style="color:#444;">Du har fri!</h1>'+
      '<i class="far fa-smile-beam" style="font-size:400%;color:#444;"></i>'+
      "</div>";

    }


    // p = document.getElementsByClassName('s2skemabrik s2bgbox s2withlink lec-context-menu-instance');
    // for (var i = 0; i < p.length; i++) {
    //   var d = p[i].dataset.additionalinfo;
    //
    //   var e = document.createElement('div');
    //     e.className = "skemaInfo";
    //     e.innerHTML = d;
    //     p[i].appendChild(e);
    // }

    if(result.Lectio_lastSkemaUpdate != undefined) {
      var dT = result.Lectio_lastSkemaUpdate;
      var date = new Date();
      var dH = Math.round((date.getTime() - dT) / 3600000);
      if(dH < 1) {
        var dM = Math.round((date.getTime() - dT) / 60000);
        var oI = document.getElementsByClassName('s2dayHeaderSimple')[0];
        if (oI) oI.innerHTML = "(Sidst opdateret for "+dM+" minutter siden)<br>" + oI.innerHTML;
      } else {
        var oIT = document.getElementsByClassName('s2dayHeaderSimple')[0];  var dHn = (dH == 1) ? "time" : "timer";
        if (oIT) oIT.innerHTML = "(Sidst opdateret for "+dH+" "+dHn+" siden)<br>" + oIT.innerHTML;
      }
    }
  } else {
    document.getElementById('skema').innerHTML =
    "<div id='noClasses'>"+
    '<h1 style="color:#444;">Opdater på Lectios forside!</h1>'+
    '<i class="far fa-smile-beam" style="font-size:400%;color:#444;"></i>'+
    "</div>";
  }
  });
});
