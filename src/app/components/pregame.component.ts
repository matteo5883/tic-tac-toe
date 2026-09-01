import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";

@Component({
  selector: "app-pregame",
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: "./pregame.component.html",
})
export class PregameComponent {
  @Input() player1 = "";
  @Input() player2 = "";
  @Input() gameMode: "human-vs-human" | "human-vs-bot" = "human-vs-human";
  @Input() botPlayer: "X" | "O" = "O";
  @Input() botDifficulty: "easy" | "normal" | "hard" = "normal";

  @Output() player1Change = new EventEmitter<string>();
  @Output() player2Change = new EventEmitter<string>();
  @Output() gameModeChange = new EventEmitter<
    "human-vs-human" | "human-vs-bot"
  >();
  @Output() botPlayerChange = new EventEmitter<"X" | "O">();
  @Output() botDifficultyChange = new EventEmitter<
    "easy" | "normal" | "hard"
  >();
  @Output() start = new EventEmitter<void>();

  onPlayer1Input(event: Event): void {
    if (this.isBotPlayer1) {
      return;
    }

    const target = event.target as HTMLInputElement;
    this.player1Change.emit(target.value);
  }

  onPlayer2Input(event: Event): void {
    if (this.isBotPlayer2) {
      return;
    }

    const target = event.target as HTMLInputElement;
    this.player2Change.emit(target.value);
  }

  get isBotPlayer1(): boolean {
    return this.gameMode === "human-vs-bot" && this.botPlayer === "X";
  }

  get isBotPlayer2(): boolean {
    return this.gameMode === "human-vs-bot" && this.botPlayer === "O";
  }

  onModeChange(value: "human-vs-human" | "human-vs-bot"): void {
    this.gameModeChange.emit(value);

    if (value === "human-vs-bot") {
      if (this.botPlayer === "X") {
        this.player1Change.emit("BOT");
      } else {
        this.player2Change.emit("BOT");
      }
      return;
    }

    if (this.player1 === "BOT") {
      this.player1Change.emit("");
    }
    if (this.player2 === "BOT") {
      this.player2Change.emit("");
    }
  }

  onBotPlayerChange(value: "X" | "O"): void {
    this.botPlayerChange.emit(value);

    if (this.gameMode !== "human-vs-bot") {
      return;
    }

    if (value === "X") {
      this.player1Change.emit("BOT");
      if (this.player2 === "BOT") {
        this.player2Change.emit("");
      }
      return;
    }

    this.player2Change.emit("BOT");
    if (this.player1 === "BOT") {
      this.player1Change.emit("");
    }
  }

  onDifficultyChange(value: "easy" | "normal" | "hard"): void {
    this.botDifficultyChange.emit(value);
  }

  onStart(): void {
    this.start.emit();
  }
}
