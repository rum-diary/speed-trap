/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
let navigationTiming = Object.create(NAVIGATION_TIMING_FIELDS);
try {
    navigationTiming = window.performance.timing;
}
catch (e) {
    // NOOP
}
const navigationStart = navigationTiming.navigationStart || Date.now();
class NavigationTiming {
    constructor(options) {
        this.navigationTiming = options.navigationTiming || navigationTiming;
        this.baseTime = navigationStart;
    }
    get() {
        return this.navigationTiming;
    }
    diff() {
        let diff = {};
        let baseTime = this.baseTime;
        for (let key in NAVIGATION_TIMING_FIELDS) {
            let timing = this.navigationTiming[key];
            if (timing >= baseTime) {
                diff[key] = timing - baseTime;
            }
            else {
                diff[key] = null;
            }
        }
        return diff;
    }
}
exports.default = NavigationTiming;
//# sourceMappingURL=navigation-timing.js.map