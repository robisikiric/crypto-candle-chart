import { EBaseType } from "../types/BaseType";
import { TSciChart } from "../types/TSciChart";
import { TSciChart3D } from "../types/TSciChart3D";
/**
 * Register a function that returns an object of the specified type.
 * @param baseType The {@link EBaseType} of the object that is being registered.
 * @param type The name of the type, which should be a subtype of the baseType.
 * For custom types, use the actual type name, not the "Custom" value on the subType enum.
 * @param constructor A function that takes an optional options argument and returns an instance of the desired type.
 * @param overWrite Whether to override an existing registration for the type.  Default false.
 */
export declare const registerType: <T extends object>(baseType: EBaseType, type: string, constructor: (options?: any) => T, overWrite?: boolean) => void;
/**
 * Register a function that requires a webAssemblyContext to return an object of the specified type.
 * @param baseType The {@link EBaseType} of the object that is being registered.
 * @param type The name of the type, which should be a subtype of the baseType.
 * For custom types, use the actual type name, not the "Custom" value on the subType enum.
 * @param constructor A function that takes a {@link TSciChart | SciChart 2D WebAssembly Context} or {@link TSciChart | SciChart 3D WebAssembly Context}
 * and an optional options argument and returns an instance of the desired type.
 * @param overWrite Whether to override an existing registration for the type.  Default false.
 */
export declare const registerWasmType: <T extends object>(baseType: EBaseType, type: string, constructor: (wasmContext: TSciChart | TSciChart3D, options?: any) => T, overWrite?: boolean) => void;
/**
 * Register a pure function
 * @param baseType The base type for, which indicates where the function will be used, Either OptionFunction or OnCreated
 * @param type The name of the function
 * @param constructor the function to register
 * @param overWrite Whether to override an existing registration for the type name.  Default false.
 */
export declare const registerFunction: <T extends Function>(baseType: EBaseType, type: string, constructor: T, overWrite?: boolean) => void;
export declare const getFunction: (baseType: EBaseType, type: string) => Function;
export declare const createType: (baseType: EBaseType, type: string, wasmContext: TSciChart | TSciChart3D, options: any) => any;
export declare const getSubTypes: (baseType: EBaseType) => string[];
