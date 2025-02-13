"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SciChartHorizontalGroup = void 0;
var Thickness_1 = require("../../Core/Thickness");
var LayoutMangerType_1 = require("../../types/LayoutMangerType");
var LayoutManager_1 = require("./LayoutManager");
var SynchronizedLayoutManager_1 = require("./SynchronizedLayoutManager");
var SciChartHorizontalGroup = /** @class */ (function () {
    function SciChartHorizontalGroup() {
        this.groupTopSize = 0;
        this.groupBottomSize = 0;
        this.layoutManagers = [];
        this.topOuterLayoutSizes = {};
        this.bottomOuterLayoutSizes = {};
    }
    SciChartHorizontalGroup.prototype.addSurfaceToGroup = function (sciChartSurface) {
        var syncLayoutManager = sciChartSurface.layoutManager;
        if (syncLayoutManager.type !== LayoutMangerType_1.ELayoutManagerType.Synchronised) {
            syncLayoutManager = new SynchronizedLayoutManager_1.SynchronizedLayoutManager(undefined, this);
            // Use any custom layout strategies
            syncLayoutManager.bottomInnerAxesLayoutStrategy =
                sciChartSurface.layoutManager.bottomInnerAxesLayoutStrategy;
            syncLayoutManager.bottomOuterAxesLayoutStrategy =
                sciChartSurface.layoutManager.bottomOuterAxesLayoutStrategy;
            syncLayoutManager.leftInnerAxesLayoutStrategy = sciChartSurface.layoutManager.leftInnerAxesLayoutStrategy;
            syncLayoutManager.leftOuterAxesLayoutStrategy = sciChartSurface.layoutManager.leftOuterAxesLayoutStrategy;
            syncLayoutManager.rightInnerAxesLayoutStrategy = sciChartSurface.layoutManager.rightInnerAxesLayoutStrategy;
            syncLayoutManager.rightOuterAxesLayoutStrategy = sciChartSurface.layoutManager.rightOuterAxesLayoutStrategy;
            syncLayoutManager.topInnerAxesLayoutStrategy = sciChartSurface.layoutManager.topInnerAxesLayoutStrategy;
            syncLayoutManager.topOuterAxesLayoutStrategy = sciChartSurface.layoutManager.topOuterAxesLayoutStrategy;
            sciChartSurface.layoutManager = syncLayoutManager;
        }
        else {
            syncLayoutManager.horizontalGroup = this;
        }
        this.layoutManagers.push(syncLayoutManager);
        sciChartSurface.layoutManager.layoutChart(sciChartSurface.renderSurface.viewportSize, this.calculateMaxTitleSize());
        this.synchronizeAxisSizes();
        sciChartSurface.invalidateElement();
    };
    SciChartHorizontalGroup.prototype.removeSurface = function (sciChartSurface) {
        var syncLayoutManager = sciChartSurface.layoutManager;
        var indexToRemove = this.layoutManagers.findIndex(function (manager) { return manager === syncLayoutManager; });
        if (indexToRemove < 0) {
            throw new Error("Surface ".concat(sciChartSurface.id, " not found in Horizontal Group!"));
        }
        this.layoutManagers.splice(indexToRemove, 1);
        if (!syncLayoutManager.verticalGroup) {
            var defaultLayoutManager = new LayoutManager_1.LayoutManager();
            defaultLayoutManager.leftInnerAxesLayoutStrategy = syncLayoutManager.leftInnerAxesLayoutStrategy;
            defaultLayoutManager.leftOuterAxesLayoutStrategy = syncLayoutManager.leftOuterAxesLayoutStrategy;
            defaultLayoutManager.rightInnerAxesLayoutStrategy = syncLayoutManager.rightInnerAxesLayoutStrategy;
            defaultLayoutManager.rightOuterAxesLayoutStrategy = syncLayoutManager.rightOuterAxesLayoutStrategy;
            defaultLayoutManager.bottomInnerAxesLayoutStrategy = syncLayoutManager.bottomInnerAxesLayoutStrategy;
            defaultLayoutManager.bottomOuterAxesLayoutStrategy = syncLayoutManager.bottomOuterAxesLayoutStrategy;
            defaultLayoutManager.topInnerAxesLayoutStrategy = syncLayoutManager.topInnerAxesLayoutStrategy;
            defaultLayoutManager.topOuterAxesLayoutStrategy = syncLayoutManager.topOuterAxesLayoutStrategy;
            sciChartSurface.layoutManager = defaultLayoutManager;
        }
        else {
            // Remove only the horizontal part of the layout manager
            syncLayoutManager.horizontalGroup = undefined;
        }
        sciChartSurface.layoutManager.layoutChart(sciChartSurface.renderSurface.viewportSize, sciChartSurface.chartTitleRenderer.titleOffset);
        this.onTopSizeChanged(syncLayoutManager.id, 0);
        this.onBottomSizeChanged(syncLayoutManager.id, 0);
        delete this.topOuterLayoutSizes[syncLayoutManager.id];
        delete this.bottomOuterLayoutSizes[syncLayoutManager.id];
        this.synchronizeAxisSizes();
        sciChartSurface.invalidateElement();
    };
    SciChartHorizontalGroup.prototype.calculateMaxTitleSize = function () {
        var maxPadding = new Thickness_1.Thickness(0, 0, 0, 0);
        this.layoutManagers.forEach(function (manager) {
            var padding = manager.sciChartSurface.chartTitleRenderer.titleOffset;
            // Horizontal group does not care about left/right titles
            maxPadding = Thickness_1.Thickness.mergeMax(maxPadding, new Thickness_1.Thickness(padding.top, 0, padding.bottom, 0));
        });
        return maxPadding;
    };
    SciChartHorizontalGroup.prototype.synchronizeAxisSizes = function () {
        this.layoutManagers.forEach(function (lm) {
            lm.trySynchronizeLayouts();
        });
    };
    SciChartHorizontalGroup.prototype.onTopSizeChanged = function (key, value) {
        this.topOuterLayoutSizes[key] = value;
        this.groupTopSize = calculateMaxGroupSize(this.topOuterLayoutSizes);
    };
    SciChartHorizontalGroup.prototype.onBottomSizeChanged = function (key, value) {
        this.bottomOuterLayoutSizes[key] = value;
        this.groupBottomSize = calculateMaxGroupSize(this.bottomOuterLayoutSizes);
    };
    return SciChartHorizontalGroup;
}());
exports.SciChartHorizontalGroup = SciChartHorizontalGroup;
var calculateMaxGroupSize = function (outerLayoutSizes) {
    var areaHeight = 0;
    Object.keys(outerLayoutSizes).forEach(function (key) {
        areaHeight = Math.max(areaHeight, outerLayoutSizes[key]);
    });
    return areaHeight;
};
