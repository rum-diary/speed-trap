/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

var NAVIGATION_TIMING_FIELDS = {
  'navigationStart': undefined,
  'unloadEventStart': undefined,
  'unloadEventEnd': undefined,
  'redirectStart': undefined,
  'redirectEnd': undefined,
  'fetchStart': undefined,
  'domainLookupStart': undefined,
  'domainLookupEnd': undefined,
  'connectStart': undefined,
  'connectEnd': undefined,
  'secureConnectionStart': undefined,
  'requestStart': undefined,
  'responseStart': undefined,
  'responseEnd': undefined,
  'domLoading': undefined,
  'domInteractive': undefined,
  'domContentLoadedEventStart': undefined,
  'domContentLoadedEventEnd': undefined,
  'domComplete': undefined,
  'loadEventStart': undefined,
  'loadEventEnd': undefined
};

var navigationTiming;
try {
  navigationTiming = window.performance.timing;
} catch (e) {
  navigationTiming = Object.create(NAVIGATION_TIMING_FIELDS);
}

var NavigationTiming = {
  init: function (options) {
    options = options || {};
    this.navigationTiming = options.navigationTiming || navigationTiming;

    // if navigationStart is not available (no browser support), use now
    // as the basetime.
    this.baseTime = this.navigationTiming.navigationStart || Date.now();
  },

  get: function () {
    return this.navigationTiming;
  },

  diff: function() {
    var diff = {};
    var baseTime = this.baseTime;
    for (var key in NAVIGATION_TIMING_FIELDS) {
      if ( ! this.navigationTiming[key])
        diff[key] = null;
      else
        diff[key] = this.navigationTiming[key] - baseTime;
    }
    return diff;
  }
};

export default NavigationTiming;