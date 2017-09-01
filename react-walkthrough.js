/* eslint-disable */

// index.js
ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
);

// react/src/renderers/dom/ReactDOMStackEntry.js
var ReactDOMStack = {
  findDOMNode: findDOMNode,
  render: ReactMount.render,
  // ...
};

// react/src/renderers/dom/stack/client/ReactMount.js
var topLevelRootCounter = 1;
var TopLevelWrapper = function () {
  this.rootID = topLevelRootCounter++;
};

const ReactMount = {
  TopLevelWrapper: TopLevelWrapper,

  render: function (nextElement, container, callback) {
    return ReactMount._renderSubtreeIntoContainer(
      null,
      nextElement,
      container,
      callback,
    );
  },
  
  _renderSubtreeIntoContainer(
    parentComponent, // null
    nextElement, // OUR STATELESS COMPONENT
    container, // ... other stuff
    callback,
  ) {
    // All sorts of interesting things happen here but not pertinent
    // to our talk

    // THIS IS PERTINENT
    var nextWrappedElement = React.createElement(TopLevelWrapper, {
      child: nextElement,
    });

    // More cool stuff snipped here

    var component = ReactMount._renderNewRootComponent(
      nextWrappedElement, // <== this is our stateless component, 
                          // now wrapped in an object
      container,
      shouldReuseMarkup,
      nextContext,
      callback,
    )._renderedComponent.getPublicInstance();
    return component;
  },

  _renderNewRootComponent: function (
    nextElement, // <== our wrapped stateless component
    container,
    shouldReuseMarkup,
    context,
    callback,
  ) {
    // ... all sorts of error checking
    
    // WTF?
    var componentInstance = instantiateReactComponent(nextElement, false);

    // ...  more housekeeping and then

    return componentInstance; // <-- no longer stateless
  },

};

// react/src/isomorphic/classic/element/ReactElement.js
ReactElement.createElement = function (type, config, children) {
  // Not really interesting for our purposes,
  // the important thing to note is that it returns an OBJECT
  return ReactElement(
    type,
    key,
    ref,
    self,
    source,
    ReactCurrentOwner.current,
    props,
  );
};

// react/src/isomorphic/ReactEntry.js
var createElement = ReactElement.createElement;

var React = {
  Children: {
    map: ReactChildren.map,
    forEach: ReactChildren.forEach,
    count: ReactChildren.count,
    toArray: ReactChildren.toArray,
    only: onlyChild,
  },

  Component: ReactBaseClasses.Component,
  PureComponent: ReactBaseClasses.PureComponent,

  // ...
  createElement: createElement,
  // ...
};

// react/src/renderers/shared/stack/reconciler/instantiateReactComponent.js
function instantiateReactComponent(node, shouldHaveDebugID) {
  var instance;

  if (node === null || node === false) {
    // NOT US
  } else if (typeof node === 'object') {
    // ... stuff that does not apply to us

    if (typeof element.type === 'string') {
      // NOT US
    } else if (isInternalComponentType(element.type)) {
      // ALSO NOT US
    } else {
      // THIS IS US!
      instance = new ReactCompositeComponentWrapper(element);
    }
    // ...
  }
  // ...
}

// To avoid a cyclic dependency, we create the final class in this module
  // Did they say class??
  // also, what is `this`?
var ReactCompositeComponentWrapper = function (element) {
  this.construct(element);
};

Object.assign(
  ReactCompositeComponentWrapper.prototype,
  ReactCompositeComponent,
  {
    _instantiateReactComponent: instantiateReactComponent,
  },
);

