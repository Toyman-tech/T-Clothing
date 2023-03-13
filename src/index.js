import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import {store} from './redux/shop/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './redux/shop/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}> 
      <BrowserRouter>
       <PersistGate persistor={persistor}>
        <App />
       </PersistGate>
      </BrowserRouter>
    </Provider>  
  </React.StrictMode>
);

