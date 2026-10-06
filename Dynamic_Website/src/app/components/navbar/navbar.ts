import {
  Component,
  HostListener,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService, RestaurantAbout } from '../../service/api';
import { APP_URL, WEBSITE_URL, DEFAULT_IMAGES } from '../../constants';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar implements OnInit {
  isScrolled = false;
  isMobileMenuOpen = false;
  logoUrl: string = DEFAULT_IMAGES.logo;
  appUrl: string = APP_URL;
  websiteUrl: string = WEBSITE_URL;

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.loadFromCache();
    this.apiService.getRestaurantAbout().subscribe((data) => {
      this.applyData(data);
      this.cdr.markForCheck();
    });
  }

  private loadFromCache() {
    const cached = this.apiService.getCachedAbout();
    if (cached) {
      this.applyData(cached);
    }
  }

  private applyData(data: RestaurantAbout) {
    if (data.restaurant_logo) this.logoUrl = data.restaurant_logo;
    if (data.app_url) this.appUrl = data.app_url;
    if (data.website_url) this.websiteUrl = data.website_url;
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
    this.cdr.markForCheck();
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  /** Handle broken images by setting a fallback */
  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img && img.src !== 'assets/default-logo.png') {
      img.src = 'assets/default-logo.png';
    }
  }
}
