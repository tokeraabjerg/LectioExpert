/**
 * @Author: Toke Raabjerg <nadgryzione>
 * @Date:   03-Oct-2018
 * @Email:  tokermc@hotmail.co
 * @Project: Lectio Expert
 * @Last modified by:
 * @Last modified time: 2019-02-16T02:53:09+01:00
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
});
