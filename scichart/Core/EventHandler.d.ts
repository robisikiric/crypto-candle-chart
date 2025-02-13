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
export interface IEventHandler<T> {
    /**
     * Subscribes to the event
     * @param handler
     */
    subscribe(handler: (data?: T) => void): void;
    /**
     * Unsubscribes from the event
     * @param handler
     */
    unsubscribe(handler: (data?: T) => void): void;
}
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
export declare class EventHandler<T> implements IEventHandler<T> {
    private handlers;
    /**
     * Subscribes to the event
     * @param handler
     */
    subscribe(handler: (data?: T) => void): void;
    /**
     * Unsubscribes from the event
     * @param handler
     */
    unsubscribe(handler: (data?: T) => void): void;
    /**
     * Unsubscribes all handlers from the event
     */
    unsubscribeAll(): void;
    /**
     * Raises the event with the provided data object
     * @param data
     */
    raiseEvent(data?: T): void;
}
