import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import "./i18n";
import * as serviceWorker from './serviceWorker';
import combine from './app/redux/reducers/reducers'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
let store = createStore(combine)
ReactDOM.render(
  // <BrowserRouter basename="/demo/corona-react-free/template/demo_1/preview">
  <BrowserRouter basename='/'>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
  , document.getElementById('root'));
serviceWorker.unregister();