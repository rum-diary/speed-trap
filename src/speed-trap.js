/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

(function(exports) {
  "use strict";

  var navigationTiming;
  try {
    navigationTiming = window.performance.timing;
  } catch (e) {
    navigationTiming = {};
  }

  var SpeedTrap = {
    init: function(options) {
      options = options || {};
      this.navigationTiming = options.navigationTiming || navigationTiming;

      this.timers = create(Timers);
      this.timers.init();

      this.events = create(Events);
      this.events.init();
    },

    get: function() {
      return {
        navigationTiming: this.navigationTiming,
        timers: this.timers.get(),
        events: this.events.get()
      };
    }
  };

  var Timers = {
    init: function() {
      this.completed = {};
      this.running = {};
    },

    start: function(name) {
      var start = now();
      if (this.running[name]) throw new Error(name + ' timer already started');

      this.running[name] = start;
    },

    stop: function(name) {
      var stop = now();

      if ( ! this.running[name]) throw new Error(name + ' timer not started');

      if ( ! this.completed[name]) this.completed[name] = [];
      var start = this.running[name];

      this.completed[name].push({
        start: start,
        stop: stop,
        elapsed: stop - start
      });

      this.running[name] = null;
      delete this.running[name];
    },

    get: function(name) {
      if ( ! name) return this.completed;
      return this.completed[name];
    }
  };

  var Events = {
    init: function() {
      this.events = [];
    },

    capture: function(name) {
      this.events.push({
        type: name,
        timestamp: now()
      });
    },

    get: function() {
      return this.events;
    }
  };

  function create(proto) {
    if (typeof proto === "function") return new proto();
    if (Object.create) return Object.create(proto);

    var F = function() {};
    F.prototype = proto;
    return new F();
  }

  function now() {
    return new Date().getTime();
  }

  exports.SpeedTrap = create(SpeedTrap);
  exports.SpeedTrap.init();

}(this));

