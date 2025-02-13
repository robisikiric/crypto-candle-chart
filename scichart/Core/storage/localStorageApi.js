"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.localStorageApi = void 0;
var isStorageAvailable = undefined;
function storageAvailable() {
    if (isStorageAvailable !== undefined)
        return isStorageAvailable;
    try {
        var storage = window["localStorage"], x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        isStorageAvailable = true;
        return true;
    }
    catch (e) {
        isStorageAvailable = false;
        return false;
    }
}
function getIsLicenseDebug() {
    if (!storageAvailable())
        return undefined;
    return localStorage.getItem("LICENSE_DEBUG") === "1";
}
function setIsLicenseDebug(value) {
    if (!storageAvailable())
        return;
    localStorage.setItem("LICENSE_DEBUG", value ? "1" : "0");
}
function clearLicensingDebug() {
    if (!storageAvailable())
        return;
    localStorage.removeItem("LICENSE_DEBUG");
}
function getLicenseWizardPort() {
    if (!storageAvailable())
        return undefined;
    var portStr = localStorage.getItem("LICENSE_WIZARD_PORT");
    var portNumber = Number(portStr);
    if (isNaN(portNumber))
        return undefined;
    return portNumber;
}
function getLicenseWizardMaxPort() {
    if (!storageAvailable())
        return undefined;
    var portStr = localStorage.getItem("LICENSE_WIZARD_MAXPORT");
    var portNumber = Number(portStr);
    if (isNaN(portNumber))
        return undefined;
    return portNumber;
}
exports.localStorageApi = {
    storageAvailable: storageAvailable,
    getIsLicenseDebug: getIsLicenseDebug,
    setIsLicenseDebug: setIsLicenseDebug,
    clearLicensingDebug: clearLicensingDebug,
    getLicenseWizardMaxPort: getLicenseWizardMaxPort,
    getLicenseWizardPort: getLicenseWizardPort
};
