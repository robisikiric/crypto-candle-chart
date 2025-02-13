"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObservableArray = exports.ObservableArrayBase = void 0;
var EventHandler_1 = require("./EventHandler");
var ObservableArrayChangedArgs_1 = require("./ObservableArrayChangedArgs");
/**
 * An Observable array which raises {@link collectionChanged} events when an item is added, removed or the collection cleared
 */
var ObservableArrayBase = /** @class */ (function () {
    /**
     * Creates an instance of the {@link ObservableArray}
     */
    function ObservableArrayBase() {
        this.items = [];
        this.collectionChanged = new EventHandler_1.EventHandler();
    }
    /**
     * gets the number of elements in the array
     */
    ObservableArrayBase.prototype.size = function () {
        return this.items.length;
    };
    /**
     * Adds items to the array, and raises the {@link collectionChanged} event to subscribers
     * @param items
     */
    ObservableArrayBase.prototype.add = function () {
        var _this = this;
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        items.forEach(function (item) { return _this.items.push(item); });
        this.collectionChanged.raiseEvent(new ObservableArrayChangedArgs_1.ObservableArrayChangedArgs(ObservableArrayChangedArgs_1.EObservableArrayChangedAction.Add, items, undefined));
    };
    /**
     * Returns the backing array.  Do not modify this collection.  Use add or remove instead.
     */
    ObservableArrayBase.prototype.asArray = function () {
        return this.items;
    };
    /**
     * Inserts items at the specified index. Raises the {@link collectionChanged} event to subscribers
     * @param index
     * @param item
     */
    ObservableArrayBase.prototype.insert = function (index, item) {
        if (index < 0) {
            index = 0;
        }
        if (index >= this.items.length) {
            this.add(item);
            return;
        }
        this.items.splice(index, 0, item);
        this.collectionChanged.raiseEvent(new ObservableArrayChangedArgs_1.ObservableArrayChangedArgs(ObservableArrayChangedArgs_1.EObservableArrayChangedAction.Add, [item], undefined));
    };
    /**
     * Returns true if the array contains an item
     * @param item
     */
    ObservableArrayBase.prototype.contains = function (item) {
        return this.items.includes(item);
    };
    /**
     * Removes an item at the specified index. Raises the {@link collectionChanged} event to subscribers
     * @param index The item to remove
     * @param callDeleteOnChildren When true, if the items in the array implement the {@link IDeletable} interface,
     * the delete() function will be called. Defaults to false for backward compatibility
     */
    ObservableArrayBase.prototype.removeAt = function (index, callDeleteOnChildren) {
        if (callDeleteOnChildren === void 0) { callDeleteOnChildren = false; }
        if (index < 0 || index >= this.items.length) {
            return;
        }
        var item = this.items[index];
        this.items.splice(index, 1);
        this.collectionChanged.raiseEvent(new ObservableArrayChangedArgs_1.ObservableArrayChangedArgs(ObservableArrayChangedArgs_1.EObservableArrayChangedAction.Remove, undefined, [item]));
        // @ts-ignore
        if (callDeleteOnChildren && (item === null || item === void 0 ? void 0 : item.delete))
            item.delete();
    };
    /**
     * Removes an item by value. Raises the {@link collectionChanged} event to subscribers
     * @param item The item to remove
     * @param callDeleteOnChildren When true, if the items in the array implement the {@link IDeletable} interface,
     * the delete() function will be called. Defaults to false for backward compatibility
     */
    ObservableArrayBase.prototype.remove = function (item, callDeleteOnChildren) {
        if (callDeleteOnChildren === void 0) { callDeleteOnChildren = false; }
        for (var index = 0; index < this.size(); index++) {
            if (this.items[index] === item) {
                this.removeAt(index, callDeleteOnChildren);
                break;
            }
        }
    };
    /**
     * Clears the array. Raises the {@link collectionChanged} event to subscribers
     * @param callDeleteOnChildren When true, if the items in the array implement the {@link IDeletable} interface,
     * the delete() function will be called. Defaults to false for backward compatibility
     */
    ObservableArrayBase.prototype.clear = function (callDeleteOnChildren) {
        if (callDeleteOnChildren === void 0) { callDeleteOnChildren = false; }
        var oldItems = this.items;
        this.items = [];
        this.collectionChanged.raiseEvent(new ObservableArrayChangedArgs_1.ObservableArrayChangedArgs(ObservableArrayChangedArgs_1.EObservableArrayChangedAction.Reset, undefined, oldItems));
        if (callDeleteOnChildren) {
            oldItems === null || oldItems === void 0 ? void 0 : oldItems.forEach(function (item) {
                // @ts-ignore
                if (item === null || item === void 0 ? void 0 : item.delete)
                    item.delete();
            });
        }
    };
    /**
     * Gets an item at index
     * @param index
     */
    ObservableArrayBase.prototype.get = function (index) {
        return this.items[index];
    };
    /**
     * Sets an item at index. Raises the {@link collectionChanged} event to subscribers
     * @param index
     * @param item
     */
    ObservableArrayBase.prototype.set = function (index, item) {
        this.items[index] = item;
        this.collectionChanged.raiseEvent(new ObservableArrayChangedArgs_1.ObservableArrayChangedArgs(ObservableArrayChangedArgs_1.EObservableArrayChangedAction.Replace, [item], undefined));
    };
    return ObservableArrayBase;
}());
exports.ObservableArrayBase = ObservableArrayBase;
var ObservableArray = /** @class */ (function (_super) {
    __extends(ObservableArray, _super);
    function ObservableArray() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets an item by Id
     * @param id
     */
    ObservableArray.prototype.getById = function (id) {
        return this.items.find(function (element) { return element.id === id; });
    };
    return ObservableArray;
}(ObservableArrayBase));
exports.ObservableArray = ObservableArray;
