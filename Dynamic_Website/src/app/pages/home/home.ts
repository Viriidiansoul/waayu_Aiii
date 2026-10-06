import {
  Component,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
  NgZone,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  ApiService,
  MenuItem,
  Feature,
  Banner,
  Testimonial,
  RestaurantAbout,
} from '../../service/api';

import { Menusection } from '../../components/menusection/menusection';
import {
  APP_URL,
  WEBSITE_URL,
  DEFAULT_IMAGES,
  GALLERY_SLIDER,
  TESTIMONIAL_SLIDER,
  BANNER_SLIDER,
} from '../../constants';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Menusection],
  templateUrl: './home.html',
  styleUrl: './home.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Home implements OnInit, OnDestroy {
  appUrl: string = APP_URL;
  websiteUrl: string = WEBSITE_URL;

  // 🔥 About Us
  aboutData: RestaurantAbout | null = null;

  galleryItems: any[] = [];
  galleryLoading = true;
  galleryError = false;

  centerIndex = 0;
  translateX = 0;
  galleryInterval: any;

  // 💬 Testimonials
  testimonials: Testimonial[] = [];
  testimonialLoading = true;
  currentTestimonial = 0;
  testimonialInterval: any;

  itemsPerSlide = 3;
  interval: any;

  // 🍕 Menu
  menuItems: MenuItem[] = [];
  menuLoading = true;

  // ⭐ Features
  features: (Feature & { icon?: string })[] = [];
  featuresLoading = true;

  // 🔥 Banner
  banners: (Banner & { foreground_image?: string | null })[] = [];
  bannerLoading = true;

  currentBannerIndex = 0;
  bannerInterval: any;

  config = {
    slidesPerView: 3,
    centeredSlides: true,
    loop: true,
    spaceBetween: 30,
  };

  heroBg = DEFAULT_IMAGES.banner;

  animateText = true;

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
  ) {}

  ngOnInit() {
    this.setItemsPerSlide();

    this.getAbout(); // 🔥 added
    this.getMenu();
    this.getFeatures();
    this.getBanners();
    this.getRestaurantLinks();
    this.getTestimonials();
    this.getGallery();

    window.addEventListener('resize', () => {
      this.setItemsPerSlide();
    });
  }

  ngOnDestroy() {
    clearInterval(this.interval);
    clearInterval(this.bannerInterval);
    clearInterval(this.galleryInterval);
    clearInterval(this.testimonialInterval);
  }

  // =========================
  // ABOUT
  // =========================

  getAbout() {
    const cached = this.apiService.getCachedAbout();

    if (cached) {
      this.aboutData = cached;
    }

    this.apiService.getRestaurantAbout().subscribe({
      next: (res) => {
        this.aboutData = res;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('About API Error:', err);
      },
    });
  }

  // =========================
  // RESPONSIVE
  // =========================

  setItemsPerSlide() {
    const width = window.innerWidth;
    this.itemsPerSlide = width < 768 ? 1 : 3;
  }

  // =========================
  // TESTIMONIALS
  // =========================

  getTestimonials() {
    this.apiService.getTestimonials().subscribe({
      next: (res) => {
        this.testimonials = res;
        this.testimonialLoading = false;

        this.startTestimonialSlider();

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Testimonial API Error:', err);
        this.testimonialLoading = false;
      },
    });
  }

  startTestimonialSlider() {
    this.testimonialInterval = setInterval(() => {
      this.currentTestimonial =
        (this.currentTestimonial + 1) % this.testimonials.length;
    }, TESTIMONIAL_SLIDER.intervalMs);
  }

  getDots() {
    return new Array(this.testimonials.length);
  }

  // =========================
  // GALLERY
  // =========================

  getGallery() {
    this.galleryLoading = true;

    this.apiService.getGalleryItems().subscribe({
      next: (res: any) => {
        this.galleryItems = res || [];

        if (this.galleryItems.length > 0) {
          this.centerIndex = Math.floor(this.galleryItems.length / 2);

          this.updateGallerySlider();
          this.startGalleryAutoSlide();
        }

        this.galleryLoading = false;
      },
      error: () => {
        this.galleryError = true;
        this.galleryLoading = false;
      },
    });
  }

  startGalleryAutoSlide() {
    this.galleryInterval = setInterval(() => {
      this.centerIndex = (this.centerIndex + 1) % this.galleryItems.length;

      this.updateGallerySlider();
    }, GALLERY_SLIDER.intervalMs);
  }

  updateGallerySlider() {
    const itemWidth = GALLERY_SLIDER.itemWidth;

    const centerOffset = window.innerWidth / 2 - itemWidth / 2;

    this.translateX = -(this.centerIndex * itemWidth - centerOffset);
  }

  // =========================
  // BANNER
  // =========================

  startBannerSlider() {
    this.ngZone.runOutsideAngular(() => {
      this.bannerInterval = setInterval(() => {
        this.ngZone.run(() => {
          if (this.banners.length > 0) {
            this.currentBannerIndex =
              (this.currentBannerIndex + 1) % this.banners.length;

            this.heroBg = encodeURI(
              this.banners[this.currentBannerIndex].image_url || '',
            );

            this.cdr.detectChanges();
          }
        });
      }, BANNER_SLIDER.intervalMs);
    });
  }

  getBanners() {
    this.apiService.getBanners().subscribe({
      next: (res) => {
        this.banners = res;

        if (res?.length) {
          this.currentBannerIndex = 0;

          this.heroBg = encodeURI(res[0].image_url || '');

          this.startBannerSlider();
        }

        this.bannerLoading = false;

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Banner API Error:', err);
        this.bannerLoading = false;
      },
    });
  }

  // =========================
  // MENU
  // =========================

  getMenu() {
    this.apiService.getMenuItems().subscribe({
      next: (res) => {
        this.menuItems = res.slice(0, 6);

        this.menuLoading = false;

        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Menu API Error:', err);

        this.menuLoading = false;
      },
    });
  }

  // =========================
  // FEATURES
  // =========================

  getFeatures() {
    this.apiService.getFeatures().subscribe({
      next: (res) => {
        this.features = res.map((item, index) => ({
          ...item,
          icon: this.getIcon(index),
        }));

        this.featuresLoading = false;

        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Feature API Error:', err);

        this.featuresLoading = false;
      },
    });
  }

  // =========================
  // LINKS
  // =========================

  getRestaurantLinks() {
    const cached = this.apiService.getCachedAbout();

    if (cached) {
      this.appUrl = cached.app_url || APP_URL;

      this.websiteUrl = cached.website_url || WEBSITE_URL;
    } else {
      this.apiService.getRestaurantAbout().subscribe((data) => {
        this.appUrl = data.app_url || APP_URL;

        this.websiteUrl = data.website_url || WEBSITE_URL;

        this.cdr.markForCheck();
      });
    }
  }

  goToSlide(index: number) {
    this.currentBannerIndex = index;
  }

  getIcon(index: number): string {
    const icons = ['fa-pizza-slice', 'fa-user-check', 'fa-fire'];

    return icons[index % icons.length];
  }

  getStars(rating: string): number[] {
    return Array(Number(rating || 0)).fill(0);
  }

  triggerAnimation() {
    this.animateText = false;

    setTimeout(() => {
      this.animateText = true;
    }, 50);
  }

  /** Handle broken images by setting a fallback */
  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img && img.src !== DEFAULT_IMAGES.menu) {
      img.src = DEFAULT_IMAGES.menu;
    }
  }
}
