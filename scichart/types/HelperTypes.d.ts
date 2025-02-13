/**
 * Copies own properties of an interface or copies all of its props if base type is not provided.
 * Makes all of the props required.
 */
export declare type RequiredOwnProps<Type extends BaseType, BaseType = {}> = Required<Omit<Type, keyof BaseType>>;
