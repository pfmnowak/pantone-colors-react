import { createTheme } from '@mui/material';

export default createTheme({
	components: {
		MuiCssBaseline: {
			styleOverrides: `
			::selection {
				background-color: black;
				color: white;
			  }
			`,
		},
		MuiTextField: {
			styleOverrides: {
				root: {
					maxWidth: '20rem',
					'& .MuiInputBase-root': {
						color: 'white',
					},
					'& label': {
						color: 'white',
						'&.Mui-focused': {
							color: 'green',
						},
					},
					'& .MuiOutlinedInput-root': {
						'& fieldset': {
							borderColor: 'white',
						},
						'&:hover fieldset': {
							borderColor: 'white',
						},
						'&.Mui-focused fieldset': {
							borderColor: 'green',
						},
					},
				},
			},
		},
		MuiTablePagination: {
			styleOverrides: {
				root: {
					color: '#fff',
				},
				actions: {
					'& .MuiIconButton-root.Mui-disabled': {
						color: 'rgba(255, 255, 255, 0.26)',
					},
				},
			},
		},
		MuiTableCell: {
			styleOverrides: {
				root: {
					fontWeight: 600,
					border: 'none',
				},
			},
		},
		MuiTableHead: {
			styleOverrides: {
				root: {
					'& .MuiTableCell-root': {
						color: '#fff',
					},
				},
			},
		},
		MuiTableBody: {
			styleOverrides: {
				root: {
					'& .MuiTableCell-root': {
						fontSize: '1.3rem',
						borderBottom: '0.7rem solid transparent',
					},
				},
			},
		},
	},
});
