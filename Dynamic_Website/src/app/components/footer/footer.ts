import { Component, OnInit } from '@angular/core';
import { ApiService, RestaurantAbout, OpeningHour } from '../../service/api';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { WEBSITE_URL } from '../../constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  imports: [CommonModule, RouterModule, RouterLink],
  styleUrl: './footer.css',
})
export class Footer implements OnInit {
  aboutData: RestaurantAbout | null = null;
  openingHours: OpeningHour[] = [];

  // ✅ ADD THIS (optional but cleaner)
  restaurantName: string = '';

  /** Current year for copyright */
  currentYear: number = new Date().getFullYear();

  /** Map URL for directions */
  mapUrl: string = '';

  /** Webstore URL for ordering */
  webstoreUrl: string = WEBSITE_URL;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    // 1️⃣ Load cached data first
    const cached = this.api.getCachedAbout();
    if (cached) {
      this.setData(cached);
    }

    // 2️⃣ Fetch fresh data
    this.api.getRestaurantAbout().subscribe((res) => {
      this.setData(res);
    });
  }

  // ✅ Common method (clean code)
  setData(data: RestaurantAbout) {
    this.aboutData = data;
    this.openingHours = this.api.getOpeningHoursFromAbout(data);

    // 🔥 IMPORTANT: restaurant name set here
    this.restaurantName = data?.restaurant_name || 'My Restaurant';

    // Use map_url from data if available, otherwise keep default
    if (data?.map_url) {
      this.mapUrl = data.map_url;
    }
  }
}
