"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.performanceWarnings = void 0;
var OneTimePerformanceWarning_1 = require("../Core/OneTimePerformanceWarning");
exports.performanceWarnings = {
    dataDistributionFlagNaN: new OneTimePerformanceWarning_1.OneTimePerformanceWarning("Data Distribution flag (BaseDataSeries.containsNaN = false) can be applied to improve performance. Read this website article https://www.scichart.com/documentation/js/current/DataSeries_Resampling.html for more info. To disable this warning set SciChartDefaults.performanceWarnings = false"),
    dataDistributionFlagSortedAscending: new OneTimePerformanceWarning_1.OneTimePerformanceWarning("Data Distribution flag (BaseDataSeries.isSorted = true) can be applied to improve performance. Read this website article https://www.scichart.com/documentation/js/current/DataSeries_Resampling.html for more info. To disable this warning set SciChartDefaults.performanceWarnings = false"),
    subchartBackgroundNotSimpleColor: new OneTimePerformanceWarning_1.OneTimePerformanceWarning("When using isTransparent: false on a SubChart, the background needs to be a simple color, not an html gradient (which the default theme uses). To disable this warning set SciChartDefaults.performanceWarnings = false"),
    dataLabelsSkippingMany: new OneTimePerformanceWarning_1.OneTimePerformanceWarning("DataLabelProvider generated many more labels than it could display.  To improve performance consider increasing the pointGapThreshold, increasing the skipNumber, or decreasing the pointCountThreshold. To disable this warning set SciChartDefaults.performanceWarnings = false"),
    dateTimeDeltaCalculatorBadDelta: new OneTimePerformanceWarning_1.OneTimePerformanceWarning("The DateTimeDeltaCalculator could not find a suitable delta given the current settings. \n        Either increase axis.maxAutoTicks, set axis.deltaCalculator.minTicks less than maxAutoTicks / 3, or set possibleDeltas to an array containing more closely spaced values.\n        To disable this warning set SciChartDefaults.performanceWarnings = false")
};
