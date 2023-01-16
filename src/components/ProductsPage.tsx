import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
} from '@mui/material';

import data from './../data/data.json';

const ProductsPage = () => {
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
						{data.data.map(item => (
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
				</Table>
			</TableContainer>
		</Paper>
	);
};

export default ProductsPage;
