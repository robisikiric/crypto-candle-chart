import { IOhlcAnimationStyleOptions, OhlcAnimationStyle } from "./OhlcAnimationStyle";
export interface ICandlestickAnimationStyleOptions extends IOhlcAnimationStyleOptions {
    brushUp?: string;
    brushDown?: string;
}
export declare class CandlestickAnimationStyle extends OhlcAnimationStyle {
    private brushUpProperty;
    private brushDownProperty;
    private brushUpARGBProperty;
    private brushDownARGBProperty;
    constructor(options?: ICandlestickAnimationStyleOptions);
    set brushUp(value: string);
    get brushUp(): string;
    get brushUpARGB(): number;
    set brushDown(value: string);
    get brushDown(): string;
    get brushDownARGB(): number;
}
