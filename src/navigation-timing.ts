/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

const NAVIGATION_TIMING_FIELDS = {
  navigationStart: undefined,
  unloadEventStart: undefined,
  unloadEventEnd: undefined,
  redirectStart: undefined,
  redirectEnd: undefined,
  fetchStart: undefined,
  domainLookupStart: undefined,
  domainLookupEnd: undefined,
  connectStart: undefined,
  connectEnd: undefined,
  secureConnectionStart: undefined,
  requestStart: undefined,
  responseStart: undefined,
  responseEnd: undefined,
  domLoading: undefined,
  domInteractive: undefined,
  domContentLoadedEventStart: undefined,
  domContentLoadedEventEnd: undefined,
  domComplete: undefined,
  loadEventStart: undefined,
  loadEventEnd: undefined
};

let navigationTiming: PerformanceTiming = Object.create(NAVIGATION_TIMING_FIELDS);
try {
  navigationTiming = window.performance.timing;
} catch (e) {
  // NOOP
}

const navigationStart = navigationTiming.navigationStart || Date.now();

export default class NavigationTiming {
  navigationTiming: any; // TODO - figure out how to do this properly!
  baseTime: number;

  constructor(options: { navigationTiming?: PerformanceTiming }) {
    this.navigationTiming = options.navigationTiming || navigationTiming;
    this.baseTime = navigationStart;
  }

  get(): PerformanceTiming {
    return this.navigationTiming;
  }

  diff(): any {
    let diff: any = {};
    let baseTime = this.baseTime;
    for (let key in NAVIGATION_TIMING_FIELDS) {
      let timing = this.navigationTiming[key];
      if (timing >= baseTime) {
        diff[key] = timing - baseTime;
      } else {
        diff[key] = null;
      }
    }
    return diff;
  }
}
