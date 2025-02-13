"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.licenseManager2dState = void 0;
var licensingClasses_1 = require("../../types/licensingClasses");
var isDev = false;
var getIsDev = function () { return isDev; };
var setIsDev = function (value) {
    isDev = value;
};
var orderId = "";
var getOrderId = function () { return orderId; };
var setOrderId = function (value) {
    orderId = value;
};
var productCode = "";
var getProductCode = function () { return productCode; };
var setProductCode = function (value) {
    productCode = value;
};
var devCount = 1;
var getDevCount = function () { return devCount; };
var setDevCount = function (value) {
    devCount = value;
};
var licenseType = licensingClasses_1.LicenseType.NoLicense;
var getLicenseType = function () { return licenseType; };
var setLicenseType = function (value) {
    licenseType = value;
};
var telemetryEnabled = false;
var getTelemetry = function () { return telemetryEnabled; };
var setTelemetry = function (value) {
    telemetryEnabled = value;
};
exports.licenseManager2dState = {
    getIsDev: getIsDev,
    setIsDev: setIsDev,
    getOrderId: getOrderId,
    setOrderId: setOrderId,
    getProductCode: getProductCode,
    setProductCode: setProductCode,
    getLicenseType: getLicenseType,
    setLicenseType: setLicenseType,
    getDevCount: getDevCount,
    setDevCount: setDevCount,
    getTelemetry: getTelemetry,
    setTelemetry: setTelemetry
};
