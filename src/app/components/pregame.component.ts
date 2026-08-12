import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-pregame",
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: "./pregame.component.html",
})
export class PregameComponent {
  @Input() player1 = "";
  @Input() player2 = "";

  @Output() player1Change = new EventEmitter<string>();
  @Output() player2Change = new EventEmitter<string>();
  @Output() start = new EventEmitter<void>();

  onPlayer1Input(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.player1Change.emit(target.value);
  }

  onPlayer2Input(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.player2Change.emit(target.value);
  }

  onStart(): void {
    this.start.emit();
  }
}
