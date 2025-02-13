"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyLicense3D = exports.forceReapplyLicense3D = void 0;
var licenseManager2D_1 = require("../../Charting/Visuals/licenseManager2D");
// tslint:disable: no-console
var getCallbacks3D = function (licenseContext3D, sciChartSurface) {
    return {
        getLicenseChallenge3D: function () {
            var challenge = licenseContext3D.SCRTCredentials.GetLicenseChallenge();
            var orderId = licenseContext3D.SCRTCredentials.GetOrderId();
            return { challenge: challenge, orderId: orderId };
        },
        setChallengeResponse3D: function (token) { return licenseContext3D.SCRTCredentials.ApplyLicenseResponse(token); },
        setNewLicense3D: function (keyCode) {
            var requiresValidation = false;
            var trialExpired;
            licenseContext3D.SCRTCredentials.SetRuntimeLicenseKeyW(keyCode);
            requiresValidation = licenseContext3D.SCRTCredentials.RequiresValidation();
            trialExpired =
                licenseContext3D.SCRTCredentials.GetLicenseType() ===
                    licenseContext3D.SCRTLicenseType.LICENSE_TYPE_TRIAL_EXPIRED;
            (0, licenseManager2D_1.updateLicenseDisplay)((0, licenseManager2D_1.getLicenseInfo)(licenseContext3D), sciChartSurface, false, true);
            return { requiresValidation: requiresValidation, trialExpired: trialExpired };
        },
        updateLicenseDisplay3D: function () {
            return (0, licenseManager2D_1.updateLicenseDisplay)((0, licenseManager2D_1.getLicenseInfo)(licenseContext3D), sciChartSurface, false, true);
        }
    };
};
var forceReapplyLicense3D = function () {
    shouldApplyLicense3D = true;
};
exports.forceReapplyLicense3D = forceReapplyLicense3D;
var shouldApplyLicense3D = true;
// let licenseContext3D: TSciChart3D;
// let sciChartSurface3D: SciChart3DSurface;
var applyLicense3D = function (licenseContext, sciChartSurface, isSingle) {
    if (isSingle || shouldApplyLicense3D) {
        // licenseContext3D = licenseContext as TSciChart3D;
        // sciChartSurface3D = sciChartSurface as SciChart3DSurface;
        // set up callbacks
        (0, licenseManager2D_1.setCallbacks3D)(getCallbacks3D(licenseContext, sciChartSurface));
        (0, licenseManager2D_1.applyLicense)(licenseContext, sciChartSurface);
    }
    else {
        (0, licenseManager2D_1.updateLicenseDisplay)((0, licenseManager2D_1.getLicenseInfo)(licenseContext), sciChartSurface, false, false);
    }
    if (!isSingle)
        shouldApplyLicense3D = false;
};
exports.applyLicense3D = applyLicense3D;
