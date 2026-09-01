import { TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { GameComponent } from "./game.component";
import { WinnerPopupComponent } from "./winner-popup.component";
import { DrawPopupComponent } from "./draw-popup.component";

describe("GameComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameComponent],
    }).compileComponents();
  });

  it("creates the component", () => {
    const fixture = TestBed.createComponent(GameComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it("uses fallback player names in status", () => {
    const fixture = TestBed.createComponent(GameComponent);
    const component = fixture.componentInstance;

    component.nextSymbol = "X";
    expect(component.status).toBe("Next player: X");

    component.nextSymbol = "O";
    expect(component.status).toBe("Next player: O");
  });

  it("uses custom names in status", () => {
    const fixture = TestBed.createComponent(GameComponent);
    const component = fixture.componentInstance;

    component.player1 = "Alice";
    component.player2 = "Bob";
    component.nextSymbol = "X";
    expect(component.status).toBe("Next player: Alice");

    component.nextSymbol = "O";
    expect(component.status).toBe("Next player: Bob");
  });

  it("shows winner popup after renderWinner", () => {
    const fixture = TestBed.createComponent(GameComponent);
    const component = fixture.componentInstance;

    component.player1 = "Alice";
    component.renderWinner("X");
    fixture.detectChanges();

    expect(component.showPopup).toBe(true);
    expect(component.winner).toBe("Alice");
    expect(component.player1Score).toBe(1);
    expect(
      fixture.debugElement.query(By.directive(WinnerPopupComponent)),
    ).toBeTruthy();
  });

  it("increments second player score when O wins", () => {
    const fixture = TestBed.createComponent(GameComponent);
    const component = fixture.componentInstance;

    component.player2 = "Bob";
    component.renderWinner("O");

    expect(component.winner).toBe("Bob");
    expect(component.player2Score).toBe(1);
  });

  it("shows draw popup after declareDraw", () => {
    const fixture = TestBed.createComponent(GameComponent);
    const component = fixture.componentInstance;

    component.declareDraw();
    fixture.detectChanges();

    expect(component.showPopup).toBe(true);
    expect(component.winner).toBe("");
    expect(component.drawScore).toBe(1);
    expect(
      fixture.debugElement.query(By.directive(DrawPopupComponent)),
    ).toBeTruthy();
  });

  it("resets winner state on newGame and alternates starter", () => {
    const fixture = TestBed.createComponent(GameComponent);
    const component = fixture.componentInstance;

    component.showPopup = true;
    component.winner = "Alice";
    component.startingSymbol = "X";
    component.nextSymbol = "X";
    component.resetVersion = 0;

    component.newGame();

    expect(component.showPopup).toBe(false);
    expect(component.winner).toBe("");
    expect(component.startingSymbol).toBe("O");
    expect(component.nextSymbol).toBe("O");
    expect(component.resetVersion).toBe(1);

    component.newGame();

    expect(component.startingSymbol).toBe("X");
    expect(component.nextSymbol).toBe("X");
    expect(component.resetVersion).toBe(2);
  });

  it("propagates close event from winner popup", () => {
    const fixture = TestBed.createComponent(GameComponent);
    const component = fixture.componentInstance;
    const closeSpy = vi.spyOn(component.closeGame, "emit");

    component.showPopup = true;
    component.winner = "Alice";
    fixture.detectChanges();

    const winnerPopup = fixture.debugElement.query(
      By.directive(WinnerPopupComponent),
    );
    winnerPopup.componentInstance.closeGame.emit();

    expect(closeSpy).toHaveBeenCalled();
  });

  it("emits closeGame when close icon is clicked", () => {
    const fixture = TestBed.createComponent(GameComponent);
    const component = fixture.componentInstance;
    const closeSpy = vi.spyOn(component.closeGame, "emit");

    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector(
      ".close-match",
    ) as HTMLButtonElement;
    button.click();

    expect(closeSpy).toHaveBeenCalled();
  });
});
