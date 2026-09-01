import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-square",
  standalone: true,
  template: `
    <button
      type="button"
      class="square"
      [attr.aria-label]="value || 'Empty square'"
      [class.x-symbol]="value === 'X'"
      [class.o-symbol]="value === 'O'"
      (click)="setValue.emit()"
    >
      {{ value }}
    </button>
  `,
})
export class SquareComponent {
  @Input() value: string | null = null;
  @Output() setValue = new EventEmitter<void>();
}
