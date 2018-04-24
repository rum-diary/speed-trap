/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
  /*global describe, beforeEach, it*/
  'use strict';

  import { assert } from 'chai';
  import SpeedTrap from '../../src/speed-trap';

  describe('Speed Trap', function () {
    var speedTrap;

    beforeEach(function () {
      speedTrap = Object.create(SpeedTrap);
      speedTrap.init({});
    });

    it('exists', function () {
      assert.isObject(window.SpeedTrap);
    });

    describe('getLoad', function () {
      it('gets data available on window.onload', function () {
        var data = speedTrap.getLoad();
        assert.isObject(data.navigationTiming);
        assert.isTrue('referrer' in data);
        assert.equal(data.screen.width, window.screen.width);
        assert.equal(data.screen.height, window.screen.height);
      });
    });

    describe('getUnload', function () {
      it('gets data available after app has been running', function () {
        var data = speedTrap.getUnload();

        assert.isObject(data.timers);
        assert.isArray(data.events);
        assert.isNumber(data.duration);
      });
    });

    describe('navigationTiming', function () {
      it('is captured', function () {
        assert.ok('loadEventEnd' in speedTrap.navigationTiming.get());
      });
    });

    describe('timers', function () {
      it('can be captured', function (done) {
        speedTrap.timers.start('named_timer');
        setTimeout(function () {
          speedTrap.timers.stop('named_timer');
          var timers = speedTrap.timers.get('named_timer');
          assert.isArray(timers);
          assert.ok(timers[0].elapsed >= 1);
          done();
        }, 1);
      });

      it('can be cleared', function () {
        speedTrap.timers.start('named_timer');
        speedTrap.timers.stop('named_timer');

        speedTrap.timers.clear();

        var timers = speedTrap.timers.get('named_timer');
        assert.isUndefined(timers);
      });
    });

    describe('events', function () {
      it('can be captured without data', () => {
        speedTrap.events.capture('event');
        const events = speedTrap.events.get();
        assert.isArray(events);
        assert.lengthOf(Object.keys(events[0]), 2);
        assert.equal(events[0].type, 'event');
        assert.isNumber(events[0].offset);
      });

      it('can be captured with data', () => {
        const data = {
          key: 'value',
          offset: 'ignored',
          type: 'ignored',
        };
        speedTrap.events.capture('event', data);
        const events = speedTrap.events.get();
        assert.isArray(events);
        assert.equal(events[0].type, 'event');
        assert.isNumber(events[0].offset);
        assert.strictEqual(events[0].key, 'value');
      });

      it('can be cleared', function () {
        speedTrap.events.capture('event');

        speedTrap.events.clear();

        var events = speedTrap.events.get('event');
        assert.equal(events.length, 0);
      });
    });
  });

