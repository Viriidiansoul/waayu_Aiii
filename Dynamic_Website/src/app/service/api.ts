import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';

export interface MenuItem {
  id: number;
  restaurant_id: number;
  category_id: number;
  title: string;
  slug: string;
  description: string;
  image_url: string | null;
  rating: string;
  discounted_price: string;
  base_price: string;
  is_veg: number;
  is_egg: number;
  display_order: number;
  is_active: number;
  created_at: string;
  updated_at: string;
}

export interface MenuListResponse {
  message: string;
  data: MenuItem[];
  success: boolean;
}

export interface Category {
  id: number;
  restaurant_id: number;
  title: string;
  slug: string;
  description: string;
  image_url: string | null;
  display_order: number;
  is_active: number;
  created_at: string;
  updated_at: string;
}

export interface CategoryResponse {
  message: string;
  data: Category[];
  success: boolean;
}

export interface GalleryItem {
  id: number;
  restaurant_id: number;
  image_url: string | null;
  title: string;
  display_order: number;
  is_active: number;
  created_at: string;
  updated_at: string;
}

export interface GalleryResponse {
  message: string;
  data: GalleryItem[];
  success: boolean;
}

export interface RestaurantAbout {
  id: number;
  restaurant_id: number;
  restaurant_name: string;
  restaurant_logo: string | null;
  about_us_tagline: string;
  about_us_image: string | null;
  cooking_title: string;
  cooking_description: string;
  cooking_image: string | null;
  cooking_feature1_title: string;
  cooking_feature1_desc: string;
  cooking_feature1_image: string | null;
  cooking_feature2_title: string;
  cooking_feature2_desc: string;
  cooking_feature2_image: string | null;
  story_tagline: string;
  story_desc: string;
  story_image: string | null;
  vision_desc: string;
  vision_image: string | null;
  mission_title: string;
  mission_desc: string;
  mission_feature1_title: string;
  mission_feature1_desc: string;
  mission_feature1_image: string | null;
  mission_feature2_title: string;
  mission_feature2_desc: string;
  mission_feature2_image: string | null;
  mission_feature3_title: string;
  mission_feature3_desc: string;
  mission_feature3_image: string | null;
  mission_feature4_title: string;
  mission_feature4_desc: string;
  mission_feature4_image: string | null;
  app_url: string | null;
  website_url: string | null;
  facebook_url: string | null;
  instagram_url: string | null;
  linkedin_url: string | null;
  youtube_url: string | null;
  twitter_url: string | null;
  opening_hours: string | null;
  opening_hours_evening: string | null;
  closing_hours: string | null;
  closing_hours_evening: string | null;
  working_days: string | null;
  timings: OpeningHour[] | null;
  map_url: string | null;
  houseno: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  latitude: number | null;
  longitude: number | null;
  pincode: number | null;
  phone: number | null;
  email: string | null;
  created_at: string;
  updated_at: string;
}

export interface RestaurantAboutResponse {
  message: string;
  data: RestaurantAbout;
  success: boolean;
}

export interface Banner {
  id: number;
  title: string;
  short_description: string;
  long_description: string;
  image_url: string | null; // background
  foreground_image?: string | null; // 👈 ADD THIS
  display_order: number;
}

export interface BannerResponse {
  message: string;
  data: Banner[];
  success: boolean;
}

export interface Feature {
  id: number;
  restaurant_id: number;
  title: string;
  description: string;
  image_url: string | null;
  is_active: number;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface FeatureResponse {
  message: string;
  data: Feature[];
  success: boolean;
}

export interface Testimonial {
  id: number;
  restaurant_id: number;
  name: string;
  location: string;
  description: string;
  image_url: string | null;
  rating: string;
  display_order: number;
  is_active: number;
  created_at: string;
  updated_at: string;
}

export interface TestimonialResponse {
  message: string;
  data: Testimonial[];
  success: boolean;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface OpeningHour {
  day: string;
  isOpen: boolean;
  morningOpen: string | null;
  morningClose: string | null;
  eveningOpen: string | null;
  eveningClose: string | null;
}

export interface OpeningHoursResponse {
  message: string;
  data: OpeningHour[];
  success: boolean;
}

export interface MenuPageData {
  id: number;
  rid: number;
  menu_page_title: string;
  menu_page_description: string;
}

export interface MenuPageResponse {
  message: string;
  data: MenuPageData;
  success: boolean;
}

/** Group consecutive days that share the same timings */
export interface GroupedHours {
  days: string;
  morningOpen: string;
  morningClose: string;
  eveningOpen: string | null;
  eveningClose: string | null;
  isOpen: boolean;
}

/** Generic data for order dialog — works for MenuItem or Category */
export interface DialogData {
  title: string;
  image_url: string | null;
  description: string;
  is_veg?: number;
  is_egg?: number;
  base_price?: string;
  discounted_price?: string;
  isCategory?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://webapi.waayu.app/api/v1';
  // private restId = 5865; //family kitchen

  // private restId = 6171;
  // private restId = 6674; //bhua cha dhakka
  // private restId = 6678; //tealogy
  private restId = 6681; //swara

  constructor(private http: HttpClient) {}

  // ========== RESTAURANT ABOUT (cached in localStorage) ==========
  getRestaurantAbout(): Observable<RestaurantAbout> {
    return this.http
      .post<RestaurantAboutResponse>(`${this.baseUrl}/website/rest/about`, {
        rid: this.restId,
      })
      .pipe(
        map((res) => res.data),
        tap((data) => {
          localStorage.setItem('rest_about', JSON.stringify(data));
        }),
      );
  }

  /** Get cached restaurant about from localStorage (sync) */
  getCachedAbout(): RestaurantAbout | null {
    const cached = localStorage.getItem('rest_about');
    return cached ? JSON.parse(cached) : null;
  }

  /**
   * Convert any Google Maps URL into an embeddable iframe URL.
   * For short links (goo.gl), uses restaurant data to build a search query.
   * Pass optional RestaurantAbout to build a location query for short links.
   */
  toEmbedMapUrl(url: string, about?: RestaurantAbout | null): string {
    if (!url) return '';
    // Already an embed URL — use as-is
    if (url.includes('/maps/embed')) return url;
    // If it contains coordinates like @18.515,73.808 — extract and use
    const coordMatch = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (coordMatch) {
      return `https://www.google.com/maps?q=${coordMatch[1]},${coordMatch[2]}&output=embed`;
    }
    // If it contains /place/Hotel+Name — extract place name
    const placeMatch = url.match(/\/place\/([^/@]+)/);
    if (placeMatch) {
      const query = decodeURIComponent(placeMatch[1].replace(/\+/g, ' '));
      return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
    }
    // For short links or unknown formats — build query from restaurant data
    if (about) {
      const parts: string[] = [];
      if (about.restaurant_name) parts.push(about.restaurant_name);
      if (about.address) parts.push(about.address);
      if (about.city) parts.push(about.city);
      if (parts.length) {
        return `https://www.google.com/maps?q=${encodeURIComponent(parts.join(', '))}&output=embed`;
      }
    }
    // Last fallback — use restaurant name from cache
    const cached = this.getCachedAbout();
    if (cached) {
      const parts: string[] = [];
      if (cached.restaurant_name) parts.push(cached.restaurant_name);
      if (cached.address) parts.push(cached.address);
      if (cached.city) parts.push(cached.city);
      if (parts.length) {
        return `https://www.google.com/maps?q=${encodeURIComponent(parts.join(', '))}&output=embed`;
      }
    }
    return `https://www.google.com/maps?q=${encodeURIComponent(url)}&output=embed`;
  }

  /** Convert 24h time string like "10:00" or "22:00" to "10:00 AM" / "10:00 PM" */
  formatTime(time24: string): string {
    const [hourStr, minStr] = time24.split(':');
    let hour = parseInt(hourStr, 10);
    const min = minStr || '00';
    const ampm = hour >= 12 ? 'PM' : 'AM';
    if (hour === 0) hour = 12;
    else if (hour > 12) hour -= 12;
    return `${hour.toString().padStart(2, '0')}:${min} ${ampm}`;
  }

  /** Parse working_days string like "1.2.3.4.5,6,7" into array of day numbers */
  parseWorkingDays(working_days: string): number[] {
    return working_days
      .replace(/\./g, ',')
      .split(',')
      .map((d) => parseInt(d.trim(), 10))
      .filter((d) => !isNaN(d));
  }

  // ========== BANNERS ==========
  getBanners(): Observable<Banner[]> {
    return this.http
      .post<BannerResponse>(`${this.baseUrl}/website/rest/get_banners`, {
        rid: this.restId,
      })
      .pipe(
        map((res) =>
          res.data.sort((a, b) => a.display_order - b.display_order),
        ),
      );
  }

  // ========== FEATURES ==========
  getFeatures(): Observable<Feature[]> {
    return this.http
      .post<FeatureResponse>(`${this.baseUrl}/website/rest/features`, {
        rid: this.restId,
      })
      .pipe(
        map((res) =>
          res.data
            .filter((item) => item.is_active === 1)
            .sort((a, b) => a.display_order - b.display_order),
        ),
      );
  }

  // ========== MENU ==========
  getMenuItems(): Observable<MenuItem[]> {
    return this.http
      .post<MenuListResponse>(`${this.baseUrl}/website/rest/menu_list`, {
        rid: this.restId,
      })
      .pipe(
        map((res) =>
          res.data
            .filter((item) => item.is_active === 1)
            .sort((a, b) => a.display_order - b.display_order),
        ),
      );
  }

  // ========== CATEGORIES ==========
  getCategories(): Observable<Category[]> {
    return this.http
      .post<CategoryResponse>(`${this.baseUrl}/website/rest/all_categories`, {
        rid: this.restId,
      })
      .pipe(
        map((res) =>
          res.data
            .filter((item) => item.is_active === 1)
            .sort((a, b) => a.display_order - b.display_order),
        ),
      );
  }

  // ========== GALLERY ==========
  getGalleryItems(): Observable<GalleryItem[]> {
    return this.http
      .post<GalleryResponse>(`${this.baseUrl}/website/rest/gallery`, {
        rid: this.restId,
      })
      .pipe(map((res) => res.data.filter((item) => item.is_active === 1)));
  }

  // ========== TESTIMONIALS ==========
  getTestimonials(): Observable<Testimonial[]> {
    return this.http
      .post<TestimonialResponse>(
        `${this.baseUrl}/website/rest/all_testimonials`,
        {
          rid: this.restId,
        },
      )
      .pipe(
        map((res) =>
          res.data
            .filter((item) => item.is_active === 1)
            .sort((a, b) => a.display_order - b.display_order),
        ),
      );
  }

  // ========== CONTACT ==========
  submitContactForm(
    data: ContactForm,
  ): Observable<{ message: string; success: boolean }> {
    return this.http
      .post<{
        message: string;
        data: any;
        success: boolean;
      }>(`${this.baseUrl}/website/rest/create_enquiry`, {
        rid: this.restId,
        ...data,
      })
      .pipe(map((res) => ({ message: res.message, success: res.success })));
  }

  // ========== OPENING HOURS ==========
  /** Extract opening hours from RestaurantAbout timings field, formatted to 12hr */
  getOpeningHoursFromAbout(data: RestaurantAbout): OpeningHour[] {
    if (
      data.timings &&
      Array.isArray(data.timings) &&
      data.timings.length > 0
    ) {
      return data.timings.map((h) => ({
        ...h,
        morningOpen: h.morningOpen ? this.formatTime(h.morningOpen) : null,
        morningClose: h.morningClose ? this.formatTime(h.morningClose) : null,
        eveningOpen: h.eveningOpen ? this.formatTime(h.eveningOpen) : null,
        eveningClose: h.eveningClose ? this.formatTime(h.eveningClose) : null,
      }));
    }
    return [];
  }

  /** Group days with identical timings together for compact display */
  groupOpeningHours(hours: OpeningHour[]): GroupedHours[] {
    if (!hours || hours.length === 0) return [];

    const groups: GroupedHours[] = [];
    let currentGroup: GroupedHours | null = null;

    const dayLabels: Record<string, string> = {
      monday: 'Mon',
      tuesday: 'Tue',
      wednesday: 'Wed',
      thursday: 'Thu',
      friday: 'Fri',
      saturday: 'Sat',
      sunday: 'Sun',
    };

    for (const h of hours) {
      const label = dayLabels[h.day.toLowerCase()] || h.day;

      if (!h.isOpen) {
        // Closed day — push current group then add closed entry
        if (currentGroup) {
          groups.push(currentGroup);
          currentGroup = null;
        }
        groups.push({
          days: label,
          morningOpen: '',
          morningClose: '',
          eveningOpen: null,
          eveningClose: null,
          isOpen: false,
        });
        continue;
      }

      const sameTimings =
        currentGroup &&
        currentGroup.isOpen &&
        currentGroup.morningOpen === (h.morningOpen || '') &&
        currentGroup.morningClose === (h.morningClose || '') &&
        currentGroup.eveningOpen === (h.eveningOpen || null) &&
        currentGroup.eveningClose === (h.eveningClose || null);

      if (sameTimings && currentGroup) {
        // Extend the day range
        const firstDay = currentGroup.days.split(' - ')[0];
        currentGroup.days = firstDay + ' - ' + label;
      } else {
        if (currentGroup) groups.push(currentGroup);
        currentGroup = {
          days: label,
          morningOpen: h.morningOpen || '',
          morningClose: h.morningClose || '',
          eveningOpen: h.eveningOpen || null,
          eveningClose: h.eveningClose || null,
          isOpen: true,
        };
      }
    }
    if (currentGroup) groups.push(currentGroup);
    return groups;
  }

  // ========== MENU PAGE ==========
  getMenuPage(): Observable<MenuPageData> {
    return this.http
      .post<MenuPageResponse>(`${this.baseUrl}/website/rest/menupage/get`, {
        rid: this.restId,
      })
      .pipe(map((res) => res.data));
  }
}
