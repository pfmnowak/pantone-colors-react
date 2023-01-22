import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableFooter,
	TableHead,
	TableRow,
} from '@mui/material';
import TablePagination from '@mui/material/TablePagination/TablePagination';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROWS_PER_PAGE, ROW_HEIGHT } from '../constants/constants';
import { Product } from '../types/types';
import ProductDetailsModal from './ProductDetailsModal';

type ProductsTableProps = {
	products: Product[] | undefined;
	productsCount: number;
	page: number;
};

const ProductsTable = ({ products, productsCount, page }: ProductsTableProps) => {
	const [modalOpen, setModalOpen] = useState(false);
	const [product, setProduct] = useState<Product | undefined>(undefined);
	const navigate = useNavigate();

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows = page > 0 ? Math.max(0, (1 + page) * ROWS_PER_PAGE - productsCount) : 0;

	const handleModalOpen = (product: Product) => {
		setModalOpen(true);
		setProduct(product);
	};

	const handleModalClose = () => setModalOpen(false);

	const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
		navigate(`?page=${newPage}`);
	};

	return (
		<TableContainer>
			<Table aria-label='simple table'>
				<TableHead>
					<TableRow>
						<TableCell>ID</TableCell>
						<TableCell>Name</TableCell>
						<TableCell align='center'>Year</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{products?.map(item => (
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
							page={productsCount <= 0 ? 0 : page}
							onPageChange={handlePageChange}
						/>
					</TableRow>
				</TableFooter>
			</Table>
			{modalOpen && product && (
				<ProductDetailsModal open={modalOpen} onClose={handleModalClose} product={product} />
			)}
		</TableContainer>
	);
};

export default ProductsTable;
