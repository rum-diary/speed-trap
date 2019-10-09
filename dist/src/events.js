/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class Events {
    constructor(options) {
        this.events = [];
        this.baseTime = options.baseTime;
    }
    capture(name) {
        this.events.push({
            type: name,
            offset: Date.now() - this.baseTime
        });
    }
    get() {
        return this.events;
    }
    clear() {
        this.events = [];
    }
}
exports.default = Events;
;
//# sourceMappingURL=events.js.map