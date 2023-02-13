import { Jet } from "../../vendor/libs/jet";

export const Footer = Jet.createClass({
  render() {
    return Jet.createElement(
      'footer',
      { className: 'footer' },
      Jet.createElement(
        'div',
        { className: 'footer-container' },
        [
          Jet.createElement('span', { className: 'copyright' }, 'Mad Damon, 2023'),
          Jet.createElement(
            'div',
            { className: 'links' },
            [
              Jet.createElement('span', { className: 'link' }, 'LinkedIn'),
              Jet.createElement('span', { className: 'link' }, 'GitHub'),
              Jet.createElement('span', { className: 'link' }, 'Telegram'),
            ]
          ),
        ]
      )
    );
  }
});
