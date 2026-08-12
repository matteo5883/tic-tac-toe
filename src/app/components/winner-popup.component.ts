import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-winner-popup",
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: "./winner-popup.component.html",
})
export class WinnerPopupComponent {
  @Input() winner = "";

  @Output() newGame = new EventEmitter<void>();
  @Output() closeGame = new EventEmitter<void>();
}
