import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PizzaService } from '../services/pizza.service';
import { Pizza } from '../../models/pizza.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterLink],
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
  styles: [
    `
      .menu-container {
        background: linear-gradient(135deg, #ffe6f0, #ff99cc);
        color: #4b004b;
        min-height: 80vh;
        border-radius: 15px;
        box-shadow: 0 8px 15px rgba(255, 105, 180, 0.3);
      }
      .card {
        border: none;
        border-radius: 15px;
      }
      .card-img-top {
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        max-height: 180px;
        object-fit: cover;
      }
      .quantity-text {
        font-weight: bold;
        font-size: 1.2rem;
        width: 30px;
        text-align: center;
        color: #4b004b;
      }
      button.btn-success {
        background-color: #ff66b2;
        border: none;
        color: white;
      }
      button.btn-success:hover {
        background-color: #e0559d;
      }
      button.btn-danger {
        background-color: #a02149;
        border: none;
        color: white;
      }
      button.btn-danger:hover {
        background-color: #7a1435;
      }
      .fab-cart {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #ff66b2;
        border: none;
        color: white;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        box-shadow: 0 4px 12px rgba(255, 105, 180, 0.6);
        font-size: 1.8rem;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background-color 0.3s ease;
        z-index: 1000;
      }

      .fab-cart:hover {
        background-color: #e0559d;
      }
    `,
  ],
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
