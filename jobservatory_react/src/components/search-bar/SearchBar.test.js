import { SearchBar } from './SearchBar';
import { render, fireEvent, prettyDOM } from '@testing-library/react';
import { Detail } from './../detail/Detail';
import { Provider } from 'react-redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
  detailReducer,
  initialState as detailInitialState,
} from './../../features/detail/reducer';
import thunk from 'redux-thunk';

const customRender = (
  ui,
  {
    initialState,
    store = configureStore({
      reducer: {
        detail: detailReducer,
      },
      middleware: [...getDefaultMiddleware(), thunk],
    }),
    ...renderOptions
  } = {},
) => {
  const Wrapper = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );
  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

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

  // test('check is render with new value main screen on ENTER call', () => {
  //   const detailComponent = customRender(<Detail />, { detailInitialState });
  //   const mockHandler = jest.fn();
  //   // const searchComponent = render(<SearchBar fetchTechByName={mockHandler} />);
  //   const inputComponent = detailComponent.getByPlaceholderText(
  //     'Add technologies: React, Ruby ...',
  //   );
  //   fireEvent.change(inputComponent, { target: { value: 'Java' } });
  //   const inputGroup = detailComponent.getByTestId('input-searchbar-group');
  //   fireEvent.keyPress(inputGroup, { key: 'Enter', keyCode: 13 });
  //   // expect(mockHandler).toHaveBeenCalled();
  //   console.log(prettyDOM(detailComponent.container));
  // });
});
