import { TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";

describe("AppComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it("creates the component", () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it("starts in pregame state", () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelector("app-pregame")).toBeTruthy();
    expect(host.querySelector("app-game")).toBeNull();
  });

  it("switches to game when startGame is called", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;

    component.startGame();
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelector("app-game")).toBeTruthy();
    expect(host.querySelector("app-pregame")).toBeNull();
  });

  it("resets page and players on newGame", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;

    component.setPlayer1("Alice");
    component.setPlayer2("Bob");
    component.startGame();
    component.newGame();

    expect(component.page).toBe(1);
    expect(component.player1).toBe("");
    expect(component.player2).toBe("");
  });
});
