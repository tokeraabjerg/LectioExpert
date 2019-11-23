/**
 * @Author: Toke Raabjerg <nadgryzione>
 * @Date:   03-Oct-2018
 * @Email:  tokermc@hotmail.co
 * @Project: Lectio Expert
 * @Last modified by:
 * @Last modified time: 2019-11-01T20:27:48+01:00
 */

document.addEventListener('DOMContentLoaded', function (event) {

  document.getElementById('Lectio_useSimpleTheme').addEventListener('click',radioButtonSimple);
  document.getElementById('Lectio_useTheme').addEventListener('click',radioButtonModern);

  function radioButtonSimple () {
    var simple = document.getElementById('Lectio_useSimpleTheme').checked;
    var modern = document.getElementById('Lectio_useTheme').checked;

    if (simple == true) {
        document.getElementById('Lectio_useTheme').checked = false;
    }
  }
  function radioButtonModern () {
    var simple = document.getElementById('Lectio_useSimpleTheme').checked;
    var modern = document.getElementById('Lectio_useTheme').checked;

    if (modern == true) {
        document.getElementById('Lectio_useSimpleTheme').checked = false;
    }
  }

  document.getElementById('darkThemeNight').addEventListener('click',radioButtonDark);
  document.getElementById('darkTheme').addEventListener('click',radioButtonNight);

  function radioButtonDark () {
    var dark = document.getElementById('darkThemeNight').checked;
    var night = document.getElementById('darkTheme').checked;

    if (dark == true) {
        document.getElementById('darkTheme').checked = false;
    }
  }
  function radioButtonNight () {
    var dark = document.getElementById('darkThemeNight').checked;
    var night = document.getElementById('darkTheme').checked;

    if (night == true) {
        document.getElementById('darkThemeNight').checked = false;
    }
  }


  //Background

  //bg standard switch
  document.querySelector("#Lectio_standardBackground").addEventListener('click', radioStandard);
  document.querySelector("#Lectio_customBackground").addEventListener('click', radioCustom);

  function radioStandard () {
    var eStandard = document.querySelector("#Lectio_standardBackground").checked;
    var eCustom = document.querySelector("#Lectio_customBackground").checked;
    if (eStandard == true) {
      document.querySelector("#Lectio_customBackground").checked = false;
    }
  }

  function radioCustom () {
    var eStandard = document.querySelector("#Lectio_standardBackground").checked;
    var eCustom = document.querySelector("#Lectio_customBackground").checked;
    if (eCustom == true) {
      document.querySelector("#Lectio_standardBackground").checked = false;
    }
  }
});
