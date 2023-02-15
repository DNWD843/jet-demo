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
            'ul',
            { className: 'links' },
            [
              Jet.createElement('li', { className: 'list-item' },
                Jet.createElement(
                  'a',
                  { className: 'link', href: 'https://linkedin.com/in/maddamon', rel: 'noopener noreferrer', target: '_blank' },
                  'LinkedIn',
                ),
              ),
              Jet.createElement('li', { className: 'list-item' },
                Jet.createElement(
                  'a',
                  { className: 'link', href: 'https://github.com/DNWD843', rel: 'noopener noreferrer', target: '_blank' },
                  'GitHub',
                ),
              ),
              Jet.createElement('li', { className: 'list-item' },
                Jet.createElement(
                  'a',
                  { className: 'link', href: 'https://t.me/mad_damon', rel: 'noopener noreferrer', target: '_blank' },
                  'Telegram',
                ),
              ),
            ]
          ),
        ]
      )
    );
  }
});
