import { useEffect, useState } from 'react';
import { Product } from './../types/types';

const useProducts = (url: string) => {
	const [productsList, setProductsList] = useState<Product[] | undefined>(undefined);
	const [productsCount, setProductsCount] = useState(0);
	const [loading, setLoading] = useState(false);
	const [hasError, setHasError] = useState(false);

	useEffect(() => {
		const getData = async () => {
			setLoading(true);
			try {
				const response = await fetch(url);
				setLoading(false);
				if (response.status === 200) {
					const data = await response.json();
					setHasError(false);
					if (data.data.constructor === Array) {
						if (data.data.length) {
							setProductsList(data.data);
							setProductsCount(data.total);
						} else {
							setHasError(true);
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
				setHasError(true);
				console.error(error);
			}
		};
		getData();
	}, [url]);

	return { productsList, productsCount, loading, hasError };
};

export default useProducts;
