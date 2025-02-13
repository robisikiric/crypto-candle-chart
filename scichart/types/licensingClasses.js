"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LicenseCheckStatus = exports.LicenseType = void 0;
// tslint:disable: max-classes-per-file
/**
 * @Ignore
 */
var LicenseType;
(function (LicenseType) {
    LicenseType[LicenseType["NoLicense"] = 0] = "NoLicense";
    LicenseType[LicenseType["Trial"] = 1] = "Trial";
    LicenseType[LicenseType["Full"] = 2] = "Full";
    LicenseType[LicenseType["Full_Expired"] = 3] = "Full_Expired";
    LicenseType[LicenseType["Trial_Expired"] = 4] = "Trial_Expired";
    LicenseType[LicenseType["Subscription_Expired"] = 5] = "Subscription_Expired";
    LicenseType[LicenseType["Invalid_Developer"] = 6] = "Invalid_Developer";
    LicenseType[LicenseType["Requres_Validation"] = 7] = "Requres_Validation";
    LicenseType[LicenseType["Invalid"] = 8] = "Invalid";
    LicenseType[LicenseType["Community"] = 9] = "Community";
})(LicenseType = exports.LicenseType || (exports.LicenseType = {}));
/**
 * @Ignore
 */
var LicenseCheckStatus;
(function (LicenseCheckStatus) {
    LicenseCheckStatus[LicenseCheckStatus["NoLicense"] = 0] = "NoLicense";
    LicenseCheckStatus[LicenseCheckStatus["FetchingFromServer"] = 1] = "FetchingFromServer";
    LicenseCheckStatus[LicenseCheckStatus["StartLookingForLicenseWizard"] = 2] = "StartLookingForLicenseWizard";
    LicenseCheckStatus[LicenseCheckStatus["LookingForLicenseWizard"] = 3] = "LookingForLicenseWizard";
    LicenseCheckStatus[LicenseCheckStatus["ValidatingDeveloperLicense"] = 4] = "ValidatingDeveloperLicense";
    LicenseCheckStatus[LicenseCheckStatus["NoLicenseInWizard"] = 5] = "NoLicenseInWizard";
    LicenseCheckStatus[LicenseCheckStatus["FailedToFindLicenseWizard"] = 6] = "FailedToFindLicenseWizard";
    LicenseCheckStatus[LicenseCheckStatus["FailedToValidateDeveloperLicense"] = 7] = "FailedToValidateDeveloperLicense";
    LicenseCheckStatus[LicenseCheckStatus["DevKeyInRuntimeKey"] = 8] = "DevKeyInRuntimeKey";
    LicenseCheckStatus[LicenseCheckStatus["LicenseOK"] = 9] = "LicenseOK";
})(LicenseCheckStatus = exports.LicenseCheckStatus || (exports.LicenseCheckStatus = {}));
