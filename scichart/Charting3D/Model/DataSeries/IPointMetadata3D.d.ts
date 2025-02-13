/**
 * Metadata may be added to some 3D Chart {@link BaseDataSeries3D | DataSeries} to define per-point colouring and scaling.
 * You can optionally create types that implement {@link IPointMetadata3D} to pass further info through per-point
 * @remarks See an example of this in our demos for {@link ScatterRenderableSeries3D}
 */
export interface IPointMetadata3D {
    /**
     * @deprecated Property naming was wrong, we've updated it to vertexColor [SCJS-1566]
     */
    vertexColorAbgr?: number;
    /**
     * Override the color for this particular point. Set=undefined for default.
     * Note: This is a 32-bit integer in ARGB format, e.g. 0xFFFF0000 is Red
     */
    vertexColor?: number;
    /**
     * Override the scale for this particular point. Set=1.0 for default
     */
    pointScale?: number;
}
