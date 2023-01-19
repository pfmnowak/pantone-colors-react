import { Paper } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { API_URL, ROWS_PER_PAGE } from '../constants/constants';
import { EnteredProductId, Product } from '../types/types';
import ProductsTable from './ProductsTable';
import SearchField from './SearchField';

const ProductsPage = () => {
	const [productsList, setProductsList] = useState<Product[] | undefined>(undefined);
	const [productsCount, setProductsCount] = useState(0);
	const [page, setPage] = useState(0);
	const [productId, setProductId] = useState<EnteredProductId>(null);

	const effectRan = useRef(false);

	useEffect(() => {
		if (effectRan.current) {
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
		}
		return () => {
			effectRan.current = true;
		};
	}, [page, productId]);

	return (
		<Paper elevation={3} sx={{ padding: '2rem', backgroundColor: 'rgba(205, 205, 205, 0.5)' }}>
			<SearchField setProductId={setProductId} />
			<ProductsTable
				products={productsList}
				productsCount={productsCount}
				page={page}
				setPage={setPage}
			/>
		</Paper>
	);
};

export default ProductsPage;
