import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, GalleryItem } from '../../service/api';
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

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadGallery();
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

  // performance
  trackById(index: number, item: GalleryItem): number {
    return item?.id ?? index;
  }
}
