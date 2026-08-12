import { TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";

describe("App Integration", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it("completes winner flow and resets game with same players", () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges(false);

    const host = fixture.nativeElement as HTMLElement;

    const inputs = host.querySelectorAll(
      "input",
    ) as NodeListOf<HTMLInputElement>;
    inputs[0].value = "Alice";
    inputs[0].dispatchEvent(new Event("input"));
    inputs[1].value = "Bob";
    inputs[1].dispatchEvent(new Event("input"));

    const startButton = host.querySelector(".startGame") as HTMLButtonElement;
    startButton.click();
    fixture.detectChanges(false);

    const squareButtons = Array.from(
      host.querySelectorAll(".board .square"),
    ) as HTMLButtonElement[];

    // Alice (X) wins on the first row: 0,1,2 while Bob (O) plays 3,4.
    squareButtons[0].click();
    fixture.detectChanges(false);
    squareButtons[3].click();
    fixture.detectChanges(false);
    squareButtons[1].click();
    fixture.detectChanges(false);
    squareButtons[4].click();
    fixture.detectChanges(false);
    squareButtons[2].click();
    fixture.detectChanges(false);

    expect(host.textContent).toContain("Congratulations Alice");

    const popupButtons = host.querySelectorAll(
      ".popup-button",
    ) as NodeListOf<HTMLButtonElement>;
    popupButtons[0].click();
    fixture.detectChanges(false);
    fixture.detectChanges(false);

    expect(host.querySelector("app-winner-popup")).toBeNull();
    expect(host.querySelector("app-draw-popup")).toBeNull();

    const resetSquares = Array.from(
      host.querySelectorAll(".board .square"),
    ) as HTMLButtonElement[];
    const allSquaresEmpty = resetSquares.every(
      (button) => button.textContent?.trim() === "",
    );
    expect(allSquaresEmpty).toBe(true);

    resetSquares[0].click();
    fixture.detectChanges(false);
    expect(resetSquares[0].textContent?.trim()).toMatch(/^[XO]$/);
  });

  it("returns to pregame and clears names when close is clicked", () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges(false);

    const host = fixture.nativeElement as HTMLElement;

    const inputs = host.querySelectorAll(
      "input",
    ) as NodeListOf<HTMLInputElement>;
    inputs[0].value = "Alice";
    inputs[0].dispatchEvent(new Event("input"));
    inputs[1].value = "Bob";
    inputs[1].dispatchEvent(new Event("input"));

    const startButton = host.querySelector(".startGame") as HTMLButtonElement;
    startButton.click();
    fixture.detectChanges(false);

    const squareButtons = Array.from(
      host.querySelectorAll(".board .square"),
    ) as HTMLButtonElement[];

    // Trigger a fast winner popup.
    squareButtons[0].click();
    fixture.detectChanges(false);
    squareButtons[3].click();
    fixture.detectChanges(false);
    squareButtons[1].click();
    fixture.detectChanges(false);
    squareButtons[4].click();
    fixture.detectChanges(false);
    squareButtons[2].click();
    fixture.detectChanges(false);

    const popupButtons = host.querySelectorAll(
      ".popup-button",
    ) as NodeListOf<HTMLButtonElement>;
    popupButtons[1].click();
    fixture.detectChanges(false);

    expect(host.querySelector("app-pregame")).toBeTruthy();

    const resetInputs = host.querySelectorAll(
      "input",
    ) as NodeListOf<HTMLInputElement>;
    expect(resetInputs[0].value).toBe("");
    expect(resetInputs[1].value).toBe("");
  });
});
