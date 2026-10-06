import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, GalleryItem, RestaurantAbout } from '../../service/api';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
})
export class Gallery implements OnInit {
  galleryItems: GalleryItem[] = [];

  isLoading: boolean = true;
  error: boolean = false;

  // 🔥 center index
  centerIndex: number = 0;

  /** Restaurant data for dynamic name */
  restaurantData: RestaurantAbout | null = null;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadGallery();
    this.loadRestaurantInfo();
  }

  /** Load restaurant info for dynamic name */
  loadRestaurantInfo(): void {
    const cached = this.api.getCachedAbout();
    if (cached) {
      this.restaurantData = cached;
    }
    this.api.getRestaurantAbout().subscribe({
      next: (res) => {
        this.restaurantData = res;
      },
      error: (err) => {
        console.error('Gallery Restaurant Info Error:', err);
      },
    });
  }

  /** Dynamic restaurant name */
  get restaurantName(): string {
    return this.restaurantData?.restaurant_name || 'Our Gallery';
  }

  loadGallery(): void {
    this.isLoading = true;
    this.error = false;

    this.api.getGalleryItems().subscribe({
      next: (res: GalleryItem[]) => {
        this.galleryItems = res || [];

        // 🔥 auto center
        if (this.galleryItems.length > 0) {
          this.centerIndex = Math.floor(this.galleryItems.length / 2);
        }

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Gallery API Error:', err);
        this.error = true;
        this.isLoading = false;
      },
    });
  }

  // 🔥 click to change center
  setCenter(index: number): void {
    this.centerIndex = index;
  }

  /** Handle broken images by setting a fallback */
  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img && img.src !== 'assets/default.jpg') {
      img.src = 'assets/default.jpg';
    }
  }

  // performance
  trackById(index: number, item: GalleryItem): number {
    return item?.id ?? index;
  }
}
