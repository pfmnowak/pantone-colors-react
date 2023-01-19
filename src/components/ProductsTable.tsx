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
} from '@mui/material';
import { useState } from 'react';
import { ROWS_PER_PAGE, ROW_HEIGHT } from '../constants/constants';
import { Product } from '../types/types';
import ProductDetailsModal from './ProductDetailsModal';

type ProductsTableProps = {
	products: Product[] | undefined;
	productsCount: number;
	page: number;
	setPage: (page: number) => void;
};

const ProductsTable = ({ products, productsCount, page, setPage }: ProductsTableProps) => {
	const [modalOpen, setModalOpen] = useState(false);
	const [product, setProduct] = useState<Product | undefined>(undefined);

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows = page > 0 ? Math.max(0, (1 + page) * ROWS_PER_PAGE - productsCount) : 0;

	const handleModalOpen = (product: Product) => {
		setModalOpen(true);
		setProduct(product);
	};

	const handleModalClose = () => setModalOpen(false);

	const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
		setPage(newPage);
	};

	return (
		<div>
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
		</div>
	);
};

export default ProductsTable;
