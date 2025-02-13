/**
 * @Ignore
 */
export declare enum LicenseType {
    NoLicense = 0,
    Trial = 1,
    Full = 2,
    Full_Expired = 3,
    Trial_Expired = 4,
    Subscription_Expired = 5,
    Invalid_Developer = 6,
    Requres_Validation = 7,
    Invalid = 8,
    Community = 9
}
/**
 * @Ignore
 */
export declare enum LicenseCheckStatus {
    NoLicense = 0,
    FetchingFromServer = 1,
    StartLookingForLicenseWizard = 2,
    LookingForLicenseWizard = 3,
    ValidatingDeveloperLicense = 4,
    NoLicenseInWizard = 5,
    FailedToFindLicenseWizard = 6,
    FailedToValidateDeveloperLicense = 7,
    DevKeyInRuntimeKey = 8,
    LicenseOK = 9
}
/**
 * @Ignore
 */
export interface ILicenseInfo {
    licenseType: LicenseType;
    daysRemaining: number;
    error: string;
}
