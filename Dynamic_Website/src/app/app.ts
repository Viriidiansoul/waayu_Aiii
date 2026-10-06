import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { ApiService } from './service/api';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  constructor(
    private apiService: ApiService,
    private titleService: Title,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngOnInit() {
    this.apiService.getRestaurantAbout().subscribe({
      next: (data) => {
        // Dynamic title
        if (data.restaurant_name) {
          this.titleService.setTitle(data.restaurant_name);
        }

        // Dynamic favicon
        if (isPlatformBrowser(this.platformId) && data.restaurant_logo) {
          const link: HTMLLinkElement | null =
            document.querySelector("link[rel*='icon']");
          if (link) {
            link.type = 'image/png';
            link.href = data.restaurant_logo;
          } else {
            const newLink = document.createElement('link');
            newLink.rel = 'icon';
            newLink.type = 'image/png';
            newLink.href = data.restaurant_logo;
            document.head.appendChild(newLink);
          }
        }
      },
    });
  }
}
