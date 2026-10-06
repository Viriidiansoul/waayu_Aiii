/**
 * Application-wide constants
 * Centralizes configuration values to avoid magic strings/numbers
 */

/** Restaurant ID for the Waayu API */
export const RESTAURANT_ID = 6681;

/** Base URL for the Waayu API */
export const API_BASE_URL = 'https://webapi.waayu.app/api/v1';

/** Restaurant website URL (Order On Website button) */
export const WEBSITE_URL = 'https://waayu-aiii.vercel.app';

/** Restaurant webstore/app URL (Order On App button) */
export const APP_URL = 'https://waayu.app/webstore/?r=swn2d3/';

/** Default fallback images */
export const DEFAULT_IMAGES = {
  logo: 'assets/default-logo.png',
  menu: 'assets/home/menu_banner.jpg',
  gallery: 'assets/default.jpg',
  testimonial: 'assets/home/man.jpg',
  feature: 'assets/home/menu_banner.jpg',
  banner: '/assets/home/banner.jpeg',
};

/** Gallery slider configuration */
export const GALLERY_SLIDER = {
  itemWidth: 280,
  intervalMs: 3000,
};

/** Testimonial slider configuration */
export const TESTIMONIAL_SLIDER = {
  intervalMs: 3000,
};

/** Banner slider configuration */
export const BANNER_SLIDER = {
  intervalMs: 3000,
};
