'use strict';

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
function mitt(all                 ) {
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
		on: function on(type        , handler              , priority) {
			if ( priority === void 0 ) priority        = 0;

			if (type === '*') { priority = -1; }
			var item                   = {handler: handler, priority: priority};
			(all[type] || (all[type] = [])).push(item);
		},

		/**
		 * Remove an event handler for the given type.
		 *
		 * @param  {String} type	Type of event to unregister `handler` from, or `"*"`
		 * @param  {Function} handler Handler function to remove
		 * @memberOf mitt
		 */
		off: function off(type        , handler              ) {
			if (all[type]) {
				all[type].splice(all[type].map(function (item){ return item.handler; }).indexOf(handler) >>> 0, 1);
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
		emit: function emit(type        , evt     ) {
			if(type!=='*') {
				(all[type] || []).slice().sort(function (a,b){
					return a.priority - b.priority;
				}).forEach(function (item){ item.handler(type||'', evt);});
			}
			(all['*'] || []).slice().forEach(function (item){ item.handler(type||'', evt);});
		}
	};
}

module.exports = mitt;
