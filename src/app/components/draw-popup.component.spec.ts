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

  it("exposes dialog semantics and title association", () => {
    const fixture = TestBed.createComponent(DrawPopupComponent);
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    const popup = host.querySelector(".popup") as HTMLElement;
    const title = host.querySelector("#draw-title") as HTMLElement;

    expect(popup.getAttribute("role")).toBe("dialog");
    expect(popup.getAttribute("aria-modal")).toBe("true");
    expect(popup.getAttribute("aria-labelledby")).toBe("draw-title");
    expect(title.textContent).toContain("It's a draw");
  });
});
