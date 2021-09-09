import { SearchBar } from './SearchBar';
import {
  render,
  fireEvent,
  prettyDOM,
  screen,
  waitFor,
} from '@testing-library/react';
import { Detail } from './../detail/Detail';
import { Provider } from 'react-redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
  detailReducer,
  initialState as detailInitialState,
} from './../../features/detail/reducer';
import thunk from 'redux-thunk';
import { dataHandlers } from '../../mocks/dataMock';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

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

let server = setupServer(...dataHandlers);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('<SearchBar />', () => {
  test('check the input is changing correctly and trigger the correct search on ENTER key press', async () => {
    customRender(<Detail />, { detailInitialState });
    expect(screen.getByText('LOADING')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Jobservatory')).toBeInTheDocument();
    });
    const inputComponent = screen.getByPlaceholderText(
      'Add technologies: React, Ruby ...',
    );
    fireEvent.change(inputComponent, { target: { value: 'React.js' } });
    const inputGroup = screen.getByTestId('input-searchbar-group');
    fireEvent.keyPress(inputGroup, { key: 'Enter', keyCode: 13 });
    expect(screen.getByText('LOADING')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Jobservatory')).toBeInTheDocument();
    });
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
