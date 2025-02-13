import { NumberArray } from "../../types/NumberArray";
import { FloatVector, SCRTDoubleVector, SCRTFloatVector, TSciChart } from "../../types/TSciChart";
export declare const SIZEOF_NUMBER = 8;
export declare const SIZEOF_FLOAT32 = 4;
/**
 * Inserts the values from the source Js array into the destination wasm array (and resizes) at index destIndex
 * @param wasmContext
 * @param source
 * @param dest
 * @param destIndex
 */
export declare function insertDoubleVectorFromJsArray(wasmContext: TSciChart, source: NumberArray, dest: SCRTDoubleVector, destIndex: number): void;
/**
 * Copies the values from the source Js array into the destination wasm array (and resizes) at index destIndex
 * @param wasmContext
 * @param source
 * @param dest
 * @param destIndex
 */
export declare function memCopyFloat32(wasmContext: TSciChart, source: Float32Array, dest: SCRTFloatVector | FloatVector, destIndex: number): void;
/**
 * Resizes the destinationVector by jsArray.length and copies the values into it
 * @param wasmContext
 * @param destinationVector
 * @param jsArray
 * @param experimentalMethod
 */
export declare function appendDoubleVectorFromJsArray(wasmContext: TSciChart, destinationVector: SCRTDoubleVector, jsArray: NumberArray, experimentalMethod?: boolean): void;
