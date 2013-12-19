/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

(function (exports, undefined) {
  'use strict';

  var LOCAL_STORAGE_NAMESPACE = '__speed_trap__';

  var SpeedTrap = {
    init: function (options) {
      options = options || {};
      this.navigationTiming = create(NavigationTiming);
      this.navigationTiming.init(options);

      this.timers = create(Timers);
      this.timers.init();

      this.events = create(Events);
      this.events.init();

      this.stored = create(PersistentStorage);
      this.uuid = guid();
    },

    get: function () {
      return {
        uuid: this.uuid,
        navigationTiming: this.navigationTiming.get(),
        timers: this.timers.get(),
        events: this.events.get()
      };
    },

    store: function () {
      this.stored.store(this.get());
    }
  };

  var NAVIGATION_TIMING_FIELDS = {
    'navigationStart': undefined,
    'unloadEventStart': undefined,
    'unloadEventEnd': undefined,
    'redirectStart': undefined,
    'redirectEnd': undefined,
    'fetchStart': undefined,
    'domainLookupStart': undefined,
    'domainLookupEnd': undefined,
    'connectStart': undefined,
    'connectEnd': undefined,
    'secureConnectionStart': undefined,
    'requestStart': undefined,
    'responseStart': undefined,
    'responseEnd': undefined,
    'domLoading': undefined,
    'domInteractive': undefined,
    'domContentLoadedEventStart': undefined,
    'domContentLoadedEventEnd': undefined,
    'domComplete': undefined,
    'loadEventStart': undefined,
    'loadEventEnd': undefined
  };

  var navigationTiming;
  try {
    navigationTiming = window.performance.timing;
  } catch (e) {
    navigationTiming = create(NAVIGATION_TIMING_FIELDS);
  }

  var NavigationTiming = {
    init: function (options) {
      options = options || {};
      this.navigationTiming = options.navigationTiming || navigationTiming;
    },

    get: function() {
      return this.navigationTiming;
    }
  };

  var Timers = {
    init: function () {
      this.completed = {};
      this.running = {};
    },

    start: function (name) {
      var start = now();
      if (this.running[name]) throw new Error(name + ' timer already started');

      this.running[name] = start;
    },

    stop: function (name) {
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

    get: function (name) {
      if ( ! name) return this.completed;
      return this.completed[name];
    }
  };

  var Events = {
    init: function () {
      this.events = [];
    },

    capture: function (name) {
      this.events.push({
        type: name,
        timestamp: now()
      });
    },

    get: function () {
      return this.events;
    }
  };

  var PersistentStorage = {
    store: function (dataToStore) {
      var storedData = this.get();
      var lastItem = storedData[storedData.length - 1];

      if (lastItem && lastItem.uuid === dataToStore.uuid) {
        // this session is already stored, get rid of the old data.
        storedData.pop();
      }

      storedData.push(dataToStore);
      localStorage.setItem(LOCAL_STORAGE_NAMESPACE, JSON.stringify(storedData));
    },

    get: function () {
      var stringified = localStorage.getItem(LOCAL_STORAGE_NAMESPACE) || '[]';
      var data = JSON.parse(stringified);
      return data;
    },

    clear: function () {
      localStorage.removeItem(LOCAL_STORAGE_NAMESPACE);
    }
  };

  function create(proto) {
    if (Object.create) return Object.create(proto);

    var F = function () {};
    F.prototype = proto;
    return new F();
  }

  function now() {
    return new Date().getTime();
  }

  function guid() {
    // from http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  }

  exports.SpeedTrap = create(SpeedTrap);
  exports.SpeedTrap.init();

}(this));

