import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar navbar-expand-lg" style="background-color: #ff66b2;">
      <div class="container">
        <a class="navbar-brand d-flex align-items-center" routerLink="/">
          <img src="assets/logo.png" alt="PizzaScript" width="60" height="60" />
          <span class="ms-2 text-white fw-bold">PizzaScript</span>
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon" style="filter: invert(1)"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a
                class="nav-link text-white"
                routerLink="/"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                >Home</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link text-white"
                routerLink="/menu"
                routerLinkActive="active"
                >Menu</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link text-white"
                routerLink="/cart"
                routerLinkActive="active"
                >Carrello</a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
})
export class NavbarComponent {}
