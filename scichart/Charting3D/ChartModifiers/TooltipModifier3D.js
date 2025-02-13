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
exports.adjustTooltipPosition3D = exports.TooltipModifier3D = void 0;
var CursorModifier_1 = require("../../Charting/ChartModifiers/CursorModifier");
var AnnotationBase_1 = require("../../Charting/Visuals/Annotations/AnnotationBase");
var Deleter_1 = require("../../Core/Deleter");
var ChartModifierType_1 = require("../../types/ChartModifierType");
var translate_1 = require("../../utils/translate");
var BaseDataSeries3D_1 = require("../Model/DataSeries/BaseDataSeries3D");
var TooltipSvgAnnotation3D_1 = require("../Visuals/Annotations/TooltipSvgAnnotation3D");
var CrosshairLinesSceneEntity_1 = require("../Visuals/Primitives/CrosshairLinesSceneEntity");
var ChartModifierBase3D_1 = require("./ChartModifierBase3D");
var TooltipModifier3D = /** @class */ (function (_super) {
    __extends(TooltipModifier3D, _super);
    function TooltipModifier3D(options) {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        _this = _super.call(this, options) || this;
        /**
         * @inheritDoc
         */
        _this.type = ChartModifierType_1.EChart3DModifierType.Tooltip;
        /**
         * Gets or sets whether we should display the tooltip. Default is true
         */
        _this.showTooltip = true;
        _this.includedSeriesMap = new Map();
        _this.tooltipSvgTemplateProperty = defaultTooltipTemplate3D;
        _this.tooltipContainerBackgroundProperty = "#228B22";
        _this.tooltipTextStrokeProperty = "#fff";
        _this.tooltipDataTemplateProperty = defaultTooltipDataTemplate3D;
        _this.crosshairStrokeProperty = (_a = options === null || options === void 0 ? void 0 : options.crosshairStroke) !== null && _a !== void 0 ? _a : "#FF6600";
        _this.crosshairStrokeThicknessProperty = (_b = options === null || options === void 0 ? void 0 : options.crosshairStrokeThickness) !== null && _b !== void 0 ? _b : 2;
        _this.isCrosshairVisibleProperty = (_c = options === null || options === void 0 ? void 0 : options.isCrosshairVisible) !== null && _c !== void 0 ? _c : true;
        if (options === null || options === void 0 ? void 0 : options.tooltipSvgTemplate) {
            if (typeof options.tooltipSvgTemplate === "string") {
                _this.typeMap.set("tooltipSvgTemplate", options.tooltipSvgTemplate);
                // @ts-ignore
                options.tooltipSvgTemplate = getFunction(EBaseType.OptionFunction, options.tooltipSvgTemplate);
            }
        }
        _this.tooltipSvgTemplateProperty =
            (_d = options === null || options === void 0 ? void 0 : options.tooltipSvgTemplate) !== null && _d !== void 0 ? _d : _this.tooltipSvgTemplateProperty;
        _this.tooltipContainerBackgroundProperty =
            (_e = options === null || options === void 0 ? void 0 : options.tooltipContainerBackground) !== null && _e !== void 0 ? _e : _this.tooltipContainerBackgroundProperty;
        _this.tooltipTextStrokeProperty = (_f = options === null || options === void 0 ? void 0 : options.tooltipTextStroke) !== null && _f !== void 0 ? _f : _this.tooltipTextStrokeProperty;
        _this.showTooltip = (_g = options === null || options === void 0 ? void 0 : options.showTooltip) !== null && _g !== void 0 ? _g : _this.showTooltip;
        _this.placementDivIdProperty = (_h = options === null || options === void 0 ? void 0 : options.placementDivId) !== null && _h !== void 0 ? _h : _this.placementDivIdProperty;
        if (options === null || options === void 0 ? void 0 : options.tooltipLegendTemplate) {
            if (typeof options.tooltipLegendTemplate === "string") {
                _this.typeMap.set("tooltipLegendTemplate", options.tooltipLegendTemplate);
                // @ts-ignore
                options.tooltipLegendTemplate = getFunction(EBaseType.OptionFunction, options.tooltipLegendTemplate);
            }
        }
        _this.tooltipLegendTemplateProperty =
            (_j = options === null || options === void 0 ? void 0 : options.tooltipLegendTemplate) !== null && _j !== void 0 ? _j : _this.tooltipLegendTemplateProperty;
        _this.tooltipLegendOffsetXProperty = (_k = options === null || options === void 0 ? void 0 : options.tooltipLegendOffsetX) !== null && _k !== void 0 ? _k : _this.tooltipLegendOffsetX;
        _this.tooltipLegendOffsetYProperty = (_l = options === null || options === void 0 ? void 0 : options.tooltipLegendOffsetY) !== null && _l !== void 0 ? _l : _this.tooltipLegendOffsetY;
        if (options === null || options === void 0 ? void 0 : options.tooltipDataTemplate) {
            if (typeof options.tooltipDataTemplate === "string") {
                _this.typeMap.set("tooltipDataTemplate", options.tooltipDataTemplate);
                // @ts-ignore
                options.tooltipDataTemplate = getFunction(EBaseType.OptionFunction, options.tooltipDataTemplate);
            }
        }
        _this.tooltipDataTemplateProperty =
            (_m = options === null || options === void 0 ? void 0 : options.tooltipDataTemplate) !== null && _m !== void 0 ? _m : _this.tooltipDataTemplateProperty;
        return _this;
    }
    TooltipModifier3D.prototype.includeSeries = function (series, isIncluded) {
        this.includedSeriesMap.set(series, isIncluded);
        // this.tooltipAnnotation.seriesInfos = this.getSeriesInfos();
    };
    TooltipModifier3D.prototype.getIncludedSeries = function () {
        var _this = this;
        return this.parentSurface.renderableSeries
            .asArray()
            .filter(function (rs) { return rs.isVisible && _this.includedSeriesMap.get(rs) !== false; });
    };
    Object.defineProperty(TooltipModifier3D.prototype, "isCrosshairVisible", {
        /**
         * When true, a crosshair line will be displayed from the hovered point location to the far axis wall
         * @param isVisible
         */
        get: function () {
            return this.isCrosshairVisibleProperty;
        },
        /**
         * When true, a crosshair line will be displayed from the hovered point location to the far axis wall
         * @param isVisible
         */
        set: function (isVisible) {
            var _a;
            this.isCrosshairVisibleProperty = isVisible;
            (_a = this.parentSurface) === null || _a === void 0 ? void 0 : _a.invalidateElement();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TooltipModifier3D.prototype, "crosshairStroke", {
        /**
         * Gets or sets the stroke color of the crosshair as an HTML Color code
         * @param stroke
         */
        get: function () {
            return this.crosshairStrokeProperty;
        },
        /**
         * Gets or sets the stroke color of the crosshair as an HTML Color code
         * @param stroke
         */
        set: function (stroke) {
            var _a;
            this.crosshairStrokeProperty = stroke;
            (_a = this.parentSurface) === null || _a === void 0 ? void 0 : _a.invalidateElement();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TooltipModifier3D.prototype, "crosshairStrokeThickness", {
        /**
         * Gets or sets the strokethickness of the crosshair line
         */
        get: function () {
            return this.crosshairStrokeThicknessProperty;
        },
        /**
         * Gets or sets the strokethickness of the crosshair line
         */
        set: function (strokeThickness) {
            var _a;
            this.crosshairStrokeThicknessProperty = strokeThickness;
            (_a = this.parentSurface) === null || _a === void 0 ? void 0 : _a.invalidateElement();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TooltipModifier3D.prototype, "tooltipSvgTemplate", {
        get: function () {
            return this.tooltipSvgTemplateProperty;
        },
        set: function (value) {
            this.tooltipSvgTemplateProperty = value;
            if (this.tooltipAnnotation) {
                this.tooltipAnnotation.tooltipSvgTemplate = value;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TooltipModifier3D.prototype, "tooltipLegendTemplate", {
        get: function () {
            return this.tooltipLegendTemplateProperty;
        },
        set: function (value) {
            this.tooltipLegendTemplateProperty = value;
            if (this.tooltipAnnotation) {
                this.tooltipAnnotation.tooltipLegendTemplate = value;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TooltipModifier3D.prototype, "tooltipDataTemplate", {
        get: function () {
            return this.tooltipDataTemplateProperty;
        },
        set: function (value) {
            this.tooltipDataTemplateProperty = value;
            if (this.tooltipAnnotation) {
                this.tooltipAnnotation.tooltipDataTemplate = value;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TooltipModifier3D.prototype, "tooltipContainerBackground", {
        get: function () {
            return this.tooltipContainerBackgroundProperty;
        },
        set: function (value) {
            if (this.tooltipContainerBackgroundProperty !== value) {
                this.tooltipContainerBackgroundProperty = value;
                if (this.tooltipAnnotation) {
                    this.tooltipAnnotation.containerBackground = value;
                }
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TooltipModifier3D.prototype, "tooltipLegendOffsetX", {
        get: function () {
            return this.tooltipLegendOffsetXProperty;
        },
        set: function (value) {
            if (this.tooltipLegendOffsetXProperty !== value) {
                this.tooltipLegendOffsetXProperty = value;
                if (this.tooltipAnnotation) {
                    this.tooltipAnnotation.tooltipLegendOffsetX = value;
                }
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TooltipModifier3D.prototype, "tooltipLegendOffsetY", {
        get: function () {
            return this.tooltipLegendOffsetYProperty;
        },
        set: function (value) {
            if (this.tooltipLegendOffsetYProperty !== value) {
                this.tooltipLegendOffsetYProperty = value;
                if (this.tooltipAnnotation) {
                    this.tooltipAnnotation.tooltipLegendOffsetY = value;
                }
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TooltipModifier3D.prototype, "tooltipTextStroke", {
        get: function () {
            return this.tooltipTextStrokeProperty;
        },
        set: function (value) {
            if (this.tooltipTextStrokeProperty !== value) {
                this.tooltipTextStrokeProperty = value;
                if (this.tooltipAnnotation) {
                    this.tooltipAnnotation.textStroke = value;
                }
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TooltipModifier3D.prototype, "placementDivId", {
        /**
         * Gets or sets the parent div element reference or id for the Tooltip
         */
        get: function () {
            return this.placementDivIdProperty;
        },
        /**
         * Gets or sets the parent div element reference or id for the Tooltip
         */
        set: function (value) {
            if (this.placementDivIdProperty !== value) {
                this.placementDivIdProperty = value;
                this.notifyPropertyChanged("PLACEMENT_DIV_ID");
            }
        },
        enumerable: false,
        configurable: true
    });
    /** @inheritDoc */
    TooltipModifier3D.prototype.onAttach = function () {
        _super.prototype.onAttach.call(this);
        if (this.parentSurface) {
            // Globally enable hit-test and selection pass (comes with a minor performance hit)
            this.parentSurface.isHitTestEnabled = true;
            // Create Crosshair entity and add to the scene
            this.crosshairEntity = (0, Deleter_1.deleteSafe)(this.crosshairEntity);
            this.crosshairEntity = new CrosshairLinesSceneEntity_1.CrosshairLinesSceneEntity(this.parentSurface.webAssemblyContext3D);
            this.parentSurface.rootEntity.children.add(this.crosshairEntity);
            this.tooltipAnnotation = new TooltipSvgAnnotation3D_1.TooltipSvgAnnotation3D({
                xCoordinateMode: AnnotationBase_1.ECoordinateMode.Pixel,
                yCoordinateMode: AnnotationBase_1.ECoordinateMode.Pixel,
                tooltipSvgTemplate: this.tooltipSvgTemplate,
                containerBackground: this.tooltipContainerBackground,
                textStroke: this.tooltipTextStroke,
                tooltipLegendTemplate: this.tooltipLegendTemplate,
                tooltipLegendOffsetX: this.tooltipLegendOffsetX,
                tooltipLegendOffsetY: this.tooltipLegendOffsetY,
                placementDivId: this.placementDivId,
                tooltipDataTemplate: this.tooltipDataTemplate
            });
            this.parentSurface.modifierAnnotations.add(this.tooltipAnnotation);
        }
    };
    /** @inheritDoc */
    TooltipModifier3D.prototype.onDetach = function () {
        _super.prototype.onDetach.call(this);
        if (this.parentSurface) {
            this.parentSurface.rootEntity.children.remove(this.crosshairEntity);
            this.tooltipAnnotation.delete();
            this.parentSurface.modifierAnnotations.remove(this.tooltipAnnotation);
        }
        this.crosshairEntity = (0, Deleter_1.deleteSafe)(this.crosshairEntity);
    };
    /** @inheritDoc */
    TooltipModifier3D.prototype.modifierMouseMove = function (args) {
        this.activePointerEvents.set(args.pointerId, args);
        _super.prototype.modifierMouseMove.call(this, args);
        if (this.getIsActionAllowed(args)) {
            this.update();
        }
    };
    TooltipModifier3D.prototype.onParentSurfaceRendered = function () {
        this.update();
    };
    TooltipModifier3D.prototype.update = function () {
        var _this = this;
        var _a, _b, _c, _d, _e;
        if (!this.mousePoint)
            return;
        var _f = this.mousePoint, x = _f.x, y = _f.y;
        var seriesInfo = this.getIncludedSeries()
            .map(function (rs) { return rs.hitTest(_this.mousePoint); })
            .find(function (result) { return result.isHit; });
        if (seriesInfo === null || seriesInfo === void 0 ? void 0 : seriesInfo.isHit) {
            // console.log(`TooltipModifier3D: HitTest at (${x}, ${y})`);
            var xyzSeriesInfo = seriesInfo;
            // if (xyzSeriesInfo.dataSeriesIndex) {
            //     console.log(`... XYZ Series hit = ${seriesInfo.dataSeriesName ?? "Unknown"}`);
            //     console.log(`... Index at ${xyzSeriesInfo.dataSeriesIndex}`);
            //     console.log(`... World coords at ${seriesInfo.hitWorldCoords.toString()}`);
            //     console.log(`... Data at ${seriesInfo.xValue}, ${seriesInfo.yValue}, ${seriesInfo.zValue}`);
            // }
            // const heightMapSeriesInfo = seriesInfo as SurfaceMeshSeriesInfo3D;
            // if (heightMapSeriesInfo.xIndex && heightMapSeriesInfo.zIndex) {
            //     console.log(`... Mesh Series hit = ${seriesInfo.dataSeriesName ?? "Unknown"}`);
            //     console.log(`... X,Z index at ${heightMapSeriesInfo.xIndex}, ${heightMapSeriesInfo.zIndex}`);
            //     console.log(`... World coords at ${seriesInfo.hitWorldCoords.toString()}`);
            //     console.log(`... Data at ${seriesInfo.yValue}, ${seriesInfo.yValue}, ${seriesInfo.zValue}`);
            // }
            if (this.crosshairEntity && this.isCrosshairVisible) {
                this.crosshairEntity.worldDimensions = (_a = this.parentSurface) === null || _a === void 0 ? void 0 : _a.worldDimensions;
                this.crosshairEntity.cameraPosition = (_c = (_b = this.parentSurface) === null || _b === void 0 ? void 0 : _b.camera) === null || _c === void 0 ? void 0 : _c.position;
                this.crosshairEntity.stroke = this.crosshairStroke;
                this.crosshairEntity.strokeThickness = this.crosshairStrokeThickness;
                this.crosshairEntity.location = seriesInfo.hitWorldCoords;
                this.crosshairEntity.isVisible = this.isCrosshairVisible;
                (_d = this.parentSurface) === null || _d === void 0 ? void 0 : _d.invalidateElement();
            }
            this.tooltipAnnotation.isHidden = !this.showTooltip;
            if (this.showTooltip) {
                var xt = (0, translate_1.translateToNotScaled)(x);
                var yt = (0, translate_1.translateToNotScaled)(y);
                this.tooltipAnnotation.x1 = xt;
                this.tooltipAnnotation.y1 = yt;
            }
            if (this.showTooltip || this.tooltipLegendTemplate) {
                this.tooltipAnnotation.seriesInfo = seriesInfo;
            }
        }
        else {
            this.tooltipAnnotation.seriesInfo = undefined;
            this.crosshairEntity.isVisible = false;
            this.tooltipAnnotation.isHidden = true;
            (_e = this.parentSurface) === null || _e === void 0 ? void 0 : _e.invalidateElement();
        }
    };
    return TooltipModifier3D;
}(ChartModifierBase3D_1.ChartModifierBase3D));
exports.TooltipModifier3D = TooltipModifier3D;
/** @ignore */
var defaultTooltipDataTemplate3D = function (seriesInfo, svgAnnotation) {
    var valuesWithLabels = [];
    if (svgAnnotation.title) {
        valuesWithLabels.push(svgAnnotation.title);
    }
    if (seriesInfo && seriesInfo.isHit) {
        if (seriesInfo.dataSeriesName) {
            valuesWithLabels.push(seriesInfo.dataSeriesName);
        }
        if (seriesInfo.dataSeriesType === BaseDataSeries3D_1.EDataSeriesType3D.Xyz3D) {
            valuesWithLabels.push("X: ".concat(seriesInfo.xValue));
            valuesWithLabels.push("Y: ".concat(seriesInfo.yValue));
            valuesWithLabels.push("Z: ".concat(seriesInfo.zValue));
        }
        else if (seriesInfo.dataSeriesType === BaseDataSeries3D_1.EDataSeriesType3D.UniformGrid3D) {
            valuesWithLabels.push("X: ".concat(seriesInfo.xValue));
            valuesWithLabels.push("Y: ".concat(seriesInfo.yValue));
            valuesWithLabels.push("Z: ".concat(seriesInfo.zValue));
        }
    }
    return valuesWithLabels;
};
/** @ignore */
var defaultTooltipTemplate3D = function (seriesInfos, svgAnnotation) {
    var _a;
    var id = "id_".concat(Date.now());
    var tooltipDataTemplate = (_a = svgAnnotation.tooltipDataTemplate) !== null && _a !== void 0 ? _a : defaultTooltipDataTemplate3D;
    var valuesWithLabels = tooltipDataTemplate(seriesInfos, svgAnnotation);
    if (valuesWithLabels.length === 0) {
        return "<svg></svg>";
    }
    // tooltip size
    var _b = (0, CursorModifier_1.calcTooltipSize)(valuesWithLabels), width = _b.width, height = _b.height;
    // adjust position
    (0, exports.adjustTooltipPosition3D)(width, height, svgAnnotation);
    var valuesBlock = "";
    valuesWithLabels.forEach(function (val, index) {
        valuesBlock += "<tspan x=\"8\" dy=\"1.2em\">".concat(val, "</tspan>");
    });
    var tooltipFill = svgAnnotation.containerBackground;
    var tooltipStroke = svgAnnotation.textStroke;
    return "<svg class=\"scichart__cursor-tooltip\" width=\"".concat(width, "\" height=\"").concat(height, "\">\n        <defs>\n            <filter id=\"").concat(id, "\" x=\"0\" y=\"0\" width=\"200%\" height=\"200%\">\n                <feOffset result=\"offOut\" in=\"SourceAlpha\" dx=\"3\" dy=\"3\" />\n                <feGaussianBlur result=\"blurOut\" in=\"offOut\" stdDeviation=\"3\" />\n                <feBlend in=\"SourceGraphic\" in2=\"blurOut\" mode=\"normal\" />\n            </filter>\n        </defs>\n        <rect rx=\"4\" ry=\"4\" width=\"95%\" height=\"90%\" fill=\"").concat(tooltipFill, "\" filter=\"url(#").concat(id, ")\" />\n        <svg width=\"100%\">\n            <text x=\"8\" y=\"3\" font-size=\"13\" font-family=\"Verdana\" dy=\"0\" fill=\"").concat(tooltipStroke, "\">").concat(valuesBlock, "</text>\n        </svg>\n    </svg>");
};
/** Relocate the tooltip so that it is always within the seriesViewRect */
var adjustTooltipPosition3D = function (width, height, svgAnnotation) {
    var seriesViewRect = svgAnnotation.parentSurface.seriesViewRect;
    var xCoord = svgAnnotation.x1;
    var yCoord = svgAnnotation.y1;
    var xCoordShift = (0, translate_1.translateToNotScaled)(seriesViewRect.width) - xCoord < width ? -width : 5;
    var yCoordShift = (0, translate_1.translateToNotScaled)(seriesViewRect.height) - yCoord < height ? -height : 5;
    svgAnnotation.xCoordShift = xCoordShift;
    svgAnnotation.yCoordShift = yCoordShift;
};
exports.adjustTooltipPosition3D = adjustTooltipPosition3D;
