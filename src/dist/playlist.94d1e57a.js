// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/core-js/modules/_global.js":[function(require,module,exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],"../node_modules/core-js/modules/_core.js":[function(require,module,exports) {
var core = module.exports = { version: '2.6.5' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],"../node_modules/core-js/modules/_is-object.js":[function(require,module,exports) {
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],"../node_modules/core-js/modules/_an-object.js":[function(require,module,exports) {
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":"../node_modules/core-js/modules/_is-object.js"}],"../node_modules/core-js/modules/_fails.js":[function(require,module,exports) {
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],"../node_modules/core-js/modules/_descriptors.js":[function(require,module,exports) {
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":"../node_modules/core-js/modules/_fails.js"}],"../node_modules/core-js/modules/_dom-create.js":[function(require,module,exports) {
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_is-object":"../node_modules/core-js/modules/_is-object.js","./_global":"../node_modules/core-js/modules/_global.js"}],"../node_modules/core-js/modules/_ie8-dom-define.js":[function(require,module,exports) {
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":"../node_modules/core-js/modules/_descriptors.js","./_fails":"../node_modules/core-js/modules/_fails.js","./_dom-create":"../node_modules/core-js/modules/_dom-create.js"}],"../node_modules/core-js/modules/_to-primitive.js":[function(require,module,exports) {
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"./_is-object":"../node_modules/core-js/modules/_is-object.js"}],"../node_modules/core-js/modules/_object-dp.js":[function(require,module,exports) {
var anObject = require('./_an-object');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var toPrimitive = require('./_to-primitive');
var dP = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"./_an-object":"../node_modules/core-js/modules/_an-object.js","./_ie8-dom-define":"../node_modules/core-js/modules/_ie8-dom-define.js","./_to-primitive":"../node_modules/core-js/modules/_to-primitive.js","./_descriptors":"../node_modules/core-js/modules/_descriptors.js"}],"../node_modules/core-js/modules/_property-desc.js":[function(require,module,exports) {
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],"../node_modules/core-js/modules/_hide.js":[function(require,module,exports) {
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_object-dp":"../node_modules/core-js/modules/_object-dp.js","./_property-desc":"../node_modules/core-js/modules/_property-desc.js","./_descriptors":"../node_modules/core-js/modules/_descriptors.js"}],"../node_modules/core-js/modules/_has.js":[function(require,module,exports) {
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],"../node_modules/core-js/modules/_uid.js":[function(require,module,exports) {
var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

},{}],"../node_modules/core-js/modules/_library.js":[function(require,module,exports) {
module.exports = false;

},{}],"../node_modules/core-js/modules/_shared.js":[function(require,module,exports) {

var core = require('./_core');
var global = require('./_global');
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: require('./_library') ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});

},{"./_core":"../node_modules/core-js/modules/_core.js","./_global":"../node_modules/core-js/modules/_global.js","./_library":"../node_modules/core-js/modules/_library.js"}],"../node_modules/core-js/modules/_function-to-string.js":[function(require,module,exports) {
module.exports = require('./_shared')('native-function-to-string', Function.toString);

},{"./_shared":"../node_modules/core-js/modules/_shared.js"}],"../node_modules/core-js/modules/_redefine.js":[function(require,module,exports) {

var global = require('./_global');
var hide = require('./_hide');
var has = require('./_has');
var SRC = require('./_uid')('src');
var $toString = require('./_function-to-string');
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

require('./_core').inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});

},{"./_global":"../node_modules/core-js/modules/_global.js","./_hide":"../node_modules/core-js/modules/_hide.js","./_has":"../node_modules/core-js/modules/_has.js","./_uid":"../node_modules/core-js/modules/_uid.js","./_function-to-string":"../node_modules/core-js/modules/_function-to-string.js","./_core":"../node_modules/core-js/modules/_core.js"}],"../node_modules/core-js/modules/_a-function.js":[function(require,module,exports) {
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],"../node_modules/core-js/modules/_ctx.js":[function(require,module,exports) {
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"./_a-function":"../node_modules/core-js/modules/_a-function.js"}],"../node_modules/core-js/modules/_export.js":[function(require,module,exports) {

var global = require('./_global');
var core = require('./_core');
var hide = require('./_hide');
var redefine = require('./_redefine');
var ctx = require('./_ctx');
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;

},{"./_global":"../node_modules/core-js/modules/_global.js","./_core":"../node_modules/core-js/modules/_core.js","./_hide":"../node_modules/core-js/modules/_hide.js","./_redefine":"../node_modules/core-js/modules/_redefine.js","./_ctx":"../node_modules/core-js/modules/_ctx.js"}],"../node_modules/core-js/modules/_defined.js":[function(require,module,exports) {
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

},{}],"../node_modules/core-js/modules/_to-object.js":[function(require,module,exports) {
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function (it) {
  return Object(defined(it));
};

},{"./_defined":"../node_modules/core-js/modules/_defined.js"}],"../node_modules/core-js/modules/_to-integer.js":[function(require,module,exports) {
// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

},{}],"../node_modules/core-js/modules/_to-absolute-index.js":[function(require,module,exports) {
var toInteger = require('./_to-integer');
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

},{"./_to-integer":"../node_modules/core-js/modules/_to-integer.js"}],"../node_modules/core-js/modules/_to-length.js":[function(require,module,exports) {
// 7.1.15 ToLength
var toInteger = require('./_to-integer');
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

},{"./_to-integer":"../node_modules/core-js/modules/_to-integer.js"}],"../node_modules/core-js/modules/_array-copy-within.js":[function(require,module,exports) {
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
'use strict';
var toObject = require('./_to-object');
var toAbsoluteIndex = require('./_to-absolute-index');
var toLength = require('./_to-length');

module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};

},{"./_to-object":"../node_modules/core-js/modules/_to-object.js","./_to-absolute-index":"../node_modules/core-js/modules/_to-absolute-index.js","./_to-length":"../node_modules/core-js/modules/_to-length.js"}],"../node_modules/core-js/modules/_wks.js":[function(require,module,exports) {
var store = require('./_shared')('wks');
var uid = require('./_uid');
var Symbol = require('./_global').Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

},{"./_shared":"../node_modules/core-js/modules/_shared.js","./_uid":"../node_modules/core-js/modules/_uid.js","./_global":"../node_modules/core-js/modules/_global.js"}],"../node_modules/core-js/modules/_add-to-unscopables.js":[function(require,module,exports) {
// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = require('./_wks')('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) require('./_hide')(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};

},{"./_wks":"../node_modules/core-js/modules/_wks.js","./_hide":"../node_modules/core-js/modules/_hide.js"}],"../node_modules/core-js/modules/es6.array.copy-within.js":[function(require,module,exports) {
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = require('./_export');

$export($export.P, 'Array', { copyWithin: require('./_array-copy-within') });

require('./_add-to-unscopables')('copyWithin');

},{"./_export":"../node_modules/core-js/modules/_export.js","./_array-copy-within":"../node_modules/core-js/modules/_array-copy-within.js","./_add-to-unscopables":"../node_modules/core-js/modules/_add-to-unscopables.js"}],"../node_modules/core-js/modules/_array-fill.js":[function(require,module,exports) {
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
'use strict';
var toObject = require('./_to-object');
var toAbsoluteIndex = require('./_to-absolute-index');
var toLength = require('./_to-length');
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};

},{"./_to-object":"../node_modules/core-js/modules/_to-object.js","./_to-absolute-index":"../node_modules/core-js/modules/_to-absolute-index.js","./_to-length":"../node_modules/core-js/modules/_to-length.js"}],"../node_modules/core-js/modules/es6.array.fill.js":[function(require,module,exports) {
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = require('./_export');

$export($export.P, 'Array', { fill: require('./_array-fill') });

require('./_add-to-unscopables')('fill');

},{"./_export":"../node_modules/core-js/modules/_export.js","./_array-fill":"../node_modules/core-js/modules/_array-fill.js","./_add-to-unscopables":"../node_modules/core-js/modules/_add-to-unscopables.js"}],"../node_modules/core-js/modules/_cof.js":[function(require,module,exports) {
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],"../node_modules/core-js/modules/_iobject.js":[function(require,module,exports) {
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

},{"./_cof":"../node_modules/core-js/modules/_cof.js"}],"../node_modules/core-js/modules/_is-array.js":[function(require,module,exports) {
// 7.2.2 IsArray(argument)
var cof = require('./_cof');
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};

},{"./_cof":"../node_modules/core-js/modules/_cof.js"}],"../node_modules/core-js/modules/_array-species-constructor.js":[function(require,module,exports) {
var isObject = require('./_is-object');
var isArray = require('./_is-array');
var SPECIES = require('./_wks')('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};

},{"./_is-object":"../node_modules/core-js/modules/_is-object.js","./_is-array":"../node_modules/core-js/modules/_is-array.js","./_wks":"../node_modules/core-js/modules/_wks.js"}],"../node_modules/core-js/modules/_array-species-create.js":[function(require,module,exports) {
// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = require('./_array-species-constructor');

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};

},{"./_array-species-constructor":"../node_modules/core-js/modules/_array-species-constructor.js"}],"../node_modules/core-js/modules/_array-methods.js":[function(require,module,exports) {
// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = require('./_ctx');
var IObject = require('./_iobject');
var toObject = require('./_to-object');
var toLength = require('./_to-length');
var asc = require('./_array-species-create');
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

},{"./_ctx":"../node_modules/core-js/modules/_ctx.js","./_iobject":"../node_modules/core-js/modules/_iobject.js","./_to-object":"../node_modules/core-js/modules/_to-object.js","./_to-length":"../node_modules/core-js/modules/_to-length.js","./_array-species-create":"../node_modules/core-js/modules/_array-species-create.js"}],"../node_modules/core-js/modules/es6.array.find.js":[function(require,module,exports) {
'use strict';
// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = require('./_export');
var $find = require('./_array-methods')(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
require('./_add-to-unscopables')(KEY);

},{"./_export":"../node_modules/core-js/modules/_export.js","./_array-methods":"../node_modules/core-js/modules/_array-methods.js","./_add-to-unscopables":"../node_modules/core-js/modules/_add-to-unscopables.js"}],"../node_modules/core-js/modules/es6.array.find-index.js":[function(require,module,exports) {
'use strict';
// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = require('./_export');
var $find = require('./_array-methods')(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
require('./_add-to-unscopables')(KEY);

},{"./_export":"../node_modules/core-js/modules/_export.js","./_array-methods":"../node_modules/core-js/modules/_array-methods.js","./_add-to-unscopables":"../node_modules/core-js/modules/_add-to-unscopables.js"}],"../node_modules/core-js/modules/_iter-call.js":[function(require,module,exports) {
// call something on iterator step with safe closing on error
var anObject = require('./_an-object');
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};

},{"./_an-object":"../node_modules/core-js/modules/_an-object.js"}],"../node_modules/core-js/modules/_iterators.js":[function(require,module,exports) {
module.exports = {};

},{}],"../node_modules/core-js/modules/_is-array-iter.js":[function(require,module,exports) {
// check on default Array iterator
var Iterators = require('./_iterators');
var ITERATOR = require('./_wks')('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

},{"./_iterators":"../node_modules/core-js/modules/_iterators.js","./_wks":"../node_modules/core-js/modules/_wks.js"}],"../node_modules/core-js/modules/_create-property.js":[function(require,module,exports) {
'use strict';
var $defineProperty = require('./_object-dp');
var createDesc = require('./_property-desc');

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

},{"./_object-dp":"../node_modules/core-js/modules/_object-dp.js","./_property-desc":"../node_modules/core-js/modules/_property-desc.js"}],"../node_modules/core-js/modules/_classof.js":[function(require,module,exports) {
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./_cof');
var TAG = require('./_wks')('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

},{"./_cof":"../node_modules/core-js/modules/_cof.js","./_wks":"../node_modules/core-js/modules/_wks.js"}],"../node_modules/core-js/modules/core.get-iterator-method.js":[function(require,module,exports) {
var classof = require('./_classof');
var ITERATOR = require('./_wks')('iterator');
var Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

},{"./_classof":"../node_modules/core-js/modules/_classof.js","./_wks":"../node_modules/core-js/modules/_wks.js","./_iterators":"../node_modules/core-js/modules/_iterators.js","./_core":"../node_modules/core-js/modules/_core.js"}],"../node_modules/core-js/modules/_iter-detect.js":[function(require,module,exports) {
var ITERATOR = require('./_wks')('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};

},{"./_wks":"../node_modules/core-js/modules/_wks.js"}],"../node_modules/core-js/modules/es6.array.from.js":[function(require,module,exports) {
'use strict';
var ctx = require('./_ctx');
var $export = require('./_export');
var toObject = require('./_to-object');
var call = require('./_iter-call');
var isArrayIter = require('./_is-array-iter');
var toLength = require('./_to-length');
var createProperty = require('./_create-property');
var getIterFn = require('./core.get-iterator-method');

$export($export.S + $export.F * !require('./_iter-detect')(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

},{"./_ctx":"../node_modules/core-js/modules/_ctx.js","./_export":"../node_modules/core-js/modules/_export.js","./_to-object":"../node_modules/core-js/modules/_to-object.js","./_iter-call":"../node_modules/core-js/modules/_iter-call.js","./_is-array-iter":"../node_modules/core-js/modules/_is-array-iter.js","./_to-length":"../node_modules/core-js/modules/_to-length.js","./_create-property":"../node_modules/core-js/modules/_create-property.js","./core.get-iterator-method":"../node_modules/core-js/modules/core.get-iterator-method.js","./_iter-detect":"../node_modules/core-js/modules/_iter-detect.js"}],"../node_modules/core-js/modules/_to-iobject.js":[function(require,module,exports) {
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject');
var defined = require('./_defined');
module.exports = function (it) {
  return IObject(defined(it));
};

},{"./_iobject":"../node_modules/core-js/modules/_iobject.js","./_defined":"../node_modules/core-js/modules/_defined.js"}],"../node_modules/core-js/modules/_array-includes.js":[function(require,module,exports) {
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject');
var toLength = require('./_to-length');
var toAbsoluteIndex = require('./_to-absolute-index');
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

},{"./_to-iobject":"../node_modules/core-js/modules/_to-iobject.js","./_to-length":"../node_modules/core-js/modules/_to-length.js","./_to-absolute-index":"../node_modules/core-js/modules/_to-absolute-index.js"}],"../node_modules/core-js/modules/es7.array.includes.js":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/Array.prototype.includes
var $export = require('./_export');
var $includes = require('./_array-includes')(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

require('./_add-to-unscopables')('includes');

},{"./_export":"../node_modules/core-js/modules/_export.js","./_array-includes":"../node_modules/core-js/modules/_array-includes.js","./_add-to-unscopables":"../node_modules/core-js/modules/_add-to-unscopables.js"}],"../node_modules/core-js/modules/_iter-step.js":[function(require,module,exports) {
module.exports = function (done, value) {
  return { value: value, done: !!done };
};

},{}],"../node_modules/core-js/modules/_shared-key.js":[function(require,module,exports) {
var shared = require('./_shared')('keys');
var uid = require('./_uid');
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

},{"./_shared":"../node_modules/core-js/modules/_shared.js","./_uid":"../node_modules/core-js/modules/_uid.js"}],"../node_modules/core-js/modules/_object-keys-internal.js":[function(require,module,exports) {
var has = require('./_has');
var toIObject = require('./_to-iobject');
var arrayIndexOf = require('./_array-includes')(false);
var IE_PROTO = require('./_shared-key')('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

},{"./_has":"../node_modules/core-js/modules/_has.js","./_to-iobject":"../node_modules/core-js/modules/_to-iobject.js","./_array-includes":"../node_modules/core-js/modules/_array-includes.js","./_shared-key":"../node_modules/core-js/modules/_shared-key.js"}],"../node_modules/core-js/modules/_enum-bug-keys.js":[function(require,module,exports) {
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

},{}],"../node_modules/core-js/modules/_object-keys.js":[function(require,module,exports) {
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = require('./_object-keys-internal');
var enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

},{"./_object-keys-internal":"../node_modules/core-js/modules/_object-keys-internal.js","./_enum-bug-keys":"../node_modules/core-js/modules/_enum-bug-keys.js"}],"../node_modules/core-js/modules/_object-dps.js":[function(require,module,exports) {
var dP = require('./_object-dp');
var anObject = require('./_an-object');
var getKeys = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

},{"./_object-dp":"../node_modules/core-js/modules/_object-dp.js","./_an-object":"../node_modules/core-js/modules/_an-object.js","./_object-keys":"../node_modules/core-js/modules/_object-keys.js","./_descriptors":"../node_modules/core-js/modules/_descriptors.js"}],"../node_modules/core-js/modules/_html.js":[function(require,module,exports) {
var document = require('./_global').document;
module.exports = document && document.documentElement;

},{"./_global":"../node_modules/core-js/modules/_global.js"}],"../node_modules/core-js/modules/_object-create.js":[function(require,module,exports) {
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = require('./_an-object');
var dPs = require('./_object-dps');
var enumBugKeys = require('./_enum-bug-keys');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

},{"./_an-object":"../node_modules/core-js/modules/_an-object.js","./_object-dps":"../node_modules/core-js/modules/_object-dps.js","./_enum-bug-keys":"../node_modules/core-js/modules/_enum-bug-keys.js","./_shared-key":"../node_modules/core-js/modules/_shared-key.js","./_dom-create":"../node_modules/core-js/modules/_dom-create.js","./_html":"../node_modules/core-js/modules/_html.js"}],"../node_modules/core-js/modules/_set-to-string-tag.js":[function(require,module,exports) {
var def = require('./_object-dp').f;
var has = require('./_has');
var TAG = require('./_wks')('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

},{"./_object-dp":"../node_modules/core-js/modules/_object-dp.js","./_has":"../node_modules/core-js/modules/_has.js","./_wks":"../node_modules/core-js/modules/_wks.js"}],"../node_modules/core-js/modules/_iter-create.js":[function(require,module,exports) {
'use strict';
var create = require('./_object-create');
var descriptor = require('./_property-desc');
var setToStringTag = require('./_set-to-string-tag');
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};

},{"./_object-create":"../node_modules/core-js/modules/_object-create.js","./_property-desc":"../node_modules/core-js/modules/_property-desc.js","./_set-to-string-tag":"../node_modules/core-js/modules/_set-to-string-tag.js","./_hide":"../node_modules/core-js/modules/_hide.js","./_wks":"../node_modules/core-js/modules/_wks.js"}],"../node_modules/core-js/modules/_object-gpo.js":[function(require,module,exports) {
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = require('./_has');
var toObject = require('./_to-object');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

},{"./_has":"../node_modules/core-js/modules/_has.js","./_to-object":"../node_modules/core-js/modules/_to-object.js","./_shared-key":"../node_modules/core-js/modules/_shared-key.js"}],"../node_modules/core-js/modules/_iter-define.js":[function(require,module,exports) {
'use strict';
var LIBRARY = require('./_library');
var $export = require('./_export');
var redefine = require('./_redefine');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var $iterCreate = require('./_iter-create');
var setToStringTag = require('./_set-to-string-tag');
var getPrototypeOf = require('./_object-gpo');
var ITERATOR = require('./_wks')('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

},{"./_library":"../node_modules/core-js/modules/_library.js","./_export":"../node_modules/core-js/modules/_export.js","./_redefine":"../node_modules/core-js/modules/_redefine.js","./_hide":"../node_modules/core-js/modules/_hide.js","./_iterators":"../node_modules/core-js/modules/_iterators.js","./_iter-create":"../node_modules/core-js/modules/_iter-create.js","./_set-to-string-tag":"../node_modules/core-js/modules/_set-to-string-tag.js","./_object-gpo":"../node_modules/core-js/modules/_object-gpo.js","./_wks":"../node_modules/core-js/modules/_wks.js"}],"../node_modules/core-js/modules/es6.array.iterator.js":[function(require,module,exports) {
'use strict';
var addToUnscopables = require('./_add-to-unscopables');
var step = require('./_iter-step');
var Iterators = require('./_iterators');
var toIObject = require('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./_iter-define')(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

},{"./_add-to-unscopables":"../node_modules/core-js/modules/_add-to-unscopables.js","./_iter-step":"../node_modules/core-js/modules/_iter-step.js","./_iterators":"../node_modules/core-js/modules/_iterators.js","./_to-iobject":"../node_modules/core-js/modules/_to-iobject.js","./_iter-define":"../node_modules/core-js/modules/_iter-define.js"}],"../node_modules/core-js/modules/es6.array.of.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var createProperty = require('./_create-property');

// WebKit Array.of isn't generic
$export($export.S + $export.F * require('./_fails')(function () {
  function F() { /* empty */ }
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */) {
    var index = 0;
    var aLen = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(aLen);
    while (aLen > index) createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_create-property":"../node_modules/core-js/modules/_create-property.js","./_fails":"../node_modules/core-js/modules/_fails.js"}],"../node_modules/core-js/modules/_strict-method.js":[function(require,module,exports) {
'use strict';
var fails = require('./_fails');

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};

},{"./_fails":"../node_modules/core-js/modules/_fails.js"}],"../node_modules/core-js/modules/es6.array.sort.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var aFunction = require('./_a-function');
var toObject = require('./_to-object');
var fails = require('./_fails');
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !require('./_strict-method')($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_a-function":"../node_modules/core-js/modules/_a-function.js","./_to-object":"../node_modules/core-js/modules/_to-object.js","./_fails":"../node_modules/core-js/modules/_fails.js","./_strict-method":"../node_modules/core-js/modules/_strict-method.js"}],"../node_modules/core-js/modules/_set-species.js":[function(require,module,exports) {

'use strict';
var global = require('./_global');
var dP = require('./_object-dp');
var DESCRIPTORS = require('./_descriptors');
var SPECIES = require('./_wks')('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};

},{"./_global":"../node_modules/core-js/modules/_global.js","./_object-dp":"../node_modules/core-js/modules/_object-dp.js","./_descriptors":"../node_modules/core-js/modules/_descriptors.js","./_wks":"../node_modules/core-js/modules/_wks.js"}],"../node_modules/core-js/modules/es6.array.species.js":[function(require,module,exports) {
require('./_set-species')('Array');

},{"./_set-species":"../node_modules/core-js/modules/_set-species.js"}],"../node_modules/core-js/modules/es6.date.to-json.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var toObject = require('./_to-object');
var toPrimitive = require('./_to-primitive');

$export($export.P + $export.F * require('./_fails')(function () {
  return new Date(NaN).toJSON() !== null
    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
}), 'Date', {
  // eslint-disable-next-line no-unused-vars
  toJSON: function toJSON(key) {
    var O = toObject(this);
    var pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_to-object":"../node_modules/core-js/modules/_to-object.js","./_to-primitive":"../node_modules/core-js/modules/_to-primitive.js","./_fails":"../node_modules/core-js/modules/_fails.js"}],"../node_modules/core-js/modules/_date-to-primitive.js":[function(require,module,exports) {
'use strict';
var anObject = require('./_an-object');
var toPrimitive = require('./_to-primitive');
var NUMBER = 'number';

module.exports = function (hint) {
  if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};

},{"./_an-object":"../node_modules/core-js/modules/_an-object.js","./_to-primitive":"../node_modules/core-js/modules/_to-primitive.js"}],"../node_modules/core-js/modules/es6.date.to-primitive.js":[function(require,module,exports) {
var TO_PRIMITIVE = require('./_wks')('toPrimitive');
var proto = Date.prototype;

if (!(TO_PRIMITIVE in proto)) require('./_hide')(proto, TO_PRIMITIVE, require('./_date-to-primitive'));

},{"./_wks":"../node_modules/core-js/modules/_wks.js","./_hide":"../node_modules/core-js/modules/_hide.js","./_date-to-primitive":"../node_modules/core-js/modules/_date-to-primitive.js"}],"../node_modules/core-js/modules/es6.function.has-instance.js":[function(require,module,exports) {
'use strict';
var isObject = require('./_is-object');
var getPrototypeOf = require('./_object-gpo');
var HAS_INSTANCE = require('./_wks')('hasInstance');
var FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if (!(HAS_INSTANCE in FunctionProto)) require('./_object-dp').f(FunctionProto, HAS_INSTANCE, { value: function (O) {
  if (typeof this != 'function' || !isObject(O)) return false;
  if (!isObject(this.prototype)) return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while (O = getPrototypeOf(O)) if (this.prototype === O) return true;
  return false;
} });

},{"./_is-object":"../node_modules/core-js/modules/_is-object.js","./_object-gpo":"../node_modules/core-js/modules/_object-gpo.js","./_wks":"../node_modules/core-js/modules/_wks.js","./_object-dp":"../node_modules/core-js/modules/_object-dp.js"}],"../node_modules/core-js/modules/es6.function.name.js":[function(require,module,exports) {
var dP = require('./_object-dp').f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || require('./_descriptors') && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});

},{"./_object-dp":"../node_modules/core-js/modules/_object-dp.js","./_descriptors":"../node_modules/core-js/modules/_descriptors.js"}],"../node_modules/core-js/modules/_redefine-all.js":[function(require,module,exports) {
var redefine = require('./_redefine');
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};

},{"./_redefine":"../node_modules/core-js/modules/_redefine.js"}],"../node_modules/core-js/modules/_an-instance.js":[function(require,module,exports) {
module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

},{}],"../node_modules/core-js/modules/_for-of.js":[function(require,module,exports) {
var ctx = require('./_ctx');
var call = require('./_iter-call');
var isArrayIter = require('./_is-array-iter');
var anObject = require('./_an-object');
var toLength = require('./_to-length');
var getIterFn = require('./core.get-iterator-method');
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;

},{"./_ctx":"../node_modules/core-js/modules/_ctx.js","./_iter-call":"../node_modules/core-js/modules/_iter-call.js","./_is-array-iter":"../node_modules/core-js/modules/_is-array-iter.js","./_an-object":"../node_modules/core-js/modules/_an-object.js","./_to-length":"../node_modules/core-js/modules/_to-length.js","./core.get-iterator-method":"../node_modules/core-js/modules/core.get-iterator-method.js"}],"../node_modules/core-js/modules/_meta.js":[function(require,module,exports) {
var META = require('./_uid')('meta');
var isObject = require('./_is-object');
var has = require('./_has');
var setDesc = require('./_object-dp').f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !require('./_fails')(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};

},{"./_uid":"../node_modules/core-js/modules/_uid.js","./_is-object":"../node_modules/core-js/modules/_is-object.js","./_has":"../node_modules/core-js/modules/_has.js","./_object-dp":"../node_modules/core-js/modules/_object-dp.js","./_fails":"../node_modules/core-js/modules/_fails.js"}],"../node_modules/core-js/modules/_validate-collection.js":[function(require,module,exports) {
var isObject = require('./_is-object');
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};

},{"./_is-object":"../node_modules/core-js/modules/_is-object.js"}],"../node_modules/core-js/modules/_collection-strong.js":[function(require,module,exports) {
'use strict';
var dP = require('./_object-dp').f;
var create = require('./_object-create');
var redefineAll = require('./_redefine-all');
var ctx = require('./_ctx');
var anInstance = require('./_an-instance');
var forOf = require('./_for-of');
var $iterDefine = require('./_iter-define');
var step = require('./_iter-step');
var setSpecies = require('./_set-species');
var DESCRIPTORS = require('./_descriptors');
var fastKey = require('./_meta').fastKey;
var validate = require('./_validate-collection');
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};

},{"./_object-dp":"../node_modules/core-js/modules/_object-dp.js","./_object-create":"../node_modules/core-js/modules/_object-create.js","./_redefine-all":"../node_modules/core-js/modules/_redefine-all.js","./_ctx":"../node_modules/core-js/modules/_ctx.js","./_an-instance":"../node_modules/core-js/modules/_an-instance.js","./_for-of":"../node_modules/core-js/modules/_for-of.js","./_iter-define":"../node_modules/core-js/modules/_iter-define.js","./_iter-step":"../node_modules/core-js/modules/_iter-step.js","./_set-species":"../node_modules/core-js/modules/_set-species.js","./_descriptors":"../node_modules/core-js/modules/_descriptors.js","./_meta":"../node_modules/core-js/modules/_meta.js","./_validate-collection":"../node_modules/core-js/modules/_validate-collection.js"}],"../node_modules/core-js/modules/_object-pie.js":[function(require,module,exports) {
exports.f = {}.propertyIsEnumerable;

},{}],"../node_modules/core-js/modules/_object-gopd.js":[function(require,module,exports) {
var pIE = require('./_object-pie');
var createDesc = require('./_property-desc');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var has = require('./_has');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = require('./_descriptors') ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};

},{"./_object-pie":"../node_modules/core-js/modules/_object-pie.js","./_property-desc":"../node_modules/core-js/modules/_property-desc.js","./_to-iobject":"../node_modules/core-js/modules/_to-iobject.js","./_to-primitive":"../node_modules/core-js/modules/_to-primitive.js","./_has":"../node_modules/core-js/modules/_has.js","./_ie8-dom-define":"../node_modules/core-js/modules/_ie8-dom-define.js","./_descriptors":"../node_modules/core-js/modules/_descriptors.js"}],"../node_modules/core-js/modules/_set-proto.js":[function(require,module,exports) {
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = require('./_is-object');
var anObject = require('./_an-object');
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = require('./_ctx')(Function.call, require('./_object-gopd').f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

},{"./_is-object":"../node_modules/core-js/modules/_is-object.js","./_an-object":"../node_modules/core-js/modules/_an-object.js","./_ctx":"../node_modules/core-js/modules/_ctx.js","./_object-gopd":"../node_modules/core-js/modules/_object-gopd.js"}],"../node_modules/core-js/modules/_inherit-if-required.js":[function(require,module,exports) {
var isObject = require('./_is-object');
var setPrototypeOf = require('./_set-proto').set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};

},{"./_is-object":"../node_modules/core-js/modules/_is-object.js","./_set-proto":"../node_modules/core-js/modules/_set-proto.js"}],"../node_modules/core-js/modules/_collection.js":[function(require,module,exports) {

'use strict';
var global = require('./_global');
var $export = require('./_export');
var redefine = require('./_redefine');
var redefineAll = require('./_redefine-all');
var meta = require('./_meta');
var forOf = require('./_for-of');
var anInstance = require('./_an-instance');
var isObject = require('./_is-object');
var fails = require('./_fails');
var $iterDetect = require('./_iter-detect');
var setToStringTag = require('./_set-to-string-tag');
var inheritIfRequired = require('./_inherit-if-required');

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};

},{"./_global":"../node_modules/core-js/modules/_global.js","./_export":"../node_modules/core-js/modules/_export.js","./_redefine":"../node_modules/core-js/modules/_redefine.js","./_redefine-all":"../node_modules/core-js/modules/_redefine-all.js","./_meta":"../node_modules/core-js/modules/_meta.js","./_for-of":"../node_modules/core-js/modules/_for-of.js","./_an-instance":"../node_modules/core-js/modules/_an-instance.js","./_is-object":"../node_modules/core-js/modules/_is-object.js","./_fails":"../node_modules/core-js/modules/_fails.js","./_iter-detect":"../node_modules/core-js/modules/_iter-detect.js","./_set-to-string-tag":"../node_modules/core-js/modules/_set-to-string-tag.js","./_inherit-if-required":"../node_modules/core-js/modules/_inherit-if-required.js"}],"../node_modules/core-js/modules/es6.map.js":[function(require,module,exports) {
'use strict';
var strong = require('./_collection-strong');
var validate = require('./_validate-collection');
var MAP = 'Map';

// 23.1 Map Objects
module.exports = require('./_collection')(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);

},{"./_collection-strong":"../node_modules/core-js/modules/_collection-strong.js","./_validate-collection":"../node_modules/core-js/modules/_validate-collection.js","./_collection":"../node_modules/core-js/modules/_collection.js"}],"../node_modules/core-js/modules/_math-log1p.js":[function(require,module,exports) {
// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};

},{}],"../node_modules/core-js/modules/es6.math.acosh.js":[function(require,module,exports) {
// 20.2.2.3 Math.acosh(x)
var $export = require('./_export');
var log1p = require('./_math-log1p');
var sqrt = Math.sqrt;
var $acosh = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_math-log1p":"../node_modules/core-js/modules/_math-log1p.js"}],"../node_modules/core-js/modules/es6.math.asinh.js":[function(require,module,exports) {
// 20.2.2.5 Math.asinh(x)
var $export = require('./_export');
var $asinh = Math.asinh;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });

},{"./_export":"../node_modules/core-js/modules/_export.js"}],"../node_modules/core-js/modules/es6.math.atanh.js":[function(require,module,exports) {
// 20.2.2.7 Math.atanh(x)
var $export = require('./_export');
var $atanh = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js"}],"../node_modules/core-js/modules/_math-sign.js":[function(require,module,exports) {
// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};

},{}],"../node_modules/core-js/modules/es6.math.cbrt.js":[function(require,module,exports) {
// 20.2.2.9 Math.cbrt(x)
var $export = require('./_export');
var sign = require('./_math-sign');

$export($export.S, 'Math', {
  cbrt: function cbrt(x) {
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_math-sign":"../node_modules/core-js/modules/_math-sign.js"}],"../node_modules/core-js/modules/es6.math.clz32.js":[function(require,module,exports) {
// 20.2.2.11 Math.clz32(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js"}],"../node_modules/core-js/modules/es6.math.cosh.js":[function(require,module,exports) {
// 20.2.2.12 Math.cosh(x)
var $export = require('./_export');
var exp = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x) {
    return (exp(x = +x) + exp(-x)) / 2;
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js"}],"../node_modules/core-js/modules/_math-expm1.js":[function(require,module,exports) {
// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;

},{}],"../node_modules/core-js/modules/es6.math.expm1.js":[function(require,module,exports) {
// 20.2.2.14 Math.expm1(x)
var $export = require('./_export');
var $expm1 = require('./_math-expm1');

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });

},{"./_export":"../node_modules/core-js/modules/_export.js","./_math-expm1":"../node_modules/core-js/modules/_math-expm1.js"}],"../node_modules/core-js/modules/_math-fround.js":[function(require,module,exports) {
// 20.2.2.16 Math.fround(x)
var sign = require('./_math-sign');
var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function (n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

module.exports = Math.fround || function fround(x) {
  var $abs = Math.abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};

},{"./_math-sign":"../node_modules/core-js/modules/_math-sign.js"}],"../node_modules/core-js/modules/es6.math.fround.js":[function(require,module,exports) {
// 20.2.2.16 Math.fround(x)
var $export = require('./_export');

$export($export.S, 'Math', { fround: require('./_math-fround') });

},{"./_export":"../node_modules/core-js/modules/_export.js","./_math-fround":"../node_modules/core-js/modules/_math-fround.js"}],"../node_modules/core-js/modules/es6.math.hypot.js":[function(require,module,exports) {
// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = require('./_export');
var abs = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js"}],"../node_modules/core-js/modules/es6.math.imul.js":[function(require,module,exports) {
// 20.2.2.18 Math.imul(x, y)
var $export = require('./_export');
var $imul = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * require('./_fails')(function () {
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y) {
    var UINT16 = 0xffff;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_fails":"../node_modules/core-js/modules/_fails.js"}],"../node_modules/core-js/modules/es6.math.log1p.js":[function(require,module,exports) {
// 20.2.2.20 Math.log1p(x)
var $export = require('./_export');

$export($export.S, 'Math', { log1p: require('./_math-log1p') });

},{"./_export":"../node_modules/core-js/modules/_export.js","./_math-log1p":"../node_modules/core-js/modules/_math-log1p.js"}],"../node_modules/core-js/modules/es6.math.log10.js":[function(require,module,exports) {
// 20.2.2.21 Math.log10(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  log10: function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js"}],"../node_modules/core-js/modules/es6.math.log2.js":[function(require,module,exports) {
// 20.2.2.22 Math.log2(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js"}],"../node_modules/core-js/modules/es6.math.sign.js":[function(require,module,exports) {
// 20.2.2.28 Math.sign(x)
var $export = require('./_export');

$export($export.S, 'Math', { sign: require('./_math-sign') });

},{"./_export":"../node_modules/core-js/modules/_export.js","./_math-sign":"../node_modules/core-js/modules/_math-sign.js"}],"../node_modules/core-js/modules/es6.math.sinh.js":[function(require,module,exports) {
// 20.2.2.30 Math.sinh(x)
var $export = require('./_export');
var expm1 = require('./_math-expm1');
var exp = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * require('./_fails')(function () {
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x) {
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_math-expm1":"../node_modules/core-js/modules/_math-expm1.js","./_fails":"../node_modules/core-js/modules/_fails.js"}],"../node_modules/core-js/modules/es6.math.tanh.js":[function(require,module,exports) {
// 20.2.2.33 Math.tanh(x)
var $export = require('./_export');
var expm1 = require('./_math-expm1');
var exp = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_math-expm1":"../node_modules/core-js/modules/_math-expm1.js"}],"../node_modules/core-js/modules/es6.math.trunc.js":[function(require,module,exports) {
// 20.2.2.34 Math.trunc(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  trunc: function trunc(it) {
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js"}],"../node_modules/core-js/modules/_object-gopn.js":[function(require,module,exports) {
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = require('./_object-keys-internal');
var hiddenKeys = require('./_enum-bug-keys').concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};

},{"./_object-keys-internal":"../node_modules/core-js/modules/_object-keys-internal.js","./_enum-bug-keys":"../node_modules/core-js/modules/_enum-bug-keys.js"}],"../node_modules/core-js/modules/_string-ws.js":[function(require,module,exports) {
module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

},{}],"../node_modules/core-js/modules/_string-trim.js":[function(require,module,exports) {
var $export = require('./_export');
var defined = require('./_defined');
var fails = require('./_fails');
var spaces = require('./_string-ws');
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;

},{"./_export":"../node_modules/core-js/modules/_export.js","./_defined":"../node_modules/core-js/modules/_defined.js","./_fails":"../node_modules/core-js/modules/_fails.js","./_string-ws":"../node_modules/core-js/modules/_string-ws.js"}],"../node_modules/core-js/modules/es6.number.constructor.js":[function(require,module,exports) {

'use strict';
var global = require('./_global');
var has = require('./_has');
var cof = require('./_cof');
var inheritIfRequired = require('./_inherit-if-required');
var toPrimitive = require('./_to-primitive');
var fails = require('./_fails');
var gOPN = require('./_object-gopn').f;
var gOPD = require('./_object-gopd').f;
var dP = require('./_object-dp').f;
var $trim = require('./_string-trim').trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(require('./_object-create')(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = require('./_descriptors') ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  require('./_redefine')(global, NUMBER, $Number);
}

},{"./_global":"../node_modules/core-js/modules/_global.js","./_has":"../node_modules/core-js/modules/_has.js","./_cof":"../node_modules/core-js/modules/_cof.js","./_inherit-if-required":"../node_modules/core-js/modules/_inherit-if-required.js","./_to-primitive":"../node_modules/core-js/modules/_to-primitive.js","./_fails":"../node_modules/core-js/modules/_fails.js","./_object-gopn":"../node_modules/core-js/modules/_object-gopn.js","./_object-gopd":"../node_modules/core-js/modules/_object-gopd.js","./_object-dp":"../node_modules/core-js/modules/_object-dp.js","./_string-trim":"../node_modules/core-js/modules/_string-trim.js","./_object-create":"../node_modules/core-js/modules/_object-create.js","./_descriptors":"../node_modules/core-js/modules/_descriptors.js","./_redefine":"../node_modules/core-js/modules/_redefine.js"}],"../node_modules/core-js/modules/es6.number.epsilon.js":[function(require,module,exports) {
// 20.1.2.1 Number.EPSILON
var $export = require('./_export');

$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });

},{"./_export":"../node_modules/core-js/modules/_export.js"}],"../node_modules/core-js/modules/es6.number.is-finite.js":[function(require,module,exports) {
// 20.1.2.2 Number.isFinite(number)
var $export = require('./_export');
var _isFinite = require('./_global').isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_global":"../node_modules/core-js/modules/_global.js"}],"../node_modules/core-js/modules/_is-integer.js":[function(require,module,exports) {
// 20.1.2.3 Number.isInteger(number)
var isObject = require('./_is-object');
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};

},{"./_is-object":"../node_modules/core-js/modules/_is-object.js"}],"../node_modules/core-js/modules/es6.number.is-integer.js":[function(require,module,exports) {
// 20.1.2.3 Number.isInteger(number)
var $export = require('./_export');

$export($export.S, 'Number', { isInteger: require('./_is-integer') });

},{"./_export":"../node_modules/core-js/modules/_export.js","./_is-integer":"../node_modules/core-js/modules/_is-integer.js"}],"../node_modules/core-js/modules/es6.number.is-nan.js":[function(require,module,exports) {
// 20.1.2.4 Number.isNaN(number)
var $export = require('./_export');

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js"}],"../node_modules/core-js/modules/es6.number.is-safe-integer.js":[function(require,module,exports) {
// 20.1.2.5 Number.isSafeInteger(number)
var $export = require('./_export');
var isInteger = require('./_is-integer');
var abs = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_is-integer":"../node_modules/core-js/modules/_is-integer.js"}],"../node_modules/core-js/modules/es6.number.max-safe-integer.js":[function(require,module,exports) {
// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = require('./_export');

$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });

},{"./_export":"../node_modules/core-js/modules/_export.js"}],"../node_modules/core-js/modules/es6.number.min-safe-integer.js":[function(require,module,exports) {
// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = require('./_export');

$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });

},{"./_export":"../node_modules/core-js/modules/_export.js"}],"../node_modules/core-js/modules/_parse-float.js":[function(require,module,exports) {
var $parseFloat = require('./_global').parseFloat;
var $trim = require('./_string-trim').trim;

module.exports = 1 / $parseFloat(require('./_string-ws') + '-0') !== -Infinity ? function parseFloat(str) {
  var string = $trim(String(str), 3);
  var result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;

},{"./_global":"../node_modules/core-js/modules/_global.js","./_string-trim":"../node_modules/core-js/modules/_string-trim.js","./_string-ws":"../node_modules/core-js/modules/_string-ws.js"}],"../node_modules/core-js/modules/es6.number.parse-float.js":[function(require,module,exports) {
var $export = require('./_export');
var $parseFloat = require('./_parse-float');
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });

},{"./_export":"../node_modules/core-js/modules/_export.js","./_parse-float":"../node_modules/core-js/modules/_parse-float.js"}],"../node_modules/core-js/modules/_parse-int.js":[function(require,module,exports) {
var $parseInt = require('./_global').parseInt;
var $trim = require('./_string-trim').trim;
var ws = require('./_string-ws');
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;

},{"./_global":"../node_modules/core-js/modules/_global.js","./_string-trim":"../node_modules/core-js/modules/_string-trim.js","./_string-ws":"../node_modules/core-js/modules/_string-ws.js"}],"../node_modules/core-js/modules/es6.number.parse-int.js":[function(require,module,exports) {
var $export = require('./_export');
var $parseInt = require('./_parse-int');
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });

},{"./_export":"../node_modules/core-js/modules/_export.js","./_parse-int":"../node_modules/core-js/modules/_parse-int.js"}],"../node_modules/core-js/modules/_object-gops.js":[function(require,module,exports) {
exports.f = Object.getOwnPropertySymbols;

},{}],"../node_modules/core-js/modules/_object-assign.js":[function(require,module,exports) {
'use strict';
// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
var toObject = require('./_to-object');
var IObject = require('./_iobject');
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || require('./_fails')(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;

},{"./_object-keys":"../node_modules/core-js/modules/_object-keys.js","./_object-gops":"../node_modules/core-js/modules/_object-gops.js","./_object-pie":"../node_modules/core-js/modules/_object-pie.js","./_to-object":"../node_modules/core-js/modules/_to-object.js","./_iobject":"../node_modules/core-js/modules/_iobject.js","./_fails":"../node_modules/core-js/modules/_fails.js"}],"../node_modules/core-js/modules/es6.object.assign.js":[function(require,module,exports) {
// 19.1.3.1 Object.assign(target, source)
var $export = require('./_export');

$export($export.S + $export.F, 'Object', { assign: require('./_object-assign') });

},{"./_export":"../node_modules/core-js/modules/_export.js","./_object-assign":"../node_modules/core-js/modules/_object-assign.js"}],"../node_modules/core-js/modules/_object-forced-pam.js":[function(require,module,exports) {
'use strict';
// Forced replacement prototype accessors methods
module.exports = require('./_library') || !require('./_fails')(function () {
  var K = Math.random();
  // In FF throws only define methods
  // eslint-disable-next-line no-undef, no-useless-call
  __defineSetter__.call(null, K, function () { /* empty */ });
  delete require('./_global')[K];
});

},{"./_library":"../node_modules/core-js/modules/_library.js","./_fails":"../node_modules/core-js/modules/_fails.js","./_global":"../node_modules/core-js/modules/_global.js"}],"../node_modules/core-js/modules/es7.object.define-getter.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var toObject = require('./_to-object');
var aFunction = require('./_a-function');
var $defineProperty = require('./_object-dp');

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter) {
    $defineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_to-object":"../node_modules/core-js/modules/_to-object.js","./_a-function":"../node_modules/core-js/modules/_a-function.js","./_object-dp":"../node_modules/core-js/modules/_object-dp.js","./_descriptors":"../node_modules/core-js/modules/_descriptors.js","./_object-forced-pam":"../node_modules/core-js/modules/_object-forced-pam.js"}],"../node_modules/core-js/modules/es7.object.define-setter.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var toObject = require('./_to-object');
var aFunction = require('./_a-function');
var $defineProperty = require('./_object-dp');

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter) {
    $defineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_to-object":"../node_modules/core-js/modules/_to-object.js","./_a-function":"../node_modules/core-js/modules/_a-function.js","./_object-dp":"../node_modules/core-js/modules/_object-dp.js","./_descriptors":"../node_modules/core-js/modules/_descriptors.js","./_object-forced-pam":"../node_modules/core-js/modules/_object-forced-pam.js"}],"../node_modules/core-js/modules/_object-to-array.js":[function(require,module,exports) {
var getKeys = require('./_object-keys');
var toIObject = require('./_to-iobject');
var isEnum = require('./_object-pie').f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};

},{"./_object-keys":"../node_modules/core-js/modules/_object-keys.js","./_to-iobject":"../node_modules/core-js/modules/_to-iobject.js","./_object-pie":"../node_modules/core-js/modules/_object-pie.js"}],"../node_modules/core-js/modules/es7.object.entries.js":[function(require,module,exports) {
// https://github.com/tc39/proposal-object-values-entries
var $export = require('./_export');
var $entries = require('./_object-to-array')(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_object-to-array":"../node_modules/core-js/modules/_object-to-array.js"}],"../node_modules/core-js/modules/_object-sap.js":[function(require,module,exports) {
// most Object methods by ES6 should accept primitives
var $export = require('./_export');
var core = require('./_core');
var fails = require('./_fails');
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};

},{"./_export":"../node_modules/core-js/modules/_export.js","./_core":"../node_modules/core-js/modules/_core.js","./_fails":"../node_modules/core-js/modules/_fails.js"}],"../node_modules/core-js/modules/es6.object.freeze.js":[function(require,module,exports) {
// 19.1.2.5 Object.freeze(O)
var isObject = require('./_is-object');
var meta = require('./_meta').onFreeze;

require('./_object-sap')('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});

},{"./_is-object":"../node_modules/core-js/modules/_is-object.js","./_meta":"../node_modules/core-js/modules/_meta.js","./_object-sap":"../node_modules/core-js/modules/_object-sap.js"}],"../node_modules/core-js/modules/es6.object.get-own-property-descriptor.js":[function(require,module,exports) {
// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = require('./_to-iobject');
var $getOwnPropertyDescriptor = require('./_object-gopd').f;

require('./_object-sap')('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});

},{"./_to-iobject":"../node_modules/core-js/modules/_to-iobject.js","./_object-gopd":"../node_modules/core-js/modules/_object-gopd.js","./_object-sap":"../node_modules/core-js/modules/_object-sap.js"}],"../node_modules/core-js/modules/_own-keys.js":[function(require,module,exports) {
// all object keys, includes non-enumerable and symbols
var gOPN = require('./_object-gopn');
var gOPS = require('./_object-gops');
var anObject = require('./_an-object');
var Reflect = require('./_global').Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};

},{"./_object-gopn":"../node_modules/core-js/modules/_object-gopn.js","./_object-gops":"../node_modules/core-js/modules/_object-gops.js","./_an-object":"../node_modules/core-js/modules/_an-object.js","./_global":"../node_modules/core-js/modules/_global.js"}],"../node_modules/core-js/modules/es7.object.get-own-property-descriptors.js":[function(require,module,exports) {
// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = require('./_export');
var ownKeys = require('./_own-keys');
var toIObject = require('./_to-iobject');
var gOPD = require('./_object-gopd');
var createProperty = require('./_create-property');

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_own-keys":"../node_modules/core-js/modules/_own-keys.js","./_to-iobject":"../node_modules/core-js/modules/_to-iobject.js","./_object-gopd":"../node_modules/core-js/modules/_object-gopd.js","./_create-property":"../node_modules/core-js/modules/_create-property.js"}],"../node_modules/core-js/modules/_object-gopn-ext.js":[function(require,module,exports) {
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = require('./_to-iobject');
var gOPN = require('./_object-gopn').f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};

},{"./_to-iobject":"../node_modules/core-js/modules/_to-iobject.js","./_object-gopn":"../node_modules/core-js/modules/_object-gopn.js"}],"../node_modules/core-js/modules/es6.object.get-own-property-names.js":[function(require,module,exports) {
// 19.1.2.7 Object.getOwnPropertyNames(O)
require('./_object-sap')('getOwnPropertyNames', function () {
  return require('./_object-gopn-ext').f;
});

},{"./_object-sap":"../node_modules/core-js/modules/_object-sap.js","./_object-gopn-ext":"../node_modules/core-js/modules/_object-gopn-ext.js"}],"../node_modules/core-js/modules/es6.object.get-prototype-of.js":[function(require,module,exports) {
// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = require('./_to-object');
var $getPrototypeOf = require('./_object-gpo');

require('./_object-sap')('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});

},{"./_to-object":"../node_modules/core-js/modules/_to-object.js","./_object-gpo":"../node_modules/core-js/modules/_object-gpo.js","./_object-sap":"../node_modules/core-js/modules/_object-sap.js"}],"../node_modules/core-js/modules/es7.object.lookup-getter.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var toObject = require('./_to-object');
var toPrimitive = require('./_to-primitive');
var getPrototypeOf = require('./_object-gpo');
var getOwnPropertyDescriptor = require('./_object-gopd').f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __lookupGetter__: function __lookupGetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.get;
    } while (O = getPrototypeOf(O));
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_to-object":"../node_modules/core-js/modules/_to-object.js","./_to-primitive":"../node_modules/core-js/modules/_to-primitive.js","./_object-gpo":"../node_modules/core-js/modules/_object-gpo.js","./_object-gopd":"../node_modules/core-js/modules/_object-gopd.js","./_descriptors":"../node_modules/core-js/modules/_descriptors.js","./_object-forced-pam":"../node_modules/core-js/modules/_object-forced-pam.js"}],"../node_modules/core-js/modules/es7.object.lookup-setter.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var toObject = require('./_to-object');
var toPrimitive = require('./_to-primitive');
var getPrototypeOf = require('./_object-gpo');
var getOwnPropertyDescriptor = require('./_object-gopd').f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __lookupSetter__: function __lookupSetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.set;
    } while (O = getPrototypeOf(O));
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_to-object":"../node_modules/core-js/modules/_to-object.js","./_to-primitive":"../node_modules/core-js/modules/_to-primitive.js","./_object-gpo":"../node_modules/core-js/modules/_object-gpo.js","./_object-gopd":"../node_modules/core-js/modules/_object-gopd.js","./_descriptors":"../node_modules/core-js/modules/_descriptors.js","./_object-forced-pam":"../node_modules/core-js/modules/_object-forced-pam.js"}],"../node_modules/core-js/modules/es6.object.prevent-extensions.js":[function(require,module,exports) {
// 19.1.2.15 Object.preventExtensions(O)
var isObject = require('./_is-object');
var meta = require('./_meta').onFreeze;

require('./_object-sap')('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});

},{"./_is-object":"../node_modules/core-js/modules/_is-object.js","./_meta":"../node_modules/core-js/modules/_meta.js","./_object-sap":"../node_modules/core-js/modules/_object-sap.js"}],"../node_modules/core-js/modules/_same-value.js":[function(require,module,exports) {
// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};

},{}],"../node_modules/core-js/modules/es6.object.is.js":[function(require,module,exports) {
// 19.1.3.10 Object.is(value1, value2)
var $export = require('./_export');
$export($export.S, 'Object', { is: require('./_same-value') });

},{"./_export":"../node_modules/core-js/modules/_export.js","./_same-value":"../node_modules/core-js/modules/_same-value.js"}],"../node_modules/core-js/modules/es6.object.is-frozen.js":[function(require,module,exports) {
// 19.1.2.12 Object.isFrozen(O)
var isObject = require('./_is-object');

require('./_object-sap')('isFrozen', function ($isFrozen) {
  return function isFrozen(it) {
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});

},{"./_is-object":"../node_modules/core-js/modules/_is-object.js","./_object-sap":"../node_modules/core-js/modules/_object-sap.js"}],"../node_modules/core-js/modules/es6.object.is-sealed.js":[function(require,module,exports) {
// 19.1.2.13 Object.isSealed(O)
var isObject = require('./_is-object');

require('./_object-sap')('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});

},{"./_is-object":"../node_modules/core-js/modules/_is-object.js","./_object-sap":"../node_modules/core-js/modules/_object-sap.js"}],"../node_modules/core-js/modules/es6.object.is-extensible.js":[function(require,module,exports) {
// 19.1.2.11 Object.isExtensible(O)
var isObject = require('./_is-object');

require('./_object-sap')('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});

},{"./_is-object":"../node_modules/core-js/modules/_is-object.js","./_object-sap":"../node_modules/core-js/modules/_object-sap.js"}],"../node_modules/core-js/modules/es6.object.keys.js":[function(require,module,exports) {
// 19.1.2.14 Object.keys(O)
var toObject = require('./_to-object');
var $keys = require('./_object-keys');

require('./_object-sap')('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});

},{"./_to-object":"../node_modules/core-js/modules/_to-object.js","./_object-keys":"../node_modules/core-js/modules/_object-keys.js","./_object-sap":"../node_modules/core-js/modules/_object-sap.js"}],"../node_modules/core-js/modules/es6.object.seal.js":[function(require,module,exports) {
// 19.1.2.17 Object.seal(O)
var isObject = require('./_is-object');
var meta = require('./_meta').onFreeze;

require('./_object-sap')('seal', function ($seal) {
  return function seal(it) {
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});

},{"./_is-object":"../node_modules/core-js/modules/_is-object.js","./_meta":"../node_modules/core-js/modules/_meta.js","./_object-sap":"../node_modules/core-js/modules/_object-sap.js"}],"../node_modules/core-js/modules/es6.object.set-prototype-of.js":[function(require,module,exports) {
// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = require('./_export');
$export($export.S, 'Object', { setPrototypeOf: require('./_set-proto').set });

},{"./_export":"../node_modules/core-js/modules/_export.js","./_set-proto":"../node_modules/core-js/modules/_set-proto.js"}],"../node_modules/core-js/modules/es7.object.values.js":[function(require,module,exports) {
// https://github.com/tc39/proposal-object-values-entries
var $export = require('./_export');
var $values = require('./_object-to-array')(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_object-to-array":"../node_modules/core-js/modules/_object-to-array.js"}],"../node_modules/core-js/modules/_species-constructor.js":[function(require,module,exports) {
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = require('./_an-object');
var aFunction = require('./_a-function');
var SPECIES = require('./_wks')('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

},{"./_an-object":"../node_modules/core-js/modules/_an-object.js","./_a-function":"../node_modules/core-js/modules/_a-function.js","./_wks":"../node_modules/core-js/modules/_wks.js"}],"../node_modules/core-js/modules/_invoke.js":[function(require,module,exports) {
// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};

},{}],"../node_modules/core-js/modules/_task.js":[function(require,module,exports) {


var ctx = require('./_ctx');
var invoke = require('./_invoke');
var html = require('./_html');
var cel = require('./_dom-create');
var global = require('./_global');
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (require('./_cof')(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};

},{"./_ctx":"../node_modules/core-js/modules/_ctx.js","./_invoke":"../node_modules/core-js/modules/_invoke.js","./_html":"../node_modules/core-js/modules/_html.js","./_dom-create":"../node_modules/core-js/modules/_dom-create.js","./_global":"../node_modules/core-js/modules/_global.js","./_cof":"../node_modules/core-js/modules/_cof.js"}],"../node_modules/core-js/modules/_microtask.js":[function(require,module,exports) {


var global = require('./_global');
var macrotask = require('./_task').set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = require('./_cof')(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};

},{"./_global":"../node_modules/core-js/modules/_global.js","./_task":"../node_modules/core-js/modules/_task.js","./_cof":"../node_modules/core-js/modules/_cof.js"}],"../node_modules/core-js/modules/_new-promise-capability.js":[function(require,module,exports) {
'use strict';
// 25.4.1.5 NewPromiseCapability(C)
var aFunction = require('./_a-function');

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};

},{"./_a-function":"../node_modules/core-js/modules/_a-function.js"}],"../node_modules/core-js/modules/_perform.js":[function(require,module,exports) {
module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};

},{}],"../node_modules/core-js/modules/_user-agent.js":[function(require,module,exports) {

var global = require('./_global');
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';

},{"./_global":"../node_modules/core-js/modules/_global.js"}],"../node_modules/core-js/modules/_promise-resolve.js":[function(require,module,exports) {
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var newPromiseCapability = require('./_new-promise-capability');

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

},{"./_an-object":"../node_modules/core-js/modules/_an-object.js","./_is-object":"../node_modules/core-js/modules/_is-object.js","./_new-promise-capability":"../node_modules/core-js/modules/_new-promise-capability.js"}],"../node_modules/core-js/modules/es6.promise.js":[function(require,module,exports) {


'use strict';
var LIBRARY = require('./_library');
var global = require('./_global');
var ctx = require('./_ctx');
var classof = require('./_classof');
var $export = require('./_export');
var isObject = require('./_is-object');
var aFunction = require('./_a-function');
var anInstance = require('./_an-instance');
var forOf = require('./_for-of');
var speciesConstructor = require('./_species-constructor');
var task = require('./_task').set;
var microtask = require('./_microtask')();
var newPromiseCapabilityModule = require('./_new-promise-capability');
var perform = require('./_perform');
var userAgent = require('./_user-agent');
var promiseResolve = require('./_promise-resolve');
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[require('./_wks')('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = require('./_redefine-all')($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
require('./_set-to-string-tag')($Promise, PROMISE);
require('./_set-species')(PROMISE);
Wrapper = require('./_core')[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && require('./_iter-detect')(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});

},{"./_library":"../node_modules/core-js/modules/_library.js","./_global":"../node_modules/core-js/modules/_global.js","./_ctx":"../node_modules/core-js/modules/_ctx.js","./_classof":"../node_modules/core-js/modules/_classof.js","./_export":"../node_modules/core-js/modules/_export.js","./_is-object":"../node_modules/core-js/modules/_is-object.js","./_a-function":"../node_modules/core-js/modules/_a-function.js","./_an-instance":"../node_modules/core-js/modules/_an-instance.js","./_for-of":"../node_modules/core-js/modules/_for-of.js","./_species-constructor":"../node_modules/core-js/modules/_species-constructor.js","./_task":"../node_modules/core-js/modules/_task.js","./_microtask":"../node_modules/core-js/modules/_microtask.js","./_new-promise-capability":"../node_modules/core-js/modules/_new-promise-capability.js","./_perform":"../node_modules/core-js/modules/_perform.js","./_user-agent":"../node_modules/core-js/modules/_user-agent.js","./_promise-resolve":"../node_modules/core-js/modules/_promise-resolve.js","./_wks":"../node_modules/core-js/modules/_wks.js","./_redefine-all":"../node_modules/core-js/modules/_redefine-all.js","./_set-to-string-tag":"../node_modules/core-js/modules/_set-to-string-tag.js","./_set-species":"../node_modules/core-js/modules/_set-species.js","./_core":"../node_modules/core-js/modules/_core.js","./_iter-detect":"../node_modules/core-js/modules/_iter-detect.js"}],"../node_modules/core-js/modules/es7.promise.finally.js":[function(require,module,exports) {

// https://github.com/tc39/proposal-promise-finally
'use strict';
var $export = require('./_export');
var core = require('./_core');
var global = require('./_global');
var speciesConstructor = require('./_species-constructor');
var promiseResolve = require('./_promise-resolve');

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });

},{"./_export":"../node_modules/core-js/modules/_export.js","./_core":"../node_modules/core-js/modules/_core.js","./_global":"../node_modules/core-js/modules/_global.js","./_species-constructor":"../node_modules/core-js/modules/_species-constructor.js","./_promise-resolve":"../node_modules/core-js/modules/_promise-resolve.js"}],"../node_modules/core-js/modules/es6.reflect.apply.js":[function(require,module,exports) {
// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = require('./_export');
var aFunction = require('./_a-function');
var anObject = require('./_an-object');
var rApply = (require('./_global').Reflect || {}).apply;
var fApply = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !require('./_fails')(function () {
  rApply(function () { /* empty */ });
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList) {
    var T = aFunction(target);
    var L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_a-function":"../node_modules/core-js/modules/_a-function.js","./_an-object":"../node_modules/core-js/modules/_an-object.js","./_global":"../node_modules/core-js/modules/_global.js","./_fails":"../node_modules/core-js/modules/_fails.js"}],"../node_modules/core-js/modules/_bind.js":[function(require,module,exports) {
'use strict';
var aFunction = require('./_a-function');
var isObject = require('./_is-object');
var invoke = require('./_invoke');
var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};

},{"./_a-function":"../node_modules/core-js/modules/_a-function.js","./_is-object":"../node_modules/core-js/modules/_is-object.js","./_invoke":"../node_modules/core-js/modules/_invoke.js"}],"../node_modules/core-js/modules/es6.reflect.construct.js":[function(require,module,exports) {
// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export = require('./_export');
var create = require('./_object-create');
var aFunction = require('./_a-function');
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var fails = require('./_fails');
var bind = require('./_bind');
var rConstruct = (require('./_global').Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  rConstruct(function () { /* empty */ });
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_object-create":"../node_modules/core-js/modules/_object-create.js","./_a-function":"../node_modules/core-js/modules/_a-function.js","./_an-object":"../node_modules/core-js/modules/_an-object.js","./_is-object":"../node_modules/core-js/modules/_is-object.js","./_fails":"../node_modules/core-js/modules/_fails.js","./_bind":"../node_modules/core-js/modules/_bind.js","./_global":"../node_modules/core-js/modules/_global.js"}],"../node_modules/core-js/modules/es6.reflect.define-property.js":[function(require,module,exports) {
// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP = require('./_object-dp');
var $export = require('./_export');
var anObject = require('./_an-object');
var toPrimitive = require('./_to-primitive');

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * require('./_fails')(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  }
});

},{"./_object-dp":"../node_modules/core-js/modules/_object-dp.js","./_export":"../node_modules/core-js/modules/_export.js","./_an-object":"../node_modules/core-js/modules/_an-object.js","./_to-primitive":"../node_modules/core-js/modules/_to-primitive.js","./_fails":"../node_modules/core-js/modules/_fails.js"}],"../node_modules/core-js/modules/es6.reflect.delete-property.js":[function(require,module,exports) {
// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export = require('./_export');
var gOPD = require('./_object-gopd').f;
var anObject = require('./_an-object');

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_object-gopd":"../node_modules/core-js/modules/_object-gopd.js","./_an-object":"../node_modules/core-js/modules/_an-object.js"}],"../node_modules/core-js/modules/es6.reflect.get.js":[function(require,module,exports) {
// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD = require('./_object-gopd');
var getPrototypeOf = require('./_object-gpo');
var has = require('./_has');
var $export = require('./_export');
var isObject = require('./_is-object');
var anObject = require('./_an-object');

function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var desc, proto;
  if (anObject(target) === receiver) return target[propertyKey];
  if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', { get: get });

},{"./_object-gopd":"../node_modules/core-js/modules/_object-gopd.js","./_object-gpo":"../node_modules/core-js/modules/_object-gpo.js","./_has":"../node_modules/core-js/modules/_has.js","./_export":"../node_modules/core-js/modules/_export.js","./_is-object":"../node_modules/core-js/modules/_is-object.js","./_an-object":"../node_modules/core-js/modules/_an-object.js"}],"../node_modules/core-js/modules/es6.reflect.get-own-property-descriptor.js":[function(require,module,exports) {
// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD = require('./_object-gopd');
var $export = require('./_export');
var anObject = require('./_an-object');

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return gOPD.f(anObject(target), propertyKey);
  }
});

},{"./_object-gopd":"../node_modules/core-js/modules/_object-gopd.js","./_export":"../node_modules/core-js/modules/_export.js","./_an-object":"../node_modules/core-js/modules/_an-object.js"}],"../node_modules/core-js/modules/es6.reflect.get-prototype-of.js":[function(require,module,exports) {
// 26.1.8 Reflect.getPrototypeOf(target)
var $export = require('./_export');
var getProto = require('./_object-gpo');
var anObject = require('./_an-object');

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target) {
    return getProto(anObject(target));
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_object-gpo":"../node_modules/core-js/modules/_object-gpo.js","./_an-object":"../node_modules/core-js/modules/_an-object.js"}],"../node_modules/core-js/modules/es6.reflect.has.js":[function(require,module,exports) {
// 26.1.9 Reflect.has(target, propertyKey)
var $export = require('./_export');

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js"}],"../node_modules/core-js/modules/es6.reflect.is-extensible.js":[function(require,module,exports) {
// 26.1.10 Reflect.isExtensible(target)
var $export = require('./_export');
var anObject = require('./_an-object');
var $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_an-object":"../node_modules/core-js/modules/_an-object.js"}],"../node_modules/core-js/modules/es6.reflect.own-keys.js":[function(require,module,exports) {
// 26.1.11 Reflect.ownKeys(target)
var $export = require('./_export');

$export($export.S, 'Reflect', { ownKeys: require('./_own-keys') });

},{"./_export":"../node_modules/core-js/modules/_export.js","./_own-keys":"../node_modules/core-js/modules/_own-keys.js"}],"../node_modules/core-js/modules/es6.reflect.prevent-extensions.js":[function(require,module,exports) {
// 26.1.12 Reflect.preventExtensions(target)
var $export = require('./_export');
var anObject = require('./_an-object');
var $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      if ($preventExtensions) $preventExtensions(target);
      return true;
    } catch (e) {
      return false;
    }
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_an-object":"../node_modules/core-js/modules/_an-object.js"}],"../node_modules/core-js/modules/es6.reflect.set.js":[function(require,module,exports) {
// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP = require('./_object-dp');
var gOPD = require('./_object-gopd');
var getPrototypeOf = require('./_object-gpo');
var has = require('./_has');
var $export = require('./_export');
var createDesc = require('./_property-desc');
var anObject = require('./_an-object');
var isObject = require('./_is-object');

function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDesc = gOPD.f(anObject(target), propertyKey);
  var existingDescriptor, proto;
  if (!ownDesc) {
    if (isObject(proto = getPrototypeOf(target))) {
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if (has(ownDesc, 'value')) {
    if (ownDesc.writable === false || !isObject(receiver)) return false;
    if (existingDescriptor = gOPD.f(receiver, propertyKey)) {
      if (existingDescriptor.get || existingDescriptor.set || existingDescriptor.writable === false) return false;
      existingDescriptor.value = V;
      dP.f(receiver, propertyKey, existingDescriptor);
    } else dP.f(receiver, propertyKey, createDesc(0, V));
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', { set: set });

},{"./_object-dp":"../node_modules/core-js/modules/_object-dp.js","./_object-gopd":"../node_modules/core-js/modules/_object-gopd.js","./_object-gpo":"../node_modules/core-js/modules/_object-gpo.js","./_has":"../node_modules/core-js/modules/_has.js","./_export":"../node_modules/core-js/modules/_export.js","./_property-desc":"../node_modules/core-js/modules/_property-desc.js","./_an-object":"../node_modules/core-js/modules/_an-object.js","./_is-object":"../node_modules/core-js/modules/_is-object.js"}],"../node_modules/core-js/modules/es6.reflect.set-prototype-of.js":[function(require,module,exports) {
// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export = require('./_export');
var setProto = require('./_set-proto');

if (setProto) $export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_set-proto":"../node_modules/core-js/modules/_set-proto.js"}],"../node_modules/core-js/modules/_is-regexp.js":[function(require,module,exports) {
// 7.2.8 IsRegExp(argument)
var isObject = require('./_is-object');
var cof = require('./_cof');
var MATCH = require('./_wks')('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};

},{"./_is-object":"../node_modules/core-js/modules/_is-object.js","./_cof":"../node_modules/core-js/modules/_cof.js","./_wks":"../node_modules/core-js/modules/_wks.js"}],"../node_modules/core-js/modules/_flags.js":[function(require,module,exports) {
'use strict';
// 21.2.5.3 get RegExp.prototype.flags
var anObject = require('./_an-object');
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

},{"./_an-object":"../node_modules/core-js/modules/_an-object.js"}],"../node_modules/core-js/modules/es6.regexp.constructor.js":[function(require,module,exports) {

var global = require('./_global');
var inheritIfRequired = require('./_inherit-if-required');
var dP = require('./_object-dp').f;
var gOPN = require('./_object-gopn').f;
var isRegExp = require('./_is-regexp');
var $flags = require('./_flags');
var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
// "new" creates a new object, old webkit buggy here
var CORRECT_NEW = new $RegExp(re1) !== re1;

if (require('./_descriptors') && (!CORRECT_NEW || require('./_fails')(function () {
  re2[require('./_wks')('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function (key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function () { return Base[key]; },
      set: function (it) { Base[key] = it; }
    });
  };
  for (var keys = gOPN(Base), i = 0; keys.length > i;) proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  require('./_redefine')(global, 'RegExp', $RegExp);
}

require('./_set-species')('RegExp');

},{"./_global":"../node_modules/core-js/modules/_global.js","./_inherit-if-required":"../node_modules/core-js/modules/_inherit-if-required.js","./_object-dp":"../node_modules/core-js/modules/_object-dp.js","./_object-gopn":"../node_modules/core-js/modules/_object-gopn.js","./_is-regexp":"../node_modules/core-js/modules/_is-regexp.js","./_flags":"../node_modules/core-js/modules/_flags.js","./_descriptors":"../node_modules/core-js/modules/_descriptors.js","./_fails":"../node_modules/core-js/modules/_fails.js","./_wks":"../node_modules/core-js/modules/_wks.js","./_redefine":"../node_modules/core-js/modules/_redefine.js","./_set-species":"../node_modules/core-js/modules/_set-species.js"}],"../node_modules/core-js/modules/es6.regexp.flags.js":[function(require,module,exports) {
// 21.2.5.3 get RegExp.prototype.flags()
if (require('./_descriptors') && /./g.flags != 'g') require('./_object-dp').f(RegExp.prototype, 'flags', {
  configurable: true,
  get: require('./_flags')
});

},{"./_descriptors":"../node_modules/core-js/modules/_descriptors.js","./_object-dp":"../node_modules/core-js/modules/_object-dp.js","./_flags":"../node_modules/core-js/modules/_flags.js"}],"../node_modules/core-js/modules/_string-at.js":[function(require,module,exports) {
var toInteger = require('./_to-integer');
var defined = require('./_defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

},{"./_to-integer":"../node_modules/core-js/modules/_to-integer.js","./_defined":"../node_modules/core-js/modules/_defined.js"}],"../node_modules/core-js/modules/_advance-string-index.js":[function(require,module,exports) {
'use strict';
var at = require('./_string-at')(true);

 // `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? at(S, index).length : 1);
};

},{"./_string-at":"../node_modules/core-js/modules/_string-at.js"}],"../node_modules/core-js/modules/_regexp-exec-abstract.js":[function(require,module,exports) {
'use strict';

var classof = require('./_classof');
var builtinExec = RegExp.prototype.exec;

 // `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw new TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }
  if (classof(R) !== 'RegExp') {
    throw new TypeError('RegExp#exec called on incompatible receiver');
  }
  return builtinExec.call(R, S);
};

},{"./_classof":"../node_modules/core-js/modules/_classof.js"}],"../node_modules/core-js/modules/_regexp-exec.js":[function(require,module,exports) {
'use strict';

var regexpFlags = require('./_flags');

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var LAST_INDEX = 'lastIndex';

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/,
      re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      // eslint-disable-next-line no-loop-func
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;

},{"./_flags":"../node_modules/core-js/modules/_flags.js"}],"../node_modules/core-js/modules/es6.regexp.exec.js":[function(require,module,exports) {
'use strict';
var regexpExec = require('./_regexp-exec');
require('./_export')({
  target: 'RegExp',
  proto: true,
  forced: regexpExec !== /./.exec
}, {
  exec: regexpExec
});

},{"./_regexp-exec":"../node_modules/core-js/modules/_regexp-exec.js","./_export":"../node_modules/core-js/modules/_export.js"}],"../node_modules/core-js/modules/_fix-re-wks.js":[function(require,module,exports) {
'use strict';
require('./es6.regexp.exec');
var redefine = require('./_redefine');
var hide = require('./_hide');
var fails = require('./_fails');
var defined = require('./_defined');
var wks = require('./_wks');
var regexpExec = require('./_regexp-exec');

var SPECIES = wks('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
})();

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () { execCalled = true; return null; };
    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
    }
    re[SYMBOL]('');
    return !execCalled;
  }) : undefined;

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var fns = exec(
      defined,
      SYMBOL,
      ''[KEY],
      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      }
    );
    var strfn = fns[0];
    var rxfn = fns[1];

    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};

},{"./es6.regexp.exec":"../node_modules/core-js/modules/es6.regexp.exec.js","./_redefine":"../node_modules/core-js/modules/_redefine.js","./_hide":"../node_modules/core-js/modules/_hide.js","./_fails":"../node_modules/core-js/modules/_fails.js","./_defined":"../node_modules/core-js/modules/_defined.js","./_wks":"../node_modules/core-js/modules/_wks.js","./_regexp-exec":"../node_modules/core-js/modules/_regexp-exec.js"}],"../node_modules/core-js/modules/es6.regexp.match.js":[function(require,module,exports) {
'use strict';

var anObject = require('./_an-object');
var toLength = require('./_to-length');
var advanceStringIndex = require('./_advance-string-index');
var regExpExec = require('./_regexp-exec-abstract');

// @@match logic
require('./_fix-re-wks')('match', 1, function (defined, MATCH, $match, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = defined(this);
      var fn = regexp == undefined ? undefined : regexp[MATCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
    function (regexp) {
      var res = maybeCallNative($match, regexp, this);
      if (res.done) return res.value;
      var rx = anObject(regexp);
      var S = String(this);
      if (!rx.global) return regExpExec(rx, S);
      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = String(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});

},{"./_an-object":"../node_modules/core-js/modules/_an-object.js","./_to-length":"../node_modules/core-js/modules/_to-length.js","./_advance-string-index":"../node_modules/core-js/modules/_advance-string-index.js","./_regexp-exec-abstract":"../node_modules/core-js/modules/_regexp-exec-abstract.js","./_fix-re-wks":"../node_modules/core-js/modules/_fix-re-wks.js"}],"../node_modules/core-js/modules/es6.regexp.replace.js":[function(require,module,exports) {
var global = arguments[3];
'use strict';

var anObject = require('./_an-object');
var toObject = require('./_to-object');
var toLength = require('./_to-length');
var toInteger = require('./_to-integer');
var advanceStringIndex = require('./_advance-string-index');
var regExpExec = require('./_regexp-exec-abstract');
var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
require('./_fix-re-wks')('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = defined(this);
      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
      return fn !== undefined
        ? fn.call(searchValue, O, replaceValue)
        : $replace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      var res = maybeCallNative($replace, regexp, this, replaceValue);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);
      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;
        results.push(result);
        if (!global) break;
        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }
      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

    // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return $replace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});

},{"./_an-object":"../node_modules/core-js/modules/_an-object.js","./_to-object":"../node_modules/core-js/modules/_to-object.js","./_to-length":"../node_modules/core-js/modules/_to-length.js","./_to-integer":"../node_modules/core-js/modules/_to-integer.js","./_advance-string-index":"../node_modules/core-js/modules/_advance-string-index.js","./_regexp-exec-abstract":"../node_modules/core-js/modules/_regexp-exec-abstract.js","./_fix-re-wks":"../node_modules/core-js/modules/_fix-re-wks.js"}],"../node_modules/core-js/modules/es6.regexp.split.js":[function(require,module,exports) {
'use strict';

var isRegExp = require('./_is-regexp');
var anObject = require('./_an-object');
var speciesConstructor = require('./_species-constructor');
var advanceStringIndex = require('./_advance-string-index');
var toLength = require('./_to-length');
var callRegExpExec = require('./_regexp-exec-abstract');
var regexpExec = require('./_regexp-exec');
var fails = require('./_fails');
var $min = Math.min;
var $push = [].push;
var $SPLIT = 'split';
var LENGTH = 'length';
var LAST_INDEX = 'lastIndex';
var MAX_UINT32 = 0xffffffff;

// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
var SUPPORTS_Y = !fails(function () { RegExp(MAX_UINT32, 'y'); });

// @@split logic
require('./_fix-re-wks')('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return $split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy[LAST_INDEX];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
    };
  } else {
    internalSplit = $split;
  }

  return [
    // `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = defined(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (SUPPORTS_Y ? 'y' : 'g');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;
        var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
        var e;
        if (
          z === null ||
          (e = $min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
});

},{"./_is-regexp":"../node_modules/core-js/modules/_is-regexp.js","./_an-object":"../node_modules/core-js/modules/_an-object.js","./_species-constructor":"../node_modules/core-js/modules/_species-constructor.js","./_advance-string-index":"../node_modules/core-js/modules/_advance-string-index.js","./_to-length":"../node_modules/core-js/modules/_to-length.js","./_regexp-exec-abstract":"../node_modules/core-js/modules/_regexp-exec-abstract.js","./_regexp-exec":"../node_modules/core-js/modules/_regexp-exec.js","./_fails":"../node_modules/core-js/modules/_fails.js","./_fix-re-wks":"../node_modules/core-js/modules/_fix-re-wks.js"}],"../node_modules/core-js/modules/es6.regexp.search.js":[function(require,module,exports) {
'use strict';

var anObject = require('./_an-object');
var sameValue = require('./_same-value');
var regExpExec = require('./_regexp-exec-abstract');

// @@search logic
require('./_fix-re-wks')('search', 1, function (defined, SEARCH, $search, maybeCallNative) {
  return [
    // `String.prototype.search` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.search
    function search(regexp) {
      var O = defined(this);
      var fn = regexp == undefined ? undefined : regexp[SEARCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
    },
    // `RegExp.prototype[@@search]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
    function (regexp) {
      var res = maybeCallNative($search, regexp, this);
      if (res.done) return res.value;
      var rx = anObject(regexp);
      var S = String(this);
      var previousLastIndex = rx.lastIndex;
      if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
      var result = regExpExec(rx, S);
      if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
      return result === null ? -1 : result.index;
    }
  ];
});

},{"./_an-object":"../node_modules/core-js/modules/_an-object.js","./_same-value":"../node_modules/core-js/modules/_same-value.js","./_regexp-exec-abstract":"../node_modules/core-js/modules/_regexp-exec-abstract.js","./_fix-re-wks":"../node_modules/core-js/modules/_fix-re-wks.js"}],"../node_modules/core-js/modules/es6.regexp.to-string.js":[function(require,module,exports) {

'use strict';
require('./es6.regexp.flags');
var anObject = require('./_an-object');
var $flags = require('./_flags');
var DESCRIPTORS = require('./_descriptors');
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  require('./_redefine')(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (require('./_fails')(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}

},{"./es6.regexp.flags":"../node_modules/core-js/modules/es6.regexp.flags.js","./_an-object":"../node_modules/core-js/modules/_an-object.js","./_flags":"../node_modules/core-js/modules/_flags.js","./_descriptors":"../node_modules/core-js/modules/_descriptors.js","./_redefine":"../node_modules/core-js/modules/_redefine.js","./_fails":"../node_modules/core-js/modules/_fails.js"}],"../node_modules/core-js/modules/es6.set.js":[function(require,module,exports) {
'use strict';
var strong = require('./_collection-strong');
var validate = require('./_validate-collection');
var SET = 'Set';

// 23.2 Set Objects
module.exports = require('./_collection')(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);

},{"./_collection-strong":"../node_modules/core-js/modules/_collection-strong.js","./_validate-collection":"../node_modules/core-js/modules/_validate-collection.js","./_collection":"../node_modules/core-js/modules/_collection.js"}],"../node_modules/core-js/modules/_wks-ext.js":[function(require,module,exports) {
exports.f = require('./_wks');

},{"./_wks":"../node_modules/core-js/modules/_wks.js"}],"../node_modules/core-js/modules/_wks-define.js":[function(require,module,exports) {

var global = require('./_global');
var core = require('./_core');
var LIBRARY = require('./_library');
var wksExt = require('./_wks-ext');
var defineProperty = require('./_object-dp').f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};

},{"./_global":"../node_modules/core-js/modules/_global.js","./_core":"../node_modules/core-js/modules/_core.js","./_library":"../node_modules/core-js/modules/_library.js","./_wks-ext":"../node_modules/core-js/modules/_wks-ext.js","./_object-dp":"../node_modules/core-js/modules/_object-dp.js"}],"../node_modules/core-js/modules/_enum-keys.js":[function(require,module,exports) {
// all enumerable object keys, includes symbols
var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};

},{"./_object-keys":"../node_modules/core-js/modules/_object-keys.js","./_object-gops":"../node_modules/core-js/modules/_object-gops.js","./_object-pie":"../node_modules/core-js/modules/_object-pie.js"}],"../node_modules/core-js/modules/es6.symbol.js":[function(require,module,exports) {

'use strict';
// ECMAScript 6 symbols shim
var global = require('./_global');
var has = require('./_has');
var DESCRIPTORS = require('./_descriptors');
var $export = require('./_export');
var redefine = require('./_redefine');
var META = require('./_meta').KEY;
var $fails = require('./_fails');
var shared = require('./_shared');
var setToStringTag = require('./_set-to-string-tag');
var uid = require('./_uid');
var wks = require('./_wks');
var wksExt = require('./_wks-ext');
var wksDefine = require('./_wks-define');
var enumKeys = require('./_enum-keys');
var isArray = require('./_is-array');
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var createDesc = require('./_property-desc');
var _create = require('./_object-create');
var gOPNExt = require('./_object-gopn-ext');
var $GOPD = require('./_object-gopd');
var $DP = require('./_object-dp');
var $keys = require('./_object-keys');
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  require('./_object-gopn').f = gOPNExt.f = $getOwnPropertyNames;
  require('./_object-pie').f = $propertyIsEnumerable;
  require('./_object-gops').f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !require('./_library')) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || require('./_hide')($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

},{"./_global":"../node_modules/core-js/modules/_global.js","./_has":"../node_modules/core-js/modules/_has.js","./_descriptors":"../node_modules/core-js/modules/_descriptors.js","./_export":"../node_modules/core-js/modules/_export.js","./_redefine":"../node_modules/core-js/modules/_redefine.js","./_meta":"../node_modules/core-js/modules/_meta.js","./_fails":"../node_modules/core-js/modules/_fails.js","./_shared":"../node_modules/core-js/modules/_shared.js","./_set-to-string-tag":"../node_modules/core-js/modules/_set-to-string-tag.js","./_uid":"../node_modules/core-js/modules/_uid.js","./_wks":"../node_modules/core-js/modules/_wks.js","./_wks-ext":"../node_modules/core-js/modules/_wks-ext.js","./_wks-define":"../node_modules/core-js/modules/_wks-define.js","./_enum-keys":"../node_modules/core-js/modules/_enum-keys.js","./_is-array":"../node_modules/core-js/modules/_is-array.js","./_an-object":"../node_modules/core-js/modules/_an-object.js","./_is-object":"../node_modules/core-js/modules/_is-object.js","./_to-iobject":"../node_modules/core-js/modules/_to-iobject.js","./_to-primitive":"../node_modules/core-js/modules/_to-primitive.js","./_property-desc":"../node_modules/core-js/modules/_property-desc.js","./_object-create":"../node_modules/core-js/modules/_object-create.js","./_object-gopn-ext":"../node_modules/core-js/modules/_object-gopn-ext.js","./_object-gopd":"../node_modules/core-js/modules/_object-gopd.js","./_object-dp":"../node_modules/core-js/modules/_object-dp.js","./_object-keys":"../node_modules/core-js/modules/_object-keys.js","./_object-gopn":"../node_modules/core-js/modules/_object-gopn.js","./_object-pie":"../node_modules/core-js/modules/_object-pie.js","./_object-gops":"../node_modules/core-js/modules/_object-gops.js","./_library":"../node_modules/core-js/modules/_library.js","./_hide":"../node_modules/core-js/modules/_hide.js"}],"../node_modules/core-js/modules/es7.symbol.async-iterator.js":[function(require,module,exports) {
require('./_wks-define')('asyncIterator');

},{"./_wks-define":"../node_modules/core-js/modules/_wks-define.js"}],"../node_modules/core-js/modules/_string-html.js":[function(require,module,exports) {
var $export = require('./_export');
var fails = require('./_fails');
var defined = require('./_defined');
var quot = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function (string, tag, attribute, value) {
  var S = String(defined(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function (NAME, exec) {
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function () {
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};

},{"./_export":"../node_modules/core-js/modules/_export.js","./_fails":"../node_modules/core-js/modules/_fails.js","./_defined":"../node_modules/core-js/modules/_defined.js"}],"../node_modules/core-js/modules/es6.string.anchor.js":[function(require,module,exports) {
'use strict';
// B.2.3.2 String.prototype.anchor(name)
require('./_string-html')('anchor', function (createHTML) {
  return function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  };
});

},{"./_string-html":"../node_modules/core-js/modules/_string-html.js"}],"../node_modules/core-js/modules/es6.string.big.js":[function(require,module,exports) {
'use strict';
// B.2.3.3 String.prototype.big()
require('./_string-html')('big', function (createHTML) {
  return function big() {
    return createHTML(this, 'big', '', '');
  };
});

},{"./_string-html":"../node_modules/core-js/modules/_string-html.js"}],"../node_modules/core-js/modules/es6.string.blink.js":[function(require,module,exports) {
'use strict';
// B.2.3.4 String.prototype.blink()
require('./_string-html')('blink', function (createHTML) {
  return function blink() {
    return createHTML(this, 'blink', '', '');
  };
});

},{"./_string-html":"../node_modules/core-js/modules/_string-html.js"}],"../node_modules/core-js/modules/es6.string.bold.js":[function(require,module,exports) {
'use strict';
// B.2.3.5 String.prototype.bold()
require('./_string-html')('bold', function (createHTML) {
  return function bold() {
    return createHTML(this, 'b', '', '');
  };
});

},{"./_string-html":"../node_modules/core-js/modules/_string-html.js"}],"../node_modules/core-js/modules/es6.string.code-point-at.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var $at = require('./_string-at')(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos) {
    return $at(this, pos);
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_string-at":"../node_modules/core-js/modules/_string-at.js"}],"../node_modules/core-js/modules/_string-context.js":[function(require,module,exports) {
// helper for String#{startsWith, endsWith, includes}
var isRegExp = require('./_is-regexp');
var defined = require('./_defined');

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};

},{"./_is-regexp":"../node_modules/core-js/modules/_is-regexp.js","./_defined":"../node_modules/core-js/modules/_defined.js"}],"../node_modules/core-js/modules/_fails-is-regexp.js":[function(require,module,exports) {
var MATCH = require('./_wks')('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};

},{"./_wks":"../node_modules/core-js/modules/_wks.js"}],"../node_modules/core-js/modules/es6.string.ends-with.js":[function(require,module,exports) {
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
'use strict';
var $export = require('./_export');
var toLength = require('./_to-length');
var context = require('./_string-context');
var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * require('./_fails-is-regexp')(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = context(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_to-length":"../node_modules/core-js/modules/_to-length.js","./_string-context":"../node_modules/core-js/modules/_string-context.js","./_fails-is-regexp":"../node_modules/core-js/modules/_fails-is-regexp.js"}],"../node_modules/core-js/modules/es6.string.fixed.js":[function(require,module,exports) {
'use strict';
// B.2.3.6 String.prototype.fixed()
require('./_string-html')('fixed', function (createHTML) {
  return function fixed() {
    return createHTML(this, 'tt', '', '');
  };
});

},{"./_string-html":"../node_modules/core-js/modules/_string-html.js"}],"../node_modules/core-js/modules/es6.string.fontcolor.js":[function(require,module,exports) {
'use strict';
// B.2.3.7 String.prototype.fontcolor(color)
require('./_string-html')('fontcolor', function (createHTML) {
  return function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  };
});

},{"./_string-html":"../node_modules/core-js/modules/_string-html.js"}],"../node_modules/core-js/modules/es6.string.fontsize.js":[function(require,module,exports) {
'use strict';
// B.2.3.8 String.prototype.fontsize(size)
require('./_string-html')('fontsize', function (createHTML) {
  return function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  };
});

},{"./_string-html":"../node_modules/core-js/modules/_string-html.js"}],"../node_modules/core-js/modules/es6.string.from-code-point.js":[function(require,module,exports) {
var $export = require('./_export');
var toAbsoluteIndex = require('./_to-absolute-index');
var fromCharCode = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
    var res = [];
    var aLen = arguments.length;
    var i = 0;
    var code;
    while (aLen > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_to-absolute-index":"../node_modules/core-js/modules/_to-absolute-index.js"}],"../node_modules/core-js/modules/es6.string.includes.js":[function(require,module,exports) {
// 21.1.3.7 String.prototype.includes(searchString, position = 0)
'use strict';
var $export = require('./_export');
var context = require('./_string-context');
var INCLUDES = 'includes';

$export($export.P + $export.F * require('./_fails-is-regexp')(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_string-context":"../node_modules/core-js/modules/_string-context.js","./_fails-is-regexp":"../node_modules/core-js/modules/_fails-is-regexp.js"}],"../node_modules/core-js/modules/es6.string.italics.js":[function(require,module,exports) {
'use strict';
// B.2.3.9 String.prototype.italics()
require('./_string-html')('italics', function (createHTML) {
  return function italics() {
    return createHTML(this, 'i', '', '');
  };
});

},{"./_string-html":"../node_modules/core-js/modules/_string-html.js"}],"../node_modules/core-js/modules/es6.string.iterator.js":[function(require,module,exports) {
'use strict';
var $at = require('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./_iter-define')(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

},{"./_string-at":"../node_modules/core-js/modules/_string-at.js","./_iter-define":"../node_modules/core-js/modules/_iter-define.js"}],"../node_modules/core-js/modules/es6.string.link.js":[function(require,module,exports) {
'use strict';
// B.2.3.10 String.prototype.link(url)
require('./_string-html')('link', function (createHTML) {
  return function link(url) {
    return createHTML(this, 'a', 'href', url);
  };
});

},{"./_string-html":"../node_modules/core-js/modules/_string-html.js"}],"../node_modules/core-js/modules/_string-repeat.js":[function(require,module,exports) {
'use strict';
var toInteger = require('./_to-integer');
var defined = require('./_defined');

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};

},{"./_to-integer":"../node_modules/core-js/modules/_to-integer.js","./_defined":"../node_modules/core-js/modules/_defined.js"}],"../node_modules/core-js/modules/_string-pad.js":[function(require,module,exports) {
// https://github.com/tc39/proposal-string-pad-start-end
var toLength = require('./_to-length');
var repeat = require('./_string-repeat');
var defined = require('./_defined');

module.exports = function (that, maxLength, fillString, left) {
  var S = String(defined(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = toLength(maxLength);
  if (intMaxLength <= stringLength || fillStr == '') return S;
  var fillLen = intMaxLength - stringLength;
  var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};

},{"./_to-length":"../node_modules/core-js/modules/_to-length.js","./_string-repeat":"../node_modules/core-js/modules/_string-repeat.js","./_defined":"../node_modules/core-js/modules/_defined.js"}],"../node_modules/core-js/modules/es7.string.pad-start.js":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-string-pad-start-end
var $export = require('./_export');
var $pad = require('./_string-pad');
var userAgent = require('./_user-agent');

// https://github.com/zloirock/core-js/issues/280
var WEBKIT_BUG = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(userAgent);

$export($export.P + $export.F * WEBKIT_BUG, 'String', {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_string-pad":"../node_modules/core-js/modules/_string-pad.js","./_user-agent":"../node_modules/core-js/modules/_user-agent.js"}],"../node_modules/core-js/modules/es7.string.pad-end.js":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-string-pad-start-end
var $export = require('./_export');
var $pad = require('./_string-pad');
var userAgent = require('./_user-agent');

// https://github.com/zloirock/core-js/issues/280
var WEBKIT_BUG = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(userAgent);

$export($export.P + $export.F * WEBKIT_BUG, 'String', {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_string-pad":"../node_modules/core-js/modules/_string-pad.js","./_user-agent":"../node_modules/core-js/modules/_user-agent.js"}],"../node_modules/core-js/modules/es6.string.raw.js":[function(require,module,exports) {
var $export = require('./_export');
var toIObject = require('./_to-iobject');
var toLength = require('./_to-length');

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite) {
    var tpl = toIObject(callSite.raw);
    var len = toLength(tpl.length);
    var aLen = arguments.length;
    var res = [];
    var i = 0;
    while (len > i) {
      res.push(String(tpl[i++]));
      if (i < aLen) res.push(String(arguments[i]));
    } return res.join('');
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_to-iobject":"../node_modules/core-js/modules/_to-iobject.js","./_to-length":"../node_modules/core-js/modules/_to-length.js"}],"../node_modules/core-js/modules/es6.string.repeat.js":[function(require,module,exports) {
var $export = require('./_export');

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: require('./_string-repeat')
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_string-repeat":"../node_modules/core-js/modules/_string-repeat.js"}],"../node_modules/core-js/modules/es6.string.small.js":[function(require,module,exports) {
'use strict';
// B.2.3.11 String.prototype.small()
require('./_string-html')('small', function (createHTML) {
  return function small() {
    return createHTML(this, 'small', '', '');
  };
});

},{"./_string-html":"../node_modules/core-js/modules/_string-html.js"}],"../node_modules/core-js/modules/es6.string.starts-with.js":[function(require,module,exports) {
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])
'use strict';
var $export = require('./_export');
var toLength = require('./_to-length');
var context = require('./_string-context');
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * require('./_fails-is-regexp')(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_to-length":"../node_modules/core-js/modules/_to-length.js","./_string-context":"../node_modules/core-js/modules/_string-context.js","./_fails-is-regexp":"../node_modules/core-js/modules/_fails-is-regexp.js"}],"../node_modules/core-js/modules/es6.string.strike.js":[function(require,module,exports) {
'use strict';
// B.2.3.12 String.prototype.strike()
require('./_string-html')('strike', function (createHTML) {
  return function strike() {
    return createHTML(this, 'strike', '', '');
  };
});

},{"./_string-html":"../node_modules/core-js/modules/_string-html.js"}],"../node_modules/core-js/modules/es6.string.sub.js":[function(require,module,exports) {
'use strict';
// B.2.3.13 String.prototype.sub()
require('./_string-html')('sub', function (createHTML) {
  return function sub() {
    return createHTML(this, 'sub', '', '');
  };
});

},{"./_string-html":"../node_modules/core-js/modules/_string-html.js"}],"../node_modules/core-js/modules/es6.string.sup.js":[function(require,module,exports) {
'use strict';
// B.2.3.14 String.prototype.sup()
require('./_string-html')('sup', function (createHTML) {
  return function sup() {
    return createHTML(this, 'sup', '', '');
  };
});

},{"./_string-html":"../node_modules/core-js/modules/_string-html.js"}],"../node_modules/core-js/modules/_typed.js":[function(require,module,exports) {

var global = require('./_global');
var hide = require('./_hide');
var uid = require('./_uid');
var TYPED = uid('typed_array');
var VIEW = uid('view');
var ABV = !!(global.ArrayBuffer && global.DataView);
var CONSTR = ABV;
var i = 0;
var l = 9;
var Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while (i < l) {
  if (Typed = global[TypedArrayConstructors[i++]]) {
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV: ABV,
  CONSTR: CONSTR,
  TYPED: TYPED,
  VIEW: VIEW
};

},{"./_global":"../node_modules/core-js/modules/_global.js","./_hide":"../node_modules/core-js/modules/_hide.js","./_uid":"../node_modules/core-js/modules/_uid.js"}],"../node_modules/core-js/modules/_to-index.js":[function(require,module,exports) {
// https://tc39.github.io/ecma262/#sec-toindex
var toInteger = require('./_to-integer');
var toLength = require('./_to-length');
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length!');
  return length;
};

},{"./_to-integer":"../node_modules/core-js/modules/_to-integer.js","./_to-length":"../node_modules/core-js/modules/_to-length.js"}],"../node_modules/core-js/modules/_typed-buffer.js":[function(require,module,exports) {

'use strict';
var global = require('./_global');
var DESCRIPTORS = require('./_descriptors');
var LIBRARY = require('./_library');
var $typed = require('./_typed');
var hide = require('./_hide');
var redefineAll = require('./_redefine-all');
var fails = require('./_fails');
var anInstance = require('./_an-instance');
var toInteger = require('./_to-integer');
var toLength = require('./_to-length');
var toIndex = require('./_to-index');
var gOPN = require('./_object-gopn').f;
var dP = require('./_object-dp').f;
var arrayFill = require('./_array-fill');
var setToStringTag = require('./_set-to-string-tag');
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length!';
var WRONG_INDEX = 'Wrong index!';
var $ArrayBuffer = global[ARRAY_BUFFER];
var $DataView = global[DATA_VIEW];
var Math = global.Math;
var RangeError = global.RangeError;
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = global.Infinity;
var BaseBuffer = $ArrayBuffer;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;
var BUFFER = 'buffer';
var BYTE_LENGTH = 'byteLength';
var BYTE_OFFSET = 'byteOffset';
var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
function packIEEE754(value, mLen, nBytes) {
  var buffer = new Array(nBytes);
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var i = 0;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  var e, m, c;
  value = abs(value);
  // eslint-disable-next-line no-self-compare
  if (value != value || value === Infinity) {
    // eslint-disable-next-line no-self-compare
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if (value * (c = pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
}
function unpackIEEE754(buffer, mLen, nBytes) {
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = eLen - 7;
  var i = nBytes - 1;
  var s = buffer[i--];
  var e = s & 127;
  var m;
  s >>= 7;
  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
}

function unpackI32(bytes) {
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
}
function packI8(it) {
  return [it & 0xff];
}
function packI16(it) {
  return [it & 0xff, it >> 8 & 0xff];
}
function packI32(it) {
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
}
function packF64(it) {
  return packIEEE754(it, 52, 8);
}
function packF32(it) {
  return packIEEE754(it, 23, 4);
}

function addGetter(C, key, internal) {
  dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
}

function get(view, bytes, index, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
}
function set(view, bytes, index, conversion, value, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = conversion(+value);
  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
}

if (!$typed.ABV) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    this._b = arrayFill.call(new Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH];
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if (!fails(function () {
    $ArrayBuffer(1);
  }) || !fails(function () {
    new $ArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new $ArrayBuffer(); // eslint-disable-line no-new
    new $ArrayBuffer(1.5); // eslint-disable-line no-new
    new $ArrayBuffer(NaN); // eslint-disable-line no-new
    return $ArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new BaseBuffer(toIndex(length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
    }
    if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;

},{"./_global":"../node_modules/core-js/modules/_global.js","./_descriptors":"../node_modules/core-js/modules/_descriptors.js","./_library":"../node_modules/core-js/modules/_library.js","./_typed":"../node_modules/core-js/modules/_typed.js","./_hide":"../node_modules/core-js/modules/_hide.js","./_redefine-all":"../node_modules/core-js/modules/_redefine-all.js","./_fails":"../node_modules/core-js/modules/_fails.js","./_an-instance":"../node_modules/core-js/modules/_an-instance.js","./_to-integer":"../node_modules/core-js/modules/_to-integer.js","./_to-length":"../node_modules/core-js/modules/_to-length.js","./_to-index":"../node_modules/core-js/modules/_to-index.js","./_object-gopn":"../node_modules/core-js/modules/_object-gopn.js","./_object-dp":"../node_modules/core-js/modules/_object-dp.js","./_array-fill":"../node_modules/core-js/modules/_array-fill.js","./_set-to-string-tag":"../node_modules/core-js/modules/_set-to-string-tag.js"}],"../node_modules/core-js/modules/es6.typed.array-buffer.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var $typed = require('./_typed');
var buffer = require('./_typed-buffer');
var anObject = require('./_an-object');
var toAbsoluteIndex = require('./_to-absolute-index');
var toLength = require('./_to-length');
var isObject = require('./_is-object');
var ArrayBuffer = require('./_global').ArrayBuffer;
var speciesConstructor = require('./_species-constructor');
var $ArrayBuffer = buffer.ArrayBuffer;
var $DataView = buffer.DataView;
var $isView = $typed.ABV && ArrayBuffer.isView;
var $slice = $ArrayBuffer.prototype.slice;
var VIEW = $typed.VIEW;
var ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it) {
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * require('./_fails')(function () {
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end) {
    if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
    var len = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, len);
    var fin = toAbsoluteIndex(end === undefined ? len : end, len);
    var result = new (speciesConstructor(this, $ArrayBuffer))(toLength(fin - first));
    var viewS = new $DataView(this);
    var viewT = new $DataView(result);
    var index = 0;
    while (first < fin) {
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

require('./_set-species')(ARRAY_BUFFER);

},{"./_export":"../node_modules/core-js/modules/_export.js","./_typed":"../node_modules/core-js/modules/_typed.js","./_typed-buffer":"../node_modules/core-js/modules/_typed-buffer.js","./_an-object":"../node_modules/core-js/modules/_an-object.js","./_to-absolute-index":"../node_modules/core-js/modules/_to-absolute-index.js","./_to-length":"../node_modules/core-js/modules/_to-length.js","./_is-object":"../node_modules/core-js/modules/_is-object.js","./_global":"../node_modules/core-js/modules/_global.js","./_species-constructor":"../node_modules/core-js/modules/_species-constructor.js","./_fails":"../node_modules/core-js/modules/_fails.js","./_set-species":"../node_modules/core-js/modules/_set-species.js"}],"../node_modules/core-js/modules/_typed-array.js":[function(require,module,exports) {
var global = arguments[3];
'use strict';
if (require('./_descriptors')) {
  var LIBRARY = require('./_library');
  var global = require('./_global');
  var fails = require('./_fails');
  var $export = require('./_export');
  var $typed = require('./_typed');
  var $buffer = require('./_typed-buffer');
  var ctx = require('./_ctx');
  var anInstance = require('./_an-instance');
  var propertyDesc = require('./_property-desc');
  var hide = require('./_hide');
  var redefineAll = require('./_redefine-all');
  var toInteger = require('./_to-integer');
  var toLength = require('./_to-length');
  var toIndex = require('./_to-index');
  var toAbsoluteIndex = require('./_to-absolute-index');
  var toPrimitive = require('./_to-primitive');
  var has = require('./_has');
  var classof = require('./_classof');
  var isObject = require('./_is-object');
  var toObject = require('./_to-object');
  var isArrayIter = require('./_is-array-iter');
  var create = require('./_object-create');
  var getPrototypeOf = require('./_object-gpo');
  var gOPN = require('./_object-gopn').f;
  var getIterFn = require('./core.get-iterator-method');
  var uid = require('./_uid');
  var wks = require('./_wks');
  var createArrayMethod = require('./_array-methods');
  var createArrayIncludes = require('./_array-includes');
  var speciesConstructor = require('./_species-constructor');
  var ArrayIterators = require('./es6.array.iterator');
  var Iterators = require('./_iterators');
  var $iterDetect = require('./_iter-detect');
  var setSpecies = require('./_set-species');
  var arrayFill = require('./_array-fill');
  var arrayCopyWithin = require('./_array-copy-within');
  var $DP = require('./_object-dp');
  var $GOPD = require('./_object-gopd');
  var dP = $DP.f;
  var gOPD = $GOPD.f;
  var RangeError = global.RangeError;
  var TypeError = global.TypeError;
  var Uint8Array = global.Uint8Array;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var PROTOTYPE = 'prototype';
  var ArrayProto = Array[PROTOTYPE];
  var $ArrayBuffer = $buffer.ArrayBuffer;
  var $DataView = $buffer.DataView;
  var arrayForEach = createArrayMethod(0);
  var arrayFilter = createArrayMethod(2);
  var arraySome = createArrayMethod(3);
  var arrayEvery = createArrayMethod(4);
  var arrayFind = createArrayMethod(5);
  var arrayFindIndex = createArrayMethod(6);
  var arrayIncludes = createArrayIncludes(true);
  var arrayIndexOf = createArrayIncludes(false);
  var arrayValues = ArrayIterators.values;
  var arrayKeys = ArrayIterators.keys;
  var arrayEntries = ArrayIterators.entries;
  var arrayLastIndexOf = ArrayProto.lastIndexOf;
  var arrayReduce = ArrayProto.reduce;
  var arrayReduceRight = ArrayProto.reduceRight;
  var arrayJoin = ArrayProto.join;
  var arraySort = ArrayProto.sort;
  var arraySlice = ArrayProto.slice;
  var arrayToString = ArrayProto.toString;
  var arrayToLocaleString = ArrayProto.toLocaleString;
  var ITERATOR = wks('iterator');
  var TAG = wks('toStringTag');
  var TYPED_CONSTRUCTOR = uid('typed_constructor');
  var DEF_CONSTRUCTOR = uid('def_constructor');
  var ALL_CONSTRUCTORS = $typed.CONSTR;
  var TYPED_ARRAY = $typed.TYPED;
  var VIEW = $typed.VIEW;
  var WRONG_LENGTH = 'Wrong length!';

  var $map = createArrayMethod(1, function (O, length) {
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function () {
    // eslint-disable-next-line no-undef
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
    new Uint8Array(1).set({});
  });

  var toOffset = function (it, BYTES) {
    var offset = toInteger(it);
    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function (it) {
    if (isObject(it) && TYPED_ARRAY in it) return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function (C, length) {
    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function (O, list) {
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function (C, list) {
    var index = 0;
    var length = list.length;
    var result = allocate(C, length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var addGetter = function (it, key, internal) {
    dP(it, key, { get: function () { return this._d[internal]; } });
  };

  var $from = function from(source /* , mapfn, thisArg */) {
    var O = toObject(source);
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iterFn = getIterFn(O);
    var i, length, values, result, step, iterator;
    if (iterFn != undefined && !isArrayIter(iterFn)) {
      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
        values.push(step.value);
      } O = values;
    }
    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/* ...items */) {
    var index = 0;
    var length = arguments.length;
    var result = allocate(this, length);
    while (length > index) result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function () { arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString() {
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /* , end */) {
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /* , thisArg */) {
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /* , thisArg */) {
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /* , thisArg */) {
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /* , thisArg */) {
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /* , thisArg */) {
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /* , fromIndex */) {
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /* , fromIndex */) {
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator) { // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /* , thisArg */) {
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse() {
      var that = this;
      var length = validate(that).length;
      var middle = Math.floor(length / 2);
      var index = 0;
      var value;
      while (index < middle) {
        value = that[index];
        that[index++] = that[--length];
        that[length] = value;
      } return that;
    },
    some: function some(callbackfn /* , thisArg */) {
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn) {
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end) {
      var O = validate(this);
      var length = O.length;
      var $begin = toAbsoluteIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end) {
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /* , offset */) {
    validate(this);
    var offset = toOffset(arguments[1], 1);
    var length = this.length;
    var src = toObject(arrayLike);
    var len = toLength(src.length);
    var index = 0;
    if (len + offset > length) throw RangeError(WRONG_LENGTH);
    while (index < len) this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries() {
      return arrayEntries.call(validate(this));
    },
    keys: function keys() {
      return arrayKeys.call(validate(this));
    },
    values: function values() {
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function (target, key) {
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key) {
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc) {
    if (isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ) {
      target[key] = desc.value;
      return target;
    } return dP(target, key, desc);
  };

  if (!ALL_CONSTRUCTORS) {
    $GOPD.f = $getDesc;
    $DP.f = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty: $setDesc
  });

  if (fails(function () { arrayToString.call({}); })) {
    arrayToString = arrayToLocaleString = function toString() {
      return arrayJoin.call(this);
    };
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice: $slice,
    set: $set,
    constructor: function () { /* noop */ },
    toString: arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function () { return this[TYPED_ARRAY]; }
  });

  // eslint-disable-next-line max-statements
  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
    CLAMPED = !!CLAMPED;
    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + KEY;
    var SETTER = 'set' + KEY;
    var TypedArray = global[NAME];
    var Base = TypedArray || {};
    var TAC = TypedArray && getPrototypeOf(TypedArray);
    var FORCED = !TypedArray || !$typed.ABV;
    var O = {};
    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function (that, index) {
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function (that, index, value) {
      var data = that._d;
      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function (that, index) {
      dP(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if (FORCED) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME, '_d');
        var index = 0;
        var offset = 0;
        var buffer, byteLength, length, klass;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new $ArrayBuffer(byteLength);
        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (TYPED_ARRAY in data) {
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if (!fails(function () {
      TypedArray(1);
    }) || !fails(function () {
      new TypedArray(-1); // eslint-disable-line no-new
    }) || !$iterDetect(function (iter) {
      new TypedArray(); // eslint-disable-line no-new
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(1.5); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if (!isObject(data)) return new Base(toIndex(data));
        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator = TypedArrayPrototype[ITERATOR];
    var CORRECT_ITER_NAME = !!$nativeIterator
      && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
    var $iterator = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
      dP(TypedArrayPrototype, TAG, {
        get: function () { return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES
    });

    $export($export.S + $export.F * fails(function () { Base.of.call(TypedArray, 1); }), NAME, {
      from: $from,
      of: $of
    });

    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

    $export($export.P + $export.F * fails(function () {
      new TypedArray(1).slice();
    }), NAME, { slice: $slice });

    $export($export.P + $export.F * (fails(function () {
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
    }) || !fails(function () {
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, { toLocaleString: $toLocaleString });

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function () { /* empty */ };

},{"./_descriptors":"../node_modules/core-js/modules/_descriptors.js","./_library":"../node_modules/core-js/modules/_library.js","./_global":"../node_modules/core-js/modules/_global.js","./_fails":"../node_modules/core-js/modules/_fails.js","./_export":"../node_modules/core-js/modules/_export.js","./_typed":"../node_modules/core-js/modules/_typed.js","./_typed-buffer":"../node_modules/core-js/modules/_typed-buffer.js","./_ctx":"../node_modules/core-js/modules/_ctx.js","./_an-instance":"../node_modules/core-js/modules/_an-instance.js","./_property-desc":"../node_modules/core-js/modules/_property-desc.js","./_hide":"../node_modules/core-js/modules/_hide.js","./_redefine-all":"../node_modules/core-js/modules/_redefine-all.js","./_to-integer":"../node_modules/core-js/modules/_to-integer.js","./_to-length":"../node_modules/core-js/modules/_to-length.js","./_to-index":"../node_modules/core-js/modules/_to-index.js","./_to-absolute-index":"../node_modules/core-js/modules/_to-absolute-index.js","./_to-primitive":"../node_modules/core-js/modules/_to-primitive.js","./_has":"../node_modules/core-js/modules/_has.js","./_classof":"../node_modules/core-js/modules/_classof.js","./_is-object":"../node_modules/core-js/modules/_is-object.js","./_to-object":"../node_modules/core-js/modules/_to-object.js","./_is-array-iter":"../node_modules/core-js/modules/_is-array-iter.js","./_object-create":"../node_modules/core-js/modules/_object-create.js","./_object-gpo":"../node_modules/core-js/modules/_object-gpo.js","./_object-gopn":"../node_modules/core-js/modules/_object-gopn.js","./core.get-iterator-method":"../node_modules/core-js/modules/core.get-iterator-method.js","./_uid":"../node_modules/core-js/modules/_uid.js","./_wks":"../node_modules/core-js/modules/_wks.js","./_array-methods":"../node_modules/core-js/modules/_array-methods.js","./_array-includes":"../node_modules/core-js/modules/_array-includes.js","./_species-constructor":"../node_modules/core-js/modules/_species-constructor.js","./es6.array.iterator":"../node_modules/core-js/modules/es6.array.iterator.js","./_iterators":"../node_modules/core-js/modules/_iterators.js","./_iter-detect":"../node_modules/core-js/modules/_iter-detect.js","./_set-species":"../node_modules/core-js/modules/_set-species.js","./_array-fill":"../node_modules/core-js/modules/_array-fill.js","./_array-copy-within":"../node_modules/core-js/modules/_array-copy-within.js","./_object-dp":"../node_modules/core-js/modules/_object-dp.js","./_object-gopd":"../node_modules/core-js/modules/_object-gopd.js"}],"../node_modules/core-js/modules/es6.typed.int8-array.js":[function(require,module,exports) {
require('./_typed-array')('Int8', 1, function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"../node_modules/core-js/modules/_typed-array.js"}],"../node_modules/core-js/modules/es6.typed.uint8-array.js":[function(require,module,exports) {
require('./_typed-array')('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"../node_modules/core-js/modules/_typed-array.js"}],"../node_modules/core-js/modules/es6.typed.uint8-clamped-array.js":[function(require,module,exports) {
require('./_typed-array')('Uint8', 1, function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);

},{"./_typed-array":"../node_modules/core-js/modules/_typed-array.js"}],"../node_modules/core-js/modules/es6.typed.int16-array.js":[function(require,module,exports) {
require('./_typed-array')('Int16', 2, function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"../node_modules/core-js/modules/_typed-array.js"}],"../node_modules/core-js/modules/es6.typed.uint16-array.js":[function(require,module,exports) {
require('./_typed-array')('Uint16', 2, function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"../node_modules/core-js/modules/_typed-array.js"}],"../node_modules/core-js/modules/es6.typed.int32-array.js":[function(require,module,exports) {
require('./_typed-array')('Int32', 4, function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"../node_modules/core-js/modules/_typed-array.js"}],"../node_modules/core-js/modules/es6.typed.uint32-array.js":[function(require,module,exports) {
require('./_typed-array')('Uint32', 4, function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"../node_modules/core-js/modules/_typed-array.js"}],"../node_modules/core-js/modules/es6.typed.float32-array.js":[function(require,module,exports) {
require('./_typed-array')('Float32', 4, function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"../node_modules/core-js/modules/_typed-array.js"}],"../node_modules/core-js/modules/es6.typed.float64-array.js":[function(require,module,exports) {
require('./_typed-array')('Float64', 8, function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"../node_modules/core-js/modules/_typed-array.js"}],"../node_modules/core-js/modules/_collection-weak.js":[function(require,module,exports) {
'use strict';
var redefineAll = require('./_redefine-all');
var getWeak = require('./_meta').getWeak;
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var anInstance = require('./_an-instance');
var forOf = require('./_for-of');
var createArrayMethod = require('./_array-methods');
var $has = require('./_has');
var validate = require('./_validate-collection');
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.a = [];
};
var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;      // collection type
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};

},{"./_redefine-all":"../node_modules/core-js/modules/_redefine-all.js","./_meta":"../node_modules/core-js/modules/_meta.js","./_an-object":"../node_modules/core-js/modules/_an-object.js","./_is-object":"../node_modules/core-js/modules/_is-object.js","./_an-instance":"../node_modules/core-js/modules/_an-instance.js","./_for-of":"../node_modules/core-js/modules/_for-of.js","./_array-methods":"../node_modules/core-js/modules/_array-methods.js","./_has":"../node_modules/core-js/modules/_has.js","./_validate-collection":"../node_modules/core-js/modules/_validate-collection.js"}],"../node_modules/core-js/modules/es6.weak-map.js":[function(require,module,exports) {

'use strict';
var global = require('./_global');
var each = require('./_array-methods')(0);
var redefine = require('./_redefine');
var meta = require('./_meta');
var assign = require('./_object-assign');
var weak = require('./_collection-weak');
var isObject = require('./_is-object');
var validate = require('./_validate-collection');
var NATIVE_WEAK_MAP = require('./_validate-collection');
var IS_IE11 = !global.ActiveXObject && 'ActiveXObject' in global;
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var InternalMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = require('./_collection')(WEAK_MAP, wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if (NATIVE_WEAK_MAP && IS_IE11) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}

},{"./_global":"../node_modules/core-js/modules/_global.js","./_array-methods":"../node_modules/core-js/modules/_array-methods.js","./_redefine":"../node_modules/core-js/modules/_redefine.js","./_meta":"../node_modules/core-js/modules/_meta.js","./_object-assign":"../node_modules/core-js/modules/_object-assign.js","./_collection-weak":"../node_modules/core-js/modules/_collection-weak.js","./_is-object":"../node_modules/core-js/modules/_is-object.js","./_validate-collection":"../node_modules/core-js/modules/_validate-collection.js","./_collection":"../node_modules/core-js/modules/_collection.js"}],"../node_modules/core-js/modules/es6.weak-set.js":[function(require,module,exports) {
'use strict';
var weak = require('./_collection-weak');
var validate = require('./_validate-collection');
var WEAK_SET = 'WeakSet';

// 23.4 WeakSet Objects
require('./_collection')(WEAK_SET, function (get) {
  return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value) {
    return weak.def(validate(this, WEAK_SET), value, true);
  }
}, weak, false, true);

},{"./_collection-weak":"../node_modules/core-js/modules/_collection-weak.js","./_validate-collection":"../node_modules/core-js/modules/_validate-collection.js","./_collection":"../node_modules/core-js/modules/_collection.js"}],"../node_modules/core-js/modules/_flatten-into-array.js":[function(require,module,exports) {
'use strict';
// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
var isArray = require('./_is-array');
var isObject = require('./_is-object');
var toLength = require('./_to-length');
var ctx = require('./_ctx');
var IS_CONCAT_SPREADABLE = require('./_wks')('isConcatSpreadable');

function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? ctx(mapper, thisArg, 3) : false;
  var element, spreadable;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      spreadable = false;
      if (isObject(element)) {
        spreadable = element[IS_CONCAT_SPREADABLE];
        spreadable = spreadable !== undefined ? !!spreadable : isArray(element);
      }

      if (spreadable && depth > 0) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
}

module.exports = flattenIntoArray;

},{"./_is-array":"../node_modules/core-js/modules/_is-array.js","./_is-object":"../node_modules/core-js/modules/_is-object.js","./_to-length":"../node_modules/core-js/modules/_to-length.js","./_ctx":"../node_modules/core-js/modules/_ctx.js","./_wks":"../node_modules/core-js/modules/_wks.js"}],"../node_modules/core-js/modules/es7.array.flat-map.js":[function(require,module,exports) {
'use strict';
// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap
var $export = require('./_export');
var flattenIntoArray = require('./_flatten-into-array');
var toObject = require('./_to-object');
var toLength = require('./_to-length');
var aFunction = require('./_a-function');
var arraySpeciesCreate = require('./_array-species-create');

$export($export.P, 'Array', {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen, A;
    aFunction(callbackfn);
    sourceLen = toLength(O.length);
    A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
    return A;
  }
});

require('./_add-to-unscopables')('flatMap');

},{"./_export":"../node_modules/core-js/modules/_export.js","./_flatten-into-array":"../node_modules/core-js/modules/_flatten-into-array.js","./_to-object":"../node_modules/core-js/modules/_to-object.js","./_to-length":"../node_modules/core-js/modules/_to-length.js","./_a-function":"../node_modules/core-js/modules/_a-function.js","./_array-species-create":"../node_modules/core-js/modules/_array-species-create.js","./_add-to-unscopables":"../node_modules/core-js/modules/_add-to-unscopables.js"}],"../node_modules/core-js/modules/web.timers.js":[function(require,module,exports) {

// ie9- setTimeout & setInterval additional parameters fix
var global = require('./_global');
var $export = require('./_export');
var userAgent = require('./_user-agent');
var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check
var wrap = function (set) {
  return function (fn, time /* , ...args */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : false;
    return set(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
    } : fn, time);
  };
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout: wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});

},{"./_global":"../node_modules/core-js/modules/_global.js","./_export":"../node_modules/core-js/modules/_export.js","./_user-agent":"../node_modules/core-js/modules/_user-agent.js"}],"../node_modules/core-js/modules/web.immediate.js":[function(require,module,exports) {
var $export = require('./_export');
var $task = require('./_task');
$export($export.G + $export.B, {
  setImmediate: $task.set,
  clearImmediate: $task.clear
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_task":"../node_modules/core-js/modules/_task.js"}],"../node_modules/core-js/modules/web.dom.iterable.js":[function(require,module,exports) {

var $iterators = require('./es6.array.iterator');
var getKeys = require('./_object-keys');
var redefine = require('./_redefine');
var global = require('./_global');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var wks = require('./_wks');
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}

},{"./es6.array.iterator":"../node_modules/core-js/modules/es6.array.iterator.js","./_object-keys":"../node_modules/core-js/modules/_object-keys.js","./_redefine":"../node_modules/core-js/modules/_redefine.js","./_global":"../node_modules/core-js/modules/_global.js","./_hide":"../node_modules/core-js/modules/_hide.js","./_iterators":"../node_modules/core-js/modules/_iterators.js","./_wks":"../node_modules/core-js/modules/_wks.js"}],"../node_modules/regenerator-runtime/runtime.js":[function(require,module,exports) {
var global = arguments[3];
/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof global.process === "object" && global.process.domain) {
      invoke = global.process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

},{}],"../../../AppData/Local/Yarn/Data/global/node_modules/process/browser.js":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};
},{}],"../node_modules/jquery/dist/jquery.js":[function(require,module,exports) {
var global = arguments[3];
var process = require("process");
var define;
/*!
 * jQuery JavaScript Library v3.3.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2018-01-20T17:24Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isFunction = function isFunction( obj ) {

      // Support: Chrome <=57, Firefox <=52
      // In some browsers, typeof returns "function" for HTML <object> elements
      // (i.e., `typeof document.createElement( "object" ) === "function"`).
      // We don't want to classify *any* DOM node as a function.
      return typeof obj === "function" && typeof obj.nodeType !== "number";
  };


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};




	var preservedScriptAttributes = {
		type: true,
		src: true,
		noModule: true
	};

	function DOMEval( code, doc, node ) {
		doc = doc || document;

		var i,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {
				if ( node[ i ] ) {
					script[ i ] = node[ i ];
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.3.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
        if ( nodeName( elem, "iframe" ) ) {
            return elem.contentDocument;
        }

        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
        // Treat the template element as a regular one in browsers that
        // don't support it.
        if ( nodeName( elem, "template" ) ) {
            elem = elem.content || elem;
        }

        return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( all, letter ) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (#9572)
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( camelCase );
			} else {
				key = camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted, scale,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Support: Firefox <=54
		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
		initial = initial / 2;

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		while ( maxIterations-- ) {

			// Evaluate and update our best guess (doubling guesses that zero out).
			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( toType( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || Date.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc, node );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Some styles come back with percentage values, even though they shouldn't
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Support: IE 9 - 11 only
		// Detect misreporting of content dimensions for box-sizing:border-box elements
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Support: IE 9 only
		// Detect overflow:scroll screwiness (gh-3699)
		div.style.position = "absolute";
		scrollboxSizeVal = div.offsetWidth === 36 || "absolute";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	function roundPixelMeasures( measure ) {
		return Math.round( parseFloat( measure ) );
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend( support, {
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function() {
			computeStyleTests();
			return pixelBoxStylesVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		},
		scrollboxSize: function() {
			computeStyleTests();
			return scrollboxSizeVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
function finalPropName( name ) {
	var ret = jQuery.cssProps[ name ];
	if ( !ret ) {
		ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
	}
	return ret;
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		if ( box === "margin" ) {
			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5
		) );
	}

	return delta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),
		val = curCSS( elem, dimension, styles ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox;

	// Support: Firefox <=54
	// Return a confounding non-pixel value or feign ignorance, as appropriate.
	if ( rnumnonpx.test( val ) ) {
		if ( !extra ) {
			return val;
		}
		val = "auto";
	}

	// Check for style in case a browser which returns unreliable values
	// for getComputedStyle silently falls back to the reliable elem.style
	valueIsBorderBox = valueIsBorderBox &&
		( support.boxSizingReliable() || val === elem.style[ dimension ] );

	// Fall back to offsetWidth/offsetHeight when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	// Support: Android <=4.1 - 4.3 only
	// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
	if ( val === "auto" ||
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) {

		val = elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ];

		// offsetWidth/offsetHeight provide border-box values
		valueIsBorderBox = true;
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, dimension, extra );
						} ) :
						getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),
				isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra && boxModelAdjustment(
					elem,
					dimension,
					extra,
					isBorderBox,
					styles
				);

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && support.scrollboxSize() === styles.position ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( prefix !== "margin" ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = Date.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 15
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY and Edge just mirrors
		// the overflowX value there.
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = Date.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		return value.match( rnothtmlwhite ) || [];
	}
	return [];
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( isValidValue ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = classesToArray( value );

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		valueIsFunction = isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( valueIsFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


support.focusin = "onfocusin" in window;


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = Date.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && toType( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 15
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available and should be processed, append data to url
			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) {
		return undefined;
	}

	// Simulated bind
	args = slice.call( arguments, 2 );
	proxy = function() {
		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
	};

	// Set the guid of unique handler to the same of original handler, so it can be removed
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	return proxy;
};

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );

},{"process":"../../../AppData/Local/Yarn/Data/global/node_modules/process/browser.js"}],"../node_modules/leancloud-storage/dist/av-min.js":[function(require,module,exports) {
var define;
var process = require("process");
!function (t, e) {
  "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.AV = e() : t.AV = e();
}("undefined" != typeof self ? self : this, function () {
  return function (t) {
    function e(r) {
      if (n[r]) return n[r].exports;
      var i = n[r] = {
        i: r,
        l: !1,
        exports: {}
      };
      return t[r].call(i.exports, i, i.exports, e), i.l = !0, i.exports;
    }

    var n = {};
    return e.m = t, e.c = n, e.d = function (t, n, r) {
      e.o(t, n) || Object.defineProperty(t, n, {
        configurable: !1,
        enumerable: !0,
        get: r
      });
    }, e.n = function (t) {
      var n = t && t.__esModule ? function () {
        return t.default;
      } : function () {
        return t;
      };
      return e.d(n, "a", n), n;
    }, e.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }, e.p = "", e(e.s = 15);
  }([function (t, e, n) {
    (function (t, n) {
      var r, i;
      !function () {
        var s = "object" == typeof self && self.self === self && self || "object" == typeof t && t.global === t && t || this || {},
            o = s._,
            a = Array.prototype,
            u = Object.prototype,
            c = "undefined" != typeof Symbol ? Symbol.prototype : null,
            l = a.push,
            h = a.slice,
            f = u.toString,
            d = u.hasOwnProperty,
            p = Array.isArray,
            _ = Object.keys,
            v = Object.create,
            y = function () {},
            m = function (t) {
          return t instanceof m ? t : this instanceof m ? void (this._wrapped = t) : new m(t);
        };

        void 0 === e || e.nodeType ? s._ = m : (void 0 !== n && !n.nodeType && n.exports && (e = n.exports = m), e._ = m), m.VERSION = "1.9.1";

        var g,
            b = function (t, e, n) {
          if (void 0 === e) return t;

          switch (null == n ? 3 : n) {
            case 1:
              return function (n) {
                return t.call(e, n);
              };

            case 3:
              return function (n, r, i) {
                return t.call(e, n, r, i);
              };

            case 4:
              return function (n, r, i, s) {
                return t.call(e, n, r, i, s);
              };
          }

          return function () {
            return t.apply(e, arguments);
          };
        },
            w = function (t, e, n) {
          return m.iteratee !== g ? m.iteratee(t, e) : null == t ? m.identity : m.isFunction(t) ? b(t, e, n) : m.isObject(t) && !m.isArray(t) ? m.matcher(t) : m.property(t);
        };

        m.iteratee = g = function (t, e) {
          return w(t, e, 1 / 0);
        };

        var O = function (t, e) {
          return e = null == e ? t.length - 1 : +e, function () {
            for (var n = Math.max(arguments.length - e, 0), r = Array(n), i = 0; i < n; i++) r[i] = arguments[i + e];

            switch (e) {
              case 0:
                return t.call(this, r);

              case 1:
                return t.call(this, arguments[0], r);

              case 2:
                return t.call(this, arguments[0], arguments[1], r);
            }

            var s = Array(e + 1);

            for (i = 0; i < e; i++) s[i] = arguments[i];

            return s[e] = r, t.apply(this, s);
          };
        },
            A = function (t) {
          if (!m.isObject(t)) return {};
          if (v) return v(t);
          y.prototype = t;
          var e = new y();
          return y.prototype = null, e;
        },
            S = function (t) {
          return function (e) {
            return null == e ? void 0 : e[t];
          };
        },
            C = function (t, e) {
          return null != t && d.call(t, e);
        },
            E = function (t, e) {
          for (var n = e.length, r = 0; r < n; r++) {
            if (null == t) return;
            t = t[e[r]];
          }

          return n ? t : void 0;
        },
            T = Math.pow(2, 53) - 1,
            N = S("length"),
            j = function (t) {
          var e = N(t);
          return "number" == typeof e && e >= 0 && e <= T;
        };

        m.each = m.forEach = function (t, e, n) {
          e = b(e, n);
          var r, i;
          if (j(t)) for (r = 0, i = t.length; r < i; r++) e(t[r], r, t);else {
            var s = m.keys(t);

            for (r = 0, i = s.length; r < i; r++) e(t[s[r]], s[r], t);
          }
          return t;
        }, m.map = m.collect = function (t, e, n) {
          e = w(e, n);

          for (var r = !j(t) && m.keys(t), i = (r || t).length, s = Array(i), o = 0; o < i; o++) {
            var a = r ? r[o] : o;
            s[o] = e(t[a], a, t);
          }

          return s;
        };

        var x = function (t) {
          var e = function (e, n, r, i) {
            var s = !j(e) && m.keys(e),
                o = (s || e).length,
                a = t > 0 ? 0 : o - 1;

            for (i || (r = e[s ? s[a] : a], a += t); a >= 0 && a < o; a += t) {
              var u = s ? s[a] : a;
              r = n(r, e[u], u, e);
            }

            return r;
          };

          return function (t, n, r, i) {
            var s = arguments.length >= 3;
            return e(t, b(n, i, 4), r, s);
          };
        };

        m.reduce = m.foldl = m.inject = x(1), m.reduceRight = m.foldr = x(-1), m.find = m.detect = function (t, e, n) {
          var r = j(t) ? m.findIndex : m.findKey,
              i = r(t, e, n);
          if (void 0 !== i && -1 !== i) return t[i];
        }, m.filter = m.select = function (t, e, n) {
          var r = [];
          return e = w(e, n), m.each(t, function (t, n, i) {
            e(t, n, i) && r.push(t);
          }), r;
        }, m.reject = function (t, e, n) {
          return m.filter(t, m.negate(w(e)), n);
        }, m.every = m.all = function (t, e, n) {
          e = w(e, n);

          for (var r = !j(t) && m.keys(t), i = (r || t).length, s = 0; s < i; s++) {
            var o = r ? r[s] : s;
            if (!e(t[o], o, t)) return !1;
          }

          return !0;
        }, m.some = m.any = function (t, e, n) {
          e = w(e, n);

          for (var r = !j(t) && m.keys(t), i = (r || t).length, s = 0; s < i; s++) {
            var o = r ? r[s] : s;
            if (e(t[o], o, t)) return !0;
          }

          return !1;
        }, m.contains = m.includes = m.include = function (t, e, n, r) {
          return j(t) || (t = m.values(t)), ("number" != typeof n || r) && (n = 0), m.indexOf(t, e, n) >= 0;
        }, m.invoke = O(function (t, e, n) {
          var r, i;
          return m.isFunction(e) ? i = e : m.isArray(e) && (r = e.slice(0, -1), e = e[e.length - 1]), m.map(t, function (t) {
            var s = i;

            if (!s) {
              if (r && r.length && (t = E(t, r)), null == t) return;
              s = t[e];
            }

            return null == s ? s : s.apply(t, n);
          });
        }), m.pluck = function (t, e) {
          return m.map(t, m.property(e));
        }, m.where = function (t, e) {
          return m.filter(t, m.matcher(e));
        }, m.findWhere = function (t, e) {
          return m.find(t, m.matcher(e));
        }, m.max = function (t, e, n) {
          var r,
              i,
              s = -1 / 0,
              o = -1 / 0;

          if (null == e || "number" == typeof e && "object" != typeof t[0] && null != t) {
            t = j(t) ? t : m.values(t);

            for (var a = 0, u = t.length; a < u; a++) null != (r = t[a]) && r > s && (s = r);
          } else e = w(e, n), m.each(t, function (t, n, r) {
            ((i = e(t, n, r)) > o || i === -1 / 0 && s === -1 / 0) && (s = t, o = i);
          });

          return s;
        }, m.min = function (t, e, n) {
          var r,
              i,
              s = 1 / 0,
              o = 1 / 0;

          if (null == e || "number" == typeof e && "object" != typeof t[0] && null != t) {
            t = j(t) ? t : m.values(t);

            for (var a = 0, u = t.length; a < u; a++) null != (r = t[a]) && r < s && (s = r);
          } else e = w(e, n), m.each(t, function (t, n, r) {
            ((i = e(t, n, r)) < o || i === 1 / 0 && s === 1 / 0) && (s = t, o = i);
          });

          return s;
        }, m.shuffle = function (t) {
          return m.sample(t, 1 / 0);
        }, m.sample = function (t, e, n) {
          if (null == e || n) return j(t) || (t = m.values(t)), t[m.random(t.length - 1)];
          var r = j(t) ? m.clone(t) : m.values(t),
              i = N(r);
          e = Math.max(Math.min(e, i), 0);

          for (var s = i - 1, o = 0; o < e; o++) {
            var a = m.random(o, s),
                u = r[o];
            r[o] = r[a], r[a] = u;
          }

          return r.slice(0, e);
        }, m.sortBy = function (t, e, n) {
          var r = 0;
          return e = w(e, n), m.pluck(m.map(t, function (t, n, i) {
            return {
              value: t,
              index: r++,
              criteria: e(t, n, i)
            };
          }).sort(function (t, e) {
            var n = t.criteria,
                r = e.criteria;

            if (n !== r) {
              if (n > r || void 0 === n) return 1;
              if (n < r || void 0 === r) return -1;
            }

            return t.index - e.index;
          }), "value");
        };

        var U = function (t, e) {
          return function (n, r, i) {
            var s = e ? [[], []] : {};
            return r = w(r, i), m.each(n, function (e, i) {
              var o = r(e, i, n);
              t(s, e, o);
            }), s;
          };
        };

        m.groupBy = U(function (t, e, n) {
          C(t, n) ? t[n].push(e) : t[n] = [e];
        }), m.indexBy = U(function (t, e, n) {
          t[n] = e;
        }), m.countBy = U(function (t, e, n) {
          C(t, n) ? t[n]++ : t[n] = 1;
        });
        var k = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
        m.toArray = function (t) {
          return t ? m.isArray(t) ? h.call(t) : m.isString(t) ? t.match(k) : j(t) ? m.map(t, m.identity) : m.values(t) : [];
        }, m.size = function (t) {
          return null == t ? 0 : j(t) ? t.length : m.keys(t).length;
        }, m.partition = U(function (t, e, n) {
          t[n ? 0 : 1].push(e);
        }, !0), m.first = m.head = m.take = function (t, e, n) {
          return null == t || t.length < 1 ? null == e ? void 0 : [] : null == e || n ? t[0] : m.initial(t, t.length - e);
        }, m.initial = function (t, e, n) {
          return h.call(t, 0, Math.max(0, t.length - (null == e || n ? 1 : e)));
        }, m.last = function (t, e, n) {
          return null == t || t.length < 1 ? null == e ? void 0 : [] : null == e || n ? t[t.length - 1] : m.rest(t, Math.max(0, t.length - e));
        }, m.rest = m.tail = m.drop = function (t, e, n) {
          return h.call(t, null == e || n ? 1 : e);
        }, m.compact = function (t) {
          return m.filter(t, Boolean);
        };

        var I = function (t, e, n, r) {
          r = r || [];

          for (var i = r.length, s = 0, o = N(t); s < o; s++) {
            var a = t[s];
            if (j(a) && (m.isArray(a) || m.isArguments(a))) {
              if (e) for (var u = 0, c = a.length; u < c;) r[i++] = a[u++];else I(a, e, n, r), i = r.length;
            } else n || (r[i++] = a);
          }

          return r;
        };

        m.flatten = function (t, e) {
          return I(t, e, !1);
        }, m.without = O(function (t, e) {
          return m.difference(t, e);
        }), m.uniq = m.unique = function (t, e, n, r) {
          m.isBoolean(e) || (r = n, n = e, e = !1), null != n && (n = w(n, r));

          for (var i = [], s = [], o = 0, a = N(t); o < a; o++) {
            var u = t[o],
                c = n ? n(u, o, t) : u;
            e && !n ? (o && s === c || i.push(u), s = c) : n ? m.contains(s, c) || (s.push(c), i.push(u)) : m.contains(i, u) || i.push(u);
          }

          return i;
        }, m.union = O(function (t) {
          return m.uniq(I(t, !0, !0));
        }), m.intersection = function (t) {
          for (var e = [], n = arguments.length, r = 0, i = N(t); r < i; r++) {
            var s = t[r];

            if (!m.contains(e, s)) {
              var o;

              for (o = 1; o < n && m.contains(arguments[o], s); o++);

              o === n && e.push(s);
            }
          }

          return e;
        }, m.difference = O(function (t, e) {
          return e = I(e, !0, !0), m.filter(t, function (t) {
            return !m.contains(e, t);
          });
        }), m.unzip = function (t) {
          for (var e = t && m.max(t, N).length || 0, n = Array(e), r = 0; r < e; r++) n[r] = m.pluck(t, r);

          return n;
        }, m.zip = O(m.unzip), m.object = function (t, e) {
          for (var n = {}, r = 0, i = N(t); r < i; r++) e ? n[t[r]] = e[r] : n[t[r][0]] = t[r][1];

          return n;
        };

        var R = function (t) {
          return function (e, n, r) {
            n = w(n, r);

            for (var i = N(e), s = t > 0 ? 0 : i - 1; s >= 0 && s < i; s += t) if (n(e[s], s, e)) return s;

            return -1;
          };
        };

        m.findIndex = R(1), m.findLastIndex = R(-1), m.sortedIndex = function (t, e, n, r) {
          n = w(n, r, 1);

          for (var i = n(e), s = 0, o = N(t); s < o;) {
            var a = Math.floor((s + o) / 2);
            n(t[a]) < i ? s = a + 1 : o = a;
          }

          return s;
        };

        var D = function (t, e, n) {
          return function (r, i, s) {
            var o = 0,
                a = N(r);
            if ("number" == typeof s) t > 0 ? o = s >= 0 ? s : Math.max(s + a, o) : a = s >= 0 ? Math.min(s + 1, a) : s + a + 1;else if (n && s && a) return s = n(r, i), r[s] === i ? s : -1;
            if (i !== i) return s = e(h.call(r, o, a), m.isNaN), s >= 0 ? s + o : -1;

            for (s = t > 0 ? o : a - 1; s >= 0 && s < a; s += t) if (r[s] === i) return s;

            return -1;
          };
        };

        m.indexOf = D(1, m.findIndex, m.sortedIndex), m.lastIndexOf = D(-1, m.findLastIndex), m.range = function (t, e, n) {
          null == e && (e = t || 0, t = 0), n || (n = e < t ? -1 : 1);

          for (var r = Math.max(Math.ceil((e - t) / n), 0), i = Array(r), s = 0; s < r; s++, t += n) i[s] = t;

          return i;
        }, m.chunk = function (t, e) {
          if (null == e || e < 1) return [];

          for (var n = [], r = 0, i = t.length; r < i;) n.push(h.call(t, r, r += e));

          return n;
        };

        var P = function (t, e, n, r, i) {
          if (!(r instanceof e)) return t.apply(n, i);
          var s = A(t.prototype),
              o = t.apply(s, i);
          return m.isObject(o) ? o : s;
        };

        m.bind = O(function (t, e, n) {
          if (!m.isFunction(t)) throw new TypeError("Bind must be called on a function");
          var r = O(function (i) {
            return P(t, r, e, this, n.concat(i));
          });
          return r;
        }), m.partial = O(function (t, e) {
          var n = m.partial.placeholder,
              r = function () {
            for (var i = 0, s = e.length, o = Array(s), a = 0; a < s; a++) o[a] = e[a] === n ? arguments[i++] : e[a];

            for (; i < arguments.length;) o.push(arguments[i++]);

            return P(t, r, this, this, o);
          };

          return r;
        }), m.partial.placeholder = m, m.bindAll = O(function (t, e) {
          e = I(e, !1, !1);
          var n = e.length;
          if (n < 1) throw new Error("bindAll must be passed function names");

          for (; n--;) {
            var r = e[n];
            t[r] = m.bind(t[r], t);
          }
        }), m.memoize = function (t, e) {
          var n = function (r) {
            var i = n.cache,
                s = "" + (e ? e.apply(this, arguments) : r);
            return C(i, s) || (i[s] = t.apply(this, arguments)), i[s];
          };

          return n.cache = {}, n;
        }, m.delay = O(function (t, e, n) {
          return setTimeout(function () {
            return t.apply(null, n);
          }, e);
        }), m.defer = m.partial(m.delay, m, 1), m.throttle = function (t, e, n) {
          var r,
              i,
              s,
              o,
              a = 0;
          n || (n = {});

          var u = function () {
            a = !1 === n.leading ? 0 : m.now(), r = null, o = t.apply(i, s), r || (i = s = null);
          },
              c = function () {
            var c = m.now();
            a || !1 !== n.leading || (a = c);
            var l = e - (c - a);
            return i = this, s = arguments, l <= 0 || l > e ? (r && (clearTimeout(r), r = null), a = c, o = t.apply(i, s), r || (i = s = null)) : r || !1 === n.trailing || (r = setTimeout(u, l)), o;
          };

          return c.cancel = function () {
            clearTimeout(r), a = 0, r = i = s = null;
          }, c;
        }, m.debounce = function (t, e, n) {
          var r,
              i,
              s = function (e, n) {
            r = null, n && (i = t.apply(e, n));
          },
              o = O(function (o) {
            if (r && clearTimeout(r), n) {
              var a = !r;
              r = setTimeout(s, e), a && (i = t.apply(this, o));
            } else r = m.delay(s, e, this, o);

            return i;
          });

          return o.cancel = function () {
            clearTimeout(r), r = null;
          }, o;
        }, m.wrap = function (t, e) {
          return m.partial(e, t);
        }, m.negate = function (t) {
          return function () {
            return !t.apply(this, arguments);
          };
        }, m.compose = function () {
          var t = arguments,
              e = t.length - 1;
          return function () {
            for (var n = e, r = t[e].apply(this, arguments); n--;) r = t[n].call(this, r);

            return r;
          };
        }, m.after = function (t, e) {
          return function () {
            if (--t < 1) return e.apply(this, arguments);
          };
        }, m.before = function (t, e) {
          var n;
          return function () {
            return --t > 0 && (n = e.apply(this, arguments)), t <= 1 && (e = null), n;
          };
        }, m.once = m.partial(m.before, 2), m.restArguments = O;

        var L = !{
          toString: null
        }.propertyIsEnumerable("toString"),
            F = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"],
            q = function (t, e) {
          var n = F.length,
              r = t.constructor,
              i = m.isFunction(r) && r.prototype || u,
              s = "constructor";

          for (C(t, s) && !m.contains(e, s) && e.push(s); n--;) (s = F[n]) in t && t[s] !== i[s] && !m.contains(e, s) && e.push(s);
        };

        m.keys = function (t) {
          if (!m.isObject(t)) return [];
          if (_) return _(t);
          var e = [];

          for (var n in t) C(t, n) && e.push(n);

          return L && q(t, e), e;
        }, m.allKeys = function (t) {
          if (!m.isObject(t)) return [];
          var e = [];

          for (var n in t) e.push(n);

          return L && q(t, e), e;
        }, m.values = function (t) {
          for (var e = m.keys(t), n = e.length, r = Array(n), i = 0; i < n; i++) r[i] = t[e[i]];

          return r;
        }, m.mapObject = function (t, e, n) {
          e = w(e, n);

          for (var r = m.keys(t), i = r.length, s = {}, o = 0; o < i; o++) {
            var a = r[o];
            s[a] = e(t[a], a, t);
          }

          return s;
        }, m.pairs = function (t) {
          for (var e = m.keys(t), n = e.length, r = Array(n), i = 0; i < n; i++) r[i] = [e[i], t[e[i]]];

          return r;
        }, m.invert = function (t) {
          for (var e = {}, n = m.keys(t), r = 0, i = n.length; r < i; r++) e[t[n[r]]] = n[r];

          return e;
        }, m.functions = m.methods = function (t) {
          var e = [];

          for (var n in t) m.isFunction(t[n]) && e.push(n);

          return e.sort();
        };

        var M = function (t, e) {
          return function (n) {
            var r = arguments.length;
            if (e && (n = Object(n)), r < 2 || null == n) return n;

            for (var i = 1; i < r; i++) for (var s = arguments[i], o = t(s), a = o.length, u = 0; u < a; u++) {
              var c = o[u];
              e && void 0 !== n[c] || (n[c] = s[c]);
            }

            return n;
          };
        };

        m.extend = M(m.allKeys), m.extendOwn = m.assign = M(m.keys), m.findKey = function (t, e, n) {
          e = w(e, n);

          for (var r, i = m.keys(t), s = 0, o = i.length; s < o; s++) if (r = i[s], e(t[r], r, t)) return r;
        };

        var B = function (t, e, n) {
          return e in n;
        };

        m.pick = O(function (t, e) {
          var n = {},
              r = e[0];
          if (null == t) return n;
          m.isFunction(r) ? (e.length > 1 && (r = b(r, e[1])), e = m.allKeys(t)) : (r = B, e = I(e, !1, !1), t = Object(t));

          for (var i = 0, s = e.length; i < s; i++) {
            var o = e[i],
                a = t[o];
            r(a, o, t) && (n[o] = a);
          }

          return n;
        }), m.omit = O(function (t, e) {
          var n,
              r = e[0];
          return m.isFunction(r) ? (r = m.negate(r), e.length > 1 && (n = e[1])) : (e = m.map(I(e, !1, !1), String), r = function (t, n) {
            return !m.contains(e, n);
          }), m.pick(t, r, n);
        }), m.defaults = M(m.allKeys, !0), m.create = function (t, e) {
          var n = A(t);
          return e && m.extendOwn(n, e), n;
        }, m.clone = function (t) {
          return m.isObject(t) ? m.isArray(t) ? t.slice() : m.extend({}, t) : t;
        }, m.tap = function (t, e) {
          return e(t), t;
        }, m.isMatch = function (t, e) {
          var n = m.keys(e),
              r = n.length;
          if (null == t) return !r;

          for (var i = Object(t), s = 0; s < r; s++) {
            var o = n[s];
            if (e[o] !== i[o] || !(o in i)) return !1;
          }

          return !0;
        };
        var W, J;
        W = function (t, e, n, r) {
          if (t === e) return 0 !== t || 1 / t == 1 / e;
          if (null == t || null == e) return !1;
          if (t !== t) return e !== e;
          var i = typeof t;
          return ("function" === i || "object" === i || "object" == typeof e) && J(t, e, n, r);
        }, J = function (t, e, n, r) {
          t instanceof m && (t = t._wrapped), e instanceof m && (e = e._wrapped);
          var i = f.call(t);
          if (i !== f.call(e)) return !1;

          switch (i) {
            case "[object RegExp]":
            case "[object String]":
              return "" + t == "" + e;

            case "[object Number]":
              return +t != +t ? +e != +e : 0 == +t ? 1 / +t == 1 / e : +t == +e;

            case "[object Date]":
            case "[object Boolean]":
              return +t == +e;

            case "[object Symbol]":
              return c.valueOf.call(t) === c.valueOf.call(e);
          }

          var s = "[object Array]" === i;

          if (!s) {
            if ("object" != typeof t || "object" != typeof e) return !1;
            var o = t.constructor,
                a = e.constructor;
            if (o !== a && !(m.isFunction(o) && o instanceof o && m.isFunction(a) && a instanceof a) && "constructor" in t && "constructor" in e) return !1;
          }

          n = n || [], r = r || [];

          for (var u = n.length; u--;) if (n[u] === t) return r[u] === e;

          if (n.push(t), r.push(e), s) {
            if ((u = t.length) !== e.length) return !1;

            for (; u--;) if (!W(t[u], e[u], n, r)) return !1;
          } else {
            var l,
                h = m.keys(t);
            if (u = h.length, m.keys(e).length !== u) return !1;

            for (; u--;) if (l = h[u], !C(e, l) || !W(t[l], e[l], n, r)) return !1;
          }

          return n.pop(), r.pop(), !0;
        }, m.isEqual = function (t, e) {
          return W(t, e);
        }, m.isEmpty = function (t) {
          return null == t || (j(t) && (m.isArray(t) || m.isString(t) || m.isArguments(t)) ? 0 === t.length : 0 === m.keys(t).length);
        }, m.isElement = function (t) {
          return !(!t || 1 !== t.nodeType);
        }, m.isArray = p || function (t) {
          return "[object Array]" === f.call(t);
        }, m.isObject = function (t) {
          var e = typeof t;
          return "function" === e || "object" === e && !!t;
        }, m.each(["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error", "Symbol", "Map", "WeakMap", "Set", "WeakSet"], function (t) {
          m["is" + t] = function (e) {
            return f.call(e) === "[object " + t + "]";
          };
        }), m.isArguments(arguments) || (m.isArguments = function (t) {
          return C(t, "callee");
        });
        var Q = s.document && s.document.childNodes;
        "function" != typeof /./ && "object" != typeof Int8Array && "function" != typeof Q && (m.isFunction = function (t) {
          return "function" == typeof t || !1;
        }), m.isFinite = function (t) {
          return !m.isSymbol(t) && isFinite(t) && !isNaN(parseFloat(t));
        }, m.isNaN = function (t) {
          return m.isNumber(t) && isNaN(t);
        }, m.isBoolean = function (t) {
          return !0 === t || !1 === t || "[object Boolean]" === f.call(t);
        }, m.isNull = function (t) {
          return null === t;
        }, m.isUndefined = function (t) {
          return void 0 === t;
        }, m.has = function (t, e) {
          if (!m.isArray(e)) return C(t, e);

          for (var n = e.length, r = 0; r < n; r++) {
            var i = e[r];
            if (null == t || !d.call(t, i)) return !1;
            t = t[i];
          }

          return !!n;
        }, m.noConflict = function () {
          return s._ = o, this;
        }, m.identity = function (t) {
          return t;
        }, m.constant = function (t) {
          return function () {
            return t;
          };
        }, m.noop = function () {}, m.property = function (t) {
          return m.isArray(t) ? function (e) {
            return E(e, t);
          } : S(t);
        }, m.propertyOf = function (t) {
          return null == t ? function () {} : function (e) {
            return m.isArray(e) ? E(t, e) : t[e];
          };
        }, m.matcher = m.matches = function (t) {
          return t = m.extendOwn({}, t), function (e) {
            return m.isMatch(e, t);
          };
        }, m.times = function (t, e, n) {
          var r = Array(Math.max(0, t));
          e = b(e, n, 1);

          for (var i = 0; i < t; i++) r[i] = e(i);

          return r;
        }, m.random = function (t, e) {
          return null == e && (e = t, t = 0), t + Math.floor(Math.random() * (e - t + 1));
        }, m.now = Date.now || function () {
          return new Date().getTime();
        };

        var V = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#x27;",
          "`": "&#x60;"
        },
            K = m.invert(V),
            z = function (t) {
          var e = function (e) {
            return t[e];
          },
              n = "(?:" + m.keys(t).join("|") + ")",
              r = RegExp(n),
              i = RegExp(n, "g");

          return function (t) {
            return t = null == t ? "" : "" + t, r.test(t) ? t.replace(i, e) : t;
          };
        };

        m.escape = z(V), m.unescape = z(K), m.result = function (t, e, n) {
          m.isArray(e) || (e = [e]);
          var r = e.length;
          if (!r) return m.isFunction(n) ? n.call(t) : n;

          for (var i = 0; i < r; i++) {
            var s = null == t ? void 0 : t[e[i]];
            void 0 === s && (s = n, i = r), t = m.isFunction(s) ? s.call(t) : s;
          }

          return t;
        };
        var G = 0;
        m.uniqueId = function (t) {
          var e = ++G + "";
          return t ? t + e : e;
        }, m.templateSettings = {
          evaluate: /<%([\s\S]+?)%>/g,
          interpolate: /<%=([\s\S]+?)%>/g,
          escape: /<%-([\s\S]+?)%>/g
        };

        var H = /(.)^/,
            $ = {
          "'": "'",
          "\\": "\\",
          "\r": "r",
          "\n": "n",
          "\u2028": "u2028",
          "\u2029": "u2029"
        },
            X = /\\|'|\r|\n|\u2028|\u2029/g,
            Y = function (t) {
          return "\\" + $[t];
        };

        m.template = function (t, e, n) {
          !e && n && (e = n), e = m.defaults({}, e, m.templateSettings);
          var r = RegExp([(e.escape || H).source, (e.interpolate || H).source, (e.evaluate || H).source].join("|") + "|$", "g"),
              i = 0,
              s = "__p+='";
          t.replace(r, function (e, n, r, o, a) {
            return s += t.slice(i, a).replace(X, Y), i = a + e.length, n ? s += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'" : r ? s += "'+\n((__t=(" + r + "))==null?'':__t)+\n'" : o && (s += "';\n" + o + "\n__p+='"), e;
          }), s += "';\n", e.variable || (s = "with(obj||{}){\n" + s + "}\n"), s = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + s + "return __p;\n";
          var o;

          try {
            o = new Function(e.variable || "obj", "_", s);
          } catch (t) {
            throw t.source = s, t;
          }

          var a = function (t) {
            return o.call(this, t, m);
          };

          return a.source = "function(" + (e.variable || "obj") + "){\n" + s + "}", a;
        }, m.chain = function (t) {
          var e = m(t);
          return e._chain = !0, e;
        };

        var Z = function (t, e) {
          return t._chain ? m(e).chain() : e;
        };

        m.mixin = function (t) {
          return m.each(m.functions(t), function (e) {
            var n = m[e] = t[e];

            m.prototype[e] = function () {
              var t = [this._wrapped];
              return l.apply(t, arguments), Z(this, n.apply(m, t));
            };
          }), m;
        }, m.mixin(m), m.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (t) {
          var e = a[t];

          m.prototype[t] = function () {
            var n = this._wrapped;
            return e.apply(n, arguments), "shift" !== t && "splice" !== t || 0 !== n.length || delete n[0], Z(this, n);
          };
        }), m.each(["concat", "join", "slice"], function (t) {
          var e = a[t];

          m.prototype[t] = function () {
            return Z(this, e.apply(this._wrapped, arguments));
          };
        }), m.prototype.value = function () {
          return this._wrapped;
        }, m.prototype.valueOf = m.prototype.toJSON = m.prototype.value, m.prototype.toString = function () {
          return String(this._wrapped);
        }, r = [], void 0 !== (i = function () {
          return m;
        }.apply(e, r)) && (n.exports = i);
      }();
    }).call(e, n(7), n(17)(t));
  }, function (t, e, n) {
    "use strict";

    var r = n(29).Promise;
    r._continueWhile = function (t, e) {
      return t() ? e().then(function () {
        return r._continueWhile(t, e);
      }) : r.resolve();
    }, t.exports = r;
  }, function (t, e, n) {
    "use strict";

    var r = n(0),
        i = n(44),
        s = n(0),
        o = s.extend,
        a = n(1),
        u = n(5),
        c = n(3),
        l = c.getSessionToken,
        h = c.ajax,
        f = function (t, e) {
      var n = new Date().getTime(),
          r = i(n + t);
      return e ? r + "," + n + ",master" : r + "," + n;
    },
        d = function (t, e) {
      e ? t["X-LC-Sign"] = f(u.applicationKey) : t["X-LC-Key"] = u.applicationKey;
    },
        p = function () {
      var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          e = arguments[1],
          n = {
        "X-LC-Id": u.applicationId,
        "Content-Type": "application/json;charset=UTF-8"
      },
          r = !1;
      return "boolean" == typeof t.useMasterKey ? r = t.useMasterKey : "boolean" == typeof u._config.useMasterKey && (r = u._config.useMasterKey), r ? u.masterKey ? e ? n["X-LC-Sign"] = f(u.masterKey, !0) : n["X-LC-Key"] = u.masterKey + ",master" : (console.warn("masterKey is not set, fall back to use appKey"), d(n, e)) : d(n, e), u.hookKey && (n["X-LC-Hook-Key"] = u.hookKey), null !== u._config.production && (n["X-LC-Prod"] = String(u._config.production)), n["X-LC-UA"] = u._sharedConfig.userAgent, a.resolve().then(function () {
        var e = l(t);
        if (e) n["X-LC-Session"] = e;else if (!u._config.disableCurrentUser) return u.User.currentAsync().then(function (t) {
          return t && t._sessionToken && (n["X-LC-Session"] = t._sessionToken), n;
        });
        return n;
      });
    },
        _ = function (t) {
      var e = t.service,
          n = void 0 === e ? "api" : e,
          r = t.version,
          i = void 0 === r ? "1.1" : r,
          s = t.path,
          o = u._config.serverURLs[n];
      if (!o) throw new Error("undefined server URL for " + n);
      return "/" !== o.charAt(o.length - 1) && (o += "/"), o += i, s && (o += s), o;
    },
        v = function (t) {
      var e = t.service,
          n = t.version,
          i = t.method,
          s = t.path,
          o = t.query,
          a = t.data,
          c = t.authOptions,
          l = t.signKey,
          f = void 0 === l || l;
      if (!u.applicationId || !u.applicationKey && !u.masterKey) throw new Error("Not initialized");

      u._appRouter.refresh();

      var d = u._config.requestTimeout,
          v = _({
        service: e,
        path: s,
        version: n
      });

      return p(c, f).then(function (t) {
        return h({
          method: i,
          url: v,
          query: o,
          data: a,
          headers: t,
          timeout: d
        }).catch(function (t) {
          var e = {
            code: t.code || -1,
            error: t.message || t.responseText
          };
          if (t.response && t.response.code) e = t.response;else if (t.responseText) try {
            e = JSON.parse(t.responseText);
          } catch (t) {}
          e.rawMessage = e.rawMessage || e.error, u._sharedConfig.keepErrorRawMessage || (e.error += " [" + (t.statusCode || "N/A") + " " + i + " " + v + "]");
          var n = new Error(e.error);
          throw delete e.error, r.extend(n, e);
        });
      });
    },
        y = function (t, e, n, r, i, s, a) {
      var u = "";
      if (t && (u += "/" + t), e && (u += "/" + e), n && (u += "/" + n), i && i._fetchWhenSave) throw new Error("_fetchWhenSave should be in the query");
      if (i && i._where) throw new Error("_where should be in the query");
      return r && "get" === r.toLowerCase() && (a = o({}, a, i), i = null), v({
        method: r,
        path: u,
        query: a,
        data: i,
        authOptions: s
      });
    };

    u.request = v, t.exports = {
      _request: y,
      request: v
    };
  }, function (t, e, n) {
    "use strict";

    function r(t) {
      var e = new RegExp("^([0-9]{1,4})-([0-9]{1,2})-([0-9]{1,2})T([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})(.([0-9]+))?Z$"),
          n = e.exec(t);
      if (!n) return null;
      var r = n[1] || 0,
          i = (n[2] || 1) - 1,
          s = n[3] || 0,
          o = n[4] || 0,
          a = n[5] || 0,
          u = n[6] || 0,
          c = n[8] || 0;
      return new Date(Date.UTC(r, i, s, o, a, u, c));
    }

    var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
      return typeof t;
    } : function (t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
    },
        s = n(0),
        o = n(8),
        a = n(6),
        u = a("leancloud:request"),
        c = a("leancloud:request:error"),
        l = n(1),
        h = 0,
        f = function (t) {
      var e = t.method,
          n = t.url,
          r = t.query,
          s = t.data,
          f = t.headers,
          d = void 0 === f ? {} : f,
          p = t.onprogress,
          _ = t.timeout,
          v = {};
      if (r) for (var y in r) {
        var m = r[y];
        void 0 !== m && ("object" === (void 0 === m ? "undefined" : i(m)) ? v[y] = JSON.stringify(m) : v[y] = m);
      }
      var g = h++;
      return u("request(%d) %s %s %o %o %o", g, e, n, v, s, d), new l(function (t, i) {
        var l = o(e, n).set(d).query(v).send(s);
        p && l.on("progress", p), _ && l.timeout(_), l.end(function (o, l) {
          return o ? (l && (a.enabled("leancloud:request") || c("request(%d) %s %s %o %o %o", g, e, n, r, s, d), c("response(%d) %d %O %o", g, l.status, l.body || l.text, l.header), o.statusCode = l.status, o.responseText = l.text, o.response = l.body), i(o)) : (u("response(%d) %d %O %o", g, l.status, l.body || l.text, l.header), t(l.body));
        });
      });
    },
        d = function (t) {
      return s.isNull(t) || s.isUndefined(t);
    },
        p = function (t) {
      return s.isArray(t) ? t : void 0 === t || null === t ? [] : [t];
    },
        _ = function () {
      var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          e = t.keys,
          n = t.include,
          r = t.includeACL,
          i = {};
      return e && (i.keys = p(e).join(",")), n && (i.include = p(n).join(",")), r && (i.returnACL = r), i;
    },
        v = function (t) {
      return t.sessionToken ? t.sessionToken : t.user && "function" == typeof t.user.getSessionToken ? t.user.getSessionToken() : void 0;
    },
        y = function (t) {
      return function (e) {
        return t(e), e;
      };
    },
        m = function () {},
        g = function (t, e, n) {
      var r;
      return r = e && e.hasOwnProperty("constructor") ? e.constructor : function () {
        t.apply(this, arguments);
      }, s.extend(r, t), m.prototype = t.prototype, r.prototype = new m(), e && s.extend(r.prototype, e), n && s.extend(r, n), r.prototype.constructor = r, r.__super__ = t.prototype, r;
    },
        b = function (t, e, n) {
      var r = e.split("."),
          i = r.pop(),
          s = t;
      return r.forEach(function (t) {
        void 0 === s[t] && (s[t] = {}), s = s[t];
      }), s[i] = n, t;
    },
        w = function (t, e) {
      for (var n = e.split("."), r = n[0], i = n.pop(), s = t, o = 0; o < n.length; o++) if (void 0 === (s = s[n[o]])) return [void 0, void 0, i];

      return [s[i], s, i, r];
    },
        O = function (t) {
      return s.isObject(t) && Object.getPrototypeOf(t) === Object.prototype;
    };

    t.exports = {
      ajax: f,
      isNullOrUndefined: d,
      ensureArray: p,
      transformFetchOptions: _,
      getSessionToken: v,
      tap: y,
      inherits: g,
      parseDate: r,
      setValue: b,
      findValue: w,
      isPlainObject: O
    };
  }, function (t, e, n) {
    "use strict";

    function r(t, e) {
      var n = new Error(e);
      return n.code = t, n;
    }

    n(0).extend(r, {
      OTHER_CAUSE: -1,
      INTERNAL_SERVER_ERROR: 1,
      CONNECTION_FAILED: 100,
      OBJECT_NOT_FOUND: 101,
      INVALID_QUERY: 102,
      INVALID_CLASS_NAME: 103,
      MISSING_OBJECT_ID: 104,
      INVALID_KEY_NAME: 105,
      INVALID_POINTER: 106,
      INVALID_JSON: 107,
      COMMAND_UNAVAILABLE: 108,
      NOT_INITIALIZED: 109,
      INCORRECT_TYPE: 111,
      INVALID_CHANNEL_NAME: 112,
      PUSH_MISCONFIGURED: 115,
      OBJECT_TOO_LARGE: 116,
      OPERATION_FORBIDDEN: 119,
      CACHE_MISS: 120,
      INVALID_NESTED_KEY: 121,
      INVALID_FILE_NAME: 122,
      INVALID_ACL: 123,
      TIMEOUT: 124,
      INVALID_EMAIL_ADDRESS: 125,
      MISSING_CONTENT_TYPE: 126,
      MISSING_CONTENT_LENGTH: 127,
      INVALID_CONTENT_LENGTH: 128,
      FILE_TOO_LARGE: 129,
      FILE_SAVE_ERROR: 130,
      FILE_DELETE_ERROR: 153,
      DUPLICATE_VALUE: 137,
      INVALID_ROLE_NAME: 139,
      EXCEEDED_QUOTA: 140,
      SCRIPT_FAILED: 141,
      VALIDATION_ERROR: 142,
      INVALID_IMAGE_DATA: 150,
      UNSAVED_FILE_ERROR: 151,
      INVALID_PUSH_TIME_ERROR: 152,
      USERNAME_MISSING: 200,
      PASSWORD_MISSING: 201,
      USERNAME_TAKEN: 202,
      EMAIL_TAKEN: 203,
      EMAIL_MISSING: 204,
      EMAIL_NOT_FOUND: 205,
      SESSION_MISSING: 206,
      MUST_CREATE_USER_THROUGH_SIGNUP: 207,
      ACCOUNT_ALREADY_LINKED: 208,
      LINKED_ID_MISSING: 250,
      INVALID_LINKED_SESSION: 251,
      UNSUPPORTED_SERVICE: 252,
      X_DOMAIN_REQUEST: 602
    }), t.exports = r;
  }, function (t, e, n) {
    "use strict";

    (function (e) {
      var r = n(0),
          i = n(9),
          s = n(20),
          o = n(3),
          a = o.inherits,
          u = o.parseDate,
          c = n(1),
          l = e.AV || {};
      l._config = {
        serverURLs: {},
        useMasterKey: !1,
        production: null,
        realtime: null,
        requestTimeout: null
      }, l._sharedConfig = {
        userAgent: s,
        liveQueryRealtime: null
      }, l._getAVPath = function (t) {
        if (!l.applicationId) throw new Error("You need to call AV.initialize before using AV.");
        if (t || (t = ""), !r.isString(t)) throw new Error("Tried to get a localStorage path that wasn't a String.");
        return "/" === t[0] && (t = t.substring(1)), "AV/" + l.applicationId + "/" + t;
      }, l._installationId = null, l._getInstallationId = function () {
        if (l._installationId) return c.resolve(l._installationId);

        var t = l._getAVPath("installationId");

        return l.localStorage.getItemAsync(t).then(function (e) {
          return l._installationId = e, l._installationId ? e : (l._installationId = e = i(), l.localStorage.setItemAsync(t, e).then(function () {
            return e;
          }));
        });
      }, l._subscriptionId = null, l._refreshSubscriptionId = function () {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : l._getAVPath("subscriptionId"),
            e = l._subscriptionId = i();
        return l.localStorage.setItemAsync(t, e).then(function () {
          return e;
        });
      }, l._getSubscriptionId = function () {
        if (l._subscriptionId) return c.resolve(l._subscriptionId);

        var t = l._getAVPath("subscriptionId");

        return l.localStorage.getItemAsync(t).then(function (e) {
          return l._subscriptionId = e, l._subscriptionId || (e = l._refreshSubscriptionId(t)), e;
        });
      }, l._parseDate = u, l._extend = function (t, e) {
        var n = a(this, t, e);
        return n.extend = this.extend, n;
      }, l._encode = function (t, e, n) {
        var i = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3];

        if (t instanceof l.Object) {
          if (n) throw new Error("AV.Objects not allowed here");
          return e && !r.include(e, t) && t._hasData ? t._toFullJSON(e.concat(t), i) : t._toPointer();
        }

        if (t instanceof l.ACL) return t.toJSON();
        if (r.isDate(t)) return i ? {
          __type: "Date",
          iso: t.toJSON()
        } : t.toJSON();
        if (t instanceof l.GeoPoint) return t.toJSON();
        if (r.isArray(t)) return r.map(t, function (t) {
          return l._encode(t, e, n, i);
        });
        if (r.isRegExp(t)) return t.source;
        if (t instanceof l.Relation) return t.toJSON();
        if (t instanceof l.Op) return t.toJSON();

        if (t instanceof l.File) {
          if (!t.url() && !t.id) throw new Error("Tried to save an object containing an unsaved file.");
          return t._toFullJSON(e, i);
        }

        return r.isObject(t) ? r.mapObject(t, function (t, r) {
          return l._encode(t, e, n, i);
        }) : t;
      }, l._decode = function (t, e) {
        if (!r.isObject(t) || r.isDate(t)) return t;
        if (r.isArray(t)) return r.map(t, function (t) {
          return l._decode(t);
        });
        if (t instanceof l.Object) return t;
        if (t instanceof l.File) return t;
        if (t instanceof l.Op) return t;
        if (t instanceof l.GeoPoint) return t;
        if (t instanceof l.ACL) return t;
        if ("ACL" === e) return new l.ACL(t);
        if (t.__op) return l.Op._decode(t);
        var n;

        if ("Pointer" === t.__type) {
          n = t.className;

          var i = l.Object._create(n);

          if (Object.keys(t).length > 3) {
            var s = r.clone(t);
            delete s.__type, delete s.className, i._finishFetch(s, !0);
          } else i._finishFetch({
            objectId: t.objectId
          }, !1);

          return i;
        }

        if ("Object" === t.__type) {
          n = t.className;
          var o = r.clone(t);
          delete o.__type, delete o.className;

          var a = l.Object._create(n);

          return a._finishFetch(o, !0), a;
        }

        if ("Date" === t.__type) return l._parseDate(t.iso);
        if ("GeoPoint" === t.__type) return new l.GeoPoint({
          latitude: t.latitude,
          longitude: t.longitude
        });

        if ("Relation" === t.__type) {
          if (!e) throw new Error("key missing decoding a Relation");
          var u = new l.Relation(null, e);
          return u.targetClassName = t.className, u;
        }

        if ("File" === t.__type) {
          var c = new l.File(t.name),
              h = r.clone(t);
          return delete h.__type, c._finishFetch(h), c;
        }

        return r.mapObject(t, l._decode);
      }, l.parseJSON = l._decode, l._encodeObjectOrArray = function (t) {
        var e = function (t) {
          return t && t._toFullJSON && (t = t._toFullJSON([])), r.mapObject(t, function (t) {
            return l._encode(t, []);
          });
        };

        return r.isArray(t) ? t.map(function (t) {
          return e(t);
        }) : e(t);
      }, l._arrayEach = r.each, l._traverse = function (t, e, n) {
        if (t instanceof l.Object) {
          if (n = n || [], r.indexOf(n, t) >= 0) return;
          return n.push(t), l._traverse(t.attributes, e, n), e(t);
        }

        return t instanceof l.Relation || t instanceof l.File ? e(t) : r.isArray(t) ? (r.each(t, function (r, i) {
          var s = l._traverse(r, e, n);

          s && (t[i] = s);
        }), e(t)) : r.isObject(t) ? (l._each(t, function (r, i) {
          var s = l._traverse(r, e, n);

          s && (t[i] = s);
        }), e(t)) : e(t);
      }, l._objectEach = l._each = function (t, e) {
        r.isObject(t) ? r.each(r.keys(t), function (n) {
          e(t[n], n);
        }) : r.each(t, e);
      }, t.exports = l;
    }).call(e, n(7));
  }, function (t, e, n) {
    "use strict";

    function r(t) {
      return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
        return typeof t;
      } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
      })(t);
    }

    function i() {
      return !("undefined" == typeof window || !window.process || "renderer" !== window.process.type && !window.process.__nwjs) || ("undefined" == typeof navigator || !navigator.userAgent || !navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) && ("undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
    }

    function s(e) {
      if (e[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + e[0] + (this.useColors ? "%c " : " ") + "+" + t.exports.humanize(this.diff), this.useColors) {
        var n = "color: " + this.color;
        e.splice(1, 0, n, "color: inherit");
        var r = 0,
            i = 0;
        e[0].replace(/%[a-zA-Z%]/g, function (t) {
          "%%" !== t && (r++, "%c" === t && (i = r));
        }), e.splice(i, 0, n);
      }
    }

    function o() {
      var t;
      return "object" === ("undefined" == typeof console ? "undefined" : r(console)) && console.log && (t = console).log.apply(t, arguments);
    }

    function a(t) {
      try {
        t ? e.storage.setItem("debug", t) : e.storage.removeItem("debug");
      } catch (t) {}
    }

    function u() {
      var t;

      try {
        t = e.storage.getItem("debug");
      } catch (t) {}

      return !t && "undefined" != typeof process && "env" in process && (t = undefined), t;
    }

    e.log = o, e.formatArgs = s, e.save = a, e.load = u, e.useColors = i, e.storage = function () {
      try {
        return localStorage;
      } catch (t) {}
    }(), e.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"], t.exports = n(27)(e), t.exports.formatters.j = function (t) {
      try {
        return JSON.stringify(t);
      } catch (t) {
        return "[UnexpectedJSONParseError]: " + t.message;
      }
    };
  }, function (t, e) {
    var n;

    n = function () {
      return this;
    }();

    try {
      n = n || Function("return this")() || (0, eval)("this");
    } catch (t) {
      "object" == typeof window && (n = window);
    }

    t.exports = n;
  }, function (t, e, n) {
    function r() {}

    function i(t) {
      if (!_(t)) return t;
      var e = [];

      for (var n in t) s(e, n, t[n]);

      return e.join("&");
    }

    function s(t, e, n) {
      if (null != n) {
        if (Array.isArray(n)) n.forEach(function (n) {
          s(t, e, n);
        });else if (_(n)) for (var r in n) s(t, e + "[" + r + "]", n[r]);else t.push(encodeURIComponent(e) + "=" + encodeURIComponent(n));
      } else null === n && t.push(encodeURIComponent(e));
    }

    function o(t) {
      for (var e, n, r = {}, i = t.split("&"), s = 0, o = i.length; s < o; ++s) e = i[s], n = e.indexOf("="), -1 == n ? r[decodeURIComponent(e)] = "" : r[decodeURIComponent(e.slice(0, n))] = decodeURIComponent(e.slice(n + 1));

      return r;
    }

    function a(t) {
      for (var e, n, r, i, s = t.split(/\r?\n/), o = {}, a = 0, u = s.length; a < u; ++a) n = s[a], -1 !== (e = n.indexOf(":")) && (r = n.slice(0, e).toLowerCase(), i = g(n.slice(e + 1)), o[r] = i);

      return o;
    }

    function u(t) {
      return /[\/+]json($|[^-\w])/.test(t);
    }

    function c(t) {
      this.req = t, this.xhr = this.req.xhr, this.text = "HEAD" != this.req.method && ("" === this.xhr.responseType || "text" === this.xhr.responseType) || void 0 === this.xhr.responseType ? this.xhr.responseText : null, this.statusText = this.req.xhr.statusText;
      var e = this.xhr.status;
      1223 === e && (e = 204), this._setStatusProperties(e), this.header = this.headers = a(this.xhr.getAllResponseHeaders()), this.header["content-type"] = this.xhr.getResponseHeader("content-type"), this._setHeaderProperties(this.header), null === this.text && t._responseType ? this.body = this.xhr.response : this.body = "HEAD" != this.req.method ? this._parseBody(this.text ? this.text : this.xhr.response) : null;
    }

    function l(t, e) {
      var n = this;
      this._query = this._query || [], this.method = t, this.url = e, this.header = {}, this._header = {}, this.on("end", function () {
        var t = null,
            e = null;

        try {
          e = new c(n);
        } catch (e) {
          return t = new Error("Parser is unable to parse the response"), t.parse = !0, t.original = e, n.xhr ? (t.rawResponse = void 0 === n.xhr.responseType ? n.xhr.responseText : n.xhr.response, t.status = n.xhr.status ? n.xhr.status : null, t.statusCode = t.status) : (t.rawResponse = null, t.status = null), n.callback(t);
        }

        n.emit("response", e);
        var r;

        try {
          n._isResponseOK(e) || (r = new Error(e.statusText || "Unsuccessful HTTP response"));
        } catch (t) {
          r = t;
        }

        r ? (r.original = t, r.response = e, r.status = e.status, n.callback(r, e)) : n.callback(null, e);
      });
    }

    function h(t, e, n) {
      var r = m("DELETE", t);
      return "function" == typeof e && (n = e, e = null), e && r.send(e), n && r.end(n), r;
    }

    var f;
    "undefined" != typeof window ? f = window : "undefined" != typeof self ? f = self : (console.warn("Using browser-only version of superagent in non-browser environment"), f = this);

    var d = n(22),
        p = n(23),
        _ = n(11),
        v = n(24),
        y = n(26),
        m = e = t.exports = function (t, n) {
      return "function" == typeof n ? new e.Request("GET", t).end(n) : 1 == arguments.length ? new e.Request("GET", t) : new e.Request(t, n);
    };

    e.Request = l, m.getXHR = function () {
      if (!(!f.XMLHttpRequest || f.location && "file:" == f.location.protocol && f.ActiveXObject)) return new XMLHttpRequest();

      try {
        return new ActiveXObject("Microsoft.XMLHTTP");
      } catch (t) {}

      try {
        return new ActiveXObject("Msxml2.XMLHTTP.6.0");
      } catch (t) {}

      try {
        return new ActiveXObject("Msxml2.XMLHTTP.3.0");
      } catch (t) {}

      try {
        return new ActiveXObject("Msxml2.XMLHTTP");
      } catch (t) {}

      throw Error("Browser-only version of superagent could not find XHR");
    };
    var g = "".trim ? function (t) {
      return t.trim();
    } : function (t) {
      return t.replace(/(^\s*|\s*$)/g, "");
    };
    m.serializeObject = i, m.parseString = o, m.types = {
      html: "text/html",
      json: "application/json",
      xml: "text/xml",
      urlencoded: "application/x-www-form-urlencoded",
      form: "application/x-www-form-urlencoded",
      "form-data": "application/x-www-form-urlencoded"
    }, m.serialize = {
      "application/x-www-form-urlencoded": i,
      "application/json": JSON.stringify
    }, m.parse = {
      "application/x-www-form-urlencoded": o,
      "application/json": JSON.parse
    }, v(c.prototype), c.prototype._parseBody = function (t) {
      var e = m.parse[this.type];
      return this.req._parser ? this.req._parser(this, t) : (!e && u(this.type) && (e = m.parse["application/json"]), e && t && (t.length || t instanceof Object) ? e(t) : null);
    }, c.prototype.toError = function () {
      var t = this.req,
          e = t.method,
          n = t.url,
          r = "cannot " + e + " " + n + " (" + this.status + ")",
          i = new Error(r);
      return i.status = this.status, i.method = e, i.url = n, i;
    }, m.Response = c, d(l.prototype), p(l.prototype), l.prototype.type = function (t) {
      return this.set("Content-Type", m.types[t] || t), this;
    }, l.prototype.accept = function (t) {
      return this.set("Accept", m.types[t] || t), this;
    }, l.prototype.auth = function (t, e, n) {
      1 === arguments.length && (e = ""), "object" == typeof e && null !== e && (n = e, e = ""), n || (n = {
        type: "function" == typeof btoa ? "basic" : "auto"
      });

      var r = function (t) {
        if ("function" == typeof btoa) return btoa(t);
        throw new Error("Cannot use basic auth, btoa is not a function");
      };

      return this._auth(t, e, n, r);
    }, l.prototype.query = function (t) {
      return "string" != typeof t && (t = i(t)), t && this._query.push(t), this;
    }, l.prototype.attach = function (t, e, n) {
      if (e) {
        if (this._data) throw Error("superagent can't mix .send() and .attach()");

        this._getFormData().append(t, e, n || e.name);
      }

      return this;
    }, l.prototype._getFormData = function () {
      return this._formData || (this._formData = new f.FormData()), this._formData;
    }, l.prototype.callback = function (t, e) {
      if (this._shouldRetry(t, e)) return this._retry();
      var n = this._callback;
      this.clearTimeout(), t && (this._maxRetries && (t.retries = this._retries - 1), this.emit("error", t)), n(t, e);
    }, l.prototype.crossDomainError = function () {
      var t = new Error("Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.");
      t.crossDomain = !0, t.status = this.status, t.method = this.method, t.url = this.url, this.callback(t);
    }, l.prototype.buffer = l.prototype.ca = l.prototype.agent = function () {
      return console.warn("This is not supported in browser version of superagent"), this;
    }, l.prototype.pipe = l.prototype.write = function () {
      throw Error("Streaming is not supported in browser version of superagent");
    }, l.prototype._isHost = function (t) {
      return t && "object" == typeof t && !Array.isArray(t) && "[object Object]" !== Object.prototype.toString.call(t);
    }, l.prototype.end = function (t) {
      return this._endCalled && console.warn("Warning: .end() was called twice. This is not supported in superagent"), this._endCalled = !0, this._callback = t || r, this._finalizeQueryString(), this._end();
    }, l.prototype._end = function () {
      var t = this,
          e = this.xhr = m.getXHR(),
          n = this._formData || this._data;
      this._setTimeouts(), e.onreadystatechange = function () {
        var n = e.readyState;

        if (n >= 2 && t._responseTimeoutTimer && clearTimeout(t._responseTimeoutTimer), 4 == n) {
          var r;

          try {
            r = e.status;
          } catch (t) {
            r = 0;
          }

          if (!r) {
            if (t.timedout || t._aborted) return;
            return t.crossDomainError();
          }

          t.emit("end");
        }
      };

      var r = function (e, n) {
        n.total > 0 && (n.percent = n.loaded / n.total * 100), n.direction = e, t.emit("progress", n);
      };

      if (this.hasListeners("progress")) try {
        e.onprogress = r.bind(null, "download"), e.upload && (e.upload.onprogress = r.bind(null, "upload"));
      } catch (t) {}

      try {
        this.username && this.password ? e.open(this.method, this.url, !0, this.username, this.password) : e.open(this.method, this.url, !0);
      } catch (t) {
        return this.callback(t);
      }

      if (this._withCredentials && (e.withCredentials = !0), !this._formData && "GET" != this.method && "HEAD" != this.method && "string" != typeof n && !this._isHost(n)) {
        var i = this._header["content-type"],
            s = this._serializer || m.serialize[i ? i.split(";")[0] : ""];
        !s && u(i) && (s = m.serialize["application/json"]), s && (n = s(n));
      }

      for (var o in this.header) null != this.header[o] && this.header.hasOwnProperty(o) && e.setRequestHeader(o, this.header[o]);

      return this._responseType && (e.responseType = this._responseType), this.emit("request", this), e.send(void 0 !== n ? n : null), this;
    }, m.agent = function () {
      return new y();
    }, ["GET", "POST", "OPTIONS", "PATCH", "PUT", "DELETE"].forEach(function (t) {
      y.prototype[t.toLowerCase()] = function (e, n) {
        var r = new m.Request(t, e);
        return this._setDefaults(r), n && r.end(n), r;
      };
    }), y.prototype.del = y.prototype.delete, m.get = function (t, e, n) {
      var r = m("GET", t);
      return "function" == typeof e && (n = e, e = null), e && r.query(e), n && r.end(n), r;
    }, m.head = function (t, e, n) {
      var r = m("HEAD", t);
      return "function" == typeof e && (n = e, e = null), e && r.query(e), n && r.end(n), r;
    }, m.options = function (t, e, n) {
      var r = m("OPTIONS", t);
      return "function" == typeof e && (n = e, e = null), e && r.send(e), n && r.end(n), r;
    }, m.del = h, m.delete = h, m.patch = function (t, e, n) {
      var r = m("PATCH", t);
      return "function" == typeof e && (n = e, e = null), e && r.send(e), n && r.end(n), r;
    }, m.post = function (t, e, n) {
      var r = m("POST", t);
      return "function" == typeof e && (n = e, e = null), e && r.send(e), n && r.end(n), r;
    }, m.put = function (t, e, n) {
      var r = m("PUT", t);
      return "function" == typeof e && (n = e, e = null), e && r.send(e), n && r.end(n), r;
    };
  }, function (t, e, n) {
    function r(t, e, n) {
      var r = e && n || 0;
      "string" == typeof t && (e = "binary" === t ? new Array(16) : null, t = null), t = t || {};
      var o = t.random || (t.rng || i)();
      if (o[6] = 15 & o[6] | 64, o[8] = 63 & o[8] | 128, e) for (var a = 0; a < 16; ++a) e[r + a] = o[a];
      return e || s(o);
    }

    var i = n(18),
        s = n(19);
    t.exports = r;
  }, function (t, e, n) {
    "use strict";

    t.exports = "3.11.1";
  }, function (t, e, n) {
    "use strict";

    function r(t) {
      return null !== t && "object" == typeof t;
    }

    t.exports = r;
  }, function (t, e, n) {
    "use strict";

    var r = n(0),
        i = n(1),
        s = n(31),
        o = ["getItem", "setItem", "removeItem", "clear"];
    s.async ? r(o).each(function (t) {
      "function" != typeof s[t] && (s[t] = function () {
        var e = new Error("Synchronous API [" + t + "] is not available in this runtime.");
        throw e.code = "SYNC_API_NOT_AVAILABLE", e;
      });
    }) : r(o).each(function (t) {
      "function" == typeof s[t] && (s[t + "Async"] = function () {
        return i.resolve(s[t].apply(s, arguments));
      });
    }), t.exports = s;
  }, function (t, e, n) {
    "use strict";

    var r = n(12),
        i = n(5),
        s = e.removeAsync = r.removeItemAsync.bind(r),
        o = function (t, e) {
      try {
        t = JSON.parse(t);
      } catch (t) {
        return null;
      }

      if (t) {
        return t.expiredAt && t.expiredAt < Date.now() ? s(e).then(function () {
          return null;
        }) : t.value;
      }

      return null;
    };

    e.getAsync = function (t) {
      return t = "AV/" + i.applicationId + "/" + t, r.getItemAsync(t).then(function (e) {
        return o(e, t);
      });
    }, e.setAsync = function (t, e, n) {
      var s = {
        value: e
      };
      return "number" == typeof n && (s.expiredAt = Date.now() + n), r.setItemAsync("AV/" + i.applicationId + "/" + t, JSON.stringify(s));
    };
  }, function (t, e) {
    var n = {
      utf8: {
        stringToBytes: function (t) {
          return n.bin.stringToBytes(unescape(encodeURIComponent(t)));
        },
        bytesToString: function (t) {
          return decodeURIComponent(escape(n.bin.bytesToString(t)));
        }
      },
      bin: {
        stringToBytes: function (t) {
          for (var e = [], n = 0; n < t.length; n++) e.push(255 & t.charCodeAt(n));

          return e;
        },
        bytesToString: function (t) {
          for (var e = [], n = 0; n < t.length; n++) e.push(String.fromCharCode(t[n]));

          return e.join("");
        }
      }
    };
    t.exports = n;
  }, function (t, e, n) {
    "use strict";
    /*!
    * LeanCloud JavaScript SDK
    * https://leancloud.cn
    *
    * Copyright 2016 LeanCloud.cn, Inc.
    * The LeanCloud JavaScript SDK is freely distributable under the MIT license.
    */

    n(16);
    var r = n(0),
        i = n(5);
    i._ = r, i.version = n(10), i.Promise = n(1), i.localStorage = n(12), i.Cache = n(13), i.Error = n(4), n(33), n(35)(i), n(36)(i), n(37)(i), n(38)(i), n(39)(i), n(40)(i), n(48)(i), n(49)(i), n(50)(i), n(51)(i), n(52)(i), n(54)(i), n(55)(i), n(56)(i), n(57)(i), n(58)(i), n(59)(i), i.Conversation = n(60), n(61), t.exports = i;
  }, function (t, e, n) {
    "use strict";
  }, function (t, e) {
    t.exports = function (t) {
      return t.webpackPolyfill || (t.deprecate = function () {}, t.paths = [], t.children || (t.children = []), Object.defineProperty(t, "loaded", {
        enumerable: !0,
        get: function () {
          return t.l;
        }
      }), Object.defineProperty(t, "id", {
        enumerable: !0,
        get: function () {
          return t.i;
        }
      }), t.webpackPolyfill = 1), t;
    };
  }, function (t, e) {
    var n = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || "undefined" != typeof msCrypto && "function" == typeof window.msCrypto.getRandomValues && msCrypto.getRandomValues.bind(msCrypto);

    if (n) {
      var r = new Uint8Array(16);

      t.exports = function () {
        return n(r), r;
      };
    } else {
      var i = new Array(16);

      t.exports = function () {
        for (var t, e = 0; e < 16; e++) 0 == (3 & e) && (t = 4294967296 * Math.random()), i[e] = t >>> ((3 & e) << 3) & 255;

        return i;
      };
    }
  }, function (t, e) {
    function n(t, e) {
      var n = e || 0,
          i = r;
      return [i[t[n++]], i[t[n++]], i[t[n++]], i[t[n++]], "-", i[t[n++]], i[t[n++]], "-", i[t[n++]], i[t[n++]], "-", i[t[n++]], i[t[n++]], "-", i[t[n++]], i[t[n++]], i[t[n++]], i[t[n++]], i[t[n++]], i[t[n++]]].join("");
    }

    for (var r = [], i = 0; i < 256; ++i) r[i] = (i + 256).toString(16).substr(1);

    t.exports = n;
  }, function (t, e, n) {
    "use strict";

    var r = n(10),
        i = ["Browser"].concat(n(21));
    t.exports = "LeanCloud-JS-SDK/" + r + " (" + i.join("; ") + ")";
  }, function (t, e, n) {
    "use strict";

    t.exports = [];
  }, function (t, e, n) {
    function r(t) {
      if (t) return i(t);
    }

    function i(t) {
      for (var e in r.prototype) t[e] = r.prototype[e];

      return t;
    }

    t.exports = r, r.prototype.on = r.prototype.addEventListener = function (t, e) {
      return this._callbacks = this._callbacks || {}, (this._callbacks["$" + t] = this._callbacks["$" + t] || []).push(e), this;
    }, r.prototype.once = function (t, e) {
      function n() {
        this.off(t, n), e.apply(this, arguments);
      }

      return n.fn = e, this.on(t, n), this;
    }, r.prototype.off = r.prototype.removeListener = r.prototype.removeAllListeners = r.prototype.removeEventListener = function (t, e) {
      if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;
      var n = this._callbacks["$" + t];
      if (!n) return this;
      if (1 == arguments.length) return delete this._callbacks["$" + t], this;

      for (var r, i = 0; i < n.length; i++) if ((r = n[i]) === e || r.fn === e) {
        n.splice(i, 1);
        break;
      }

      return this;
    }, r.prototype.emit = function (t) {
      this._callbacks = this._callbacks || {};
      var e = [].slice.call(arguments, 1),
          n = this._callbacks["$" + t];

      if (n) {
        n = n.slice(0);

        for (var r = 0, i = n.length; r < i; ++r) n[r].apply(this, e);
      }

      return this;
    }, r.prototype.listeners = function (t) {
      return this._callbacks = this._callbacks || {}, this._callbacks["$" + t] || [];
    }, r.prototype.hasListeners = function (t) {
      return !!this.listeners(t).length;
    };
  }, function (t, e, n) {
    "use strict";

    function r(t) {
      if (t) return i(t);
    }

    function i(t) {
      for (var e in r.prototype) t[e] = r.prototype[e];

      return t;
    }

    var s = n(11);
    t.exports = r, r.prototype.clearTimeout = function () {
      return clearTimeout(this._timer), clearTimeout(this._responseTimeoutTimer), delete this._timer, delete this._responseTimeoutTimer, this;
    }, r.prototype.parse = function (t) {
      return this._parser = t, this;
    }, r.prototype.responseType = function (t) {
      return this._responseType = t, this;
    }, r.prototype.serialize = function (t) {
      return this._serializer = t, this;
    }, r.prototype.timeout = function (t) {
      if (!t || "object" != typeof t) return this._timeout = t, this._responseTimeout = 0, this;

      for (var e in t) switch (e) {
        case "deadline":
          this._timeout = t.deadline;
          break;

        case "response":
          this._responseTimeout = t.response;
          break;

        default:
          console.warn("Unknown timeout option", e);
      }

      return this;
    }, r.prototype.retry = function (t, e) {
      return 0 !== arguments.length && !0 !== t || (t = 1), t <= 0 && (t = 0), this._maxRetries = t, this._retries = 0, this._retryCallback = e, this;
    };
    var o = ["ECONNRESET", "ETIMEDOUT", "EADDRINFO", "ESOCKETTIMEDOUT"];
    r.prototype._shouldRetry = function (t, e) {
      if (!this._maxRetries || this._retries++ >= this._maxRetries) return !1;
      if (this._retryCallback) try {
        var n = this._retryCallback(t, e);

        if (!0 === n) return !0;
        if (!1 === n) return !1;
      } catch (t) {
        console.error(t);
      }
      if (e && e.status && e.status >= 500 && 501 != e.status) return !0;

      if (t) {
        if (t.code && ~o.indexOf(t.code)) return !0;
        if (t.timeout && "ECONNABORTED" == t.code) return !0;
        if (t.crossDomain) return !0;
      }

      return !1;
    }, r.prototype._retry = function () {
      return this.clearTimeout(), this.req && (this.req = null, this.req = this.request()), this._aborted = !1, this.timedout = !1, this._end();
    }, r.prototype.then = function (t, e) {
      if (!this._fullfilledPromise) {
        var n = this;
        this._endCalled && console.warn("Warning: superagent request was sent twice, because both .end() and .then() were called. Never call .end() if you use promises"), this._fullfilledPromise = new Promise(function (t, e) {
          n.end(function (n, r) {
            n ? e(n) : t(r);
          });
        });
      }

      return this._fullfilledPromise.then(t, e);
    }, r.prototype.catch = function (t) {
      return this.then(void 0, t);
    }, r.prototype.use = function (t) {
      return t(this), this;
    }, r.prototype.ok = function (t) {
      if ("function" != typeof t) throw Error("Callback required");
      return this._okCallback = t, this;
    }, r.prototype._isResponseOK = function (t) {
      return !!t && (this._okCallback ? this._okCallback(t) : t.status >= 200 && t.status < 300);
    }, r.prototype.get = function (t) {
      return this._header[t.toLowerCase()];
    }, r.prototype.getHeader = r.prototype.get, r.prototype.set = function (t, e) {
      if (s(t)) {
        for (var n in t) this.set(n, t[n]);

        return this;
      }

      return this._header[t.toLowerCase()] = e, this.header[t] = e, this;
    }, r.prototype.unset = function (t) {
      return delete this._header[t.toLowerCase()], delete this.header[t], this;
    }, r.prototype.field = function (t, e) {
      if (null === t || void 0 === t) throw new Error(".field(name, val) name can not be empty");

      if (this._data && console.error(".field() can't be used if .send() is used. Please use only .send() or only .field() & .attach()"), s(t)) {
        for (var n in t) this.field(n, t[n]);

        return this;
      }

      if (Array.isArray(e)) {
        for (var r in e) this.field(t, e[r]);

        return this;
      }

      if (null === e || void 0 === e) throw new Error(".field(name, val) val can not be empty");
      return "boolean" == typeof e && (e = "" + e), this._getFormData().append(t, e), this;
    }, r.prototype.abort = function () {
      return this._aborted ? this : (this._aborted = !0, this.xhr && this.xhr.abort(), this.req && this.req.abort(), this.clearTimeout(), this.emit("abort"), this);
    }, r.prototype._auth = function (t, e, n, r) {
      switch (n.type) {
        case "basic":
          this.set("Authorization", "Basic " + r(t + ":" + e));
          break;

        case "auto":
          this.username = t, this.password = e;
          break;

        case "bearer":
          this.set("Authorization", "Bearer " + t);
      }

      return this;
    }, r.prototype.withCredentials = function (t) {
      return void 0 == t && (t = !0), this._withCredentials = t, this;
    }, r.prototype.redirects = function (t) {
      return this._maxRedirects = t, this;
    }, r.prototype.maxResponseSize = function (t) {
      if ("number" != typeof t) throw TypeError("Invalid argument");
      return this._maxResponseSize = t, this;
    }, r.prototype.toJSON = function () {
      return {
        method: this.method,
        url: this.url,
        data: this._data,
        headers: this._header
      };
    }, r.prototype.send = function (t) {
      var e = s(t),
          n = this._header["content-type"];
      if (this._formData && console.error(".send() can't be used if .attach() or .field() is used. Please use only .send() or only .field() & .attach()"), e && !this._data) Array.isArray(t) ? this._data = [] : this._isHost(t) || (this._data = {});else if (t && this._data && this._isHost(this._data)) throw Error("Can't merge these send calls");
      if (e && s(this._data)) for (var r in t) this._data[r] = t[r];else "string" == typeof t ? (n || this.type("form"), n = this._header["content-type"], this._data = "application/x-www-form-urlencoded" == n ? this._data ? this._data + "&" + t : t : (this._data || "") + t) : this._data = t;
      return !e || this._isHost(t) ? this : (n || this.type("json"), this);
    }, r.prototype.sortQuery = function (t) {
      return this._sort = void 0 === t || t, this;
    }, r.prototype._finalizeQueryString = function () {
      var t = this._query.join("&");

      if (t && (this.url += (this.url.indexOf("?") >= 0 ? "&" : "?") + t), this._query.length = 0, this._sort) {
        var e = this.url.indexOf("?");

        if (e >= 0) {
          var n = this.url.substring(e + 1).split("&");
          "function" == typeof this._sort ? n.sort(this._sort) : n.sort(), this.url = this.url.substring(0, e) + "?" + n.join("&");
        }
      }
    }, r.prototype._appendQueryString = function () {
      console.trace("Unsupported");
    }, r.prototype._timeoutError = function (t, e, n) {
      if (!this._aborted) {
        var r = new Error(t + e + "ms exceeded");
        r.timeout = e, r.code = "ECONNABORTED", r.errno = n, this.timedout = !0, this.abort(), this.callback(r);
      }
    }, r.prototype._setTimeouts = function () {
      var t = this;
      this._timeout && !this._timer && (this._timer = setTimeout(function () {
        t._timeoutError("Timeout of ", t._timeout, "ETIME");
      }, this._timeout)), this._responseTimeout && !this._responseTimeoutTimer && (this._responseTimeoutTimer = setTimeout(function () {
        t._timeoutError("Response timeout of ", t._responseTimeout, "ETIMEDOUT");
      }, this._responseTimeout));
    };
  }, function (t, e, n) {
    "use strict";

    function r(t) {
      if (t) return i(t);
    }

    function i(t) {
      for (var e in r.prototype) t[e] = r.prototype[e];

      return t;
    }

    var s = n(25);
    t.exports = r, r.prototype.get = function (t) {
      return this.header[t.toLowerCase()];
    }, r.prototype._setHeaderProperties = function (t) {
      var e = t["content-type"] || "";
      this.type = s.type(e);
      var n = s.params(e);

      for (var r in n) this[r] = n[r];

      this.links = {};

      try {
        t.link && (this.links = s.parseLinks(t.link));
      } catch (t) {}
    }, r.prototype._setStatusProperties = function (t) {
      var e = t / 100 | 0;
      this.status = this.statusCode = t, this.statusType = e, this.info = 1 == e, this.ok = 2 == e, this.redirect = 3 == e, this.clientError = 4 == e, this.serverError = 5 == e, this.error = (4 == e || 5 == e) && this.toError(), this.created = 201 == t, this.accepted = 202 == t, this.noContent = 204 == t, this.badRequest = 400 == t, this.unauthorized = 401 == t, this.notAcceptable = 406 == t, this.forbidden = 403 == t, this.notFound = 404 == t, this.unprocessableEntity = 422 == t;
    };
  }, function (t, e, n) {
    "use strict";

    e.type = function (t) {
      return t.split(/ *; */).shift();
    }, e.params = function (t) {
      return t.split(/ *; */).reduce(function (t, e) {
        var n = e.split(/ *= */),
            r = n.shift(),
            i = n.shift();
        return r && i && (t[r] = i), t;
      }, {});
    }, e.parseLinks = function (t) {
      return t.split(/ *, */).reduce(function (t, e) {
        var n = e.split(/ *; */),
            r = n[0].slice(1, -1);
        return t[n[1].split(/ *= */)[1].slice(1, -1)] = r, t;
      }, {});
    }, e.cleanHeader = function (t, e) {
      return delete t["content-type"], delete t["content-length"], delete t["transfer-encoding"], delete t.host, e && (delete t.authorization, delete t.cookie), t;
    };
  }, function (t, e) {
    function n() {
      this._defaults = [];
    }

    ["use", "on", "once", "set", "query", "type", "accept", "auth", "withCredentials", "sortQuery", "retry", "ok", "redirects", "timeout", "buffer", "serialize", "parse", "ca", "key", "pfx", "cert"].forEach(function (t) {
      n.prototype[t] = function () {
        return this._defaults.push({
          fn: t,
          arguments: arguments
        }), this;
      };
    }), n.prototype._setDefaults = function (t) {
      this._defaults.forEach(function (e) {
        t[e.fn].apply(t, e.arguments);
      });
    }, t.exports = n;
  }, function (t, e, n) {
    "use strict";

    function r(t) {
      function e(t) {
        for (var e = 0, n = 0; n < t.length; n++) e = (e << 5) - e + t.charCodeAt(n), e |= 0;

        return r.colors[Math.abs(e) % r.colors.length];
      }

      function r(t) {
        function n() {
          if (n.enabled) {
            for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++) e[i] = arguments[i];

            var s = n,
                a = Number(new Date()),
                u = a - (o || a);
            s.diff = u, s.prev = o, s.curr = a, o = a, e[0] = r.coerce(e[0]), "string" != typeof e[0] && e.unshift("%O");
            var c = 0;
            e[0] = e[0].replace(/%([a-zA-Z%])/g, function (t, n) {
              if ("%%" === t) return t;
              c++;
              var i = r.formatters[n];

              if ("function" == typeof i) {
                var o = e[c];
                t = i.call(s, o), e.splice(c, 1), c--;
              }

              return t;
            }), r.formatArgs.call(s, e);
            (s.log || r.log).apply(s, e);
          }
        }

        var o;
        return n.namespace = t, n.enabled = r.enabled(t), n.useColors = r.useColors(), n.color = e(t), n.destroy = i, n.extend = s, "function" == typeof r.init && r.init(n), r.instances.push(n), n;
      }

      function i() {
        var t = r.instances.indexOf(this);
        return -1 !== t && (r.instances.splice(t, 1), !0);
      }

      function s(t, e) {
        return r(this.namespace + (void 0 === e ? ":" : e) + t);
      }

      function o(t) {
        r.save(t), r.names = [], r.skips = [];
        var e,
            n = ("string" == typeof t ? t : "").split(/[\s,]+/),
            i = n.length;

        for (e = 0; e < i; e++) n[e] && (t = n[e].replace(/\*/g, ".*?"), "-" === t[0] ? r.skips.push(new RegExp("^" + t.substr(1) + "$")) : r.names.push(new RegExp("^" + t + "$")));

        for (e = 0; e < r.instances.length; e++) {
          var s = r.instances[e];
          s.enabled = r.enabled(s.namespace);
        }
      }

      function a() {
        r.enable("");
      }

      function u(t) {
        if ("*" === t[t.length - 1]) return !0;
        var e, n;

        for (e = 0, n = r.skips.length; e < n; e++) if (r.skips[e].test(t)) return !1;

        for (e = 0, n = r.names.length; e < n; e++) if (r.names[e].test(t)) return !0;

        return !1;
      }

      function c(t) {
        return t instanceof Error ? t.stack || t.message : t;
      }

      return r.debug = r, r.default = r, r.coerce = c, r.disable = a, r.enable = o, r.enabled = u, r.humanize = n(28), Object.keys(t).forEach(function (e) {
        r[e] = t[e];
      }), r.instances = [], r.names = [], r.skips = [], r.formatters = {}, r.selectColor = e, r.enable(r.load()), r;
    }

    t.exports = r;
  }, function (t, e) {
    function n(t) {
      if (t = String(t), !(t.length > 100)) {
        var e = /^((?:\d+)?\-?\d?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(t);

        if (e) {
          var n = parseFloat(e[1]);

          switch ((e[2] || "ms").toLowerCase()) {
            case "years":
            case "year":
            case "yrs":
            case "yr":
            case "y":
              return n * h;

            case "weeks":
            case "week":
            case "w":
              return n * l;

            case "days":
            case "day":
            case "d":
              return n * c;

            case "hours":
            case "hour":
            case "hrs":
            case "hr":
            case "h":
              return n * u;

            case "minutes":
            case "minute":
            case "mins":
            case "min":
            case "m":
              return n * a;

            case "seconds":
            case "second":
            case "secs":
            case "sec":
            case "s":
              return n * o;

            case "milliseconds":
            case "millisecond":
            case "msecs":
            case "msec":
            case "ms":
              return n;

            default:
              return;
          }
        }
      }
    }

    function r(t) {
      var e = Math.abs(t);
      return e >= c ? Math.round(t / c) + "d" : e >= u ? Math.round(t / u) + "h" : e >= a ? Math.round(t / a) + "m" : e >= o ? Math.round(t / o) + "s" : t + "ms";
    }

    function i(t) {
      var e = Math.abs(t);
      return e >= c ? s(t, e, c, "day") : e >= u ? s(t, e, u, "hour") : e >= a ? s(t, e, a, "minute") : e >= o ? s(t, e, o, "second") : t + " ms";
    }

    function s(t, e, n, r) {
      var i = e >= 1.5 * n;
      return Math.round(t / n) + " " + r + (i ? "s" : "");
    }

    var o = 1e3,
        a = 60 * o,
        u = 60 * a,
        c = 24 * u,
        l = 7 * c,
        h = 365.25 * c;

    t.exports = function (t, e) {
      e = e || {};
      var s = typeof t;
      if ("string" === s && t.length > 0) return n(t);
      if ("number" === s && !1 === isNaN(t)) return e.long ? i(t) : r(t);
      throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(t));
    };
  }, function (t, e, n) {
    (function (e) {
      /*!
      * @overview es6-promise - a tiny implementation of Promises/A+.
      * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
      * @license   Licensed under MIT license
      *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
      * @version   v4.2.3+b33f4734
      */
      !function (e, n) {
        t.exports = n();
      }(0, function () {
        "use strict";

        function t(t) {
          var e = typeof t;
          return null !== t && ("object" === e || "function" === e);
        }

        function r(t) {
          return "function" == typeof t;
        }

        function i(t) {
          B = t;
        }

        function s(t) {
          W = t;
        }

        function o() {
          return void 0 !== M ? function () {
            M(u);
          } : a();
        }

        function a() {
          var t = setTimeout;
          return function () {
            return t(u, 1);
          };
        }

        function u() {
          for (var t = 0; t < q; t += 2) {
            (0, G[t])(G[t + 1]), G[t] = void 0, G[t + 1] = void 0;
          }

          q = 0;
        }

        function c(t, e) {
          var n = this,
              r = new this.constructor(h);
          void 0 === r[$] && j(r);
          var i = n._state;

          if (i) {
            var s = arguments[i - 1];
            W(function () {
              return E(i, r, s, n._result);
            });
          } else A(n, r, t, e);

          return r;
        }

        function l(t) {
          var e = this;
          if (t && "object" == typeof t && t.constructor === e) return t;
          var n = new e(h);
          return g(n, t), n;
        }

        function h() {}

        function f() {
          return new TypeError("You cannot resolve a promise with itself");
        }

        function d() {
          return new TypeError("A promises callback cannot return that same promise.");
        }

        function p(t) {
          try {
            return t.then;
          } catch (t) {
            return tt.error = t, tt;
          }
        }

        function _(t, e, n, r) {
          try {
            t.call(e, n, r);
          } catch (t) {
            return t;
          }
        }

        function v(t, e, n) {
          W(function (t) {
            var r = !1,
                i = _(n, e, function (n) {
              r || (r = !0, e !== n ? g(t, n) : w(t, n));
            }, function (e) {
              r || (r = !0, O(t, e));
            }, "Settle: " + (t._label || " unknown promise"));

            !r && i && (r = !0, O(t, i));
          }, t);
        }

        function y(t, e) {
          e._state === Y ? w(t, e._result) : e._state === Z ? O(t, e._result) : A(e, void 0, function (e) {
            return g(t, e);
          }, function (e) {
            return O(t, e);
          });
        }

        function m(t, e, n) {
          e.constructor === t.constructor && n === c && e.constructor.resolve === l ? y(t, e) : n === tt ? (O(t, tt.error), tt.error = null) : void 0 === n ? w(t, e) : r(n) ? v(t, e, n) : w(t, e);
        }

        function g(e, n) {
          e === n ? O(e, f()) : t(n) ? m(e, n, p(n)) : w(e, n);
        }

        function b(t) {
          t._onerror && t._onerror(t._result), S(t);
        }

        function w(t, e) {
          t._state === X && (t._result = e, t._state = Y, 0 !== t._subscribers.length && W(S, t));
        }

        function O(t, e) {
          t._state === X && (t._state = Z, t._result = e, W(b, t));
        }

        function A(t, e, n, r) {
          var i = t._subscribers,
              s = i.length;
          t._onerror = null, i[s] = e, i[s + Y] = n, i[s + Z] = r, 0 === s && t._state && W(S, t);
        }

        function S(t) {
          var e = t._subscribers,
              n = t._state;

          if (0 !== e.length) {
            for (var r = void 0, i = void 0, s = t._result, o = 0; o < e.length; o += 3) r = e[o], i = e[o + n], r ? E(n, r, i, s) : i(s);

            t._subscribers.length = 0;
          }
        }

        function C(t, e) {
          try {
            return t(e);
          } catch (t) {
            return tt.error = t, tt;
          }
        }

        function E(t, e, n, i) {
          var s = r(n),
              o = void 0,
              a = void 0,
              u = void 0,
              c = void 0;

          if (s) {
            if (o = C(n, i), o === tt ? (c = !0, a = o.error, o.error = null) : u = !0, e === o) return void O(e, d());
          } else o = i, u = !0;

          e._state !== X || (s && u ? g(e, o) : c ? O(e, a) : t === Y ? w(e, o) : t === Z && O(e, o));
        }

        function T(t, e) {
          try {
            e(function (e) {
              g(t, e);
            }, function (e) {
              O(t, e);
            });
          } catch (e) {
            O(t, e);
          }
        }

        function N() {
          return et++;
        }

        function j(t) {
          t[$] = et++, t._state = void 0, t._result = void 0, t._subscribers = [];
        }

        function x() {
          return new Error("Array Methods must be provided an Array");
        }

        function U(t) {
          return new nt(this, t).promise;
        }

        function k(t) {
          var e = this;
          return new e(F(t) ? function (n, r) {
            for (var i = t.length, s = 0; s < i; s++) e.resolve(t[s]).then(n, r);
          } : function (t, e) {
            return e(new TypeError("You must pass an array to race."));
          });
        }

        function I(t) {
          var e = this,
              n = new e(h);
          return O(n, t), n;
        }

        function R() {
          throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");
        }

        function D() {
          throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
        }

        function P() {
          var t = void 0;
          if (void 0 !== e) t = e;else if ("undefined" != typeof self) t = self;else try {
            t = Function("return this")();
          } catch (t) {
            throw new Error("polyfill failed because global object is unavailable in this environment");
          }
          var n = t.Promise;

          if (n) {
            var r = null;

            try {
              r = Object.prototype.toString.call(n.resolve());
            } catch (t) {}

            if ("[object Promise]" === r && !n.cast) return;
          }

          t.Promise = rt;
        }

        var L = void 0;
        L = Array.isArray ? Array.isArray : function (t) {
          return "[object Array]" === Object.prototype.toString.call(t);
        };

        var F = L,
            q = 0,
            M = void 0,
            B = void 0,
            W = function (t, e) {
          G[q] = t, G[q + 1] = e, 2 === (q += 2) && (B ? B(u) : H());
        },
            J = "undefined" != typeof window ? window : void 0,
            Q = J || {},
            V = Q.MutationObserver || Q.WebKitMutationObserver,
            K = "undefined" == typeof self && "undefined" != typeof process && "[object process]" === {}.toString.call(process),
            z = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel,
            G = new Array(1e3),
            H = void 0;

        H = K ? function () {
          return function () {
            return process.nextTick(u);
          };
        }() : V ? function () {
          var t = 0,
              e = new V(u),
              n = document.createTextNode("");
          return e.observe(n, {
            characterData: !0
          }), function () {
            n.data = t = ++t % 2;
          };
        }() : z ? function () {
          var t = new MessageChannel();
          return t.port1.onmessage = u, function () {
            return t.port2.postMessage(0);
          };
        }() : void 0 === J ? function () {
          try {
            var t = n(30);
            return M = t.runOnLoop || t.runOnContext, o();
          } catch (t) {
            return a();
          }
        }() : a();

        var $ = Math.random().toString(36).substring(2),
            X = void 0,
            Y = 1,
            Z = 2,
            tt = {
          error: null
        },
            et = 0,
            nt = function () {
          function t(t, e) {
            this._instanceConstructor = t, this.promise = new t(h), this.promise[$] || j(this.promise), F(e) ? (this.length = e.length, this._remaining = e.length, this._result = new Array(this.length), 0 === this.length ? w(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(e), 0 === this._remaining && w(this.promise, this._result))) : O(this.promise, x());
          }

          return t.prototype._enumerate = function (t) {
            for (var e = 0; this._state === X && e < t.length; e++) this._eachEntry(t[e], e);
          }, t.prototype._eachEntry = function (t, e) {
            var n = this._instanceConstructor,
                r = n.resolve;

            if (r === l) {
              var i = p(t);
              if (i === c && t._state !== X) this._settledAt(t._state, e, t._result);else if ("function" != typeof i) this._remaining--, this._result[e] = t;else if (n === rt) {
                var s = new n(h);
                m(s, t, i), this._willSettleAt(s, e);
              } else this._willSettleAt(new n(function (e) {
                return e(t);
              }), e);
            } else this._willSettleAt(r(t), e);
          }, t.prototype._settledAt = function (t, e, n) {
            var r = this.promise;
            r._state === X && (this._remaining--, t === Z ? O(r, n) : this._result[e] = n), 0 === this._remaining && w(r, this._result);
          }, t.prototype._willSettleAt = function (t, e) {
            var n = this;
            A(t, void 0, function (t) {
              return n._settledAt(Y, e, t);
            }, function (t) {
              return n._settledAt(Z, e, t);
            });
          }, t;
        }(),
            rt = function () {
          function t(e) {
            this[$] = N(), this._result = this._state = void 0, this._subscribers = [], h !== e && ("function" != typeof e && R(), this instanceof t ? T(this, e) : D());
          }

          return t.prototype.catch = function (t) {
            return this.then(null, t);
          }, t.prototype.finally = function (t) {
            var e = this,
                n = e.constructor;
            return e.then(function (e) {
              return n.resolve(t()).then(function () {
                return e;
              });
            }, function (e) {
              return n.resolve(t()).then(function () {
                throw e;
              });
            });
          }, t;
        }();

        return rt.prototype.then = c, rt.all = U, rt.race = k, rt.resolve = l, rt.reject = I, rt._setScheduler = i, rt._setAsap = s, rt._asap = W, rt.polyfill = P, rt.Promise = rt, rt;
      });
    }).call(e, n(7));
  }, function (t, e) {}, function (t, e, n) {
    "use strict";

    (function (e) {
      var r = n(0),
          i = {},
          s = ["getItem", "setItem", "removeItem", "clear"],
          o = e.localStorage;

      try {
        var a = "__storejs__";
        if (o.setItem(a, a), o.getItem(a) != a) throw new Error();
        o.removeItem(a);
      } catch (t) {
        o = n(32);
      }

      r(s).each(function (t) {
        i[t] = function () {
          return o[t].apply(o, arguments);
        };
      }), i.async = !1, t.exports = i;
    }).call(e, n(7));
  }, function (t, e, n) {
    !function (e) {
      var n = {},
          r = {};
      n.length = 0, n.getItem = function (t) {
        return t in r ? r[t] : null;
      }, n.setItem = function (t, e) {
        void 0 === e ? n.removeItem(t) : (r.hasOwnProperty(t) || n.length++, r[t] = "" + e);
      }, n.removeItem = function (t) {
        r.hasOwnProperty(t) && (delete r[t], n.length--);
      }, n.key = function (t) {
        return Object.keys(r)[t] || null;
      }, n.clear = function () {
        r = {}, n.length = 0;
      }, t.exports = n;
    }();
  }, function (t, e, n) {
    "use strict";

    function r(t) {
      var e = void 0,
          n = t.slice(0, 8).toLowerCase();

      switch (t.slice(-9)) {
        case "-9Nh9j0Va":
          e = "lncldapi.com";
          break;

        case "-MdYXbMMI":
          e = "lncldglobal.com";
          break;

        default:
          e = "lncld.net";
      }

      return {
        push: "https://" + n + ".push." + e,
        stats: "https://" + n + ".stats." + e,
        engine: "https://" + n + ".engine." + e,
        api: "https://" + n + ".api." + e
      };
    }

    var i = n(5),
        s = n(34),
        o = n(3),
        a = o.isNullOrUndefined,
        u = n(0),
        c = u.extend,
        l = u.isObject,
        h = function (t) {
      return {
        push: t,
        stats: t,
        engine: t,
        api: t
      };
    },
        f = !1;

    i.init = function (t) {
      if (!l(t)) return i.init({
        appId: t,
        appKey: arguments.length <= 1 ? void 0 : arguments[1],
        masterKey: arguments.length <= 2 ? void 0 : arguments[2]
      });
      var e = t.appId,
          n = t.appKey,
          o = t.masterKey,
          a = (t.hookKey, t.serverURLs),
          u = t.disableCurrentUser,
          d = t.production,
          p = t.realtime;
      if (i.applicationId) throw new Error("SDK is already initialized.");
      if (!e) throw new TypeError("appId must be a string");
      if (!n) throw new TypeError("appKey must be a string");
      o && console.warn("MasterKey is not supposed to be used in browser."), i._config.applicationId = e, i._config.applicationKey = n, i._config.masterKey = o, void 0 !== d && (i._config.production = d), void 0 !== u && (i._config.disableCurrentUser = u), i._appRouter = new s(i);

      var _ = f || void 0 !== a;

      i._setServerURLs(c({}, r(e), i._config.serverURLs, "string" == typeof a ? h(a) : a), _), p ? i._config.realtime = p : i._sharedConfig.liveQueryRealtime && (i._config.realtime = new i._sharedConfig.liveQueryRealtime({
        appId: e,
        appKey: n
      }));
    }, i.setProduction = function (t) {
      a(t) ? i._config.production = null : i._config.production = t ? 1 : 0;
    }, i._setServerURLs = function (t) {
      var e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
      "string" != typeof t ? c(i._config.serverURLs, t) : i._config.serverURLs = h(t), e && (i._appRouter ? i._appRouter.disable() : f = !0);
    }, i.setServerURLs = function (t) {
      return i._setServerURLs(t);
    }, i.keepErrorRawMessage = function (t) {
      i._sharedConfig.keepErrorRawMessage = t;
    }, i.setRequestTimeout = function (t) {
      i._config.requestTimeout = t;
    }, i.initialize = i.init, ["applicationId", "applicationKey", "masterKey", "hookKey"].forEach(function (t) {
      return Object.defineProperty(i, t, {
        get: function () {
          return i._config[t];
        },
        set: function (e) {
          i._config[t] = e;
        }
      });
    });
  }, function (t, e, n) {
    "use strict";

    function r(t) {
      var e = this;
      this.AV = t, this.lockedUntil = 0, o.getAsync("serverURLs").then(function (t) {
        if (!e.disabled) {
          if (!t) return e.lock(0);
          var n = t.serverURLs,
              r = t.lockedUntil;
          e.AV._setServerURLs(n, !1), e.lockedUntil = r;
        }
      }).catch(function () {
        return e.lock(0);
      });
    }

    var i = n(3),
        s = i.ajax,
        o = n(13);
    r.prototype.disable = function () {
      this.disabled = !0;
    }, r.prototype.lock = function (t) {
      this.lockedUntil = Date.now() + t;
    }, r.prototype.refresh = function () {
      var t = this;

      if (!(this.disabled || Date.now() < this.lockedUntil)) {
        this.lock(10);
        return s({
          method: "get",
          url: "https://app-router.leancloud.cn/2/route",
          query: {
            appId: this.AV.applicationId
          }
        }).then(function (e) {
          if (!t.disabled) {
            var n = e.ttl;
            if (!n) throw new Error("missing ttl");
            n *= 1e3;
            var r = {
              push: "https://" + e.push_server,
              stats: "https://" + e.stats_server,
              engine: "https://" + e.engine_server,
              api: "https://" + e.api_server
            };
            return t.AV._setServerURLs(r, !1), t.lock(n), o.setAsync("serverURLs", {
              serverURLs: r,
              lockedUntil: t.lockedUntil
            }, n);
          }
        }).catch(function (e) {
          console.warn("refresh server URLs failed: " + e.message), t.lock(600);
        });
      }
    }, t.exports = r;
  }, function (t, e, n) {
    "use strict";

    var r = n(0);

    t.exports = function (t) {
      var e = /\s+/,
          n = Array.prototype.slice;
      t.Events = {
        on: function (t, n, r) {
          var i, s, o, a, u;
          if (!n) return this;

          for (t = t.split(e), i = this._callbacks || (this._callbacks = {}), s = t.shift(); s;) u = i[s], o = u ? u.tail : {}, o.next = a = {}, o.context = r, o.callback = n, i[s] = {
            tail: a,
            next: u ? u.next : o
          }, s = t.shift();

          return this;
        },
        off: function (t, n, i) {
          var s, o, a, u, c, l;

          if (o = this._callbacks) {
            if (!(t || n || i)) return delete this._callbacks, this;

            for (t = t ? t.split(e) : r.keys(o), s = t.shift(); s;) if (a = o[s], delete o[s], a && (n || i)) {
              for (u = a.tail, a = a.next; a !== u;) c = a.callback, l = a.context, (n && c !== n || i && l !== i) && this.on(s, c, l), a = a.next;

              s = t.shift();
            }

            return this;
          }
        },
        trigger: function (t) {
          var r, i, s, o, a, u, c;
          if (!(s = this._callbacks)) return this;

          for (u = s.all, t = t.split(e), c = n.call(arguments, 1), r = t.shift(); r;) {
            if (i = s[r]) for (o = i.tail; (i = i.next) !== o;) i.callback.apply(i.context || this, c);
            if (i = u) for (o = i.tail, a = [r].concat(c); (i = i.next) !== o;) i.callback.apply(i.context || this, a);
            r = t.shift();
          }

          return this;
        }
      }, t.Events.bind = t.Events.on, t.Events.unbind = t.Events.off;
    };
  }, function (t, e, n) {
    "use strict";

    var r = n(0),
        i = n(1);

    t.exports = function (t) {
      t.GeoPoint = function (e, n) {
        r.isArray(e) ? (t.GeoPoint._validate(e[0], e[1]), this.latitude = e[0], this.longitude = e[1]) : r.isObject(e) ? (t.GeoPoint._validate(e.latitude, e.longitude), this.latitude = e.latitude, this.longitude = e.longitude) : r.isNumber(e) && r.isNumber(n) ? (t.GeoPoint._validate(e, n), this.latitude = e, this.longitude = n) : (this.latitude = 0, this.longitude = 0);
        var i = this;
        this.__defineGetter__ && this.__defineSetter__ && (this._latitude = this.latitude, this._longitude = this.longitude, this.__defineGetter__("latitude", function () {
          return i._latitude;
        }), this.__defineGetter__("longitude", function () {
          return i._longitude;
        }), this.__defineSetter__("latitude", function (e) {
          t.GeoPoint._validate(e, i.longitude), i._latitude = e;
        }), this.__defineSetter__("longitude", function (e) {
          t.GeoPoint._validate(i.latitude, e), i._longitude = e;
        }));
      }, t.GeoPoint._validate = function (t, e) {
        if (t < -90) throw new Error("AV.GeoPoint latitude " + t + " < -90.0.");
        if (t > 90) throw new Error("AV.GeoPoint latitude " + t + " > 90.0.");
        if (e < -180) throw new Error("AV.GeoPoint longitude " + e + " < -180.0.");
        if (e > 180) throw new Error("AV.GeoPoint longitude " + e + " > 180.0.");
      }, t.GeoPoint.current = function () {
        return new i(function (e, n) {
          navigator.geolocation.getCurrentPosition(function (n) {
            e(new t.GeoPoint({
              latitude: n.coords.latitude,
              longitude: n.coords.longitude
            }));
          }, n);
        });
      }, r.extend(t.GeoPoint.prototype, {
        toJSON: function () {
          return t.GeoPoint._validate(this.latitude, this.longitude), {
            __type: "GeoPoint",
            latitude: this.latitude,
            longitude: this.longitude
          };
        },
        radiansTo: function (t) {
          var e = Math.PI / 180,
              n = this.latitude * e,
              r = this.longitude * e,
              i = t.latitude * e,
              s = t.longitude * e,
              o = n - i,
              a = r - s,
              u = Math.sin(o / 2),
              c = Math.sin(a / 2),
              l = u * u + Math.cos(n) * Math.cos(i) * c * c;
          return l = Math.min(1, l), 2 * Math.asin(Math.sqrt(l));
        },
        kilometersTo: function (t) {
          return 6371 * this.radiansTo(t);
        },
        milesTo: function (t) {
          return 3958.8 * this.radiansTo(t);
        }
      });
    };
  }, function (t, e, n) {
    "use strict";

    var r = n(0);

    t.exports = function (t) {
      t.ACL = function (e) {
        var n = this;
        if (n.permissionsById = {}, r.isObject(e)) if (e instanceof t.User) n.setReadAccess(e, !0), n.setWriteAccess(e, !0);else {
          if (r.isFunction(e)) throw new Error("AV.ACL() called with a function.  Did you forget ()?");

          t._objectEach(e, function (e, i) {
            if (!r.isString(i)) throw new Error("Tried to create an ACL with an invalid userId.");
            n.permissionsById[i] = {}, t._objectEach(e, function (t, e) {
              if ("read" !== e && "write" !== e) throw new Error("Tried to create an ACL with an invalid permission type.");
              if (!r.isBoolean(t)) throw new Error("Tried to create an ACL with an invalid permission value.");
              n.permissionsById[i][e] = t;
            });
          });
        }
      }, t.ACL.prototype.toJSON = function () {
        return r.clone(this.permissionsById);
      }, t.ACL.prototype._setAccess = function (e, n, i) {
        if (n instanceof t.User ? n = n.id : n instanceof t.Role && (n = "role:" + n.getName()), !r.isString(n)) throw new Error("userId must be a string.");
        if (!r.isBoolean(i)) throw new Error("allowed must be either true or false.");
        var s = this.permissionsById[n];

        if (!s) {
          if (!i) return;
          s = {}, this.permissionsById[n] = s;
        }

        i ? this.permissionsById[n][e] = !0 : (delete s[e], r.isEmpty(s) && delete this.permissionsById[n]);
      }, t.ACL.prototype._getAccess = function (e, n) {
        n instanceof t.User ? n = n.id : n instanceof t.Role && (n = "role:" + n.getName());
        var r = this.permissionsById[n];
        return !!r && !!r[e];
      }, t.ACL.prototype.setReadAccess = function (t, e) {
        this._setAccess("read", t, e);
      }, t.ACL.prototype.getReadAccess = function (t) {
        return this._getAccess("read", t);
      }, t.ACL.prototype.setWriteAccess = function (t, e) {
        this._setAccess("write", t, e);
      }, t.ACL.prototype.getWriteAccess = function (t) {
        return this._getAccess("write", t);
      }, t.ACL.prototype.setPublicReadAccess = function (t) {
        this.setReadAccess("*", t);
      }, t.ACL.prototype.getPublicReadAccess = function () {
        return this.getReadAccess("*");
      }, t.ACL.prototype.setPublicWriteAccess = function (t) {
        this.setWriteAccess("*", t);
      }, t.ACL.prototype.getPublicWriteAccess = function () {
        return this.getWriteAccess("*");
      }, t.ACL.prototype.getRoleReadAccess = function (e) {
        if (e instanceof t.Role && (e = e.getName()), r.isString(e)) return this.getReadAccess("role:" + e);
        throw new Error("role must be a AV.Role or a String");
      }, t.ACL.prototype.getRoleWriteAccess = function (e) {
        if (e instanceof t.Role && (e = e.getName()), r.isString(e)) return this.getWriteAccess("role:" + e);
        throw new Error("role must be a AV.Role or a String");
      }, t.ACL.prototype.setRoleReadAccess = function (e, n) {
        if (e instanceof t.Role && (e = e.getName()), r.isString(e)) return void this.setReadAccess("role:" + e, n);
        throw new Error("role must be a AV.Role or a String");
      }, t.ACL.prototype.setRoleWriteAccess = function (e, n) {
        if (e instanceof t.Role && (e = e.getName()), r.isString(e)) return void this.setWriteAccess("role:" + e, n);
        throw new Error("role must be a AV.Role or a String");
      };
    };
  }, function (t, e, n) {
    "use strict";

    var r = n(0);

    t.exports = function (t) {
      t.Op = function () {
        this._initialize.apply(this, arguments);
      }, r.extend(t.Op.prototype, {
        _initialize: function () {}
      }), r.extend(t.Op, {
        _extend: t._extend,
        _opDecoderMap: {},
        _registerDecoder: function (e, n) {
          t.Op._opDecoderMap[e] = n;
        },
        _decode: function (e) {
          var n = t.Op._opDecoderMap[e.__op];
          return n ? n(e) : void 0;
        }
      }), t.Op._registerDecoder("Batch", function (e) {
        var n = null;
        return t._arrayEach(e.ops, function (e) {
          e = t.Op._decode(e), n = e._mergeWithPrevious(n);
        }), n;
      }), t.Op.Set = t.Op._extend({
        _initialize: function (t) {
          this._value = t;
        },
        value: function () {
          return this._value;
        },
        toJSON: function () {
          return t._encode(this.value());
        },
        _mergeWithPrevious: function (t) {
          return this;
        },
        _estimate: function (t) {
          return this.value();
        }
      }), t.Op._UNSET = {}, t.Op.Unset = t.Op._extend({
        toJSON: function () {
          return {
            __op: "Delete"
          };
        },
        _mergeWithPrevious: function (t) {
          return this;
        },
        _estimate: function (e) {
          return t.Op._UNSET;
        }
      }), t.Op._registerDecoder("Delete", function (e) {
        return new t.Op.Unset();
      }), t.Op.Increment = t.Op._extend({
        _initialize: function (t) {
          this._amount = t;
        },
        amount: function () {
          return this._amount;
        },
        toJSON: function () {
          return {
            __op: "Increment",
            amount: this._amount
          };
        },
        _mergeWithPrevious: function (e) {
          if (e) {
            if (e instanceof t.Op.Unset) return new t.Op.Set(this.amount());
            if (e instanceof t.Op.Set) return new t.Op.Set(e.value() + this.amount());
            if (e instanceof t.Op.Increment) return new t.Op.Increment(this.amount() + e.amount());
            throw new Error("Op is invalid after previous op.");
          }

          return this;
        },
        _estimate: function (t) {
          return t ? t + this.amount() : this.amount();
        }
      }), t.Op._registerDecoder("Increment", function (e) {
        return new t.Op.Increment(e.amount);
      }), t.Op.BitAnd = t.Op._extend({
        _initialize: function (t) {
          this._value = t;
        },
        value: function () {
          return this._value;
        },
        toJSON: function () {
          return {
            __op: "BitAnd",
            value: this.value()
          };
        },
        _mergeWithPrevious: function (e) {
          if (e) {
            if (e instanceof t.Op.Unset) return new t.Op.Set(0);
            if (e instanceof t.Op.Set) return new t.Op.Set(e.value() & this.value());
            throw new Error("Op is invalid after previous op.");
          }

          return this;
        },
        _estimate: function (t) {
          return t & this.value();
        }
      }), t.Op._registerDecoder("BitAnd", function (e) {
        return new t.Op.BitAnd(e.value);
      }), t.Op.BitOr = t.Op._extend({
        _initialize: function (t) {
          this._value = t;
        },
        value: function () {
          return this._value;
        },
        toJSON: function () {
          return {
            __op: "BitOr",
            value: this.value()
          };
        },
        _mergeWithPrevious: function (e) {
          if (e) {
            if (e instanceof t.Op.Unset) return new t.Op.Set(this.value());
            if (e instanceof t.Op.Set) return new t.Op.Set(e.value() | this.value());
            throw new Error("Op is invalid after previous op.");
          }

          return this;
        },
        _estimate: function (t) {
          return t | this.value();
        }
      }), t.Op._registerDecoder("BitOr", function (e) {
        return new t.Op.BitOr(e.value);
      }), t.Op.BitXor = t.Op._extend({
        _initialize: function (t) {
          this._value = t;
        },
        value: function () {
          return this._value;
        },
        toJSON: function () {
          return {
            __op: "BitXor",
            value: this.value()
          };
        },
        _mergeWithPrevious: function (e) {
          if (e) {
            if (e instanceof t.Op.Unset) return new t.Op.Set(this.value());
            if (e instanceof t.Op.Set) return new t.Op.Set(e.value() ^ this.value());
            throw new Error("Op is invalid after previous op.");
          }

          return this;
        },
        _estimate: function (t) {
          return t ^ this.value();
        }
      }), t.Op._registerDecoder("BitXor", function (e) {
        return new t.Op.BitXor(e.value);
      }), t.Op.Add = t.Op._extend({
        _initialize: function (t) {
          this._objects = t;
        },
        objects: function () {
          return this._objects;
        },
        toJSON: function () {
          return {
            __op: "Add",
            objects: t._encode(this.objects())
          };
        },
        _mergeWithPrevious: function (e) {
          if (e) {
            if (e instanceof t.Op.Unset) return new t.Op.Set(this.objects());
            if (e instanceof t.Op.Set) return new t.Op.Set(this._estimate(e.value()));
            if (e instanceof t.Op.Add) return new t.Op.Add(e.objects().concat(this.objects()));
            throw new Error("Op is invalid after previous op.");
          }

          return this;
        },
        _estimate: function (t) {
          return t ? t.concat(this.objects()) : r.clone(this.objects());
        }
      }), t.Op._registerDecoder("Add", function (e) {
        return new t.Op.Add(t._decode(e.objects));
      }), t.Op.AddUnique = t.Op._extend({
        _initialize: function (t) {
          this._objects = r.uniq(t);
        },
        objects: function () {
          return this._objects;
        },
        toJSON: function () {
          return {
            __op: "AddUnique",
            objects: t._encode(this.objects())
          };
        },
        _mergeWithPrevious: function (e) {
          if (e) {
            if (e instanceof t.Op.Unset) return new t.Op.Set(this.objects());
            if (e instanceof t.Op.Set) return new t.Op.Set(this._estimate(e.value()));
            if (e instanceof t.Op.AddUnique) return new t.Op.AddUnique(this._estimate(e.objects()));
            throw new Error("Op is invalid after previous op.");
          }

          return this;
        },
        _estimate: function (e) {
          if (e) {
            var n = r.clone(e);
            return t._arrayEach(this.objects(), function (e) {
              if (e instanceof t.Object && e.id) {
                var i = r.find(n, function (n) {
                  return n instanceof t.Object && n.id === e.id;
                });

                if (i) {
                  var s = r.indexOf(n, i);
                  n[s] = e;
                } else n.push(e);
              } else r.contains(n, e) || n.push(e);
            }), n;
          }

          return r.clone(this.objects());
        }
      }), t.Op._registerDecoder("AddUnique", function (e) {
        return new t.Op.AddUnique(t._decode(e.objects));
      }), t.Op.Remove = t.Op._extend({
        _initialize: function (t) {
          this._objects = r.uniq(t);
        },
        objects: function () {
          return this._objects;
        },
        toJSON: function () {
          return {
            __op: "Remove",
            objects: t._encode(this.objects())
          };
        },
        _mergeWithPrevious: function (e) {
          if (e) {
            if (e instanceof t.Op.Unset) return e;
            if (e instanceof t.Op.Set) return new t.Op.Set(this._estimate(e.value()));
            if (e instanceof t.Op.Remove) return new t.Op.Remove(r.union(e.objects(), this.objects()));
            throw new Error("Op is invalid after previous op.");
          }

          return this;
        },
        _estimate: function (e) {
          if (e) {
            var n = r.difference(e, this.objects());
            return t._arrayEach(this.objects(), function (e) {
              e instanceof t.Object && e.id && (n = r.reject(n, function (n) {
                return n instanceof t.Object && n.id === e.id;
              }));
            }), n;
          }

          return [];
        }
      }), t.Op._registerDecoder("Remove", function (e) {
        return new t.Op.Remove(t._decode(e.objects));
      }), t.Op.Relation = t.Op._extend({
        _initialize: function (e, n) {
          this._targetClassName = null;

          var i = this,
              s = function (e) {
            if (e instanceof t.Object) {
              if (!e.id) throw new Error("You can't add an unsaved AV.Object to a relation.");
              if (i._targetClassName || (i._targetClassName = e.className), i._targetClassName !== e.className) throw new Error("Tried to create a AV.Relation with 2 different types: " + i._targetClassName + " and " + e.className + ".");
              return e.id;
            }

            return e;
          };

          this.relationsToAdd = r.uniq(r.map(e, s)), this.relationsToRemove = r.uniq(r.map(n, s));
        },
        added: function () {
          var e = this;
          return r.map(this.relationsToAdd, function (n) {
            var r = t.Object._create(e._targetClassName);

            return r.id = n, r;
          });
        },
        removed: function () {
          var e = this;
          return r.map(this.relationsToRemove, function (n) {
            var r = t.Object._create(e._targetClassName);

            return r.id = n, r;
          });
        },
        toJSON: function () {
          var t = null,
              e = null,
              n = this,
              i = function (t) {
            return {
              __type: "Pointer",
              className: n._targetClassName,
              objectId: t
            };
          },
              s = null;

          return this.relationsToAdd.length > 0 && (s = r.map(this.relationsToAdd, i), t = {
            __op: "AddRelation",
            objects: s
          }), this.relationsToRemove.length > 0 && (s = r.map(this.relationsToRemove, i), e = {
            __op: "RemoveRelation",
            objects: s
          }), t && e ? {
            __op: "Batch",
            ops: [t, e]
          } : t || e || {};
        },
        _mergeWithPrevious: function (e) {
          if (e) {
            if (e instanceof t.Op.Unset) throw new Error("You can't modify a relation after deleting it.");

            if (e instanceof t.Op.Relation) {
              if (e._targetClassName && e._targetClassName !== this._targetClassName) throw new Error("Related object must be of class " + e._targetClassName + ", but " + this._targetClassName + " was passed in.");
              var n = r.union(r.difference(e.relationsToAdd, this.relationsToRemove), this.relationsToAdd),
                  i = r.union(r.difference(e.relationsToRemove, this.relationsToAdd), this.relationsToRemove),
                  s = new t.Op.Relation(n, i);
              return s._targetClassName = this._targetClassName, s;
            }

            throw new Error("Op is invalid after previous op.");
          }

          return this;
        },
        _estimate: function (e, n, r) {
          if (e) {
            if (e instanceof t.Relation) {
              if (this._targetClassName) if (e.targetClassName) {
                if (e.targetClassName !== this._targetClassName) throw new Error("Related object must be a " + e.targetClassName + ", but a " + this._targetClassName + " was passed in.");
              } else e.targetClassName = this._targetClassName;
              return e;
            }

            throw new Error("Op is invalid after previous op.");
          }

          new t.Relation(n, r).targetClassName = this._targetClassName;
        }
      }), t.Op._registerDecoder("AddRelation", function (e) {
        return new t.Op.Relation(t._decode(e.objects), []);
      }), t.Op._registerDecoder("RemoveRelation", function (e) {
        return new t.Op.Relation([], t._decode(e.objects));
      });
    };
  }, function (t, e, n) {
    "use strict";

    var r = n(0);

    t.exports = function (t) {
      t.Relation = function (t, e) {
        if (!r.isString(e)) throw new TypeError("key must be a string");
        this.parent = t, this.key = e, this.targetClassName = null;
      }, t.Relation.reverseQuery = function (e, n, r) {
        var i = new t.Query(e);
        return i.equalTo(n, r._toPointer()), i;
      }, r.extend(t.Relation.prototype, {
        _ensureParentAndKey: function (t, e) {
          if (this.parent = this.parent || t, this.key = this.key || e, this.parent !== t) throw new Error("Internal Error. Relation retrieved from two different Objects.");
          if (this.key !== e) throw new Error("Internal Error. Relation retrieved from two different keys.");
        },
        add: function (e) {
          r.isArray(e) || (e = [e]);
          var n = new t.Op.Relation(e, []);
          this.parent.set(this.key, n), this.targetClassName = n._targetClassName;
        },
        remove: function (e) {
          r.isArray(e) || (e = [e]);
          var n = new t.Op.Relation([], e);
          this.parent.set(this.key, n), this.targetClassName = n._targetClassName;
        },
        toJSON: function () {
          return {
            __type: "Relation",
            className: this.targetClassName
          };
        },
        query: function () {
          var e, n;
          return this.targetClassName ? (e = t.Object._getSubclass(this.targetClassName), n = new t.Query(e)) : (e = t.Object._getSubclass(this.parent.className), n = new t.Query(e), n._extraOptions.redirectClassNameForKey = this.key), n._addCondition("$relatedTo", "object", this.parent._toPointer()), n._addCondition("$relatedTo", "key", this.key), n;
        }
      });
    };
  }, function (t, e, n) {
    "use strict";

    var r = n(0),
        i = n(41),
        s = n(42),
        o = n(43),
        a = n(4),
        u = n(2)._request,
        c = n(1),
        l = n(3),
        h = l.tap,
        f = l.transformFetchOptions,
        d = n(6)("leancloud:file"),
        p = n(47);

    t.exports = function (t) {
      var e = function () {
        return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);
      },
          n = function (t) {
        return r.isString(t) ? t.match(/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/)[4] : "";
      },
          l = function (t) {
        if (t < 26) return String.fromCharCode(65 + t);
        if (t < 52) return String.fromCharCode(t - 26 + 97);
        if (t < 62) return String.fromCharCode(t - 52 + 48);
        if (62 === t) return "+";
        if (63 === t) return "/";
        throw new Error("Tried to encode large digit " + t + " in base64.");
      },
          _ = function (t) {
        var e = [];
        return e.length = Math.ceil(t.length / 3), r.times(e.length, function (n) {
          var r = t[3 * n],
              i = t[3 * n + 1] || 0,
              s = t[3 * n + 2] || 0,
              o = 3 * n + 1 < t.length,
              a = 3 * n + 2 < t.length;
          e[n] = [l(r >> 2 & 63), l(r << 4 & 48 | i >> 4 & 15), o ? l(i << 2 & 60 | s >> 6 & 3) : "=", a ? l(63 & s) : "="].join("");
        }), e.join("");
      };

      t.File = function (e, i, s) {
        if (this.attributes = {
          name: e,
          url: "",
          metaData: {},
          base64: ""
        }, r.isString(i)) throw new TypeError("Creating an AV.File from a String is not yet supported.");
        r.isArray(i) && (this.attributes.metaData.size = i.length, i = {
          base64: _(i)
        }), this._extName = "", this._data = i, this._uploadHeaders = {}, "undefined" != typeof Blob && i instanceof Blob && (i.size && (this.attributes.metaData.size = i.size), i.name && (this._extName = n(i.name)));
        var o = void 0;
        if (i && i.owner) o = i.owner;else if (!t._config.disableCurrentUser) try {
          o = t.User.current();
        } catch (t) {
          if ("SYNC_API_NOT_AVAILABLE" !== t.code) throw t;
        }
        this.attributes.metaData.owner = o ? o.id : "unknown", this.set("mime_type", s);
      }, t.File.withURL = function (e, n, r, i) {
        if (!e || !n) throw new Error("Please provide file name and url");
        var s = new t.File(e, null, i);
        if (r) for (var o in r) s.attributes.metaData[o] || (s.attributes.metaData[o] = r[o]);
        return s.attributes.url = n, s.attributes.metaData.__source = "external", s;
      }, t.File.createWithoutData = function (e) {
        var n = new t.File();
        return n.id = e, n;
      }, r.extend(t.File.prototype, {
        className: "_File",
        _toFullJSON: function (e) {
          var n = this,
              i = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
              s = r.clone(this.attributes);
          return t._objectEach(s, function (n, r) {
            s[r] = t._encode(n, e, void 0, i);
          }), t._objectEach(this._operations, function (t, e) {
            s[e] = t;
          }), r.has(this, "id") && (s.objectId = this.id), r(["createdAt", "updatedAt"]).each(function (t) {
            if (r.has(n, t)) {
              var e = n[t];
              s[t] = r.isDate(e) ? e.toJSON() : e;
            }
          }), i && (s.__type = "File"), s;
        },
        toFullJSON: function () {
          var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
          return this._toFullJSON(t);
        },
        toJSON: function (t, e) {
          var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [this];
          return this._toFullJSON(n, !1);
        },
        _toPointer: function () {
          return {
            __type: "Pointer",
            className: this.className,
            objectId: this.id
          };
        },
        getACL: function () {
          return this._acl;
        },
        setACL: function (e) {
          if (!(e instanceof t.ACL)) return new a(a.OTHER_CAUSE, "ACL must be a AV.ACL.");
          this._acl = e;
        },
        name: function () {
          return this.get("name");
        },
        url: function () {
          return this.get("url");
        },
        get: function (t) {
          switch (t) {
            case "objectId":
              return this.id;

            case "url":
            case "name":
            case "mime_type":
            case "metaData":
            case "createdAt":
            case "updatedAt":
              return this.attributes[t];

            default:
              return this.attributes.metaData[t];
          }
        },
        set: function () {
          for (var t = this, e = function (e, n) {
            switch (e) {
              case "name":
              case "url":
              case "mime_type":
              case "base64":
              case "metaData":
                t.attributes[e] = n;
                break;

              default:
                t.attributes.metaData[e] = n;
            }
          }, n = arguments.length, r = Array(n), i = 0; i < n; i++) r[i] = arguments[i];

          switch (r.length) {
            case 1:
              for (var s in r[0]) e(s, r[0][s]);

              break;

            case 2:
              e(r[0], r[1]);
          }
        },
        setUploadHeader: function (t, e) {
          return this._uploadHeaders[t] = e, this;
        },
        metaData: function (t, e) {
          return t && e ? (this.attributes.metaData[t] = e, this) : t && !e ? this.attributes.metaData[t] : this.attributes.metaData;
        },
        thumbnailURL: function (t, e) {
          var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 100,
              r = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
              i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : "png",
              s = this.attributes.url;
          if (!s) throw new Error("Invalid url.");
          if (!t || !e || t <= 0 || e <= 0) throw new Error("Invalid width or height value.");
          if (n <= 0 || n > 100) throw new Error("Invalid quality value.");
          return s + "?imageView/" + (r ? 2 : 1) + "/w/" + t + "/h/" + e + "/q/" + n + "/format/" + i;
        },
        size: function () {
          return this.metaData().size;
        },
        ownerId: function () {
          return this.metaData().owner;
        },
        destroy: function (t) {
          return this.id ? u("files", null, this.id, "DELETE", null, t) : c.reject(new Error("The file id does not eixst."));
        },
        _fileToken: function (t, r) {
          var i = this.attributes.name,
              s = n(i);
          !s && this._extName && (i += this._extName, s = this._extName);
          var o = e() + e() + e() + e() + e() + s,
              a = {
            key: o,
            name: i,
            ACL: this._acl,
            mime_type: t,
            metaData: this.attributes.metaData
          };
          return this._qiniu_key = o, u("fileTokens", null, null, "POST", a, r);
        },
        save: function () {
          var t = this,
              e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          if (this.id) throw new Error("File already saved. If you want to manipulate a file, use AV.Query to get it.");
          if (!this._previousSave) if (this._data) {
            var n = this.get("mime_type");
            this._previousSave = this._fileToken(n, e).then(function (a) {
              return a.mime_type && (n = a.mime_type, t.set("mime_type", n)), t._token = a.token, c.resolve().then(function () {
                var e = t._data;
                if (e && e.base64) return p(e.base64, n);
                if (e && e.blob) return !e.blob.type && n && (e.blob.type = n), e.blob.name || (e.blob.name = t.get("name")), e.blob;
                if ("undefined" != typeof Blob && e instanceof Blob) return e;
                throw new TypeError("malformed file data");
              }).then(function (n) {
                var u = r.extend({}, e);

                switch (e.onprogress && (u.onprogress = function (t) {
                  if ("download" !== t.direction) return e.onprogress(t);
                }), a.provider) {
                  case "s3":
                    return o(a, n, t, u);

                  case "qcloud":
                    return i(a, n, t, u);

                  case "qiniu":
                  default:
                    return s(a, n, t, u);
                }
              }).then(h(function () {
                return t._callback(!0);
              }), function (e) {
                throw t._callback(!1), e;
              });
            });
          } else if (this.attributes.url && "external" === this.attributes.metaData.__source) {
            var a = {
              name: this.attributes.name,
              ACL: this._acl,
              metaData: this.attributes.metaData,
              mime_type: this.mimeType,
              url: this.attributes.url
            };
            this._previousSave = u("files", this.attributes.name, null, "post", a, e).then(function (e) {
              return t.attributes.name = e.name, t.attributes.url = e.url, t.id = e.objectId, e.size && (t.attributes.metaData.size = e.size), t;
            });
          }
          return this._previousSave;
        },
        _callback: function (t) {
          u("fileCallback", null, null, "post", {
            token: this._token,
            result: t
          }).catch(d), delete this._token, delete this._data;
        },
        fetch: function (t, e) {
          return u("files", null, this.id, "GET", f(t), e).then(this._finishFetch.bind(this));
        },
        _finishFetch: function (e) {
          var n = t.Object.prototype.parse(e);
          return n.attributes = {
            name: n.name,
            url: n.url,
            mime_type: n.mime_type,
            bucket: n.bucket
          }, n.attributes.metaData = n.metaData || {}, n.id = n.objectId, delete n.objectId, delete n.metaData, delete n.url, delete n.name, delete n.mime_type, delete n.bucket, r.extend(this, n), this;
        }
      });
    };
  }, function (t, e, n) {
    "use strict";

    var r = n(8),
        i = n(6)("cos"),
        s = n(1);

    t.exports = function (t, e, n) {
      var o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
      n.attributes.url = t.url, n._bucket = t.bucket, n.id = t.objectId;
      var a = t.upload_url + "?sign=" + encodeURIComponent(t.token);
      return new s(function (t, s) {
        var u = r("POST", a).set(n._uploadHeaders).attach("fileContent", e, n.attributes.name).field("op", "upload");
        o.onprogress && u.on("progress", o.onprogress), u.end(function (e, r) {
          if (r && i(r.status, r.body, r.text), e) return r && (e.statusCode = r.status, e.responseText = r.text, e.response = r.body), s(e);
          t(n);
        });
      });
    };
  }, function (t, e, n) {
    "use strict";

    var r = n(8),
        i = n(1),
        s = n(6)("qiniu");

    t.exports = function (t, e, n) {
      var o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
      n.attributes.url = t.url, n._bucket = t.bucket, n.id = t.objectId;
      var a = t.token,
          u = t.upload_url || "https://upload.qiniup.com";
      return new i(function (t, i) {
        var c = r("POST", u).set(n._uploadHeaders).attach("file", e, n.attributes.name).field("name", n.attributes.name).field("key", n._qiniu_key).field("token", a);
        o.onprogress && c.on("progress", o.onprogress), c.end(function (e, r) {
          if (r && s(r.status, r.body, r.text), e) return r && (e.statusCode = r.status, e.responseText = r.text, e.response = r.body), i(e);
          t(n);
        });
      });
    };
  }, function (t, e, n) {
    "use strict";

    var r = n(8),
        i = n(1),
        s = function (t, e) {
      return e && (t.statusCode = e.status, t.responseText = e.text, t.response = e.body), t;
    };

    t.exports = function (t, e, n) {
      var o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
      return n.attributes.url = t.url, n._bucket = t.bucket, n.id = t.objectId, new i(function (i, a) {
        var u = r("PUT", t.upload_url).set(Object.assign({
          "Content-Type": n.get("mime_type"),
          "Cache-Control": "public, max-age=31536000"
        }, n._uploadHeaders));
        o.onprogress && u.on("progress", o.onprogress), u.on("response", function (t) {
          if (t.ok) return i(n);
          a(s(t.error, t));
        }), u.on("error", function (t, e) {
          return a(s(t, e));
        }), u.send(e).end();
      });
    };
  }, function (t, e, n) {
    !function () {
      var e = n(45),
          r = n(14).utf8,
          i = n(46),
          s = n(14).bin,
          o = function (t, n) {
        t.constructor == String ? t = n && "binary" === n.encoding ? s.stringToBytes(t) : r.stringToBytes(t) : i(t) ? t = Array.prototype.slice.call(t, 0) : Array.isArray(t) || (t = t.toString());

        for (var a = e.bytesToWords(t), u = 8 * t.length, c = 1732584193, l = -271733879, h = -1732584194, f = 271733878, d = 0; d < a.length; d++) a[d] = 16711935 & (a[d] << 8 | a[d] >>> 24) | 4278255360 & (a[d] << 24 | a[d] >>> 8);

        a[u >>> 5] |= 128 << u % 32, a[14 + (u + 64 >>> 9 << 4)] = u;

        for (var p = o._ff, _ = o._gg, v = o._hh, y = o._ii, d = 0; d < a.length; d += 16) {
          var m = c,
              g = l,
              b = h,
              w = f;
          c = p(c, l, h, f, a[d + 0], 7, -680876936), f = p(f, c, l, h, a[d + 1], 12, -389564586), h = p(h, f, c, l, a[d + 2], 17, 606105819), l = p(l, h, f, c, a[d + 3], 22, -1044525330), c = p(c, l, h, f, a[d + 4], 7, -176418897), f = p(f, c, l, h, a[d + 5], 12, 1200080426), h = p(h, f, c, l, a[d + 6], 17, -1473231341), l = p(l, h, f, c, a[d + 7], 22, -45705983), c = p(c, l, h, f, a[d + 8], 7, 1770035416), f = p(f, c, l, h, a[d + 9], 12, -1958414417), h = p(h, f, c, l, a[d + 10], 17, -42063), l = p(l, h, f, c, a[d + 11], 22, -1990404162), c = p(c, l, h, f, a[d + 12], 7, 1804603682), f = p(f, c, l, h, a[d + 13], 12, -40341101), h = p(h, f, c, l, a[d + 14], 17, -1502002290), l = p(l, h, f, c, a[d + 15], 22, 1236535329), c = _(c, l, h, f, a[d + 1], 5, -165796510), f = _(f, c, l, h, a[d + 6], 9, -1069501632), h = _(h, f, c, l, a[d + 11], 14, 643717713), l = _(l, h, f, c, a[d + 0], 20, -373897302), c = _(c, l, h, f, a[d + 5], 5, -701558691), f = _(f, c, l, h, a[d + 10], 9, 38016083), h = _(h, f, c, l, a[d + 15], 14, -660478335), l = _(l, h, f, c, a[d + 4], 20, -405537848), c = _(c, l, h, f, a[d + 9], 5, 568446438), f = _(f, c, l, h, a[d + 14], 9, -1019803690), h = _(h, f, c, l, a[d + 3], 14, -187363961), l = _(l, h, f, c, a[d + 8], 20, 1163531501), c = _(c, l, h, f, a[d + 13], 5, -1444681467), f = _(f, c, l, h, a[d + 2], 9, -51403784), h = _(h, f, c, l, a[d + 7], 14, 1735328473), l = _(l, h, f, c, a[d + 12], 20, -1926607734), c = v(c, l, h, f, a[d + 5], 4, -378558), f = v(f, c, l, h, a[d + 8], 11, -2022574463), h = v(h, f, c, l, a[d + 11], 16, 1839030562), l = v(l, h, f, c, a[d + 14], 23, -35309556), c = v(c, l, h, f, a[d + 1], 4, -1530992060), f = v(f, c, l, h, a[d + 4], 11, 1272893353), h = v(h, f, c, l, a[d + 7], 16, -155497632), l = v(l, h, f, c, a[d + 10], 23, -1094730640), c = v(c, l, h, f, a[d + 13], 4, 681279174), f = v(f, c, l, h, a[d + 0], 11, -358537222), h = v(h, f, c, l, a[d + 3], 16, -722521979), l = v(l, h, f, c, a[d + 6], 23, 76029189), c = v(c, l, h, f, a[d + 9], 4, -640364487), f = v(f, c, l, h, a[d + 12], 11, -421815835), h = v(h, f, c, l, a[d + 15], 16, 530742520), l = v(l, h, f, c, a[d + 2], 23, -995338651), c = y(c, l, h, f, a[d + 0], 6, -198630844), f = y(f, c, l, h, a[d + 7], 10, 1126891415), h = y(h, f, c, l, a[d + 14], 15, -1416354905), l = y(l, h, f, c, a[d + 5], 21, -57434055), c = y(c, l, h, f, a[d + 12], 6, 1700485571), f = y(f, c, l, h, a[d + 3], 10, -1894986606), h = y(h, f, c, l, a[d + 10], 15, -1051523), l = y(l, h, f, c, a[d + 1], 21, -2054922799), c = y(c, l, h, f, a[d + 8], 6, 1873313359), f = y(f, c, l, h, a[d + 15], 10, -30611744), h = y(h, f, c, l, a[d + 6], 15, -1560198380), l = y(l, h, f, c, a[d + 13], 21, 1309151649), c = y(c, l, h, f, a[d + 4], 6, -145523070), f = y(f, c, l, h, a[d + 11], 10, -1120210379), h = y(h, f, c, l, a[d + 2], 15, 718787259), l = y(l, h, f, c, a[d + 9], 21, -343485551), c = c + m >>> 0, l = l + g >>> 0, h = h + b >>> 0, f = f + w >>> 0;
        }

        return e.endian([c, l, h, f]);
      };

      o._ff = function (t, e, n, r, i, s, o) {
        var a = t + (e & n | ~e & r) + (i >>> 0) + o;
        return (a << s | a >>> 32 - s) + e;
      }, o._gg = function (t, e, n, r, i, s, o) {
        var a = t + (e & r | n & ~r) + (i >>> 0) + o;
        return (a << s | a >>> 32 - s) + e;
      }, o._hh = function (t, e, n, r, i, s, o) {
        var a = t + (e ^ n ^ r) + (i >>> 0) + o;
        return (a << s | a >>> 32 - s) + e;
      }, o._ii = function (t, e, n, r, i, s, o) {
        var a = t + (n ^ (e | ~r)) + (i >>> 0) + o;
        return (a << s | a >>> 32 - s) + e;
      }, o._blocksize = 16, o._digestsize = 16, t.exports = function (t, n) {
        if (void 0 === t || null === t) throw new Error("Illegal argument " + t);
        var r = e.wordsToBytes(o(t, n));
        return n && n.asBytes ? r : n && n.asString ? s.bytesToString(r) : e.bytesToHex(r);
      };
    }();
  }, function (t, e) {
    !function () {
      var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
          n = {
        rotl: function (t, e) {
          return t << e | t >>> 32 - e;
        },
        rotr: function (t, e) {
          return t << 32 - e | t >>> e;
        },
        endian: function (t) {
          if (t.constructor == Number) return 16711935 & n.rotl(t, 8) | 4278255360 & n.rotl(t, 24);

          for (var e = 0; e < t.length; e++) t[e] = n.endian(t[e]);

          return t;
        },
        randomBytes: function (t) {
          for (var e = []; t > 0; t--) e.push(Math.floor(256 * Math.random()));

          return e;
        },
        bytesToWords: function (t) {
          for (var e = [], n = 0, r = 0; n < t.length; n++, r += 8) e[r >>> 5] |= t[n] << 24 - r % 32;

          return e;
        },
        wordsToBytes: function (t) {
          for (var e = [], n = 0; n < 32 * t.length; n += 8) e.push(t[n >>> 5] >>> 24 - n % 32 & 255);

          return e;
        },
        bytesToHex: function (t) {
          for (var e = [], n = 0; n < t.length; n++) e.push((t[n] >>> 4).toString(16)), e.push((15 & t[n]).toString(16));

          return e.join("");
        },
        hexToBytes: function (t) {
          for (var e = [], n = 0; n < t.length; n += 2) e.push(parseInt(t.substr(n, 2), 16));

          return e;
        },
        bytesToBase64: function (t) {
          for (var n = [], r = 0; r < t.length; r += 3) for (var i = t[r] << 16 | t[r + 1] << 8 | t[r + 2], s = 0; s < 4; s++) 8 * r + 6 * s <= 8 * t.length ? n.push(e.charAt(i >>> 6 * (3 - s) & 63)) : n.push("=");

          return n.join("");
        },
        base64ToBytes: function (t) {
          t = t.replace(/[^A-Z0-9+\/]/gi, "");

          for (var n = [], r = 0, i = 0; r < t.length; i = ++r % 4) 0 != i && n.push((e.indexOf(t.charAt(r - 1)) & Math.pow(2, -2 * i + 8) - 1) << 2 * i | e.indexOf(t.charAt(r)) >>> 6 - 2 * i);

          return n;
        }
      };
      t.exports = n;
    }();
  }, function (t, e) {
    function n(t) {
      return !!t.constructor && "function" == typeof t.constructor.isBuffer && t.constructor.isBuffer(t);
    }

    function r(t) {
      return "function" == typeof t.readFloatLE && "function" == typeof t.slice && n(t.slice(0, 0));
    }
    /*!
    * Determine if an object is a Buffer
    *
    * @author   Feross Aboukhadijeh <https://feross.org>
    * @license  MIT
    */


    t.exports = function (t) {
      return null != t && (n(t) || r(t) || !!t._isBuffer);
    };
  }, function (t, e, n) {
    "use strict";

    var r = function (t, e) {
      var n;
      t.indexOf("base64") < 0 ? n = atob(t) : t.split(",")[0].indexOf("base64") >= 0 ? (e = e || t.split(",")[0].split(":")[1].split(";")[0], n = atob(t.split(",")[1])) : n = unescape(t.split(",")[1]);

      for (var r = new Uint8Array(n.length), i = 0; i < n.length; i++) r[i] = n.charCodeAt(i);

      return new Blob([r], {
        type: e
      });
    };

    t.exports = r;
  }, function (t, e, n) {
    "use strict";

    function r(t, e) {
      return t && t[e] ? s.isFunction(t[e]) ? t[e]() : t[e] : null;
    }

    var i = function () {
      function t(t, e) {
        var n = [],
            r = !0,
            i = !1,
            s = void 0;

        try {
          for (var o, a = t[Symbol.iterator](); !(r = (o = a.next()).done) && (n.push(o.value), !e || n.length !== e); r = !0);
        } catch (t) {
          i = !0, s = t;
        } finally {
          try {
            !r && a.return && a.return();
          } finally {
            if (i) throw s;
          }
        }

        return n;
      }

      return function (e, n) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return t(e, n);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      };
    }(),
        s = n(0),
        o = n(4),
        a = n(1),
        u = n(2),
        c = u._request,
        l = n(3),
        h = l.isNullOrUndefined,
        f = l.ensureArray,
        d = l.transformFetchOptions,
        p = l.setValue,
        _ = l.findValue,
        v = l.isPlainObject,
        y = function t(e) {
      return s.isArray(e) ? e.map(t) : v(e) ? s.mapObject(e, t) : s.isObject(e) && e._toPointer ? e._toPointer() : e;
    },
        m = ["objectId", "createdAt", "updatedAt"],
        g = function (t) {
      if (-1 !== m.indexOf(t)) throw new Error("key[" + t + "] is reserved");
    },
        b = function (t) {
      var e = s.find(t, function (t) {
        return t instanceof Error;
      });
      if (!e) return t;
      var n = new o(e.code, e.message);
      throw n.results = t, n;
    };

    t.exports = function (t) {
      t.Object = function (e, n) {
        if (s.isString(e)) return t.Object._create.apply(this, arguments);
        e = e || {}, n && n.parse && (e = this.parse(e), e = this._mergeMagicFields(e));
        var i = r(this, "defaults");
        i && (e = s.extend({}, i, e)), n && n.collection && (this.collection = n.collection), this._serverData = {}, this._opSetQueue = [{}], this._flags = {}, this.attributes = {}, this._hashedJSON = {}, this._escapedAttributes = {}, this.cid = s.uniqueId("c"), this.changed = {}, this._silent = {}, this._pending = {}, this.set(e, {
          silent: !0
        }), this.changed = {}, this._silent = {}, this._pending = {}, this._hasData = !0, this._previousAttributes = s.clone(this.attributes), this.initialize.apply(this, arguments);
      }, t.Object.saveAll = function (e, n) {
        return t.Object._deepSaveAsync(e, null, n);
      }, t.Object.fetchAll = function (t, e) {
        return a.resolve().then(function () {
          return c("batch", null, null, "POST", {
            requests: s.map(t, function (t) {
              if (!t.className) throw new Error("object must have className to fetch");
              if (!t.id) throw new Error("object must have id to fetch");
              if (t.dirty()) throw new Error("object is modified but not saved");
              return {
                method: "GET",
                path: "/1.1/classes/" + t.className + "/" + t.id
              };
            })
          }, e);
        }).then(function (e) {
          var n = s.map(t, function (t, n) {
            if (e[n].success) {
              var r = t.parse(e[n].success);
              return t._cleanupUnsetKeys(r), t._finishFetch(r), t;
            }

            return null === e[n].success ? new o(o.OBJECT_NOT_FOUND, "Object not found.") : new o(e[n].error.code, e[n].error.error);
          });
          return b(n);
        });
      }, s.extend(t.Object.prototype, t.Events, {
        _fetchWhenSave: !1,
        initialize: function () {},
        fetchWhenSave: function (t) {
          if (console.warn("AV.Object#fetchWhenSave is deprecated, use AV.Object#save with options.fetchWhenSave instead."), !s.isBoolean(t)) throw new Error("Expect boolean value for fetchWhenSave");
          this._fetchWhenSave = t;
        },
        getObjectId: function () {
          return this.id;
        },
        getCreatedAt: function () {
          return this.createdAt || this.get("createdAt");
        },
        getUpdatedAt: function () {
          return this.updatedAt || this.get("updatedAt");
        },
        toJSON: function (t, e) {
          var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [];
          return this._toFullJSON(n, !1);
        },
        toFullJSON: function () {
          var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
          return this._toFullJSON(t);
        },
        _toFullJSON: function (e) {
          var n = this,
              r = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
              i = s.clone(this.attributes);
          if (s.isArray(e)) var o = e.concat(this);
          return t._objectEach(i, function (e, n) {
            i[n] = t._encode(e, o, void 0, r);
          }), t._objectEach(this._operations, function (t, e) {
            i[e] = t;
          }), s.has(this, "id") && (i.objectId = this.id), s(["createdAt", "updatedAt"]).each(function (t) {
            if (s.has(n, t)) {
              var e = n[t];
              i[t] = s.isDate(e) ? e.toJSON() : e;
            }
          }), r && (i.__type = "Object", s.isArray(e) && e.length && (i.__type = "Pointer"), i.className = this.className), i;
        },
        _refreshCache: function () {
          var e = this;
          e._refreshingCache || (e._refreshingCache = !0, t._objectEach(this.attributes, function (n, r) {
            n instanceof t.Object ? n._refreshCache() : s.isObject(n) && e._resetCacheForKey(r) && e.set(r, new t.Op.Set(n), {
              silent: !0
            });
          }), delete e._refreshingCache);
        },
        dirty: function (t) {
          this._refreshCache();

          var e = s.last(this._opSetQueue);
          return t ? !!e[t] : !this.id || s.keys(e).length > 0;
        },
        _toPointer: function () {
          return {
            __type: "Pointer",
            className: this.className,
            objectId: this.id
          };
        },
        get: function (t) {
          switch (t) {
            case "objectId":
              return this.id;

            case "createdAt":
            case "updatedAt":
              return this[t];

            default:
              return this.attributes[t];
          }
        },
        relation: function (e) {
          var n = this.get(e);

          if (n) {
            if (!(n instanceof t.Relation)) throw new Error("Called relation() on non-relation field " + e);
            return n._ensureParentAndKey(this, e), n;
          }

          return new t.Relation(this, e);
        },
        escape: function (t) {
          var e = this._escapedAttributes[t];
          if (e) return e;
          var n,
              r = this.attributes[t];
          return n = h(r) ? "" : s.escape(r.toString()), this._escapedAttributes[t] = n, n;
        },
        has: function (t) {
          return !h(this.attributes[t]);
        },
        _mergeMagicFields: function (e) {
          var n = this,
              r = ["objectId", "createdAt", "updatedAt"];
          return t._arrayEach(r, function (r) {
            e[r] && ("objectId" === r ? n.id = e[r] : "createdAt" !== r && "updatedAt" !== r || s.isDate(e[r]) ? n[r] = e[r] : n[r] = t._parseDate(e[r]), delete e[r]);
          }), e;
        },
        _startSave: function () {
          this._opSetQueue.push({});
        },
        _cancelSave: function () {
          var e = s.first(this._opSetQueue);
          this._opSetQueue = s.rest(this._opSetQueue);
          var n = s.first(this._opSetQueue);
          t._objectEach(e, function (t, r) {
            var i = e[r],
                s = n[r];
            i && s ? n[r] = s._mergeWithPrevious(i) : i && (n[r] = i);
          }), this._saving = this._saving - 1;
        },
        _finishSave: function (e) {
          var n = {};

          t._traverse(this.attributes, function (e) {
            e instanceof t.Object && e.id && e._hasData && (n[e.id] = e);
          });

          var r = s.first(this._opSetQueue);
          this._opSetQueue = s.rest(this._opSetQueue), this._applyOpSet(r, this._serverData), this._mergeMagicFields(e);
          var i = this;
          t._objectEach(e, function (e, r) {
            i._serverData[r] = t._decode(e, r);

            var s = t._traverse(i._serverData[r], function (e) {
              if (e instanceof t.Object && n[e.id]) return n[e.id];
            });

            s && (i._serverData[r] = s);
          }), this._rebuildAllEstimatedData();

          var o = this._opSetQueue.map(s.clone);

          this._refreshCache(), this._opSetQueue = o, this._saving = this._saving - 1;
        },
        _finishFetch: function (e, n) {
          this._opSetQueue = [{}], this._mergeMagicFields(e);
          var r = this;
          t._objectEach(e, function (e, n) {
            r._serverData[n] = t._decode(e, n);
          }), this._rebuildAllEstimatedData(), this._refreshCache(), this._opSetQueue = [{}], this._hasData = n;
        },
        _applyOpSet: function (e, n) {
          var r = this;

          t._objectEach(e, function (e, s) {
            var o = _(n, s),
                a = i(o, 3),
                u = a[0],
                c = a[1],
                l = a[2];

            p(n, s, e._estimate(u, r, s)), c && c[l] === t.Op._UNSET && delete c[l];
          });
        },
        _resetCacheForKey: function (e) {
          var n = this.attributes[e];

          if (s.isObject(n) && !(n instanceof t.Object) && !(n instanceof t.File)) {
            var r = JSON.stringify(y(n));

            if (this._hashedJSON[e] !== r) {
              var i = !!this._hashedJSON[e];
              return this._hashedJSON[e] = r, i;
            }
          }

          return !1;
        },
        _rebuildEstimatedDataForKey: function (e) {
          var n = this;
          delete this.attributes[e], this._serverData[e] && (this.attributes[e] = this._serverData[e]), t._arrayEach(this._opSetQueue, function (r) {
            var s = r[e];

            if (s) {
              var o = _(n.attributes, e),
                  a = i(o, 4),
                  u = a[0],
                  c = a[1],
                  l = a[2],
                  h = a[3];

              p(n.attributes, e, s._estimate(u, n, e)), c && c[l] === t.Op._UNSET && delete c[l], n._resetCacheForKey(h);
            }
          });
        },
        _rebuildAllEstimatedData: function () {
          var e = this,
              n = s.clone(this.attributes);
          this.attributes = s.clone(this._serverData), t._arrayEach(this._opSetQueue, function (n) {
            e._applyOpSet(n, e.attributes), t._objectEach(n, function (t, n) {
              e._resetCacheForKey(n);
            });
          }), t._objectEach(n, function (t, n) {
            e.attributes[n] !== t && e.trigger("change:" + n, e, e.attributes[n], {});
          }), t._objectEach(this.attributes, function (t, r) {
            s.has(n, r) || e.trigger("change:" + r, e, t, {});
          });
        },
        set: function (e, n, r) {
          var i;
          if (s.isObject(e) || h(e) ? (i = s.mapObject(e, function (e, n) {
            return g(n), t._decode(e, n);
          }), r = n) : (i = {}, g(e), i[e] = t._decode(n, e)), r = r || {}, !i) return this;
          i instanceof t.Object && (i = i.attributes), r.unset && t._objectEach(i, function (e, n) {
            i[n] = new t.Op.Unset();
          });
          var o = s.clone(i),
              a = this;
          t._objectEach(o, function (e, n) {
            e instanceof t.Op && (o[n] = e._estimate(a.attributes[n], a, n), o[n] === t.Op._UNSET && delete o[n]);
          }), this._validate(i, r), r.changes = {};
          var u = this._escapedAttributes;
          return t._arrayEach(s.keys(i), function (e) {
            var n = i[e];
            n instanceof t.Relation && (n.parent = a), n instanceof t.Op || (n = new t.Op.Set(n));
            var o = !0;
            n instanceof t.Op.Set && s.isEqual(a.attributes[e], n.value) && (o = !1), o && (delete u[e], r.silent ? a._silent[e] = !0 : r.changes[e] = !0);
            var c = s.last(a._opSetQueue);
            c[e] = n._mergeWithPrevious(c[e]), a._rebuildEstimatedDataForKey(e), o ? (a.changed[e] = a.attributes[e], r.silent || (a._pending[e] = !0)) : (delete a.changed[e], delete a._pending[e]);
          }), r.silent || this.change(r), this;
        },
        unset: function (t, e) {
          return e = e || {}, e.unset = !0, this.set(t, null, e);
        },
        increment: function (e, n) {
          return (s.isUndefined(n) || s.isNull(n)) && (n = 1), this.set(e, new t.Op.Increment(n));
        },
        add: function (e, n) {
          return this.set(e, new t.Op.Add(f(n)));
        },
        addUnique: function (e, n) {
          return this.set(e, new t.Op.AddUnique(f(n)));
        },
        remove: function (e, n) {
          return this.set(e, new t.Op.Remove(f(n)));
        },
        bitAnd: function (e, n) {
          return this.set(e, new t.Op.BitAnd(n));
        },
        bitOr: function (e, n) {
          return this.set(e, new t.Op.BitOr(n));
        },
        bitXor: function (e, n) {
          return this.set(e, new t.Op.BitXor(n));
        },
        op: function (t) {
          return s.last(this._opSetQueue)[t];
        },
        clear: function (t) {
          t = t || {}, t.unset = !0;
          var e = s.extend(this.attributes, this._operations);
          return this.set(e, t);
        },
        _getSaveJSON: function () {
          var e = s.clone(s.first(this._opSetQueue));
          return t._objectEach(e, function (t, n) {
            e[n] = t.toJSON();
          }), e;
        },
        _canBeSerialized: function () {
          return t.Object._canBeSerializedAsValue(this.attributes);
        },
        fetch: function () {
          var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
              e = arguments[1],
              n = this;
          return c("classes", this.className, this.id, "GET", d(t), e).then(function (e) {
            var r = n.parse(e);
            return t.keys || n._cleanupUnsetKeys(r), n._finishFetch(r, !0), n;
          });
        },
        _cleanupUnsetKeys: function (e) {
          var n = this;

          t._objectEach(this._serverData, function (t, r) {
            void 0 === e[r] && delete n._serverData[r];
          });
        },
        save: function (e, n, r) {
          var i, o, u;
          s.isObject(e) || h(e) ? (i = e, u = n) : (i = {}, i[e] = n, u = r), u = s.clone(u) || {}, u.wait && (o = s.clone(this.attributes));
          var l = s.clone(u) || {};
          l.wait && (l.silent = !0), i && this.set(i, l);
          var f = this,
              d = [],
              p = [];
          return t.Object._findUnsavedChildren(f, d, p), d.length + p.length > 1 ? t.Object._deepSaveAsync(this, f, u) : (this._startSave(), this._saving = (this._saving || 0) + 1, this._allPreviousSaves = this._allPreviousSaves || a.resolve(), this._allPreviousSaves = this._allPreviousSaves.catch(function (t) {}).then(function () {
            var t = f.id ? "PUT" : "POST",
                e = f._getSaveJSON(),
                n = {};

            if ((f._fetchWhenSave || u.fetchWhenSave) && (n.new = "true"), u._failOnNotExist && (n.failOnNotExist = "true"), u.query) {
              var r;

              if ("function" == typeof u.query.toJSON && (r = u.query.toJSON()) && (n.where = r.where), !n.where) {
                throw new Error("options.query is not an AV.Query");
              }
            }

            s.extend(e, f._flags);
            var a = "classes",
                h = f.className;
            "_User" !== f.className || f.id || (a = "users", h = null);
            var d = u._makeRequest || c,
                p = d(a, h, f.id, t, e, u, n);
            return p = p.then(function (t) {
              var e = f.parse(t);
              return u.wait && (e = s.extend(i || {}, e)), f._finishSave(e), u.wait && f.set(o, l), f;
            }, function (t) {
              throw f._cancelSave(), t;
            });
          }), this._allPreviousSaves);
        },
        destroy: function (t) {
          t = t || {};

          var e = this,
              n = function () {
            e.trigger("destroy", e, e.collection, t);
          };

          return this.id ? (t.wait || n(), c("classes", this.className, this.id, "DELETE", this._flags, t).then(function () {
            return t.wait && n(), e;
          })) : n();
        },
        parse: function (e) {
          var n = s.clone(e);
          return s(["createdAt", "updatedAt"]).each(function (e) {
            n[e] && (n[e] = t._parseDate(n[e]));
          }), n.createdAt && !n.updatedAt && (n.updatedAt = n.createdAt), n;
        },
        clone: function () {
          return new this.constructor(this.attributes);
        },
        isNew: function () {
          return !this.id;
        },
        change: function (e) {
          e = e || {};
          var n = this._changing;
          this._changing = !0;
          var r = this;

          t._objectEach(this._silent, function (t) {
            r._pending[t] = !0;
          });

          var i = s.extend({}, e.changes, this._silent);
          if (this._silent = {}, t._objectEach(i, function (t, n) {
            r.trigger("change:" + n, r, r.get(n), e);
          }), n) return this;

          for (var o = function (t, e) {
            r._pending[e] || r._silent[e] || delete r.changed[e];
          }; !s.isEmpty(this._pending);) this._pending = {}, this.trigger("change", this, e), t._objectEach(this.changed, o), r._previousAttributes = s.clone(this.attributes);

          return this._changing = !1, this;
        },
        hasChanged: function (t) {
          return arguments.length ? this.changed && s.has(this.changed, t) : !s.isEmpty(this.changed);
        },
        changedAttributes: function (e) {
          if (!e) return !!this.hasChanged() && s.clone(this.changed);
          var n = {},
              r = this._previousAttributes;
          return t._objectEach(e, function (t, e) {
            s.isEqual(r[e], t) || (n[e] = t);
          }), n;
        },
        previous: function (t) {
          return arguments.length && this._previousAttributes ? this._previousAttributes[t] : null;
        },
        previousAttributes: function () {
          return s.clone(this._previousAttributes);
        },
        isValid: function () {
          try {
            this.validate(this.attributes);
          } catch (t) {
            return !1;
          }

          return !0;
        },
        validate: function (e) {
          if (s.has(e, "ACL") && !(e.ACL instanceof t.ACL)) throw new o(o.OTHER_CAUSE, "ACL must be a AV.ACL.");
        },
        _validate: function (t, e) {
          !e.silent && this.validate && (t = s.extend({}, this.attributes, t), this.validate(t));
        },
        getACL: function () {
          return this.get("ACL");
        },
        setACL: function (t, e) {
          return this.set("ACL", t, e);
        },
        disableBeforeHook: function () {
          this.ignoreHook("beforeSave"), this.ignoreHook("beforeUpdate"), this.ignoreHook("beforeDelete");
        },
        disableAfterHook: function () {
          this.ignoreHook("afterSave"), this.ignoreHook("afterUpdate"), this.ignoreHook("afterDelete");
        },
        ignoreHook: function (e) {
          s.contains(["beforeSave", "afterSave", "beforeUpdate", "afterUpdate", "beforeDelete", "afterDelete"], e) || console.trace("Unsupported hookName: " + e), t.hookKey || console.trace("ignoreHook required hookKey"), this._flags.__ignore_hooks || (this._flags.__ignore_hooks = []), this._flags.__ignore_hooks.push(e);
        }
      }), t.Object.createWithoutData = function (e, n, r) {
        var i = new t.Object(e);
        return i.id = n, i._hasData = r, i;
      }, t.Object.destroyAll = function (t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        if (!t || 0 === t.length) return a.resolve();
        var n = s.groupBy(t, function (t) {
          return JSON.stringify({
            className: t.className,
            flags: t._flags
          });
        }),
            r = {
          requests: s.map(n, function (t) {
            var e = s.map(t, "id").join(",");
            return {
              method: "DELETE",
              path: "/1.1/classes/" + t[0].className + "/" + e,
              body: t[0]._flags
            };
          })
        };
        return c("batch", null, null, "POST", r, e).then(function (t) {
          var e = s.find(t, function (t) {
            return !t.success;
          });
          if (e) throw new o(e.error.code, e.error.error);
        });
      }, t.Object._getSubclass = function (e) {
        if (!s.isString(e)) throw new Error("AV.Object._getSubclass requires a string argument.");
        var n = t.Object._classMap[e];
        return n || (n = t.Object.extend(e), t.Object._classMap[e] = n), n;
      }, t.Object._create = function (e, n, r) {
        return new (t.Object._getSubclass(e))(n, r);
      }, t.Object._classMap = {}, t.Object._extend = t._extend, t.Object.new = function (e, n) {
        return new t.Object(e, n);
      }, t.Object.extend = function (e, n, r) {
        if (!s.isString(e)) {
          if (e && s.has(e, "className")) return t.Object.extend(e.className, e, n);
          throw new Error("AV.Object.extend's first argument should be the className.");
        }

        "User" === e && (e = "_User");
        var i = null;

        if (s.has(t.Object._classMap, e)) {
          var o = t.Object._classMap[e];
          if (!n && !r) return o;
          i = o._extend(n, r);
        } else n = n || {}, n._className = e, i = this._extend(n, r);

        return i.extend = function (n) {
          if (s.isString(n) || n && s.has(n, "className")) return t.Object.extend.apply(i, arguments);
          var r = [e].concat(s.toArray(arguments));
          return t.Object.extend.apply(i, r);
        }, Object.defineProperty(i, "query", Object.getOwnPropertyDescriptor(t.Object, "query")), i.new = function (t, e) {
          return new i(t, e);
        }, t.Object._classMap[e] = i, i;
      }, Object.defineProperty(t.Object.prototype, "className", {
        get: function () {
          var t = this._className || this.constructor._LCClassName || this.constructor.name;
          return "User" === t ? "_User" : t;
        }
      }), t.Object.register = function (e, n) {
        if (!(e.prototype instanceof t.Object)) throw new Error("registered class is not a subclass of AV.Object");
        var r = n || e.name;
        if (!r.length) throw new Error("registered class must be named");
        n && (e._LCClassName = n), t.Object._classMap[r] = e;
      }, Object.defineProperty(t.Object, "query", {
        get: function () {
          return new t.Query(this.prototype.className);
        }
      }), t.Object._findUnsavedChildren = function (e, n, r) {
        t._traverse(e, function (e) {
          return e instanceof t.Object ? void (e.dirty() && n.push(e)) : e instanceof t.File ? void (e.id || r.push(e)) : void 0;
        });
      }, t.Object._canBeSerializedAsValue = function (e) {
        var n = !0;
        return e instanceof t.Object || e instanceof t.File ? n = !!e.id : s.isArray(e) ? t._arrayEach(e, function (e) {
          t.Object._canBeSerializedAsValue(e) || (n = !1);
        }) : s.isObject(e) && t._objectEach(e, function (e) {
          t.Object._canBeSerializedAsValue(e) || (n = !1);
        }), n;
      }, t.Object._deepSaveAsync = function (e, n, r) {
        var i = [],
            u = [];

        t.Object._findUnsavedChildren(e, i, u);

        var l = a.resolve();
        s.each(u, function (t) {
          l = l.then(function () {
            return t.save();
          });
        });
        var h = s.uniq(i),
            f = s.uniq(h);
        return l.then(function () {
          return a._continueWhile(function () {
            return f.length > 0;
          }, function () {
            var e = [],
                n = [];
            if (t._arrayEach(f, function (t) {
              if (e.length > 20) return void n.push(t);
              t._canBeSerialized() ? e.push(t) : n.push(t);
            }), f = n, 0 === e.length) return a.reject(new o(o.OTHER_CAUSE, "Tried to save a batch with a cycle."));
            var i = a.resolve(s.map(e, function (t) {
              return t._allPreviousSaves || a.resolve();
            })),
                u = i.then(function () {
              return c("batch", null, null, "POST", {
                requests: s.map(e, function (t) {
                  var e = t.id ? "PUT" : "POST",
                      n = t._getSaveJSON();

                  s.extend(n, t._flags);
                  var r = t.className,
                      i = "/classes/" + r;
                  "_User" !== t.className || t.id || (i = "/users");
                  var i = "/1.1" + i;
                  return t.id && (i = i + "/" + t.id), t._startSave(), {
                    method: e,
                    path: i,
                    body: n
                  };
                })
              }, r).then(function (t) {
                var n = s.map(e, function (e, n) {
                  return t[n].success ? (e._finishSave(e.parse(t[n].success)), e) : (e._cancelSave(), new o(t[n].error.code, t[n].error.error));
                });
                return b(n);
              });
            });
            return t._arrayEach(e, function (t) {
              t._allPreviousSaves = u;
            }), u;
          });
        }).then(function () {
          return e;
        });
      };
    };
  }, function (t, e, n) {
    "use strict";

    var r = n(0),
        i = n(4);

    t.exports = function (t) {
      t.Role = t.Object.extend("_Role", {
        constructor: function (e, n) {
          if (r.isString(e) ? (t.Object.prototype.constructor.call(this, null, null), this.setName(e)) : t.Object.prototype.constructor.call(this, e, n), n) {
            if (!(n instanceof t.ACL)) throw new TypeError("acl must be an instance of AV.ACL");
            this.setACL(n);
          }
        },
        getName: function () {
          return this.get("name");
        },
        setName: function (t, e) {
          return this.set("name", t, e);
        },
        getUsers: function () {
          return this.relation("users");
        },
        getRoles: function () {
          return this.relation("roles");
        },
        validate: function (e, n) {
          if ("name" in e && e.name !== this.getName()) {
            var s = e.name;
            if (this.id && this.id !== e.objectId) return new i(i.OTHER_CAUSE, "A role's name can only be set before it has been saved.");
            if (!r.isString(s)) return new i(i.OTHER_CAUSE, "A role's name must be a String.");
            if (!/^[0-9a-zA-Z\-_ ]+$/.test(s)) return new i(i.OTHER_CAUSE, "A role's name can only contain alphanumeric characters, _, -, and spaces.");
          }

          return !!t.Object.prototype.validate && t.Object.prototype.validate.call(this, e, n);
        }
      });
    };
  }, function (t, e, n) {
    "use strict";

    function r(t, e, n) {
      return e in t ? Object.defineProperty(t, e, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : t[e] = n, t;
    }

    var i = n(0),
        s = n(9),
        o = n(4),
        a = n(2),
        u = a._request,
        c = a.request,
        l = n(1),
        h = function () {
      if ("undefined" == typeof wx || "function" != typeof wx.login) throw new Error("Weapp Login is only available in Weapp");
      return new l(function (t, e) {
        wx.login({
          success: function (n) {
            var r = n.code,
                i = n.errMsg;
            r ? t(r) : e(new Error(i));
          },
          fail: function () {
            return e(new Error("wx.login 失败"));
          }
        });
      });
    },
        f = function (t, e) {
      var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
          r = n.unionIdPlatform,
          s = void 0 === r ? "weixin" : r,
          a = n.asMainAccount,
          u = void 0 !== a && a;
      if ("string" != typeof e) throw new o(o.OTHER_CAUSE, "unionId is not a string");
      if ("string" != typeof s) throw new o(o.OTHER_CAUSE, "unionIdPlatform is not a string");
      return i.extend({}, t, {
        platform: s,
        unionid: e,
        main_account: Boolean(u)
      });
    };

    t.exports = function (t) {
      t.User = t.Object.extend("_User", {
        _isCurrentUser: !1,
        _mergeMagicFields: function (e) {
          return e.sessionToken && (this._sessionToken = e.sessionToken, delete e.sessionToken), t.User.__super__._mergeMagicFields.call(this, e);
        },
        _cleanupAuthData: function () {
          if (this.isCurrent()) {
            var e = this.get("authData");
            e && t._objectEach(this.get("authData"), function (t, n) {
              e[n] || delete e[n];
            });
          }
        },
        _synchronizeAllAuthData: function () {
          if (this.get("authData")) {
            var e = this;

            t._objectEach(this.get("authData"), function (t, n) {
              e._synchronizeAuthData(n);
            });
          }
        },
        _synchronizeAuthData: function (e) {
          if (this.isCurrent()) {
            var n;
            i.isString(e) ? (n = e, e = t.User._authProviders[n]) : n = e.getAuthType();
            var r = this.get("authData");

            if (r && e) {
              e.restoreAuthentication(r[n]) || this.dissociateAuthData(e);
            }
          }
        },
        _handleSaveResult: function (e) {
          return e && !t._config.disableCurrentUser && (this._isCurrentUser = !0), this._cleanupAuthData(), this._synchronizeAllAuthData(), delete this._serverData.password, this._rebuildEstimatedDataForKey("password"), this._refreshCache(), !e && !this.isCurrent() || t._config.disableCurrentUser ? l.resolve() : l.resolve(t.User._saveCurrentUser(this));
        },
        _linkWith: function (e, n) {
          var s,
              o = this,
              a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
              u = a.failOnNotExist,
              c = void 0 !== u && u;
          return i.isString(e) ? (s = e, e = t.User._authProviders[e]) : s = e.getAuthType(), n ? this.save({
            authData: r({}, s, n)
          }, {
            fetchWhenSave: !!this.get("authData"),
            _failOnNotExist: c
          }).then(function (t) {
            return t._handleSaveResult(!0).then(function () {
              return t;
            });
          }) : e.authenticate().then(function (t) {
            return o._linkWith(e, t);
          });
        },
        associateWithAuthData: function (t, e) {
          return this._linkWith(e, t);
        },
        associateWithAuthDataAndUnionId: function (t, e, n, r) {
          return this._linkWith(e, f(t, n, r));
        },
        linkWithWeapp: function () {
          var t = this;
          return h().then(function (e) {
            return t._linkWith("lc_weapp", {
              code: e
            });
          });
        },
        dissociateAuthData: function (t) {
          return this.unset("authData." + t), this.save().then(function (t) {
            return t._handleSaveResult(!0).then(function () {
              return t;
            });
          });
        },
        _unlinkFrom: function (t) {
          return console.warn("DEPRECATED: User#_unlinkFrom 已废弃，请使用 User#dissociateAuthData 代替"), this.dissociateAuthData(t);
        },
        _isLinked: function (t) {
          var e;
          return e = i.isString(t) ? t : t.getAuthType(), !!(this.get("authData") || {})[e];
        },
        isAnonymous: function () {
          return this._isLinked("anonymous");
        },
        logOut: function () {
          this._logOutWithAll(), this._isCurrentUser = !1;
        },
        _logOutWithAll: function () {
          if (this.get("authData")) {
            var e = this;

            t._objectEach(this.get("authData"), function (t, n) {
              e._logOutWith(n);
            });
          }
        },
        _logOutWith: function (e) {
          this.isCurrent() && (i.isString(e) && (e = t.User._authProviders[e]), e && e.deauthenticate && e.deauthenticate());
        },
        signUp: function (t, e) {
          var n = t && t.username || this.get("username");
          if (!n || "" === n) throw new o(o.OTHER_CAUSE, "Cannot sign up user with an empty name.");
          var r = t && t.password || this.get("password");
          if (!r || "" === r) throw new o(o.OTHER_CAUSE, "Cannot sign up user with an empty password.");
          return this.save(t, e).then(function (t) {
            return t.isAnonymous() && (t.unset("authData.anonymous"), t._opSetQueue = [{}]), t._handleSaveResult(!0).then(function () {
              return t;
            });
          });
        },
        signUpOrlogInWithMobilePhone: function (t) {
          var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
              n = t && t.mobilePhoneNumber || this.get("mobilePhoneNumber");
          if (!n || "" === n) throw new o(o.OTHER_CAUSE, "Cannot sign up or login user by mobilePhoneNumber with an empty mobilePhoneNumber.");
          var r = t && t.smsCode || this.get("smsCode");
          if (!r || "" === r) throw new o(o.OTHER_CAUSE, "Cannot sign up or login user by mobilePhoneNumber  with an empty smsCode.");
          return e._makeRequest = function (t, e, n, r, i) {
            return u("usersByMobilePhone", null, null, "POST", i);
          }, this.save(t, e).then(function (t) {
            return delete t.attributes.smsCode, delete t._serverData.smsCode, t._handleSaveResult(!0).then(function () {
              return t;
            });
          });
        },
        loginWithAuthData: function (t, e, n) {
          return this._linkWith(e, t, n);
        },
        loginWithAuthDataAndUnionId: function (t, e, n, r) {
          return this.loginWithAuthData(f(t, n, r), e, r);
        },
        loginWithWeapp: function (t) {
          var e = this;
          return h().then(function (n) {
            return e.loginWithAuthData({
              code: n
            }, "lc_weapp", t);
          });
        },
        logIn: function () {
          var t = this;
          return u("login", null, null, "POST", this.toJSON()).then(function (e) {
            var n = t.parse(e);
            return t._finishFetch(n), t._handleSaveResult(!0).then(function () {
              return n.smsCode || delete t.attributes.smsCode, t;
            });
          });
        },
        save: function (e, n, r) {
          var s, o;
          return i.isObject(e) || i.isNull(e) || i.isUndefined(e) ? (s = e, o = n) : (s = {}, s[e] = n, o = r), o = o || {}, t.Object.prototype.save.call(this, s, o).then(function (t) {
            return t._handleSaveResult(!1).then(function () {
              return t;
            });
          });
        },
        follow: function (e, n) {
          if (!this.id) throw new Error("Please signin.");
          var r = void 0,
              s = void 0;
          e.user ? (r = e.user, s = e.attributes) : r = e;
          var o = i.isString(r) ? r : r.id;
          if (!o) throw new Error("Invalid target user.");
          var a = "users/" + this.id + "/friendship/" + o;
          return u(a, null, null, "POST", t._encode(s), n);
        },
        unfollow: function (t, e) {
          if (!this.id) throw new Error("Please signin.");
          var n = void 0;
          n = t.user ? t.user : t;
          var r = i.isString(n) ? n : n.id;
          if (!r) throw new Error("Invalid target user.");
          var s = "users/" + this.id + "/friendship/" + r;
          return u(s, null, null, "DELETE", null, e);
        },
        followerQuery: function () {
          return t.User.followerQuery(this.id);
        },
        followeeQuery: function () {
          return t.User.followeeQuery(this.id);
        },
        fetch: function (e, n) {
          return t.Object.prototype.fetch.call(this, e, n).then(function (t) {
            return t._handleSaveResult(!1).then(function () {
              return t;
            });
          });
        },
        updatePassword: function (t, e, n) {
          var r = "users/" + this.id + "/updatePassword";
          return u(r, null, null, "PUT", {
            old_password: t,
            new_password: e
          }, n);
        },
        isCurrent: function () {
          return this._isCurrentUser;
        },
        getUsername: function () {
          return this.get("username");
        },
        getMobilePhoneNumber: function () {
          return this.get("mobilePhoneNumber");
        },
        setMobilePhoneNumber: function (t, e) {
          return this.set("mobilePhoneNumber", t, e);
        },
        setUsername: function (t, e) {
          return this.set("username", t, e);
        },
        setPassword: function (t, e) {
          return this.set("password", t, e);
        },
        getEmail: function () {
          return this.get("email");
        },
        setEmail: function (t, e) {
          return this.set("email", t, e);
        },
        authenticated: function () {
          return console.warn("DEPRECATED: 如果要判断当前用户的登录状态是否有效，请使用 currentUser.isAuthenticated().then()，如果要判断该用户是否是当前登录用户，请使用 user.id === currentUser.id。"), !!this._sessionToken && !t._config.disableCurrentUser && t.User.current() && t.User.current().id === this.id;
        },
        isAuthenticated: function () {
          var e = this;
          return l.resolve().then(function () {
            return !!e._sessionToken && t.User._fetchUserBySessionToken(e._sessionToken).then(function () {
              return !0;
            }, function (t) {
              if (211 === t.code) return !1;
              throw t;
            });
          });
        },
        getSessionToken: function () {
          return this._sessionToken;
        },
        refreshSessionToken: function (t) {
          var e = this;
          return u("users/" + this.id + "/refreshSessionToken", null, null, "PUT", null, t).then(function (t) {
            return e._finishFetch(t), e._handleSaveResult(!0).then(function () {
              return e;
            });
          });
        },
        getRoles: function (e) {
          return t.Relation.reverseQuery("_Role", "users", this).find(e);
        }
      }, {
        _currentUser: null,
        _currentUserMatchesDisk: !1,
        _CURRENT_USER_KEY: "currentUser",
        _authProviders: {},
        signUp: function (e, n, r, i) {
          return r = r || {}, r.username = e, r.password = n, t.Object._create("_User").signUp(r, i);
        },
        logIn: function (e, n) {
          var r = t.Object._create("_User");

          return r._finishFetch({
            username: e,
            password: n
          }), r.logIn();
        },
        become: function (t) {
          return this._fetchUserBySessionToken(t).then(function (t) {
            return t._handleSaveResult(!0).then(function () {
              return t;
            });
          });
        },
        _fetchUserBySessionToken: function (e) {
          var n = t.Object._create("_User");

          return c({
            method: "GET",
            path: "/users/me",
            authOptions: {
              sessionToken: e
            }
          }).then(function (t) {
            var e = n.parse(t);
            return n._finishFetch(e), n;
          });
        },
        logInWithMobilePhoneSmsCode: function (e, n) {
          var r = t.Object._create("_User");

          return r._finishFetch({
            mobilePhoneNumber: e,
            smsCode: n
          }), r.logIn();
        },
        signUpOrlogInWithMobilePhone: function (e, n, r, i) {
          return r = r || {}, r.mobilePhoneNumber = e, r.smsCode = n, t.Object._create("_User").signUpOrlogInWithMobilePhone(r, i);
        },
        logInWithMobilePhone: function (e, n) {
          var r = t.Object._create("_User");

          return r._finishFetch({
            mobilePhoneNumber: e,
            password: n
          }), r.logIn();
        },
        loginWithAuthData: function (e, n, r) {
          return t.User._logInWith(n, e, r);
        },
        signUpOrlogInWithAuthData: function () {
          return console.warn("DEPRECATED: User.signUpOrlogInWithAuthData 已废弃，请使用 User#loginWithAuthData 代替"), this.loginWithAuthData.apply(this, arguments);
        },
        loginWithAuthDataAndUnionId: function (t, e, n, r) {
          return this.loginWithAuthData(f(t, n, r), e, r);
        },
        signUpOrlogInWithAuthDataAndUnionId: function () {
          return console.warn("DEPRECATED: User.signUpOrlogInWithAuthDataAndUnionId 已废弃，请使用 User#loginWithAuthDataAndUnionId 代替"), this.loginWithAuthDataAndUnionId.apply(this, arguments);
        },
        loginWithWeapp: function (t) {
          var e = this;
          return h().then(function (n) {
            return e.loginWithAuthData({
              code: n
            }, "lc_weapp", t);
          });
        },
        loginAnonymously: function () {
          return this.loginWithAuthData({
            id: s()
          }, "anonymous");
        },
        associateWithAuthData: function (t, e, n) {
          return console.warn("DEPRECATED: User.associateWithAuthData 已废弃，请使用 User#associateWithAuthData 代替"), t._linkWith(e, n);
        },
        logOut: function () {
          return t._config.disableCurrentUser ? (console.warn("AV.User.current() was disabled in multi-user environment, call logOut() from user object instead https://leancloud.cn/docs/leanengine-node-sdk-upgrade-1.html"), l.resolve(null)) : (null !== t.User._currentUser && (t.User._currentUser._logOutWithAll(), t.User._currentUser._isCurrentUser = !1), t.User._currentUserMatchesDisk = !0, t.User._currentUser = null, t.localStorage.removeItemAsync(t._getAVPath(t.User._CURRENT_USER_KEY)).then(function () {
            return t._refreshSubscriptionId();
          }));
        },
        followerQuery: function (e) {
          if (!e || !i.isString(e)) throw new Error("Invalid user object id.");
          var n = new t.FriendShipQuery("_Follower");
          return n._friendshipTag = "follower", n.equalTo("user", t.Object.createWithoutData("_User", e)), n;
        },
        followeeQuery: function (e) {
          if (!e || !i.isString(e)) throw new Error("Invalid user object id.");
          var n = new t.FriendShipQuery("_Followee");
          return n._friendshipTag = "followee", n.equalTo("user", t.Object.createWithoutData("_User", e)), n;
        },
        requestPasswordReset: function (t) {
          return u("requestPasswordReset", null, null, "POST", {
            email: t
          });
        },
        requestEmailVerify: function (t) {
          return u("requestEmailVerify", null, null, "POST", {
            email: t
          });
        },
        requestMobilePhoneVerify: function (t) {
          var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
              n = {
            mobilePhoneNumber: t
          };
          return e.validateToken && (n.validate_token = e.validateToken), u("requestMobilePhoneVerify", null, null, "POST", n, e);
        },
        requestPasswordResetBySmsCode: function (t) {
          var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
              n = {
            mobilePhoneNumber: t
          };
          return e.validateToken && (n.validate_token = e.validateToken), u("requestPasswordResetBySmsCode", null, null, "POST", n, e);
        },
        resetPasswordBySmsCode: function (t, e) {
          return u("resetPasswordBySmsCode", null, t, "PUT", {
            password: e
          });
        },
        verifyMobilePhone: function (t) {
          return u("verifyMobilePhone", null, t, "POST", null);
        },
        requestLoginSmsCode: function (t) {
          var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
              n = {
            mobilePhoneNumber: t
          };
          return e.validateToken && (n.validate_token = e.validateToken), u("requestLoginSmsCode", null, null, "POST", n, e);
        },
        currentAsync: function () {
          return t._config.disableCurrentUser ? (console.warn("AV.User.currentAsync() was disabled in multi-user environment, access user from request instead https://leancloud.cn/docs/leanengine-node-sdk-upgrade-1.html"), l.resolve(null)) : t.User._currentUser ? l.resolve(t.User._currentUser) : t.User._currentUserMatchesDisk ? l.resolve(t.User._currentUser) : t.localStorage.getItemAsync(t._getAVPath(t.User._CURRENT_USER_KEY)).then(function (e) {
            if (!e) return null;
            t.User._currentUserMatchesDisk = !0, t.User._currentUser = t.Object._create("_User"), t.User._currentUser._isCurrentUser = !0;
            var n = JSON.parse(e);
            return t.User._currentUser.id = n._id, delete n._id, t.User._currentUser._sessionToken = n._sessionToken, delete n._sessionToken, t.User._currentUser._finishFetch(n), t.User._currentUser._synchronizeAllAuthData(), t.User._currentUser._refreshCache(), t.User._currentUser._opSetQueue = [{}], t.User._currentUser;
          });
        },
        current: function () {
          if (t._config.disableCurrentUser) return console.warn("AV.User.current() was disabled in multi-user environment, access user from request instead https://leancloud.cn/docs/leanengine-node-sdk-upgrade-1.html"), null;
          if (t.User._currentUser) return t.User._currentUser;
          if (t.User._currentUserMatchesDisk) return t.User._currentUser;
          t.User._currentUserMatchesDisk = !0;
          var e = t.localStorage.getItem(t._getAVPath(t.User._CURRENT_USER_KEY));
          if (!e) return null;
          t.User._currentUser = t.Object._create("_User"), t.User._currentUser._isCurrentUser = !0;
          var n = JSON.parse(e);
          return t.User._currentUser.id = n._id, delete n._id, t.User._currentUser._sessionToken = n._sessionToken, delete n._sessionToken, t.User._currentUser._finishFetch(n), t.User._currentUser._synchronizeAllAuthData(), t.User._currentUser._refreshCache(), t.User._currentUser._opSetQueue = [{}], t.User._currentUser;
        },
        _saveCurrentUser: function (e) {
          var n;
          return n = t.User._currentUser !== e ? t.User.logOut() : l.resolve(), n.then(function () {
            e._isCurrentUser = !0, t.User._currentUser = e;

            var n = e._toFullJSON();

            return n._id = e.id, n._sessionToken = e._sessionToken, t.localStorage.setItemAsync(t._getAVPath(t.User._CURRENT_USER_KEY), JSON.stringify(n)).then(function () {
              return t.User._currentUserMatchesDisk = !0, t._refreshSubscriptionId();
            });
          });
        },
        _registerAuthenticationProvider: function (e) {
          t.User._authProviders[e.getAuthType()] = e, !t._config.disableCurrentUser && t.User.current() && t.User.current()._synchronizeAuthData(e.getAuthType());
        },
        _logInWith: function (e, n, r) {
          return t.Object._create("_User")._linkWith(e, n, r);
        }
      });
    };
  }, function (t, e, n) {
    "use strict";

    var r = n(0),
        i = n(6)("leancloud:query"),
        s = n(1),
        o = n(4),
        a = n(2),
        u = a._request,
        c = a.request,
        l = n(3),
        h = l.ensureArray,
        f = l.transformFetchOptions,
        d = function (t, e) {
      if (void 0 === t) throw new Error(e);
    };

    t.exports = function (t) {
      t.Query = function (e) {
        r.isString(e) && (e = t.Object._getSubclass(e)), this.objectClass = e, this.className = e.prototype.className, this._where = {}, this._include = [], this._select = [], this._limit = -1, this._skip = 0, this._extraOptions = {};
      }, t.Query.or = function () {
        var e = r.toArray(arguments),
            n = null;

        t._arrayEach(e, function (t) {
          if (r.isNull(n) && (n = t.className), n !== t.className) throw new Error("All queries must be for the same class");
        });

        var i = new t.Query(n);
        return i._orQuery(e), i;
      }, t.Query.and = function () {
        var e = r.toArray(arguments),
            n = null;

        t._arrayEach(e, function (t) {
          if (r.isNull(n) && (n = t.className), n !== t.className) throw new Error("All queries must be for the same class");
        });

        var i = new t.Query(n);
        return i._andQuery(e), i;
      }, t.Query.doCloudQuery = function (e, n, i) {
        var s = {
          cql: e
        };
        return r.isArray(n) ? s.pvalues = n : i = n, u("cloudQuery", null, null, "GET", s, i).then(function (e) {
          var n = new t.Query(e.className);
          return {
            results: r.map(e.results, function (t) {
              var r = n._newObject(e);

              return r._finishFetch && r._finishFetch(n._processResult(t), !0), r;
            }),
            count: e.count,
            className: e.className
          };
        });
      }, t.Query._extend = t._extend, r.extend(t.Query.prototype, {
        _processResult: function (t) {
          return t;
        },
        get: function (t, e) {
          if (!t) {
            throw new o(o.OBJECT_NOT_FOUND, "Object not found.");
          }

          var n = this._newObject();

          n.id = t;
          var i = this.toJSON(),
              s = {};
          return i.keys && (s.keys = i.keys), i.include && (s.include = i.include), i.includeACL && (s.includeACL = i.includeACL), u("classes", this.className, t, "GET", f(s), e).then(function (t) {
            if (r.isEmpty(t)) throw new o(o.OBJECT_NOT_FOUND, "Object not found.");
            return n._finishFetch(n.parse(t), !0), n;
          });
        },
        toJSON: function () {
          var e = {
            where: this._where
          };
          return this._include.length > 0 && (e.include = this._include.join(",")), this._select.length > 0 && (e.keys = this._select.join(",")), void 0 !== this._includeACL && (e.returnACL = this._includeACL), this._limit >= 0 && (e.limit = this._limit), this._skip > 0 && (e.skip = this._skip), void 0 !== this._order && (e.order = this._order), t._objectEach(this._extraOptions, function (t, n) {
            e[n] = t;
          }), e;
        },
        _newObject: function (e) {
          return e && e.className ? new t.Object(e.className) : new this.objectClass();
        },
        _createRequest: function () {
          var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.toJSON(),
              e = arguments[1],
              n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "/classes/" + this.className;

          if (encodeURIComponent(JSON.stringify(t)).length > 2e3) {
            return c({
              path: "/batch",
              method: "POST",
              data: {
                requests: [{
                  method: "GET",
                  path: "/1.1" + n,
                  params: t
                }]
              },
              authOptions: e
            }).then(function (t) {
              var e = t[0];
              if (e.success) return e.success;
              var n = new Error(e.error.error || "Unknown batch error");
              throw n.code = e.error.code, n;
            });
          }

          return c({
            method: "GET",
            path: n,
            query: t,
            authOptions: e
          });
        },
        _parseResponse: function (t) {
          var e = this;
          return r.map(t.results, function (n) {
            var r = e._newObject(t);

            return r._finishFetch && r._finishFetch(e._processResult(n), !0), r;
          });
        },
        find: function (t) {
          return this._createRequest(void 0, t).then(this._parseResponse.bind(this));
        },
        scan: function () {
          var t = this,
              e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
              n = e.orderedBy,
              o = e.batchSize,
              a = arguments[1],
              c = this.toJSON();
          i("scan %O", c), c.order && (console.warn("The order of the query is ignored for Query#scan. Checkout the orderedBy option of Query#scan."), delete c.order), c.skip && (console.warn("The skip option of the query is ignored for Query#scan."), delete c.skip), c.limit && (console.warn("The limit option of the query is ignored for Query#scan."), delete c.limit), n && (c.scan_key = n), o && (c.limit = o);
          var l = s.resolve([]),
              h = void 0,
              f = !1;
          return {
            next: function () {
              return l = l.then(function (e) {
                return f ? [] : e.length > 1 ? e : h || 0 === e.length ? u("scan/classes", t.className, null, "GET", h ? r.extend({}, c, {
                  cursor: h
                }) : c, a).then(function (e) {
                  return h = e.cursor, t._parseResponse(e);
                }).then(function (t) {
                  return t.length || (f = !0), e.concat(t);
                }) : (f = !0, e);
              }), l.then(function (t) {
                return t.shift();
              }).then(function (t) {
                return {
                  value: t,
                  done: f
                };
              });
            }
          };
        },
        destroyAll: function (e) {
          return this.find(e).then(function (n) {
            return t.Object.destroyAll(n, e);
          });
        },
        count: function (t) {
          var e = this.toJSON();
          return e.limit = 0, e.count = 1, this._createRequest(e, t).then(function (t) {
            return t.count;
          });
        },
        first: function (t) {
          var e = this,
              n = this.toJSON();
          return n.limit = 1, this._createRequest(n, t).then(function (t) {
            return r.map(t.results, function (t) {
              var n = e._newObject();

              return n._finishFetch && n._finishFetch(e._processResult(t), !0), n;
            })[0];
          });
        },
        skip: function (t) {
          return d(t, "undefined is not a valid skip value"), this._skip = t, this;
        },
        limit: function (t) {
          return d(t, "undefined is not a valid limit value"), this._limit = t, this;
        },
        equalTo: function (e, n) {
          return d(e, "undefined is not a valid key"), d(n, "undefined is not a valid value"), this._where[e] = t._encode(n), this;
        },
        _addCondition: function (e, n, r) {
          return d(e, "undefined is not a valid condition key"), d(n, "undefined is not a valid condition"), d(r, "undefined is not a valid condition value"), this._where[e] || (this._where[e] = {}), this._where[e][n] = t._encode(r), this;
        },
        sizeEqualTo: function (t, e) {
          return this._addCondition(t, "$size", e), this;
        },
        notEqualTo: function (t, e) {
          return this._addCondition(t, "$ne", e), this;
        },
        lessThan: function (t, e) {
          return this._addCondition(t, "$lt", e), this;
        },
        greaterThan: function (t, e) {
          return this._addCondition(t, "$gt", e), this;
        },
        lessThanOrEqualTo: function (t, e) {
          return this._addCondition(t, "$lte", e), this;
        },
        greaterThanOrEqualTo: function (t, e) {
          return this._addCondition(t, "$gte", e), this;
        },
        containedIn: function (t, e) {
          return this._addCondition(t, "$in", e), this;
        },
        notContainedIn: function (t, e) {
          return this._addCondition(t, "$nin", e), this;
        },
        containsAll: function (t, e) {
          return this._addCondition(t, "$all", e), this;
        },
        exists: function (t) {
          return this._addCondition(t, "$exists", !0), this;
        },
        doesNotExist: function (t) {
          return this._addCondition(t, "$exists", !1), this;
        },
        matches: function (t, e, n) {
          return this._addCondition(t, "$regex", e), n || (n = ""), e.ignoreCase && (n += "i"), e.multiline && (n += "m"), n && n.length && this._addCondition(t, "$options", n), this;
        },
        matchesQuery: function (t, e) {
          var n = e.toJSON();
          return n.className = e.className, this._addCondition(t, "$inQuery", n), this;
        },
        doesNotMatchQuery: function (t, e) {
          var n = e.toJSON();
          return n.className = e.className, this._addCondition(t, "$notInQuery", n), this;
        },
        matchesKeyInQuery: function (t, e, n) {
          var r = n.toJSON();
          return r.className = n.className, this._addCondition(t, "$select", {
            key: e,
            query: r
          }), this;
        },
        doesNotMatchKeyInQuery: function (t, e, n) {
          var r = n.toJSON();
          return r.className = n.className, this._addCondition(t, "$dontSelect", {
            key: e,
            query: r
          }), this;
        },
        _orQuery: function (t) {
          var e = r.map(t, function (t) {
            return t.toJSON().where;
          });
          return this._where.$or = e, this;
        },
        _andQuery: function (t) {
          var e = r.map(t, function (t) {
            return t.toJSON().where;
          });
          return this._where.$and = e, this;
        },
        _quote: function (t) {
          return "\\Q" + t.replace("\\E", "\\E\\\\E\\Q") + "\\E";
        },
        contains: function (t, e) {
          return this._addCondition(t, "$regex", this._quote(e)), this;
        },
        startsWith: function (t, e) {
          return this._addCondition(t, "$regex", "^" + this._quote(e)), this;
        },
        endsWith: function (t, e) {
          return this._addCondition(t, "$regex", this._quote(e) + "$"), this;
        },
        ascending: function (t) {
          return d(t, "undefined is not a valid key"), this._order = t, this;
        },
        addAscending: function (t) {
          return d(t, "undefined is not a valid key"), this._order ? this._order += "," + t : this._order = t, this;
        },
        descending: function (t) {
          return d(t, "undefined is not a valid key"), this._order = "-" + t, this;
        },
        addDescending: function (t) {
          return d(t, "undefined is not a valid key"), this._order ? this._order += ",-" + t : this._order = "-" + t, this;
        },
        near: function (e, n) {
          return n instanceof t.GeoPoint || (n = new t.GeoPoint(n)), this._addCondition(e, "$nearSphere", n), this;
        },
        withinRadians: function (t, e, n) {
          return this.near(t, e), this._addCondition(t, "$maxDistance", n), this;
        },
        withinMiles: function (t, e, n) {
          return this.withinRadians(t, e, n / 3958.8);
        },
        withinKilometers: function (t, e, n) {
          return this.withinRadians(t, e, n / 6371);
        },
        withinGeoBox: function (e, n, r) {
          return n instanceof t.GeoPoint || (n = new t.GeoPoint(n)), r instanceof t.GeoPoint || (r = new t.GeoPoint(r)), this._addCondition(e, "$within", {
            $box: [n, r]
          }), this;
        },
        include: function (t) {
          var e = this;
          return d(t, "undefined is not a valid key"), r(arguments).forEach(function (t) {
            e._include = e._include.concat(h(t));
          }), this;
        },
        includeACL: function () {
          var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
          return this._includeACL = t, this;
        },
        select: function (t) {
          var e = this;
          return d(t, "undefined is not a valid key"), r(arguments).forEach(function (t) {
            e._select = e._select.concat(h(t));
          }), this;
        },
        each: function (e) {
          var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};

          if (this._order || this._skip || this._limit >= 0) {
            var i = new Error("Cannot iterate on a query with sort, skip, or limit.");
            return s.reject(i);
          }

          var o = new t.Query(this.objectClass);
          o._limit = n.batchSize || 100, o._where = r.clone(this._where), o._include = r.clone(this._include), o.ascending("objectId");
          var a = !1;
          return s._continueWhile(function () {
            return !a;
          }, function () {
            return o.find(n).then(function (t) {
              var n = s.resolve();
              return r.each(t, function (t) {
                n = n.then(function () {
                  return e(t);
                });
              }), n.then(function () {
                t.length >= o._limit ? o.greaterThan("objectId", t[t.length - 1].id) : a = !0;
              });
            });
          });
        },
        subscribe: function (e) {
          return t.LiveQuery.init(this, e);
        }
      }), t.FriendShipQuery = t.Query._extend({
        _objectClass: t.User,
        _newObject: function () {
          return new t.User();
        },
        _processResult: function (t) {
          if (t && t[this._friendshipTag]) {
            var e = t[this._friendshipTag];
            return "Pointer" === e.__type && "_User" === e.className && (delete e.__type, delete e.className), e;
          }

          return null;
        }
      });
    };
  }, function (t, e, n) {
    "use strict";

    var r = n(0),
        i = n(53),
        s = n(1),
        o = n(3),
        a = o.inherits,
        u = n(2),
        c = u.request,
        l = function (t, e) {
      return c({
        method: "POST",
        path: "/LiveQuery/subscribe",
        data: {
          query: t,
          id: e
        }
      });
    };

    t.exports = function (t) {
      var e = function () {
        if (!t._config.realtime) throw new Error("LiveQuery not supported. Please use the LiveQuery bundle. https://url.leanapp.cn/enable-live-query");
      };

      t.LiveQuery = a(i, {
        constructor: function (t, e, n, r) {
          var s = this;
          i.apply(this), this.id = t, this._client = e, this._client.register(this), this._queryJSON = n, this._subscriptionId = r, this._onMessage = this._dispatch.bind(this), this._onReconnect = function () {
            l(s._queryJSON, s._subscriptionId).catch(function (t) {
              return console.error("LiveQuery resubscribe error: " + t.message);
            });
          }, e.on("message", this._onMessage), e.on("reconnect", this._onReconnect);
        },
        _dispatch: function (e) {
          var n = this;
          e.forEach(function (e) {
            var i = e.op,
                s = e.object,
                o = e.query_id,
                a = e.updatedKeys;

            if (o === n.id) {
              var u = t.parseJSON(r.extend({
                __type: "_File" === s.className ? "File" : "Object"
              }, s));
              a ? n.emit(i, u, a) : n.emit(i, u);
            }
          });
        },
        unsubscribe: function () {
          var t = this._client;
          return t.off("message", this._onMessage), t.off("reconnect", this._onReconnect), t.deregister(this), c({
            method: "POST",
            path: "/LiveQuery/unsubscribe",
            data: {
              id: t.id,
              query_id: this.id
            }
          });
        }
      }, {
        init: function (n) {
          var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
              i = r.subscriptionId,
              o = void 0 === i ? t._getSubscriptionId() : i;
          if (e(), !(n instanceof t.Query)) throw new TypeError("LiveQuery must be inited with a Query");
          return s.resolve(o).then(function (e) {
            return t._config.realtime.createLiveQueryClient(e).then(function (r) {
              var i = n.toJSON(),
                  s = i.where,
                  o = i.keys,
                  a = i.returnACL,
                  u = {
                where: s,
                keys: o,
                returnACL: a,
                className: n.className
              },
                  c = l(u, e).then(function (n) {
                var i = n.query_id;
                return new t.LiveQuery(i, r, u, e);
              }).finally(function () {
                r.deregister(c);
              });
              return r.register(c), c;
            });
          });
        },
        pause: function () {
          return e(), t._config.realtime.pause();
        },
        resume: function () {
          return e(), t._config.realtime.resume();
        }
      });
    };
  }, function (t, e, n) {
    "use strict";

    function r() {}

    function i(t, e, n) {
      this.fn = t, this.context = e, this.once = n || !1;
    }

    function s() {
      this._events = new r(), this._eventsCount = 0;
    }

    var o = Object.prototype.hasOwnProperty,
        a = "~";
    Object.create && (r.prototype = Object.create(null), new r().__proto__ || (a = !1)), s.prototype.eventNames = function () {
      var t,
          e,
          n = [];
      if (0 === this._eventsCount) return n;

      for (e in t = this._events) o.call(t, e) && n.push(a ? e.slice(1) : e);

      return Object.getOwnPropertySymbols ? n.concat(Object.getOwnPropertySymbols(t)) : n;
    }, s.prototype.listeners = function (t, e) {
      var n = a ? a + t : t,
          r = this._events[n];
      if (e) return !!r;
      if (!r) return [];
      if (r.fn) return [r.fn];

      for (var i = 0, s = r.length, o = new Array(s); i < s; i++) o[i] = r[i].fn;

      return o;
    }, s.prototype.emit = function (t, e, n, r, i, s) {
      var o = a ? a + t : t;
      if (!this._events[o]) return !1;
      var u,
          c,
          l = this._events[o],
          h = arguments.length;

      if (l.fn) {
        switch (l.once && this.removeListener(t, l.fn, void 0, !0), h) {
          case 1:
            return l.fn.call(l.context), !0;

          case 2:
            return l.fn.call(l.context, e), !0;

          case 3:
            return l.fn.call(l.context, e, n), !0;

          case 4:
            return l.fn.call(l.context, e, n, r), !0;

          case 5:
            return l.fn.call(l.context, e, n, r, i), !0;

          case 6:
            return l.fn.call(l.context, e, n, r, i, s), !0;
        }

        for (c = 1, u = new Array(h - 1); c < h; c++) u[c - 1] = arguments[c];

        l.fn.apply(l.context, u);
      } else {
        var f,
            d = l.length;

        for (c = 0; c < d; c++) switch (l[c].once && this.removeListener(t, l[c].fn, void 0, !0), h) {
          case 1:
            l[c].fn.call(l[c].context);
            break;

          case 2:
            l[c].fn.call(l[c].context, e);
            break;

          case 3:
            l[c].fn.call(l[c].context, e, n);
            break;

          case 4:
            l[c].fn.call(l[c].context, e, n, r);
            break;

          default:
            if (!u) for (f = 1, u = new Array(h - 1); f < h; f++) u[f - 1] = arguments[f];
            l[c].fn.apply(l[c].context, u);
        }
      }

      return !0;
    }, s.prototype.on = function (t, e, n) {
      var r = new i(e, n || this),
          s = a ? a + t : t;
      return this._events[s] ? this._events[s].fn ? this._events[s] = [this._events[s], r] : this._events[s].push(r) : (this._events[s] = r, this._eventsCount++), this;
    }, s.prototype.once = function (t, e, n) {
      var r = new i(e, n || this, !0),
          s = a ? a + t : t;
      return this._events[s] ? this._events[s].fn ? this._events[s] = [this._events[s], r] : this._events[s].push(r) : (this._events[s] = r, this._eventsCount++), this;
    }, s.prototype.removeListener = function (t, e, n, i) {
      var s = a ? a + t : t;
      if (!this._events[s]) return this;
      if (!e) return 0 == --this._eventsCount ? this._events = new r() : delete this._events[s], this;
      var o = this._events[s];
      if (o.fn) o.fn !== e || i && !o.once || n && o.context !== n || (0 == --this._eventsCount ? this._events = new r() : delete this._events[s]);else {
        for (var u = 0, c = [], l = o.length; u < l; u++) (o[u].fn !== e || i && !o[u].once || n && o[u].context !== n) && c.push(o[u]);

        c.length ? this._events[s] = 1 === c.length ? c[0] : c : 0 == --this._eventsCount ? this._events = new r() : delete this._events[s];
      }
      return this;
    }, s.prototype.removeAllListeners = function (t) {
      var e;
      return t ? (e = a ? a + t : t, this._events[e] && (0 == --this._eventsCount ? this._events = new r() : delete this._events[e])) : (this._events = new r(), this._eventsCount = 0), this;
    }, s.prototype.off = s.prototype.removeListener, s.prototype.addListener = s.prototype.on, s.prototype.setMaxListeners = function () {
      return this;
    }, s.prefixed = a, s.EventEmitter = s, t.exports = s;
  }, function (t, e, n) {
    "use strict";

    var r = n(0),
        i = n(3),
        s = i.tap;

    t.exports = function (t) {
      t.Captcha = function (t, e) {
        this._options = t, this._authOptions = e, this.url = void 0, this.captchaToken = void 0, this.validateToken = void 0;
      }, t.Captcha.prototype.refresh = function () {
        var e = this;
        return t.Cloud._requestCaptcha(this._options, this._authOptions).then(function (t) {
          var n = t.captchaToken,
              i = t.url;
          return r.extend(e, {
            captchaToken: n,
            url: i
          }), i;
        });
      }, t.Captcha.prototype.verify = function (e) {
        var n = this;
        return t.Cloud.verifyCaptcha(e, this.captchaToken).then(s(function (t) {
          return n.validateToken = t;
        }));
      }, t.Captcha.prototype.bind = function (t, e) {
        var n = this,
            r = t.textInput,
            i = t.image,
            s = t.verifyButton,
            o = e.success,
            a = e.error;
        if ("string" == typeof r && !(r = document.getElementById(r))) throw new Error("textInput with id " + r + " not found");
        if ("string" == typeof i && !(i = document.getElementById(i))) throw new Error("image with id " + i + " not found");
        if ("string" == typeof s && !(s = document.getElementById(s))) throw new Error("verifyButton with id " + s + " not found");
        this.__refresh = function () {
          return n.refresh().then(function (t) {
            i.src = t, r && (r.value = "", r.focus());
          }).catch(function (t) {
            return console.warn("refresh captcha fail: " + t.message);
          });
        }, i && (this.__image = i, i.src = this.url, i.addEventListener("click", this.__refresh)), this.__verify = function () {
          var t = r.value;
          n.verify(t).catch(function (t) {
            throw n.__refresh(), t;
          }).then(o, a).catch(function (t) {
            return console.warn("verify captcha fail: " + t.message);
          });
        }, r && s && (this.__verifyButton = s, s.addEventListener("click", this.__verify));
      }, t.Captcha.prototype.unbind = function () {
        this.__image && this.__image.removeEventListener("click", this.__refresh), this.__verifyButton && this.__verifyButton.removeEventListener("click", this.__verify);
      }, t.Captcha.request = function (e, n) {
        var r = new t.Captcha(e, n);
        return r.refresh().then(function () {
          return r;
        });
      };
    };
  }, function (t, e, n) {
    "use strict";

    var r = n(0),
        i = n(2),
        s = i._request,
        o = i.request,
        a = n(1);

    t.exports = function (t) {
      t.Cloud = t.Cloud || {}, r.extend(t.Cloud, {
        run: function (e, n, r) {
          return o({
            service: "engine",
            method: "POST",
            path: "/functions/" + e,
            data: t._encode(n, null, !0),
            authOptions: r
          }).then(function (e) {
            return t._decode(e).result;
          });
        },
        rpc: function (e, n, i) {
          return r.isArray(n) ? a.reject(new Error("Can't pass Array as the param of rpc function in JavaScript SDK.")) : o({
            service: "engine",
            method: "POST",
            path: "/call/" + e,
            data: t._encodeObjectOrArray(n),
            authOptions: i
          }).then(function (e) {
            return t._decode(e).result;
          });
        },
        getServerDate: function () {
          return s("date", null, null, "GET").then(function (e) {
            return t._decode(e);
          });
        },
        requestSmsCode: function (t) {
          var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          if (r.isString(t) && (t = {
            mobilePhoneNumber: t
          }), !t.mobilePhoneNumber) throw new Error("Missing mobilePhoneNumber.");
          return e.validateToken && (t = r.extend({}, t, {
            validate_token: e.validateToken
          })), s("requestSmsCode", null, null, "POST", t, e);
        },
        verifySmsCode: function (t, e) {
          if (!t) throw new Error("Missing sms code.");
          var n = {};
          return r.isString(e) && (n.mobilePhoneNumber = e), s("verifySmsCode", t, null, "POST", n);
        },
        _requestCaptcha: function (t, e) {
          return s("requestCaptcha", null, null, "GET", t, e).then(function (t) {
            var e = t.captcha_url;
            return {
              captchaToken: t.captcha_token,
              url: e
            };
          });
        },
        requestCaptcha: t.Captcha.request,
        verifyCaptcha: function (t, e) {
          return s("verifyCaptcha", null, null, "POST", {
            captcha_code: t,
            captcha_token: e
          }).then(function (t) {
            return t.validate_token;
          });
        }
      });
    };
  }, function (t, e, n) {
    "use strict";

    var r = n(2).request;

    t.exports = function (t) {
      t.Installation = t.Object.extend("_Installation"), t.Push = t.Push || {}, t.Push.send = function (t, e) {
        if (t.where && (t.where = t.where.toJSON().where), t.where && t.cql) throw new Error("Both where and cql can't be set");
        if (t.push_time && (t.push_time = t.push_time.toJSON()), t.expiration_time && (t.expiration_time = t.expiration_time.toJSON()), t.expiration_time && t.expiration_time_interval) throw new Error("Both expiration_time and expiration_time_interval can't be set");
        return r({
          service: "push",
          method: "POST",
          path: "/push",
          data: t,
          authOptions: e
        });
      };
    };
  }, function (t, e, n) {
    "use strict";

    var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
      return typeof t;
    } : function (t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
    },
        i = n(0),
        s = n(1),
        o = n(2)._request,
        a = n(3),
        u = a.getSessionToken;

    t.exports = function (t) {
      var e = function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        return u(e) ? t.User._fetchUserBySessionToken(u(e)) : t.User.currentAsync();
      },
          n = function (n) {
        return e(n).then(function (e) {
          return t.Object.createWithoutData("_User", e.id)._toPointer();
        });
      };

      t.Status = function (t, e) {
        return this.data = {}, this.inboxType = "default", this.query = null, t && "object" === (void 0 === t ? "undefined" : r(t)) ? this.data = t : (t && (this.data.image = t), e && (this.data.message = e)), this;
      }, i.extend(t.Status.prototype, {
        get: function (t) {
          return this.data[t];
        },
        set: function (t, e) {
          return this.data[t] = e, this;
        },
        destroy: function (t) {
          return this.id ? o("statuses", null, this.id, "DELETE", t) : s.reject(new Error("The status id is not exists."));
        },
        toObject: function () {
          return this.id ? t.Object.createWithoutData("_Status", this.id) : null;
        },
        _getDataJSON: function () {
          var e = i.clone(this.data);
          return t._encode(e);
        },
        send: function () {
          var e = this,
              r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          if (!u(r) && !t.User.current()) throw new Error("Please signin an user.");
          return this.query ? n(r).then(function (t) {
            var n = e.query.toJSON();
            n.className = e.query.className;
            var i = {};
            return i.query = n, e.data = e.data || {}, e.data.source = e.data.source || t, i.data = e._getDataJSON(), i.inboxType = e.inboxType || "default", o("statuses", null, null, "POST", i, r);
          }).then(function (n) {
            return e.id = n.objectId, e.createdAt = t._parseDate(n.createdAt), e;
          }) : t.Status.sendStatusToFollowers(this, r);
        },
        _finishFetch: function (e) {
          this.id = e.objectId, this.createdAt = t._parseDate(e.createdAt), this.updatedAt = t._parseDate(e.updatedAt), this.messageId = e.messageId, delete e.messageId, delete e.objectId, delete e.createdAt, delete e.updatedAt, this.data = t._decode(e);
        }
      }), t.Status.sendStatusToFollowers = function (e) {
        var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        if (!u(r) && !t.User.current()) throw new Error("Please signin an user.");
        return n(r).then(function (n) {
          var i = {};
          i.className = "_Follower", i.keys = "follower", i.where = {
            user: n
          };
          var s = {};
          return s.query = i, e.data = e.data || {}, e.data.source = e.data.source || n, s.data = e._getDataJSON(), s.inboxType = e.inboxType || "default", o("statuses", null, null, "POST", s, r).then(function (n) {
            return e.id = n.objectId, e.createdAt = t._parseDate(n.createdAt), e;
          });
        });
      }, t.Status.sendPrivateStatus = function (e, r) {
        var s = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        if (!u(s) && !t.User.current()) throw new Error("Please signin an user.");
        if (!r) throw new Error("Invalid target user.");
        var a = i.isString(r) ? r : r.id;
        if (!a) throw new Error("Invalid target user.");
        return n(s).then(function (n) {
          var r = {};
          r.className = "_User", r.where = {
            objectId: a
          };
          var i = {};
          return i.query = r, e.data = e.data || {}, e.data.source = e.data.source || n, i.data = e._getDataJSON(), i.inboxType = "private", e.inboxType = "private", o("statuses", null, null, "POST", i, s).then(function (n) {
            return e.id = n.objectId, e.createdAt = t._parseDate(n.createdAt), e;
          });
        });
      }, t.Status.countUnreadStatuses = function (n) {
        var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "default",
            a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        if (i.isString(r) || (a = r), !u(a) && null == n && !t.User.current()) throw new Error("Please signin an user or pass the owner objectId.");
        return s.resolve(n || e(a)).then(function (e) {
          var n = {};
          return n.inboxType = t._encode(r), n.owner = t._encode(e), o("subscribe/statuses/count", null, null, "GET", n, a);
        });
      }, t.Status.resetUnreadCount = function (n) {
        var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "default",
            a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        if (i.isString(r) || (a = r), !u(a) && null == n && !t.User.current()) throw new Error("Please signin an user or pass the owner objectId.");
        return s.resolve(n || e(a)).then(function (e) {
          var n = {};
          return n.inboxType = t._encode(r), n.owner = t._encode(e), o("subscribe/statuses/resetUnreadCount", null, null, "POST", n, a);
        });
      }, t.Status.statusQuery = function (e) {
        var n = new t.Query("_Status");
        return e && n.equalTo("source", e), n;
      }, t.InboxQuery = t.Query._extend({
        _objectClass: t.Status,
        _sinceId: 0,
        _maxId: 0,
        _inboxType: "default",
        _owner: null,
        _newObject: function () {
          return new t.Status();
        },
        _createRequest: function (e, n) {
          return t.InboxQuery.__super__._createRequest.call(this, e, n, "/subscribe/statuses");
        },
        sinceId: function (t) {
          return this._sinceId = t, this;
        },
        maxId: function (t) {
          return this._maxId = t, this;
        },
        owner: function (t) {
          return this._owner = t, this;
        },
        inboxType: function (t) {
          return this._inboxType = t, this;
        },
        toJSON: function () {
          var e = t.InboxQuery.__super__.toJSON.call(this);

          return e.owner = t._encode(this._owner), e.inboxType = t._encode(this._inboxType), e.sinceId = t._encode(this._sinceId), e.maxId = t._encode(this._maxId), e;
        }
      }), t.Status.inboxQuery = function (e, n) {
        var r = new t.InboxQuery(t.Status);
        return e && (r._owner = e), n && (r._inboxType = n), r;
      };
    };
  }, function (t, e, n) {
    "use strict";

    var r = n(0),
        i = n(2)._request;

    t.exports = function (t) {
      t.SearchSortBuilder = function () {
        this._sortFields = [];
      }, r.extend(t.SearchSortBuilder.prototype, {
        _addField: function (t, e, n, r) {
          var i = {};
          return i[t] = {
            order: e || "asc",
            mode: n || "avg",
            missing: "_" + (r || "last")
          }, this._sortFields.push(i), this;
        },
        ascending: function (t, e, n) {
          return this._addField(t, "asc", e, n);
        },
        descending: function (t, e, n) {
          return this._addField(t, "desc", e, n);
        },
        whereNear: function (t, e, n) {
          n = n || {};
          var r = {},
              i = {
            lat: e.latitude,
            lon: e.longitude
          },
              s = {
            order: n.order || "asc",
            mode: n.mode || "avg",
            unit: n.unit || "km"
          };
          return s[t] = i, r._geo_distance = s, this._sortFields.push(r), this;
        },
        build: function () {
          return JSON.stringify(t._encode(this._sortFields));
        }
      }), t.SearchQuery = t.Query._extend({
        _sid: null,
        _hits: 0,
        _queryString: null,
        _highlights: null,
        _sortBuilder: null,
        _createRequest: function (t, e) {
          return i("search/select", null, null, "GET", t || this.toJSON(), e);
        },
        sid: function (t) {
          return this._sid = t, this;
        },
        queryString: function (t) {
          return this._queryString = t, this;
        },
        highlights: function (t) {
          var e;
          return e = t && r.isString(t) ? arguments : t, this._highlights = e, this;
        },
        sortBy: function (t) {
          return this._sortBuilder = t, this;
        },
        hits: function () {
          return this._hits || (this._hits = 0), this._hits;
        },
        _processResult: function (t) {
          return delete t.className, delete t._app_url, delete t._deeplink, t;
        },
        hasMore: function () {
          return !this._hitEnd;
        },
        reset: function () {
          this._hitEnd = !1, this._sid = null, this._hits = 0;
        },
        find: function () {
          var t = this;
          return this._createRequest().then(function (e) {
            return e.sid ? (t._oldSid = t._sid, t._sid = e.sid) : (t._sid = null, t._hitEnd = !0), t._hits = e.hits || 0, r.map(e.results, function (n) {
              n.className && (e.className = n.className);

              var r = t._newObject(e);

              return r.appURL = n._app_url, r._finishFetch(t._processResult(n), !0), r;
            });
          });
        },
        toJSON: function () {
          var e = t.SearchQuery.__super__.toJSON.call(this);

          if (delete e.where, this.className && (e.clazz = this.className), this._sid && (e.sid = this._sid), !this._queryString) throw new Error("Please set query string.");
          if (e.q = this._queryString, this._highlights && (e.highlights = this._highlights.join(",")), this._sortBuilder && e.order) throw new Error("sort and order can not be set at same time.");
          return this._sortBuilder && (e.sort = this._sortBuilder.build()), e;
        }
      });
    };
  }, function (t, e, n) {
    "use strict";

    var r = n(0),
        i = n(4),
        s = n(2),
        o = s.request,
        a = n(1);

    t.exports = function (t) {
      t.Insight = t.Insight || {}, r.extend(t.Insight, {
        startJob: function (e, n) {
          if (!e || !e.sql) throw new Error("Please provide the sql to run the job.");
          var r = {
            jobConfig: e,
            appId: t.applicationId
          };
          return o({
            path: "/bigquery/jobs",
            method: "POST",
            data: t._encode(r, null, !0),
            authOptions: n,
            signKey: !1
          }).then(function (e) {
            return t._decode(e).id;
          });
        },
        on: function (t, e) {}
      }), t.Insight.JobQuery = function (t, e) {
        if (!t) throw new Error("Please provide the job id.");
        this.id = t, this.className = e, this._skip = 0, this._limit = 100;
      }, r.extend(t.Insight.JobQuery.prototype, {
        skip: function (t) {
          return this._skip = t, this;
        },
        limit: function (t) {
          return this._limit = t, this;
        },
        find: function (t) {
          var e = {
            skip: this._skip,
            limit: this._limit
          };
          return o({
            path: "/bigquery/jobs/" + this.id,
            method: "GET",
            query: e,
            authOptions: t,
            signKey: !1
          }).then(function (t) {
            return t.error ? a.reject(new i(t.code, t.error)) : a.resolve(t);
          });
        }
      });
    };
  }, function (t, e, n) {
    "use strict";

    var r = n(0),
        i = n(2),
        s = i._request,
        o = n(5),
        a = function (t) {
      return "string" == typeof t ? t : "function" == typeof t.getPayload ? JSON.stringify(t.getPayload()) : JSON.stringify(t);
    };

    t.exports = o.Object.extend("_Conversation", {
      constructor: function (t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        o.Object.prototype.constructor.call(this, null, null), this.set("name", t), void 0 !== e.isSystem && this.set("sys", !!e.isSystem), void 0 !== e.isTransient && this.set("tr", !!e.isTransient);
      },
      getCreator: function () {
        return this.get("c");
      },
      getLastMessageAt: function () {
        return this.get("lm");
      },
      getMembers: function () {
        return this.get("m");
      },
      addMember: function (t) {
        return this.add("m", t);
      },
      getMutedMembers: function () {
        return this.get("mu");
      },
      getName: function () {
        return this.get("name");
      },
      isTransient: function () {
        return this.get("tr");
      },
      isSystem: function () {
        return this.get("sys");
      },
      send: function (t, e) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
            r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
            i = {
          from_peer: t,
          conv_id: this.id,
          transient: !1,
          message: a(e)
        };
        return void 0 !== n.toClients && (i.to_peers = n.toClients), void 0 !== n.transient && (i.transient = !!n.transient), void 0 !== n.pushData && (i.push_data = n.pushData), s("rtm", "messages", null, "POST", i, r);
      },
      broadcast: function (t, e) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
            i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
            o = {
          from_peer: t,
          conv_id: this.id,
          message: a(e)
        };

        if (void 0 !== n.pushData && (o.push = n.pushData), void 0 !== n.validTill) {
          var u = n.validTill;
          r.isDate(u) && (u = u.getTime()), n.valid_till = u;
        }

        return s("rtm", "broadcast", null, "POST", o, i);
      }
    });
  }, function (t, e, n) {
    "use strict";

    function r(t) {
      var e = t.name,
          n = t.value,
          r = t.version;
      this.name = e, this.value = n, this.version = r;
    }

    var i = n(0),
        s = n(1),
        o = n(2),
        a = o.request,
        u = n(3),
        c = u.ensureArray,
        l = u.parseDate,
        h = n(5);
    h.LeaderboardVersionChangeInterval = {
      NEVER: "never",
      DAY: "day",
      WEEK: "week",
      MONTH: "month"
    }, h.LeaderboardOrder = {
      ASCENDING: "ascending",
      DESCENDING: "descending"
    }, h.LeaderboardUpdateStrategy = {
      BETTER: "better",
      LAST: "last",
      SUM: "sum"
    };

    var f = function (t) {
      var e = h._decode(t);

      return new r({
        name: e.statisticName,
        value: e.statisticValue,
        version: e.version
      });
    };

    h.Leaderboard = function (t) {
      this.statisticName = t, this.order = void 0, this.updateStrategy = void 0, this.versionChangeInterval = void 0, this.version = void 0, this.nextResetAt = void 0, this.createdAt = void 0;
    };

    var d = h.Leaderboard;
    h.Leaderboard.createWithoutData = function (t) {
      return new d(t);
    }, h.Leaderboard.createLeaderboard = function (t, e) {
      var n = t.statisticName,
          r = t.order,
          i = t.versionChangeInterval,
          s = t.updateStrategy;
      return a({
        method: "POST",
        path: "/leaderboard/leaderboards",
        data: {
          statisticName: n,
          order: r,
          versionChangeInterval: i,
          updateStrategy: s
        },
        authOptions: e
      }).then(function (t) {
        return new d(n)._finishFetch(t);
      });
    }, h.Leaderboard.getLeaderboard = function (t, e) {
      return d.createWithoutData(t).fetch(e);
    }, h.Leaderboard.getStatistics = function (t) {
      var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          n = e.statisticNames,
          r = arguments[2];
      return s.resolve().then(function () {
        if (!t || !t.id) throw new Error("user must be an AV.User");
        return a({
          method: "GET",
          path: "/leaderboard/users/" + t.id + "/statistics",
          query: {
            statistics: n ? c(n).join(",") : void 0
          },
          authOptions: r
        }).then(function (t) {
          return t.results.map(f);
        });
      });
    }, h.Leaderboard.updateStatistics = function (t, e) {
      var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
      return s.resolve().then(function () {
        if (!t || !t.id) throw new Error("user must be an AV.User");
        var r = i.map(e, function (t, e) {
          return {
            statisticName: e,
            statisticValue: t
          };
        }),
            s = n.overwrite;
        return a({
          method: "POST",
          path: "/leaderboard/users/" + t.id + "/statistics",
          query: {
            overwrite: s ? 1 : void 0
          },
          data: r,
          authOptions: n
        }).then(function (t) {
          return t.results.map(f);
        });
      });
    }, h.Leaderboard.deleteStatistics = function (t, e, n) {
      return s.resolve().then(function () {
        if (!t || !t.id) throw new Error("user must be an AV.User");
        return a({
          method: "DELETE",
          path: "/leaderboard/users/" + t.id + "/statistics",
          query: {
            statistics: c(e).join(",")
          },
          authOptions: n
        }).then(function () {});
      });
    }, i.extend(d.prototype, {
      _finishFetch: function (t) {
        var e = this;
        return i.forEach(t, function (t, n) {
          "updatedAt" !== n && "objectId" !== n && ("expiredAt" === n && (n = "nextResetAt"), "createdAt" === n && (t = l(t)), t && "Date" === t.__type && (t = l(t.iso)), e[n] = t);
        }), this;
      },
      fetch: function (t) {
        var e = this;
        return a({
          method: "GET",
          path: "/leaderboard/leaderboards/" + this.statisticName,
          authOptions: t
        }).then(function (t) {
          return e._finishFetch(t);
        });
      },
      _getResults: function (t, e, n) {
        var r = t.skip,
            i = t.limit,
            s = t.selectUserKeys,
            o = t.includeStatistics,
            u = t.version;
        return a({
          method: "GET",
          path: "/leaderboard/leaderboards/" + this.statisticName + "/ranks" + (n ? "/" + n : ""),
          query: {
            skip: r,
            limit: i,
            includeUser: s ? c(s).join(",") : void 0,
            includeStatistics: o ? c(o).join(",") : void 0,
            version: u
          },
          authOptions: e
        }).then(function (t) {
          return t.results.map(function (t) {
            var e = h._decode(t),
                n = e.user,
                r = e.statisticValue,
                i = e.rank,
                s = e.statistics;

            return {
              user: n,
              value: r,
              rank: i,
              includedStatistics: (void 0 === s ? [] : s).map(f)
            };
          });
        });
      },
      getResults: function () {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            e = t.skip,
            n = t.limit,
            r = t.selectUserKeys,
            i = t.includeStatistics,
            s = t.version,
            o = arguments[1];
        return this._getResults({
          skip: e,
          limit: n,
          selectUserKeys: r,
          includeStatistics: i,
          version: s
        }, o);
      },
      getResultsAroundUser: function (t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            n = arguments[2];
        if (t && "string" != typeof t.id) return this.getResultsAroundUser(void 0, t, e);
        var r = e.limit,
            i = e.selectUserKeys,
            s = e.includeStatistics,
            o = e.version;
        return this._getResults({
          limit: r,
          selectUserKeys: i,
          includeStatistics: s,
          version: o
        }, n, t ? t.id : "self");
      },
      _update: function (t, e) {
        var n = this;
        return a({
          method: "PUT",
          path: "/leaderboard/leaderboards/" + this.statisticName,
          data: t,
          authOptions: e
        }).then(function (t) {
          return n._finishFetch(t);
        });
      },
      updateVersionChangeInterval: function (t, e) {
        return this._update({
          versionChangeInterval: t
        }, e);
      },
      updateUpdateStrategy: function (t, e) {
        return this._update({
          updateStrategy: t
        }, e);
      },
      reset: function (t) {
        var e = this;
        return a({
          method: "PUT",
          path: "/leaderboard/leaderboards/" + this.statisticName + "/incrementVersion",
          authOptions: t
        }).then(function (t) {
          return e._finishFetch(t);
        });
      },
      destroy: function (t) {
        return h.request({
          method: "DELETE",
          path: "/leaderboard/leaderboards/" + this.statisticName,
          authOptions: t
        }).then(function () {});
      },
      getArchives: function () {
        var t = this,
            e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            n = e.skip,
            r = e.limit,
            i = arguments[1];
        return a({
          method: "GET",
          path: "/leaderboard/leaderboards/" + this.statisticName + "/archives",
          query: {
            skip: n,
            limit: r
          },
          authOptions: i
        }).then(function (e) {
          return e.results.map(function (e) {
            var n = e.version,
                r = e.status,
                i = e.url,
                s = e.activatedAt,
                o = e.deactivatedAt;
            return {
              statisticName: t.statisticName,
              version: n,
              status: r,
              url: i,
              activatedAt: l(s.iso),
              deactivatedAt: l(o.iso)
            };
          });
        });
      }
    });
  }]);
});
},{"process":"../../../AppData/Local/Yarn/Data/global/node_modules/process/browser.js"}],"js/initializers/av.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var APP_ID = 'BpRDxrD5ekiyXXc7ruHL9ooy-gzGzoHsz';
var APP_KEY = '60kbTMFODU37TGXG0XwuAx8q';
var _default = {
  APP_ID: 'BpRDxrD5ekiyXXc7ruHL9ooy-gzGzoHsz',
  APP_KEY: '60kbTMFODU37TGXG0XwuAx8q'
};
exports.default = _default;
},{}],"js/playlist/playlist.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = playlist;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function playlist() {
  var view = {
    el: "section.songs",
    template: "\n    <li class=\"song-all\" data-song-id=\"{{song.id}}\">\n            <div class=\"order-number\">{{number}}</div>\n            <div class=\"sgi_fr\">\n                <div class=\"sgich_fl\">\n                    <div class=\"f-thide sgich_tl\">{{song.name}}</div>\n                    <div class=\"f-thide sgich_info\">{{song.singer}} - {{song.name}}</div>\n                </div>\n                <div class=\"sgich_fr\"><svg class=\"icon icon-play\">\n                    <use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-play\"></use>\n                  </svg></div>\n            </div>\n        </li>\n    ",
    render: function render(data) {
      var _this = this;

      var songs = data.songs;
      songs.forEach(function (song, i) {
        var $li = $(_this.template.replace('{{song.name}}', song.name).replace('{{song.singer}}', song.singer).replace('{{song.id}}', song.id).replace('{{number}}', i + 1).replace('{{song.name}}', song.name));
        $(_this.el).find('ol.songlist').append($li);
      });
    }
  };
  var model = {
    data: {
      id: '',
      songs: []
    },
    findCurrentSongs: function () {
      var _findCurrentSongs = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(listId) {
        var _this2 = this;

        var playlist, query, lists, songs;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (listId) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return");

              case 2:
                playlist = AV.Object.createWithoutData('PlayList', listId); // 构建 ListSongMap 的查询

                query = new AV.Query('ListSongMap'); // 查询所有选择了playlist的

                query.equalTo('playlist', playlist); // 执行查询

                _context.next = 7;
                return query.find();

              case 7:
                lists = _context.sent;
                songs = [];
                songs = lists.map(function (list) {
                  return list.attributes.song;
                });
                AV.Object.fetchAll(songs).then(function (s) {
                  // 成功
                  _this2.data.songs = s.map(function (song) {
                    return _objectSpread({
                      id: song.id
                    }, song.attributes);
                  });
                }, function (error) {
                  // 异常处理
                  console.log('error', error);
                });
                return _context.abrupt("return", songs);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function findCurrentSongs(_x) {
        return _findCurrentSongs.apply(this, arguments);
      }

      return findCurrentSongs;
    }(),
    getListId: function getListId() {
      var search = window.location.search; //去掉问号

      if (search.indexOf('?') === 0) {
        search = search.substring(1);
      }

      var array = search.split('&').filter(function (v) {
        return v;
      });
      var id = '';
      array.forEach(function (current) {
        var _current$split = current.split('='),
            _current$split2 = _slicedToArray(_current$split, 2),
            key = _current$split2[0],
            value = _current$split2[1];

        if (key === 'id') {
          id = value;
          return false;
        }
      });
      return id;
    }
  };
  var controller = {
    init: function init(view, model) {
      var _this3 = this;

      this.view = view;
      this.model = model;
      this.model.id = this.model.getListId();
      this.model.findCurrentSongs(this.model.id).then(function () {
        setTimeout(function () {
          _this3.view.render(_this3.model.data);
        }, 500); // setTimeout(() => {
        //   this.view.render(this.model.data)
        // }, 1000);
      });
      this.bindEvents();
    },
    bindEvents: function bindEvents() {
      $('.intro_arrow').on('click', function (e) {
        $('.u-intro>.f-brk').toggleClass('f-thide3');
        $('.intro_arrow').toggleClass('u-arowup');
        $('.intro_arrow').toggleClass('u-arowdown');
      });
      $('ol.songlist').on('click', 'li', function (e) {
        var id = e.currentTarget.getAttribute('data-song-id');
        window.location.href = "./song.html?id=" + id;
      });
    }
  };
  controller.init(view, model);
}
},{}],"js/playlist.js":[function(require,module,exports) {
"use strict";

require("core-js/modules/es6.array.copy-within");

require("core-js/modules/es6.array.fill");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.find-index");

require("core-js/modules/es6.array.from");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.array.of");

require("core-js/modules/es6.array.sort");

require("core-js/modules/es6.array.species");

require("core-js/modules/es6.date.to-json");

require("core-js/modules/es6.date.to-primitive");

require("core-js/modules/es6.function.has-instance");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.map");

require("core-js/modules/es6.math.acosh");

require("core-js/modules/es6.math.asinh");

require("core-js/modules/es6.math.atanh");

require("core-js/modules/es6.math.cbrt");

require("core-js/modules/es6.math.clz32");

require("core-js/modules/es6.math.cosh");

require("core-js/modules/es6.math.expm1");

require("core-js/modules/es6.math.fround");

require("core-js/modules/es6.math.hypot");

require("core-js/modules/es6.math.imul");

require("core-js/modules/es6.math.log1p");

require("core-js/modules/es6.math.log10");

require("core-js/modules/es6.math.log2");

require("core-js/modules/es6.math.sign");

require("core-js/modules/es6.math.sinh");

require("core-js/modules/es6.math.tanh");

require("core-js/modules/es6.math.trunc");

require("core-js/modules/es6.number.constructor");

require("core-js/modules/es6.number.epsilon");

require("core-js/modules/es6.number.is-finite");

require("core-js/modules/es6.number.is-integer");

require("core-js/modules/es6.number.is-nan");

require("core-js/modules/es6.number.is-safe-integer");

require("core-js/modules/es6.number.max-safe-integer");

require("core-js/modules/es6.number.min-safe-integer");

require("core-js/modules/es6.number.parse-float");

require("core-js/modules/es6.number.parse-int");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es7.object.define-getter");

require("core-js/modules/es7.object.define-setter");

require("core-js/modules/es7.object.entries");

require("core-js/modules/es6.object.freeze");

require("core-js/modules/es6.object.get-own-property-descriptor");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.object.get-own-property-names");

require("core-js/modules/es6.object.get-prototype-of");

require("core-js/modules/es7.object.lookup-getter");

require("core-js/modules/es7.object.lookup-setter");

require("core-js/modules/es6.object.prevent-extensions");

require("core-js/modules/es6.object.is");

require("core-js/modules/es6.object.is-frozen");

require("core-js/modules/es6.object.is-sealed");

require("core-js/modules/es6.object.is-extensible");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.seal");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es7.object.values");

require("core-js/modules/es6.promise");

require("core-js/modules/es7.promise.finally");

require("core-js/modules/es6.reflect.apply");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.reflect.define-property");

require("core-js/modules/es6.reflect.delete-property");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/es6.reflect.get-own-property-descriptor");

require("core-js/modules/es6.reflect.get-prototype-of");

require("core-js/modules/es6.reflect.has");

require("core-js/modules/es6.reflect.is-extensible");

require("core-js/modules/es6.reflect.own-keys");

require("core-js/modules/es6.reflect.prevent-extensions");

require("core-js/modules/es6.reflect.set");

require("core-js/modules/es6.reflect.set-prototype-of");

require("core-js/modules/es6.regexp.constructor");

require("core-js/modules/es6.regexp.flags");

require("core-js/modules/es6.regexp.match");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.regexp.search");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.set");

require("core-js/modules/es6.symbol");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.string.anchor");

require("core-js/modules/es6.string.big");

require("core-js/modules/es6.string.blink");

require("core-js/modules/es6.string.bold");

require("core-js/modules/es6.string.code-point-at");

require("core-js/modules/es6.string.ends-with");

require("core-js/modules/es6.string.fixed");

require("core-js/modules/es6.string.fontcolor");

require("core-js/modules/es6.string.fontsize");

require("core-js/modules/es6.string.from-code-point");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.string.italics");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.string.link");

require("core-js/modules/es7.string.pad-start");

require("core-js/modules/es7.string.pad-end");

require("core-js/modules/es6.string.raw");

require("core-js/modules/es6.string.repeat");

require("core-js/modules/es6.string.small");

require("core-js/modules/es6.string.starts-with");

require("core-js/modules/es6.string.strike");

require("core-js/modules/es6.string.sub");

require("core-js/modules/es6.string.sup");

require("core-js/modules/es6.typed.array-buffer");

require("core-js/modules/es6.typed.int8-array");

require("core-js/modules/es6.typed.uint8-array");

require("core-js/modules/es6.typed.uint8-clamped-array");

require("core-js/modules/es6.typed.int16-array");

require("core-js/modules/es6.typed.uint16-array");

require("core-js/modules/es6.typed.int32-array");

require("core-js/modules/es6.typed.uint32-array");

require("core-js/modules/es6.typed.float32-array");

require("core-js/modules/es6.typed.float64-array");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.weak-set");

require("core-js/modules/es7.array.flat-map");

require("core-js/modules/web.timers");

require("core-js/modules/web.immediate");

require("core-js/modules/web.dom.iterable");

require("regenerator-runtime/runtime");

var _av = _interopRequireDefault(require("./initializers/av.js"));

var _playlist = _interopRequireDefault(require("./playlist/playlist.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* <script src="../node_modules/leancloud-storage/dist/av-min.js"></script>
<script src="./js/initializers/av.js"></script>
<script src="../node_modules/jquery/dist/jquery.min.js"></script>
<script src="js/playlist/playlist.js"></script> */
window.$ = require('jquery');

var AV = require('leancloud-storage');

window.AV = AV;
var APP_ID = _av.default.APP_ID,
    APP_KEY = _av.default.APP_KEY;
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});
(0, _playlist.default)();
},{"core-js/modules/es6.array.copy-within":"../node_modules/core-js/modules/es6.array.copy-within.js","core-js/modules/es6.array.fill":"../node_modules/core-js/modules/es6.array.fill.js","core-js/modules/es6.array.find":"../node_modules/core-js/modules/es6.array.find.js","core-js/modules/es6.array.find-index":"../node_modules/core-js/modules/es6.array.find-index.js","core-js/modules/es6.array.from":"../node_modules/core-js/modules/es6.array.from.js","core-js/modules/es7.array.includes":"../node_modules/core-js/modules/es7.array.includes.js","core-js/modules/es6.array.iterator":"../node_modules/core-js/modules/es6.array.iterator.js","core-js/modules/es6.array.of":"../node_modules/core-js/modules/es6.array.of.js","core-js/modules/es6.array.sort":"../node_modules/core-js/modules/es6.array.sort.js","core-js/modules/es6.array.species":"../node_modules/core-js/modules/es6.array.species.js","core-js/modules/es6.date.to-json":"../node_modules/core-js/modules/es6.date.to-json.js","core-js/modules/es6.date.to-primitive":"../node_modules/core-js/modules/es6.date.to-primitive.js","core-js/modules/es6.function.has-instance":"../node_modules/core-js/modules/es6.function.has-instance.js","core-js/modules/es6.function.name":"../node_modules/core-js/modules/es6.function.name.js","core-js/modules/es6.map":"../node_modules/core-js/modules/es6.map.js","core-js/modules/es6.math.acosh":"../node_modules/core-js/modules/es6.math.acosh.js","core-js/modules/es6.math.asinh":"../node_modules/core-js/modules/es6.math.asinh.js","core-js/modules/es6.math.atanh":"../node_modules/core-js/modules/es6.math.atanh.js","core-js/modules/es6.math.cbrt":"../node_modules/core-js/modules/es6.math.cbrt.js","core-js/modules/es6.math.clz32":"../node_modules/core-js/modules/es6.math.clz32.js","core-js/modules/es6.math.cosh":"../node_modules/core-js/modules/es6.math.cosh.js","core-js/modules/es6.math.expm1":"../node_modules/core-js/modules/es6.math.expm1.js","core-js/modules/es6.math.fround":"../node_modules/core-js/modules/es6.math.fround.js","core-js/modules/es6.math.hypot":"../node_modules/core-js/modules/es6.math.hypot.js","core-js/modules/es6.math.imul":"../node_modules/core-js/modules/es6.math.imul.js","core-js/modules/es6.math.log1p":"../node_modules/core-js/modules/es6.math.log1p.js","core-js/modules/es6.math.log10":"../node_modules/core-js/modules/es6.math.log10.js","core-js/modules/es6.math.log2":"../node_modules/core-js/modules/es6.math.log2.js","core-js/modules/es6.math.sign":"../node_modules/core-js/modules/es6.math.sign.js","core-js/modules/es6.math.sinh":"../node_modules/core-js/modules/es6.math.sinh.js","core-js/modules/es6.math.tanh":"../node_modules/core-js/modules/es6.math.tanh.js","core-js/modules/es6.math.trunc":"../node_modules/core-js/modules/es6.math.trunc.js","core-js/modules/es6.number.constructor":"../node_modules/core-js/modules/es6.number.constructor.js","core-js/modules/es6.number.epsilon":"../node_modules/core-js/modules/es6.number.epsilon.js","core-js/modules/es6.number.is-finite":"../node_modules/core-js/modules/es6.number.is-finite.js","core-js/modules/es6.number.is-integer":"../node_modules/core-js/modules/es6.number.is-integer.js","core-js/modules/es6.number.is-nan":"../node_modules/core-js/modules/es6.number.is-nan.js","core-js/modules/es6.number.is-safe-integer":"../node_modules/core-js/modules/es6.number.is-safe-integer.js","core-js/modules/es6.number.max-safe-integer":"../node_modules/core-js/modules/es6.number.max-safe-integer.js","core-js/modules/es6.number.min-safe-integer":"../node_modules/core-js/modules/es6.number.min-safe-integer.js","core-js/modules/es6.number.parse-float":"../node_modules/core-js/modules/es6.number.parse-float.js","core-js/modules/es6.number.parse-int":"../node_modules/core-js/modules/es6.number.parse-int.js","core-js/modules/es6.object.assign":"../node_modules/core-js/modules/es6.object.assign.js","core-js/modules/es7.object.define-getter":"../node_modules/core-js/modules/es7.object.define-getter.js","core-js/modules/es7.object.define-setter":"../node_modules/core-js/modules/es7.object.define-setter.js","core-js/modules/es7.object.entries":"../node_modules/core-js/modules/es7.object.entries.js","core-js/modules/es6.object.freeze":"../node_modules/core-js/modules/es6.object.freeze.js","core-js/modules/es6.object.get-own-property-descriptor":"../node_modules/core-js/modules/es6.object.get-own-property-descriptor.js","core-js/modules/es7.object.get-own-property-descriptors":"../node_modules/core-js/modules/es7.object.get-own-property-descriptors.js","core-js/modules/es6.object.get-own-property-names":"../node_modules/core-js/modules/es6.object.get-own-property-names.js","core-js/modules/es6.object.get-prototype-of":"../node_modules/core-js/modules/es6.object.get-prototype-of.js","core-js/modules/es7.object.lookup-getter":"../node_modules/core-js/modules/es7.object.lookup-getter.js","core-js/modules/es7.object.lookup-setter":"../node_modules/core-js/modules/es7.object.lookup-setter.js","core-js/modules/es6.object.prevent-extensions":"../node_modules/core-js/modules/es6.object.prevent-extensions.js","core-js/modules/es6.object.is":"../node_modules/core-js/modules/es6.object.is.js","core-js/modules/es6.object.is-frozen":"../node_modules/core-js/modules/es6.object.is-frozen.js","core-js/modules/es6.object.is-sealed":"../node_modules/core-js/modules/es6.object.is-sealed.js","core-js/modules/es6.object.is-extensible":"../node_modules/core-js/modules/es6.object.is-extensible.js","core-js/modules/es6.object.keys":"../node_modules/core-js/modules/es6.object.keys.js","core-js/modules/es6.object.seal":"../node_modules/core-js/modules/es6.object.seal.js","core-js/modules/es6.object.set-prototype-of":"../node_modules/core-js/modules/es6.object.set-prototype-of.js","core-js/modules/es7.object.values":"../node_modules/core-js/modules/es7.object.values.js","core-js/modules/es6.promise":"../node_modules/core-js/modules/es6.promise.js","core-js/modules/es7.promise.finally":"../node_modules/core-js/modules/es7.promise.finally.js","core-js/modules/es6.reflect.apply":"../node_modules/core-js/modules/es6.reflect.apply.js","core-js/modules/es6.reflect.construct":"../node_modules/core-js/modules/es6.reflect.construct.js","core-js/modules/es6.reflect.define-property":"../node_modules/core-js/modules/es6.reflect.define-property.js","core-js/modules/es6.reflect.delete-property":"../node_modules/core-js/modules/es6.reflect.delete-property.js","core-js/modules/es6.reflect.get":"../node_modules/core-js/modules/es6.reflect.get.js","core-js/modules/es6.reflect.get-own-property-descriptor":"../node_modules/core-js/modules/es6.reflect.get-own-property-descriptor.js","core-js/modules/es6.reflect.get-prototype-of":"../node_modules/core-js/modules/es6.reflect.get-prototype-of.js","core-js/modules/es6.reflect.has":"../node_modules/core-js/modules/es6.reflect.has.js","core-js/modules/es6.reflect.is-extensible":"../node_modules/core-js/modules/es6.reflect.is-extensible.js","core-js/modules/es6.reflect.own-keys":"../node_modules/core-js/modules/es6.reflect.own-keys.js","core-js/modules/es6.reflect.prevent-extensions":"../node_modules/core-js/modules/es6.reflect.prevent-extensions.js","core-js/modules/es6.reflect.set":"../node_modules/core-js/modules/es6.reflect.set.js","core-js/modules/es6.reflect.set-prototype-of":"../node_modules/core-js/modules/es6.reflect.set-prototype-of.js","core-js/modules/es6.regexp.constructor":"../node_modules/core-js/modules/es6.regexp.constructor.js","core-js/modules/es6.regexp.flags":"../node_modules/core-js/modules/es6.regexp.flags.js","core-js/modules/es6.regexp.match":"../node_modules/core-js/modules/es6.regexp.match.js","core-js/modules/es6.regexp.replace":"../node_modules/core-js/modules/es6.regexp.replace.js","core-js/modules/es6.regexp.split":"../node_modules/core-js/modules/es6.regexp.split.js","core-js/modules/es6.regexp.search":"../node_modules/core-js/modules/es6.regexp.search.js","core-js/modules/es6.regexp.to-string":"../node_modules/core-js/modules/es6.regexp.to-string.js","core-js/modules/es6.set":"../node_modules/core-js/modules/es6.set.js","core-js/modules/es6.symbol":"../node_modules/core-js/modules/es6.symbol.js","core-js/modules/es7.symbol.async-iterator":"../node_modules/core-js/modules/es7.symbol.async-iterator.js","core-js/modules/es6.string.anchor":"../node_modules/core-js/modules/es6.string.anchor.js","core-js/modules/es6.string.big":"../node_modules/core-js/modules/es6.string.big.js","core-js/modules/es6.string.blink":"../node_modules/core-js/modules/es6.string.blink.js","core-js/modules/es6.string.bold":"../node_modules/core-js/modules/es6.string.bold.js","core-js/modules/es6.string.code-point-at":"../node_modules/core-js/modules/es6.string.code-point-at.js","core-js/modules/es6.string.ends-with":"../node_modules/core-js/modules/es6.string.ends-with.js","core-js/modules/es6.string.fixed":"../node_modules/core-js/modules/es6.string.fixed.js","core-js/modules/es6.string.fontcolor":"../node_modules/core-js/modules/es6.string.fontcolor.js","core-js/modules/es6.string.fontsize":"../node_modules/core-js/modules/es6.string.fontsize.js","core-js/modules/es6.string.from-code-point":"../node_modules/core-js/modules/es6.string.from-code-point.js","core-js/modules/es6.string.includes":"../node_modules/core-js/modules/es6.string.includes.js","core-js/modules/es6.string.italics":"../node_modules/core-js/modules/es6.string.italics.js","core-js/modules/es6.string.iterator":"../node_modules/core-js/modules/es6.string.iterator.js","core-js/modules/es6.string.link":"../node_modules/core-js/modules/es6.string.link.js","core-js/modules/es7.string.pad-start":"../node_modules/core-js/modules/es7.string.pad-start.js","core-js/modules/es7.string.pad-end":"../node_modules/core-js/modules/es7.string.pad-end.js","core-js/modules/es6.string.raw":"../node_modules/core-js/modules/es6.string.raw.js","core-js/modules/es6.string.repeat":"../node_modules/core-js/modules/es6.string.repeat.js","core-js/modules/es6.string.small":"../node_modules/core-js/modules/es6.string.small.js","core-js/modules/es6.string.starts-with":"../node_modules/core-js/modules/es6.string.starts-with.js","core-js/modules/es6.string.strike":"../node_modules/core-js/modules/es6.string.strike.js","core-js/modules/es6.string.sub":"../node_modules/core-js/modules/es6.string.sub.js","core-js/modules/es6.string.sup":"../node_modules/core-js/modules/es6.string.sup.js","core-js/modules/es6.typed.array-buffer":"../node_modules/core-js/modules/es6.typed.array-buffer.js","core-js/modules/es6.typed.int8-array":"../node_modules/core-js/modules/es6.typed.int8-array.js","core-js/modules/es6.typed.uint8-array":"../node_modules/core-js/modules/es6.typed.uint8-array.js","core-js/modules/es6.typed.uint8-clamped-array":"../node_modules/core-js/modules/es6.typed.uint8-clamped-array.js","core-js/modules/es6.typed.int16-array":"../node_modules/core-js/modules/es6.typed.int16-array.js","core-js/modules/es6.typed.uint16-array":"../node_modules/core-js/modules/es6.typed.uint16-array.js","core-js/modules/es6.typed.int32-array":"../node_modules/core-js/modules/es6.typed.int32-array.js","core-js/modules/es6.typed.uint32-array":"../node_modules/core-js/modules/es6.typed.uint32-array.js","core-js/modules/es6.typed.float32-array":"../node_modules/core-js/modules/es6.typed.float32-array.js","core-js/modules/es6.typed.float64-array":"../node_modules/core-js/modules/es6.typed.float64-array.js","core-js/modules/es6.weak-map":"../node_modules/core-js/modules/es6.weak-map.js","core-js/modules/es6.weak-set":"../node_modules/core-js/modules/es6.weak-set.js","core-js/modules/es7.array.flat-map":"../node_modules/core-js/modules/es7.array.flat-map.js","core-js/modules/web.timers":"../node_modules/core-js/modules/web.timers.js","core-js/modules/web.immediate":"../node_modules/core-js/modules/web.immediate.js","core-js/modules/web.dom.iterable":"../node_modules/core-js/modules/web.dom.iterable.js","regenerator-runtime/runtime":"../node_modules/regenerator-runtime/runtime.js","jquery":"../node_modules/jquery/dist/jquery.js","leancloud-storage":"../node_modules/leancloud-storage/dist/av-min.js","./initializers/av.js":"js/initializers/av.js","./playlist/playlist.js":"js/playlist/playlist.js"}],"../../../AppData/Local/Yarn/Data/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "12850" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../AppData/Local/Yarn/Data/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/playlist.js"], null)
//# sourceMappingURL=/playlist.94d1e57a.js.map