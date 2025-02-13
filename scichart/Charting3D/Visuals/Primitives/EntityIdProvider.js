"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultEntityIdProvider = void 0;
/**
 * Default implementation of {@link IEntityIdProvider}. This implementation generates Ids from 0 to 4 billion
 * and does not recycle Ids. If you encounter the error "The max Mesh ID has been exceeded", you can override
 * releaseEntityId to create a more sophisticated IdProvider to recycle Ids.
 */
var DefaultEntityIdProvider = /** @class */ (function () {
    function DefaultEntityIdProvider() {
        this.currentId = -1;
        this.maxId = 4294967295; // UInt32.MaxValue
    }
    /** @inheritdoc */
    DefaultEntityIdProvider.prototype.getNextEntityId = function () {
        var id = ++this.currentId;
        if (id >= this.maxId) {
            throw new Error("The max Mesh ID has been exceeded.  Please see https://www.scichart.com/questions/wpf/maximum-mesh-id");
        }
        return id;
    };
    /** @inheritdoc */
    DefaultEntityIdProvider.prototype.releaseEntityId = function (id) {
        // placeholder for users to override and recycle Ids
    };
    return DefaultEntityIdProvider;
}());
exports.DefaultEntityIdProvider = DefaultEntityIdProvider;
