import { ILicenseInfo } from "../../types/licensingClasses";
import { SCRTLicenseType } from "../../types/TSciChart";
import { ISciChartSurfaceBase } from "./SciChartSurfaceBase";
export declare type TLicenseDependencies = {
    fetchFromWizard: (url: string) => Promise<Response>;
    setCookie: (name: string, val: string, validDays: number) => void;
    getCookie: (name: string) => string;
    fetchForChallenge: (url: string) => Promise<Response>;
    updateLicenseDisplay: (licenseInfo: ILicenseInfo, sciChartSurface: ISciChartSurfaceBase, is2D: boolean, applyToOther: boolean) => void;
    debug: (message: string) => void;
};
export declare const setDependencies: (dependencies: TLicenseDependencies) => TLicenseDependencies;
export declare const setIsDebugLicensing: (value: boolean, persist?: boolean) => void;
export declare const setLicenseCallback: (callback: (queryString: string) => Promise<Response>) => void;
export declare const setRuntimeLicenseKey: (value: string) => void;
export declare const setUseLicenseWizard: (value: boolean) => void;
export declare type TCallbacks3D = {
    getLicenseChallenge3D: () => {
        challenge: string;
        orderId: string;
    };
    setChallengeResponse3D: (token: string) => number;
    setNewLicense3D: (keyCode: string) => {
        requiresValidation: boolean;
        trialExpired: boolean;
    };
    updateLicenseDisplay3D: () => void;
};
export declare const setCallbacks3D: (callbacks: TCallbacks3D) => TCallbacks3D;
interface ILicenseCookie {
    key: string;
    token: string;
    expiry: Date;
    lastValidated: Date;
}
export declare const getLicenseCookie: () => ILicenseCookie;
export declare const forceReapplyLicense2D: () => void;
export declare const applyLicense: (licenseContext: TLicenseContext, sciChartSurface?: ISciChartSurfaceBase) => void;
export declare type TLicenseContext = {
    SCRTCredentials: {
        GetLicenseType: () => SCRTLicenseType;
        GetLicenseDaysRemaining: () => number;
        Dump: () => string;
        HasFeature: (feature: string) => SCRTLicenseType;
        GetLicenseErrors: () => string;
        GetAllowDebugging: () => boolean;
        SetRuntimeLicenseKeyW: (licenseKey: string) => void;
        RequiresValidation: () => boolean;
        ApplyLicenseResponse: (response: string) => number;
        ResetRuntimeLicense: () => void;
        GetLicenseChallenge: () => string;
        GetOrderId: () => string;
        GetEncryptedOrderId: () => string;
        GetProductCode: () => string;
        GetDeveloperCount: () => number;
    };
    SCRTLicenseType: {
        LICENSE_TYPE_NO_LICENSE: SCRTLicenseType;
        LICENSE_TYPE_TRIAL: SCRTLicenseType;
        LICENSE_TYPE_COMMUNITY: SCRTLicenseType;
        LICENSE_TYPE_FULL: SCRTLicenseType;
        LICENSE_TYPE_FULL_EXPIRED: SCRTLicenseType;
        LICENSE_TYPE_TRIAL_EXPIRED: SCRTLicenseType;
        LICENSE_TYPE_SUBSCRIPTION_EXPIRED: SCRTLicenseType;
        LICENSE_TYPE_INVALID_DEVELOPER_LICENSE: SCRTLicenseType;
        LICENSE_TYPE_REQUIRES_VALIDATION: SCRTLicenseType;
        LICENSE_TYPE_INVALID_LICENSE: SCRTLicenseType;
    };
};
export declare const getLicenseInfo: (licenseContext: TLicenseContext) => ILicenseInfo;
export declare const updateLicenseDisplay: (licenseInfo: ILicenseInfo, sciChartSurface: ISciChartSurfaceBase, is2D: boolean, applyToOther: boolean) => void;
export declare const licenseManager: {
    clear: () => void;
    setRuntimeLicenseKey: (value: string) => void;
    setIsDebugLicensing: (value: boolean) => void;
    setLicenseCallback: (callback: (queryString: string) => Promise<Response>) => void;
    setServerLicenseEndpoint: (value: string) => void;
    applyLicense2D: (licenseContext: TLicenseContext, sciChartSurface: ISciChartSurfaceBase, isSingle: boolean) => void;
};
export {};
