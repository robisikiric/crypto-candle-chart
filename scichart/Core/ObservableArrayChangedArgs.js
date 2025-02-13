"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObservableArrayChangedArgs = exports.EObservableArrayChangedAction = void 0;
/**
 * An action which occurred when a {@link ObservableArray} was updated
 */
var EObservableArrayChangedAction;
(function (EObservableArrayChangedAction) {
    /**
     * One or more items was added. Check the {@link ObservableArrayChangedArgs.newItems} property for which items
     */
    EObservableArrayChangedAction[EObservableArrayChangedAction["Add"] = 0] = "Add";
    /**
     * One or more items were removed. Check the {@link ObservableArrayChangedArgs.oldItems} property for which items
     */
    EObservableArrayChangedAction[EObservableArrayChangedAction["Remove"] = 1] = "Remove";
    /**
     * One or more items were replaced. Check the {@link ObservableArrayChangedArgs.newItems} and
     * {@link ObservableArrayChangedArgs.oldItems} properties for which items
     */
    EObservableArrayChangedAction[EObservableArrayChangedAction["Replace"] = 2] = "Replace";
    /**
     * Treat this as a new collection (collection drastically changed). Consider all old items removed and all items as new
     */
    EObservableArrayChangedAction[EObservableArrayChangedAction["Reset"] = 3] = "Reset";
})(EObservableArrayChangedAction = exports.EObservableArrayChangedAction || (exports.EObservableArrayChangedAction = {}));
/**
 * Event args used by the {@link ObservableArray.collectionChanged} event
 */
var ObservableArrayChangedArgs = /** @class */ (function () {
    /**
     * Creates an instance of the {@link ObservableArrayChangedArgs}
     * @param action
     * @param newItems
     * @param oldItems
     */
    function ObservableArrayChangedArgs(action, newItems, oldItems) {
        this.action = action;
        this.oldItems = oldItems;
        this.newItems = newItems;
    }
    /**
     * Gets the operation that occurred on the {@link ObservableArray}. See {@link EObservableArrayChangedAction} for a
     * list of values
     */
    ObservableArrayChangedArgs.prototype.getAction = function () {
        return this.action;
    };
    /**
     * Gets new items added if the {@link EObservableArrayChangedAction} was Add or Replace
     */
    ObservableArrayChangedArgs.prototype.getNewItems = function () {
        return this.newItems;
    };
    /**
     * Gets old items removed if the {@link EObservableArrayChangedAction} was Remove or Replace
     */
    ObservableArrayChangedArgs.prototype.getOldItems = function () {
        return this.oldItems;
    };
    return ObservableArrayChangedArgs;
}());
exports.ObservableArrayChangedArgs = ObservableArrayChangedArgs;
