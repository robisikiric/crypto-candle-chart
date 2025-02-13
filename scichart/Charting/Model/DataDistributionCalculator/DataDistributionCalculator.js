"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataDistributionCalculator = void 0;
var performanceWarnings_1 = require("../../../constants/performanceWarnings");
var array_1 = require("../../../utils/array");
var number_1 = require("../../../utils/number");
var DataDistributionCalculator = /** @class */ (function () {
    function DataDistributionCalculator() {
        this.containsNanProperty = false;
        this.isSortedAscendingProperty = true;
    }
    Object.defineProperty(DataDistributionCalculator.prototype, "containsNaN", {
        /** @inheritDoc */
        get: function () {
            return this.containsNanProperty;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataDistributionCalculator.prototype, "isSortedAscending", {
        /** @inheritDoc */
        get: function () {
            return this.isSortedAscendingProperty;
        },
        enumerable: false,
        configurable: true
    });
    /** @inheritDoc */
    DataDistributionCalculator.prototype.onAppend = function (isSorted, containsNaN, currentXValues, newXValues, newYValues) {
        if (containsNaN !== undefined) {
            this.containsNanProperty = containsNaN;
        }
        else {
            if (this.containsNanProperty === false) {
                this.containsNanProperty = newYValues.some(number_1.checkIsNaN);
                if (this.containsNanProperty === false)
                    performanceWarnings_1.performanceWarnings.dataDistributionFlagNaN.warn();
            }
        }
        if (isSorted !== undefined) {
            this.isSortedAscendingProperty = isSorted;
        }
        else {
            if (this.isSortedAscendingProperty === true) {
                var newSectionSortedAsc = (0, array_1.isArraySorted)(newXValues);
                var oldSectionLength = currentXValues.size();
                var newSectionAfterOldSection = oldSectionLength === 0 || currentXValues.get(oldSectionLength - 1) < newXValues[0];
                this.isSortedAscendingProperty = newSectionSortedAsc && newSectionAfterOldSection;
                if (this.isSortedAscendingProperty === true)
                    performanceWarnings_1.performanceWarnings.dataDistributionFlagSortedAscending.warn();
            }
        }
    };
    /** @inheritDoc */
    DataDistributionCalculator.prototype.onInsert = function (isSorted, containsNaN, currentXValues, newXValues, newYValues, indexWhereInserted) {
        if (containsNaN !== undefined) {
            this.containsNanProperty = containsNaN;
        }
        else {
            if (this.containsNanProperty === false) {
                this.containsNanProperty = newYValues.some(number_1.checkIsNaN);
                if (this.containsNanProperty === false)
                    performanceWarnings_1.performanceWarnings.dataDistributionFlagNaN.warn();
            }
        }
        if (isSorted !== undefined) {
            this.isSortedAscendingProperty = isSorted;
        }
        else {
            if (this.isSortedAscendingProperty === true && newXValues) {
                var newSectionSortedAsc = (0, array_1.isArraySorted)(newXValues);
                var valueOnTheLeftAscending = indexWhereInserted === 0 || currentXValues.get(indexWhereInserted - 1) < newXValues[0];
                var valueOnTheRightAscending = indexWhereInserted >= currentXValues.size() ||
                    newXValues[newXValues.length - 1] < currentXValues.get(indexWhereInserted);
                this.isSortedAscendingProperty =
                    newSectionSortedAsc && valueOnTheLeftAscending && valueOnTheRightAscending;
                if (this.isSortedAscendingProperty === true)
                    performanceWarnings_1.performanceWarnings.dataDistributionFlagSortedAscending.warn();
            }
        }
    };
    /** @inheritDoc */
    DataDistributionCalculator.prototype.onUpdate = function (isSorted, containsNaN, currentXValues, newXValues, newYValues, indexWhereUpdated) {
        if (containsNaN !== undefined) {
            this.containsNanProperty = containsNaN;
        }
        else {
            if (this.containsNanProperty === false) {
                this.containsNanProperty = newYValues.some(number_1.checkIsNaN);
            }
        }
        if (isSorted !== undefined) {
            this.isSortedAscendingProperty = isSorted;
        }
        else {
            if (this.isSortedAscendingProperty === true && newXValues) {
                var newSectionSortedAsc = (0, array_1.isArraySorted)(newXValues);
                var valueOnTheLeftAscending = indexWhereUpdated === 0 || currentXValues.get(indexWhereUpdated - 1) < newXValues[0];
                var oldSectionLength = currentXValues.size();
                var rightIndex = indexWhereUpdated + newXValues.length;
                var valueOnTheRightAscending = rightIndex >= oldSectionLength ||
                    newXValues[newXValues.length - 1] < currentXValues.get(rightIndex);
                this.isSortedAscendingProperty =
                    newSectionSortedAsc && valueOnTheLeftAscending && valueOnTheRightAscending;
            }
        }
    };
    /** @inheritDoc */
    DataDistributionCalculator.prototype.clear = function (isSorted, containsNaN) {
        this.isSortedAscendingProperty = isSorted !== null && isSorted !== void 0 ? isSorted : true;
        this.containsNanProperty = containsNaN !== null && containsNaN !== void 0 ? containsNaN : false;
    };
    /** @inheritDoc */
    DataDistributionCalculator.prototype.setIsSortedAscending = function (value) {
        this.isSortedAscendingProperty = value;
    };
    /** @inheritDoc */
    DataDistributionCalculator.prototype.setContainsNaN = function (value) {
        this.containsNanProperty = value;
    };
    return DataDistributionCalculator;
}());
exports.DataDistributionCalculator = DataDistributionCalculator;
