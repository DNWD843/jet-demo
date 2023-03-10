import { JetReconciler } from "./JetReconciler.js";
import { instantiateJetComponent, isObject } from "./helpers.js";
import { JetInstanceMap } from "./instanceMap.js";

export class JetDOMComponent {
  constructor(element) {
    this._currentElement = element;
  }

  mountComponent(container) {
    const domElement = this._createDomElementWithChildren();

    container.appendChild(domElement);

    this._hostNode = domElement;

    return domElement;
  }

  _createDomElementWithChildren() {
    const domElement = document.createElement(this._currentElement.type);
    const { children, ...props } = this._currentElement.props;

    Object.keys(props).forEach((key) => {
      domElement[key.startsWith('on') ? key.toLowerCase() : key] = props[key];
    })

    if (!children) return domElement;

    if (typeof children === 'string') {
      const textNode = document.createTextNode(children);
      domElement.appendChild(textNode);
    }

    if (Array.isArray(children)) {
      children.forEach(child => {
        const childElement = this._renderChild(child, domElement);
        domElement.appendChild(childElement);
      })
    } else if (isObject(children)) {
      const childElement = this._renderChild(children, domElement);
      domElement.appendChild(childElement);
    }

    return domElement;
  }

  _renderChild(child, container) {
    const component = instantiateJetComponent({
      element: child,
      domComponentClass: JetDOMComponent,
      compositeComponentClass: JetCompositeComponentWrapper,
    });

    return JetReconciler.mountComponent(component, container);
  }

  _updateDOMProperties(prevProps, nextProps) {
    // nothing to do! I'll explain why below
  }
  _updateDOMChildren(prevProps, nextProps) {
    const prevContent = prevProps.children;
    const nextContent = nextProps.children;

    if (!nextContent) {
      this.updateContent(null);
    } else if (prevContent !== nextContent) {
      this.updateContent(nextContent);
    }
  }

  updateContent(newContent) {
    const node = this._hostNode;
    const firstChild = node.firstChild;

    if (typeof newContent === 'string') {
      node.textContent = newContent;
    }

    if (firstChild && firstChild === node.lastChild && firstChild.nodeType === Node.TEXT_NODE ) {
      firstChild.nodeValue = newContent;
    }

    if (firstChild && firstChild === node.lastChild && firstChild.nodeType === Node.ELEMENT_NODE ) {
      const childElement = this._renderChild(newContent, firstChild);
      node.firstChild.replaceWith(childElement);
    }
  }

  updateComponent(prevElement, nextElement) {
    const prevProps = prevElement.props;
    const nextProps = nextElement.props;

    this._updateDOMProperties(prevProps, nextProps);
    this._updateDOMChildren(prevProps, nextProps);

    // this._currentElement = nextElement;
  }

  receiveComponent(nextElement) {
    const prevElement = this._currentElement;
    this.updateComponent(prevElement, nextElement);
  }
}

export class JetCompositeComponentWrapper {
  constructor(element) {
    this._currentElement = element;
  }

  mountComponent(container) {
    const Component = this._currentElement.type;
    const componentInstance = new Component(this._currentElement.props);
    this._instance = componentInstance;

    JetInstanceMap.set(componentInstance, this);

    if (componentInstance.componentWillMount) {
      componentInstance.componentWillMount();
    }

    const markup = this.performInitialMount(container);

    if (componentInstance.componentDidMount) {
      componentInstance.componentDidMount();
    }


    return markup;
  }

  performInitialMount(container) {
    const renderedElement = this._instance.render();

    const child = instantiateJetComponent({
      element: renderedElement,
      domComponentClass: JetDOMComponent,
      compositeComponentClass: JetCompositeComponentWrapper,
    });

    this._renderedComponent = child;

    return JetReconciler.mountComponent(child, container);
  }

  _updateRenderedComponent() {
    const prevComponentInstance = this._renderedComponent;
    const instance = this._instance;
    const nextRenderedElement = instance.render();

    JetReconciler.receiveComponent(prevComponentInstance, nextRenderedElement);
  }

  _performComponentUpdate(nextElement, nextProps, nextState) {
    this._currentElement = nextElement;
    const instance = this._instance;
    instance.props = nextProps;
    instance.state = nextState;

    this._updateRenderedComponent();
  }

  _processPendingState() {
    const instance = this._instance;

    if (!this._pendingPartialState) {
      return instance.state;
    }

    let nextState = instance.state;

    for (let i = 0; i < this._pendingPartialState.length; ++i) {
      const partialState = this._pendingPartialState[i];

      if (typeof partialState === 'function') {
        nextState = partialState(nextState);
      } else {
        nextState = Object.assign(nextState, partialState);
      }
    }

    this._pendingPartialState = null;

    return nextState;
  }
  updateComponent(prevElement, nextElement) {
    this._rendering = true;
    const nextProps = nextElement.props;
    const instance = this._instance;

    const willReceive = prevElement !== nextElement;

    if (willReceive && instance.componentWillReceiveProps) {
      instance.componentWillReceiveProps(nextProps);
    }

    let shouldUpdate = true;

    const nextState = this._processPendingState();

    if (instance.shouldComponentUpdate) {
      shouldUpdate = instance.shouldComponentUpdate(nextProps, nextState);
    }

    if (shouldUpdate) {
      this._performComponentUpdate(nextElement, nextProps, nextState);
    } else {
      instance.props = nextProps;
    }
    this._rendering = false;
  }

  performUpdateIfNecessary() {
    this.updateComponent(this._currentElement, this._currentElement);
  }

  receiveComponent(nextElement) {
    const prevElement = this._currentElement;
    this.updateComponent(prevElement, nextElement);
  }
}
