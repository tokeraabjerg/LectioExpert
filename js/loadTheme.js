/**
 * @Author: Toke Raabjerg <TokeDK>
 * @Date:   18-Aug-2018
 * @Email:  tokermc@hotmail.co
 * @Project: Lectio Expert
 * @Last modified by:
 * @Last modified time: 2019-04-01T22:53:53+02:00
 */
 /*----------------------------------------------------------------*/
 //                          Varaibles                             //
 /*----------------------------------------------------------------*/
var storage = chrome.storage.local;
var today = (new Date()).getTime();
var d = new Date();
var url = window.location.href;
if (/www.lectio.dk/.test(url)) {url = true;}
/*----------------------------------------------------------------*/
//                          Get storage                           //
/*----------------------------------------------------------------*/

storage.get([
  'Lectio_useTheme',
  'Lectio_useThemeSkema',

  'darkThemeNight',
  'darkTheme',

  'Lectio_useSimpleTheme',
  'Lectio_devMode',

  'sunset',
  'sunrise',
], function(r) {
  sunset = new Date(r.sunset).getTime();
  sunrise = new Date(r.sunrise).getTime();
  // console.log("SUNSET   -   ",r.sunset);
  // console.log("SUNRISE   -   ",sunrise);
  // console.log(r);
  console.log(sunset-today, today);

  switch (true) {
    case r.Lectio_useSimpleTheme && url:
        addLink("main", "stylesheet-main.css");
        break;

    case r.Lectio_useTheme && url:
        addLink("old", "stylesheet-old.css");
        break;
  }
  console.log(today, "vs", sunset);
  if(r.Lectio_useThemeSkema != false && url == true) {addLink("skemaCSS", "stylesheet-skema.css");}

  //dark theme
  darkTheme(r.darkTheme,r.darkThemeNight);

  function darkTheme (darkTheme, darkThemeNight) {console.log(today<sunrise, today>sunset);
    console.log(today<sunrise);

    switch (true) {
      //regular old manual button
        case (darkTheme == true && !document.getElementById('nightTheme')):
            inject();
            break;

            //dynamic by sunset u know !! today<sunrise
            case (darkThemeNight==true && today<sunrise && sunset-today<0 && !document.getElementById('nightTheme')):
                inject();
                break;

                //if sunset is soon, set a timer for when sunrise is
                case (darkThemeNight==true && today-sunset<=1000800 && sunset-today>100):
                    setTimeout(timeout,sunset-today);
                    break;

                    //if neither matches, then just delete the shit if there is any
                    case (document.getElementById('nightTheme') != null):
                        document.getElementById('nightTheme').remove();
    }

    //inject the stuff and check whether you need stylesheet for new theme or old theme
    function inject () {addLink("nightTheme", document.getElementById('old') ? "darkTheme/stylesheet-darkTheme.css" : "darkTheme/stylesheet-darkThemeSimple.css");}
  }
  function timeout () {darkTheme(true);}
  //listen for changes in settings and inject if the changes are the right keys
  chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (var key in changes) {
      var storageChange = changes[key];
      if(key == 'darkThemeNight' || key == 'darkTheme') {
        if(storageChange.newValue==true) {
          darkTheme(true);
        } else {
          darkTheme(false);
        }
      }
    }
  });
});

/*----------------------------------------------------------------*/
//                          HTML DOM                              //
/*----------------------------------------------------------------*/

function addLink(type, stylesheet) {

    var head = document.head;
    var link = document.createElement("link");

    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = "chrome-extension://"+chrome.runtime.id+"/css/"+stylesheet+"";
    link.id = type;

    head.appendChild(link);
}
