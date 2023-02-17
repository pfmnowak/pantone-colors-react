import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import ProductsPage from './components/ProductsPage';
import customTheme from './themes/customTheme';

function App() {
	return (
		<ThemeProvider theme={customTheme}>
			<CssBaseline />
			<div className='App'>
				<header className='App-header'>
					<Routes>
						<Route path='*' element={<ProductsPage />} />
					</Routes>
				</header>
			</div>
		</ThemeProvider>
	);
}

export default App;
