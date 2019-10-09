/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
/*global describe, beforeEach, it*/
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const index_1 = require("../src/index");
describe('Speed Trap', () => {
    let speedTrap;
    beforeEach(() => {
        speedTrap = new index_1.default({});
    });
    describe('getLoad', () => {
        it('gets data available on window.onload', () => {
            const data = speedTrap.getLoad();
            chai_1.assert.isObject(data.navigationTiming);
            // when run in a non-browser environment, the value is ''
            chai_1.assert.isTrue('referrer' in data);
            // when run in a non-browser environment, width/height are 0.
            chai_1.assert.equal(data.screen.width, 0);
            chai_1.assert.equal(data.screen.height, 0);
            console.log('data', data);
            chai_1.assert.isString(data.uuid);
            // when run in a non-browser environment, the value is undefined.
            chai_1.assert.isTrue('puuid' in data);
            chai_1.assert.isBoolean(data.returning);
        });
    });
    describe('getUnload', () => {
        it('gets data available after app has been running', () => {
            const data = speedTrap.getUnload();
            chai_1.assert.isObject(data.timers);
            chai_1.assert.isArray(data.events);
            chai_1.assert.isNumber(data.duration);
        });
    });
    describe('navigationTiming', () => {
        it('is captured', () => {
            chai_1.assert.ok('loadEventEnd' in speedTrap.navigationTiming.get());
        });
    });
    describe('timers', () => {
        it('can be captured', function (done) {
            speedTrap.timers.start('named_timer');
            setTimeout(() => {
                speedTrap.timers.stop('named_timer');
                const timers = speedTrap.timers.get('named_timer');
                chai_1.assert.isArray(timers);
                chai_1.assert.isAtLeast(timers[0].elapsed, 1);
                done();
            }, 1);
        });
        it('can be cleared', () => {
            speedTrap.timers.start('named_timer');
            speedTrap.timers.stop('named_timer');
            speedTrap.timers.clear();
            const timers = speedTrap.timers.get('named_timer');
            chai_1.assert.isUndefined(timers);
        });
    });
    describe('events', () => {
        it('can be captured', () => {
            speedTrap.events.capture('event');
            const events = speedTrap.events.get();
            chai_1.assert.isArray(events);
            chai_1.assert.equal(events[0].type, 'event');
            chai_1.assert.isNumber(events[0].offset);
        });
        it('can be cleared', () => {
            speedTrap.events.capture('event');
            speedTrap.events.clear();
            const events = speedTrap.events.get();
            chai_1.assert.equal(events.length, 0);
        });
    });
});
//# sourceMappingURL=speed-trap.test.js.map