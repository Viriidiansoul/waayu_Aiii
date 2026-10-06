import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { Menu } from './pages/menu/menu';
import { Gallery } from './pages/gallery/gallery';
import { PrivacyPolicy } from './pages/privacy-policy/privacy-policy';
import { TermsAndConditions } from './pages/terms-and-conditions/terms-and-conditions';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'about',
    component: About,
  },
  {
    path: 'contact',
    component: Contact,
  },
  {
    path: 'menu',
    component: Menu,
  },
  {
    path: 'gallery',
    component: Gallery,
  },
  { path: 'privacy-policy', component: PrivacyPolicy },
  { path: 'terms-and-conditions', component: TermsAndConditions },
];
