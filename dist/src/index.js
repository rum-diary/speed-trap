/* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this
* file, You can obtain one at http://mozilla.org/MPL/2.0/. */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const guid_1 = require("./guid");
const navigation_timing_1 = require("./navigation-timing");
const timers_1 = require("./timers");
const events_1 = require("./events");
class SpeedTrap {
    constructor(options = {}) {
        this.navigationTiming = new navigation_timing_1.default(options);
        this.baseTime = this.navigationTiming.get().navigationStart || Date.now();
        this.timers = new timers_1.default({
            baseTime: this.baseTime
        });
        this.events = new events_1.default({
            baseTime: this.baseTime
        });
        this.uuid = guid_1.default();
        this.tags = options.tags || [];
        // store a bit with the site being tracked to avoid sending cookies to
        // rum-diary.org. This bit keeps track whether the user has visited
        // this site before. Since localStorage is scoped to a particular
        // domain, it is not shared with other sites.
        this.returning = false;
        try {
            this.returning = !!localStorage.getItem('_st');
            localStorage.setItem('_st', '1');
        }
        catch (e) {
            // if cookies are disabled, localStorage access will blow up.
        }
    }
    /**
      * Data to send on page load.
      */
    getLoad() {
        // puuid is saved for users who visit another page on the same site.
        let previousPageUUID;
        try {
            previousPageUUID = sessionStorage.getItem('_puuid');
            sessionStorage.removeItem('_puuid');
        }
        catch (e) {
            // if cookies are disabled, sessionStorage access will blow up.
        }
        let referrer = '';
        try {
            referrer = document.referrer;
        }
        catch (e) {
            // no-op, this can happen when run in a non-browser environment
        }
        let screen = {
            width: 0,
            height: 0,
        };
        try {
            screen = {
                width: window.screen.width,
                height: window.screen.height,
            };
        }
        catch (e) {
            // no-op, this can happen when run in a non-browser environment
        }
        return {
            uuid: this.uuid,
            puuid: previousPageUUID,
            navigationTiming: this.navigationTiming.diff(),
            referrer,
            tags: this.tags,
            returning: this.returning,
            screen,
        };
    }
    /**
      * Data to send on page unload
      */
    getUnload() {
        // puuid is saved for users who visit another page on the same site.
        try {
            sessionStorage.setItem('_puuid', this.uuid);
        }
        catch (e) {
            // if cookies are disabled, sessionStorage access will blow up.
        }
        return {
            uuid: this.uuid,
            duration: Date.now() - this.baseTime,
            timers: this.timers.get(),
            events: this.events.get()
        };
    }
}
exports.default = SpeedTrap;
;
//# sourceMappingURL=index.js.map