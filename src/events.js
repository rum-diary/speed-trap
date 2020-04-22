/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

// Not using Object.assign because old Android
// does not support it without Webpack's polyfill
// which is too big to include.
const assign = (target, ...sources) => {
  sources.forEach(source => {
    Object.keys(source).forEach(key => {
      target[key] = source[key];
    });
  });

  return target;
};

export default {
  init: function (options) {
    this.events = [];
    this.baseTime = options.baseTime;
  },

  capture: function (name, data = {}) {
    this.events.push(assign({}, data, {
      type: name,
      offset: Date.now() - this.baseTime
    }));
  },

  get: function () {
    return this.events;
  },

  clear: function () {
    this.events = [];
  }
};
