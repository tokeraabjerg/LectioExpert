/**
 * @Author: Toke Raabjerg <TokeDK>
 * @Date:   18-Aug-2018
 * @Email:  tokermc@hotmail.co
 * @Project: Lectio Expert
 * @Last modified by:
 * @Last modified time: 2019-11-01T21:14:10+01:00
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

  function updateBg (key, value) {
    if(key == 'Lectio_standardBackground' && value == true) {
      if(document.querySelector("#nightTheme")) {
        fCustomBackground("chrome-extension://"+chrome.runtime.id+"/images/bgNight.png", true); //night
      } else {
        fCustomBackground("chrome-extension://"+chrome.runtime.id+"/images/bg.jpg", true); //day
      }
    } else {fCustomBackground("");}
    if(key == 'Lectio_customBackground' && value == true) {
      chrome.storage.local.get(['Lectio_customBackgroundURL', 'Lectio_customBackgroundOnlyDay'], function (r) {
        if(r.Lectio_customBackgroundURL != "" && r.Lectio_customBackgroundURL != undefined && r.Lectio_customBackgroundURL != "undefined") {
          if(r.Lectio_customBackgroundOnlyDay == true) {
            if(!document.querySelector("#nightTheme")) {fCustomBackground(r.Lectio_customBackgroundURL);}
          } else {
            fCustomBackground(r.Lectio_customBackgroundURL);
          }
        }
      });
    } else {fCustomBackground("");}


    function fCustomBackground (href, bypass) {
      fAddCSS("html {background-color: rgba(0, 0, 0, 0) !important; background-size:cover; background-image: url("+href+");} body, #masterContent, .ls-master-container1, .ls-master-container2, .ls-std-island-layout-ltr {background-color:transparent !important;}");
      //Warn the user if not using https
      if(!/https/.test(href) && href.length > 2 && !bypass) {
        fWarn("Vi anbefaler at du bruger HTTPS til dit baggrund URL, på den måde kan ingen opsnappe dit data. (Prøv at erstat eks. 'http://www...' med 'https://www...')", 1, 15000);
      }
    }
    function fAddCSS (str) {
      document.getElementById('LectioCSS').innerHTML += str;
    }
  }

  //listen for changes in settings and inject if the changes are the right keys
  chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (var key in changes) {
      var storageChange = changes[key];
      if(key == 'darkThemeNight' || key == 'darkTheme') {
        if(storageChange.newValue==true) {
          darkTheme(true);
          updateBg(true);
        } else {
          darkTheme(false);
          updateBg(false);
        }
      }
      if(key == 'Lectio_standardBackground') {
        if(storageChange.newValue==true) {
          updateBg(key, storageChange.newValue);
        }
      }
      if(key == 'Lectio_customBackground') {
        if(storageChange.newValue == true) {
          updateBg(key, storageChange.newValue);
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
