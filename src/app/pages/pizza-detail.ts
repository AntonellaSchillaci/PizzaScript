import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PizzaService } from '../services/pizza.service';
import { Pizza } from '../../models/pizza.model';

@Component({
  selector: 'app-pizza-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container py-4" *ngIf="pizza; else notFound">
      <h2 class="mb-3">{{ pizza.name }}</h2>
      <img
        [src]="pizza.image"
        [alt]="pizza.name"
        class="pizza-detail-img mb-4 rounded shadow"
      />
      <p>{{ pizza.description }}</p>
      <p><strong>Prezzo:</strong> € {{ pizza.price }}</p>
      <p><strong>Quantità selezionata:</strong> {{ pizza.quantity || 0 }}</p>

      <button class="btn btn-pink mt-4" routerLink="/menu">
        Torna al Menu
      </button>
    </div>

    <ng-template #notFound>
      <p class="text-center mt-5">Pizza non trovata.</p>
    </ng-template>
  `,
  styles: [
    `
      .btn-pink {
        background-color: #ff66b2;
        color: white;
        border: none;
      }
      .btn-pink:hover {
        background-color: #e0559d;
      }
      .pizza-detail-img {
        max-width: 400px;
        width: 100%;
        height: auto;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        display: block;
        margin: 0 auto 1rem auto;
      }
    `,
  ],
})
export class PizzaDetailComponent implements OnInit {
  pizza: Pizza | undefined;

  constructor(
    private route: ActivatedRoute,
    private pizzaService: PizzaService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const allPizzas = this.pizzaService.getPizzasSignal()();
    this.pizza = allPizzas.find((p) => p.id === id);
  }
}
