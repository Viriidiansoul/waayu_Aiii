import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService, RestaurantAbout } from '../../service/api';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit {
  logoUrl: string = '';
  appUrl: string = '';
  websiteUrl: string = '';

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
    this.logoUrl = res?.restaurant_logo || 'assets/default-logo.png';
    this.appUrl = res?.app_url || '#';
    this.websiteUrl = res?.website_url || '#';
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
}
