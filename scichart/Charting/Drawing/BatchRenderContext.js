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
exports.BatchRenderContext = void 0;
var WebGlRenderContext2D_1 = require("./WebGlRenderContext2D");
var BatchRenderContext = /** @class */ (function (_super) {
    __extends(BatchRenderContext, _super);
    function BatchRenderContext() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.doDraw = false;
        return _this;
    }
    BatchRenderContext.prototype.drawLayers = function () {
        if (this.doDraw) {
            _super.prototype.drawLayers.call(this);
        }
    };
    BatchRenderContext.prototype.endFonts = function (force) {
        if (force === void 0) { force = false; }
        if (this.doDraw || force) {
            _super.prototype.endFonts.call(this);
        }
    };
    return BatchRenderContext;
}(WebGlRenderContext2D_1.WebGlRenderContext2D));
exports.BatchRenderContext = BatchRenderContext;
