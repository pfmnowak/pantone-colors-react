import { fireEvent, screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SearchField from './SearchField';

const renderComponent = () => {
	render(
		<BrowserRouter>
			<SearchField />
		</BrowserRouter>,
	);
};

describe('SearchField component', () => {
	it('renders a search input', () => {
		renderComponent();

		const searchInput = screen.getByRole('spinbutton', {
			name: 'Search',
		});
		expect(searchInput).toBeInTheDocument();
	});

	it('renders an empty search input', () => {
		renderComponent();

		const searchInput = screen.getByLabelText('Search');
		expect(searchInput.nodeValue).toBeNull();
	});

	it('does not initialy render a clear input button', () => {
		renderComponent();

		const clearButton = screen.queryByLabelText('clear the input');
		expect(clearButton).not.toBeInTheDocument();
	});

	it('renders a clear input button on input change', () => {
		renderComponent();

		const searchInput = screen.getByLabelText('Search');
		const testValue = '7';
		fireEvent.change(searchInput, { target: { value: testValue } });
		const clearButton = screen.queryByLabelText('clear the input');
		expect(clearButton).toBeInTheDocument();
	});

	it('allows entering a text', () => {
		renderComponent();

		const searchInput = screen.getByLabelText('Search') as HTMLInputElement;
		const testValue = '7';
		fireEvent.change(searchInput, { target: { value: testValue } });
		expect(searchInput.value).toBe(testValue);
	});

	it('clears the search input on clearButton click', () => {
		renderComponent();

		const searchInput = screen.getByLabelText('Search') as HTMLInputElement;
		const testValue = '7';
		fireEvent.change(searchInput, { target: { value: testValue } });
		const clearButton = screen.queryByLabelText('clear the input') as HTMLButtonElement;
		fireEvent.click(clearButton);
		expect(searchInput.value).toBe('');
	});
});
