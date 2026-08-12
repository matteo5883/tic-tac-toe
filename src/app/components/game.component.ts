import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { BoardComponent } from "./board.component";
import { WinnerPopupComponent } from "./winner-popup.component";
import { DrawPopupComponent } from "./draw-popup.component";

@Component({
  selector: "app-game",
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    BoardComponent,
    WinnerPopupComponent,
    DrawPopupComponent,
  ],
  templateUrl: "./game.component.html",
})
export class GameComponent {
  @Input() player1 = "";
  @Input() player2 = "";
  @Output() closeGame = new EventEmitter<void>();

  showPopup = false;
  winner = "";
  resetGameState = false;
  nextSymbol: "X" | "O" = "X";

  get firstPlayerName(): string {
    return this.player1 || "X";
  }

  get secondPlayerName(): string {
    return this.player2 || "O";
  }

  get status(): string {
    const current =
      this.nextSymbol === "X" ? this.firstPlayerName : this.secondPlayerName;
    return `Next player: ${current}`;
  }

  renderWinner(symbol: "X" | "O"): void {
    this.winner = symbol === "X" ? this.firstPlayerName : this.secondPlayerName;
    this.showPopup = true;
  }

  setResetGameState(reset: boolean): void {
    this.resetGameState = reset;
  }

  newGame(): void {
    this.showPopup = false;
    this.winner = "";
    this.resetGameState = true;
  }

  updateSymbol(symbol: "X" | "O"): void {
    this.nextSymbol = symbol;
  }

  declareDraw(): void {
    this.showPopup = true;
  }
}
