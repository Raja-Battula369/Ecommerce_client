import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider, ColorModeProvider, ColorModeScript } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './state/Index';

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <Provider store={store}>
      <ChakraProvider>
        <ColorModeProvider>
          <ColorModeScript />
          <App />
        </ColorModeProvider>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
