import { TestBed } from "@angular/core/testing";
import { SquareComponent } from "./square.component";

describe("SquareComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SquareComponent],
    }).compileComponents();
  });

  it("creates the component", () => {
    const fixture = TestBed.createComponent(SquareComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it("applies x-symbol class for X", () => {
    const fixture = TestBed.createComponent(SquareComponent);
    fixture.componentInstance.value = "X";
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector(
      "button",
    ) as HTMLButtonElement;
    expect(button.classList.contains("x-symbol")).toBe(true);
    expect(button.classList.contains("o-symbol")).toBe(false);
  });

  it("applies o-symbol class for O", () => {
    const fixture = TestBed.createComponent(SquareComponent);
    fixture.componentInstance.value = "O";
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector(
      "button",
    ) as HTMLButtonElement;
    expect(button.classList.contains("o-symbol")).toBe(true);
    expect(button.classList.contains("x-symbol")).toBe(false);
  });

  it("emits setValue on click", () => {
    const fixture = TestBed.createComponent(SquareComponent);
    const component = fixture.componentInstance;
    const emitSpy = vi.spyOn(component.setValue, "emit");

    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector(
      "button",
    ) as HTMLButtonElement;
    button.click();

    expect(emitSpy).toHaveBeenCalled();
  });
});
