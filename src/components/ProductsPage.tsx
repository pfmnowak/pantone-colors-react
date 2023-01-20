import { Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { API_URL, ROWS_PER_PAGE } from '../constants/constants';
import { Product } from '../types/types';
import ProductsTable from './ProductsTable';
import SearchField from './SearchField';

const ProductsPage = () => {
	const [productsList, setProductsList] = useState<Product[] | undefined>(undefined);
	const [productsCount, setProductsCount] = useState(0);

	const location = useLocation();
	const query = new URLSearchParams(location.search);
	const page = parseInt(query.get('page') || '0', 10);
	const productId = query.get('id');

	useEffect(() => {
		const getData = async () => {
			const url = productId
				? `${API_URL}?id=${productId}`
				: `${API_URL}?page=${page + 1}&per_page=${ROWS_PER_PAGE}`;
			try {
				const response = await fetch(url);
				if (response.status === 200) {
					const data = await response.json();

					if (data.data.constructor === Array) {
						setProductsList(data.data);
						setProductsCount(data.total);
					} else {
						setProductsList([data.data]);
						setProductsCount(1);
					}
				} else {
					throw new Error('Request failed');
				}
			} catch (error) {
				console.error(error);
				// ToDo display error
			}
		};
		getData();
	}, [page, productId]);

	return (
		<Paper elevation={3} sx={{ padding: '2rem', backgroundColor: 'rgba(205, 205, 205, 0.5)' }}>
			<SearchField />
			<ProductsTable products={productsList} productsCount={productsCount} page={page} />
		</Paper>
	);
};

export default ProductsPage;
