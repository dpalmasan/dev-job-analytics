import { SearchBar } from './SearchBar';
import {
  render,
  fireEvent,
  prettyDOM,
  screen,
  waitFor,
  within,
  // assign value to input field
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
import { debug } from 'console';

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
    const detailComponent = customRender(<Detail />, { detailInitialState });
    expect(screen.queryAllByTestId('LOADING')).toHaveLength(3);
    await waitFor(() => {
      expect(screen.getByText('Jobservatory')).toBeInTheDocument();
    });
    const autocomplete = detailComponent.getByTestId('combo-box-search-bar');

    const input = detailComponent.container.querySelector('#plopID');
    fireEvent.change(input, { target: { value: 'React.js' } });

    expect(input.value).toBe('React.js');

    // autocomplete.focus();
    // fireEvent.change(inputGroup, { inputProps: { value: 'React.js' } });
    // // fireEvent.change(inputGroup, { target: { value: 'React.js' } });
    // // fireEvent.change(inputGroup, { target: { value: 'React.js' } });

    // // fireEvent.keyDown(autocomplete, { key: 'ArrowDown' });

    fireEvent.keyPress(autocomplete, { key: 'Enter', keyCode: 13 });

    // expect(detailComponent.queryAllByTestId('LOADING')).toHaveLength(3);
    // await waitFor(() => {
    //   expect(detailComponent.getByText('Jobservatory')).toBeInTheDocument();
    // });
  });

  test('return error if fetch on fetchTechnologyByNameData fails', async () => {
    const searchValue = 'Java';
    server.use(
      rest.get(
        `http://localhost:5000/api/v1/technologies/${searchValue}`,
        (req, res, ctx) => {
          return res(ctx.status(500));
        },
      ),
    );
    // customRender(<Detail />, { detailInitialState });
    // expect(screen.queryAllByTestId('LOADING')).toHaveLength(3);
    // await waitFor(() => {
    //   expect(screen.getByText('Jobservatory')).toBeInTheDocument();
    // });
    const mockHandler = jest.fn();
    const searchComponent = render(
      <SearchBar
        fetchTechByName={mockHandler}
        searchValue={{ value: 'Java', title: 'Java' }}
      />,
    );
    const inputComponent = searchComponent.getByTestId('input-searchbar-group');
    fireEvent.keyPress(inputComponent, { key: 'Enter', keyCode: 13 });
    expect(mockHandler).toHaveBeenCalled();

    // const comboComponent = screen.getByTestId('combo-box-search-bar');
    // const inputContainer = within(comboComponent).getByTestId(
    //   'input-searchbar-group',
    // );
    // const input = inputContainer.querySelector('textfield-searchbar');
    // console.log(prettyDOM(input));

    // comboComponent.focus();
    // const inputGroup = screen.getByTestId('input-searchbar-group');
    // fireEvent.change(inputGroup, { target: { inputValue: 'React.js' } });
    // fireEvent.keyPress(inputGroup, { key: 'Enter', keyCode: 13 });
  });

  test('check that the input is changing correctly and not trigger search if the button pressed is NOT ENTER', () => {
    const mockHandler = jest.fn();
    const searchComponent = render(<SearchBar fetchTechByName={mockHandler} />);
    const inputComponent = searchComponent.getByTestId('input-searchbar-group');
    fireEvent.change(inputComponent, { target: { inputValue: 'Java' } });
    fireEvent.keyPress(inputComponent, { key: 'f4', keyCode: 115 });
    expect(mockHandler).not.toHaveBeenCalled();
  });
});
