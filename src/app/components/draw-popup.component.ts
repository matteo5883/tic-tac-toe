import { Component, EventEmitter, Output } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-draw-popup",
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: "./draw-popup.component.html",
})
export class DrawPopupComponent {
  @Output() newGame = new EventEmitter<void>();
  @Output() closeGame = new EventEmitter<void>();
}
