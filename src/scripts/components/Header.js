import { Jet } from "../../vendor/libs/jet";

export const Header = Jet.createClass({
  render() {
    return Jet.createElement(
      'header',
      {  className: 'header' },
      Jet.createElement(
        'div',
        { className: 'header-container' },
        [
          Jet.createElement('h1', { className: 'logo' }, this.props.title || 'Hello, Jet!'),
          Jet.createElement('p', { className: 'slogan' }, this.props.subTitle || ''),
        ],
      ),
    );
  }
});
