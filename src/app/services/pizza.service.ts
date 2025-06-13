import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pizza } from '../../models/pizza.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PizzaService {
  private pizzas = signal<Pizza[]>([]);

  constructor(private http: HttpClient) {}

  getPizzas(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>(
      'https://my-json-server.typicode.com/zoelounge/menupizza/cards'
    );
  }

  setPizzas(pizzas: Pizza[]) {
    this.pizzas.set(pizzas);
  }

  getPizzasSignal() {
    return this.pizzas;
  }

  incrementQuantity(pizza: Pizza) {
    const updated = this.pizzas().map((p) =>
      p.id === pizza.id ? { ...p, quantity: (p.quantity ?? 0) + 1 } : p
    );
    this.pizzas.set(updated);
  }

  decrementQuantity(pizza: Pizza) {
    const updated = this.pizzas().map((p) =>
      p.id === pizza.id
        ? { ...p, quantity: Math.max((p.quantity ?? 0) - 1, 0) }
        : p
    );
    this.pizzas.set(updated);
  }

  resetCart() {
    const reset = this.pizzas().map((p) => ({ ...p, quantity: 0 }));
    this.pizzas.set(reset);
  }
}
