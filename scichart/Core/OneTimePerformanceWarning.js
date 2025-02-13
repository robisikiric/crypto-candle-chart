"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OneTimePerformanceWarning = void 0;
var licenseManager2dState_1 = require("../Charting/Visuals/licenseManager2dState");
var SciChartDefaults_1 = require("../Charting/Visuals/SciChartDefaults");
var OneTimePerformanceWarning = /** @class */ (function () {
    function OneTimePerformanceWarning(message) {
        this.warnedProperty = false;
        this.messageProperty = message;
    }
    OneTimePerformanceWarning.prototype.warn = function () {
        if (!SciChartDefaults_1.SciChartDefaults.performanceWarnings || this.warnedProperty || !licenseManager2dState_1.licenseManager2dState.getIsDev())
            return false;
        console.warn(this.messageProperty);
        this.warnedProperty = true;
        return true;
    };
    return OneTimePerformanceWarning;
}());
exports.OneTimePerformanceWarning = OneTimePerformanceWarning;
