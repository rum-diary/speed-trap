/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
(function() {
  "use strict";

  var assert = chai.assert;
  var SpeedTrap = window.SpeedTrap;

  describe('Library', function() {
    var speedTrap;

    beforeEach(function() {
      speedTrap = Object.create(SpeedTrap);
      speedTrap.init({});
    });

    it('exists', function() {
      assert.isObject(window.SpeedTrap);
    });

    it('attaches to navigation timing automatically', function() {
      assert.ok('loadEventEnd' in speedTrap.navigationTiming);
    });

    it('timers can be captured', function(done) {
      speedTrap.timers.start('named_timer');
      setTimeout(function() {
        speedTrap.timers.stop('named_timer');
        var timers = speedTrap.timers.get('named_timer');
        assert.isArray(timers);
        assert.ok(timers[0].elapsed >= 1);
        done();
      }, 1);
    });

    it('events can be captured', function() {
      speedTrap.events.capture('event');
      var events = speedTrap.events.get();
      assert.isArray(events);
      assert.equal(events[0].type, 'event');
      assert.ok(events[0].timestamp);
    });

    it('all data can be retreived', function() {
      var data = speedTrap.get();
      assert.ok('navigationTiming' in data);
      assert.isObject(data.timers);
      assert.isArray(data.events);
    });
  });

}());

