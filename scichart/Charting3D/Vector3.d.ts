import { TSciChart3D, TSRVector3 } from "../types/TSciChart3D";
/**
 * Defines a 3-component vector with X,Y,Z values
 */
export declare class Vector3 {
    /**
     * Returns a static shared zero vector where X,Y,Z = 0
     */
    static get zero(): Vector3;
    private static readonly zeroVector;
    private xProperty;
    private yProperty;
    private zProperty;
    /**
     * Creates a 3-component vector with X,Y,Z values
     * @param x
     * @param y
     * @param z
     */
    constructor(x: number, y: number, z: number);
    /**
     * Gets the X-value
     * @remarks
     * Warning! Treat {@link Vector3} as immutable! Do not set this value but create new vectors if you need to change a value
     */
    get x(): number;
    /**
     * Gets the Y-value
     * @remarks
     * Warning! Treat {@link Vector3} as immutable! Do not set this value but create new vectors if you need to change a value
     */
    get y(): number;
    /**
     * Gets the Z-value
     * @remarks
     * Warning! Treat {@link Vector3} as immutable! Do not set this value but create new vectors if you need to change a value
     */
    get z(): number;
    /**
     * Used internally - converts the {@link Vector3} to a {@link TSRVector3} for compatibility with SciChart's webassembly engine
     * @param webAssemblyContext The {@link TSciChart3D | SciChart 3D WebAssembly Context}
     * containing native methods and access to our WebGL2 Engine and WebAssembly numerical methods
     */
    toTsrVector3(webAssemblyContext: TSciChart3D): TSRVector3;
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
    subtract(other: Vector3): Vector3;
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
    add(other: Vector3): Vector3;
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
    scalarMultiply(scalar: number): Vector3;
    /**
     * Performs vector dot product of this vector and another vector, returning the result as a scalar
     * @param rhs the other vector to apply to the right hand side of the dot product
     */
    dotProduct(rhs: Vector3): number;
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
    crossProduct(rhs: Vector3): Vector3;
    /**
     * Gets the euclidean length of the vector
     */
    get length(): number;
    /**
     * Normalizes the current vector by computing its X,Y,Z components which make the length = 1
     * but direction the same
     * @remarks
     * This is the only operation which modifies the current vector (not immutable)
     */
    normalize(): void;
    /**
     * Returns a string representation of the vector for debugging purposes
     */
    toString(): string;
}
