import { TextField } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { EnteredProductId } from '../types/types';

type SearchFieldProps = {
	setProductId: (productId: EnteredProductId) => void;
};

const SearchField = ({ setProductId }: SearchFieldProps) => {
	const [searchValue, setSearchValue] = useState<string>('');
	const effectRan = useRef(false);

	useEffect(() => {
		if (effectRan.current) {
			console.log('effect raaaan | Search Field');
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

	return (
		<TextField
			id='outlined-number'
			label='Search id'
			type='number'
			value={searchValue}
			onChange={event => setSearchValue(event.target.value)}
		/>
	);
};

export default SearchField;
