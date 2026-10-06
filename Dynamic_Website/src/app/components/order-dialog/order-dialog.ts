import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, DialogData } from '../../service/api';
import { APP_URL, WEBSITE_URL } from '../../constants';

@Component({
  selector: 'app-order-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-dialog.html',
  styleUrl: './order-dialog.css',
})
export class OrderDialog implements OnInit {
  @Input() item: DialogData | null = null;
  @Output() close = new EventEmitter<void>();

  appUrl: string = APP_URL;
  websiteUrl: string = WEBSITE_URL;

  constructor(
    private api: ApiService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    const cached = this.api.getCachedAbout();

    if (cached) {
      this.appUrl = cached.app_url || APP_URL;
      this.websiteUrl = cached.website_url || WEBSITE_URL;
    } else {
      this.api.getRestaurantAbout().subscribe((data) => {
        this.appUrl = data.app_url || APP_URL;
        this.websiteUrl = data.website_url || WEBSITE_URL;
        this.cdr.markForCheck();
      });
    }
  }

  // Close dialog
  onBackdropClick() {
    this.close.emit();
  }

  // Open App
  orderOnApp() {
    if (this.appUrl) {
      window.open(this.appUrl, '_blank');
    }
  }

  // Open Website
  orderOnWebsite() {
    if (this.websiteUrl) {
      window.open(this.websiteUrl, '_blank');
    }
  }

  /** Handle broken images by setting a fallback */
  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img) {
      img.src = 'assets/home/menu_banner.jpg';
    }
  }
}
