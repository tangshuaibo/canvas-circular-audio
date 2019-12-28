
(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
var CanvasCirclularAudio = (function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var O = 'object';

	var check = function (it) {
	  return it && it.Math == Math && it;
	}; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


	var global_1 = // eslint-disable-next-line no-undef
	check(typeof globalThis == O && globalThis) || check(typeof window == O && window) || check(typeof self == O && self) || check(typeof commonjsGlobal == O && commonjsGlobal) || // eslint-disable-next-line no-new-func
	Function('return this')();

	var fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	var descriptors = !fails(function () {
	  return Object.defineProperty({}, 'a', {
	    get: function () {
	      return 7;
	    }
	  }).a != 7;
	});

	var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // Nashorn ~ JDK8 bug

	var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({
	  1: 2
	}, 1);
	var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : nativePropertyIsEnumerable;
	var objectPropertyIsEnumerable = {
	  f: f
	};

	var createPropertyDescriptor = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var toString = {}.toString;

	var classofRaw = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	var split = ''.split;
	var indexedObject = fails(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins
	  return !Object('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
	} : Object;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on " + it);
	  return it;
	};

	var toIndexedObject = function (it) {
	  return indexedObject(requireObjectCoercible(it));
	};

	var isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string

	var toPrimitive = function (it, S) {
	  if (!isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var hasOwnProperty = {}.hasOwnProperty;

	var has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var document = global_1.document; // typeof document.createElement is 'object' in old IE

	var exist = isObject(document) && isObject(document.createElement);

	var documentCreateElement = function (it) {
	  return exist ? document.createElement(it) : {};
	};

	var ie8DomDefine = !descriptors && !fails(function () {
	  return Object.defineProperty(documentCreateElement('div'), 'a', {
	    get: function () {
	      return 7;
	    }
	  }).a != 7;
	});

	var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
	var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject(O);
	  P = toPrimitive(P, true);
	  if (ie8DomDefine) try {
	    return nativeGetOwnPropertyDescriptor(O, P);
	  } catch (error) {
	    /* empty */
	  }
	  if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
	};
	var objectGetOwnPropertyDescriptor = {
	  f: f$1
	};

	var anObject = function (it) {
	  if (!isObject(it)) {
	    throw TypeError(String(it) + ' is not an object');
	  }

	  return it;
	};

	var nativeDefineProperty = Object.defineProperty;
	var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (ie8DomDefine) try {
	    return nativeDefineProperty(O, P, Attributes);
	  } catch (error) {
	    /* empty */
	  }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};
	var objectDefineProperty = {
	  f: f$2
	};

	var hide = descriptors ? function (object, key, value) {
	  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var setGlobal = function (key, value) {
	  try {
	    hide(global_1, key, value);
	  } catch (error) {
	    global_1[key] = value;
	  }

	  return value;
	};

	var shared = createCommonjsModule(function (module) {
	  var SHARED = '__core-js_shared__';
	  var store = global_1[SHARED] || setGlobal(SHARED, {});
	  (module.exports = function (key, value) {
	    return store[key] || (store[key] = value !== undefined ? value : {});
	  })('versions', []).push({
	    version: '3.1.3',
	    mode: 'global',
	    copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
	  });
	});

	var functionToString = shared('native-function-to-string', Function.toString);

	var WeakMap = global_1.WeakMap;
	var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(functionToString.call(WeakMap));

	var id = 0;
	var postfix = Math.random();

	var uid = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + postfix).toString(36));
	};

	var keys = shared('keys');

	var sharedKey = function (key) {
	  return keys[key] || (keys[key] = uid(key));
	};

	var hiddenKeys = {};

	var WeakMap$1 = global_1.WeakMap;
	var set, get, has$1;

	var enforce = function (it) {
	  return has$1(it) ? get(it) : set(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;

	    if (!isObject(it) || (state = get(it)).type !== TYPE) {
	      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
	    }

	    return state;
	  };
	};

	if (nativeWeakMap) {
	  var store = new WeakMap$1();
	  var wmget = store.get;
	  var wmhas = store.has;
	  var wmset = store.set;

	  set = function (it, metadata) {
	    wmset.call(store, it, metadata);
	    return metadata;
	  };

	  get = function (it) {
	    return wmget.call(store, it) || {};
	  };

	  has$1 = function (it) {
	    return wmhas.call(store, it);
	  };
	} else {
	  var STATE = sharedKey('state');
	  hiddenKeys[STATE] = true;

	  set = function (it, metadata) {
	    hide(it, STATE, metadata);
	    return metadata;
	  };

	  get = function (it) {
	    return has(it, STATE) ? it[STATE] : {};
	  };

	  has$1 = function (it) {
	    return has(it, STATE);
	  };
	}

	var internalState = {
	  set: set,
	  get: get,
	  has: has$1,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var redefine = createCommonjsModule(function (module) {
	  var getInternalState = internalState.get;
	  var enforceInternalState = internalState.enforce;
	  var TEMPLATE = String(functionToString).split('toString');
	  shared('inspectSource', function (it) {
	    return functionToString.call(it);
	  });
	  (module.exports = function (O, key, value, options) {
	    var unsafe = options ? !!options.unsafe : false;
	    var simple = options ? !!options.enumerable : false;
	    var noTargetGet = options ? !!options.noTargetGet : false;

	    if (typeof value == 'function') {
	      if (typeof key == 'string' && !has(value, 'name')) hide(value, 'name', key);
	      enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
	    }

	    if (O === global_1) {
	      if (simple) O[key] = value;else setGlobal(key, value);
	      return;
	    } else if (!unsafe) {
	      delete O[key];
	    } else if (!noTargetGet && O[key]) {
	      simple = true;
	    }

	    if (simple) O[key] = value;else hide(O, key, value); // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	  })(Function.prototype, 'toString', function toString() {
	    return typeof this == 'function' && getInternalState(this).source || functionToString.call(this);
	  });
	});

	var ceil = Math.ceil;
	var floor = Math.floor; // `ToInteger` abstract operation
	// https://tc39.github.io/ecma262/#sec-tointeger

	var toInteger = function (argument) {
	  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
	};

	var min = Math.min; // `ToLength` abstract operation
	// https://tc39.github.io/ecma262/#sec-tolength

	var toLength = function (argument) {
	  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min; // Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(length, length).

	var toAbsoluteIndex = function (index, length) {
	  var integer = toInteger(index);
	  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
	};

	// false -> Array#indexOf
	// https://tc39.github.io/ecma262/#sec-array.prototype.indexof
	// true  -> Array#includes
	// https://tc39.github.io/ecma262/#sec-array.prototype.includes

	var arrayIncludes = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject($this);
	    var length = toLength(O.length);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value; // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare

	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++]; // eslint-disable-next-line no-self-compare

	      if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
	    } else for (; length > index; index++) if (IS_INCLUDES || index in O) {
	      if (O[index] === el) return IS_INCLUDES || index || 0;
	    }
	    return !IS_INCLUDES && -1;
	  };
	};

	var arrayIndexOf = arrayIncludes(false);

	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject(object);
	  var i = 0;
	  var result = [];
	  var key;

	  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key); // Don't enum bug & hidden keys


	  while (names.length > i) if (has(O, key = names[i++])) {
	    ~arrayIndexOf(result, key) || result.push(key);
	  }

	  return result;
	};

	// IE8- don't enum bug keys
	var enumBugKeys = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];

	var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

	var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return objectKeysInternal(O, hiddenKeys$1);
	};

	var objectGetOwnPropertyNames = {
	  f: f$3
	};

	var f$4 = Object.getOwnPropertySymbols;
	var objectGetOwnPropertySymbols = {
	  f: f$4
	};

	var Reflect = global_1.Reflect; // all object keys, includes non-enumerable and symbols

	var ownKeys = Reflect && Reflect.ownKeys || function ownKeys(it) {
	  var keys = objectGetOwnPropertyNames.f(anObject(it));
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
	  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
	};

	var copyConstructorProperties = function (target, source) {
	  var keys = ownKeys(source);
	  var defineProperty = objectDefineProperty.f;
	  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;

	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	  }
	};

	var replacement = /#|\.prototype\./;

	var isForced = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true : value == NATIVE ? false : typeof detection == 'function' ? fails(detection) : !!detection;
	};

	var normalize = isForced.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced.data = {};
	var NATIVE = isForced.NATIVE = 'N';
	var POLYFILL = isForced.POLYFILL = 'P';
	var isForced_1 = isForced;

	var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
	/*
	  options.target      - name of the target object
	  options.global      - target is the global object
	  options.stat        - export as static methods of target
	  options.proto       - export as prototype methods of target
	  options.real        - real prototype method for the `pure` version
	  options.forced      - export even if the native feature is available
	  options.bind        - bind methods to the target, required for the `pure` version
	  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
	  options.sham        - add a flag to not completely full polyfills
	  options.enumerable  - export as enumerable property
	  options.noTargetGet - prevent calling a getter on target
	*/

	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var FORCED, target, key, targetProperty, sourceProperty, descriptor;

	  if (GLOBAL) {
	    target = global_1;
	  } else if (STATIC) {
	    target = global_1[TARGET] || setGlobal(TARGET, {});
	  } else {
	    target = (global_1[TARGET] || {}).prototype;
	  }

	  if (target) for (key in source) {
	    sourceProperty = source[key];

	    if (options.noTargetGet) {
	      descriptor = getOwnPropertyDescriptor$1(target, key);
	      targetProperty = descriptor && descriptor.value;
	    } else targetProperty = target[key];

	    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contained in target

	    if (!FORCED && targetProperty !== undefined) {
	      if (typeof sourceProperty === typeof targetProperty) continue;
	      copyConstructorProperties(sourceProperty, targetProperty);
	    } // add a flag to not completely full polyfills


	    if (options.sham || targetProperty && targetProperty.sham) {
	      hide(sourceProperty, 'sham', true);
	    } // extend global


	    redefine(target, key, sourceProperty, options);
	  }
	};

	// https://tc39.github.io/ecma262/#sec-toobject

	var toObject = function (argument) {
	  return Object(requireObjectCoercible(argument));
	};

	// https://tc39.github.io/ecma262/#sec-array.prototype.fill


	var arrayFill = function fill(value
	/* , start = 0, end = @length */
	) {
	  var O = toObject(this);
	  var length = toLength(O.length);
	  var argumentsLength = arguments.length;
	  var index = toAbsoluteIndex(argumentsLength > 1 ? arguments[1] : undefined, length);
	  var end = argumentsLength > 2 ? arguments[2] : undefined;
	  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);

	  while (endPos > index) O[index++] = value;

	  return O;
	};

	var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
	  // Chrome 38 Symbol has incorrect toString conversion
	  // eslint-disable-next-line no-undef
	  return !String(Symbol());
	});

	var Symbol$1 = global_1.Symbol;
	var store$1 = shared('wks');

	var wellKnownSymbol = function (name) {
	  return store$1[name] || (store$1[name] = nativeSymbol && Symbol$1[name] || (nativeSymbol ? Symbol$1 : uid)('Symbol.' + name));
	};

	var objectKeys = Object.keys || function keys(O) {
	  return objectKeysInternal(O, enumBugKeys);
	};

	var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = objectKeys(Properties);
	  var length = keys.length;
	  var i = 0;
	  var key;

	  while (length > i) objectDefineProperty.f(O, key = keys[i++], Properties[key]);

	  return O;
	};

	var document$1 = global_1.document;
	var html = document$1 && document$1.documentElement;

	var IE_PROTO = sharedKey('IE_PROTO');
	var PROTOTYPE = 'prototype';

	var Empty = function () {
	  /* empty */
	}; // Create object with fake `null` prototype: use iframe Object with cleared prototype


	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = documentCreateElement('iframe');
	  var length = enumBugKeys.length;
	  var lt = '<';
	  var script = 'script';
	  var gt = '>';
	  var js = 'java' + script + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe);
	  iframe.src = String(js);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + script + gt + 'document.F=Object' + lt + '/' + script + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;

	  while (length--) delete createDict[PROTOTYPE][enumBugKeys[length]];

	  return createDict();
	}; // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])


	var objectCreate = Object.create || function create(O, Properties) {
	  var result;

	  if (O !== null) {
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE] = null; // add "__proto__" for Object.getPrototypeOf polyfill

	    result[IE_PROTO] = O;
	  } else result = createDict();

	  return Properties === undefined ? result : objectDefineProperties(result, Properties);
	};

	hiddenKeys[IE_PROTO] = true;

	var UNSCOPABLES = wellKnownSymbol('unscopables');
	var ArrayPrototype = Array.prototype; // Array.prototype[@@unscopables]
	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

	if (ArrayPrototype[UNSCOPABLES] == undefined) {
	  hide(ArrayPrototype, UNSCOPABLES, objectCreate(null));
	} // add a key to Array.prototype[@@unscopables]


	var addToUnscopables = function (key) {
	  ArrayPrototype[UNSCOPABLES][key] = true;
	};

	// https://tc39.github.io/ecma262/#sec-array.prototype.fill

	_export({
	  target: 'Array',
	  proto: true
	}, {
	  fill: arrayFill
	}); // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

	addToUnscopables('fill');

	var iterators = {};

	var correctPrototypeGetter = !fails(function () {
	  function F() {
	    /* empty */
	  }

	  F.prototype.constructor = null;
	  return Object.getPrototypeOf(new F()) !== F.prototype;
	});

	var IE_PROTO$1 = sharedKey('IE_PROTO');
	var ObjectPrototype = Object.prototype; // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)

	var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
	  O = toObject(O);
	  if (has(O, IE_PROTO$1)) return O[IE_PROTO$1];

	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  }

	  return O instanceof Object ? ObjectPrototype : null;
	};

	var ITERATOR = wellKnownSymbol('iterator');
	var BUGGY_SAFARI_ITERATORS = false;

	var returnThis = function () {
	  return this;
	}; // `%IteratorPrototype%` object
	// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object


	var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

	if ([].keys) {
	  arrayIterator = [].keys(); // Safari 8 has buggy iterators w/o `next`

	  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;else {
	    PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
	    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
	  }
	}

	if (IteratorPrototype == undefined) IteratorPrototype = {}; // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()

	if (!has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
	var iteratorsCore = {
	  IteratorPrototype: IteratorPrototype,
	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
	};

	var defineProperty = objectDefineProperty.f;
	var TO_STRING_TAG = wellKnownSymbol('toStringTag');

	var setToStringTag = function (it, TAG, STATIC) {
	  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
	    defineProperty(it, TO_STRING_TAG, {
	      configurable: true,
	      value: TAG
	    });
	  }
	};

	var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;

	var returnThis$1 = function () {
	  return this;
	};

	var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
	  var TO_STRING_TAG = NAME + ' Iterator';
	  IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, {
	    next: createPropertyDescriptor(1, next)
	  });
	  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
	  iterators[TO_STRING_TAG] = returnThis$1;
	  return IteratorConstructor;
	};

	var validateSetPrototypeOfArguments = function (O, proto) {
	  anObject(O);

	  if (!isObject(proto) && proto !== null) {
	    throw TypeError("Can't set " + String(proto) + ' as a prototype');
	  }
	};

	/* eslint-disable no-proto */

	var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
	  var correctSetter = false;
	  var test = {};
	  var setter;

	  try {
	    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
	    setter.call(test, []);
	    correctSetter = test instanceof Array;
	  } catch (error) {
	    /* empty */
	  }

	  return function setPrototypeOf(O, proto) {
	    validateSetPrototypeOfArguments(O, proto);
	    if (correctSetter) setter.call(O, proto);else O.__proto__ = proto;
	    return O;
	  };
	}() : undefined);

	var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
	var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
	var ITERATOR$1 = wellKnownSymbol('iterator');
	var KEYS = 'keys';
	var VALUES = 'values';
	var ENTRIES = 'entries';

	var returnThis$2 = function () {
	  return this;
	};

	var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
	  createIteratorConstructor(IteratorConstructor, NAME, next);

	  var getIterationMethod = function (KIND) {
	    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
	    if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype) return IterablePrototype[KIND];

	    switch (KIND) {
	      case KEYS:
	        return function keys() {
	          return new IteratorConstructor(this, KIND);
	        };

	      case VALUES:
	        return function values() {
	          return new IteratorConstructor(this, KIND);
	        };

	      case ENTRIES:
	        return function entries() {
	          return new IteratorConstructor(this, KIND);
	        };
	    }

	    return function () {
	      return new IteratorConstructor(this);
	    };
	  };

	  var TO_STRING_TAG = NAME + ' Iterator';
	  var INCORRECT_VALUES_NAME = false;
	  var IterablePrototype = Iterable.prototype;
	  var nativeIterator = IterablePrototype[ITERATOR$1] || IterablePrototype['@@iterator'] || DEFAULT && IterablePrototype[DEFAULT];
	  var defaultIterator = !BUGGY_SAFARI_ITERATORS$1 && nativeIterator || getIterationMethod(DEFAULT);
	  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
	  var CurrentIteratorPrototype, methods, KEY; // fix native

	  if (anyNativeIterator) {
	    CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));

	    if (IteratorPrototype$2 !== Object.prototype && CurrentIteratorPrototype.next) {
	      if (objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype$2) {
	        if (objectSetPrototypeOf) {
	          objectSetPrototypeOf(CurrentIteratorPrototype, IteratorPrototype$2);
	        } else if (typeof CurrentIteratorPrototype[ITERATOR$1] != 'function') {
	          hide(CurrentIteratorPrototype, ITERATOR$1, returnThis$2);
	        }
	      } // Set @@toStringTag to native iterators


	      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
	    }
	  } // fix Array#{values, @@iterator}.name in V8 / FF


	  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
	    INCORRECT_VALUES_NAME = true;

	    defaultIterator = function values() {
	      return nativeIterator.call(this);
	    };
	  } // define iterator


	  if (IterablePrototype[ITERATOR$1] !== defaultIterator) {
	    hide(IterablePrototype, ITERATOR$1, defaultIterator);
	  }

	  iterators[NAME] = defaultIterator; // export additional methods

	  if (DEFAULT) {
	    methods = {
	      values: getIterationMethod(VALUES),
	      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
	      entries: getIterationMethod(ENTRIES)
	    };
	    if (FORCED) for (KEY in methods) {
	      if (BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
	        redefine(IterablePrototype, KEY, methods[KEY]);
	      }
	    } else _export({
	      target: NAME,
	      proto: true,
	      forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME
	    }, methods);
	  }

	  return methods;
	};

	var ARRAY_ITERATOR = 'Array Iterator';
	var setInternalState = internalState.set;
	var getInternalState = internalState.getterFor(ARRAY_ITERATOR); // `Array.prototype.entries` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.entries
	// `Array.prototype.keys` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.keys
	// `Array.prototype.values` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.values
	// `Array.prototype[@@iterator]` method
	// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
	// `CreateArrayIterator` internal method
	// https://tc39.github.io/ecma262/#sec-createarrayiterator

	var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
	  setInternalState(this, {
	    type: ARRAY_ITERATOR,
	    target: toIndexedObject(iterated),
	    // target
	    index: 0,
	    // next index
	    kind: kind // kind

	  }); // `%ArrayIteratorPrototype%.next` method
	  // https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
	}, function () {
	  var state = getInternalState(this);
	  var target = state.target;
	  var kind = state.kind;
	  var index = state.index++;

	  if (!target || index >= target.length) {
	    state.target = undefined;
	    return {
	      value: undefined,
	      done: true
	    };
	  }

	  if (kind == 'keys') return {
	    value: index,
	    done: false
	  };
	  if (kind == 'values') return {
	    value: target[index],
	    done: false
	  };
	  return {
	    value: [index, target[index]],
	    done: false
	  };
	}, 'values'); // argumentsList[@@iterator] is %ArrayProto_values%
	// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
	// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject

	iterators.Arguments = iterators.Array; // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

	var aFunction = function (it) {
	  if (typeof it != 'function') {
	    throw TypeError(String(it) + ' is not a function');
	  }

	  return it;
	};

	// https://tc39.github.io/ecma262/#sec-array.prototype.reduce
	// https://tc39.github.io/ecma262/#sec-array.prototype.reduceright

	var arrayReduce = function (that, callbackfn, argumentsLength, memo, isRight) {
	  aFunction(callbackfn);
	  var O = toObject(that);
	  var self = indexedObject(O);
	  var length = toLength(O.length);
	  var index = isRight ? length - 1 : 0;
	  var i = isRight ? -1 : 1;
	  if (argumentsLength < 2) while (true) {
	    if (index in self) {
	      memo = self[index];
	      index += i;
	      break;
	    }

	    index += i;

	    if (isRight ? index < 0 : length <= index) {
	      throw TypeError('Reduce of empty array with no initial value');
	    }
	  }

	  for (; isRight ? index >= 0 : length > index; index += i) if (index in self) {
	    memo = callbackfn(memo, self[index], index, O);
	  }

	  return memo;
	};

	var sloppyArrayMethod = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !method || !fails(function () {
	    // eslint-disable-next-line no-useless-call,no-throw-literal
	    method.call(null, argument || function () {
	      throw 1;
	    }, 1);
	  });
	};

	var SLOPPY_METHOD = sloppyArrayMethod('reduce'); // `Array.prototype.reduce` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.reduce

	_export({
	  target: 'Array',
	  proto: true,
	  forced: SLOPPY_METHOD
	}, {
	  reduce: function reduce(callbackfn
	  /* , initialValue */
	  ) {
	    return arrayReduce(this, callbackfn, arguments.length, arguments[1], false);
	  }
	});

	// https://tc39.github.io/ecma262/#sec-isarray

	var isArray = Array.isArray || function isArray(arg) {
	  return classofRaw(arg) == 'Array';
	};

	var createProperty = function (object, key, value) {
	  var propertyKey = toPrimitive(key);
	  if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));else object[propertyKey] = value;
	};

	var SPECIES = wellKnownSymbol('species');

	var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
	  return !fails(function () {
	    var array = [];
	    var constructor = array.constructor = {};

	    constructor[SPECIES] = function () {
	      return {
	        foo: 1
	      };
	    };

	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};

	var SPECIES$1 = wellKnownSymbol('species');
	var nativeSlice = [].slice;
	var max$1 = Math.max;
	var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice'); // `Array.prototype.slice` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.slice
	// fallback for not array-like ES3 strings and DOM objects

	_export({
	  target: 'Array',
	  proto: true,
	  forced: !SPECIES_SUPPORT
	}, {
	  slice: function slice(start, end) {
	    var O = toIndexedObject(this);
	    var length = toLength(O.length);
	    var k = toAbsoluteIndex(start, length);
	    var fin = toAbsoluteIndex(end === undefined ? length : end, length); // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible

	    var Constructor, result, n;

	    if (isArray(O)) {
	      Constructor = O.constructor; // cross-realm fallback

	      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
	        Constructor = undefined;
	      } else if (isObject(Constructor)) {
	        Constructor = Constructor[SPECIES$1];
	        if (Constructor === null) Constructor = undefined;
	      }

	      if (Constructor === Array || Constructor === undefined) {
	        return nativeSlice.call(O, k, fin);
	      }
	    }

	    result = new (Constructor === undefined ? Array : Constructor)(max$1(fin - k, 0));

	    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);

	    result.length = n;
	    return result;
	  }
	});

	var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag'); // ES3 wrong here

	var CORRECT_ARGUMENTS = classofRaw(function () {
	  return arguments;
	}()) == 'Arguments'; // fallback for IE11 Script Access Denied error

	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) {
	    /* empty */
	  }
	}; // getting tag from ES6+ `Object.prototype.toString`


	var classof = function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
	  : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$1)) == 'string' ? tag // builtinTag case
	  : CORRECT_ARGUMENTS ? classofRaw(O) // ES3 arguments fallback
	  : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
	};

	var defineProperty$1 = objectDefineProperty.f;
	var DataView = global_1.DataView;
	var DataViewPrototype = DataView && DataView.prototype;
	var Int8Array$1 = global_1.Int8Array;
	var Int8ArrayPrototype = Int8Array$1 && Int8Array$1.prototype;
	var Uint8ClampedArray = global_1.Uint8ClampedArray;
	var Uint8ClampedArrayPrototype = Uint8ClampedArray && Uint8ClampedArray.prototype;
	var TypedArray = Int8Array$1 && objectGetPrototypeOf(Int8Array$1);
	var TypedArrayPrototype = Int8ArrayPrototype && objectGetPrototypeOf(Int8ArrayPrototype);
	var ObjectPrototype$1 = Object.prototype;
	var isPrototypeOf = ObjectPrototype$1.isPrototypeOf;
	var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');
	var TYPED_ARRAY_TAG = uid('TYPED_ARRAY_TAG');
	var NATIVE_ARRAY_BUFFER = !!(global_1.ArrayBuffer && global_1.DataView);
	var NATIVE_ARRAY_BUFFER_VIEWS = NATIVE_ARRAY_BUFFER && !!objectSetPrototypeOf;
	var TYPED_ARRAY_TAG_REQIRED = false;
	var NAME;
	var TypedArrayConstructorsList = {
	  Int8Array: 1,
	  Uint8Array: 1,
	  Uint8ClampedArray: 1,
	  Int16Array: 2,
	  Uint16Array: 2,
	  Int32Array: 4,
	  Uint32Array: 4,
	  Float32Array: 4,
	  Float64Array: 8
	};

	var isView = function isView(it) {
	  var klass = classof(it);
	  return klass === 'DataView' || has(TypedArrayConstructorsList, klass);
	};

	var isTypedArray = function (it) {
	  return isObject(it) && has(TypedArrayConstructorsList, classof(it));
	};

	var aTypedArray = function (it) {
	  if (isTypedArray(it)) return it;
	  throw TypeError('Target is not a typed array');
	};

	var aTypedArrayConstructor = function (C) {
	  if (objectSetPrototypeOf) {
	    if (isPrototypeOf.call(TypedArray, C)) return C;
	  } else for (var ARRAY in TypedArrayConstructorsList) if (has(TypedArrayConstructorsList, NAME)) {
	    var TypedArrayConstructor = global_1[ARRAY];

	    if (TypedArrayConstructor && (C === TypedArrayConstructor || isPrototypeOf.call(TypedArrayConstructor, C))) {
	      return C;
	    }
	  }

	  throw TypeError('Target is not a typed array constructor');
	};

	var exportProto = function (KEY, property, forced) {
	  if (!descriptors) return;
	  if (forced) for (var ARRAY in TypedArrayConstructorsList) {
	    var TypedArrayConstructor = global_1[ARRAY];

	    if (TypedArrayConstructor && has(TypedArrayConstructor.prototype, KEY)) {
	      delete TypedArrayConstructor.prototype[KEY];
	    }
	  }

	  if (!TypedArrayPrototype[KEY] || forced) {
	    redefine(TypedArrayPrototype, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS && Int8ArrayPrototype[KEY] || property);
	  }
	};

	var exportStatic = function (KEY, property, forced) {
	  var ARRAY, TypedArrayConstructor;
	  if (!descriptors) return;

	  if (objectSetPrototypeOf) {
	    if (forced) for (ARRAY in TypedArrayConstructorsList) {
	      TypedArrayConstructor = global_1[ARRAY];

	      if (TypedArrayConstructor && has(TypedArrayConstructor, KEY)) {
	        delete TypedArrayConstructor[KEY];
	      }
	    }

	    if (!TypedArray[KEY] || forced) {
	      // V8 ~ Chrome 49-50 `%TypedArray%` methods are non-writable non-configurable
	      try {
	        return redefine(TypedArray, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS && Int8Array$1[KEY] || property);
	      } catch (error) {
	        /* empty */
	      }
	    } else return;
	  }

	  for (ARRAY in TypedArrayConstructorsList) {
	    TypedArrayConstructor = global_1[ARRAY];

	    if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) {
	      redefine(TypedArrayConstructor, KEY, property);
	    }
	  }
	};

	for (NAME in TypedArrayConstructorsList) {
	  if (!global_1[NAME]) NATIVE_ARRAY_BUFFER_VIEWS = false;
	} // WebKit bug - typed arrays constructors prototype is Object.prototype


	if (!NATIVE_ARRAY_BUFFER_VIEWS || typeof TypedArray != 'function' || TypedArray === Function.prototype) {
	  // eslint-disable-next-line no-shadow
	  TypedArray = function TypedArray() {
	    throw TypeError('Incorrect invocation');
	  };

	  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
	    if (global_1[NAME]) objectSetPrototypeOf(global_1[NAME], TypedArray);
	  }
	}

	if (!NATIVE_ARRAY_BUFFER_VIEWS || !TypedArrayPrototype || TypedArrayPrototype === ObjectPrototype$1) {
	  TypedArrayPrototype = TypedArray.prototype;
	  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
	    if (global_1[NAME]) objectSetPrototypeOf(global_1[NAME].prototype, TypedArrayPrototype);
	  }
	} // WebKit bug - one more object in Uint8ClampedArray prototype chain


	if (NATIVE_ARRAY_BUFFER_VIEWS && objectGetPrototypeOf(Uint8ClampedArrayPrototype) !== TypedArrayPrototype) {
	  objectSetPrototypeOf(Uint8ClampedArrayPrototype, TypedArrayPrototype);
	}

	if (descriptors && !has(TypedArrayPrototype, TO_STRING_TAG$2)) {
	  TYPED_ARRAY_TAG_REQIRED = true;
	  defineProperty$1(TypedArrayPrototype, TO_STRING_TAG$2, {
	    get: function () {
	      return isObject(this) ? this[TYPED_ARRAY_TAG] : undefined;
	    }
	  });

	  for (NAME in TypedArrayConstructorsList) if (global_1[NAME]) {
	    hide(global_1[NAME], TYPED_ARRAY_TAG, NAME);
	  }
	} // WebKit bug - the same parent prototype for typed arrays and data view


	if (NATIVE_ARRAY_BUFFER && objectSetPrototypeOf && objectGetPrototypeOf(DataViewPrototype) !== ObjectPrototype$1) {
	  objectSetPrototypeOf(DataViewPrototype, ObjectPrototype$1);
	}

	var arrayBufferViewCore = {
	  NATIVE_ARRAY_BUFFER: NATIVE_ARRAY_BUFFER,
	  NATIVE_ARRAY_BUFFER_VIEWS: NATIVE_ARRAY_BUFFER_VIEWS,
	  TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQIRED && TYPED_ARRAY_TAG,
	  aTypedArray: aTypedArray,
	  aTypedArrayConstructor: aTypedArrayConstructor,
	  exportProto: exportProto,
	  exportStatic: exportStatic,
	  isView: isView,
	  isTypedArray: isTypedArray,
	  TypedArray: TypedArray,
	  TypedArrayPrototype: TypedArrayPrototype
	};

	var redefineAll = function (target, src, options) {
	  for (var key in src) redefine(target, key, src[key], options);

	  return target;
	};

	var anInstance = function (it, Constructor, name) {
	  if (!(it instanceof Constructor)) {
	    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
	  }

	  return it;
	};

	// https://tc39.github.io/ecma262/#sec-toindex

	var toIndex = function (it) {
	  if (it === undefined) return 0;
	  var number = toInteger(it);
	  var length = toLength(number);
	  if (number !== length) throw RangeError('Wrong length or index');
	  return length;
	};

	var arrayBuffer = createCommonjsModule(function (module, exports) {

	  var NATIVE_ARRAY_BUFFER = arrayBufferViewCore.NATIVE_ARRAY_BUFFER;
	  var getOwnPropertyNames = objectGetOwnPropertyNames.f;
	  var defineProperty = objectDefineProperty.f;
	  var getInternalState = internalState.get;
	  var setInternalState = internalState.set;
	  var ARRAY_BUFFER = 'ArrayBuffer';
	  var DATA_VIEW = 'DataView';
	  var PROTOTYPE = 'prototype';
	  var WRONG_LENGTH = 'Wrong length';
	  var WRONG_INDEX = 'Wrong index';
	  var NativeArrayBuffer = global_1[ARRAY_BUFFER];
	  var $ArrayBuffer = NativeArrayBuffer;
	  var $DataView = global_1[DATA_VIEW];
	  var Math = global_1.Math;
	  var RangeError = global_1.RangeError; // eslint-disable-next-line no-shadow-restricted-names

	  var Infinity = 1 / 0;
	  var abs = Math.abs;
	  var pow = Math.pow;
	  var floor = Math.floor;
	  var log = Math.log;
	  var LN2 = Math.LN2; // IEEE754 conversions based on https://github.com/feross/ieee754

	  var packIEEE754 = function (number, mantissaLength, bytes) {
	    var buffer = new Array(bytes);
	    var exponentLength = bytes * 8 - mantissaLength - 1;
	    var eMax = (1 << exponentLength) - 1;
	    var eBias = eMax >> 1;
	    var rt = mantissaLength === 23 ? pow(2, -24) - pow(2, -77) : 0;
	    var sign = number < 0 || number === 0 && 1 / number < 0 ? 1 : 0;
	    var index = 0;
	    var exponent, mantissa, c;
	    number = abs(number); // eslint-disable-next-line no-self-compare

	    if (number != number || number === Infinity) {
	      // eslint-disable-next-line no-self-compare
	      mantissa = number != number ? 1 : 0;
	      exponent = eMax;
	    } else {
	      exponent = floor(log(number) / LN2);

	      if (number * (c = pow(2, -exponent)) < 1) {
	        exponent--;
	        c *= 2;
	      }

	      if (exponent + eBias >= 1) {
	        number += rt / c;
	      } else {
	        number += rt * pow(2, 1 - eBias);
	      }

	      if (number * c >= 2) {
	        exponent++;
	        c /= 2;
	      }

	      if (exponent + eBias >= eMax) {
	        mantissa = 0;
	        exponent = eMax;
	      } else if (exponent + eBias >= 1) {
	        mantissa = (number * c - 1) * pow(2, mantissaLength);
	        exponent = exponent + eBias;
	      } else {
	        mantissa = number * pow(2, eBias - 1) * pow(2, mantissaLength);
	        exponent = 0;
	      }
	    }

	    for (; mantissaLength >= 8; buffer[index++] = mantissa & 255, mantissa /= 256, mantissaLength -= 8);

	    exponent = exponent << mantissaLength | mantissa;
	    exponentLength += mantissaLength;

	    for (; exponentLength > 0; buffer[index++] = exponent & 255, exponent /= 256, exponentLength -= 8);

	    buffer[--index] |= sign * 128;
	    return buffer;
	  };

	  var unpackIEEE754 = function (buffer, mantissaLength) {
	    var bytes = buffer.length;
	    var exponentLength = bytes * 8 - mantissaLength - 1;
	    var eMax = (1 << exponentLength) - 1;
	    var eBias = eMax >> 1;
	    var nBits = exponentLength - 7;
	    var index = bytes - 1;
	    var sign = buffer[index--];
	    var exponent = sign & 127;
	    var mantissa;
	    sign >>= 7;

	    for (; nBits > 0; exponent = exponent * 256 + buffer[index], index--, nBits -= 8);

	    mantissa = exponent & (1 << -nBits) - 1;
	    exponent >>= -nBits;
	    nBits += mantissaLength;

	    for (; nBits > 0; mantissa = mantissa * 256 + buffer[index], index--, nBits -= 8);

	    if (exponent === 0) {
	      exponent = 1 - eBias;
	    } else if (exponent === eMax) {
	      return mantissa ? NaN : sign ? -Infinity : Infinity;
	    } else {
	      mantissa = mantissa + pow(2, mantissaLength);
	      exponent = exponent - eBias;
	    }

	    return (sign ? -1 : 1) * mantissa * pow(2, exponent - mantissaLength);
	  };

	  var unpackInt32 = function (buffer) {
	    return buffer[3] << 24 | buffer[2] << 16 | buffer[1] << 8 | buffer[0];
	  };

	  var packInt8 = function (number) {
	    return [number & 0xFF];
	  };

	  var packInt16 = function (number) {
	    return [number & 0xFF, number >> 8 & 0xFF];
	  };

	  var packInt32 = function (number) {
	    return [number & 0xFF, number >> 8 & 0xFF, number >> 16 & 0xFF, number >> 24 & 0xFF];
	  };

	  var packFloat32 = function (number) {
	    return packIEEE754(number, 23, 4);
	  };

	  var packFloat64 = function (number) {
	    return packIEEE754(number, 52, 8);
	  };

	  var addGetter = function (Constructor, key) {
	    defineProperty(Constructor[PROTOTYPE], key, {
	      get: function () {
	        return getInternalState(this)[key];
	      }
	    });
	  };

	  var get = function (view, count, index, isLittleEndian) {
	    var numIndex = +index;
	    var intIndex = toIndex(numIndex);
	    var store = getInternalState(view);
	    if (intIndex + count > store.byteLength) throw RangeError(WRONG_INDEX);
	    var bytes = getInternalState(store.buffer).bytes;
	    var start = intIndex + store.byteOffset;
	    var pack = bytes.slice(start, start + count);
	    return isLittleEndian ? pack : pack.reverse();
	  };

	  var set = function (view, count, index, conversion, value, isLittleEndian) {
	    var numIndex = +index;
	    var intIndex = toIndex(numIndex);
	    var store = getInternalState(view);
	    if (intIndex + count > store.byteLength) throw RangeError(WRONG_INDEX);
	    var bytes = getInternalState(store.buffer).bytes;
	    var start = intIndex + store.byteOffset;
	    var pack = conversion(+value);

	    for (var i = 0; i < count; i++) bytes[start + i] = pack[isLittleEndian ? i : count - i - 1];
	  };

	  if (!NATIVE_ARRAY_BUFFER) {
	    $ArrayBuffer = function ArrayBuffer(length) {
	      anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
	      var byteLength = toIndex(length);
	      setInternalState(this, {
	        bytes: arrayFill.call(new Array(byteLength), 0),
	        byteLength: byteLength
	      });
	      if (!descriptors) this.byteLength = byteLength;
	    };

	    $DataView = function DataView(buffer, byteOffset, byteLength) {
	      anInstance(this, $DataView, DATA_VIEW);
	      anInstance(buffer, $ArrayBuffer, DATA_VIEW);
	      var bufferLength = getInternalState(buffer).byteLength;
	      var offset = toInteger(byteOffset);
	      if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset');
	      byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
	      if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
	      setInternalState(this, {
	        buffer: buffer,
	        byteLength: byteLength,
	        byteOffset: offset
	      });

	      if (!descriptors) {
	        this.buffer = buffer;
	        this.byteLength = byteLength;
	        this.byteOffset = offset;
	      }
	    };

	    if (descriptors) {
	      addGetter($ArrayBuffer, 'byteLength');
	      addGetter($DataView, 'buffer');
	      addGetter($DataView, 'byteLength');
	      addGetter($DataView, 'byteOffset');
	    }

	    redefineAll($DataView[PROTOTYPE], {
	      getInt8: function getInt8(byteOffset) {
	        return get(this, 1, byteOffset)[0] << 24 >> 24;
	      },
	      getUint8: function getUint8(byteOffset) {
	        return get(this, 1, byteOffset)[0];
	      },
	      getInt16: function getInt16(byteOffset
	      /* , littleEndian */
	      ) {
	        var bytes = get(this, 2, byteOffset, arguments[1]);
	        return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
	      },
	      getUint16: function getUint16(byteOffset
	      /* , littleEndian */
	      ) {
	        var bytes = get(this, 2, byteOffset, arguments[1]);
	        return bytes[1] << 8 | bytes[0];
	      },
	      getInt32: function getInt32(byteOffset
	      /* , littleEndian */
	      ) {
	        return unpackInt32(get(this, 4, byteOffset, arguments[1]));
	      },
	      getUint32: function getUint32(byteOffset
	      /* , littleEndian */
	      ) {
	        return unpackInt32(get(this, 4, byteOffset, arguments[1])) >>> 0;
	      },
	      getFloat32: function getFloat32(byteOffset
	      /* , littleEndian */
	      ) {
	        return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23);
	      },
	      getFloat64: function getFloat64(byteOffset
	      /* , littleEndian */
	      ) {
	        return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52);
	      },
	      setInt8: function setInt8(byteOffset, value) {
	        set(this, 1, byteOffset, packInt8, value);
	      },
	      setUint8: function setUint8(byteOffset, value) {
	        set(this, 1, byteOffset, packInt8, value);
	      },
	      setInt16: function setInt16(byteOffset, value
	      /* , littleEndian */
	      ) {
	        set(this, 2, byteOffset, packInt16, value, arguments[2]);
	      },
	      setUint16: function setUint16(byteOffset, value
	      /* , littleEndian */
	      ) {
	        set(this, 2, byteOffset, packInt16, value, arguments[2]);
	      },
	      setInt32: function setInt32(byteOffset, value
	      /* , littleEndian */
	      ) {
	        set(this, 4, byteOffset, packInt32, value, arguments[2]);
	      },
	      setUint32: function setUint32(byteOffset, value
	      /* , littleEndian */
	      ) {
	        set(this, 4, byteOffset, packInt32, value, arguments[2]);
	      },
	      setFloat32: function setFloat32(byteOffset, value
	      /* , littleEndian */
	      ) {
	        set(this, 4, byteOffset, packFloat32, value, arguments[2]);
	      },
	      setFloat64: function setFloat64(byteOffset, value
	      /* , littleEndian */
	      ) {
	        set(this, 8, byteOffset, packFloat64, value, arguments[2]);
	      }
	    });
	  } else {
	    if (!fails(function () {
	      NativeArrayBuffer(1);
	    }) || !fails(function () {
	      new NativeArrayBuffer(-1); // eslint-disable-line no-new
	    }) || fails(function () {
	      new NativeArrayBuffer(); // eslint-disable-line no-new

	      new NativeArrayBuffer(1.5); // eslint-disable-line no-new

	      new NativeArrayBuffer(NaN); // eslint-disable-line no-new

	      return NativeArrayBuffer.name != ARRAY_BUFFER;
	    })) {
	      $ArrayBuffer = function ArrayBuffer(length) {
	        anInstance(this, $ArrayBuffer);
	        return new NativeArrayBuffer(toIndex(length));
	      };

	      var ArrayBufferPrototype = $ArrayBuffer[PROTOTYPE] = NativeArrayBuffer[PROTOTYPE];

	      for (var keys = getOwnPropertyNames(NativeArrayBuffer), j = 0, key; keys.length > j;) {
	        if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, NativeArrayBuffer[key]);
	      }

	      ArrayBufferPrototype.constructor = $ArrayBuffer;
	    } // iOS Safari 7.x bug


	    var testView = new $DataView(new $ArrayBuffer(2));
	    var nativeSetInt8 = $DataView[PROTOTYPE].setInt8;
	    testView.setInt8(0, 2147483648);
	    testView.setInt8(1, 2147483649);
	    if (testView.getInt8(0) || !testView.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
	      setInt8: function setInt8(byteOffset, value) {
	        nativeSetInt8.call(this, byteOffset, value << 24 >> 24);
	      },
	      setUint8: function setUint8(byteOffset, value) {
	        nativeSetInt8.call(this, byteOffset, value << 24 >> 24);
	      }
	    }, {
	      unsafe: true
	    });
	  }

	  setToStringTag($ArrayBuffer, ARRAY_BUFFER);
	  setToStringTag($DataView, DATA_VIEW);
	  exports[ARRAY_BUFFER] = $ArrayBuffer;
	  exports[DATA_VIEW] = $DataView;
	});

	var SPECIES$2 = wellKnownSymbol('species'); // `SpeciesConstructor` abstract operation
	// https://tc39.github.io/ecma262/#sec-speciesconstructor

	var speciesConstructor = function (O, defaultConstructor) {
	  var C = anObject(O).constructor;
	  var S;
	  return C === undefined || (S = anObject(C)[SPECIES$2]) == undefined ? defaultConstructor : aFunction(S);
	};

	var ArrayBuffer = arrayBuffer.ArrayBuffer;
	var DataView$1 = arrayBuffer.DataView;
	var nativeArrayBufferSlice = ArrayBuffer.prototype.slice;
	var INCORRECT_SLICE = fails(function () {
	  return !new ArrayBuffer(2).slice(1, undefined).byteLength;
	}); // `ArrayBuffer.prototype.slice` method
	// https://tc39.github.io/ecma262/#sec-arraybuffer.prototype.slice

	_export({
	  target: 'ArrayBuffer',
	  proto: true,
	  unsafe: true,
	  forced: INCORRECT_SLICE
	}, {
	  slice: function slice(start, end) {
	    if (nativeArrayBufferSlice !== undefined && end === undefined) {
	      return nativeArrayBufferSlice.call(anObject(this), start); // FF fix
	    }

	    var length = anObject(this).byteLength;
	    var first = toAbsoluteIndex(start, length);
	    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
	    var result = new (speciesConstructor(this, ArrayBuffer))(toLength(fin - first));
	    var viewSource = new DataView$1(this);
	    var viewTarget = new DataView$1(result);
	    var index = 0;

	    while (first < fin) {
	      viewTarget.setUint8(index++, viewSource.getUint8(first++));
	    }

	    return result;
	  }
	});

	var nativeAssign = Object.assign; // 19.1.2.1 Object.assign(target, source, ...)
	// should work with symbols and should have deterministic property order (V8 bug)

	var objectAssign = !nativeAssign || fails(function () {
	  var A = {};
	  var B = {}; // eslint-disable-next-line no-undef

	  var symbol = Symbol();
	  var alphabet = 'abcdefghijklmnopqrst';
	  A[symbol] = 7;
	  alphabet.split('').forEach(function (chr) {
	    B[chr] = chr;
	  });
	  return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
	}) ? function assign(target, source) {
	  // eslint-disable-line no-unused-vars
	  var T = toObject(target);
	  var argumentsLength = arguments.length;
	  var index = 1;
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
	  var propertyIsEnumerable = objectPropertyIsEnumerable.f;

	  while (argumentsLength > index) {
	    var S = indexedObject(arguments[index++]);
	    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;

	    while (length > j) {
	      key = keys[j++];
	      if (!descriptors || propertyIsEnumerable.call(S, key)) T[key] = S[key];
	    }
	  }

	  return T;
	} : nativeAssign;

	// https://tc39.github.io/ecma262/#sec-object.assign

	_export({
	  target: 'Object',
	  stat: true,
	  forced: Object.assign !== objectAssign
	}, {
	  assign: objectAssign
	});

	var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');
	var test = {};
	test[TO_STRING_TAG$3] = 'z'; // `Object.prototype.toString` method implementation
	// https://tc39.github.io/ecma262/#sec-object.prototype.tostring

	var objectToString = String(test) !== '[object z]' ? function toString() {
	  return '[object ' + classof(this) + ']';
	} : test.toString;

	var ObjectPrototype$2 = Object.prototype; // `Object.prototype.toString` method
	// https://tc39.github.io/ecma262/#sec-object.prototype.tostring

	if (objectToString !== ObjectPrototype$2.toString) {
	  redefine(ObjectPrototype$2, 'toString', objectToString, {
	    unsafe: true
	  });
	}

	var ITERATOR$2 = wellKnownSymbol('iterator');
	var SAFE_CLOSING = false;

	try {
	  var called = 0;
	  var iteratorWithReturn = {
	    next: function () {
	      return {
	        done: !!called++
	      };
	    },
	    'return': function () {
	      SAFE_CLOSING = true;
	    }
	  };

	  iteratorWithReturn[ITERATOR$2] = function () {
	    return this;
	  }; // eslint-disable-next-line no-throw-literal
	} catch (error) {
	  /* empty */
	}

	var checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
	  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
	  var ITERATION_SUPPORT = false;

	  try {
	    var object = {};

	    object[ITERATOR$2] = function () {
	      return {
	        next: function () {
	          return {
	            done: ITERATION_SUPPORT = true
	          };
	        }
	      };
	    };

	    exec(object);
	  } catch (error) {
	    /* empty */
	  }

	  return ITERATION_SUPPORT;
	};

	/* eslint-disable no-new */

	var NATIVE_ARRAY_BUFFER_VIEWS$1 = arrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;
	var ArrayBuffer$1 = global_1.ArrayBuffer;
	var Int8Array$2 = global_1.Int8Array;
	var typedArraysConstructorsRequiresWrappers = !NATIVE_ARRAY_BUFFER_VIEWS$1 || !fails(function () {
	  Int8Array$2(1);
	}) || !fails(function () {
	  new Int8Array$2(-1);
	}) || !checkCorrectnessOfIteration(function (iterable) {
	  new Int8Array$2();
	  new Int8Array$2(null);
	  new Int8Array$2(1.5);
	  new Int8Array$2(iterable);
	}, true) || fails(function () {
	  // Safari 11 bug
	  return new Int8Array$2(new ArrayBuffer$1(2), 1, undefined).length !== 1;
	});

	var toOffset = function (it, BYTES) {
	  var offset = toInteger(it);
	  if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset');
	  return offset;
	};

	var ITERATOR$3 = wellKnownSymbol('iterator');

	var getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR$3] || it['@@iterator'] || iterators[classof(it)];
	};

	var ITERATOR$4 = wellKnownSymbol('iterator');
	var ArrayPrototype$1 = Array.prototype; // check on default Array iterator

	var isArrayIteratorMethod = function (it) {
	  return it !== undefined && (iterators.Array === it || ArrayPrototype$1[ITERATOR$4] === it);
	};

	var bindContext = function (fn, that, length) {
	  aFunction(fn);
	  if (that === undefined) return fn;

	  switch (length) {
	    case 0:
	      return function () {
	        return fn.call(that);
	      };

	    case 1:
	      return function (a) {
	        return fn.call(that, a);
	      };

	    case 2:
	      return function (a, b) {
	        return fn.call(that, a, b);
	      };

	    case 3:
	      return function (a, b, c) {
	        return fn.call(that, a, b, c);
	      };
	  }

	  return function ()
	  /* ...args */
	  {
	    return fn.apply(that, arguments);
	  };
	};

	var aTypedArrayConstructor$1 = arrayBufferViewCore.aTypedArrayConstructor;

	var typedArrayFrom = function from(source
	/* , mapfn, thisArg */
	) {
	  var O = toObject(source);
	  var argumentsLength = arguments.length;
	  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
	  var mapping = mapfn !== undefined;
	  var iteratorMethod = getIteratorMethod(O);
	  var i, length, result, step, iterator;

	  if (iteratorMethod != undefined && !isArrayIteratorMethod(iteratorMethod)) {
	    iterator = iteratorMethod.call(O);
	    O = [];

	    while (!(step = iterator.next()).done) {
	      O.push(step.value);
	    }
	  }

	  if (mapping && argumentsLength > 2) {
	    mapfn = bindContext(mapfn, arguments[2], 2);
	  }

	  length = toLength(O.length);
	  result = new (aTypedArrayConstructor$1(this))(length);

	  for (i = 0; length > i; i++) {
	    result[i] = mapping ? mapfn(O[i], i) : O[i];
	  }

	  return result;
	};

	var SPECIES$3 = wellKnownSymbol('species'); // `ArraySpeciesCreate` abstract operation
	// https://tc39.github.io/ecma262/#sec-arrayspeciescreate

	var arraySpeciesCreate = function (originalArray, length) {
	  var C;

	  if (isArray(originalArray)) {
	    C = originalArray.constructor; // cross-realm fallback

	    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;else if (isObject(C)) {
	      C = C[SPECIES$3];
	      if (C === null) C = undefined;
	    }
	  }

	  return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
	};

	// 0 -> Array#forEach
	// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
	// 1 -> Array#map
	// https://tc39.github.io/ecma262/#sec-array.prototype.map
	// 2 -> Array#filter
	// https://tc39.github.io/ecma262/#sec-array.prototype.filter
	// 3 -> Array#some
	// https://tc39.github.io/ecma262/#sec-array.prototype.some
	// 4 -> Array#every
	// https://tc39.github.io/ecma262/#sec-array.prototype.every
	// 5 -> Array#find
	// https://tc39.github.io/ecma262/#sec-array.prototype.find
	// 6 -> Array#findIndex
	// https://tc39.github.io/ecma262/#sec-array.prototype.findIndex

	var arrayMethods = function (TYPE, specificCreate) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  var create = specificCreate || arraySpeciesCreate;
	  return function ($this, callbackfn, that) {
	    var O = toObject($this);
	    var self = indexedObject(O);
	    var boundFunction = bindContext(callbackfn, that, 3);
	    var length = toLength(self.length);
	    var index = 0;
	    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
	    var value, result;

	    for (; length > index; index++) if (NO_HOLES || index in self) {
	      value = self[index];
	      result = boundFunction(value, index, O);

	      if (TYPE) {
	        if (IS_MAP) target[index] = result; // map
	        else if (result) switch (TYPE) {
	            case 3:
	              return true;
	            // some

	            case 5:
	              return value;
	            // find

	            case 6:
	              return index;
	            // findIndex

	            case 2:
	              target.push(value);
	            // filter
	          } else if (IS_EVERY) return false; // every
	      }
	    }

	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
	  };
	};

	var path = global_1;

	var aFunction$1 = function (variable) {
	  return typeof variable == 'function' ? variable : undefined;
	};

	var getBuiltIn = function (namespace, method) {
	  return arguments.length < 2 ? aFunction$1(path[namespace]) || aFunction$1(global_1[namespace]) : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
	};

	var SPECIES$4 = wellKnownSymbol('species');

	var setSpecies = function (CONSTRUCTOR_NAME) {
	  var C = getBuiltIn(CONSTRUCTOR_NAME);
	  var defineProperty = objectDefineProperty.f;
	  if (descriptors && C && !C[SPECIES$4]) defineProperty(C, SPECIES$4, {
	    configurable: true,
	    get: function () {
	      return this;
	    }
	  });
	};

	var typedArrayConstructor = createCommonjsModule(function (module) {

	  var getOwnPropertyNames = objectGetOwnPropertyNames.f;
	  var getInternalState = internalState.get;
	  var setInternalState = internalState.set;
	  var nativeDefineProperty = objectDefineProperty.f;
	  var nativeGetOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	  var forEach = arrayMethods(0);
	  var RangeError = global_1.RangeError;
	  var ArrayBuffer = arrayBuffer.ArrayBuffer;
	  var DataView = arrayBuffer.DataView;
	  var NATIVE_ARRAY_BUFFER_VIEWS = arrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;
	  var TYPED_ARRAY_TAG = arrayBufferViewCore.TYPED_ARRAY_TAG;
	  var TypedArray = arrayBufferViewCore.TypedArray;
	  var TypedArrayPrototype = arrayBufferViewCore.TypedArrayPrototype;
	  var aTypedArrayConstructor = arrayBufferViewCore.aTypedArrayConstructor;
	  var isTypedArray = arrayBufferViewCore.isTypedArray;
	  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
	  var WRONG_LENGTH = 'Wrong length';

	  var fromList = function (C, list) {
	    var index = 0;
	    var length = list.length;
	    var result = new (aTypedArrayConstructor(C))(length);

	    while (length > index) result[index] = list[index++];

	    return result;
	  };

	  var addGetter = function (it, key) {
	    nativeDefineProperty(it, key, {
	      get: function () {
	        return getInternalState(this)[key];
	      }
	    });
	  };

	  var isArrayBuffer = function (it) {
	    var klass;
	    return it instanceof ArrayBuffer || (klass = classof(it)) == 'ArrayBuffer' || klass == 'SharedArrayBuffer';
	  };

	  var isTypedArrayIndex = function (target, key) {
	    return isTypedArray(target) && typeof key != 'symbol' && key in target && String(+key) == String(key);
	  };

	  var wrappedGetOwnPropertyDescriptor = function getOwnPropertyDescriptor(target, key) {
	    return isTypedArrayIndex(target, key = toPrimitive(key, true)) ? createPropertyDescriptor(2, target[key]) : nativeGetOwnPropertyDescriptor(target, key);
	  };

	  var wrappedDefineProperty = function defineProperty(target, key, descriptor) {
	    if (isTypedArrayIndex(target, key = toPrimitive(key, true)) && isObject(descriptor) && has(descriptor, 'value') && !has(descriptor, 'get') && !has(descriptor, 'set') // TODO: add validation descriptor w/o calling accessors
	    && !descriptor.configurable && (!has(descriptor, 'writable') || descriptor.writable) && (!has(descriptor, 'enumerable') || descriptor.enumerable)) {
	      target[key] = descriptor.value;
	      return target;
	    }

	    return nativeDefineProperty(target, key, descriptor);
	  };

	  if (descriptors) {
	    if (!NATIVE_ARRAY_BUFFER_VIEWS) {
	      objectGetOwnPropertyDescriptor.f = wrappedGetOwnPropertyDescriptor;
	      objectDefineProperty.f = wrappedDefineProperty;
	      addGetter(TypedArrayPrototype, 'buffer');
	      addGetter(TypedArrayPrototype, 'byteOffset');
	      addGetter(TypedArrayPrototype, 'byteLength');
	      addGetter(TypedArrayPrototype, 'length');
	    }

	    _export({
	      target: 'Object',
	      stat: true,
	      forced: !NATIVE_ARRAY_BUFFER_VIEWS
	    }, {
	      getOwnPropertyDescriptor: wrappedGetOwnPropertyDescriptor,
	      defineProperty: wrappedDefineProperty
	    }); // eslint-disable-next-line max-statements

	    module.exports = function (TYPE, BYTES, wrapper, CLAMPED) {
	      var CONSTRUCTOR_NAME = TYPE + (CLAMPED ? 'Clamped' : '') + 'Array';
	      var GETTER = 'get' + TYPE;
	      var SETTER = 'set' + TYPE;
	      var NativeTypedArrayConstructor = global_1[CONSTRUCTOR_NAME];
	      var TypedArrayConstructor = NativeTypedArrayConstructor;
	      var TypedArrayConstructorPrototype = TypedArrayConstructor && TypedArrayConstructor.prototype;
	      var exported = {};

	      var getter = function (that, index) {
	        var data = getInternalState(that);
	        return data.view[GETTER](index * BYTES + data.byteOffset, true);
	      };

	      var setter = function (that, index, value) {
	        var data = getInternalState(that);
	        if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xFF ? 0xFF : value & 0xFF;
	        data.view[SETTER](index * BYTES + data.byteOffset, value, true);
	      };

	      var addElement = function (that, index) {
	        nativeDefineProperty(that, index, {
	          get: function () {
	            return getter(this, index);
	          },
	          set: function (value) {
	            return setter(this, index, value);
	          },
	          enumerable: true
	        });
	      };

	      if (!NATIVE_ARRAY_BUFFER_VIEWS) {
	        TypedArrayConstructor = wrapper(function (that, data, offset, $length) {
	          anInstance(that, TypedArrayConstructor, CONSTRUCTOR_NAME);
	          var index = 0;
	          var byteOffset = 0;
	          var buffer, byteLength, length;

	          if (!isObject(data)) {
	            length = toIndex(data);
	            byteLength = length * BYTES;
	            buffer = new ArrayBuffer(byteLength);
	          } else if (isArrayBuffer(data)) {
	            buffer = data;
	            byteOffset = toOffset(offset, BYTES);
	            var $len = data.byteLength;

	            if ($length === undefined) {
	              if ($len % BYTES) throw RangeError(WRONG_LENGTH);
	              byteLength = $len - byteOffset;
	              if (byteLength < 0) throw RangeError(WRONG_LENGTH);
	            } else {
	              byteLength = toLength($length) * BYTES;
	              if (byteLength + byteOffset > $len) throw RangeError(WRONG_LENGTH);
	            }

	            length = byteLength / BYTES;
	          } else if (isTypedArray(data)) {
	            return fromList(TypedArrayConstructor, data);
	          } else {
	            return typedArrayFrom.call(TypedArrayConstructor, data);
	          }

	          setInternalState(that, {
	            buffer: buffer,
	            byteOffset: byteOffset,
	            byteLength: byteLength,
	            length: length,
	            view: new DataView(buffer)
	          });

	          while (index < length) addElement(that, index++);
	        });
	        if (objectSetPrototypeOf) objectSetPrototypeOf(TypedArrayConstructor, TypedArray);
	        TypedArrayConstructorPrototype = TypedArrayConstructor.prototype = objectCreate(TypedArrayPrototype);
	      } else if (typedArraysConstructorsRequiresWrappers) {
	        TypedArrayConstructor = wrapper(function (that, data, typedArrayOffset, $length) {
	          anInstance(that, TypedArrayConstructor, CONSTRUCTOR_NAME);
	          if (!isObject(data)) return new NativeTypedArrayConstructor(toIndex(data));
	          if (isArrayBuffer(data)) return $length !== undefined ? new NativeTypedArrayConstructor(data, toOffset(typedArrayOffset, BYTES), $length) : typedArrayOffset !== undefined ? new NativeTypedArrayConstructor(data, toOffset(typedArrayOffset, BYTES)) : new NativeTypedArrayConstructor(data);
	          if (isTypedArray(data)) return fromList(TypedArrayConstructor, data);
	          return typedArrayFrom.call(TypedArrayConstructor, data);
	        });
	        if (objectSetPrototypeOf) objectSetPrototypeOf(TypedArrayConstructor, TypedArray);
	        forEach(getOwnPropertyNames(NativeTypedArrayConstructor), function (key) {
	          if (!(key in TypedArrayConstructor)) hide(TypedArrayConstructor, key, NativeTypedArrayConstructor[key]);
	        });
	        TypedArrayConstructor.prototype = TypedArrayConstructorPrototype;
	      }

	      if (TypedArrayConstructorPrototype.constructor !== TypedArrayConstructor) {
	        hide(TypedArrayConstructorPrototype, 'constructor', TypedArrayConstructor);
	      }

	      if (TYPED_ARRAY_TAG) hide(TypedArrayConstructorPrototype, TYPED_ARRAY_TAG, CONSTRUCTOR_NAME);
	      exported[CONSTRUCTOR_NAME] = TypedArrayConstructor;
	      _export({
	        global: true,
	        forced: TypedArrayConstructor != NativeTypedArrayConstructor,
	        sham: !NATIVE_ARRAY_BUFFER_VIEWS
	      }, exported);

	      if (!(BYTES_PER_ELEMENT in TypedArrayConstructor)) {
	        hide(TypedArrayConstructor, BYTES_PER_ELEMENT, BYTES);
	      }

	      if (!(BYTES_PER_ELEMENT in TypedArrayConstructorPrototype)) {
	        hide(TypedArrayConstructorPrototype, BYTES_PER_ELEMENT, BYTES);
	      }

	      setSpecies(CONSTRUCTOR_NAME);
	    };
	  } else module.exports = function () {
	    /* empty */
	  };
	});

	// https://tc39.github.io/ecma262/#sec-typedarray-objects

	typedArrayConstructor('Uint8', 1, function (init) {
	  return function Uint8Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	// https://tc39.github.io/ecma262/#sec-array.prototype.copywithin


	var arrayCopyWithin = [].copyWithin || function copyWithin(target
	/* = 0 */
	, start
	/* = 0, end = @length */
	) {
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
	    if (from in O) O[to] = O[from];else delete O[to];
	    to += inc;
	    from += inc;
	  }

	  return O;
	};

	var aTypedArray$1 = arrayBufferViewCore.aTypedArray; // `%TypedArray%.prototype.copyWithin` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.copywithin

	arrayBufferViewCore.exportProto('copyWithin', function copyWithin(target, start
	/* , end */
	) {
	  return arrayCopyWithin.call(aTypedArray$1(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
	});

	var arrayEvery = arrayMethods(4);
	var aTypedArray$2 = arrayBufferViewCore.aTypedArray; // `%TypedArray%.prototype.every` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.every

	arrayBufferViewCore.exportProto('every', function every(callbackfn
	/* , thisArg */
	) {
	  return arrayEvery(aTypedArray$2(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	});

	var aTypedArray$3 = arrayBufferViewCore.aTypedArray; // `%TypedArray%.prototype.fill` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.fill
	// eslint-disable-next-line no-unused-vars

	arrayBufferViewCore.exportProto('fill', function fill(value
	/* , start, end */
	) {
	  return arrayFill.apply(aTypedArray$3(this), arguments);
	});

	var arrayFilter = arrayMethods(2);
	var aTypedArray$4 = arrayBufferViewCore.aTypedArray;
	var aTypedArrayConstructor$2 = arrayBufferViewCore.aTypedArrayConstructor; // `%TypedArray%.prototype.filter` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.filter

	arrayBufferViewCore.exportProto('filter', function filter(callbackfn
	/* , thisArg */
	) {
	  var list = arrayFilter(aTypedArray$4(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  var C = speciesConstructor(this, this.constructor);
	  var index = 0;
	  var length = list.length;
	  var result = new (aTypedArrayConstructor$2(C))(length);

	  while (length > index) result[index] = list[index++];

	  return result;
	});

	var arrayFind = arrayMethods(5);
	var aTypedArray$5 = arrayBufferViewCore.aTypedArray; // `%TypedArray%.prototype.find` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.find

	arrayBufferViewCore.exportProto('find', function find(predicate
	/* , thisArg */
	) {
	  return arrayFind(aTypedArray$5(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	});

	var arrayFindIndex = arrayMethods(6);
	var aTypedArray$6 = arrayBufferViewCore.aTypedArray; // `%TypedArray%.prototype.findIndex` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.findindex

	arrayBufferViewCore.exportProto('findIndex', function findIndex(predicate
	/* , thisArg */
	) {
	  return arrayFindIndex(aTypedArray$6(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	});

	var arrayForEach = arrayMethods(0);
	var aTypedArray$7 = arrayBufferViewCore.aTypedArray; // `%TypedArray%.prototype.forEach` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.foreach

	arrayBufferViewCore.exportProto('forEach', function forEach(callbackfn
	/* , thisArg */
	) {
	  arrayForEach(aTypedArray$7(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	});

	var aTypedArray$8 = arrayBufferViewCore.aTypedArray;
	var arrayIncludes$1 = arrayIncludes(true); // `%TypedArray%.prototype.includes` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.includes

	arrayBufferViewCore.exportProto('includes', function includes(searchElement
	/* , fromIndex */
	) {
	  return arrayIncludes$1(aTypedArray$8(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	});

	var aTypedArray$9 = arrayBufferViewCore.aTypedArray;
	var arrayIndexOf$1 = arrayIncludes(false); // `%TypedArray%.prototype.indexOf` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.indexof

	arrayBufferViewCore.exportProto('indexOf', function indexOf(searchElement
	/* , fromIndex */
	) {
	  return arrayIndexOf$1(aTypedArray$9(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	});

	var ITERATOR$5 = wellKnownSymbol('iterator');
	var Uint8Array$1 = global_1.Uint8Array;
	var arrayValues = es_array_iterator.values;
	var arrayKeys = es_array_iterator.keys;
	var arrayEntries = es_array_iterator.entries;
	var aTypedArray$a = arrayBufferViewCore.aTypedArray;
	var exportProto$1 = arrayBufferViewCore.exportProto;
	var nativeTypedArrayIterator = Uint8Array$1 && Uint8Array$1.prototype[ITERATOR$5];
	var CORRECT_ITER_NAME = !!nativeTypedArrayIterator && (nativeTypedArrayIterator.name == 'values' || nativeTypedArrayIterator.name == undefined);

	var typedArrayValues = function values() {
	  return arrayValues.call(aTypedArray$a(this));
	}; // `%TypedArray%.prototype.entries` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.entries


	exportProto$1('entries', function entries() {
	  return arrayEntries.call(aTypedArray$a(this));
	}); // `%TypedArray%.prototype.keys` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.keys

	exportProto$1('keys', function keys() {
	  return arrayKeys.call(aTypedArray$a(this));
	}); // `%TypedArray%.prototype.values` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.values

	exportProto$1('values', typedArrayValues, !CORRECT_ITER_NAME); // `%TypedArray%.prototype[@@iterator]` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype-@@iterator

	exportProto$1(ITERATOR$5, typedArrayValues, !CORRECT_ITER_NAME);

	var aTypedArray$b = arrayBufferViewCore.aTypedArray;
	var arrayJoin = [].join; // `%TypedArray%.prototype.join` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.join
	// eslint-disable-next-line no-unused-vars

	arrayBufferViewCore.exportProto('join', function join(separator) {
	  return arrayJoin.apply(aTypedArray$b(this), arguments);
	});

	var nativeLastIndexOf = [].lastIndexOf;
	var NEGATIVE_ZERO = !!nativeLastIndexOf && 1 / [1].lastIndexOf(1, -0) < 0;
	var SLOPPY_METHOD$1 = sloppyArrayMethod('lastIndexOf'); // `Array.prototype.lastIndexOf` method implementation
	// https://tc39.github.io/ecma262/#sec-array.prototype.lastindexof

	var arrayLastIndexOf = NEGATIVE_ZERO || SLOPPY_METHOD$1 ? function lastIndexOf(searchElement
	/* , fromIndex = @[*-1] */
	) {
	  // convert -0 to +0
	  if (NEGATIVE_ZERO) return nativeLastIndexOf.apply(this, arguments) || 0;
	  var O = toIndexedObject(this);
	  var length = toLength(O.length);
	  var index = length - 1;
	  if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
	  if (index < 0) index = length + index;

	  for (; index >= 0; index--) if (index in O) if (O[index] === searchElement) return index || 0;

	  return -1;
	} : nativeLastIndexOf;

	var aTypedArray$c = arrayBufferViewCore.aTypedArray; // `%TypedArray%.prototype.lastIndexOf` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.lastindexof
	// eslint-disable-next-line no-unused-vars

	arrayBufferViewCore.exportProto('lastIndexOf', function lastIndexOf(searchElement
	/* , fromIndex */
	) {
	  return arrayLastIndexOf.apply(aTypedArray$c(this), arguments);
	});

	var aTypedArray$d = arrayBufferViewCore.aTypedArray;
	var aTypedArrayConstructor$3 = arrayBufferViewCore.aTypedArrayConstructor;
	var internalTypedArrayMap = arrayMethods(1, function (O, length) {
	  return new (aTypedArrayConstructor$3(speciesConstructor(O, O.constructor)))(length);
	}); // `%TypedArray%.prototype.map` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.map

	arrayBufferViewCore.exportProto('map', function map(mapfn
	/* , thisArg */
	) {
	  return internalTypedArrayMap(aTypedArray$d(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
	});

	var aTypedArray$e = arrayBufferViewCore.aTypedArray; // `%TypedArray%.prototype.reduce` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.reduce

	arrayBufferViewCore.exportProto('reduce', function reduce(callbackfn
	/* , initialValue */
	) {
	  return arrayReduce(aTypedArray$e(this), callbackfn, arguments.length, arguments[1], false);
	});

	var aTypedArray$f = arrayBufferViewCore.aTypedArray; // `%TypedArray%.prototype.reduceRicht` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.reduceright

	arrayBufferViewCore.exportProto('reduceRight', function reduceRight(callbackfn
	/* , initialValue */
	) {
	  return arrayReduce(aTypedArray$f(this), callbackfn, arguments.length, arguments[1], true);
	});

	var aTypedArray$g = arrayBufferViewCore.aTypedArray; // `%TypedArray%.prototype.reverse` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.reverse

	arrayBufferViewCore.exportProto('reverse', function reverse() {
	  var that = this;
	  var length = aTypedArray$g(that).length;
	  var middle = Math.floor(length / 2);
	  var index = 0;
	  var value;

	  while (index < middle) {
	    value = that[index];
	    that[index++] = that[--length];
	    that[length] = value;
	  }

	  return that;
	});

	var aTypedArray$h = arrayBufferViewCore.aTypedArray;
	var FORCED = fails(function () {
	  // eslint-disable-next-line no-undef
	  new Int8Array(1).set({});
	}); // `%TypedArray%.prototype.set` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.set

	arrayBufferViewCore.exportProto('set', function set(arrayLike
	/* , offset */
	) {
	  aTypedArray$h(this);
	  var offset = toOffset(arguments[1], 1);
	  var length = this.length;
	  var src = toObject(arrayLike);
	  var len = toLength(src.length);
	  var index = 0;
	  if (len + offset > length) throw RangeError('Wrong length');

	  while (index < len) this[offset + index] = src[index++];
	}, FORCED);

	var aTypedArray$i = arrayBufferViewCore.aTypedArray;
	var aTypedArrayConstructor$4 = arrayBufferViewCore.aTypedArrayConstructor;
	var arraySlice = [].slice;
	var FORCED$1 = fails(function () {
	  // eslint-disable-next-line no-undef
	  new Int8Array(1).slice();
	}); // `%TypedArray%.prototype.slice` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.slice

	arrayBufferViewCore.exportProto('slice', function slice(start, end) {
	  var list = arraySlice.call(aTypedArray$i(this), start, end);
	  var C = speciesConstructor(this, this.constructor);
	  var index = 0;
	  var length = list.length;
	  var result = new (aTypedArrayConstructor$4(C))(length);

	  while (length > index) result[index] = list[index++];

	  return result;
	}, FORCED$1);

	var arraySome = arrayMethods(3);
	var aTypedArray$j = arrayBufferViewCore.aTypedArray; // `%TypedArray%.prototype.some` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.some

	arrayBufferViewCore.exportProto('some', function some(callbackfn
	/* , thisArg */
	) {
	  return arraySome(aTypedArray$j(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	});

	var aTypedArray$k = arrayBufferViewCore.aTypedArray;
	var arraySort = [].sort; // `%TypedArray%.prototype.sort` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.sort

	arrayBufferViewCore.exportProto('sort', function sort(comparefn) {
	  return arraySort.call(aTypedArray$k(this), comparefn);
	});

	var aTypedArray$l = arrayBufferViewCore.aTypedArray; // `%TypedArray%.prototype.subarray` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.subarray

	arrayBufferViewCore.exportProto('subarray', function subarray(begin, end) {
	  var O = aTypedArray$l(this);
	  var length = O.length;
	  var beginIndex = toAbsoluteIndex(begin, length);
	  return new (speciesConstructor(O, O.constructor))(O.buffer, O.byteOffset + beginIndex * O.BYTES_PER_ELEMENT, toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - beginIndex));
	});

	var Int8Array$3 = global_1.Int8Array;
	var aTypedArray$m = arrayBufferViewCore.aTypedArray;
	var arrayToLocaleString = [].toLocaleString;
	var arraySlice$1 = [].slice; // iOS Safari 6.x fails here

	var TO_LOCALE_BUG = !!Int8Array$3 && fails(function () {
	  arrayToLocaleString.call(new Int8Array$3(1));
	});
	var FORCED$2 = fails(function () {
	  return [1, 2].toLocaleString() != new Int8Array$3([1, 2]).toLocaleString();
	}) || !fails(function () {
	  Int8Array$3.prototype.toLocaleString.call([1, 2]);
	}); // `%TypedArray%.prototype.toLocaleString` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.tolocalestring

	arrayBufferViewCore.exportProto('toLocaleString', function toLocaleString() {
	  return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice$1.call(aTypedArray$m(this)) : aTypedArray$m(this), arguments);
	}, FORCED$2);

	var Uint8Array$2 = global_1.Uint8Array;
	var Uint8ArrayPrototype = Uint8Array$2 && Uint8Array$2.prototype;
	var arrayToString = [].toString;
	var arrayJoin$1 = [].join;

	if (fails(function () {
	  arrayToString.call({});
	})) {
	  arrayToString = function toString() {
	    return arrayJoin$1.call(this);
	  };
	} // `%TypedArray%.prototype.toString` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.tostring


	arrayBufferViewCore.exportProto('toString', arrayToString, (Uint8ArrayPrototype || {}).toString != arrayToString);

	function _typeof(obj) {
	  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
	    _typeof = function (obj) {
	      return typeof obj;
	    };
	  } else {
	    _typeof = function (obj) {
	      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	    };
	  }

	  return _typeof(obj);
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}

	/**
	 * CanvasCirclularAudio 音频可视化
	 */
	var CanvasCirclularAudio =
	/*#__PURE__*/
	function () {
	  // 构造函数
	  function CanvasCirclularAudio(options) {
	    _classCallCheck(this, CanvasCirclularAudio);

	    var DEFAULT = {
	      audioNode: null,
	      canvasNode: null,
	      partNumber: 6,
	      partEvenReverse: true,
	      canvasWidth: 400,
	      canvasHeight: 200,
	      picture: null,
	      rotatable: false,
	      rotateStep: 0.2,
	      lineWidth: 2,
	      lineCap: 'round',
	      fillStyle: '#e91e63',
	      strokeStyle: '#e91e63',
	      backgroundColor: null
	    };
	    this.center = {
	      x: 0,
	      y: 0
	    };
	    this.audioData = {
	      source: {},
	      analyser: {},
	      fftSize: 1024,
	      frequencyData: []
	    };
	    this.playing = false;
	    this.rotateAngle = 0;
	    this.img = new Image();
	    this.imgLoaded = false;
	    Object.assign(this, Object.assign({}, DEFAULT, options));
	    this.ctx = this.canvasNode.getContext('2d');
	  } // 画布宽度


	  _createClass(CanvasCirclularAudio, [{
	    key: "processAudio",
	    // 音频处理
	    value: function processAudio() {
	      this.audioCtx = new AudioContext();
	      var source = this.audioCtx.createMediaElementSource(this.audioNode);
	      var analyser = this.audioCtx.createAnalyser();
	      source.connect(analyser);
	      analyser.connect(this.audioCtx.destination);
	      source.connect(this.audioCtx.destination);
	      analyser.fftSize = this.audioData.fftSize;
	      this.audioData.source = source;
	      this.audioData.analyser = analyser;
	      this.audioData.frequencyData = new Uint8Array(analyser.frequencyBinCount);
	    } // 绘制帧

	  }, {
	    key: "drawFrame",
	    value: function drawFrame() {
	      var _this = this;

	      // 一些变量
	      var _this$audioData = this.audioData,
	          analyser = _this$audioData.analyser,
	          frequencyData = _this$audioData.frequencyData;
	      analyser.getByteFrequencyData(frequencyData);
	      var _this$canvasNode = this.canvasNode,
	          width = _this$canvasNode.width,
	          height = _this$canvasNode.height;
	      var maxRadius = Math.min(width, height) / 2;
	      var radiusRing = maxRadius * 0.56;
	      var radius0 = maxRadius * 0.7;
	      var scale = maxRadius * 0.2 / 255;
	      var angle = 360 / this.partNumber;
	      var average = frequencyData.slice(0, angle).reduce(function (sum, value) {
	        return sum + value;
	      }) / angle;
	      var ctx = this.ctx; // 清空画布

	      ctx.clearRect(0, 0, this.canvasNode.width, this.canvasNode.height); // 显示图片

	      if (this.picture && this.imgLoaded) {
	        // 中心图片
	        var origWidth = this.img.width;
	        var origHeight = this.img.height;
	        var newWidth = 0;
	        var newHeight = 0;
	        var _scale = 0;

	        if (origWidth > origHeight) {
	          newWidth = radius0 * 2 * 0.8;
	          _scale = newWidth / origWidth;
	          newHeight = origHeight * _scale;
	        } else {
	          newHeight = radius0 * 2 * 0.8;
	          _scale = newHeight / origWidth;
	          newWidth = origWidth * _scale;
	        }

	        var coordX = this.center.x - newWidth / 2;
	        var coordY = this.center.y - newHeight / 2; // 图片背景

	        ctx.fillStyle = 'white';
	        ctx.beginPath();
	        ctx.arc(this.center.x, this.center.y, radiusRing, 0, 2 * Math.PI);
	        ctx.fill(); // 旋转背景

	        if (this.rotatable && this.playing) {
	          this.rotateAngle += this.rotateStep;
	        }

	        ctx.save();
	        ctx.translate(this.center.x, this.center.y);
	        ctx.rotate(this.rotateAngle / 180 * Math.PI);
	        ctx.translate(-this.center.x, -this.center.y);
	        ctx.drawImage(this.img, coordX, coordY, newWidth, newHeight);
	        ctx.restore(); // 截取图片

	        ctx.globalCompositeOperation = 'destination-in';
	        ctx.beginPath();
	        ctx.arc(this.center.x, this.center.y, radiusRing, 0, 2 * Math.PI);
	        ctx.fill(); // 默认文字
	      } else {
	        ctx.fillStyle = '#2196f3';
	        ctx.beginPath();
	        ctx.arc(this.center.x, this.center.y, radiusRing * 0.9, 0, 2 * Math.PI);
	        ctx.fill();
	        ctx.fillStyle = '#42a5f5';
	        ctx.beginPath();
	        ctx.arc(this.center.x, this.center.y, radiusRing * 0.7, 0, 2 * Math.PI);
	        ctx.fill();
	        ctx.font = "".concat(radiusRing, "px Arial");
	        ctx.textAlign = 'center';
	        ctx.textBaseline = 'middle';
	        ctx.fillStyle = 'white';
	        ctx.fillText('M', this.center.x, this.center.y, radiusRing);
	      } // 渐变背景


	      if (this.backgroundColor) {
	        ctx.globalCompositeOperation = 'destination-over';
	        var grd = ctx.createRadialGradient(this.center.x, this.center.y, radius0, this.center.x, this.center.y, Math.max(width, height) / 2);
	        grd.addColorStop(0, this.backgroundColor);
	        grd.addColorStop(1, 'white');
	        ctx.fillStyle = grd;
	        ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
	      } // 动态频谱


	      ctx.lineCap = this.lineCap;
	      ctx.lineWidth = this.lineWidth;
	      ctx.fillStyle = this.fillStyle;
	      ctx.strokeStyle = this.strokeStyle;
	      ctx.globalCompositeOperation = 'source-over';

	      var drawPart = function drawPart() {
	        var reverse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	        for (var i = 0; i < angle; i += 2) {
	          var value = reverse && _this.partEvenReverse ? frequencyData[angle - 1 - i] : frequencyData[i];
	          var radius1 = radius0 + value * scale;
	          var radius2 = radius0 - Math.max(value - average, 0) * scale;
	          var radian = i / 180 * Math.PI; // 设置圆心

	          ctx.beginPath();
	          ctx.moveTo(_this.center.x, _this.center.y);
	          var x0 = _this.center.x - radius0 * Math.cos(radian);
	          var y0 = _this.center.y - radius0 * Math.sin(radian);
	          ctx.moveTo(x0, y0); // 外层效果

	          var x1 = _this.center.x - radius1 * Math.cos(radian);
	          var y1 = _this.center.y - radius1 * Math.sin(radian);
	          ctx.lineTo(x1, y1);
	          ctx.stroke(); // 内层效果

	          ctx.beginPath();
	          ctx.moveTo(_this.center.x, _this.center.y);
	          var x2 = _this.center.x - radius2 * Math.cos(radian);
	          var y2 = _this.center.y - radius2 * Math.sin(radian);
	          ctx.arc(x2, y2, ctx.lineWidth, 0, 2 * Math.PI);
	          ctx.fill();
	        }
	      }; // 重复区域


	      for (var j = 0; j < this.partNumber; j++) {
	        ctx.translate(this.center.x, this.center.y);
	        ctx.rotate(angle / 180 * Math.PI);
	        ctx.translate(-this.center.x, -this.center.y);
	        drawPart(this.partNumber % 2 === 0 && j % 2 !== 0);
	      } // 持续绘图


	      requestAnimationFrame(this.drawFrame.bind(this));
	    } // 事件监听

	  }, {
	    key: "listenEvents",
	    value: function listenEvents() {
	      var _this2 = this;

	      // 音频事件监听
	      var audio = this.audioNode;
	      audio.addEventListener('play', function () {
	        if (_this2.audioCtx.state === 'suspended') {
	          _this2.audioCtx.resume().then(function () {
	            _this2.playing = true;
	          });
	        } else {
	          _this2.playing = true;
	        }
	      }, false);
	      audio.addEventListener('pause', function () {
	        _this2.playing = false;
	      }, false);
	      audio.addEventListener('ended', function () {
	        _this2.playing = false;
	        _this2.rotateAngle = 0;
	      }, false);
	      audio.addEventListener('abort', function () {
	        _this2.picture = null;
	        _this2.playing = false;
	        _this2.rotateAngle = 0;
	      }, false); // 图像事件监听

	      var cover = this.img;
	      cover.addEventListener('load', function () {
	        _this2.imgLoaded = true;
	      }, false);
	    } // 设置画布尺寸

	  }, {
	    key: "sizeCanvas",
	    value: function sizeCanvas(newWidth, newHeight) {
	      this.canvasWidth = newWidth;
	      this.canvasHeight = newHeight;
	    } // 设置画布属性

	  }, {
	    key: "setContext",
	    value: function setContext(_ref) {
	      var _ref$lineCap = _ref.lineCap,
	          lineCap = _ref$lineCap === void 0 ? this.lineCap : _ref$lineCap,
	          _ref$lineWidth = _ref.lineWidth,
	          lineWidth = _ref$lineWidth === void 0 ? this.lineWidth : _ref$lineWidth,
	          _ref$fillStyle = _ref.fillStyle,
	          fillStyle = _ref$fillStyle === void 0 ? this.fillStyle : _ref$fillStyle,
	          _ref$strokeStyle = _ref.strokeStyle,
	          strokeStyle = _ref$strokeStyle === void 0 ? this.strokeStyle : _ref$strokeStyle,
	          _ref$backgroundColor = _ref.backgroundColor,
	          backgroundColor = _ref$backgroundColor === void 0 ? this.backgroundColor : _ref$backgroundColor;
	      Object.assign(this, {
	        lineCap: lineCap,
	        lineWidth: lineWidth,
	        fillStyle: fillStyle,
	        strokeStyle: strokeStyle,
	        backgroundColor: backgroundColor
	      });
	    } // 初始化

	  }, {
	    key: "init",
	    value: function init() {
	      this.listenEvents();
	      this.processAudio();
	      this.drawFrame();
	    }
	  }, {
	    key: "canvasWidth",
	    get: function get() {
	      return this.canvasNode.width;
	    },
	    set: function set(value) {
	      var tempType = _typeof(value);

	      if (tempType === 'number') {
	        this.canvasNode.width = value;
	        this.center.x = value / 2;
	      } else {
	        window.console.warn("Type of width should be number, detected ".concat(tempType, "."));
	      }
	    } // 画布高度

	  }, {
	    key: "canvasHeight",
	    get: function get() {
	      return this.canvasNode.height;
	    },
	    set: function set(value) {
	      var tempType = _typeof(value);

	      if (tempType === 'number') {
	        this.canvasNode.height = value;
	        this.center.y = value / 2;
	      } else {
	        window.console.warn("Type of width should be number, detected ".concat(tempType, "."));
	      }
	    } // 是否旋转

	  }, {
	    key: "rotatable",
	    get: function get() {
	      return this._rotatable;
	    },
	    set: function set(value) {
	      var tempType = _typeof(value);

	      if (tempType !== 'boolean') {
	        window.console.warn("Type of width should be boolean, detected ".concat(tempType, "."));
	        this._rotatable = false;
	      } else {
	        this._rotatable = value;
	      }
	    } // 旋转步进

	  }, {
	    key: "rotateStep",
	    get: function get() {
	      return this._rotateStep;
	    },
	    set: function set(value) {
	      this._rotateStep = 0.2;

	      var tempType = _typeof(value);

	      if (tempType !== 'number') {
	        window.console.warn("Type of width should be number, detected ".concat(tempType, "."));
	      } else if (value < 0 || value > 1) {
	        window.console.warn('The range of rotateStep should be [0, 1].');
	      } else {
	        this._rotateStep = value;
	      }
	    } // 图片路径

	  }, {
	    key: "picture",
	    get: function get() {
	      return this.img.src;
	    },
	    set: function set(value) {
	      this.imgLoaded = false;

	      if (value) {
	        this.img.src = value;
	      }
	    }
	  }]);

	  return CanvasCirclularAudio;
	}(); // 暴露接口

	return CanvasCirclularAudio;

}());
