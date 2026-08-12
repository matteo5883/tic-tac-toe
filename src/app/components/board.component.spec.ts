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

  it("resets board and emits reset signals when resetGameState changes to true", () => {
    const fixture = TestBed.createComponent(BoardComponent);
    const component = fixture.componentInstance;

    component.squares = ["X", "O", "X", null, null, null, null, null, null];
    const updateSpy = vi.spyOn(component.updateSymbol, "emit");
    const resetSpy = vi.spyOn(component.resetGame, "emit");

    component.ngOnChanges({
      resetGameState: new SimpleChange(false, true, false),
    });

    expect(component.squares.every((cell) => cell === null)).toBe(true);
    expect(updateSpy).toHaveBeenCalledWith("X");
    expect(resetSpy).toHaveBeenCalledWith(false);
  });
});
