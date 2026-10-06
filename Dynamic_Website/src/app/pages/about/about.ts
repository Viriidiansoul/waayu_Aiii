import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ApiService, RestaurantAbout } from '../../service/api';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements OnInit {
  aboutData: RestaurantAbout | null = null;
  isLoading = true;

  // ✅ NEW: Safe map URL
  safeMapUrl: SafeResourceUrl | null = null;

  constructor(
    private api: ApiService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    // ✅ Load cached data first
    const cached = this.api.getCachedAbout();
    if (cached) {
      this.aboutData = cached;
      this.setMapUrl(cached); // 👈 important
      this.isLoading = false;
    }

    // ✅ API call
    this.api.getRestaurantAbout().subscribe({
      next: (res) => {
        this.aboutData = res;
        this.setMapUrl(res); // 👈 important
        this.isLoading = false;
      },
      error: (err) => {
        console.error('About API Error:', err);
        this.isLoading = false;
      },
    });
  }

  // ✅ NEW: convert map url to safe iframe url
  private setMapUrl(data: RestaurantAbout) {
    const embedUrl = this.api.toEmbedMapUrl(data.map_url || '', data);
    this.safeMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  // ✅ OPTIONAL: full address helper
  get fullAddress(): string {
    if (!this.aboutData) return '';
    return `${this.aboutData.houseno || ''}, ${this.aboutData.address || ''}, ${this.aboutData.city || ''} - ${this.aboutData.pincode || ''}`;
  }

  // ✅ OPTIONAL: phone format
  get phoneNumber(): string {
    return this.aboutData?.phone ? `+91 ${this.aboutData.phone}` : '';
  }

  /** Handle broken images by setting a fallback */
  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img) {
      img.src = 'assets/home/menu_banner.jpg';
    }
  }
}
