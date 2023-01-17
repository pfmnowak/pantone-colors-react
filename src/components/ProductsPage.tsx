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

type Product = { id: number; name: string; year: number; color: string; pantone_value: string };

const ROWS_PER_PAGE = 5;
const ROW_HEIGHT = 6;

const ProductsPage = () => {
	const [productsList, setProductsList] = useState<Product[] | undefined>(undefined);
	const [productsCount, setProductsCount] = useState(0);
	const [page, setPage] = useState(0);
	const effectRan = useRef(false);

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows = page > 0 ? Math.max(0, (1 + page) * ROWS_PER_PAGE - productsCount) : 0;

	useEffect(() => {
		if (effectRan.current) {
			const getData = async () => {
				const url = `https://reqres.in/api/products?page=${page + 1}&per_page=${ROWS_PER_PAGE}`;
				try {
					const response = await fetch(url);
					if (response.status === 200) {
						const data = await response.json();
						setProductsList(data.data);
						setProductsCount(data.total);
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
	}, [page]);

	const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
		setPage(newPage);
	};

	return (
		<Paper elevation={3} sx={{ padding: '2rem' }}>
			<TextField id='outlined-number' label='Search id' type='number' />
			<TableContainer component={Paper} sx={{ backgroundColor: '#000' }}>
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
								sx={{
									backgroundColor: `${item.color}`,
									height: `${ROW_HEIGHT}rem`,
									transition: 'all 0.2s',
									opacity: 0.8,
									'&:hover': {
										opacity: 1,
										cursor: 'pointer',
										height: `${ROW_HEIGHT + 1}rem`,
									},
								}}
							>
								<TableCell component='th' scope='row'>
									{item.id}
								</TableCell>
								<TableCell>{item.name}</TableCell>
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
								onPageChange={handleChangePage}
							/>
						</TableRow>
					</TableFooter>
				</Table>
			</TableContainer>
		</Paper>
	);
};

export default ProductsPage;
