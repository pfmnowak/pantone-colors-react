import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { IconButton, Snackbar, Tooltip } from '@mui/material';
import { useState } from 'react';

type CopyToClipboardButtonProps = {
	text: string;
};

const CopyToClipboardButton = ({ text }: CopyToClipboardButtonProps) => {
	const [open, setOpen] = useState(false);
	const handleClick = () => {
		setOpen(true);
		navigator.clipboard.writeText(text);
	};

	return (
		<>
			<Tooltip title='Copy to clipboard'>
				<IconButton onClick={handleClick}>
					<ContentCopyIcon />
				</IconButton>
			</Tooltip>
			<Snackbar
				open={open}
				onClose={() => setOpen(false)}
				autoHideDuration={2000}
				message='Copied to clipboard'
			/>
		</>
	);
};

export default CopyToClipboardButton;
