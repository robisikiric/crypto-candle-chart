import { DeletableEntity } from "../../Core/DeletableEntity";
import { IDeletable } from "../../Core/IDeletable";
import { SCRTSolidBrush, TSciChart } from "../../types/TSciChart";
/**
 * @ignore
 */
export declare class SolidBrushCache extends DeletableEntity implements IDeletable {
    private webAssemblyContext;
    private color;
    private transparent;
    private brush;
    constructor(webAssemblyContext: TSciChart);
    /**
     * Creates or fetches a new Brush with the specified color string and properties
     * @param color
     * @param transparent
     */
    newBrush(color: string, transparent?: boolean): SCRTSolidBrush;
    /**
     * @inheritDoc
     */
    delete(): void;
}
