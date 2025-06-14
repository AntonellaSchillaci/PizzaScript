import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PizzaService } from '../services/pizza.service';
import { Pizza } from '../../models/pizza.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterLink],
  styleUrls: ['./menu.css'],
  template: `
    <div class="menu-container py-4 px-3">
      <h2 class="text-center mb-4">Il nostro menu di pizze</h2>

      <div class="text-end mb-3">
        <button
          routerLink="/cart"
          class="fab-cart"
          title="Vai al carrello"
          aria-label="Vai al carrello"
        >
          <i class="bi bi-cart3"></i>
        </button>
      </div>

      <div class="row row-cols-1 row-cols-md-3 g-4">
        <div *ngFor="let pizza of pizzas()" class="col">
          <div class="card h-100 shadow-sm">
            <a [routerLink]="['/pizze', pizza.id]">
              <img
                [src]="pizza.image"
                [alt]="pizza.name"
                class="card-img-top"
              />
            </a>
            <div class="card-body">
              <h3 class="mb-3 text-center card-title">{{ pizza.name }}</h3>
              <p class="card-text fw-bold text-center">
                Prezzo: € {{ pizza.price }}
              </p>

              <div
                class="d-flex align-items-center justify-content-between mt-3"
              >
                <button
                  class="btn btn-success"
                  (click)="incrementQuantity(pizza)"
                  title="Aggiungi al carrello"
                >
                  <i class="bi bi-cart-plus"></i>
                </button>

                <span class="quantity-text">
                  {{ pizza.quantity || 0 }}
                </span>

                <button
                  class="btn btn-danger"
                  (click)="decrementQuantity(pizza)"
                  [disabled]="!(pizza.quantity > 0)"
                  title="Rimuovi dal carrello"
                >
                  <i class="bi bi-x-lg"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class MenuComponent implements OnInit {
  pizzas = signal<Pizza[]>([]);

  constructor(private pizzaService: PizzaService) {}

  ngOnInit(): void {
    if (this.pizzaService.getPizzasSignal()().length === 0) {
      this.pizzaService.getPizzas().subscribe({
        next: (data) => this.pizzaService.setPizzas(data),
        error: (err) => console.error('Errore caricamento pizze', err),
      });
    }
    this.pizzas = this.pizzaService.getPizzasSignal();
  }

  incrementQuantity(pizza: Pizza) {
    this.pizzaService.incrementQuantity(pizza);
  }

  decrementQuantity(pizza: Pizza) {
    this.pizzaService.decrementQuantity(pizza);
  }
}
