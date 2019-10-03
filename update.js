/**
 * @Author: Toke Raabjerg <nadgryzione>
 * @Date:   04-Nov-2018
 * @Email:  tokermc@hotmail.com
 * @Project: Lectio Expert
 * @Last modified by:   nadgryzione
 * @Last modified time: 04-Nov-2018
 */
window.onload = function () {
  var e = document.getElementsByTagName('h1')[0];
  function awesomeAnimationLol () {
    if(e.innerHTML.substr(10, 3) == "...") {
      e.innerHTML = "Opdatering";
    } else if (e.innerHTML.substr(10, 3) != "..."){
      e.innerHTML += ".";
    }
  }
  inter = setInterval(awesomeAnimationLol, 500);

  document.getElementById('buttonSave').addEventListener('click', function (event) {
      var getValueB = document.getElementById('brugernavn').value;
      var getValueA = document.getElementById('adgangskode').value;
      if(getValueA == "" && getValueB == "") {return alert("Ehh, prøv at indtast noget først?");}

      var encB_one=btoa(getValueB); var encB_two=btoa(encB_one);var encB_three=btoa(encB_two);var encB_four=btoa(encB_three);var encB=btoa(encB_four);var encA_one=btoa(getValueA); var encA_two=btoa(encA_one);var encA_three=btoa(encA_two);var encA_four=btoa(encA_three);var encA=btoa(encA_four);
      chrome.storage.local.set({
        "Lectio_Brugernavn": encB,
        "Lectio_Adgangskode": encA
      });
    // clearInterval(inter);
    goodBoy();
  });
  document.getElementById('buttonSkip').addEventListener('click', hmm);
};

function goodBoy () {
  document.getElementById('mainContent').innerHTML = "Dine oplysninger er nu opdateret. Ha' en god dag! <i class='far fa-smile'></i> <br><b>Self destruct in: T-<span id='selfDestruct'>5</span></b>";

  count = 5;
  var e = document.getElementById('selfDestruct');
  function reee () {
    if (count != 0) {
    count--;
    e.innerHTML = count;
    } else if (count == 0) {
      window.close();
    }
  }
  setInterval(reee, 1000);
}

function hmm () {
  document.getElementById('mainContent').innerHTML = "Husk du altid kan udfylde login oplysningerne i popup-vindet. Ha' en god dag! <i class='far fa-smile'></i>";
}
