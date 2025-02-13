/**
 * @description Generates GUID/UUID RFC4122 version 4 compliant
 */
export declare const generateGuid: () => string;
/**
 * Generate random base64 id string.
 * The default length is 22 which is 132-bits so almost the same as a GUID but as base64
 * @param maxLength - Optional value to specify the length of the id to be generated, defaults to 22
 */
export declare const base64Id: (maxLength?: number) => string;
