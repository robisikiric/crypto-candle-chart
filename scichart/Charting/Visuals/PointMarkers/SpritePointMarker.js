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
exports.SpritePointMarker = void 0;
var PointMarkerType_1 = require("../../../types/PointMarkerType");
var CustomPointMarkerStyle_1 = require("../RenderableSeries/Animations/CustomPointMarkerStyle");
var BasePointMarker_1 = require("./BasePointMarker");
var Constants_1 = require("./Constants");
/**
 * @summary Point-marker type which renders a custom image provided by {@link HTMLImageElement} at each x-y datapoint location
 * @remarks
 * To apply the SpritePointMarker to a {@link IRenderableSeries}, use the following code:
 *
 * ```ts
 * import {createImageAsync} from "SCICHART_ROOT/src/utils/imageUtil";
 * import customPointImage from "./CustomMarkerImage.png";
 * const sciChartSurface: SciChartSurface;
 * const wasmContext: TSciChart;
 * const imageBitmap = await createImageAsync(customPointImage);
 * sciChartSurface.renderableSeries.add(new FastLineRenderableSeries(wasmContext, {
 *              pointMarker: new SpritePointMarker(wasmContext, {
 *                  image: imageBitmap
 *              })
 * }));
 * ```
 */
var SpritePointMarker = /** @class */ (function (_super) {
    __extends(SpritePointMarker, _super);
    /**
     * Creates an instance of the {@link SpritePointMarker}
     * @param webAssemblyContext The {@link TSciChart | SciChart 2D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     * @param options Optional parameters of type {@link ISpritePointMarkerOptions} used to configure the point-marker at instantiation time
     */
    function SpritePointMarker(webAssemblyContext, options) {
        var _this = _super.call(this, webAssemblyContext, options) || this;
        /**
         * @inheritDoc
         */
        _this.type = PointMarkerType_1.EPointMarkerType.Sprite;
        _this.image = options === null || options === void 0 ? void 0 : options.image;
        // Set the width and height after setting the image
        if (options === null || options === void 0 ? void 0 : options.width) {
            _this.width = options.width;
        }
        if (options === null || options === void 0 ? void 0 : options.height) {
            _this.height = options.height;
        }
        return _this;
    }
    Object.defineProperty(SpritePointMarker.prototype, "image", {
        /**
         * Gets or sets the image to draw at each x-y point as an {@link HTMLImageElement}
         */
        get: function () {
            return this.imageProperty;
        },
        /**
         * Gets or sets the image to draw at each x-y point as an {@link HTMLImageElement}
         */
        set: function (image) {
            var oldValue = this.imageProperty;
            this.imageProperty = image;
            if (this.imageProperty) {
                this.width = this.imageProperty.width;
                this.height = this.imageProperty.height;
            }
            this.notifyPropertyChanged(Constants_1.PROPERTY.IMAGE, image, oldValue);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @inheritDoc
     */
    SpritePointMarker.prototype.drawSprite = function (context, spriteWidth, spriteHeight, stroke, strokeThickness, fill) {
        var centerX = context.canvas.width / 2;
        var centerY = context.canvas.height / 2;
        var halfHeight = this.height / 2;
        var halfWidth = this.width / 2;
        if (this.image) {
            context.drawImage(this.image, centerX - halfWidth, centerY - halfHeight, this.width, this.height);
        }
    };
    SpritePointMarker.prototype.getPointMarkerStyle = function () {
        return new CustomPointMarkerStyle_1.CustomPointMarkerStyle({
            type: this.type,
            width: this.width,
            height: this.height,
            image: this.image
        });
    };
    SpritePointMarker.prototype.toJSON = function () {
        var json = _super.prototype.toJSON.call(this);
        var options = {
            image: this.image
        };
        Object.assign(json.options, options);
        return json;
    };
    return SpritePointMarker;
}(BasePointMarker_1.BasePointMarker));
exports.SpritePointMarker = SpritePointMarker;
