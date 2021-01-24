import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';
import Home from '../components/home';

it('renders home component successfully', () => {
  const store = createStore(rootReducer, applyMiddleware(thunk));
  const Div = document.createElement('div');
  ReactDOM.render(<Provider store={store}><Home /></Provider>, Div);
});
