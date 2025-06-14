import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  styleUrls: ['./home.css'],
  template: `
    <div class="home-container text-center py-5 px-3 mb-4">
      <h1 class="display-4 fw-bold mb-3">Benvenuti da PizzaScript!</h1>
      <p class="lead mb-4">
        La tua pizzeria di fiducia con le migliori pizze artigianali, preparate
        con amore e ingredienti freschissimi.
      </p>
      <img
        src="assets/welcome-pizza.jpeg"
        alt="Pizza benvenuto"
        class="img-fluid rounded mb-4 shadow"
        style="max-width: 350px;"
      />
      <p>
        Scopri il nostro
        <a routerLink="/menu" class="text-pink fw-bold">menu</a> e aggiungi le
        tue pizze preferite al carrello!
      </p>
      <a routerLink="/menu" class="btn btn-pink btn-lg mt-3">Vai al Menu</a>
    </div>
  `,
})
export class HomeComponent {}
