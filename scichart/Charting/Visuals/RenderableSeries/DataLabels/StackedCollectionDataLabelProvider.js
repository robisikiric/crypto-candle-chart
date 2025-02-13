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
exports.StackedCollectionDataLabelProvider = void 0;
var BaseDataLabelProvider_1 = require("./BaseDataLabelProvider");
var StackedCollectionDataLabelProvider = /** @class */ (function (_super) {
    __extends(StackedCollectionDataLabelProvider, _super);
    function StackedCollectionDataLabelProvider() {
        return _super.call(this) || this;
    }
    StackedCollectionDataLabelProvider.prototype.generateDataLabels = function (renderContext, renderPassData) {
        // Nothing needed here
    };
    StackedCollectionDataLabelProvider.prototype.draw = function (renderContext) {
        for (var _i = 0, _a = this.parentSeries.asArray(); _i < _a.length; _i++) {
            var series = _a[_i];
            if (series.isVisible) {
                series.dataLabelProvider.draw(renderContext);
            }
        }
    };
    return StackedCollectionDataLabelProvider;
}(BaseDataLabelProvider_1.BaseDataLabelProvider));
exports.StackedCollectionDataLabelProvider = StackedCollectionDataLabelProvider;
