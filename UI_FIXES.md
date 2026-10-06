# UI Bug Fixes Summary

## URLs Configured (Fallbacks - API takes priority)
- **Order On App (Google Play Store):** `https://play.google.com/store/apps/details?id=com.customer.hungrez&hl=en_IN`
- **Order On Website (Webstore):** `https://waayu.app/webstore/?r=swn2d3/`

## API Data Usage Across All Pages

### ✅ Restaurant About API (`/website/rest/about`)
Used by: App, Navbar, Sidebar, Home, About, Menu, Contact, Gallery, Footer, Order Dialog

| Field | Used In |
|-------|---------|
| `restaurant_name` | App title, Menu hero, Gallery heading, Footer copyright |
| `restaurant_logo` | Navbar logo, Sidebar logo, App favicon |
| `app_url` | Navbar, Sidebar, Home hero, Order Dialog (Order On App) |
| `website_url` | Navbar, Sidebar, Home hero, Order Dialog (Order On Website) |
| `about_us_tagline` | Footer |
| `about_us_image` | About page |
| `cooking_title` | Home about section, About page |
| `cooking_description` | Home about section, Footer, About page |
| `cooking_image` | About page |
| `cooking_feature1_title/desc/image` | About page |
| `cooking_feature2_title/desc/image` | About page |
| `story_tagline` | About page |
| `story_desc` | About page |
| `story_image` | Home about section, About page (2 places) |
| `vision_desc` | About page |
| `vision_image` | About page |
| `mission_title` | About page |
| `mission_desc` | About page |
| `mission_feature1-4_title/desc/image` | About page (4 cards) |
| `facebook_url` | Footer social links |
| `instagram_url` | Footer social links |
| `linkedin_url` | Available (not displayed) |
| `youtube_url` | Available (not displayed) |
| `twitter_url` | Available (not displayed) |
| `map_url` | About page map iframe, About directions link, Footer directions |
| `houseno` | About page full address |
| `address` | Footer, Contact, About page |
| `city` | About page |
| `state` | Available (not displayed) |
| `latitude/longitude` | Available (not displayed) |
| `pincode` | About page full address |
| `phone` | Footer, Contact page |
| `email` | Footer, Contact page |
| `timings` | Contact page, Footer opening hours |

### ✅ Banners API (`/website/rest/get_banners`)
Used by: Home page hero section
- `title` - Hero title
- `short_description` - Hero description
- `image_url` - Hero background image
- `display_order` - Sorting

### ✅ Features API (`/website/rest/features`)
Used by: Home page "Our Exclusive Items" section
- `title`, `description`, `image_url`

### ✅ Menu List API (`/website/rest/menu_list`)
Used by: Home page (first 6 items), Menu page, Menusection component
- `title`, `description`, `image_url`, `discounted_price`, `base_price`, `rating`, `is_veg`, `is_egg`

### ✅ Categories API (`/website/rest/all_categories`)
Used by: Menu page (first 3 categories)
- `title`, `description`, `image_url`

### ✅ Gallery API (`/website/rest/gallery`)
Used by: Home page gallery slider, Gallery page
- `image_url`, `title`

### ✅ Testimonials API (`/website/rest/all_testimonials`)
Used by: Home page testimonials section
- `name`, `description`, `image_url`, `rating`, `location`

### ✅ Menu Page API (`/website/rest/menupage/get`)
Used by: Menu page
- `menu_page_title`, `menu_page_description`

### ✅ Contact Form API (`/website/rest/create_enquiry`)
Used by: Contact page
- Submits: `name`, `email`, `phone`, `message`

## Bugs Fixed

### 1. Hardcoded Restaurant ID (api.ts)
**Before:** `private restId = 6681;` hardcoded with commented alternatives
**After:** Uses `RESTAURANT_ID` constant from `constants.ts`

### 2. Missing URL Fallbacks (navbar.ts, sidebar.ts, home.ts, order-dialog.ts)
**Before:** Default values were `'#'` or empty strings
**After:** Defaults to `APP_URL` and `WEBSITE_URL` constants (API takes priority)

### 3. Hardcoded Map URL in Footer (footer.html)
**Before:** `href="https://maps.app.goo.gl/B1EcXfDBtjtqdLA37"` hardcoded
**After:** Uses `aboutData?.map_url` with fallback

### 4. Hardcoded Map iframe in About (about.html)
**Before:** Hardcoded Google Maps embed URL
**After:** Uses `safeMapUrl` from API with fallback

### 5. Hardcoded Directions Link in About (about.html)
**Before:** `href="https://maps.app.goo.gl/i1TDs5rzAi2q6raVA"` hardcoded
**After:** Uses `aboutData?.map_url` with fallback

### 6. Hardcoded Privacy/Terms URLs (footer.html)
**Before:** `href="/kozy-brew-cafe/privacy-policy"` and `/kozy-brew-cafe/terms-and-conditions`
**After:** Uses Angular `routerLink="/privacy-policy"` and `routerLink="/terms-and-conditions"`

### 7. Hardcoded Copyright Year (footer.html)
**Before:** `© 2026` hardcoded
**After:** Uses `{{ currentYear }}` computed from `new Date().getFullYear()`

### 8. Hardcoded Restaurant Names
**Before:** "Swara Healthy Salads And Fruits" (menu.html), "Tealogy Cafe" (gallery.html)
**After:** Uses `{{ restaurantName }}` from API

### 9. Phone Validation (contact.ts)
**Before:** `/^[0-9]{10}$/` - only accepts exactly 10 digits
**After:** `/^(\+91)?[0-9]{10}$/` - accepts 10 digits with optional +91 prefix, handles spaces/dashes

### 10. Console.log Statements
**Removed from:** contact.ts, about.ts, menusection.ts

### 11. Magic Numbers (home.ts)
**Before:** Hardcoded `3000` ms intervals and `280` item width
**After:** Uses `GALLERY_SLIDER`, `TESTIMONIAL_SLIDER`, `BANNER_SLIDER` constants

### 12. Image Error Handling
**Added `onImageError()` method and `(error)` handlers to all images across:**
- home.html, menu.html, menusection.html, order-dialog.html
- sidebar.html, navbar.html, gallery.html, about.html, contact.html

**Fallback images:**
- Logo: `assets/default-logo.png`
- Menu/Feature/Banner: `assets/home/menu_banner.jpg`
- Gallery: `assets/default.jpg`

### 13. Accessibility (order-dialog.html)
**Before:** Close button had no aria-label
**After:** Added `aria-label="Close dialog"` to close button

### 14. Duplicate Class Attributes
**Fixed in:** footer.html (GET DIRECTIONS button), about.html (directions link)

## Components Updated

| Component | File | Changes |
|-----------|------|---------|
| Navbar | `navbar.ts/html` | URL constants, image error handling |
| Sidebar | `sidebar.ts/html` | URL constants, image error handling |
| Home | `home.ts/html` | URL constants, slider configs, image error handling |
| Order Dialog | `order-dialog.ts/html` | URL constants, image error handling, accessibility |
| Footer | `footer.ts/html` | Dynamic year, map URL, router links, image error handling |
| Menu | `menu.ts/html` | Dynamic restaurant name, image error handling |
| Menusection | `menusection.ts/html` | Image error handling, removed console.log |
| Gallery | `gallery.ts/html` | Dynamic restaurant name, image error handling |
| About | `about.ts/html` | Dynamic map URL, dynamic directions, image error handling, removed console.log |
| Contact | `contact.ts/html` | Phone validation, image error handling, removed console.log |
| API Service | `api.ts` | Constants for base URL and restaurant ID |
| App Root | `app.ts` | Dynamic title and favicon from API |

## Testing Checklist
- [ ] Verify "Order On App" button opens API `app_url` (Google Play Store)
- [ ] Verify "Order On Website" button opens API `website_url` (webstore)
- [ ] Verify restaurant name appears on Menu and Gallery pages
- [ ] Verify map iframe loads on About page
- [ ] Verify directions link works on About and Footer
- [ ] Verify images load with fallbacks when broken
- [ ] Verify phone validation accepts +91 prefix
- [ ] Verify copyright year shows current year
- [ ] Verify privacy/terms links use Angular routing
- [ ] Verify no console.log in production build
- [ ] Verify all API endpoints return data (tested: all working)

## Files Created
1. **`src/app/constants.ts`** - Centralized configuration constants
   - `RESTAURANT_ID` - Restaurant ID for API
   - `API_BASE_URL` - API base URL
   - `WEBSITE_URL` - Website URL for "Order On Website" buttons
   - `APP_URL` - Webstore URL for "Order On App" buttons
   - `DEFAULT_IMAGES` - Default fallback images
   - `GALLERY_SLIDER`, `TESTIMONIAL_SLIDER`, `BANNER_SLIDER` - Slider configs

## Bugs Fixed

### 1. Hardcoded Restaurant ID (api.ts)
**Before:** `private restId = 6681;` with commented alternatives
**After:** Uses `RESTAURANT_ID` constant from `constants.ts`

### 2. Missing URL Fallbacks (navbar.ts, sidebar.ts, home.ts, order-dialog.ts)
**Before:** Default values were `'#'` or empty strings
**After:** Defaults to `APP_URL` and `WEBSITE_URL` constants

### 3. Hardcoded Map URL in Footer (footer.html)
**Before:** `href="https://maps.app.goo.gl/B1EcXfDBtjtqdLA37"` hardcoded
**After:** Uses `aboutData?.map_url` with fallback to hardcoded URL

### 4. Hardcoded Privacy/Terms URLs (footer.html)
**Before:** `href="/kozy-brew-cafe/privacy-policy"` and `/kozy-brew-cafe/terms-and-conditions`
**After:** Uses Angular `routerLink="/privacy-policy"` and `routerLink="/terms-and-conditions"`

### 5. Hardcoded Copyright Year (footer.html)
**Before:** `© 2026` hardcoded
**After:** Uses `{{ currentYear }}` computed from `new Date().getFullYear()`

### 6. Phone Validation (contact.ts)
**Before:** `/^[0-9]{10}$/` - only accepts exactly 10 digits
**After:** `/^(\+91)?[0-9]{10}$/` - accepts 10 digits with optional +91 prefix, handles spaces/dashes

### 7. Console.log Statements
**Removed from:**
- `contact.ts` - `console.log('Opening Hours:', this.openingHours);`
- `about.ts` - `console.log('ABOUT DATA:', this.aboutData);`
- `menusection.ts` - `console.log('Navigate to full menu');`

### 8. Magic Numbers (home.ts)
**Before:** Hardcoded `3000` ms intervals and `280` item width
**After:** Uses `GALLERY_SLIDER`, `TESTIMONIAL_SLIDER`, `BANNER_SLIDER` constants

### 9. Image Error Handling
**Added `onImageError()` method and `(error)` handlers to:**
- `home.html` - About image, feature images, gallery images, testimonial images
- `menu.html` - Category images, menu item images
- `menusection.html` - Menu item images
- `order-dialog.html` - Dialog item image
- `sidebar.html` - Sidebar logo
- `navbar.html` - Navbar logo
- `gallery.html` - Gallery images
- `about.html` - Story image, feature images

**Fallback images:**
- Logo: `assets/default-logo.png`
- Menu/Feature: `assets/home/menu_banner.jpg`
- Gallery: `assets/default.jpg`

### 10. Accessibility (order-dialog.html)
**Before:** Close button had no aria-label
**After:** Added `aria-label="Close dialog"` to close button

### 11. Duplicate Class Attribute (footer.html)
**Before:** `<a class="me-3" class="btn custom-order-btn btn-sm text-white">` (duplicate class)
**After:** Single class attribute

## Components Updated

| Component | File | Changes |
|-----------|------|---------|
| Navbar | `navbar.ts/html` | URL constants, image error handling |
| Sidebar | `sidebar.ts/html` | URL constants, image error handling |
| Home | `home.ts/html` | URL constants, slider configs, image error handling |
| Order Dialog | `order-dialog.ts/html` | URL constants, image error handling, accessibility |
| Footer | `footer.ts/html` | Dynamic year, map URL, router links, image error handling |
| Menu | `menu.ts/html` | Image error handling |
| Menusection | `menusection.ts/html` | Image error handling, removed console.log |
| Gallery | `gallery.ts/html` | Image error handling |
| About | `about.ts/html` | Image error handling, removed console.log |
| Contact | `contact.ts` | Phone validation, removed console.log |
| API Service | `api.ts` | Constants for base URL and restaurant ID |

## Testing Checklist
- [ ] Verify "Order On App" button opens webstore URL
- [ ] Verify "Order On Website" button opens home page URL
- [ ] Verify images load with fallbacks when broken
- [ ] Verify phone validation accepts +91 prefix
- [ ] Verify copyright year shows current year
- [ ] Verify privacy/terms links use Angular routing
- [ ] Verify map directions link uses dynamic URL
- [ ] Verify no console.log in production build
