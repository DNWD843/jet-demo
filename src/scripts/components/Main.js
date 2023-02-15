import { Jet } from "../../vendor/libs/jet";

export const Main = Jet.createClass({
  getInitialState() {
    return ({ color: 'red' })
  },

  componentWillMount() {
    this.handleClick = this.handleClick.bind(this);
  },

  componentDidMount() {
    console.log('yo', this.state.color)
  },

  handleClick() {
    this.setState(prev => {
      if (prev.color === 'red') {
        return ({ color: 'green' })
      }

      if (prev.color === 'green') {
        return ({ color: 'blue' })
      }

      return ({ color: 'red' });
    })
  },

  render() {
    return  Jet.createElement(
      'main',
      { className: 'main' },
      Jet.createElement(
        'div',
        { className: `main-container color-${this.state.color}` },
        [
          Jet.createElement('span', { className: 'content-title' }, this.props.contentTitle || ''),
          Jet.createElement('div', { className: 'content-image' }),
          Jet.createElement('button', { className: 'content-color-button', onclick: this.handleClick }, 'Click me'),
        ],
      ),
    );
  }
});
