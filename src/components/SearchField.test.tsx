import { fireEvent, screen } from '@testing-library/dom';
import { cleanup, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductsPage from './ProductsPage';
import SearchField from './SearchField';

afterEach(cleanup);

describe('SearchField component', () => {
	it('renders a search input', () => {
		render(
			<BrowserRouter>
				<SearchField />
			</BrowserRouter>,
		);
		const searchInput = screen.getByLabelText('Search');
		expect(searchInput).toBeInTheDocument();
	});

	it('renders an empty search input', () => {
		render(
			<BrowserRouter>
				<SearchField />
			</BrowserRouter>,
		);
		const searchInput = screen.getByLabelText('Search');
		expect(searchInput.nodeValue).toBeNull();
	});

	it('does not initialy render a clear input button', () => {
		render(
			<BrowserRouter>
				<SearchField />
			</BrowserRouter>,
		);
		const clearButton = screen.queryByLabelText('clear the input');
		expect(clearButton).not.toBeInTheDocument();
	});

	it('renders a clear input button on input change', () => {
		render(
			<BrowserRouter>
				<SearchField />
			</BrowserRouter>,
		);
		const searchInput = screen.getByLabelText('Search');
		const testValue = '7';
		fireEvent.change(searchInput, { target: { value: testValue } });
		const clearButton = screen.queryByLabelText('clear the input');
		expect(clearButton).toBeInTheDocument();
	});

	it('does not initialy render a go home button', () => {
		render(
			<BrowserRouter>
				<SearchField />
			</BrowserRouter>,
		);
		const goHomeButton = screen.queryByLabelText('go home');
		expect(goHomeButton).not.toBeInTheDocument();
	});

	it('renders go home button on input change', () => {
		render(
			<BrowserRouter>
				<SearchField />
				<ProductsPage />
			</BrowserRouter>,
		);
		const searchInput = screen.getByLabelText('Search');
		const testValue = '7';
		fireEvent.change(searchInput, { target: { value: testValue } });
		const goHomeButton = screen.queryByLabelText('go home');
		expect(goHomeButton).toBeInTheDocument();
	});

	it('allows entering a text', () => {
		render(
			<BrowserRouter>
				<SearchField />
			</BrowserRouter>,
		);
		const searchInput = screen.getByLabelText('Search') as HTMLInputElement;
		const testValue = '7';
		fireEvent.change(searchInput, { target: { value: testValue } });
		expect(searchInput.value).toBe(testValue);
	});

	it('clears the search input on clearButton click', () => {
		render(
			<BrowserRouter>
				<SearchField />
			</BrowserRouter>,
		);
		const searchInput = screen.getByLabelText('Search') as HTMLInputElement;
		const testValue = '7';
		fireEvent.change(searchInput, { target: { value: testValue } });
		const clearButton = screen.queryByLabelText('clear the input') as HTMLButtonElement;
		fireEvent.click(clearButton);
		expect(searchInput.value).toBe('');
	});
});
