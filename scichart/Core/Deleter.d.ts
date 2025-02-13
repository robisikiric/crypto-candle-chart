import { IDeletable } from "./IDeletable";
/**
 * Checks if an object implements {@link IDeletable}, then calls {@link IDeletable.delete}
 * @param object
 */
export declare function deleteSafe<T extends IDeletable>(object: T): T;
