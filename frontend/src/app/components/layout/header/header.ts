import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { MenuItem } from '../../../models/menu-item';

@Component({
  selector: 'app-header',
  imports: [NzLayoutModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  isLoggedIn = signal<boolean>(false);

  menuItens: MenuItem[] = [
    { label: "Character's list", link: '/list', icon: 'home', id: 'home' },
    {
      label: 'Create character',
      link: '/create-char',
      icon: 'plus',
      id: 'create-char',
    },
  ];

  logout() {
    console.log('logout');
  }

  login() {
    console.log('login');
  }
}
