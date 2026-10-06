import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
  Input,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  ApiService,
  MenuItem,
  DialogData,
  MenuPageData,
  Category,
} from '../../service/api';

import { OrderDialog } from '../../components/order-dialog/order-dialog';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, OrderDialog],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Menu implements OnInit, AfterViewInit {
  menuItems: MenuItem[] = [];
  categories: Category[] = [];

  @Input() showButton: boolean = true;

  selectedItem: DialogData | null = null;
  restaurantData: any;
  menuPageData: MenuPageData | null = null;

  @ViewChild('swiperRef', { static: false }) swiperRef!: ElementRef;

  private initialized = false;

  constructor(private api: ApiService) {}

  ngOnInit() {
    // MENU
    this.api.getMenuItems().subscribe((data) => {
      this.menuItems = data;
    });

    // ✅ CATEGORIES (IMPORTANT)
    this.api.getCategories().subscribe((res) => {
      this.categories = res || [];

      // 🔥 wait for DOM render
      setTimeout(() => this.initSwiper(), 100);
    });

    // RESTAURANT
    this.api.getRestaurantAbout().subscribe((res) => {
      this.restaurantData = res;
    });

    // PAGE DATA
    this.api.getMenuPage().subscribe((res) => {
      this.menuPageData = res;
    });
  }

  ngAfterViewInit() {
    setTimeout(() => this.initSwiper(), 150);
  }

  private initSwiper() {
    const el = this.swiperRef?.nativeElement;

    if (!el) return;

    if (el.swiper) {
      el.swiper.destroy(true, true);
    }

    Object.assign(el, {
      slidesPerView: 3,

      centeredSlides: true,

      loop: true,

      loopAdditionalSlides: 10,

      spaceBetween: 30,

      speed: 3000,

      allowTouchMove: true,

      autoplay: {
        delay: 0,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },

      breakpoints: {
        0: {
          slidesPerView: 1,
        },

        768: {
          slidesPerView: 2,
        },

        1024: {
          slidesPerView: 3,
        },
      },
    });

    el.initialize();
  }
  // ================= ACTIONS =================

  openOrderDialog(item: DialogData) {
    this.selectedItem = {
      ...item,
      isCategory: false,
    };
  }

  openCategory(cat: Category) {
    this.selectedItem = {
      title: cat.title,
      image_url: cat.image_url,
      description: cat.description,
      isCategory: true,
    } as any;
  }

  closeOrderDialog() {
    this.selectedItem = null;
  }

  openFullMenu() {
    const url = this.restaurantData?.website_url;
    if (url) window.open(url, '_blank');
  }

  /** Handle broken images by setting a fallback */
  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img && img.src !== 'assets/home/menu_banner.jpg') {
      img.src = 'assets/home/menu_banner.jpg';
    }
  }
}
