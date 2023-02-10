import { rootContainer } from './domNodes.js';
import { Jet } from "./jet";

const H1 = Jet.createElement(
  'h1',
  { className: 'title' },
  'My Jet project',
  );

const container = Jet.createElement(
  'div',
  { className: 'container' },
)

Jet.render(container, rootContainer);

const containerNode = document.querySelector('.container');

Jet.render(H1, containerNode)
