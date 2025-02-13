/**
 * An EntityIdProvider generates integer Ids (must fit into UInt32) for meshs in the SciChart3D engine
 * There is a maximum of 4 billion vertices or meshes in the scene in any combination.
 * Users can override and implement their own IdProvider to recycle Ids if they wish
 */
export interface IEntityIdProvider {
    /**
     * Gets the next available EntityId (max value UInt32 is 4 billion)
     */
    getNextEntityId(): number;
    /**
     * Optional: releases an Id when an entity is removed fro the scene in the case where max mesh ID is hit
     * @param id
     */
    releaseEntityId(id: number): void;
}
/**
 * Default implementation of {@link IEntityIdProvider}. This implementation generates Ids from 0 to 4 billion
 * and does not recycle Ids. If you encounter the error "The max Mesh ID has been exceeded", you can override
 * releaseEntityId to create a more sophisticated IdProvider to recycle Ids.
 */
export declare class DefaultEntityIdProvider implements IEntityIdProvider {
    private currentId;
    private maxId;
    /** @inheritdoc */
    getNextEntityId(): number;
    /** @inheritdoc */
    releaseEntityId(id: number): void;
}
