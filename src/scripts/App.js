import { Jet } from "../vendor/libs/jet";
import { Header, Main, Footer } from "./components";

export const App = Jet.createClass({
  render() {
    return Jet.createElement(
      'div',
      { className: 'app-container' },
      [
        Jet.createElement(Header, { title: 'Jet', subTitle: 'Just try it!'  }),
        Jet.createElement(Main, { contentTitle: 'Hi! My name is Jet!' }),
        Jet.createElement(Footer),
      ]
    )
  }
});
