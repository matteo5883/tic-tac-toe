import { TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";

describe("AppComponent", () => {
  beforeEach(async () => {
    localStorage.clear();
    document.body.classList.remove("theme-light", "theme-dark");

    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  afterEach(() => {
    localStorage.clear();
    document.body.classList.remove("theme-light", "theme-dark");
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

  it("applies light theme class when toggled", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    expect(document.body.classList.contains("theme-dark")).toBe(true);
    expect(document.body.classList.contains("theme-light")).toBe(false);

    component.toggleTheme();

    expect(component.theme).toBe("light");
    expect(document.body.classList.contains("theme-light")).toBe(true);
    expect(document.body.classList.contains("theme-dark")).toBe(false);
    expect(localStorage.getItem("tic-tac-toe-theme")).toBe("light");
  });

  it("loads persisted light theme on init", () => {
    localStorage.setItem("tic-tac-toe-theme", "light");

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    const component = fixture.componentInstance;
    expect(component.theme).toBe("light");
    expect(document.body.classList.contains("theme-light")).toBe(true);
  });

  it("assigns BOT name to configured bot player on start", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;

    component.gameMode = "human-vs-bot";
    component.botPlayer = "O";
    component.player1 = "Alice";
    component.player2 = "";

    component.startGame();

    expect(component.player2).toBe("BOT");
    expect(component.page).toBe(2);
  });
});
