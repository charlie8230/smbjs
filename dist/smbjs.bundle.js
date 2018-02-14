(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["SMBJS"] = factory();
	else
		root["SMBJS"] = factory();
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @fileoverview DOM abstraction to use native browser functionality to add and remove event listeners
 * in T3
 * @author jdivock
 */

module.exports = function () {
	'use strict';

	return {

		type: 'native',

		/**
   * Returns the first element that is a descendant of the element
   * on which it is invoked that matches the specified group of selectors.
   * @param {HTMLElement} root parent element to query off of
   * @param {string} selector query string to match on
   *
   * @returns {HTMLElement} first element found matching query
   */
		query: function query(root, selector) {
			return root.querySelector(selector);
		},

		/**
   * Returns a non-live NodeList of all elements descended from the
   * element on which it is invoked that match the specified group of CSS selectors.
   * @param {HTMLElement} root parent element to query off of
   * @param {string} selector query string to match on
   *
   * @returns {Array} elements found matching query
   */
		queryAll: function queryAll(root, selector) {
			return root.querySelectorAll(selector);
		},

		/**
   * Adds event listener to element using native event listener
   * @param {HTMLElement} element Target to attach listener to
   * @param {string} type Name of the action to listen for
   * @param {function} listener Function to be executed on action
   *
   * @returns {void}
   */
		on: function on(element, type, listener) {
			element.addEventListener(type, listener, false);
		},

		/**
   * Removes event listener to element using native event listener functions
   * @param {HTMLElement} element Target to remove listener from
   * @param {string} type Name of the action remove listener from
   * @param {function} listener Function to be removed from action
   *
   * @returns {void}
   */
		off: function off(element, type, listener) {
			element.removeEventListener(type, listener, false);
		}
	};
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.app = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * @fileoverview Contains the main application object that is the heart of the
 *               JavaScript architecture.
 * @author Box
 */

/** 
 * File structure rewritten by Carlos Moran
*/

/**
 * The core application object where components are registered and managed
 * @mixes Box.EventTarget
 * @namespace
 */

var _eventTarget = __webpack_require__(4);

var _eventTarget2 = _interopRequireDefault(_eventTarget);

var _mitt = __webpack_require__(5);

var _mitt2 = _interopRequireDefault(_mitt);

var _context = __webpack_require__(2);

var _context2 = _interopRequireDefault(_context);

var _domNative = __webpack_require__(0);

var _domNative2 = _interopRequireDefault(_domNative);

var _domEventDelegate = __webpack_require__(3);

var _domEventDelegate2 = _interopRequireDefault(_domEventDelegate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = function () {

	'use strict';

	//--------------------------------------------------------------------------
	// Virtual Types
	//--------------------------------------------------------------------------

	/**
  * An object representing information about a module.
  * @typedef {Object} Box.Application~ModuleData
  * @property {Function} creator The function that creates an instance of this module.
  * @property {int} counter The number of module instances.
  */

	/**
  * An object representing information about a module instance.
  * @typedef {Object} Box.Application~ModuleInstanceData
  * @property {string} moduleName The name of the module.
  * @property {Box.Application~ModuleInstance} instance The module instance.
  * @property {Box.Context} context The context object for the module.
  * @property {HTMLElement} element The DOM element associated with the module.
  * @property {Object} eventHandlers Handler callback functions by event type.
  */

	/**
  * A module object.
  * @typedef {Object} Box.Application~Module
  */

	//--------------------------------------------------------------------------
	// Private
	//--------------------------------------------------------------------------

	var MODULE_SELECTOR = '[data-module]';

	var globalConfig = {},
	    // Global configuration
	modules = {},
	    // Information about each registered module by moduleName
	serviceStack = [],
	    // Track circular dependencies while loading services
	services = {},
	    // Information about each registered service by serviceName
	behaviors = {},
	    // Information about each registered behavior by behaviorName
	instances = {},
	    // Module instances keyed by DOM element id
	initialized = false,
	    // Flag whether the application has been initialized
	customErrorHandler = null,
	    application = new _eventTarget2.default(); // base object for application

	/**
  * Simple implementation of ES6 Object.assign() with just two parameters.
  * @param {Object} receiver The object to receive properties
  * @param {Object} supplier The object whose properties should be copied.
  * @returns {Object} The receiver object.
  * @private
  */
	function assign(receiver, supplier) {

		for (var prop in supplier) {
			if (supplier.hasOwnProperty(prop)) {
				receiver[prop] = supplier[prop];
			}
		}

		return receiver;
	}

	/**
  * Simple implementation of Array.prototype.indexOf().
  * @param {*[]} items An array of items to search.
  * @param {*} item The item to search for in the array.
  * @returns {int} The index of the item in the array if found, -1 if not found.
  * @private
  */
	function indexOf(items, item) {
		for (var i = 0, len = items.length; i < len; i++) {
			if (items[i] === item) {
				return i;
			}
		}

		return -1;
	}

	/**
  * Reset all state to its default values
  * @returns {void}
  * @private
  */
	function reset() {
		globalConfig = {};
		modules = {};
		services = {};
		serviceStack = [];
		behaviors = {};
		instances = {};
		initialized = false;
	}

	/**
  * Indicates if a given service is being instantiated. This is used to check
  * for circular dependencies in service instantiation. If two services
  * reference each other, it causes a stack overflow and is really hard to
  * track down, so we provide an extra check to make finding this issue
  * easier.
  * @param {string} serviceName The name of the service to check.
  * @returns {boolean} True if the service is already being instantiated,
  *		false if not.
  * @private
  */
	function isServiceBeingInstantiated(serviceName) {
		for (var i = 0, len = serviceStack.length; i < len; i++) {
			if (serviceStack[i] === serviceName) {
				return true;
			}
		}

		return false;
	}

	/**
  * Signals that an error has occurred. If in development mode, an error
  * is thrown. If in production mode, an event is fired.
  * @param {Error} [exception] The exception object to use.
  * @returns {void}
  * @private
  */
	function error(exception) {
		if (typeof customErrorHandler === 'function') {
			customErrorHandler(exception);
			return;
		}
		if (globalConfig.debug) {
			throw exception;
		} else {
			application.fire('error', {
				exception: exception
			});
		}
	}

	/**
  * Wraps all methods on an object with try-catch so that objects don't need
  * to worry about trapping their own errors. When an error occurs, the
  * error event is fired with the error information.
  * @see http://www.nczonline.net/blog/2009/04/28/javascript-error-handling-anti-pattern/
  * @param {Object} object Any object whose public methods should be wrapped.
  * @param {string} objectName The name that should be reported for the object
  *                            when an error occurs.
  * @returns {void}
  * @private
  */
	function captureObjectErrors(object, objectName) {

		var propertyName, propertyValue;

		/* eslint-disable guard-for-in, no-loop-func */
		for (propertyName in object) {
			propertyValue = object[propertyName];

			// only do this for methods, be sure to check before making changes!
			if (typeof propertyValue === 'function') {
				/*
     * This creates a new function that wraps the original function
     * in a try-catch. The outer function executes immediately with
     * the name and actual method passed in as values. This allows
     * us to create a function with specific information even though
     * it's inside of a loop.
     */
				object[propertyName] = function (methodName, method) {
					return function () {
						var errorPrefix = objectName + '.' + methodName + '() - ';
						try {
							return method.apply(this, arguments);
						} catch (ex) {
							ex.methodName = methodName;
							ex.objectName = objectName;
							ex.name = errorPrefix + ex.name;
							ex.message = errorPrefix + ex.message;
							error(ex);
						}
					};
				}(propertyName, propertyValue);
			}
		}
		/* eslint-enable guard-for-in, no-loop-func */
	}

	/**
  * Returns the name of the module associated with a DOM element
  * @param {HTMLElement} element DOM element associated with the module
  * @returns {string} Name of the module (empty if not a module)
  * @private
  */
	function getModuleName(element) {
		var moduleAttribute = element.getAttribute('data-module');

		if (moduleAttribute) {
			return moduleAttribute.split(' ')[0];
		}
		return '';
	}

	/**
  * Calls a method on an object if it exists
  * @param {Box.Application~ModuleInstance} instance Module object to call the method on.
  * @param {string} method Name of method
  * @param {...*} [args] Any additional arguments are passed as function parameters (Optional)
  * @returns {void}
  * @private
  */
	function callModuleMethod(instance, method) {
		if (typeof instance[method] === 'function') {
			// Getting the rest of the parameters (the ones other than instance and method)
			instance[method].apply(instance, Array.prototype.slice.call(arguments, 2));
		}
	}

	/**
  * Returns the requested service
  * @param {string} serviceName The name of the service to retrieve.
  * @returns {Object} An object if the service
  * @throws {Error} If service does not exist or there is a circular dependency
  * @private
  */
	function getService(serviceName) {

		var serviceData = services[serviceName];

		if (serviceData) {

			if (!serviceData.instance) {
				// check for circular dependencies
				if (isServiceBeingInstantiated(serviceName)) {
					error(new ReferenceError('Circular service dependency: ' + serviceStack.join(' -> ') + ' -> ' + serviceName));
					return null;
				}

				// flag that this service is being initialized just in case there's a circular dependency issue
				serviceStack.push(serviceName);

				serviceData.instance = serviceData.creator(application);

				// no error was thrown for circular dependencies, so we're done
				serviceStack.pop();
			}

			return serviceData.instance;
		} else {
			error(new Error('Service "' + serviceName + '" not found'));
		}

		return null;
	}

	/**
  * Gets the behaviors associated with a particular module
  * @param {Box.Application~ModuleInstanceData} instanceData Module with behaviors
  * @returns {Array} Array of behavior instances
  * @throws {Error} If behavior does not exist
  * @private
  */

	/*
 	-clarify usages
 - add pubsub
 */

	function getBehaviors(instanceData) {
		var i,
		    behaviorNames,
		    behaviorData,
		    behaviorInstances = [],
		    includedBehaviors = {},
		    // Used to de-dupe behaviors
		moduleBehaviorInstances,
		    behaviorName;

		behaviorNames = instanceData.instance.behaviors || [];

		for (i = 0; i < behaviorNames.length; i++) {
			behaviorName = behaviorNames[i];

			if (!('behaviorInstances' in instanceData)) {
				instanceData.behaviorInstances = {};
			}

			moduleBehaviorInstances = instanceData.behaviorInstances;
			behaviorData = behaviors[behaviorName];

			// First make sure we haven't already included this behavior for this module
			if (behaviorName in includedBehaviors) {
				error(new Error('Behavior "' + behaviorName + '" cannot be specified twice in a module.'));
			} else if (behaviorData) {

				if (!moduleBehaviorInstances[behaviorName]) {
					moduleBehaviorInstances[behaviorName] = behaviorData.creator(instanceData.context);
					//	Add pub sub here
				}

				behaviorInstances.push(moduleBehaviorInstances[behaviorName]);
			} else {
				error(new Error('Behavior "' + behaviorName + '" not found'));
			}

			// Track which behaviors are included so we can catch duplicates
			includedBehaviors[behaviorName] = true;
		}

		return behaviorInstances;
	}

	/**
  * Creates a new event delegate and sets up its event handlers.
  * @param {Array} eventDelegates The array of event delegates to add to.
  * @param {HTMLElement} element The HTML element to bind to.
  * @param {Object} handler The handler object for the delegate (either the
  *		module instance or behavior instance).
  * @returns {void}
  * @private
  */
	function createAndBindEventDelegate(eventDelegates, element, handler) {
		var delegate = new _domEventDelegate2.default(element, handler, globalConfig.eventTypes);
		eventDelegates.push(delegate);
		delegate.attachEvents();
	}

	/**
  * Binds the user events listed in the module to its toplevel element
  * @param {Box.Application~ModuleInstanceData} instanceData Events will be bound to the module defined in the Instance object
  * @returns {void}
  * @private
  */
	function bindEventListeners(instanceData) {
		var eventDelegates = instanceData.eventDelegates,
		    moduleBehaviors = getBehaviors(instanceData);

		// bind the module events
		createAndBindEventDelegate(eventDelegates, instanceData.element, instanceData.instance);

		// bind the behavior(s) events
		for (var i = 0; i < moduleBehaviors.length; i++) {
			createAndBindEventDelegate(eventDelegates, instanceData.element, moduleBehaviors[i]);
		}
	}

	/**
  * Unbinds the user events listed in the module
  * @param {Box.Application~ModuleInstanceData} instanceData Events will be unbound from the module defined in the Instance object
  * @returns {void}
  * @private
  */
	function unbindEventListeners(instanceData) {

		var eventDelegates = instanceData.eventDelegates;

		for (var i = 0; i < eventDelegates.length; i++) {
			eventDelegates[i].detachEvents();
		}

		instanceData.eventDelegates = [];
	}

	/**
  * Gets the module instance associated with a DOM element
  * @param {HTMLElement} element DOM element associated with module
  * @returns {Box.Application~ModuleInstance} Instance object of the module (undefined if not found)
  * @private
  */
	function getInstanceDataByElement(element) {
		return instances[element.id];
	}

	/**
  * Gets message handlers from the provided module instance
  * @param {Box.Application~ModuleInstance|Box.Application~BehaviorInstance} instance Messages handlers will be retrieved from the Instance object
  * @param {String} name The name of the message to be handled
  * @param {Any} data A playload to be passed to the message handler
  * @returns {void}
  * @private
  */
	function callMessageHandler(instance, name, data) {

		/* Messages should retain context without this lookup	*/

		// If onmessage is an object call message handler with the matching key (if any)
		if (instance.onmessage !== null && _typeof(instance.onmessage) === 'object' && instance.onmessage.hasOwnProperty(name)) {
			instance.onmessage[name].call(instance, data);

			// Otherwise if message name exists in messages call onmessage with name, data
		} else if (indexOf(instance.messages || [], name) !== -1) {
			instance.onmessage.call(instance, name, data);
		}
	}

	//--------------------------------------------------------------------------
	// Public
	//--------------------------------------------------------------------------

	/** @lends Box.Application */
	return assign(application, {

		//----------------------------------------------------------------------
		// Application Lifecycle
		//----------------------------------------------------------------------

		/**
   * Initializes the application
   * @param {Object} [params] Configuration object
   * @returns {Box.Application} The application object.
   */
		init: function init(params) {
			assign(globalConfig, params || {});

			this.startAll(document.documentElement);

			this.fire('init');
			initialized = true;
			return this;
		},

		/**
   * Stops all modules and clears all saved state
   * @returns {Box.Application} The application object.
   */
		destroy: function destroy() {
			this.stopAll(document.documentElement);

			reset();

			return this;
		},

		//----------------------------------------------------------------------
		// Module Lifecycle
		//----------------------------------------------------------------------

		/**
   * Determines if a module represented by the HTML element is started.
   * If the element doesn't have a data-module attribute, this method
   * always returns false.
   * @param {HTMLElement} element The element that represents a module.
   * @returns {boolean} True if the module is started, false if not.
   */
		isStarted: function isStarted(element) {
			var instanceData = getInstanceDataByElement(element);
			return (typeof instanceData === 'undefined' ? 'undefined' : _typeof(instanceData)) === 'object';
		},

		/**
   * Begins the lifecycle of a module (registers and binds listeners)
   * @param {HTMLElement} element DOM element associated with module to be started
   * @returns {Box.Application} The application object.
   * @throws {Error} If a module being started is not defined
   */
		start: function start(element) {
			var moduleName = getModuleName(element),
			    moduleData = modules[moduleName],
			    instanceData,
			    context,
			    jsmodule;

			if (!moduleData) {
				error(new Error('Module type "' + moduleName + '" is not defined.'));
				return this;
			}

			if (!this.isStarted(element)) {
				// Auto-assign module id to element
				if (!element.id) {
					element.id = 'mod-' + moduleName + '-' + moduleData.counter;
				}

				moduleData.counter++;

				context = new _context2.default(this, element);

				jsmodule = moduleData.creator(context);
				//	do pub/sub here


				// Prevent errors from showing the browser, fire event instead
				if (!globalConfig.debug) {
					captureObjectErrors(jsmodule, moduleName);
				}

				instanceData = {
					moduleName: moduleName,
					instance: jsmodule,
					context: context,
					element: element,
					eventDelegates: []
				};

				instances[element.id] = instanceData;

				var moduleBehaviors = getBehaviors(instanceData),
				    behaviorInstance;

				for (var i = 0, len = moduleBehaviors.length; i < len; i++) {
					behaviorInstance = moduleBehaviors[i];
					callModuleMethod(behaviorInstance, 'init');
				}

				// Initialize module only after behaviors are initialized
				callModuleMethod(instanceData.instance, 'init');

				// Bind events after initialization is complete to avoid event timing issues
				bindEventListeners(instanceData);
			}

			return this;
		},

		/**
   * Ends the lifecycle of a module (unregisters and unbinds listeners)
   * @param {HTMLElement} element DOM element associated with module to be stopped
   * @returns {Box.Application} The application object.
   * @throws {Error} If a module being stopped doesn't exist
   */
		stop: function stop(element) {
			var instanceData = getInstanceDataByElement(element);

			if (!instanceData) {

				if (globalConfig.debug) {
					error(new Error('Unable to stop module associated with element: ' + element.id));
					return this;
				}
			} else {

				unbindEventListeners(instanceData);

				// Call these in reverse order
				var moduleBehaviors = getBehaviors(instanceData);
				var behaviorInstance;
				for (var i = moduleBehaviors.length - 1; i >= 0; i--) {
					behaviorInstance = moduleBehaviors[i];
					callModuleMethod(behaviorInstance, 'destroy');
				}

				callModuleMethod(instanceData.instance, 'destroy');

				delete instances[element.id];
			}

			return this;
		},

		/**
   * Starts all modules contained within an element
   * @param {HTMLElement} root DOM element which contains modules
   * @returns {Box.Application} The application object.
   */
		startAll: function startAll(root) {
			var moduleElements = _domNative2.default.queryAll(root, MODULE_SELECTOR);

			for (var i = 0, len = moduleElements.length; i < len; i++) {
				this.start(moduleElements[i]);
			}

			return this;
		},

		/**
   * Stops all modules contained within an element
   * @param {HTMLElement} root DOM element which contains modules
   * @returns {Box.Application} The application object.
   */
		stopAll: function stopAll(root) {
			var moduleElements = _domNative2.default.queryAll(root, MODULE_SELECTOR);

			for (var i = 0, len = moduleElements.length; i < len; i++) {
				this.stop(moduleElements[i]);
			}

			return this;
		},

		//----------------------------------------------------------------------
		// Module-Related
		//----------------------------------------------------------------------

		/**
   * Registers a new module
   * @param {string} moduleName Unique module identifier
   * @param {Function} creator Factory function used to generate the module
   * @returns {Box.Application} The application object.
   * @throws {Error} If a module has already been added
   */
		addModule: function addModule(moduleName, creator) {
			if (typeof modules[moduleName] !== 'undefined') {
				error(new Error('Module ' + moduleName + ' has already been added.'));
				return this;
			}

			modules[moduleName] = {
				creator: creator,
				counter: 1 // increments for each new instance
			};

			return this;
		},

		/**
   * Returns any configuration information that was output into the page
   * for this instance of the module.
   * @param {HTMLElement} element The HTML element associated with a module.
   * @param {string} [name] Specific config parameter
   * @returns {*} config value or the entire configuration JSON object
   *                if no name is specified (null if either not found)
   */
		getModuleConfig: function getModuleConfig(element, name) {

			var instanceData = getInstanceDataByElement(element);
			var moduleConfig = null;

			if (instanceData && instanceData.config) {
				// Check if we've already read the configurations before
				moduleConfig = instanceData.config;
			} else {
				// Read the special script element that stores module configuration in the markup
				var configElement = _domNative2.default.query(element, 'script[type="text/x-config"]');

				// <script> tag supports .text property
				if (configElement) {
					try {
						moduleConfig = JSON.parse(configElement.text);
					} catch (exception) {
						error(new Error('Module with id ' + element.id + ' has a malformed config.'));
					}
				}

				// Cache the configurations for performance, if the module instance has been created
				if (instanceData) {
					instanceData.config = moduleConfig;
				}
			}

			if (!moduleConfig) {
				return null;
			} else if (typeof name === 'undefined') {
				return moduleConfig;
			} else if (name in moduleConfig) {
				return moduleConfig[name];
			} else {
				return null;
			}
		},

		//----------------------------------------------------------------------
		// Service-Related
		//----------------------------------------------------------------------

		/**
   * Registers a new service
   * @param {string} serviceName Unique service identifier
   * @param {Function} creator Factory function used to generate the service
   * @returns {Box.Application} The application object.
   * @throws {Error} If a service has already been added
   */
		addService: function addService(serviceName, creator) {

			if (typeof services[serviceName] !== 'undefined') {
				error(new Error('Service ' + serviceName + ' has already been added.'));
				return this;
			}

			services[serviceName] = {
				creator: creator,
				instance: null
			};

			return this;
		},

		/**
   * Returns the requested service
   * @param {string} serviceName The name of the service to retrieve.
   * @returns {!Object} An object if the service is found or null if not.
   */
		getService: getService,

		/**
   * Checks if a service exists
   * @param {string} serviceName The name of the service to check.
   * @returns {boolean} True, if service exist. False, otherwise.
   */
		hasService: function hasService(serviceName) {
			return services.hasOwnProperty(serviceName);
		},

		//----------------------------------------------------------------------
		// Behavior-Related
		//----------------------------------------------------------------------

		/**
   * Registers a new behavior
   * @param {string} behaviorName Unique behavior identifier
   * @param {Function} creator Factory function used to generate the behavior
   * @returns {Box.Application} The application object.
   * @throws {Error} If a behavior has already been added
   */
		addBehavior: function addBehavior(behaviorName, creator) {
			if (typeof behaviors[behaviorName] !== 'undefined') {
				error(new Error('Behavior ' + behaviorName + ' has already been added.'));
				return this;
			}

			behaviors[behaviorName] = {
				creator: creator,
				instance: null
			};

			return this;
		},

		//----------------------------------------------------------------------
		// Messaging
		//----------------------------------------------------------------------

		/**
   * Broadcasts a message to all registered listeners
   * @param {string} name Name of the message
   * @param {*} [data] Custom parameters for the message
   * @returns {Box.Application} The application object.
   */
		broadcast: function broadcast(name, data) {
			var i, id, instanceData, behaviorInstance, moduleBehaviors;

			/*
   
   		REPLACE				*/

			for (id in instances) {

				if (instances.hasOwnProperty(id)) {
					instanceData = instances[id];

					// Module message handler is called first
					callMessageHandler(instanceData.instance, name, data);

					// And then any message handlers defined in module's behaviors
					moduleBehaviors = getBehaviors(instanceData);
					for (i = 0; i < moduleBehaviors.length; i++) {
						behaviorInstance = moduleBehaviors[i];
						callMessageHandler(behaviorInstance, name, data);
					}
				}
			}

			// also fire an event so non-T3 code can listen for the message
			this.fire('message', {
				message: name,
				messageData: data
			});

			return this;
		},

		//----------------------------------------------------------------------
		// Global Configuration
		//----------------------------------------------------------------------

		/**
   * Returns a global variable
   * @param {string} name Specific global var name
   * @returns {*} returns the window-scope variable matching the name, null otherwise
   */
		getGlobal: function getGlobal(name) {
			if (name in window) {
				return window[name];
			} else {
				return null;
			}
		},

		/**
   * Returns global configuration data
   * @param {string} [name] Specific config parameter
   * @returns {*} config value or the entire configuration JSON object
   *                if no name is specified (null if neither not found)
   */
		getGlobalConfig: function getGlobalConfig(name) {
			if (typeof name === 'undefined') {
				return globalConfig;
			} else if (name in globalConfig) {
				return globalConfig[name];
			} else {
				return null;
			}
		},

		/**
   * Sets the global configuration data
   * @param {Object} config Global configuration object
   * @returns {Box.Application} The application object.
   */
		setGlobalConfig: function setGlobalConfig(config) {
			if (initialized) {
				error(new Error('Cannot set global configuration after application initialization'));
				return this;
			}

			assign(globalConfig, config);
			return this;
		},

		//----------------------------------------------------------------------
		// Error reporting
		//----------------------------------------------------------------------

		/**
   * Overrides default error handler
   * @param {Function} exceptionHandler handling function that takes an
   * exception as argument. Must be called before init.
   * @returns {void}
   */
		setErrorHandler: function setErrorHandler(exceptionHandler) {
			customErrorHandler = exceptionHandler;
		},

		/**
   * Signals that an error has occurred. If in development mode, an error
   * is thrown. If in production mode, an event is fired.
   * @param {Error} [exception] The exception object to use.
   * @returns {void}
   */
		reportError: error,

		/**
   * Signals that an warning has occurred.
   * If in development mode, console.warn is invoked.
   * If in production mode, an event is fired.
   * @param {*} data A message string or arbitrary data
   * @returns {void}
   */
		reportWarning: function reportWarning(data) {
			if (globalConfig.debug) {
				// We grab console via getGlobal() so we can stub it out in tests
				var globalConsole = this.getGlobal('console');
				if (globalConsole && globalConsole.warn) {
					globalConsole.warn(data);
				}
			} else {
				application.fire('warning', data);
			}
		},

		/**
   * Display console info messages.
   * If in development mode, console.info is invoked.
   * @param {*} data A message string or arbitrary data
   * @returns {void}
   */
		reportInfo: function reportInfo(data) {
			if (globalConfig.debug) {
				// We grab console via getGlobal() so we can stub it out in tests
				var globalConsole = this.getGlobal('console');
				if (globalConsole && globalConsole.info) {
					globalConsole.info(data);
				}
			}
		}

	});
}();

exports.app = app;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @fileoverview Contains the Context type which is used by modules to interact
 *               with the environment.
 * @author Box
 */

module.exports = function () {

	'use strict';

	/**
  * The object type that modules use to interact with the environment. Used
  * exclusively within Box.Application, but exposed publicly for easy testing.
  * @param {Box.Application} application The application object to wrap.
  * @param {HTMLElement} element Module's DOM element
  * @constructor
  */

	function Context(application, element) {
		this.application = application;
		this.element = element;
	}

	//-------------------------------------------------------------------------
	// Passthrough Methods
	//-------------------------------------------------------------------------

	Context.prototype = {
		constructor: Context,

		/**
   * Passthrough method to application that broadcasts messages.
   * @param {string} name Name of the message event
   * @param {*} [data] Custom parameters for the message
   * @returns {void}
   */
		broadcast: function broadcast(name, data) {
			this.application.broadcast(name, data);
		},

		/**
   * Passthrough method to application that retrieves services.
   * @param {string} serviceName The name of the service to retrieve.
   * @returns {Object|null} An object if the service is found or null if not.
   */
		getService: function getService(serviceName) {
			return this.application.getService(serviceName);
		},

		/**
   * Checks if a service exists
   * @param {string} serviceName The name of the service to check.
   * @returns {boolean} True, if service exist. False, otherwise.
   */
		hasService: function hasService(serviceName) {
			return this.application.hasService(serviceName);
		},

		/**
   * Returns any configuration information that was output into the page
   * for this instance of the module.
   * @param {string} [name] Specific config parameter
   * @returns {*} config value or the entire configuration JSON object
   *                if no name is specified (null if either not found)
   */
		getConfig: function getConfig(name) {
			return this.application.getModuleConfig(this.element, name);
		},

		/**
   * Returns a global variable
   * @param {string} name Specific global var name
   * @returns {*} returns the window-scope variable matching the name, null otherwise
   */
		getGlobal: function getGlobal(name) {
			return this.application.getGlobal(name);
		},

		/**
   * Returns global configuration data
   * @param {string} [name] Specific config parameter
   * @returns {*} config value or the entire configuration JSON object
   *                if no name is specified (null if either not found)
   */
		getGlobalConfig: function getGlobalConfig(name) {
			return this.application.getGlobalConfig(name);
		},

		/**
   * Passthrough method that signals that an error has occurred. If in development mode, an error
   * is thrown. If in production mode, an event is fired.
   * @param {Error} [exception] The exception object to use.
   * @returns {void}
   */
		reportError: function reportError(exception) {
			this.application.reportError(exception);
		},

		//-------------------------------------------------------------------------
		// Service Shortcuts
		//-------------------------------------------------------------------------

		/**
   * Returns the element that represents the module.
   * @returns {HTMLElement} The element representing the module.
   */
		getElement: function getElement() {
			return this.element;
		}

	};

	return Context;
}();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _domNative = __webpack_require__(0);

var _domNative2 = _interopRequireDefault(_domNative);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function () {

	'use strict';

	// Supported events for modules. Only events that bubble properly can be used in T3.

	var DEFAULT_EVENT_TYPES = ['click', 'mouseover', 'mouseout', 'mousedown', 'mouseup', 'mouseenter', 'mouseleave', 'mousemove', 'keydown', 'keyup', 'submit', 'change', 'contextmenu', 'dblclick', 'input', 'focusin', 'focusout'];

	/**
  * Determines if a given element represents a module.
  * @param {HTMLElement} element The element to check.
  * @returns {boolean} True if the element represents a module, false if not.
  * @private
  */
	function isModuleElement(element) {
		return element && element.hasAttribute('data-module');
	}

	/**
  * Determines if a given element represents a T3 type.
  * @param {HTMLElement} element The element to check.
  * @returns {boolean} True if the element represents a T3 type, false if not.
  * @private
  */
	function isTypeElement(element) {
		return element && element.hasAttribute('data-type');
	}

	/**
  * Finds the closest ancestor that of an element that has a data-type
  * attribute.
  * @param {HTMLElement} element The element to start searching from.
  * @returns {HTMLElement} The matching element or null if not found.
  */
	function getNearestTypeElement(element) {
		var found = false;
		var moduleBoundaryReached = false;

		// We need to check for the existence of 'element' since occasionally we call this on a detached element node.
		// For example:
		//  1. event handlers like mouseout may sometimes detach nodes from the DOM
		//  2. event handlers like mouseleave will still fire on the detached node
		// Checking existence of element.parentNode ensures the element is a valid HTML Element
		while (!found && element && element.parentNode && !moduleBoundaryReached) {
			found = isTypeElement(element);
			moduleBoundaryReached = isModuleElement(element);

			if (!found) {
				element = element.parentNode;
			}
		}

		return found ? element : null;
	}

	/**
  * Iterates over each supported event type that is also in the handler, applying
  * a callback function. This is used to more easily attach/detach all events.
  * @param {string[]} eventTypes A list of event types to iterate over
  * @param {Object} handler An object with onclick, onmouseover, etc. methods.
  * @param {Function} callback The function to call on each event type.
  * @param {Object} [thisValue] The value of "this" inside the callback.
  * @returns {void}
  * @private
  */
	function forEachEventType(eventTypes, handler, callback, thisValue) {

		var i, type;

		for (i = 0; i < eventTypes.length; i++) {
			type = eventTypes[i];

			// only call the callback if the event is on the handler
			if (handler['on' + type]) {
				callback.call(thisValue, type);
			}
		}
	}

	/**
  * An object that manages events within a single DOM element.
  * @param {HTMLElement} element The DOM element to handle events for.
  * @param {Object} handler An object containing event handlers such as "onclick".
  * @param {string[]} [eventTypes] A list of event types to handle (events must bubble). Defaults to a common set of events.
  * @constructor
  */
	function DOMEventDelegate(element, handler, eventTypes) {

		/**
   * The DOM element that this object is handling events for.
   * @type {HTMLElement}
   */
		this.element = element;

		/**
   * Object on which event handlers are available.
   * @type {Object}
   * @private
   */
		this._handler = handler;

		/**
   * List of event types to handle (make sure these events bubble!)
   * @type {string[]}
   * @private
   */
		this._eventTypes = eventTypes || DEFAULT_EVENT_TYPES;

		/**
   * Tracks event handlers whose this-value is bound to the correct
   * object.
   * @type {Object}
   * @private
   */
		this._boundHandler = {};

		/**
   * Indicates if events have been attached.
   * @type {boolean}
   * @private
   */
		this._attached = false;
	}

	DOMEventDelegate.prototype = {

		// restore constructor
		constructor: DOMEventDelegate,

		_handleEvent: function _handleEvent(event) {
			var targetElement = getNearestTypeElement(event.target),
			    elementType = targetElement ? targetElement.getAttribute('data-type') : '';

			this._handler['on' + event.type](event, targetElement, elementType);
		},

		/**
   * Attaches all event handlers for the DOM element.
   * @returns {void}
   */
		attachEvents: function attachEvents() {
			if (!this._attached) {

				forEachEventType(this._eventTypes, this._handler, function (eventType) {
					var that = this;

					function handleEvent() {
						that._handleEvent.apply(that, arguments);
					}

					_domNative2.default.on(this.element, eventType, handleEvent);

					this._boundHandler[eventType] = handleEvent;
				}, this);

				this._attached = true;
			}
		},

		/**
   * Detaches all event handlers for the DOM element.
   * @returns {void}
   */
		detachEvents: function detachEvents() {
			forEachEventType(this._eventTypes, this._handler, function (eventType) {
				_domNative2.default.off(this.element, eventType, this._boundHandler[eventType]);
			}, this);
		}
	};

	return DOMEventDelegate;
}(); /**
      * @fileoverview An object that encapsulates event delegation wireup for a
      * DOM element.
      * @author Box
      */

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @fileoverview Definition of a custom event type. This is used as a utility
 * throughout the framework whenever custom events are used. It is intended to
 * be inherited from, either through the prototype or via mixin.
 * @author Box
 */

var _class = function () {
	/**
 * An object that is capable of generating custom events and also
 * executing handlers for events when they occur.
 * @constructor
 */
	function _class() {
		_classCallCheck(this, _class);

		/**
   * Map of events to handlers. The keys in the object are the event names.
   * The values in the object are arrays of event handler functions.
   * @type {Object}
   * @private
   */
		this._handlers = {};
	}

	/**
  * Adds a new event handler for a particular type of event.
  * @param {string} type The name of the event to listen for.
  * @param {Function} handler The function to call when the event occurs.
  * @returns {void}
  */


	_createClass(_class, [{
		key: 'on',
		value: function on(type, handler) {

			var handlers = this._handlers[type],
			    i,
			    len;
			debugger;
			if (typeof handlers === 'undefined') {
				handlers = this._handlers[type] = [];
			}

			for (i = 0, len = handlers.length; i < len; i++) {
				if (handlers[i] === handler) {
					// prevent duplicate handlers
					return;
				}
			}

			handlers.push(handler);
		}

		/**
   * Fires an event with the given name and data.
   * @param {string} type The type of event to fire.
   * @param {Object} [data] An object with properties that should end up on
   *                        the event object for the given event.
   * @returns {void}
   */

	}, {
		key: 'fire',
		value: function fire(type, data) {

			var handlers,
			    i,
			    len,
			    event = {
				type: type,
				data: data
			};

			// if there are handlers for the event, call them in order
			handlers = this._handlers[event.type];
			if (handlers instanceof Array) {
				// @NOTE: do a concat() here to create a copy of the handlers array,
				// so that if another handler is removed of the same type, it doesn't
				// interfere with the handlers array during this loop
				handlers = handlers.concat();
				for (i = 0, len = handlers.length; i < len; i++) {
					handlers[i].call(this, event);
				}
			}
		}

		/**
   * Removes an event handler from a given event.
   * @param {string} type The name of the event to remove from.
   * @param {Function} handler The function to remove as a handler.
   * @returns {void}
   */

	}, {
		key: 'off',
		value: function off(type, handler) {

			var handlers = this._handlers[type],
			    i,
			    len;

			if (handlers instanceof Array) {
				for (i = 0, len = handlers.length; i < len; i++) {
					if (handlers[i] === handler) {
						handlers.splice(i, 1);
						break;
					}
				}
			}
		}
	}]);

	return _class;
}();

exports.default = _class;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//      
// An event handler can take an optional event argument
// and should not return a value

//	type WildCardEventHandler = (type: string, event?: any) => void;

//	type EventHandlerItemWild = {handler: WildCardEventHandler, priority: Number};

// An array of all currently registered event handlers for a type

//	type WildCardEventHandlerList = Array<EventHandlerItemWild>;
// A map of event types and their corresponding event handlers.


/** Mitt: Tiny (~200b) functional event emitter / pubsub.
 *  @name mitt
 *  @returns {Mitt}
 */

function mitt(all) {
	all = all || {};

	return {
		/**
   * Register an event handler for the given type.
   *
   * @param  {String} type	Type of event to listen for, or `"*"` for all events
   * @param  {Function} handler Function to call in response to given event
   * @param {Number} priority determine which event fires first when there are multiple subscribers (could all be equal too)
   * @memberOf mitt
   */
		on: function on(type, handler, priority) {
			if (priority === void 0) priority = 0;

			if (type === '*') {
				priority = -1;
			}
			var item = { handler: handler, priority: priority };
			(all[type] || (all[type] = [])).push(item);
		},

		/**
   * Remove an event handler for the given type.
   *
   * @param  {String} type	Type of event to unregister `handler` from, or `"*"`
   * @param  {Function} handler Handler function to remove
   * @memberOf mitt
   */
		off: function off(type, handler) {
			if (all[type]) {
				all[type].splice(all[type].map(function (item) {
					return item.handler;
				}).indexOf(handler) >>> 0, 1);
			}
		},

		/**
   * Invoke all handlers for the given type.
   * If present, `"*"` handlers are invoked after type-matched handlers.
   *
   * @param {String} type  The event type to invoke
   * @param {Any} [evt]  Any value (object is recommended and powerful), passed to each handler
   * @memberOf mitt
   */
		emit: function emit(type, evt) {
			if (type !== '*') {
				(all[type] || []).slice().sort(function (a, b) {
					return a.priority - b.priority;
				}).forEach(function (item) {
					item.handler(evt, type || '');
				});
			}
			(all['*'] || []).slice().forEach(function (item) {
				item.handler(evt, type || '');
			});
		}
	};
}

module.exports = mitt;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _application = __webpack_require__(1);

var previousSMBJS = void 0; /**
                             * @fileoverview Base namespaces for SMBJS JavaScript.
                             * @author Box
                             * @author Carlos Moran
                             */

/**
 * Global object for SMBJS JavaScript.
 * @namespace
*/


if (window['SMBJS']) previousSMBJS = window['SMBJS'];

module.exports = {
  app: _application.app,
  Application: _application.app,
  noConflict: function noConflict() {
    window.SMBJS = previousSMBJS;
    return this;
  }
};

/***/ })
/******/ ]);
});