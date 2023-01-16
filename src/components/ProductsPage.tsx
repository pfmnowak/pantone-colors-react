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

const ProductsPage = () => {
	const [productsList, setProductsList] = useState<Product[] | undefined>(undefined);
	const [productsCount, setProductsCount] = useState(0);
	const [page, setPage] = useState(0);
	const effectRan = useRef(false);

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
			<TableContainer component={Paper}>
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
									'&:last-child td, &:last-child th': { border: 0 },
								}}
							>
								<TableCell component='th' scope='row'>
									{item.id}
								</TableCell>
								<TableCell>{item.name}</TableCell>
								<TableCell align='center'>{item.year}</TableCell>
							</TableRow>
						))}
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
