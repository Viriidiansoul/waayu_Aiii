import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { ApiService, RestaurantAbout, OpeningHour } from '../../service/api';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements OnInit {
  constructor(
    private api: ApiService,
    private sanitizer: DomSanitizer,
  ) {}

  // ======================
  // API DATA
  // ======================

  restaurantData!: RestaurantAbout;
  mapUrl!: SafeResourceUrl;
  openingHours: OpeningHour[] = [];

  ngOnInit(): void {
    this.loadRestaurantData();
  }

  loadRestaurantData() {
    this.api.getRestaurantAbout().subscribe((res) => {
      this.restaurantData = res;

      const embedUrl = this.api.toEmbedMapUrl(res.map_url || '', res);

      this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);

      this.openingHours = this.api.getOpeningHoursFromAbout(res);
    });
  }

  // ======================
  // TODAY HIGHLIGHT
  // ======================

  isToday(day: string): boolean {
    const today = new Date()
      .toLocaleDateString('en-US', {
        weekday: 'long',
      })
      .toLowerCase();

    return today === day.toLowerCase();
  }

  // ======================
  // FORM
  // ======================

  form = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  };

  submitted = false;
  loading = false;

  // ======================
  // VALIDATIONS
  // ======================

  validName(): boolean {
    return this.form.name.trim().length > 0;
  }

  validEmail(): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email);
  }

  validPhone(): boolean {
    // Accept 10 digits, optionally with +91 prefix, spaces, or dashes
    const cleaned = this.form.phone.replace(/[\s\-()]/g, '');
    return /^(\+91)?[0-9]{10}$/.test(cleaned);
  }

  validSubject(): boolean {
    return this.form.subject.trim().length > 0;
  }

  validMessage(): boolean {
    return this.form.message.trim().length >= 10;
  }

  isFormValid(): boolean {
    return (
      this.validName() &&
      this.validEmail() &&
      this.validPhone() &&
      this.validSubject() &&
      this.validMessage()
    );
  }

  // ======================
  // SUBMIT
  // ======================

  submitForm(formRef: any) {
    this.submitted = true;

    if (!this.isFormValid()) {
      return;
    }

    this.loading = true;

    this.api
      .submitContactForm({
        name: this.form.name,
        email: this.form.email,
        phone: this.form.phone,
        message: this.form.message,
      })
      .subscribe({
        next: () => {
          alert('✅ Message Sent Successfully');

          this.resetForm(formRef);
        },

        error: () => {
          alert('❌ Failed to send message');

          this.loading = false;
        },
      });
  }

  // ======================
  // RESET
  // ======================

  resetForm(formRef: any) {
    this.form = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    };

    this.submitted = false;
    this.loading = false;

    formRef.resetForm();
  }

  /** Handle broken images by setting a fallback */
  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img) {
      img.src = 'assets/home/menu_banner.jpg';
    }
  }
}
