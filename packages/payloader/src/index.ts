import logger from "@setsetset-777/logger";

import type {
  PayloadConfig,
  LocaleCode,
  LocalesData,
  FetchData,
} from "./types.ts";

export { PayloadConfig, LocaleCode, LocalesData, FetchData };

let cachedToken: string | null = null;
let tokenExpiresAt = 0;

let config: PayloadConfig = {
  enable: false,
  apiUrl: "",
  serviceUser: "",
  servicePassord: "",
  env: "production",
};

const init = (initConfig: PayloadConfig) => {
  config = { ...config, ...initConfig };
};

const getToken = async () => {
  if (!config.enable) {
    return null;
  }

  const now = Date.now();

  if (cachedToken && now < tokenExpiresAt) {
    return cachedToken;
  }

  try {
    const res = await fetch(`${config.apiUrl}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: config.serviceUser,
        password: config.servicePassord,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to login to Payload");
    }

    const data = await res.json();
    cachedToken = data.token;
    tokenExpiresAt = data.exp * 1000;

    return cachedToken;
  } catch (e) {
    throw `getToken failed: ${e}`;
  }
};

/**
 * Fetches a record from PayloadCMS
 * Default to a collection type
 */
const fetchPayload = async (
  slug: string,
  type?: "global" | "collection" | "auth" | null,
  locale?: LocaleCode,
): FetchData => {
  if (!config.enable) {
    throw "No payload enabled. Fetch aborted.";
  }

  const token = await getToken();
  let path = "/";
  let params: {
    locale?: LocaleCode;
  } = {};

  if (["global", "collection"].includes(type as string)) {
    params.locale = locale;
  }

  if (type === "global") {
    path += "globals/";
  }

  path += slug;

  if (Object.keys(params).length > 0) {
    path += `?${Object.entries(params).map(([k, v]) => `${k}=${v}`)}`;
  }

  const url = `${config.apiUrl}${path}`;

  logger.info(`Fetching data with ${url}`);

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: config.env !== "development" ? `Bearer ${token}` : "",
      },
    });

    if (!res.ok) {
      throw `Something went wrong while fetching data with ${url}`;
    }

    const data = await res.json();

    logger.info(`Data received for ${url}: ${JSON.stringify(data)}`);

    return data;
  } catch (e) {
    throw `fetchPayload failed: ${e}`;
  }
};

/**
 * Fetches a global from PayloadCMS
 */
const fetchGlobal = async (path: string, locale?: LocaleCode): FetchData =>
  fetchPayload(path, "global", locale);

/**
 * Fetches a collection from PayloadCMS
 */
export const fetchCollection = async (
  path: string,
  locale?: LocaleCode,
): FetchData => fetchPayload(path, "global", locale);

/**
 * Fetches a page from PayloadCMS
 */
export const fetchPage = async (path: string, locale?: LocaleCode) => {
  return fetchGlobal(path, locale) ?? fetchCollection(path, locale);
};

/**
 * Fetches locales supported by PayloadCMS
 */
const fetchLocales = async (): Promise<LocalesData> =>
  fetchPayload("locales") as unknown as LocalesData;

export default {
  init: init,
  fetch: fetchPayload,
  global: fetchGlobal,
  page: fetchPage,
  collection: fetchCollection,
  locales: fetchLocales,
};
