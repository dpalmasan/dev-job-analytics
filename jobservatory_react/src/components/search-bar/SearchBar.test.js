import { SearchBar } from './SearchBar';
import { render, fireEvent } from '@testing-library/react';

describe('<SearchBar />', () => {
  test('check the input is changing correctly and trigger the correct search on ENTER key press', () => {
    const mockHandler = jest.fn();
    const searchComponent = render(<SearchBar fetchTechByName={mockHandler} />);
    const inputComponent = searchComponent.getByPlaceholderText(
      'Add technologies: React, Ruby ...',
    );
    fireEvent.change(inputComponent, { target: { value: 'Java' } });
    const inputGroup = searchComponent.getByTestId('input-searchbar-group');
    fireEvent.keyPress(inputGroup, { key: 'Enter', keyCode: 13 });
    expect(mockHandler).toHaveBeenCalled();
  });

  test('check that the input is changing correctly and not trigger search if the button pressed is not ENTER', () => {
    const mockHandler = jest.fn();
    const searchComponent = render(<SearchBar fetchTechByName={mockHandler} />);
    const inputComponent = searchComponent.getByPlaceholderText(
      'Add technologies: React, Ruby ...',
    );
    fireEvent.change(inputComponent, { target: { value: 'Java' } });
    const inputGroup = searchComponent.getByTestId('input-searchbar-group');
    fireEvent.keyPress(inputGroup, { key: 'f4', keyCode: 115 });
    expect(mockHandler).not.toHaveBeenCalled();
  });
});
