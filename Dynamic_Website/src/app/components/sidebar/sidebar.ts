import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService, RestaurantAbout } from '../../service/api';
import { APP_URL, WEBSITE_URL, DEFAULT_IMAGES } from '../../constants';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit {
  logoUrl: string = DEFAULT_IMAGES.logo;
  appUrl: string = APP_URL;
  websiteUrl: string = WEBSITE_URL;

  isLoading: boolean = true;

  // 🔥 MOBILE SIDEBAR STATE
  isOpen: boolean = false;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadData();
  }

  // =========================
  // LOAD DATA (API + CACHE)
  // =========================
  loadData(): void {
    this.isLoading = true;

    // 🔥 1. Try cached data (fast load)
    const cached = this.api.getCachedAbout();
    if (cached) {
      this.setData(cached);
    }

    // 🔥 2. API call (fresh data)
    this.api.getRestaurantAbout().subscribe({
      next: (res: RestaurantAbout) => {
        this.setData(res);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Sidebar API Error:', err);
        this.isLoading = false;
      },
    });
  }

  // =========================
  // SET DATA (REUSABLE)
  // =========================
  setData(res: RestaurantAbout): void {
    this.logoUrl = res?.restaurant_logo || DEFAULT_IMAGES.logo;
    this.appUrl = res?.app_url || APP_URL;
    this.websiteUrl = res?.website_url || WEBSITE_URL;
  }

  // =========================
  // MOBILE TOGGLE 🔥
  // =========================
  toggleSidebar(): void {
    this.isOpen = !this.isOpen;
  }

  closeSidebar(): void {
    this.isOpen = false;
  }

  /** Handle broken images by setting a fallback */
  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img && img.src !== 'assets/default-logo.png') {
      img.src = 'assets/default-logo.png';
    }
  }
}
