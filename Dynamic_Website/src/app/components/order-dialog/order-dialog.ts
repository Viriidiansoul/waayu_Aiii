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

  appUrl: string = '';
  websiteUrl: string = '';

  constructor(
    private api: ApiService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    const cached = this.api.getCachedAbout();

    if (cached) {
      this.appUrl = cached.app_url || '';
      this.websiteUrl = cached.website_url || '';
    } else {
      this.api.getRestaurantAbout().subscribe((data) => {
        this.appUrl = data.app_url || '';
        this.websiteUrl = data.website_url || '';
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
}
