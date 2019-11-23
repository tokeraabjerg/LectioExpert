/**
 * @Author: Toke Raabjerg <nadgryzione>
 * @Date:   07-Oct-2018
 * @Email:  tokermc@hotmail.co
 * @Project: Lectio Expert
 * @Last modified by:
 * @Last modified time: 2019-10-29T16:48:33+01:00
 */

 /*----------------------------------------------------------------*/
 //                     Define sub strings here                    //
 /*----------------------------------------------------------------*/

 hints = [
 'Er der noget du gerne vil have lavet om på Lectio Expert? Så kan du lave pulls på GitHub <a style="text-decoration:underline!important;" href="https://github.com/tokeraabjerg/LectioExpert" target="_blank">her.</a>',
 'Du kan ændre temaet i popup-vinduet under indstillinger.',
 'Du kan slå stort set alle funktioner fra i popup-vinduet under indstillinger.',
 'Du kan vælge din egen farve til moderne tema.',
 'Du kan åbne 2 forskellige spil på Lectio ved, at enten skrive "Snake" eller "2048".',
 'Du kan gemme afleverede opgaver ved, at trykke "Skjul afleverede opgaver" inde under afleveringer.',
 'Du kan indstille zoom-niveau inde under indstillinger i popup-vinduet.',
 'Du kan vælge mørkt tema til Lectio under indstillinger i popup-vinduet.',
 'Husk du kan stort set slå alle funktioner fra! Hvis du ikke kan, så gør vi sådan at du kan!',
 'Har du fundet en fejl, eller har et spørgsmål? Tryk på spørgsmålstegnet i højre hjørne!',
 'Højre klik på en lektion på skeamet for at hurtigt interagere med lektionen.',
 'Brug piltasterne til at skifte imellem ugerne på skemaet.',
 'Skriv "gimig12-03" på karakter siden for, at ændre dine karakter. (Eks. "gimig12")',
 //Review
 'Giv os <a href="https://chrome.google.com/webstore/detail/lectio-expert/hdfpfilneelpdfahbkehkgjlbccijkkk">en anmeldelse</a> på Chrome Webstore så flere gymnasieelever kan finde Lectio Expert!',
 'Du kan skrive dine foreslag til shitty facts <a style="text-decoration:underline!important;" href="https://goo.gl/forms/yCV5EOjBohXrKslD2" target="_blank">her.</a>',
 'Er der noget du gerne vil have lavet om på Lectio Expert? Så kan du lave pulls på GitHub <a style="text-decoration:underline!important;" href="https://github.com/tokeraabjerg/LectioExpert" target="_blank">her.</a>',
 '*'//End with * to prevent it skipping the last one
 ];

 funFacts = [
 'Der findes en type frø (Hairy Frog) som bruger sine knogler som våben, ved at brække sine tæer og pierce huden for at danne kløer.',
 'Igennem dit liv producerer du nok spyt til, at fylde 2 swimmingpools.',
 'Frygten for lange ord hedder "hippopotomonstrosesquipedaliophobia".',
 'Et nys har i gennemsnittet en hastighed på 166,7 km/t',
 '"Kavanaughty" - når en mand drikker en øl og kun en øl, og er i humør til at forulempe og voldtage en pige.',
 '"Dankrupt" - at være løbet tør for marijuana.',
 'Sigmund Freud troede, at kokain kunne hjælpe med at behandle morfin misbrugere.',
 'En normal rubiks terning har 43,252,003,274,489,856,000 forskellige konfigurationer.',
 'Den idealle højde at tabe dit toastbrød fra, hvis du vil have det til at lande med leverpåsteg siden op, er 1,2 meter.',
 'Det er første gang i 11 år at et el clasico opgør mellem Real Madrid og Barcelona spilles uden Messi og Ronaldo.',
 'Lectio Expert blev startet fordi vi blev trætte af at logge ind på Lectio hver dag.',
 'Hvis man skraber ahornbladet af en canadisk dollar, lugter den af ahornsirup.',
 'Den længste bøvs nogensinde varede i et minut, 30 sekunder og 57 millisekunder.',
 'Skriv "jegorkerikkemere" på skemaet for at få dine timer aflyst. Nemt.',
 'Matematik øger stress og depression. Og er også lort.',
 'En kænguru har to peniser',
 'Regn indeholder b12 vitamin',
 'Skriv "jegorkervirkeligikkemere" på skemaet for at få dine timer fjernet. Nemt.',
 'Vi er alle sammen døende. (Thank god)',
 'Angsten for indlæring kaldes "Sophofobi"',
 'Hvorfor kan samfundsfaglige ikke differentieres? Fordi de ikke har nogen funktion',
 'Ingen ved om der nogensinde er nogen, som har brugt sin egen lort i stedet for barberskum.',
 'At spise fastfood gør dig ikke hurtig',
 'Birds arent real',
 'I 2017 var der flere folk der døde efter selfie ulykker end ved haj angreb',
 '12+1 er det samme som 11+2',
 'Der er 336 buler i en normal golfbold',
 'Nogen har opfundet alle ord',
 'Størstedelen af mennesker lever på jorden',
 'Der er flere atomer i universet end der er i vores galakse',
 '5 ud af 6 læger siger at russisk roulette er fuldstændig sikkert',
 'Der er flere hjerneceller i menneskekroppen end hjerner',
 'Alt i verden er enten en kartoffel eller ikke en kartoffel',
 'Merkur er tættere på solen end Jorden',
 'Der findes en type frø (Hairy Frog) som bruger sine knogler som våben, ved at brække sine tæer og pierce huden for at danne kløer.',
 

 //Review
 'Du kan skrive dine foreslag til shitty facts <a href="https://goo.gl/forms/yCV5EOjBohXrKslD2" style="text-decoration:underline!important;" target="_blank">her.</a>',
 'Giv os <a href="https://chrome.google.com/webstore/detail/lectio-expert/hdfpfilneelpdfahbkehkgjlbccijkkk">en anmeldelse</a> på Chrome Webstore så flere gymnasieelever kan finde Lectio Expert!',
 'Du kan skrive dine foreslag til shitty facts <a href="https://goo.gl/forms/yCV5EOjBohXrKslD2" style="text-decoration:underline!important;" target="_blank">her.</a>',
 '*'//End with * to prevent it skipping the last one
 ];

 /*----------------------------------------------------------------*/
 //                     Check if it should run                     //
 /*----------------------------------------------------------------*/
var date = Date.now();
var d = new Date();
var time = d.getHours();

chrome.storage.local.get([
 'Lectio_lastHint',
 'Lectio_hintEnabled'
], function (r) {
 if(r.Lectio_lastHint != undefined && r.Lectio_hintEnabled != false) {
   var dif = date - r.Lectio_lastHint;//console.log(r.Lectio_lastHint, ' - ', date, ' = ', dif);
   if(dif > 86400000) { // && time <= 17 //4320000 = 1/2 day //86400000 = day
     setTimeout(function(){
       hintOrfunFact();
     }, 5000);
   }
 } else {
   chrome.storage.local.set({Lectio_lastHint:date});
 }
});

/*----------------------------------------------------------------*/
//                         Hint or funfact?                       //
/*----------------------------------------------------------------*/

function hintOrfunFact () {
  var lottery = Math.round(Math.random());
  if (lottery == 0) {
    chrome.storage.local.get([
      'Lectio_hint'
    ], function (r) {//console.log(r.Lectio_hint);
      title = "Dagens hint!";
      if(r.Lectio_hint != undefined) {
        if(r.Lectio_hint < hints.length-1) {
          subStr = r.Lectio_hint;
          var nextValue = r.Lectio_hint + 1;
          chrome.storage.local.set({Lectio_hint:nextValue});
        } else {
          subStr = 0;//console.log(r.Lectio_hint);
          chrome.storage.local.set({Lectio_hint:0});
        }
      } else {
        subStr = 0;
        chrome.storage.local.set({Lectio_hint:0});
      }
      runHint();
    });
  } else {
    chrome.storage.local.get([
      'Lectio_funFact'
    ], function (r) {
      title = "Dagens shitty fact!";
        if(r.Lectio_funFact != undefined) {
          if(r.Lectio_funFact < funFacts.length-1) {
            subStr = r.Lectio_funFact;
            var nextValue = r.Lectio_funFact + 1;console.log(r.Lectio_funFact);
            chrome.storage.local.set({Lectio_funFact:nextValue});
          } else {
            subStr = 0;console.log(r.Lectio_funFact);
            chrome.storage.local.set({Lectio_funFact:0});
          }
        } else {
          subStr = 0;
          chrome.storage.local.set({Lectio_funFact:0});
        }
        runHint();
      });
  }
}

/*----------------------------------------------------------------*/
//                        Run the script                          //
/*----------------------------------------------------------------*/

function runHint () {
  /*
    #Start creating HTML nodes
  */
  setUpDOM();
  function setUpDOM () {
    var notificationModal = document.createElement('div');
      notificationModal.id = "notificationModal";
      document.body.appendChild(notificationModal);

    var mainContent = document.createElement('div');
      mainContent.id = "mainContent";
      //Style here
      notificationModal.appendChild(mainContent);

    var notificationClose = document.createElement('span');
      notificationClose.id = "notificationClose";
      notificationClose.innerHTML = "&#10005";
      mainContent.appendChild(notificationClose);
      notificationClose.addEventListener('click',hideHint);

    var notificationTitle = document.createElement('div');
      notificationTitle.id = "notificationTitle";
      notificationTitle.style = "color:white;";
      notificationTitle.innerHTML = "<img id='notificationIcon' style='position:relative;top:1.3px;' src='chrome-extension://"+chrome.runtime.id+"/icons/icon64.png' height='15' width='15'></img> "+title+"";
      mainContent.appendChild(notificationTitle);

    var notificationContent = document.createElement('div');
      notificationContent.id = "notificationContent";
      if(title == "Dagens hint!") notificationContent.innerHTML = hints[subStr]; else notificationContent.innerHTML = funFacts[subStr];
      mainContent.appendChild(notificationContent);

    var styleInnerHTML = ""+
      "#notificationModal{max-width:300px;text-align:left;position:fixed;top:30px;right:30px;z-index:10;background-color:#4f4f4f;border-radius:3px;transition:1s;overflow:hidden;opacity:0;box-shadow: 4px 4px 15px #2f2f2f90;}"+
      "#mainContent{margin:10px;}"+
      "#notificationTitle{font-size:130%;font-weight:600;margin-top:-5px;white-space:nowrap!important;text-overflow:ellipsis;}"+
      "#notificationIcon{position:relative;top:1.3px;}"+
      "#notificationClose{color:white;position:absolute;top:0px;right:5px;font-size:120%;cursor:pointer;background-color:#4f4f4f;}"+
      "#notificationContent{font-size:100%;color:white;}";//white-space:nowrap!important;text-overflow:ellipsis;

    if(!document.getElementById('LectioStyle')) {
      var style = document.createElement('style');
        style.id = "LectioStyle";
        style.innerHTML = styleInnerHTML;
        document.head.appendChild(style);
    } else {
      var DOMStyle = document.getElementById('LectioStyle');
        DOMStyle.innerHTML += styleInnerHTML;
    }
  }
  setTimeout(function(){
    // document.getElementById('notificationModal').style.maxHeight=document.getElementById('notificationModal').offsetHeight+"px";
    // document.getElementById('notificationModal').style.width = "300px";
    document.getElementById('notificationModal').style.opacity = ".9";
    chrome.storage.local.set({Lectio_lastHint:date});
  }, 3000);


  function hideHint () {
    document.getElementById('notificationModal').style.opacity = "0";
  }
}
