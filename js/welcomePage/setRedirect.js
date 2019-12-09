/**
 * @Date:   2019-12-09T18:22:46+01:00
 * @Last modified time: 2019-12-09T19:03:57+01:00
 */
/*
As I was writing this I realized I already have the users school id saved in localStorage.
Meaning I can just redirect the user to the last school they logged into.
Meaning I am a retard because I wasted a couple of hours writing this totally uneccesary code.

I'm gonna leave this here for now, because I'm angry and disapointed...
*/
chrome.storage.local.get(["schools"], function(r) {
  for(var i=0;i<r.schools.length;i++) {
    appendE(r.schools[i][0], r.schools[i][1]);
  }

  function appendE (name, href) {
    var e=document.createElement("div");
        e.class="buttonHeader textLeft ";
    var ec=document.createElement("a");
        ec.innerHTML = name;
        ec.dataset.href = href;

    e.appendChild(ec);
    document.querySelector("#schools").appendChild(e);

    e.addEventListener("click", function (e) {
      chrome.storage.local.set({redirectId: e.dataset.href});
    });
  }
});



//appendE

//refresh
