"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventHandler = void 0;
/**
 * An EventHandler is a generic class that enables subscription, unsubscription to an event
 * @description
 * Declare an event as a property in your class like this
 * ```ts
 * public class MyCLass {
 *     public EventHandler<string> someEvent = new EventHandler<string>();
 * }
 * ```
 *
 * Subscribe to the event like this
 * ```ts
 * const myClass = new MyClass();
 * myClass.subscribe((event) => {
 *    console.log(event);
 * });
 * ```
 *
 * Publish an event like this
 * ```ts
 * const myClass = new MyClass();
 * myClass.raiseEvent("Hi there!");
 * ```
 */
var EventHandler = /** @class */ (function () {
    function EventHandler() {
        this.handlers = [];
    }
    /**
     * Subscribes to the event
     * @param handler
     */
    EventHandler.prototype.subscribe = function (handler) {
        if (!this.handlers.includes(handler)) {
            this.handlers.push(handler);
        }
    };
    /**
     * Unsubscribes from the event
     * @param handler
     */
    EventHandler.prototype.unsubscribe = function (handler) {
        this.handlers = this.handlers.filter(function (h) { return h !== handler; });
    };
    /**
     * Unsubscribes all handlers from the event
     */
    EventHandler.prototype.unsubscribeAll = function () {
        this.handlers = [];
    };
    /**
     * Raises the event with the provided data object
     * @param data
     */
    EventHandler.prototype.raiseEvent = function (data) {
        this.handlers.slice(0).forEach(function (h) { return h(data); });
    };
    return EventHandler;
}());
exports.EventHandler = EventHandler;
