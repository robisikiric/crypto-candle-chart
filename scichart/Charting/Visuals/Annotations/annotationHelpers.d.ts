export declare const annotationHelpers: {
    createSvg: (svgString: string, svgRoot: Node, nextElement?: Element) => SVGElement;
    calcNewApex: (x1: number, y1: number, x2: number, y2: number, isVertical: boolean) => {
        x1y1: {
            x: number;
            y: number;
        };
        x2y1: {
            x: number;
            y: number;
        };
        x1y2: {
            x: number;
            y: number;
        };
        x2y2: {
            x: number;
            y: number;
        };
    };
};
