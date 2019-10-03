/**
 * @Author: Toke Raabjerg <TokeDK>
 * @Date:   03-Sep-2018
 * @Email:  tokermc@hotmail.co
 * @Project: Lectio Expert
 * @Last modified by:   nadgryzione
 * @Last modified time: 21-Nov-2018

 Notes:
 http://interactjs.io/ - sizeable modal.
 */
/*----------------------------------------------------------------*/
//                         Variables & call                       //
/*----------------------------------------------------------------*/

key = "";
gameAlive = false;

loadEventRemove ();
loadEventAdd ();

/*----------------------------------------------------------------*/
//                    Set up Event Listeners                      //
/*----------------------------------------------------------------*/

function loadEventRemove () {
  window.addEventListener('keyup', function (event) {
    if(event.keyCode == 27 && gameAlive == true) {
      esc();
    }
  });
}

function loadEventAdd () {
  window.addEventListener('keyup', loadGame);
}

/*----------------------------------------------------------------*/
//                    Functions for events                        //
/*----------------------------------------------------------------*/

function esc() {
    key = '';
   var element = document.getElementById('gamesModal');
   element.parentNode.removeChild(element);
   document.getElementsByTagName('html')[0].style = "margin: 0; height: 100%; overflow: inline!important";
   document.getElementsByTagName('body')[0].style = "margin: 0; height: 100%; overflow: inline!important";
   document.getElementById('masterContent').WebkitFilter = 'blur(0px)';
   document.getElementById('masterContent').style.filter = 'blur(0px)';
   background.style = "display:none;";
   gameAlive = false;
   window.removeEventListener('keyup', esc);
   loadEventRemove();
   loadEventAdd();

}


function loadGame () {

  key += event.key;

    if (key.includes('2048') && gameAlive == false) {
      chooseGame("2048", "330", "458");

    } else if (key.includes('snake') && gameAlive == false) {
      chooseGame("snake", "420", "490");
    }

  function chooseGame (gameType, width, height) {
    gameAlive = true;
    key = '';

    document.getElementsByTagName('html')[0].style = "margin: 0; height: 100%; overflow: hidden!important";
    document.getElementsByTagName('body')[0].style = "margin: 0; height: 100%; overflow: hidden!important";

    document.getElementById('masterContent').WebkitFilter = 'blur(2px)';
    document.getElementById('masterContent').style.filter = 'blur(2px)';

    background = document.createElement('div');
    background.id = "modalBackground";
    background.style = "height: 100%;width: 100%;position: fixed;top: 0px;left: 0px;z-index:100;";
    document.body.appendChild(background);
    background.addEventListener('click', function (event) {
      esc();
    });

    var popup = document.createElement('div');
    popup.class = "modal";
    popup.id = "gamesModal";
    popup.style = "z-index:9999999;position:fixed;left:50px;top:50px;margin: auto;width:"+width+"px;height:"+height+"px;border-radius:5px;user-select:none;";
    popup.innerHTML = "<p style='background-color:white;opacity:0.9;padding: 10px;' id='dragMe'>Træk mig her!</p><iframe id='reSize' style='width:"+width+"px; height:"+height+"px;opacity:0.9;' width='500' height='500' src='chrome-extension://"+chrome.runtime.id+"/html/"+gameType+".html'></iframe>";

    popup.WebkitFilter = 'blur(0px) !important';
    popup.style.filter = 'blur(0px) !important';
    document.body.appendChild(popup);

    startDrag ();
    window.removeEventListener('keyup', loadGame);
  }
}


/*----------------------------------------------------------------*/
//                    Drag the modal around                       //
/*----------------------------------------------------------------*/

function startDrag () {
  dragElement(document.getElementById("gamesModal"));
}

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id)) {
    document.getElementById(elmnt.id).onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();

    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();

    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
