import { TestBed } from "@angular/core/testing";
import { DrawPopupComponent } from "./draw-popup.component";

describe("DrawPopupComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawPopupComponent],
    }).compileComponents();
  });

  it("creates the component", () => {
    const fixture = TestBed.createComponent(DrawPopupComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it("emits newGame on first button click", () => {
    const fixture = TestBed.createComponent(DrawPopupComponent);
    const component = fixture.componentInstance;
    const emitSpy = vi.spyOn(component.newGame, "emit");

    fixture.detectChanges();
    const buttons = fixture.nativeElement.querySelectorAll(
      "button",
    ) as NodeListOf<HTMLButtonElement>;
    buttons[0].click();

    expect(emitSpy).toHaveBeenCalled();
  });

  it("emits closeGame on second button click", () => {
    const fixture = TestBed.createComponent(DrawPopupComponent);
    const component = fixture.componentInstance;
    const emitSpy = vi.spyOn(component.closeGame, "emit");

    fixture.detectChanges();
    const buttons = fixture.nativeElement.querySelectorAll(
      "button",
    ) as NodeListOf<HTMLButtonElement>;
    buttons[1].click();

    expect(emitSpy).toHaveBeenCalled();
  });
});
