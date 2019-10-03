/**
 * @Date:   2019-01-17T23:33:40+01:00
 * @Last modified time: 2019-02-20T20:44:21+01:00
 */
window.onload = function () {
  document.getElementsByTagName('iframe')[0].style.height = document.getElementsByTagName('iframe')[0].contentDocument.body.clientHeight + "px";
  // if(document.getElementById('nightTheme')) {document.getElementsByTagName('iframe')[0].contentDocument.getElementById('style').innerHTML+=" * {background:#242424;color:white !important;}";}
};


isSiteOnline("http://lectio.dk",function(found){
   if(found) {
       // site is online
       //console.log('found');
   }
   else {
     var e = document.createElement('div');
         e.id = "LectioDown";
         e.style = "width:100%;height:100%;background:#efefef;position:fixed;top:0;left:0;z-index:99;transition: opacity 1s; opacity:.9;";
         e.innerHTML = "<span style='color:#ff9c9c;width:100%;margin:auto;position:absolute;top:45%;text-align:center;font-size:14px;'><b>Uh, akavet. Det virker til Lectio er nede!</b></span>";
         var b = document.createElement('div');
             e.appendChild(b);
             b.style = "text-align:center;margin:auto;position:relative;top:60%;border-radius:150px;background:#444;width:100px;padding:5px;cursor:pointer;opacity:1;font-size:24px;";
             b.innerHTML = 'Satans <i class="far fa-sad-cry"></i>';
             b.onclick = function () {
               e.style = "display:none;";
             };
         document.body.appendChild(e);
   }
});

function isSiteOnline(url,callback) {
    // try to load favicon
    var timer = setTimeout(function(){
        // timeout after 5 seconds
        callback(false);
    },5000);

    var img = document.createElement("img");
    img.onload = function() {
        clearTimeout(timer);
        callback(true);
    };

    img.onerror = function() {
        clearTimeout(timer);
        callback(false);
    };

    img.src = url+"/favicon.ico";
}
