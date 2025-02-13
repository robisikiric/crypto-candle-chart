"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
/**
 * Generic class for a dynamic List or array
 */
var List = /** @class */ (function () {
    function List() {
        this.items = [];
    }
    /**
     * gets the list size
     */
    List.prototype.size = function () {
        return this.items.length;
    };
    /**
     * Adds an item to the list
     * @param value
     */
    List.prototype.add = function (value) {
        this.items.push(value);
    };
    /**
     * gets the item at index
     * @param index
     */
    List.prototype.get = function (index) {
        return this.items[index];
    };
    return List;
}());
exports.List = List;
