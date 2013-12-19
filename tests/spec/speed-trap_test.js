/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
(function() {
  "use strict";

  var assert = chai.assert;
  var SpeedTrap = window.SpeedTrap;

  describe('Speed Trap', function() {
    var speedTrap;

    beforeEach(function() {
      speedTrap = Object.create(SpeedTrap);
      speedTrap.init({});
      speedTrap.stored.clear();
    });

    it('exists', function() {
      assert.isObject(window.SpeedTrap);
    });

    it('all data can be retreived', function() {
      var data = speedTrap.get();
      assert.isObject(data.navigationTiming);
      assert.isObject(data.timers);
      assert.isArray(data.events);
    });

    describe('navigationTiming', function() {
      it('is captured', function() {
        assert.ok('loadEventEnd' in speedTrap.navigationTiming.get());
      });
    });

    describe('timers', function() {
      it('can be captured', function(done) {
        speedTrap.timers.start('named_timer');
        setTimeout(function() {
          speedTrap.timers.stop('named_timer');
          var timers = speedTrap.timers.get('named_timer');
          assert.isArray(timers);
          assert.ok(timers[0].elapsed >= 1);
          done();
        }, 1);
      });
    });

    describe('events', function() {
      it('can be captured', function() {
        speedTrap.events.capture('event');
        var events = speedTrap.events.get();
        assert.isArray(events);
        assert.equal(events[0].type, 'event');
        assert.ok(events[0].timestamp);
      });
    });

    describe('stored', function() {
      it('current session can be stored', function() {
        speedTrap.store();
        var sessions = speedTrap.stored.get();
        assert.isArray(sessions);

        var session = sessions[0];
        assert.ok('navigationTiming' in session);
        assert.isObject(session.timers);
        assert.isArray(session.events);

      });

      it('a session is only stored once', function() {
        speedTrap.store();
        speedTrap.store();
        var sessions = speedTrap.stored.get();
        assert.equal(sessions.length, 1);
      });
    });
  });

}());

