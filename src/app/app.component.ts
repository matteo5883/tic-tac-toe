import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PregameComponent } from "./components/pregame.component";
import { GameComponent } from "./components/game.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, PregameComponent, GameComponent],
  templateUrl: "./app.component.html",
})
export class AppComponent {
  page = 1;
  player1 = "";
  player2 = "";

  setPlayer1(name: string): void {
    this.player1 = name;
  }

  setPlayer2(name: string): void {
    this.player2 = name;
  }

  startGame(): void {
    this.page = 2;
  }

  newGame(): void {
    this.page = 1;
    this.player1 = "";
    this.player2 = "";
  }
}
