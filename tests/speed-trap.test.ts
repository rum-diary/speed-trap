/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
  /*global describe, beforeEach, it*/
  'use strict';

  import { assert } from 'chai';
  import SpeedTrap from '../src/index';

  describe('Speed Trap', () => {
    let speedTrap: SpeedTrap;

    beforeEach(() => {
      speedTrap = new SpeedTrap({});
    });

    describe('getLoad', () => {
      it('gets data available on window.onload', () => {
        const data = speedTrap.getLoad();
        assert.isObject(data.navigationTiming);
        // when run in a non-browser environment, the value is ''
        assert.isTrue('referrer' in data);
        // when run in a non-browser environment, width/height are 0.
        assert.equal(data.screen.width, 0);
        assert.equal(data.screen.height, 0);
        console.log('data', data);
        assert.isString(data.uuid);
        // when run in a non-browser environment, the value is undefined.
        assert.isTrue('puuid' in data);
        assert.isBoolean(data.returning);
      });
    });

    describe('getUnload', () => {
      it('gets data available after app has been running', () => {
        const data = speedTrap.getUnload();

        assert.isObject(data.timers);
        assert.isArray(data.events);
        assert.isNumber(data.duration);
      });
    });

    describe('navigationTiming', () => {
      it('is captured', () => {
        assert.ok('loadEventEnd' in speedTrap.navigationTiming.get());
      });
    });

    describe('timers', () => {
      it('can be captured', function (done) {
        speedTrap.timers.start('named_timer');
        setTimeout(() => {
          speedTrap.timers.stop('named_timer');
          const timers = speedTrap.timers.get('named_timer');
          assert.isArray(timers);
          assert.isAtLeast(timers[0].elapsed, 1);
          done();
        }, 1);
      });

      it('can be cleared', () => {
        speedTrap.timers.start('named_timer');
        speedTrap.timers.stop('named_timer');

        speedTrap.timers.clear();

        const timers = speedTrap.timers.get('named_timer');
        assert.isUndefined(timers);
      });
    });

    describe('events', () => {
      it('can be captured', () => {
        speedTrap.events.capture('event');
        const events = speedTrap.events.get();
        assert.isArray(events);
        assert.equal(events[0].type, 'event');
        assert.isNumber(events[0].offset);
      });

      it('can be cleared', () => {
        speedTrap.events.capture('event');

        speedTrap.events.clear();

        const events = speedTrap.events.get();
        assert.equal(events.length, 0);
      });
    });
  });

