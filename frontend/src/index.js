import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
// import './bootstrap.min.css';
import './bootstrap.min1.css';
//import './bootstrap.min2.css';
import './index.css';

import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById('root')
);
