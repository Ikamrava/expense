import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Auth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  items: MenuItem[];

  constructor(
    private auth: Auth, 
    private router: Router
  ) {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/'
      },
      {
        label: 'Filter',
        icon: 'pi pi-filter',
        routerLink: '/filter'
      },
      // ✅ Add the Logout menu item
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => {
          this.onLogout();
        }
      }
    ];
  }

  // ✅ Add the logout method
  async onLogout() {
    await signOut(this.auth);
    this.router.navigate(['/login']);
  }
}