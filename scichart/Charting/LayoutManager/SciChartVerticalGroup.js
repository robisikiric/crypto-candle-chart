"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SciChartVerticalGroup = void 0;
var Thickness_1 = require("../../Core/Thickness");
var LayoutMangerType_1 = require("../../types/LayoutMangerType");
var LayoutManager_1 = require("./LayoutManager");
var SynchronizedLayoutManager_1 = require("./SynchronizedLayoutManager");
var SciChartVerticalGroup = /** @class */ (function () {
    function SciChartVerticalGroup() {
        this.groupRightSize = 0;
        this.groupLeftSize = 0;
        this.layoutManagers = [];
        this.leftOuterLayoutSizes = {};
        this.rightOuterLayoutSizes = {};
    }
    SciChartVerticalGroup.prototype.addSurfaceToGroup = function (sciChartSurface) {
        var syncLayoutManager = sciChartSurface.layoutManager;
        if (syncLayoutManager.type !== LayoutMangerType_1.ELayoutManagerType.Synchronised) {
            syncLayoutManager = new SynchronizedLayoutManager_1.SynchronizedLayoutManager(this);
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
            syncLayoutManager.verticalGroup = this;
        }
        this.layoutManagers.push(syncLayoutManager);
        sciChartSurface.layoutManager.layoutChart(sciChartSurface.renderSurface.viewportSize, this.calculateMaxTitleSize());
        this.synchronizeAxisSizes();
        sciChartSurface.invalidateElement();
    };
    SciChartVerticalGroup.prototype.removeSurface = function (sciChartSurface) {
        var syncLayoutManager = sciChartSurface.layoutManager;
        var indexToRemove = this.layoutManagers.findIndex(function (manager) { return manager === syncLayoutManager; });
        if (indexToRemove < 0) {
            throw new Error("Surface ".concat(sciChartSurface.id, " not found in Vertical Group!"));
        }
        this.layoutManagers.splice(indexToRemove, 1);
        if (!syncLayoutManager.horizontalGroup) {
            var defaultLayoutManager = new LayoutManager_1.LayoutManager();
            defaultLayoutManager.bottomInnerAxesLayoutStrategy = syncLayoutManager.bottomInnerAxesLayoutStrategy;
            defaultLayoutManager.bottomOuterAxesLayoutStrategy = syncLayoutManager.bottomOuterAxesLayoutStrategy;
            defaultLayoutManager.topInnerAxesLayoutStrategy = syncLayoutManager.topInnerAxesLayoutStrategy;
            defaultLayoutManager.topOuterAxesLayoutStrategy = syncLayoutManager.topOuterAxesLayoutStrategy;
            defaultLayoutManager.leftInnerAxesLayoutStrategy = syncLayoutManager.leftInnerAxesLayoutStrategy;
            defaultLayoutManager.leftOuterAxesLayoutStrategy = syncLayoutManager.leftOuterAxesLayoutStrategy;
            defaultLayoutManager.rightInnerAxesLayoutStrategy = syncLayoutManager.rightInnerAxesLayoutStrategy;
            defaultLayoutManager.rightOuterAxesLayoutStrategy = syncLayoutManager.rightOuterAxesLayoutStrategy;
            sciChartSurface.layoutManager = defaultLayoutManager;
        }
        else {
            // Remove only the horizontal part of the layout manager
            syncLayoutManager.verticalGroup = undefined;
        }
        sciChartSurface.layoutManager.layoutChart(sciChartSurface.renderSurface.viewportSize, sciChartSurface.chartTitleRenderer.titleOffset);
        this.onLeftSizeChanged(syncLayoutManager.id, 0);
        this.onRightSizeChanged(syncLayoutManager.id, 0);
        delete this.leftOuterLayoutSizes[syncLayoutManager.id];
        delete this.rightOuterLayoutSizes[syncLayoutManager.id];
        this.synchronizeAxisSizes();
    };
    SciChartVerticalGroup.prototype.calculateMaxTitleSize = function () {
        var maxPadding = new Thickness_1.Thickness(0, 0, 0, 0);
        this.layoutManagers.forEach(function (manager) {
            var padding = manager.sciChartSurface.chartTitleRenderer.titleOffset;
            // Vertical group does not care about top/bottom titles
            maxPadding = Thickness_1.Thickness.mergeMax(maxPadding, new Thickness_1.Thickness(0, padding.right, 0, padding.left));
        });
        return maxPadding;
    };
    SciChartVerticalGroup.prototype.synchronizeAxisSizes = function () {
        this.layoutManagers.forEach(function (lm) {
            lm.trySynchronizeLayouts();
        });
    };
    SciChartVerticalGroup.prototype.onLeftSizeChanged = function (key, value) {
        this.leftOuterLayoutSizes[key] = value;
        this.groupLeftSize = calculateMaxGroupSize(this.leftOuterLayoutSizes);
    };
    SciChartVerticalGroup.prototype.onRightSizeChanged = function (key, value) {
        this.rightOuterLayoutSizes[key] = value;
        this.groupRightSize = calculateMaxGroupSize(this.rightOuterLayoutSizes);
    };
    return SciChartVerticalGroup;
}());
exports.SciChartVerticalGroup = SciChartVerticalGroup;
var calculateMaxGroupSize = function (outerLayoutSizes) {
    var areaWidth = 0;
    Object.keys(outerLayoutSizes).forEach(function (key) {
        areaWidth = Math.max(areaWidth, outerLayoutSizes[key]);
    });
    return areaWidth;
};
