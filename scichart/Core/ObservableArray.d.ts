import { EventHandler } from "./EventHandler";
import { ObservableArrayChangedArgs } from "./ObservableArrayChangedArgs";
/**
 * An Observable array which raises {@link collectionChanged} events when an item is added, removed or the collection cleared
 */
export declare class ObservableArrayBase<T> {
    /**
     * Event handler which fires when the collection changes. See {@link ObservableArrayChangedArgs} for args
     */
    readonly collectionChanged: EventHandler<ObservableArrayChangedArgs>;
    protected items: T[];
    /**
     * Creates an instance of the {@link ObservableArray}
     */
    constructor();
    /**
     * gets the number of elements in the array
     */
    size(): number;
    /**
     * Adds items to the array, and raises the {@link collectionChanged} event to subscribers
     * @param items
     */
    add(...items: T[]): void;
    /**
     * Returns the backing array.  Do not modify this collection.  Use add or remove instead.
     */
    asArray(): T[];
    /**
     * Inserts items at the specified index. Raises the {@link collectionChanged} event to subscribers
     * @param index
     * @param item
     */
    insert(index: number, item: T): void;
    /**
     * Returns true if the array contains an item
     * @param item
     */
    contains(item: T): boolean;
    /**
     * Removes an item at the specified index. Raises the {@link collectionChanged} event to subscribers
     * @param index The item to remove
     * @param callDeleteOnChildren When true, if the items in the array implement the {@link IDeletable} interface,
     * the delete() function will be called. Defaults to false for backward compatibility
     */
    removeAt(index: number, callDeleteOnChildren?: boolean): void;
    /**
     * Removes an item by value. Raises the {@link collectionChanged} event to subscribers
     * @param item The item to remove
     * @param callDeleteOnChildren When true, if the items in the array implement the {@link IDeletable} interface,
     * the delete() function will be called. Defaults to false for backward compatibility
     */
    remove(item: T, callDeleteOnChildren?: boolean): void;
    /**
     * Clears the array. Raises the {@link collectionChanged} event to subscribers
     * @param callDeleteOnChildren When true, if the items in the array implement the {@link IDeletable} interface,
     * the delete() function will be called. Defaults to false for backward compatibility
     */
    clear(callDeleteOnChildren?: boolean): void;
    /**
     * Gets an item at index
     * @param index
     */
    get(index: number): T;
    /**
     * Sets an item at index. Raises the {@link collectionChanged} event to subscribers
     * @param index
     * @param item
     */
    set(index: number, item: T): void;
}
export declare class ObservableArray<T extends {
    id: string;
}> extends ObservableArrayBase<T> {
    /**
     * Gets an item by Id
     * @param id
     */
    getById(id: string): T;
}
