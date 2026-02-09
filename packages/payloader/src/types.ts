export type FetchData = Promise<Record<string, any>>;

export type LocaleCode = string;

export type LocalesData = {
  localeCodes: LocaleCode[];
  defaultLocale: LocaleCode;
};

export interface PayloadConfig {
  enable: boolean;
  apiUrl: string;
  serviceUser: string;
  servicePassord: string;
  env: "production" | "development";
}
