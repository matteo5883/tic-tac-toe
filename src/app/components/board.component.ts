import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { SquareComponent } from "./square.component";

@Component({
  selector: "app-board",
  standalone: true,
  imports: [CommonModule, SquareComponent],
  templateUrl: "./board.component.html",
})
export class BoardComponent implements OnChanges {
  @Input() nextSymbol: "X" | "O" = "X";
  @Input() resetGameState = false;

  @Output() updateSymbol = new EventEmitter<"X" | "O">();
  @Output() declareWinner = new EventEmitter<"X" | "O">();
  @Output() resetGame = new EventEmitter<boolean>();
  @Output() declareDraw = new EventEmitter<void>();

  squares: Array<"X" | "O" | null> = Array(9).fill(null);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["resetGameState"]?.currentValue) {
      this.squares = Array(9).fill(null);
      this.updateSymbol.emit("X");
      this.resetGame.emit(false);
    }
  }

  setValue(index: number): void {
    if (this.squares[index] !== null) {
      return;
    }

    const squares = [...this.squares];
    squares[index] = this.nextSymbol;
    this.squares = squares;

    const playedSymbol = this.nextSymbol;
    this.updateSymbol.emit(this.nextSymbol === "O" ? "X" : "O");
    this.checkVictory(squares, playedSymbol);
  }

  private checkVictory(
    squares: Array<"X" | "O" | null>,
    symbol: "X" | "O",
  ): void {
    const rows = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    const hasWin = rows.some(
      ([a, b, c]) =>
        squares[a] !== null &&
        squares[a] === squares[b] &&
        squares[a] === squares[c],
    );

    if (hasWin) {
      this.declareWinner.emit(symbol);
      return;
    }

    if (this.checkMovesEnd(squares)) {
      this.declareDraw.emit();
    }
  }

  private checkMovesEnd(squares: Array<"X" | "O" | null>): boolean {
    return squares.every((cell) => cell !== null);
  }
}
