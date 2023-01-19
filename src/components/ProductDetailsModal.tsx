import { Box, Modal, Typography } from '@mui/material';
import { Product } from '../types/types';
import CopyToClipboardButton from './CopyToClipboardButton';

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
		borderRadius: 1,
		boxShadow: 24,
		p: 4,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	};

	return (
		<Modal
			open={open}
			onClose={onClose}
			aria-labelledby='modal-modal-title'
			aria-describedby='modal-modal-description'
		>
			<Box sx={styleModal}>
				<Box
					className='pantone-card'
					sx={{
						height: '226px',
						minWidth: '140px',
						maxWidth: '140px',
						display: 'flex',
						flexDirection: 'column',
						boxShadow:
							'5px 5px 5px 0px rgba(0,0,0,0.1), 0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%);',
					}}
				>
					<Box
						className='pantone-card__color'
						sx={{
							background: product.color,
							flex: 1,
							margin: '5px',
						}}
					></Box>
					<Box
						className='pantone-card__text'
						sx={{
							padding: '5px 0 1px 10px',
							// display: 'flex',
						}}
					>
						<Box
							className='text--main'
							sx={{
								fontFamily: 'Lato',
								fontWeight: 700,
								display: 'flex',
							}}
						>
							PANTONE
							<Typography component={'span'} sx={{ fontSize: '10px' }}>
								&reg;
							</Typography>
						</Box>
						<Typography
							className='text--sub'
							sx={{
								fontFamily: 'Lato',
								fontWeight: 700,
								fontSize: '14px',
							}}
						>
							{product.pantone_value}
						</Typography>
						<Typography
							className='text--sub'
							sx={{
								fontFamily: 'Lato',
								fontWeight: 700,
								fontSize: '14px',
								textTransform: 'capitalize',
							}}
						>
							{product.name}
						</Typography>
					</Box>
				</Box>

				<Typography id='modal-modal-description' sx={{ mt: 2 }}>
					Color of the Year: {product.year}
				</Typography>
				<Box id='modal-modal-description' sx={{ mt: 2 }}>
					{product.color}
					<CopyToClipboardButton text={product.color} />
				</Box>
			</Box>
		</Modal>
	);
};

export default ProductDetailsModal;
