import { LicenseType } from "../../types/licensingClasses";
export declare const licenseManager2dState: {
    getIsDev: () => boolean;
    setIsDev: (value: boolean) => void;
    getOrderId: () => string;
    setOrderId: (value: string) => void;
    getProductCode: () => string;
    setProductCode: (value: string) => void;
    getLicenseType: () => LicenseType;
    setLicenseType: (value: LicenseType) => void;
    getDevCount: () => number;
    setDevCount: (value: number) => void;
    getTelemetry: () => boolean;
    setTelemetry: (value: boolean) => void;
};
