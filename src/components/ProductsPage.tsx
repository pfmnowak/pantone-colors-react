import HomeIcon from '@mui/icons-material/Home';
import { Alert, CircularProgress, IconButton, Paper, Tooltip } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_URL, ROWS_PER_PAGE } from '../constants/constants';
import useProducts from '../hooks/useProducts';
import ProductsTable from './ProductsTable';
import SearchField from './SearchField';

const ProductsPage = () => {
	const navigate = useNavigate();
	const location = useLocation();

	let page = 0;

	const getURL = () => {
		const query = new URLSearchParams(location.search);
		page = parseInt(query.get('page') || '0', 10);
		if (page < 0) {
			page = 0;
		}
		const productId = query.get('id');

		return productId
			? `${API_URL}?id=${productId}`
			: `${API_URL}?page=${page + 1}&per_page=${ROWS_PER_PAGE}`;
	};

	const { productsList, productsCount, loading, hasError } = useProducts(getURL());

	const handleBtnClick = () => {
		navigate(`?page=${0}`);
	};

	return (
		<Paper elevation={3} sx={{ padding: '2rem', backgroundColor: 'rgba(205, 205, 205, 0.5)' }}>
			<SearchField />
			<Paper
				sx={{
					width: '75vw',
					maxWidth: '55rem',
					padding: '2rem',
					backgroundColor: 'rgba(0, 0, 0, 0.8)',
				}}
			>
				{loading && <CircularProgress color='success' />}
				{hasError && (
					<Alert variant='filled' severity='error'>
						Could not fetch the data. Please try again
					</Alert>
				)}
				{!hasError && (
					<ProductsTable products={productsList} productsCount={productsCount} page={page} />
				)}
				{productsCount <= 1 && (
					<Tooltip title='Take me home'>
						<IconButton onClick={handleBtnClick} aria-label='go home'>
							<HomeIcon color='success' />
						</IconButton>
					</Tooltip>
				)}
			</Paper>
		</Paper>
	);
};

export default ProductsPage;
