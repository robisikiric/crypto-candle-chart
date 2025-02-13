"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextRandomPriceBarFactory = exports.getStocksDataFactory = void 0;
var random_1 = require("./random");
/**
 * Creates function to generate stock data
 * @param STEP
 * @param RANDOM_MIN
 * @param RANDOM_MAX
 */
var getStocksDataFactory = function (STEP, RANDOM_MIN, RANDOM_MAX) { return function (unixTimestamp, close) {
    var DEVIATION = 0.7;
    var newTimeStamp = unixTimestamp + STEP;
    var newOpenValue = close;
    var newCloseValue = (0, random_1.getRandomInRange)(RANDOM_MIN, RANDOM_MAX, 3);
    var delta = Math.abs(newOpenValue - newCloseValue);
    var maxValue = Math.max(newOpenValue, newCloseValue);
    var newHighValue = (0, random_1.getRandomInRange)(maxValue, Math.min(RANDOM_MAX, maxValue + delta * DEVIATION), 3);
    var minValue = Math.min(newOpenValue, newCloseValue);
    var newLowValue = (0, random_1.getRandomInRange)(Math.max(RANDOM_MIN, minValue - delta * DEVIATION), minValue, 3);
    return {
        xValue: newTimeStamp,
        openValue: newOpenValue,
        highValue: newHighValue,
        lowValue: newLowValue,
        closeValue: newCloseValue
    };
}; };
exports.getStocksDataFactory = getStocksDataFactory;
var PriceBar = /** @class */ (function () {
    function PriceBar(xValue, openValue, highValue, lowValue, closeValue, volume) {
        this.xValue = xValue;
        this.openValue = openValue;
        this.highValue = highValue;
        this.lowValue = lowValue;
        this.closeValue = closeValue;
        this.volume = volume;
    }
    return PriceBar;
}());
var getNextRandomPriceBarFactory = function (startDateTimestamp, candleIntervalMinutes, simulateDateGap, startPrice) {
    var currentTimestamp = startDateTimestamp;
    var lastPriceBar = new PriceBar(startDateTimestamp, startPrice, startPrice, startPrice, startPrice, 0);
    return function (requestUpdate) {
        if (requestUpdate === void 0) { requestUpdate = false; }
        var getNextData = function () {
            var open = lastPriceBar.closeValue;
            var num = ((Math.random() - 0.9) * startPrice) / 30;
            var num2 = Math.random();
            var num3 = 0.5 * startPrice +
                (startPrice / 2) * Math.sin(7.27220521664304e-6 * currentTimestamp) +
                (startPrice / 16.0) * Math.cos(7.27220521664304e-5 * currentTimestamp) +
                (startPrice / 32.0) * Math.sin(7.27220521664304e-5 * (10.0 + num2) * currentTimestamp) +
                (startPrice / 64.0) * Math.cos(7.27220521664304e-5 * (20.0 + num2) * currentTimestamp) +
                num;
            var num4 = Math.max(open, num3);
            var num5 = (Math.random() * startPrice) / 100;
            var high = num4 + num5;
            var num6 = Math.min(open, num3);
            var num7 = (Math.random() * startPrice) / 100;
            var low = num6 - num7;
            var volume = Math.random() * 30000 + 20000;
            var openTime = simulateDateGap ? emulateDateGap(lastPriceBar.xValue) : lastPriceBar.xValue;
            var closeTime = openTime + candleIntervalMinutes * 60;
            lastPriceBar = new PriceBar(closeTime, open, high, low, num3, volume);
            currentTimestamp += candleIntervalMinutes * 60;
            return lastPriceBar;
        };
        var getUpdatedData = function () {
            var num = lastPriceBar.closeValue + (Math.random() - 0.48) * (lastPriceBar.closeValue / 100.0);
            var high = num > lastPriceBar.highValue ? num : lastPriceBar.highValue;
            var low = num < lastPriceBar.lowValue ? num : lastPriceBar.lowValue;
            var volumeInc = (Math.random() * 30000 + 20000) * 0.05;
            lastPriceBar = new PriceBar(lastPriceBar.xValue, lastPriceBar.openValue, high, low, num, lastPriceBar.volume + volumeInc);
            return lastPriceBar;
        };
        if (requestUpdate) {
            return getUpdatedData();
        }
        else {
            return getNextData();
        }
    };
};
exports.getNextRandomPriceBarFactory = getNextRandomPriceBarFactory;
/** @ignore */
var emulateDateGap = function (lastPriceBarTimestamp) {
    return lastPriceBarTimestamp;
};
