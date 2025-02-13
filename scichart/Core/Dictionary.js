"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dictionary = void 0;
/**
 * Generic dictionary class keyed by string
 */
var Dictionary = /** @class */ (function () {
    function Dictionary() {
        this.items = {};
        this.countProperty = 0;
    }
    /**
     * @inheritDoc
     */
    Dictionary.prototype.containsKey = function (key) {
        return this.items.hasOwnProperty(key);
    };
    Object.defineProperty(Dictionary.prototype, "count", {
        /**
         * @inheritDoc
         */
        get: function () {
            return this.countProperty;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @inheritDoc
     */
    Dictionary.prototype.add = function (key, value) {
        if (!this.items.hasOwnProperty(key)) {
            this.countProperty++;
        }
        this.items[key] = value;
    };
    /**
     * @inheritDoc
     */
    Dictionary.prototype.remove = function (key) {
        var val = this.items[key];
        delete this.items[key];
        this.countProperty--;
        return val;
    };
    /**
     * @inheritDoc
     */
    Dictionary.prototype.item = function (key) {
        return this.items[key];
    };
    Object.defineProperty(Dictionary.prototype, "keys", {
        /**
         * @inheritDoc
         */
        get: function () {
            return Object.keys(this.items);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Dictionary.prototype, "values", {
        /**
         * @inheritDoc
         */
        get: function () {
            var _this = this;
            return this.keys.map(function (key) { return _this.items[key]; });
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Clears the dictionary
     */
    Dictionary.prototype.clear = function () {
        this.items = {};
        this.countProperty = 0;
    };
    return Dictionary;
}());
exports.Dictionary = Dictionary;
