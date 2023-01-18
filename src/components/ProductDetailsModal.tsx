import { Box, Modal, Typography } from '@mui/material';
import { Product } from '../types/types';

type ModalProps = {
	open: boolean;
	product: Product;
	onClose: () => void;
};

const ProductDetailsModal = ({ open, onClose, product }: ModalProps) => {
	const styleModal = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 400,
		bgcolor: 'background.paper',
		border: '2px solid #000',
		boxShadow: 24,
		p: 4,
	};

	return (
		<Modal
			open={open}
			onClose={onClose}
			aria-labelledby='modal-modal-title'
			aria-describedby='modal-modal-description'
		>
			<Box sx={styleModal}>
				<Typography id='modal-modal-title' variant='h6' component='h2'>
					{product.name}
				</Typography>
				<Typography id='modal-modal-description' sx={{ mt: 2 }}>
					{product.pantone_value}
				</Typography>
				<Typography id='modal-modal-description' sx={{ mt: 2 }}>
					{product.color}
				</Typography>
				<Typography id='modal-modal-description' sx={{ mt: 2 }}>
					Year: {product.year}
				</Typography>
			</Box>
		</Modal>
	);
};

export default ProductDetailsModal;
