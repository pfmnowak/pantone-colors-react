import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableFooter,
	TableHead,
	TablePagination,
	TableRow,
	TextField,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Product } from '../types/types';
import ProductDetailsModal from './ProductDetailsModal';

const ROWS_PER_PAGE = 5;
const ROW_HEIGHT = 6;

const ProductsPage = () => {
	const [productsList, setProductsList] = useState<Product[] | undefined>(undefined);
	const [productsCount, setProductsCount] = useState(0);
	const [page, setPage] = useState(0);
	const [productId, setProductId] = useState<string | null>(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [product, setProduct] = useState<Product | undefined>(undefined);
	const effectRan = useRef(false);

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows = page > 0 ? Math.max(0, (1 + page) * ROWS_PER_PAGE - productsCount) : 0;

	useEffect(() => {
		if (effectRan.current) {
			const getData = async () => {
				const url = productId
					? `https://reqres.in/api/products?id=${productId}`
					: `https://reqres.in/api/products?page=${page + 1}&per_page=${ROWS_PER_PAGE}`;

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

	const handleModalOpen = (product: Product) => {
		setModalOpen(true);
		setProduct(product);
	};

	const handleModalClose = () => setModalOpen(false);

	const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
		setPage(newPage);
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = event.target.value;
		const inputValueNum = +inputValue;
		if (Number.isInteger(inputValueNum) && inputValueNum > 0) {
			setProductId(inputValue);
		} else if (inputValue === '') {
			setProductId(null);
		}
	};

	return (
		<Paper elevation={3} sx={{ padding: '2rem', backgroundColor: 'rgba(205, 205, 205, 0.5)' }}>
			<TextField
				id='outlined-number'
				label='Search id'
				type='number'
				// value={productId}
				onChange={handleInputChange}
			/>
			<TableContainer
				component={Paper}
				sx={{ padding: '2rem', backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
			>
				<Table sx={{ width: '70vw', maxWidth: '50rem' }} aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell>ID</TableCell>
							<TableCell>Name</TableCell>
							<TableCell align='center'>Year</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{productsList?.map(item => (
							<TableRow
								key={item.id}
								onClick={() => handleModalOpen(item)}
								sx={{
									backgroundColor: `${item.color}`,
									height: `${ROW_HEIGHT}rem`,
									transition: 'all 0.2s',
									opacity: 0.8,
									'&:hover': {
										opacity: 0.99,
										cursor: 'pointer',
										height: `${ROW_HEIGHT + 0.7}rem`,
									},
								}}
							>
								<TableCell component='th' scope='row'>
									{item.id}
								</TableCell>
								<TableCell sx={{ textTransform: 'capitalize' }}>{item.name}</TableCell>
								<TableCell align='center'>{item.year}</TableCell>
							</TableRow>
						))}
						{emptyRows > 0 && (
							<TableRow sx={{ height: `${ROW_HEIGHT * emptyRows}rem` }}>
								<TableCell colSpan={3} />
							</TableRow>
						)}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TablePagination
								labelRowsPerPage=''
								rowsPerPageOptions={[ROWS_PER_PAGE]}
								rowsPerPage={ROWS_PER_PAGE}
								count={productsCount}
								page={page}
								onPageChange={handlePageChange}
							/>
						</TableRow>
					</TableFooter>
				</Table>
			</TableContainer>
			{modalOpen && product && (
				<ProductDetailsModal open={modalOpen} onClose={handleModalClose} product={product} />
			)}
		</Paper>
	);
};

export default ProductsPage;
