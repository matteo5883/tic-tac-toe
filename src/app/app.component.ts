import { Component, Inject, OnInit } from "@angular/core";
import { CommonModule, DOCUMENT } from "@angular/common";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatIconModule } from "@angular/material/icon";
import { PregameComponent } from "./components/pregame.component";
import { GameComponent } from "./components/game.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatIconModule,
    PregameComponent,
    GameComponent,
  ],
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  page = 1;
  player1 = "";
  player2 = "";
  gameMode: "human-vs-human" | "human-vs-bot" = "human-vs-human";
  botPlayer: "X" | "O" = "O";
  botDifficulty: "easy" | "normal" | "hard" = "normal";
  theme: "dark" | "light" = "dark";

  private readonly themeStorageKey = "tic-tac-toe-theme";

  constructor(@Inject(DOCUMENT) private readonly document: Document) {}

  ngOnInit(): void {
    this.theme = this.loadThemePreference();
    this.applyTheme(this.theme);
  }

  setPlayer1(name: string): void {
    this.player1 = name;
  }

  setPlayer2(name: string): void {
    this.player2 = name;
  }

  setGameMode(mode: "human-vs-human" | "human-vs-bot"): void {
    this.gameMode = mode;
  }

  setBotPlayer(botPlayer: "X" | "O"): void {
    this.botPlayer = botPlayer;
  }

  setBotDifficulty(difficulty: "easy" | "normal" | "hard"): void {
    this.botDifficulty = difficulty;
  }

  startGame(): void {
    if (this.gameMode === "human-vs-bot") {
      if (this.botPlayer === "X") {
        this.player1 = "BOT";
      } else {
        this.player2 = "BOT";
      }
    }
    this.page = 2;
  }

  newGame(): void {
    this.page = 1;
    this.player1 = "";
    this.player2 = "";
  }

  toggleTheme(): void {
    this.setTheme(this.theme === "dark" ? "light" : "dark");
  }

  setTheme(theme: "dark" | "light"): void {
    this.theme = theme;
    this.applyTheme(theme);
    this.storeThemePreference(theme);
  }

  private applyTheme(theme: "dark" | "light"): void {
    const body = this.document.body;
    body.classList.toggle("theme-light", theme === "light");
    body.classList.toggle("theme-dark", theme === "dark");
  }

  private loadThemePreference(): "dark" | "light" {
    try {
      const storedTheme = localStorage.getItem(this.themeStorageKey);
      return storedTheme === "light" ? "light" : "dark";
    } catch {
      return "dark";
    }
  }

  private storeThemePreference(theme: "dark" | "light"): void {
    try {
      localStorage.setItem(this.themeStorageKey, theme);
    } catch {
      // Ignore storage errors and keep runtime theme only.
    }
  }
}
