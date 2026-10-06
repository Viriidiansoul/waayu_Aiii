import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDialog } from '../../components/order-dialog/order-dialog';

@Component({
  selector: 'app-menusection',
  standalone: true,
  imports: [CommonModule, OrderDialog],
  templateUrl: './menusection.html',
  styleUrl: './menusection.css',
})
export class Menusection {
  // ✅ Get data from parent
  @Input() menuItems: any[] = [];
  @Input() showButton: boolean = true;

  // ✅ Dialog handling
  selectedItem: any = null;

  openOrderDialog(item: any) {
    this.selectedItem = item;
  }

  closeOrderDialog() {
    this.selectedItem = null;
  }

  // ✅ Button action
  openFullMenu() {
    // Navigate to full menu - can use router here if needed
  }

  /** Handle broken images by setting a fallback */
  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img) {
      img.src = 'assets/home/menu_banner.jpg';
    }
  }
}
