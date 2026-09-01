import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
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
    MatButtonModule,
    MatIconModule,
    BoardComponent,
    WinnerPopupComponent,
    DrawPopupComponent,
  ],
  templateUrl: "./game.component.html",
})
export class GameComponent {
  @Input() player1 = "";
  @Input() player2 = "";
  @Input() botEnabled = false;
  @Input() botSymbol: "X" | "O" = "O";
  @Input() botDifficulty: "easy" | "normal" | "hard" = "normal";
  @Output() closeGame = new EventEmitter<void>();

  showPopup = false;
  winner = "";
  resetVersion = 0;
  startingSymbol: "X" | "O" = "X";
  nextSymbol: "X" | "O" = "X";
  player1Score = 0;
  player2Score = 0;
  drawScore = 0;

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

    if (symbol === "X") {
      this.player1Score += 1;
    } else {
      this.player2Score += 1;
    }

    this.showPopup = true;
  }

  newGame(): void {
    this.showPopup = false;
    this.winner = "";
    this.startingSymbol = this.startingSymbol === "X" ? "O" : "X";
    this.nextSymbol = this.startingSymbol;
    this.resetVersion += 1;
  }

  updateSymbol(symbol: "X" | "O"): void {
    this.nextSymbol = symbol;
  }

  declareDraw(): void {
    this.drawScore += 1;
    this.showPopup = true;
  }

  stopMatch(): void {
    this.closeGame.emit();
  }
}
