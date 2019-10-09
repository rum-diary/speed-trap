/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

interface STEvent {
  type: string,
  offset: number;
}

export default class Events {
  events: STEvent[];
  baseTime: number;

  constructor(options: { baseTime: number }) {
    this.events = [];
    this.baseTime = options.baseTime;
  }

  capture(name: string) {
    this.events.push({
      type: name,
      offset: Date.now() - this.baseTime
    });
  }

  get(): STEvent[] {
    return this.events;
  }

  clear() {
    this.events = [];
  }
};
