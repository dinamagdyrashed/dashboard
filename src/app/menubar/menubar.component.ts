import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-menubar',
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.scss',
})
export class MenubarComponent implements OnInit {
  isNavbarOpen = false;

  user: any = {};
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  logout() {
    this._AuthService.logout();
    this._Router.navigate(['/login']);
  }
  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }
  ngOnInit(): void {
    this.user = this._AuthService.currentUser.getValue();
  }
}
