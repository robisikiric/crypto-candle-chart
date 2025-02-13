/**
 * Helper function to create an HTML Image {@link HTMLImageElement} asychronously
 * by passing in the string image source
 * @remarks Returns a promise, await this to get the image element
 * @param src
 */
export declare function createImageAsync(src: string): Promise<HTMLImageElement>;
/**
 * Helper function to create an HTML Images {@link HTMLImageElement} asychronously
 * by passing in the string array
 * @param images
 */
export declare function createImagesArrayAsync(images: string[]): Promise<HTMLImageElement[]>;
