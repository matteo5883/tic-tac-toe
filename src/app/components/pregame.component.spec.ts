import { TestBed } from "@angular/core/testing";
import { PregameComponent } from "./pregame.component";

describe("PregameComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PregameComponent],
    }).compileComponents();
  });

  it("creates the component", () => {
    const fixture = TestBed.createComponent(PregameComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it("binds player names in input fields", () => {
    const fixture = TestBed.createComponent(PregameComponent);
    const component = fixture.componentInstance;

    component.player1 = "Alice";
    component.player2 = "Bob";
    fixture.detectChanges();

    const inputs = fixture.nativeElement.querySelectorAll(
      "input",
    ) as NodeListOf<HTMLInputElement>;
    expect(inputs[0].value).toBe("Alice");
    expect(inputs[1].value).toBe("Bob");
  });

  it("emits player1Change when first input changes", () => {
    const fixture = TestBed.createComponent(PregameComponent);
    const component = fixture.componentInstance;
    const emitSpy = vi.spyOn(component.player1Change, "emit");

    const input = fixture.nativeElement.querySelectorAll(
      "input",
    )[0] as HTMLInputElement;
    input.value = "Alice";
    input.dispatchEvent(new Event("input"));

    expect(emitSpy).toHaveBeenCalledWith("Alice");
  });

  it("emits player2Change when second input changes", () => {
    const fixture = TestBed.createComponent(PregameComponent);
    const component = fixture.componentInstance;
    const emitSpy = vi.spyOn(component.player2Change, "emit");

    const input = fixture.nativeElement.querySelectorAll(
      "input",
    )[1] as HTMLInputElement;
    input.value = "Bob";
    input.dispatchEvent(new Event("input"));

    expect(emitSpy).toHaveBeenCalledWith("Bob");
  });

  it("emits start when start button is clicked", () => {
    const fixture = TestBed.createComponent(PregameComponent);
    const component = fixture.componentInstance;
    const emitSpy = vi.spyOn(component.start, "emit");

    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector(
      "button",
    ) as HTMLButtonElement;
    button.click();

    expect(emitSpy).toHaveBeenCalled();
  });
});
