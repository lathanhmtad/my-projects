import React from 'react';
import ReactDOM from 'react-dom/client';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';
import { persistStore } from "redux-persist";
import reportWebVitals from './reportWebVitals';

import App from './App';
import store from './redux/store'
import { injectStore } from './utils/customizeAxios'

const root = ReactDOM.createRoot(document.getElementById('root'));

let persistor = persistStore(store);

injectStore(store)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
