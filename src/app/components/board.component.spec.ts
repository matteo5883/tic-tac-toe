import { SimpleChange } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { BoardComponent } from "./board.component";

describe("BoardComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardComponent],
    }).compileComponents();
  });

  it("creates the component", () => {
    const fixture = TestBed.createComponent(BoardComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it("renders 9 squares", () => {
    const fixture = TestBed.createComponent(BoardComponent);
    fixture.detectChanges();

    const squares = fixture.nativeElement.querySelectorAll("app-square");
    expect(squares.length).toBe(9);
  });

  it("sets a value and emits next symbol", () => {
    const fixture = TestBed.createComponent(BoardComponent);
    const component = fixture.componentInstance;
    const updateSpy = vi.spyOn(component.updateSymbol, "emit");

    component.nextSymbol = "X";
    component.setValue(0);

    expect(component.squares[0]).toBe("X");
    expect(component.nextSymbol).toBe("O");
    expect(updateSpy).toHaveBeenCalledWith("O");
  });

  it("does not overwrite an already set cell", () => {
    const fixture = TestBed.createComponent(BoardComponent);
    const component = fixture.componentInstance;
    const updateSpy = vi.spyOn(component.updateSymbol, "emit");

    component.nextSymbol = "X";
    component.setValue(0);
    component.nextSymbol = "O";
    component.setValue(0);

    expect(component.squares[0]).toBe("X");
    expect(updateSpy).toHaveBeenCalledTimes(1);
  });

  it("emits winner when a winning row is completed", () => {
    const fixture = TestBed.createComponent(BoardComponent);
    const component = fixture.componentInstance;
    const winnerSpy = vi.spyOn(component.declareWinner, "emit");

    component.squares = ["X", "X", null, null, null, null, null, null, null];
    component.nextSymbol = "X";
    component.setValue(2);

    expect(winnerSpy).toHaveBeenCalledWith("X");
  });

  it("emits draw when the board is full without winner", () => {
    const fixture = TestBed.createComponent(BoardComponent);
    const component = fixture.componentInstance;
    const drawSpy = vi.spyOn(component.declareDraw, "emit");

    component.squares = ["X", "O", "X", "X", "O", "O", "O", "X", null];
    component.nextSymbol = "X";
    component.setValue(8);

    expect(drawSpy).toHaveBeenCalled();
  });

  it("resets board when resetVersion changes", () => {
    const fixture = TestBed.createComponent(BoardComponent);
    const component = fixture.componentInstance;

    component.squares = ["X", "O", "X", null, null, null, null, null, null];
    component.resetStarterSymbol = "O";
    const updateSpy = vi.spyOn(component.updateSymbol, "emit");

    component.ngOnChanges({
      resetVersion: new SimpleChange(0, 1, false),
    });

    expect(component.squares.every((cell) => cell === null)).toBe(true);
    expect(component.nextSymbol).toBe("O");
    expect(updateSpy).toHaveBeenCalledWith("O");
  });

  it("prevents manual click when it is bot turn", () => {
    const fixture = TestBed.createComponent(BoardComponent);
    const component = fixture.componentInstance;

    component.botEnabled = true;
    component.botSymbol = "O";
    component.nextSymbol = "O";
    component.setValue(0);

    expect(component.squares[0]).toBeNull();
  });

  it("plays an automatic bot move when bot turn starts", () => {
    vi.useFakeTimers();

    const fixture = TestBed.createComponent(BoardComponent);
    const component = fixture.componentInstance;
    const updateSpy = vi.spyOn(component.updateSymbol, "emit");

    component.botEnabled = true;
    component.botSymbol = "O";
    component.botDifficulty = "easy";
    component.nextSymbol = "O";

    component.ngOnChanges({
      nextSymbol: new SimpleChange("X", "O", false),
    });

    vi.advanceTimersByTime(300);

    const oCount = component.squares.filter((value) => value === "O").length;
    expect(oCount).toBe(1);
    expect(updateSpy).toHaveBeenCalledWith("X");

    vi.useRealTimers();
  });

  it("plays immediately after reset when bot starts as X", () => {
    vi.useFakeTimers();

    const fixture = TestBed.createComponent(BoardComponent);
    const component = fixture.componentInstance;

    component.botEnabled = true;
    component.botSymbol = "X";
    component.botDifficulty = "easy";
    component.nextSymbol = "X";

    component.ngOnChanges({
      resetVersion: new SimpleChange(0, 1, false),
    });

    vi.advanceTimersByTime(300);

    const xCount = component.squares.filter((value) => value === "X").length;
    expect(xCount).toBe(1);

    vi.useRealTimers();
  });

  it("does not auto-play on reset when bot is O", () => {
    vi.useFakeTimers();

    const fixture = TestBed.createComponent(BoardComponent);
    const component = fixture.componentInstance;

    component.botEnabled = true;
    component.botSymbol = "O";
    component.botDifficulty = "easy";
    component.nextSymbol = "X";
    component.resetStarterSymbol = "X";

    component.ngOnChanges({
      resetVersion: new SimpleChange(0, 1, false),
    });

    vi.advanceTimersByTime(300);

    const playedCells = component.squares.filter(
      (value) => value !== null,
    ).length;
    expect(playedCells).toBe(0);
    expect(component.nextSymbol).toBe("X");

    vi.useRealTimers();
  });

  it("auto-plays on reset when starter is O and bot is O", () => {
    vi.useFakeTimers();

    const fixture = TestBed.createComponent(BoardComponent);
    const component = fixture.componentInstance;

    component.botEnabled = true;
    component.botSymbol = "O";
    component.botDifficulty = "easy";
    component.resetStarterSymbol = "O";

    component.ngOnChanges({
      resetVersion: new SimpleChange(0, 1, false),
    });

    vi.advanceTimersByTime(300);

    const oCount = component.squares.filter((value) => value === "O").length;
    expect(oCount).toBe(1);

    vi.useRealTimers();
  });
});
