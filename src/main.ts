import "zone.js";
import { bootstrapApplication } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { AppComponent } from "./app/app.component";
import "bootstrap/dist/css/bootstrap.css";
import "@angular/material/prebuilt-themes/azure-blue.css";
import "./css/variables.css";
import "./css/common.css";
import "./css/game.css";
import "./css/board.css";
import "./css/popup.css";

bootstrapApplication(AppComponent, { providers: [provideAnimations()] }).catch(
  (error) => console.error(error),
);
