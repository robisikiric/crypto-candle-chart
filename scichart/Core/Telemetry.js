"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendTelemetry = exports.shouldSendTelemetry = exports.getUserCookie = void 0;
var licenseManager2dState_1 = require("../Charting/Visuals/licenseManager2dState");
var cookie_1 = require("../utils/cookie");
var BuildStamp_1 = require("./BuildStamp");
var app_1 = require("../constants/app");
var guid_1 = require("../utils/guid");
var licensingClasses_1 = require("../types/licensingClasses");
var sessionTime = 60 * 60 * 1000;
var hasSent = false;
var setUserCookie = function (userId, sessionId, sessionStart) {
    var cookieVal = "".concat(userId, ",").concat(sessionId, ",").concat(sessionStart);
    return (0, cookie_1.setCookie)("scUser", cookieVal, 365);
};
var getUserCookie = function () {
    var cookie = (0, cookie_1.getCookie)("scUser");
    if (cookie) {
        var parts = cookie.split(",");
        if (parts.length === 3)
            return {
                userId: parts[0],
                sessionId: parts[1],
                sessionStart: Number.parseInt(parts[2], 10)
            };
    }
    return {
        userId: (0, guid_1.base64Id)(),
        sessionId: (0, guid_1.base64Id)(),
        sessionStart: 0
    };
};
exports.getUserCookie = getUserCookie;
var shouldSendTelemetry = function () {
    // Not in test
    if (app_1.IS_TEST_ENV)
        return false;
    // Not if we've already done it
    if (hasSent)
        return false;
    // not if the license is not community and not dev
    if (licenseManager2dState_1.licenseManager2dState.getLicenseType() !== licensingClasses_1.LicenseType.Community && !licenseManager2dState_1.licenseManager2dState.getIsDev())
        return false;
    // not if telemetry not enabled
    if (!licenseManager2dState_1.licenseManager2dState.getTelemetry())
        return false;
    // not if not online
    if (window && !window.navigator.onLine)
        return false;
    return true;
};
exports.shouldSendTelemetry = shouldSendTelemetry;
var sendTelemetry = function () {
    if (!(0, exports.shouldSendTelemetry)())
        return;
    var user = (0, exports.getUserCookie)();
    var timeStamp = new Date().toISOString();
    // New sessionId if previous has expired
    if (Date.now() - user.sessionStart < sessionTime) {
        // Don't send more than once per session.
        return;
    }
    // Reset the session time.  Sessions expire 30 minutes after the last use in the session.
    // Session tracking is more relevant once we start collecting more detailed per-chart data
    user.sessionId = (0, guid_1.base64Id)();
    user.sessionStart = Date.now();
    setUserCookie(user.userId, user.sessionId, user.sessionStart);
    var eventData = {
        time: timeStamp,
        iKey: "210b4d64-8147-471e-b6cb-244a2c939455",
        name: "Microsoft.ApplicationInsights.210b4d648147471eb6cb244a2c939455.Event",
        tags: {
            "ai.user.id": user.userId,
            "ai.session.id": user.sessionId,
            "ai.device.id": "browser",
            "ai.device.type": "Browser"
        },
        data: {
            baseType: "EventData",
            baseData: {
                ver: 2,
                name: "LicenseSet",
                properties: {
                    platform: "JS",
                    licenseType: licenseManager2dState_1.licenseManager2dState.getLicenseType(),
                    orderId: licenseManager2dState_1.licenseManager2dState.getOrderId(),
                    productCode: licenseManager2dState_1.licenseManager2dState.getProductCode(),
                    isDev: licenseManager2dState_1.licenseManager2dState.getIsDev(),
                    devCount: licenseManager2dState_1.licenseManager2dState.getDevCount(),
                    sciChartVersion: BuildStamp_1.libraryVersion
                },
                measurements: {}
            }
        }
    };
    if (licenseManager2dState_1.licenseManager2dState.getLicenseType() === licensingClasses_1.LicenseType.Community) {
        eventData.data.baseData.properties.url = window.location.href;
    }
    var endPointUrl = "https://dc.services.visualstudio.com/v2/track";
    var body = JSON.stringify([eventData]);
    fetch(endPointUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: body
    }).catch(function (err) { });
    hasSent = true;
};
exports.sendTelemetry = sendTelemetry;
