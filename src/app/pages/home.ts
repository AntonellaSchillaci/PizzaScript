import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
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
  styles: [
    `
      .home-container {
        background: linear-gradient(135deg, #ffe6f0, #ff99cc);
        color: #4b004b;
        min-height: 80vh;
        border-radius: 15px;
        box-shadow: 0 8px 15px rgba(255, 105, 180, 0.3);
      }
      a.text-pink {
        color: #d6336c;
        text-decoration: none;
      }
      a.text-pink:hover {
        text-decoration: underline;
        color: #a02149;
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
    `,
  ],
})
export class HomeComponent {}
