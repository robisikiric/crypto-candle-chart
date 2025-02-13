import { DeletableEntity } from "../../Core/DeletableEntity";
import { ICacheable } from "../../Core/ICacheable";
import { IDeletable } from "../../Core/IDeletable";
import { TSciChart } from "../../types/TSciChart";
/**
 * @ignore
 */
export declare abstract class BaseCache<CachedEntityType extends IDeletable> extends DeletableEntity implements IDeletable, ICacheable {
    protected webAssemblyContext: TSciChart;
    protected cachedEntity: CachedEntityType;
    /**
     * Creates an instance of {@link BaseCache}
     * @param webAssemblyContext the {@link TSciChart | SciChart WebAssembly Context} containing native methods
     * and access to our underlying WebGL2 rendering engine
     */
    constructor(webAssemblyContext?: TSciChart);
    /**
     * Retrieves the cached value
     */
    get value(): CachedEntityType;
    /**
     * Creates new or retrieves from cache an object instantiated with the specified params.
     * Caches the returned value and params.
     */
    abstract create(...params: any[]): CachedEntityType;
    /**
     * @inheritDoc
     */
    invalidateCache(): void;
    /**
     * @inheritDoc
     */
    resetCache(): void;
    /**
     * @inheritDoc
     */
    delete(): void;
}
