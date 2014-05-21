/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
(function () {
  /*global SpeedTrap, chai, describe, beforeEach, it*/
  'use strict';

  var assert = chai.assert;

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
    });

    describe('events', function () {
      it('can be captured', function () {
        speedTrap.events.capture('event');
        var events = speedTrap.events.get();
        assert.isArray(events);
        assert.equal(events[0].type, 'event');
        assert.isNumber(events[0].offset);
      });
    });
  });

}());

