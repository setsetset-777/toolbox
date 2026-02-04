export type FetchData = Promise<Record<string, any>>;
type Locale = string;
interface PayloadConfig {
    enable: boolean;
    apiUrl: string;
    serviceUser: string;
    servicePassord: string;
    env: "production" | "development";
}
export declare const fetchCollection: (path: string, locale?: string) => FetchData;
export declare const fetchPage: (path: string, locale?: string) => Promise<Record<string, any>>;
declare const _default: {
    init: (initConfig: PayloadConfig) => void;
    fetch: (slug: string, type?: "global" | "collection" | "auth" | null, locale?: Locale) => FetchData;
    global: (path: string, locale?: string) => FetchData;
    page: (path: string, locale?: string) => Promise<Record<string, any>>;
    collection: (path: string, locale?: string) => FetchData;
};
export default _default;
