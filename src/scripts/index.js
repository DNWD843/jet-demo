import { rootContainer } from './domNodes.js';
import { Jet } from "./jet";

// const H1 = Jet.createElement(
//   'h1',
//   { className: 'title' },
//   'My Jet project',
// );
//
// const span = Jet.createElement(
//   'span',
//   { className: 'subtitle' },
//   'subtitle',
// )

// const header = Jet.createElement(
//   'header',
//   { className: 'header'},
//   [H1, span],
// )

const headerComponent = Jet.createClass({
  render() {
    const H1 = Jet.createElement(
      'h1',
      { className: 'title' },
      'My Jet project',
    );

    const Span = Jet.createElement(
      'span',
      { className: 'subtitle' },
      'subtitle',
    )
    return Jet.createElement(
      'header',
      { className: 'header'},
      [H1, Span],
    )
  }
})

const headerEl = Jet.createElement(headerComponent, {})

const container = Jet.createElement(
  'div',
  { className: 'container' },
)

Jet.render(container, rootContainer);

const containerNode = document.querySelector('.container');

Jet.render(headerEl, containerNode);



// const containerNode = document.querySelector('.container');
//
// Jet.render(H1, containerNode)

// const Toolbar = Jet.createClass({
//   render() {
//
//   }
// })

// const H1 = Jet.createClass({
//   render() {
//     return Jet.createElement('h1', { ...this.props });
//   }
// })

// const Text = Jet.createClass({
//   componentWillMount() {
//     console.log('Text will be mounted');
//   },
//
//   componentDidMount() {
//     console.log('Text was mounted');
//   },
//
//   render() {
//     const { isTitle, ...props } = this.props;
//
//     if (isTitle) {
//       return Jet.createElement(H1, { ...props });
//     }
//
//     return Jet.createElement('p', { ...props })
//   }
// })
//
// const textProps = { isTitle: true, className: 'content__title' };
//
// Jet.render(
//   Jet.createElement(Text, textProps, 'Hello, Jet!'),
//   rootContainer,
// );
//
// Jet.render(
//   Jet.createElement(Text, { isTitle: false, className: 'content__subTitle' }, 'Let`s talk about Jet?'),
//   rootContainer,
// );
//
// Jet.render(
//   Jet.createElement('button', { type: 'button', className: 'content__button' }, 'Press to know more'),
//   rootContainer,
// );
//
// setTimeout(() => {
//   Jet.render(
//     Jet.createElement(Text, textProps, 'Hello again, updated Jet!'),
//     rootContainer,
//   );
// }, 2000);
