import { createTheme, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
import ProductsPage from './components/ProductsPage';

const theme = createTheme({
	components: {
		MuiCssBaseline: {
			styleOverrides: `
			::selection {
				background-color: black;
				color: white;
			  }
			`,
		},
		MuiTablePagination: {
			styleOverrides: {
				root: {
					color: '#fff',
				},
				actions: {
					'& .MuiIconButton-root.Mui-disabled': {
						color: 'rgba(255, 255, 255, 0.26)',
					},
				},
			},
		},
		MuiTableCell: {
			styleOverrides: {
				root: {
					fontWeight: 600,
					border: 'none',
				},
			},
		},
		MuiTableHead: {
			styleOverrides: {
				root: {
					'& .MuiTableCell-root': {
						color: '#fff',
					},
				},
			},
		},
		MuiTableBody: {
			styleOverrides: {
				root: {
					'& .MuiTableCell-root': {
						fontSize: '1.3rem',
						borderBottom: '0.7rem solid transparent',
					},
				},
			},
		},
	},
});

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<div className='App'>
				<header className='App-header'>
					<ProductsPage />
				</header>
			</div>
		</ThemeProvider>
	);
}

export default App;
