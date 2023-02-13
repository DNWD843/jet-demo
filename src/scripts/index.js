import { Jet } from "../vendor/libs/jet";
import { App } from "./App.js";

const rootContainer = document.querySelector('.content');

Jet.render(
  Jet.createElement(App, null),
  rootContainer,
);
