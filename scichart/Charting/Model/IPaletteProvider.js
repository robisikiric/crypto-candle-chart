"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultPaletteProvider = exports.EFillPaletteMode = exports.EStrokePaletteMode = void 0;
var EStrokePaletteMode;
(function (EStrokePaletteMode) {
    EStrokePaletteMode["GRADIENT"] = "GRADIENT";
    EStrokePaletteMode["SOLID"] = "SOLID";
})(EStrokePaletteMode = exports.EStrokePaletteMode || (exports.EStrokePaletteMode = {}));
var EFillPaletteMode;
(function (EFillPaletteMode) {
    EFillPaletteMode["GRADIENT"] = "GRADIENT";
    EFillPaletteMode["SOLID"] = "SOLID";
})(EFillPaletteMode = exports.EFillPaletteMode || (exports.EFillPaletteMode = {}));
/**
 * A Default Palette provider is applied to the {@link BaseRenderableSeries.paletteProvider} property in the constructor
 * however all its functions such as {@link DefaultPaletteProvider.overrideFillArgb}, {@link DefaultPaletteProvider.overrideStrokeArgb}
 * etc... are set to undefined. This allows a user to do quick one-line paletteproviders in vanilla Javascript like this:
 *
 * ```javascript
 * const series = new FastLineRenderableSeries(wasmContext);
 * series.paletteProvider.overrideFillArgb = (xValue, yValue, index) => {
 *     return yValue > 0 ? parseColorToUIntArgb("white") : undefined;
 * }
 * ```
 */
var DefaultPaletteProvider = /** @class */ (function () {
    function DefaultPaletteProvider() {
        this.strokePaletteMode = EStrokePaletteMode.GRADIENT;
        this.fillPaletteMode = EFillPaletteMode.GRADIENT;
    }
    DefaultPaletteProvider.createEmpty = function () {
        var pp = new DefaultPaletteProvider();
        pp.overrideFillArgb = undefined;
        pp.overrideStrokeArgb = undefined;
        pp.overridePointMarkerArgb = undefined;
        return pp;
    };
    /**
     * @inheritDoc
     */
    DefaultPaletteProvider.prototype.onAttached = function (parentSeries) {
        this.parentSeries = parentSeries;
    };
    /**
     * @inheritDoc
     */
    DefaultPaletteProvider.prototype.onDetached = function () {
        this.parentSeries = undefined;
    };
    Object.defineProperty(DefaultPaletteProvider.prototype, "isRangeIndependant", {
        /**
         * @inheritDoc
         */
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @inheritDoc
     */
    DefaultPaletteProvider.prototype.shouldUpdatePalette = function () {
        return true;
    };
    /**
     * @inheritDoc
     */
    DefaultPaletteProvider.prototype.overrideFillArgb = function (xValue, yValue, index, opacity, metadata) {
        return undefined;
    };
    /**
     * @inheritDoc
     */
    DefaultPaletteProvider.prototype.overrideStrokeArgb = function (xValue, yValue, index, opacity, metadata) {
        return undefined;
    };
    /**
     * @inheritDoc
     */
    DefaultPaletteProvider.prototype.overridePointMarkerArgb = function (xValue, yValue, index, opacity, metadata) {
        return undefined;
    };
    DefaultPaletteProvider.prototype.toJSON = function () {
        // No need to serialise this as it is created automaticaly if a palletprovider is not specified.
        return undefined;
    };
    return DefaultPaletteProvider;
}());
exports.DefaultPaletteProvider = DefaultPaletteProvider;
