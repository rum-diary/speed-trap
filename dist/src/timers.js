/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Timers {
    constructor(options) {
        this.completed = {};
        this.running = {};
        this.baseTime = options.baseTime;
    }
    start(name) {
        const start = Date.now();
        if (this.running[name])
            throw new Error(name + " timer already started");
        this.running[name] = start;
    }
    stop(name) {
        const stop = Date.now();
        if (!this.running[name])
            throw new Error(name + " timer not started");
        if (!this.completed[name])
            this.completed[name] = [];
        const start = this.running[name];
        this.completed[name].push({
            start: start - this.baseTime,
            stop: stop - this.baseTime,
            elapsed: stop - start
        });
        this.running[name] = null;
        delete this.running[name];
    }
    get(name) {
        if (!name)
            return this.completed;
        return this.completed[name];
    }
    clear() {
        this.completed = {};
        this.running = {};
    }
}
exports.default = Timers;
//# sourceMappingURL=timers.js.map