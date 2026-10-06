import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// 🔥 ADD THIS (Swiper registration)
import { register } from 'swiper/element/bundle';
register();

// Vercel Web Analytics
import { inject } from '@vercel/analytics';
inject();

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
