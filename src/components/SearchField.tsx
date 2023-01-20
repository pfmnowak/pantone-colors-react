import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, Paper, TextField, Tooltip } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { useEffect, useRef, useState } from 'react';
import { EnteredProductId } from '../types/types';

type SearchFieldProps = {
	setProductId: (productId: EnteredProductId) => void;
};

const SearchField = ({ setProductId }: SearchFieldProps) => {
	const [searchValue, setSearchValue] = useState<string>('');
	const textInput = useRef<HTMLInputElement>(null);
	const effectRan = useRef(false);

	useEffect(() => {
		if (effectRan.current) {
			const delayFn = setTimeout(() => handleInputChange(searchValue), 500);
			return () => clearTimeout(delayFn);
		}
		return () => {
			effectRan.current = true;
		};
	}, [searchValue]);

	const handleInputChange = (inputValue: string) => {
		const inputValueNum = +inputValue;
		if (Number.isInteger(inputValueNum) && inputValueNum > 0) {
			setProductId(inputValue);
		} else if (inputValue === '') {
			setProductId(null);
		}
	};

	const handleClearBtnClick = () => {
		setSearchValue('');
		textInput.current && textInput.current.focus();
	};

	return (
		<Paper sx={{ mb: 3, backgroundColor: 'rgba(0, 0, 0, 0.8)', p: 2 }}>
			<TextField
				InputProps={{
					startAdornment: (
						<InputAdornment position='start'>
							{searchValue ? (
								<Tooltip title='Clear search input'>
									<IconButton onClick={handleClearBtnClick}>
										<ClearIcon color='error' />
									</IconButton>
								</Tooltip>
							) : (
								<SearchIcon sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
							)}
						</InputAdornment>
					),
				}}
				id='outlined-number'
				label='Search'
				type='number'
				value={searchValue}
				onChange={event => setSearchValue(event.target.value)}
				InputLabelProps={{ shrink: true }}
				inputRef={textInput}
				placeholder='Search ID'
				fullWidth
			/>
		</Paper>
	);
};

export default SearchField;
