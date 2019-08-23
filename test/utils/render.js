'use strict';

import React from 'react';
import { Provider, ReactReduxContext } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import ui, { reducer } from '../../src';
import ReactTestUtils from 'react-dom/test-utils';

const store = createStore(combineReducers({ ui: reducer }));

/**
 * Wrap given JSX with a provider contianing a store with the UI reducer
 */
const wrapWithProvider = (jsx) => (
  <Provider store={store} context={ReactReduxContext}>
    {jsx}
  </Provider>
)

const render = (jsx) => {
  return ReactTestUtils.renderIntoDocument(
    wrapWithProvider(jsx)
  );
}

const renderAndFind = (jsx, type = null) => {
  if (type === undefined) {
    type = jsx;
    jsx = <jsx context={ReactReduxContext}/>
  }
  const tree = render(jsx);
  return ReactTestUtils.findRenderedComponentWithType(tree, type);
}

export {
  store,
  wrapWithProvider,
  render,
  renderAndFind
}
