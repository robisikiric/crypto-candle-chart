"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePointSeriesWrapped = void 0;
var BasePointSeriesWrapped = /** @class */ (function () {
    function BasePointSeriesWrapped(dataSeries, yValues, valueType) {
        this.resampled = false;
        this.dataSeries = dataSeries;
        this.count = dataSeries.count();
        this.xValues = this.dataSeries.getXValues(valueType);
        this.yValues = yValues !== null && yValues !== void 0 ? yValues : this.dataSeries.getYValues(valueType);
        this.fifoStartIndex = dataSeries.fifoStartIndex;
    }
    Object.defineProperty(BasePointSeriesWrapped.prototype, "indexes", {
        get: function () {
            if (!this.indexesProperty) {
                this.indexesProperty = this.dataSeries.getNativeIndexes();
            }
            return this.indexesProperty;
        },
        enumerable: false,
        configurable: true
    });
    return BasePointSeriesWrapped;
}());
exports.BasePointSeriesWrapped = BasePointSeriesWrapped;
