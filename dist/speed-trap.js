(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("SpeedTrap", [], factory);
	else if(typeof exports === 'object')
		exports["SpeedTrap"] = factory();
	else
		root["SpeedTrap"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__guid__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__navigation_timing__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__timers__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__events__ = __webpack_require__(8);
/* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this
* file, You can obtain one at http://mozilla.org/MPL/2.0/. */







var SpeedTrap = {
  init: function (options) {
    options = options || {};
    this.navigationTiming = Object.create(__WEBPACK_IMPORTED_MODULE_1__navigation_timing__["a" /* default */]);
    this.navigationTiming.init(options);

    this.baseTime = this.navigationTiming.get().navigationStart || Date.now();

    this.timers = Object.create(__WEBPACK_IMPORTED_MODULE_2__timers__["a" /* default */]);
    this.timers.init({
      baseTime: this.baseTime
    });

    this.events = Object.create(__WEBPACK_IMPORTED_MODULE_3__events__["a" /* default */]);
    this.events.init({
      baseTime: this.baseTime
    });

    this.uuid = Object(__WEBPACK_IMPORTED_MODULE_0__guid__["a" /* default */])();

    this.tags = options.tags || [];

    // store a bit with the site being tracked to avoid sending cookies to
    // rum-diary.org. This bit keeps track whether the user has visited
    // this site before. Since localStorage is scoped to a particular
    // domain, it is not shared with other sites.
    try {
      this.returning = !!localStorage.getItem('_st');
      localStorage.setItem('_st', '1');
    } catch(e) {
      // if cookies are disabled, localStorage access will blow up.
    }
  },

  /**
    * Data to send on page load.
    */
  getLoad: function () {
    // puuid is saved for users who visit another page on the same
    // site. The current page will be updated to set its is_exit flag
    // to false as well as update which page the user goes to next.
    var previousPageUUID;
    try {
      previousPageUUID = sessionStorage.getItem('_puuid');
      sessionStorage.removeItem('_puuid');
    } catch(e) {
      // if cookies are disabled, sessionStorage access will blow up.
    }

    return {
      uuid: this.uuid,
      puuid: previousPageUUID,
      navigationTiming: this.navigationTiming.diff(),
      referrer: document.referrer || '',
      tags: this.tags,
      returning: this.returning,
      screen: {
        width: window.screen.width,
        height: window.screen.height
      }
    };
  },

  /**
    * Data to send on page unload
    */
  getUnload: function () {
    // puuid is saved for users who visit another page on the same
    // site. The current page will be updated to set its is_exit flag
    // to false as well as update which page the user goes to next.
    try {
      sessionStorage.setItem('_puuid', this.uuid);
    } catch(e) {
      // if cookies are disabled, sessionStorage access will blow up.
    }

    return {
      uuid: this.uuid,
      duration: Date.now() - this.baseTime,
      timers: this.timers.get(),
      events: this.events.get()
    };
  }
};


/* harmony default export */ __webpack_exports__["a"] = (Object.create(SpeedTrap));


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = guid;
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */



function guid() {
  // from http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    /*jshint bitwise: false*/
    var r = Math.random() * 16|0, v = c === 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
}


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */



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
  navigationTiming = Object.create(NAVIGATION_TIMING_FIELDS);
}

var NavigationTiming = {
  init: function (options) {
    options = options || {};
    this.navigationTiming = options.navigationTiming || navigationTiming;

    // if navigationStart is not available (no browser support), use now
    // as the basetime.
    this.baseTime = this.navigationTiming.navigationStart || Date.now();
  },

  get: function () {
    return this.navigationTiming;
  },

  diff: function() {
    var diff = {};
    var baseTime = this.baseTime;
    for (var key in NAVIGATION_TIMING_FIELDS) {
      if ( ! this.navigationTiming[key])
        diff[key] = null;
      else
        diff[key] = this.navigationTiming[key] - baseTime;
    }
    return diff;
  }
};

/* harmony default export */ __webpack_exports__["a"] = (NavigationTiming);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */



/* harmony default export */ __webpack_exports__["a"] = ({
  init: function (options) {
    this.completed = {};
    this.running = {};
    this.baseTime = options.baseTime;
  },

  start: function (name) {
    var start = Date.now();
    if (this.running[name]) throw new Error(name + ' timer already started');

    this.running[name] = start;
  },

  stop: function (name) {
    var stop = Date.now();

    if (! this.running[name]) throw new Error(name + ' timer not started');

    if (! this.completed[name]) this.completed[name] = [];
    var start = this.running[name];

    this.completed[name].push({
      start: start - this.baseTime,
      stop: stop - this.baseTime,
      elapsed: stop - start
    });

    this.running[name] = null;
    delete this.running[name];
  },

  get: function (name) {
    if (! name) return this.completed;
    return this.completed[name];
  },

  clear: function () {
    this.completed = {};
    this.running = {};
  }
});



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */



/* harmony default export */ __webpack_exports__["a"] = ({
  init: function (options) {
    this.events = [];
    this.baseTime = options.baseTime;
  },

  capture: function (name) {
    this.events.push({
      type: name,
      offset: Date.now() - this.baseTime
    });
  },

  get: function () {
    return this.events;
  },

  clear: function () {
    this.events = [];
  }
});


/***/ }),
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_speed_trap__ = __webpack_require__(4);

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__src_speed_trap__["a" /* default */]);

/***/ })
/******/ ]);
});