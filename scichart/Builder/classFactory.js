"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubTypes = exports.createType = exports.getFunction = exports.registerFunction = exports.registerWasmType = exports.registerType = void 0;
// tslint:disable: ban-types
var constructorMap = new Map();
/**
 * Register a function that returns an object of the specified type.
 * @param baseType The {@link EBaseType} of the object that is being registered.
 * @param type The name of the type, which should be a subtype of the baseType.
 * For custom types, use the actual type name, not the "Custom" value on the subType enum.
 * @param constructor A function that takes an optional options argument and returns an instance of the desired type.
 * @param overWrite Whether to override an existing registration for the type.  Default false.
 */
var registerType = function (baseType, type, constructor, overWrite) {
    if (overWrite === void 0) { overWrite = false; }
    var typeName = baseType + ":" + type;
    if (constructorMap.has(typeName) && !overWrite) {
        throw new Error("Type " + typeName + " is already registered.  Call with overWrite: true if you intended to replace it.");
    }
    constructorMap.set(typeName, { func: constructor });
};
exports.registerType = registerType;
/**
 * Register a function that requires a webAssemblyContext to return an object of the specified type.
 * @param baseType The {@link EBaseType} of the object that is being registered.
 * @param type The name of the type, which should be a subtype of the baseType.
 * For custom types, use the actual type name, not the "Custom" value on the subType enum.
 * @param constructor A function that takes a {@link TSciChart | SciChart 2D WebAssembly Context} or {@link TSciChart | SciChart 3D WebAssembly Context}
 * and an optional options argument and returns an instance of the desired type.
 * @param overWrite Whether to override an existing registration for the type.  Default false.
 */
var registerWasmType = function (baseType, type, constructor, overWrite) {
    if (overWrite === void 0) { overWrite = false; }
    var typeName = baseType + ":" + type;
    if (constructorMap.has(typeName) && !overWrite) {
        throw new Error("Type " + typeName + " is already registered.  Call with overWrite: true if you intended to replace it.");
    }
    constructorMap.set(typeName, { wasm: true, func: constructor });
};
exports.registerWasmType = registerWasmType;
/**
 * Register a pure function
 * @param baseType The base type for, which indicates where the function will be used, Either OptionFunction or OnCreated
 * @param type The name of the function
 * @param constructor the function to register
 * @param overWrite Whether to override an existing registration for the type name.  Default false.
 */
var registerFunction = function (baseType, type, constructor, overWrite) {
    if (overWrite === void 0) { overWrite = false; }
    var typeName = baseType + ":" + type;
    if (constructorMap.has(typeName) && !overWrite) {
        throw new Error("Function " + typeName + " is already registered.  Call with overWrite: true if you intended to replace it.");
    }
    constructorMap.set(typeName, { func: constructor });
};
exports.registerFunction = registerFunction;
var getFunction = function (baseType, type) {
    var typeName = baseType + ":" + type;
    var elem = constructorMap.get(typeName);
    if (elem) {
        return elem.func;
    }
    else {
        throw new Error("Nothing registered for " + typeName);
    }
};
exports.getFunction = getFunction;
var createType = function (baseType, type, wasmContext, options) {
    var typeName = baseType + ":" + type;
    var elem = constructorMap.get(typeName);
    if (elem) {
        var wasm = elem.wasm, func = elem.func;
        if (wasm) {
            return func(wasmContext, options);
        }
        else {
            return func(options);
        }
    }
    else {
        throw new Error("Nothing registered for " + typeName);
    }
};
exports.createType = createType;
var getSubTypes = function (baseType) {
    var keys = Array.from(constructorMap.keys());
    return keys
        .map(function (k) { return k.split(":"); })
        .filter(function (a) { return a[0] === baseType; })
        .map(function (a) { return a[1]; });
};
exports.getSubTypes = getSubTypes;
