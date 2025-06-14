/*
 * Application info
 */
export const APP_NAME = "H5Radar";
export const APP_DESCRIPTION = "No terra incognita!";
export const APP_VERSION = "0.0.1";

/*
 * Endpoints settings
 */
export const ACCOUNT_API_URL = import.meta.env.VITE_ACCOUNT_API_URL || "http://127.0.0.1:8070";
export const RADAR_API_URL = import.meta.env.VITE_RADAR_API_URL || "http://127.0.0.1:8080";

/*
 * Feature toggles
 */
export const BILLING_ENABLED = import.meta.env.VITE_BIILLIG_ENABLED || "false";
export const NOTIFICATIONS_ENABLED = import.meta.env.VITE_NOTIFICATIONS_ENABLED || "false";

/*
 * Settings
 */
export const DEBOUNCE_TIME = 400;
export const QUERY_RETRY_COUNT = 3;
