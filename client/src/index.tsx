import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme/theme';
import GlobalStyles from './theme/GlobalStyles';

ReactDOM.render(
  	<React.StrictMode>
    	<Provider store={store}>
			<ThemeProvider theme={theme}>
				<GlobalStyles />
				<HashRouter>
					<App />
				</HashRouter>
			</ThemeProvider>
    	</Provider>
  	</React.StrictMode>,
  	document.getElementById('root')
);

serviceWorker.unregister();
