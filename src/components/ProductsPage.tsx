import { Alert, CircularProgress, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { API_URL, ROWS_PER_PAGE } from '../constants/constants';
import { Product } from '../types/types';
import ProductsTable from './ProductsTable';
import SearchField from './SearchField';

const ProductsPage = () => {
	const [productsList, setProductsList] = useState<Product[] | undefined>(undefined);
	const [productsCount, setProductsCount] = useState(0);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const location = useLocation();
	const query = new URLSearchParams(location.search);
	let page = parseInt(query.get('page') || '0', 10);
	if (page < 0) {
		page = 0;
	}
	const productId = query.get('id');

	useEffect(() => {
		const getData = async () => {
			setLoading(true);
			const url = productId
				? `${API_URL}?id=${productId}`
				: `${API_URL}?page=${page + 1}&per_page=${ROWS_PER_PAGE}`;
			try {
				const response = await fetch(url);
				setLoading(false);
				if (response.status === 200) {
					const data = await response.json();
					setError(false);

					if (data.data.constructor === Array) {
						if (data.data.length) {
							setProductsList(data.data);
							setProductsCount(data.total);
						} else {
							setError(true);
						}
					} else {
						setProductsList([data.data]);
						setProductsCount(1);
					}
				} else {
					throw new Error('Request failed');
				}
			} catch (error) {
				setLoading(false);
				setError(true);
				console.error(error);
			}
		};
		getData();
	}, [page, productId]);

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
				{error && (
					<Alert variant='filled' severity='error'>
						Could not fetch the data. Please try again
					</Alert>
				)}
				{!error && (
					<ProductsTable products={productsList} productsCount={productsCount} page={page} />
				)}
			</Paper>
		</Paper>
	);
};

export default ProductsPage;
