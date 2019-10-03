/**
* @Author: Toke Raabjerg <nadgryzione>
* @Date:   03-Oct-2018
* @Email:  tokermc@hotmail.co
* @Project: Lectio Expert
 * @Last modified by:
 * @Last modified time: 2019-03-11T16:53:48+01:00
*/

// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var _AnalyticsCode = 'UA-126931468-1';

var _gaq = _gaq || [];
_gaq.push(['_setAccount', _AnalyticsCode]);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script');
  ga.type = 'text/javascript';
  ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var h = document.getElementsByTagName('head')[0];
  var s = document.getElementsByTagName('head')[0].children[0];
  h.insertBefore(ga, s);
})();

document.addEventListener("DOMContentLoaded", function (e) {
  if(document.querySelector("headerTable")) {
    document.querySelectorAll("headerTable a").addEventListener("DOMContentLoaded", function (e) {
      _gaq.push(['_trackEvent', "popup_navigate", this.target.href]);
    });
  }
});
