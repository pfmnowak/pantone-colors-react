import axios from 'axios';
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
				const { data } = await axios.get(url);
				setLoading(false);
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
