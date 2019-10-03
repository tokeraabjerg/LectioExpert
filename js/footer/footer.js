/**
 * @Author: Toke Raabjerg <nadgryzione>
 * @Date:   13-Oct-2018
 * @Email:  tokermc@hotmail.com
 * @Project: Lectio Expert
 * @Last modified by:
 * @Last modified time: 2019-02-20T22:04:18+01:00
 */
//document.addEventListener('DOMContentLoaded', function (event) {console.log('1 start');
setTimeout (function() {

  var footer = document.createElement('div');
      footer.id = "footer";
      footer.innerHTML = ''+
      '<div id="support">'+
        '<div id="supportContent">'+
          '<i id="supportIcon" class="fas fa-question"></i>'+
          '<hr id="supportHR">'+
          '<h2 id="supportTitle">Har du brug for hjælp?</h2>'+
          '<sub id="supportSubTitle">Så står vi til assistance, lige her: (Scroll ned)</sub><p></p>'+
          '<iframe id="supportIframe" style="overflow-x:hidden;" src="https://docs.google.com/forms/d/e/1FAIpQLSf09LyWwIdxxAKFht_6cmAX-40UzZOgQiVHTIQhz9hG736Ydg/viewform?embedded=true" width="250" height="320" frameborder="0" marginheight="0" marginwidth="0">Indlæser...</iframe>'+
        '</div>'+
      '</div>'+
      '<div id="copyright"><a href="https://lectioexpert.000webhostapp.com/html/terms.html" target="_blank">&copy</a></div>'; //<i class="fas fa-copyright"></i>
      document.body.appendChild(footer);

  if((document.getElementById('nightTheme')) != null) {
    color_border = "#3f3f3f";
    color_background = "#3f3f3f";
    color_font = "white";
  } else {
    color_border = "#d6d9da";
    color_background = "#d6d9da";
    color_font = "black";
  }
    document.getElementById('LectioCSS').innerHTML +=
      "div#support, div#copyright {background:"+color_background+"!important;border-color:"+color_border+"!important;color:"+color_font+"!important;z-index:3;}"+
      "div#copyright > a {color:"+color_font+"!important;}"+
      "h2#supportTitle {color:"+color_font+"!important;}"+
      "";
  /* --------------------------------------------------------------------------------------------------------- */
  /* --------------------------------------------------------------------------------------------------------- */
  /* --------------------------------------------------------------------------------------------------------- */

  var open = false;

  var support = document.getElementById('support');
  var supportContent = document.getElementById('supportContent');

    //Support open
      var open_support_0 = "border-radius:15px!important;width:255px!important;height:80px!important;background:"+color_border+"!important;color:"+color_font+"!important;";
      var open_support_1 = ""+open_support_0+"height:444px!important;";

    //Support close
      var close_support_0 = ""+open_support_1+"height:80px!important;";
      var close_support_1 = ""+close_support_0+"border-radius:5000px!important;width:32px!important;height:32px!important;color:"+color_font+"!important;background:"+color_border+"!important;";

    //Background
      var show_background = "position:fixed;top:0px;left:0px;height:100%;width:100%;";

  /* --------------------------------------------------------------------------------------------------------- */
  /* --------------------------------------------------------------------------------------------------------- */
  /* --------------------------------------------------------------------------------------------------------- */
  support.addEventListener('click', openSupport);


  function openSupport () {
    if(open == true) {return;} else {open = true;}
    support.removeEventListener('click', openSupport);

    //Start opening support modal
    support.style = open_support_0;

    setTimeout(function () {
      support.style = open_support_1;
    }, 800);

    //Setup actions for closing modal..
    if((document.getElementById('supportBackground')) == null) {
      background = document.createElement('div');
          background.style = show_background;
          background.id = "supportBackground";
          document.body.appendChild(background);
    } else {
      background = document.getElementById('supportBackground');
          background.style = show_background;
    }
    background.addEventListener('click', closeSupport);
  }


  function closeSupport () {
    background.removeEventListener('click', closeSupport);
    background.style = "display:none;";

    support.style = close_support_0;
    setTimeout(function () {
      support.style = close_support_1;
    }, 800);

    open = false;
    support.addEventListener('click', openSupport);
  }
},200);
