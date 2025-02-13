declare function storageAvailable(): boolean;
declare function getIsLicenseDebug(): boolean;
declare function setIsLicenseDebug(value: boolean): void;
declare function clearLicensingDebug(): void;
declare function getLicenseWizardPort(): number;
declare function getLicenseWizardMaxPort(): number;
export declare const localStorageApi: {
    storageAvailable: typeof storageAvailable;
    getIsLicenseDebug: typeof getIsLicenseDebug;
    setIsLicenseDebug: typeof setIsLicenseDebug;
    clearLicensingDebug: typeof clearLicensingDebug;
    getLicenseWizardMaxPort: typeof getLicenseWizardMaxPort;
    getLicenseWizardPort: typeof getLicenseWizardPort;
};
export {};
