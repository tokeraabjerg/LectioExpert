/**
 * @Author: Toke Raabjerg <nadgryzione>
 * @Date:   24-Sep-2018
 * @Email:  tokermc@hotmail.co
 * @Project: Lectio Expert
 * @Last modified by:   nadgryzione
 * @Last modified time: 25-Sep-2018
 */
 chrome.storage.local.get(['Lectio_SnakeScore'], function (result) {
   if(result.Lectio_SnakeScore != undefined) {
     bestScore = result.Lectio_SnakeScore;
     document.getElementById('best').innerHTML = result.Lectio_SnakeScore;
   } else {
     chrome.storage.local.set({Lectio_SnakeScore:'5'});
     bestScore = 5;
 }});


window.onload=function() {
    canv=document.getElementById("gc");
    ctx=canv.getContext("2d");
    document.addEventListener("keydown",keyPush);
    start = setInterval(game,1000/12);
    xv=1;
    yv=0;
};
lastKey = "";lpy=0;lpx=0;
px=py=10;
gs=tc=20;
ax=ay=15;
xv=yv=0;
trail=[];
tail = 5;
function game() {
    px+=xv;
    py+=yv;
    if(px<0) {
        px= tc-1;
    }
    if(px>tc-1) {
        px= 0;
    }
    if(py<0) {
        py= tc-1;
    }
    if(py>tc-1) {
        py= 0;
    }
    ctx.fillStyle="gray";
    ctx.fillRect(0,0,canv.width,canv.height);

    ctx.fillStyle="lime";
    for(var i=0;i<trail.length;i++) {
        ctx.fillRect(trail[i].x*gs,trail[i].y*gs,gs-2,gs-2);
        if(trail[i].x==px && trail[i].y==py && tail > 5) {
            tail = 5;
            clearInterval(start); pause("Game over!");
        }
    }
    trail.push({x:px,y:py});
    while(trail.length>tail) {
    trail.shift();
    }

    if(ax==px && ay==py) {
        tail++;
        ax=Math.floor(Math.random()*tc);
        ay=Math.floor(Math.random()*tc);

        if (tail < (document.getElementById('best').innerHTML)) {
          document.getElementById('current').innerHTML = tail;
        } else {
          document.getElementById('current').innerHTML = tail;
          document.getElementById('best').innerHTML = tail;
          chrome.storage.local.set({Lectio_SnakeScore:tail});
        }
    }
    ctx.fillStyle="red";
    ctx.fillRect(ax*gs,ay*gs,gs-2,gs-2);
}

function keyPush(evt) {//console.log("new", evt.keyCode, "last", lastKey);
  if(lpy == py && lpx == px) {return;}
    switch(evt.keyCode) {

      case 38: //Arrow up
          if (lastKey != "down") {
            xv=0;yv=-1;
            lastKey = "up";
          }
          break;

      case 40: //Arrow down
          if (lastKey != "up") {
            xv=0;yv=1;
            lastKey = "down";
          }
          break;

      case 37: //Arrow left
          if (lastKey != "right") {
            xv=-1;yv=0;
            lastKey = "left";
          }
          break;

      case 39: //Arrow right
          if (lastKey != "left") {
            xv=1;yv=0;
            lastKey = "right";
          }
          break;

      case 87: //W Up
          if (lastKey != "down") {
            xv=0;yv=-1;
            lastKey = "up";
          }
          break;

      case 83: //S Down
          if (lastKey != "up") {
            xv=0;yv=1;
            lastKey = "down";
          }
          break;

      case 65: //A Left
          if (lastKey != "right") {
            xv=-1;yv=0;
            lastKey = "left";
          }
          break;
      case 68: //D Right
          if (lastKey != "left") {
            xv=1;yv=0;
            lastKey = "right";
          }
          break;
      case 27:
          clearInterval(start);
          pause("Pause");
          break;

        default:
            if(evt.keyCode != 39 && evt.keyCode != 40 && evt.keyCode != 37 && evt.keyCode != 38) {
              return;
            }

    }
    lpx = px;
    lpy = py;
    console.log(lastKey);
}


function pause (reason) {if(reason == "Game over!") {color = "red";} else {color = "green";}
  var overlay = document.createElement('div');
  overlay.style = "z-index: 10;position: fixed;top: 50%;left: 30%;text-align:center;width:40%;background-color:"+color+";";
  overlay.innerHTML = "<h1>"+reason+"</h1><br><p id='startAgain' style='background-color:lightgray;width:25%;padding:1px;position:inherit;left:37.5%;top:57.5%;border-radius:5px;cursor:pointer;'>Start igen!</p>";
  document.body.appendChild(overlay);
  overlay.addEventListener('click', function (result) {
    start = setInterval(game,1000/12);
    overlay.style = "display:none;";
  });
}


/*
case 38: //Arrow up
    if (xv != 0 && yv != 1) {
      xv=0;yv=-1;
      lastKey = "up";
    }
    break;

case 40: //Arrow down
    if (lastKey != "up") {
      xv=0;yv=1;
      lastKey = "down";
    }
    break;

case 37: //Arrow left
    if (lastKey != "right") {
      xv=-1;yv=0;
      lastKey = "left";
    }
    break;

case 39: //Arrow right
    if (lastKey != "left") {
      xv=1;yv=0;
      lastKey = "right";
    }
    break;

case 87: //W Up
    if (lastKey != "down") {
      xv=0;yv=-1;
      lastKey = "up";
    }
    break;

case 83: //S Down
    if (lastKey != "up") {
      xv=0;yv=1;
      lastKey = "down";
    }
    break;

case 65: //A Left
    if (lastKey != "right") {
      xv=-1;yv=0;
      lastKey = "left";
    }
    break;
case 68: //D Right
    if (lastKey != "left") {
      xv=1;yv=0;
      lastKey = "right";
    }
    break;
case 27:
    clearInterval(start);
    pause("Pause");
    break;
*/
