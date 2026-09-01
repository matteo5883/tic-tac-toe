import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
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
export class BoardComponent implements OnChanges, OnDestroy, OnInit {
  @Input() nextSymbol: "X" | "O" = "X";
  @Input() resetVersion = 0;
  @Input() resetStarterSymbol: "X" | "O" = "X";
  @Input() botEnabled = false;
  @Input() botSymbol: "X" | "O" = "O";
  @Input() botDifficulty: "easy" | "normal" | "hard" = "normal";

  @Output() updateSymbol = new EventEmitter<"X" | "O">();
  @Output() declareWinner = new EventEmitter<"X" | "O">();
  @Output() declareDraw = new EventEmitter<void>();

  squares: Array<"X" | "O" | null> = Array(9).fill(null);
  private gameOver = false;
  private botMoveTimer: ReturnType<typeof setTimeout> | null = null;
  private readonly winningRows = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ] as const;

  ngOnInit(): void {
    this.scheduleBotMove();
  }

  ngOnDestroy(): void {
    this.clearBotTimer();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["resetVersion"] && !changes["resetVersion"].firstChange) {
      this.resetBoardState();
    }

    if (
      changes["nextSymbol"] ||
      changes["botEnabled"] ||
      changes["botSymbol"] ||
      changes["botDifficulty"]
    ) {
      this.scheduleBotMove();
    }
  }

  setValue(index: number, isBotMove = false): void {
    if (this.gameOver || this.squares[index] !== null) {
      return;
    }

    if (!isBotMove && this.isBotTurn()) {
      return;
    }

    const squares = [...this.squares];
    squares[index] = this.nextSymbol;
    this.squares = squares;

    const playedSymbol = this.nextSymbol;
    const upcomingSymbol: "X" | "O" = playedSymbol === "O" ? "X" : "O";
    this.nextSymbol = upcomingSymbol;
    this.updateSymbol.emit(upcomingSymbol);
    this.checkVictory(squares, playedSymbol);
  }

  private checkVictory(
    squares: Array<"X" | "O" | null>,
    symbol: "X" | "O",
  ): void {
    const hasWin = this.winningRows.some(
      ([a, b, c]) =>
        squares[a] !== null &&
        squares[a] === squares[b] &&
        squares[a] === squares[c],
    );

    if (hasWin) {
      this.gameOver = true;
      this.clearBotTimer();
      this.declareWinner.emit(symbol);
      return;
    }

    if (this.checkMovesEnd(squares)) {
      this.gameOver = true;
      this.clearBotTimer();
      this.declareDraw.emit();
    }
  }

  private checkMovesEnd(squares: Array<"X" | "O" | null>): boolean {
    return squares.every((cell) => cell !== null);
  }

  private resetBoardState(): void {
    this.clearBotTimer();
    this.squares = Array(9).fill(null);
    this.gameOver = false;
    this.nextSymbol = this.resetStarterSymbol;
    this.updateSymbol.emit(this.resetStarterSymbol);
    this.scheduleBotMove();
  }

  private scheduleBotMove(): void {
    this.clearBotTimer();

    if (!this.isBotTurn() || this.gameOver) {
      return;
    }

    const move = this.selectBotMove();
    if (move === null) {
      return;
    }

    this.botMoveTimer = setTimeout(() => {
      this.setValue(move, true);
    }, 250);
  }

  private clearBotTimer(): void {
    if (this.botMoveTimer !== null) {
      clearTimeout(this.botMoveTimer);
      this.botMoveTimer = null;
    }
  }

  private isBotTurn(): boolean {
    return this.botEnabled && this.nextSymbol === this.botSymbol;
  }

  private selectBotMove(): number | null {
    const availableMoves = this.getAvailableMoves(this.squares);
    if (availableMoves.length === 0) {
      return null;
    }

    if (this.botDifficulty === "easy") {
      return this.pickRandomMove(availableMoves);
    }

    if (this.botDifficulty === "normal") {
      return this.pickNormalMove();
    }

    return this.pickHardMove();
  }

  private pickNormalMove(): number {
    const botWinMove = this.findWinningMove(this.squares, this.botSymbol);
    if (botWinMove !== null) {
      return botWinMove;
    }

    const opponent = this.getOpponent(this.botSymbol);
    const blockMove = this.findWinningMove(this.squares, opponent);
    if (blockMove !== null) {
      return blockMove;
    }

    if (this.squares[4] === null && Math.random() < 0.85) {
      return 4;
    }

    const corners = [0, 2, 6, 8].filter(
      (index) => this.squares[index] === null,
    );
    if (corners.length > 0 && Math.random() < 0.75) {
      return this.pickRandomMove(corners);
    }

    return this.pickRandomMove(this.getAvailableMoves(this.squares));
  }

  private pickHardMove(): number {
    const availableMoves = this.getAvailableMoves(this.squares);
    let bestScore = -Infinity;
    let bestMove = availableMoves[0];

    for (const move of availableMoves) {
      const trialBoard = [...this.squares];
      trialBoard[move] = this.botSymbol;
      const score = this.minimax(
        trialBoard,
        this.getOpponent(this.botSymbol),
        this.botSymbol,
        0,
      );

      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }

    return bestMove;
  }

  private minimax(
    board: Array<"X" | "O" | null>,
    currentSymbol: "X" | "O",
    maximizingSymbol: "X" | "O",
    depth: number,
  ): number {
    const winner = this.getWinner(board);
    const minimizingSymbol = this.getOpponent(maximizingSymbol);

    if (winner === maximizingSymbol) {
      return 10 - depth;
    }

    if (winner === minimizingSymbol) {
      return depth - 10;
    }

    if (this.checkMovesEnd(board)) {
      return 0;
    }

    const moves = this.getAvailableMoves(board);

    if (currentSymbol === maximizingSymbol) {
      let bestScore = -Infinity;
      for (const move of moves) {
        const trialBoard = [...board];
        trialBoard[move] = currentSymbol;
        const score = this.minimax(
          trialBoard,
          this.getOpponent(currentSymbol),
          maximizingSymbol,
          depth + 1,
        );
        bestScore = Math.max(bestScore, score);
      }
      return bestScore;
    }

    let bestScore = Infinity;
    for (const move of moves) {
      const trialBoard = [...board];
      trialBoard[move] = currentSymbol;
      const score = this.minimax(
        trialBoard,
        this.getOpponent(currentSymbol),
        maximizingSymbol,
        depth + 1,
      );
      bestScore = Math.min(bestScore, score);
    }
    return bestScore;
  }

  private findWinningMove(
    board: Array<"X" | "O" | null>,
    symbol: "X" | "O",
  ): number | null {
    const availableMoves = this.getAvailableMoves(board);
    for (const move of availableMoves) {
      const trialBoard = [...board];
      trialBoard[move] = symbol;
      if (this.getWinner(trialBoard) === symbol) {
        return move;
      }
    }
    return null;
  }

  private getWinner(board: Array<"X" | "O" | null>): "X" | "O" | null {
    for (const [a, b, c] of this.winningRows) {
      if (board[a] !== null && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  }

  private pickRandomMove(moves: number[]): number {
    const index = Math.floor(Math.random() * moves.length);
    return moves[index];
  }

  private getAvailableMoves(board: Array<"X" | "O" | null>): number[] {
    return board
      .map((cell, index) => (cell === null ? index : -1))
      .filter((index) => index !== -1);
  }

  private getOpponent(symbol: "X" | "O"): "X" | "O" {
    return symbol === "X" ? "O" : "X";
  }
}
