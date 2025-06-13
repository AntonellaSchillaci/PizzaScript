import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PizzaService } from '../services/pizza.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrello',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="cart-container py-4 px-3">
      <h2 class="text-center mb-4">Carrello</h2>
      <div *ngIf="cartPizzas().length > 0; else emptyCart">
        <div
          *ngFor="let pizza of cartPizzas()"
          class="mb-3 d-flex align-items-center justify-content-between shadow-sm p-3 rounded bg-white"
        >
          <div class="d-flex align-items-center">
            <img [src]="pizza.image" [alt]="pizza.name" class="cart-img me-3" />
            <h5 class="mb-0">{{ pizza.name }}</h5>
          </div>
          <div class="d-flex align-items-center">
            <button
              class="btn btn-danger btn-sm me-2"
              (click)="decrease(pizza)"
            >
              ✕
            </button>
            <input
              type="number"
              min="0"
              class="form-control form-control-sm text-center"
              style="width: 60px"
              [value]="pizza.quantity"
              (change)="updateQuantity(pizza, $event)"
            />
          </div>
        </div>

        <div class="mt-4 text-end fw-bold fs-5">
          Totale: € {{ totalPrice() | number : '1.2-2' }}
        </div>

        <div class="text-center mt-4">
          <button class="btn btn-pink btn-lg" (click)="acquista()">
            Paga / Acquista
          </button>
        </div>
      </div>

      <ng-template #emptyCart>
        <p class="text-center">Il carrello è vuoto.</p>
      </ng-template>

      <div
        class="modal fade show"
        tabindex="-1"
        *ngIf="showModal"
        style="display: block; background-color: rgba(0,0,0,0.5);"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content rounded-4 shadow">
            <div class="modal-header border-0">
              <h5 class="modal-title">Grazie per il tuo acquisto!</h5>
            </div>
            <div class="modal-body">
              <p>Il tuo ordine è stato ricevuto con successo.</p>
            </div>
            <div class="modal-footer border-0">
              <button class="btn btn-pink" (click)="tornaHome()">
                Torna alla Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .cart-container {
        background: linear-gradient(135deg, #ffe6f0, #ff99cc);
        color: #4b004b;
        min-height: 80vh;
        border-radius: 15px;
        box-shadow: 0 8px 15px rgba(255, 105, 180, 0.3);
      }
      .cart-img {
        width: 60px;
        height: 60px;
        object-fit: cover;
        border-radius: 10px;
      }
      .btn-pink {
        background-color: #ff66b2;
        color: white;
        border: none;
      }
      .btn-pink:hover {
        background-color: #e0559d;
        color: white;
      }
      input[type='number']::-webkit-inner-spin-button,
      input[type='number']::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    `,
  ],
})
export class CartComponent {
  showModal = false;
  pizzas;

  constructor(private pizzaService: PizzaService, private router: Router) {
    this.pizzas = this.pizzaService.getPizzasSignal();
  }

  cartPizzas() {
    return this.pizzas().filter((p) => p.quantity > 0);
  }

  totalPrice() {
    return this.cartPizzas().reduce((acc, p) => acc + p.price * p.quantity, 0);
  }

  decrease(pizza: { quantity: number }) {
    if (pizza.quantity > 0) {
      pizza.quantity--;
    }
  }

  updateQuantity(pizza: { quantity: number }, event: Event) {
    const input = event.target as HTMLInputElement | null;
    if (!input) return;
    const value = input.value;
    const qty = parseInt(value, 10);
    pizza.quantity = isNaN(qty) || qty < 0 ? 0 : qty;
  }

  acquista() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  tornaHome() {
    this.pizzaService.resetCart();
    this.showModal = false;
    this.router.navigate(['/']);
  }
}
