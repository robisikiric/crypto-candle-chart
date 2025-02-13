"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector3 = void 0;
var Guard_1 = require("../Core/Guard");
/**
 * Defines a 3-component vector with X,Y,Z values
 */
var Vector3 = /** @class */ (function () {
    /**
     * Creates a 3-component vector with X,Y,Z values
     * @param x
     * @param y
     * @param z
     */
    function Vector3(x, y, z) {
        this.xProperty = x;
        this.yProperty = y;
        this.zProperty = z;
    }
    Object.defineProperty(Vector3, "zero", {
        /**
         * Returns a static shared zero vector where X,Y,Z = 0
         */
        get: function () {
            return Vector3.zeroVector;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector3.prototype, "x", {
        /**
         * Gets the X-value
         * @remarks
         * Warning! Treat {@link Vector3} as immutable! Do not set this value but create new vectors if you need to change a value
         */
        get: function () {
            return this.xProperty;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector3.prototype, "y", {
        /**
         * Gets the Y-value
         * @remarks
         * Warning! Treat {@link Vector3} as immutable! Do not set this value but create new vectors if you need to change a value
         */
        get: function () {
            return this.yProperty;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector3.prototype, "z", {
        /**
         * Gets the Z-value
         * @remarks
         * Warning! Treat {@link Vector3} as immutable! Do not set this value but create new vectors if you need to change a value
         */
        get: function () {
            return this.zProperty;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Used internally - converts the {@link Vector3} to a {@link TSRVector3} for compatibility with SciChart's webassembly engine
     * @param webAssemblyContext The {@link TSciChart3D | SciChart 3D WebAssembly Context}
     * containing native methods and access to our WebGL2 Engine and WebAssembly numerical methods
     */
    Vector3.prototype.toTsrVector3 = function (webAssemblyContext) {
        Guard_1.Guard.notNull(webAssemblyContext, "webAssemblyContext");
        return new webAssemblyContext.TSRVector3(this.x, this.y, this.z);
    };
    /**
     * Performs vector subtraction of this - other, returning the result in a new vector
     * @description
     * An example can be found below
     * ```ts
     * const firstVector = new Vector3(1,2,3);
     * const secondVector = new Vector3(1,1,1);
     * const result = firstVector.subtract(secondVector);
     * // Result is [0,1,2]
     * ```
     * @param other the vector to substract from this vector
     * @returns A new vector with the subtraction result
     */
    Vector3.prototype.subtract = function (other) {
        return new Vector3(this.x - other.x, this.y - other.y, this.z - other.z);
    };
    /**
     * Performs vector addition of this + other, returning the result in a new vector
     * @description
     * An example can be found below
     * ```ts
     * const firstVector = new Vector3(1,2,3);
     * const secondVector = new Vector3(1,1,1);
     * const result = firstVector.add(secondVector);
     * // Result is [2,3,4]
     * ```
     * @param other the vector to add to this vector
     * @returns A new vector with the addition result
     */
    Vector3.prototype.add = function (other) {
        return new Vector3(this.x + other.x, this.y + other.y, this.z + other.z);
    };
    /**
     * Performs scalar multiplication of this vector x scalar constant, returning the result in a new vector
     * @description
     * An example can be found below
     * ```ts
     * const firstVector = new Vector3(1,2,3);
     * const result = firstVector.scalarMultiply(2);
     * // Result is [2,4,6]
     * ```
     * @param scalar
     * @returns A new vector with the multiply result
     */
    Vector3.prototype.scalarMultiply = function (scalar) {
        return new Vector3(this.x * scalar, this.y * scalar, this.z * scalar);
    };
    /**
     * Performs vector dot product of this vector and another vector, returning the result as a scalar
     * @param rhs the other vector to apply to the right hand side of the dot product
     */
    Vector3.prototype.dotProduct = function (rhs) {
        return this.x * rhs.x + this.y * rhs.y + this.z * rhs.z;
    };
    /**
     * Performs vector cross product of this vector and another vector, returning the result in a new vector
     * @description
     * An example can be found below
     * ```ts
     * const firstVector = new Vector3(1,2,3);
     * const secondVector = new Vector3(4,5,6);
     * const result = firstVector.crossProduct(secondVector);
     * // Result is firstVector ^ (cross) secondVector
     * ```
     * @param rhs the other vector to apply to the right hand side of the cross product
     * @returns A new vector with the cross product result
     */
    Vector3.prototype.crossProduct = function (rhs) {
        return new Vector3(this.y * rhs.z - this.z * rhs.y, this.z * rhs.x - this.x * rhs.z, this.x * rhs.y - this.y * rhs.x);
    };
    Object.defineProperty(Vector3.prototype, "length", {
        /**
         * Gets the euclidean length of the vector
         */
        get: function () {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Normalizes the current vector by computing its X,Y,Z components which make the length = 1
     * but direction the same
     * @remarks
     * This is the only operation which modifies the current vector (not immutable)
     */
    Vector3.prototype.normalize = function () {
        var m = 1.0 / this.length;
        if (m === 0) {
            throw new Error("Vector3 magnitude is zero, cannot normalize!");
        }
        this.xProperty = this.xProperty * m;
        this.yProperty = this.yProperty * m;
        this.zProperty = this.zProperty * m;
    };
    /**
     * Returns a string representation of the vector for debugging purposes
     */
    Vector3.prototype.toString = function () {
        return "Vector3 (".concat(this.xProperty.toFixed(2), ", ").concat(this.yProperty.toFixed(2), ", ").concat(this.zProperty.toFixed(2), ")");
    };
    Vector3.zeroVector = new Vector3(0, 0, 0);
    return Vector3;
}());
exports.Vector3 = Vector3;
