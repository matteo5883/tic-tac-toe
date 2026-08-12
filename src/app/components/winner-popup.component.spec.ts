import { TestBed } from "@angular/core/testing";
import { WinnerPopupComponent } from "./winner-popup.component";

describe("WinnerPopupComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WinnerPopupComponent],
    }).compileComponents();
  });

  it("creates the component", () => {
    const fixture = TestBed.createComponent(WinnerPopupComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it("renders winner name", () => {
    const fixture = TestBed.createComponent(WinnerPopupComponent);
    fixture.componentInstance.winner = "Alice";
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.textContent).toContain("Congratulations Alice");
  });

  it("emits newGame on first button click", () => {
    const fixture = TestBed.createComponent(WinnerPopupComponent);
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
    const fixture = TestBed.createComponent(WinnerPopupComponent);
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
