export declare const getUserCookie: () => {
    userId: string;
    sessionId: string;
    sessionStart: number;
};
export declare const shouldSendTelemetry: () => boolean;
export declare const sendTelemetry: () => void;
