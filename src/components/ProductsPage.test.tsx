/* eslint-disable camelcase */
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { API_URL } from '../constants/constants';
import { createServer } from '../test/server';
import ProductsPage from './ProductsPage';

function renderComponent() {
	render(
		<MemoryRouter>
			<ProductsPage />,
		</MemoryRouter>,
	);
}

describe('ProductsPage component', () => {
	describe('on data fetch', () => {
		createServer([
			{
				path: API_URL,
				res: {
					page: 1,
					per_page: 5,
					total: 12,
					total_pages: 3,
					data: [
						{
							id: 4,
							name: 'aqua sky',
							year: 2003,
							color: '#7BC4C4',
							pantone_value: '14-4811',
						},
						{
							id: 5,
							name: 'tigerlily',
							year: 2004,
							color: '#E2583E',
							pantone_value: '17-1456',
						},
					],
				},
			},
		]);

		it('displays the data in the ProductsTable', async () => {
			renderComponent();

			const tableCell = await screen.findByRole('cell', {
				name: /tigerlily/i,
			});
			expect(tableCell).toBeInTheDocument();
		});

		it('displays the CircularProgress until the data arrives', async () => {
			renderComponent();

			const progressbar = await screen.findByRole('progressbar');
			expect(progressbar).toBeInTheDocument();

			const tableCell = await screen.findByRole('cell', {
				name: /tigerlily/i,
			});
			expect(tableCell).toBeInTheDocument();
			expect(progressbar).not.toBeInTheDocument();
		});

		it('displays the SearchField component with a search input', async () => {
			renderComponent();

			await screen.findByRole('cell', {
				name: /tigerlily/i,
			});

			const searchInput = screen.getByRole('spinbutton', {
				name: 'Search',
			});
			expect(searchInput).toBeInTheDocument();
		});

		it('does not display the Alert', async () => {
			renderComponent();

			await screen.findByRole('cell', {
				name: /tigerlily/i,
			});

			const alert = screen.queryByText(/could not fetch the data/i);
			expect(alert).not.toBeInTheDocument();
		});

		it('does not initialy render a go home button', async () => {
			renderComponent();

			await screen.findByRole('cell', {
				name: /tigerlily/i,
			});

			const goHomeButton = screen.queryByRole('button', {
				name: /go home/i,
			});
			expect(goHomeButton).not.toBeInTheDocument();
		});
	});

	describe('on data fetch error', () => {
		createServer([
			{
				path: API_URL,
				status: 403,
				res: {
					errorMessage: 'Not found',
				},
			},
		]);

		it('displays the Alert', async () => {
			renderComponent();

			const alert = await screen.findByText(/could not fetch the data/i);
			expect(alert).toBeInTheDocument();
		});

		it('does not display data in the ProductsTable', async () => {
			renderComponent();

			await screen.findByText(/could not fetch the data/i);

			const tableCell = screen.queryByRole('cell', {
				name: /tigerlily/i,
			});
			expect(tableCell).not.toBeInTheDocument();
		});

		it('does not display the ProductsTable', async () => {
			renderComponent();

			await screen.findByText(/could not fetch the data/i);

			const table = screen.queryByRole('table');
			expect(table).not.toBeInTheDocument();
		});

		it('does not display the CircularProgress ', async () => {
			renderComponent();

			await screen.findByText(/could not fetch the data/i);

			const progressbar = screen.queryByRole('progressbar');
			expect(progressbar).not.toBeInTheDocument();
		});

		it('displays the SearchField component with a search input', async () => {
			renderComponent();

			await screen.findByText(/could not fetch the data/i);

			const searchInput = screen.getByRole('spinbutton', {
				name: 'Search',
			});
			expect(searchInput).toBeInTheDocument();
		});
	});

	describe('on single item fetch', () => {
		createServer([
			{
				path: API_URL,
				res: {
					page: 1,
					per_page: 5,
					total: 12,
					total_pages: 3,
					data: [
						{
							id: 5,
							name: 'tigerlily',
							year: 2004,
							color: '#E2583E',
							pantone_value: '17-1456',
						},
					],
				},
			},
		]);

		it('displays the go home button', async () => {
			renderComponent();

			const goHomeButton = await screen.findByRole('button', {
				name: /go home/i,
			});
			expect(goHomeButton).toBeInTheDocument();

			await screen.findByRole('cell', {
				name: /tigerlily/i,
			});
		});

		it('displays the data in the ProductsTable', async () => {
			renderComponent();

			const tableCell = await screen.findByRole('cell', {
				name: /tigerlily/i,
			});
			expect(tableCell).toBeInTheDocument();
		});
	});
});
