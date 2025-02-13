export interface IPointMetadata {
    isSelected: boolean;
}
/**
 * A MetadataGenerator is used with the builder api to provide metadata when it is unecessary or impossible to provide it all as pure data
 * Case 1: You want to use the same metadata object for all data points (eg to enable data point selection).  getSingleMetadata will be called to populate metadata for each data point added.
 * Case 2: You want to use a class for metadata that contains logic that cannot be serialized.  Use I1DMetadataGenerator (or I2DMetadataGenerator for heatmap data). getMetadata will be called to populate the metadata.
 */
export interface IMetadataGenerator {
    type: string;
    getSingleMetadata: () => IPointMetadata;
    toJSON: () => IPointMetadata[][] | IPointMetadata[] | IPointMetadata | {
        type: string;
        data?: any;
    };
}
export interface I1DMetadataGenerator extends IMetadataGenerator {
    getMetadata: () => IPointMetadata[];
}
export interface I2DMetadataGenerator extends IMetadataGenerator {
    getMetadata: () => IPointMetadata[][];
}
export declare class TemplateMetadataGenerator implements IMetadataGenerator {
    type: "Template";
    template: IPointMetadata;
    constructor(template: IPointMetadata);
    getSingleMetadata(): IPointMetadata;
    getMetadata(): IPointMetadata[];
    toJSON(): IPointMetadata[][] | IPointMetadata[] | IPointMetadata | {
        type: string;
        data?: any;
    };
}
