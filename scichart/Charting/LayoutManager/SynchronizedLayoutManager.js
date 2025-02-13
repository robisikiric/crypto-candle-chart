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
exports.SynchronizedLayoutManager = void 0;
var LayoutMangerType_1 = require("../../types/LayoutMangerType");
var guid_1 = require("../../utils/guid");
var LayoutManager_1 = require("./LayoutManager");
var Thickness_1 = require("../../Core/Thickness");
/**
 * An {@link ILayoutManager} used by {@link SciChartVerticalGroup} to synchronise Layout accross mutltiple SciChartSurfaces in a group
 */
var SynchronizedLayoutManager = /** @class */ (function (_super) {
    __extends(SynchronizedLayoutManager, _super);
    function SynchronizedLayoutManager(verticalGroup, horizontalGroup, options) {
        var _this = _super.call(this, options) || this;
        _this.type = LayoutMangerType_1.ELayoutManagerType.Synchronised;
        _this.id = (0, guid_1.generateGuid)();
        _this.lastLeftOuterAreaSize = 0;
        _this.lastRightOuterAreaSize = 0;
        _this.lastTopOuterAreaSize = 0;
        _this.lastBottomOuterAreaSize = 0;
        _this.verticalGroup = verticalGroup !== null && verticalGroup !== void 0 ? verticalGroup : undefined;
        _this.horizontalGroup = horizontalGroup !== null && horizontalGroup !== void 0 ? horizontalGroup : undefined;
        return _this;
    }
    SynchronizedLayoutManager.prototype.layoutChart = function (viewportSize, padding) {
        if (this.verticalGroup && this.horizontalGroup) {
            var groupTitleSize = Thickness_1.Thickness.mergeMax(this.verticalGroup.calculateMaxTitleSize(), this.horizontalGroup.calculateMaxTitleSize());
            var maxTitleSize = Thickness_1.Thickness.mergeMax(padding, groupTitleSize);
            var size = _super.prototype.layoutChart.call(this, viewportSize, maxTitleSize);
            this.verticalGroup.synchronizeAxisSizes();
            this.horizontalGroup.synchronizeAxisSizes();
            return size;
        }
        else if (this.verticalGroup) {
            var size = _super.prototype.layoutChart.call(this, viewportSize, Thickness_1.Thickness.mergeMax(padding, this.verticalGroup.calculateMaxTitleSize()));
            // use own title padding for top/bottom if vertical
            this.verticalGroup.synchronizeAxisSizes();
            return size;
        }
        else if (this.horizontalGroup) {
            var size = _super.prototype.layoutChart.call(this, viewportSize, Thickness_1.Thickness.mergeMax(padding, this.horizontalGroup.calculateMaxTitleSize()));
            this.horizontalGroup.synchronizeAxisSizes();
            return size;
        }
        return _super.prototype.layoutChart.call(this, viewportSize, padding);
    };
    SynchronizedLayoutManager.prototype.trySynchronizeLayouts = function () {
        if (this.verticalGroup) {
            if (this.lastLeftOuterAreaSize !== this.verticalGroup.groupLeftSize ||
                this.lastRightOuterAreaSize !== this.verticalGroup.groupRightSize) {
                this.sciChartSurface.invalidateElement();
            }
        }
        if (this.horizontalGroup) {
            if (this.lastTopOuterAreaSize !== this.horizontalGroup.groupTopSize ||
                this.lastBottomOuterAreaSize !== this.horizontalGroup.groupBottomSize) {
                this.sciChartSurface.invalidateElement();
            }
        }
    };
    // for Vertical Group
    SynchronizedLayoutManager.prototype.measureLeftOuterAxes = function () {
        _super.prototype.measureLeftOuterAxes.call(this);
        if (!this.verticalGroup) {
            _super.prototype.measureLeftOuterAxes.call(this);
            return;
        }
        this.verticalGroup.onLeftSizeChanged(this.id, this.chartLayoutState.leftOuterAreaSize);
        var newSize = Math.max(this.chartLayoutState.leftOuterAreaSize, this.verticalGroup.groupLeftSize);
        // Sync axis widths. Expand the outer one only.
        if (this.axesGroupedByLayoutStrategy.leftOuterAxes.length > 0) {
            var axis = this.axesGroupedByLayoutStrategy.leftOuterAxes[this.axesGroupedByLayoutStrategy.leftOuterAxes.length - 1];
            var otherSize = this.chartLayoutState.leftOuterAreaSize - axis.axisLayoutState.axisSize;
            axis.axisLayoutState.axisSize = newSize - otherSize;
        }
        this.chartLayoutState.leftOuterAreaSize = newSize;
        this.lastLeftOuterAreaSize = newSize;
    };
    SynchronizedLayoutManager.prototype.measureRightOuterAxes = function () {
        _super.prototype.measureRightOuterAxes.call(this);
        if (!this.verticalGroup) {
            _super.prototype.measureRightOuterAxes.call(this);
            return;
        }
        this.verticalGroup.onRightSizeChanged(this.id, this.chartLayoutState.rightOuterAreaSize);
        var newSize = Math.max(this.chartLayoutState.rightOuterAreaSize, this.verticalGroup.groupRightSize);
        // Sync axis widths. Expand the outer one only.
        if (this.axesGroupedByLayoutStrategy.rightOuterAxes.length > 0) {
            var axis = this.axesGroupedByLayoutStrategy.rightOuterAxes[this.axesGroupedByLayoutStrategy.rightOuterAxes.length - 1];
            var otherSize = this.chartLayoutState.rightOuterAreaSize - axis.axisLayoutState.axisSize;
            axis.axisLayoutState.axisSize = newSize - otherSize;
        }
        this.chartLayoutState.rightOuterAreaSize = newSize;
        this.lastRightOuterAreaSize = newSize;
    };
    // for Horizontal Group
    SynchronizedLayoutManager.prototype.measureTopOuterAxes = function () {
        _super.prototype.measureTopOuterAxes.call(this);
        if (!this.horizontalGroup) {
            return;
        }
        this.horizontalGroup.onTopSizeChanged(this.id, this.chartLayoutState.topOuterAreaSize);
        var newSize = Math.max(this.chartLayoutState.topOuterAreaSize, this.horizontalGroup.groupTopSize);
        // Sync axis heights. Expand the outer one only.
        if (this.axesGroupedByLayoutStrategy.topOuterAxes.length > 0) {
            var axis = this.axesGroupedByLayoutStrategy.topOuterAxes[this.axesGroupedByLayoutStrategy.topOuterAxes.length - 1];
            var otherSize = this.chartLayoutState.topOuterAreaSize - axis.axisLayoutState.axisSize;
            axis.axisLayoutState.axisSize = newSize - otherSize;
        }
        this.chartLayoutState.topOuterAreaSize = newSize;
        this.lastTopOuterAreaSize = newSize;
    };
    SynchronizedLayoutManager.prototype.measureBottomOuterAxes = function () {
        _super.prototype.measureBottomOuterAxes.call(this);
        if (!this.horizontalGroup) {
            return;
        }
        this.horizontalGroup.onBottomSizeChanged(this.id, this.chartLayoutState.bottomOuterAreaSize);
        var newSize = Math.max(this.chartLayoutState.bottomOuterAreaSize, this.horizontalGroup.groupBottomSize);
        // Sync axis heights. Expand the outer one only.
        if (this.axesGroupedByLayoutStrategy.bottomOuterAxes.length > 0) {
            var axis = this.axesGroupedByLayoutStrategy.bottomOuterAxes[this.axesGroupedByLayoutStrategy.bottomOuterAxes.length - 1];
            var otherSize = this.chartLayoutState.bottomOuterAreaSize - axis.axisLayoutState.axisSize;
            axis.axisLayoutState.axisSize = newSize - otherSize;
        }
        this.chartLayoutState.bottomOuterAreaSize = newSize;
        this.lastBottomOuterAreaSize = newSize;
    };
    return SynchronizedLayoutManager;
}(LayoutManager_1.LayoutManager));
exports.SynchronizedLayoutManager = SynchronizedLayoutManager;
