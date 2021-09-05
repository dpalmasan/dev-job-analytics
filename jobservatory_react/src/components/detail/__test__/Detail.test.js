import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { render, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
// Replace this with the appropriate imports for your project
import {
  detailReducer,
  initialState as detailInitialState,
} from '../../../features/detail/reducer';
import { dataHandlers } from '../../../mocks/dataMock';
import { Detail } from '../Detail';

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

const server = setupServer(...dataHandlers);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('<Detail />', () => {
  test('display jobs open by day title correctly correctly', () => {
    // const detailComponent = customRender(<Detail />, { detailInitialState });
    // const result = detailComponent.getByText('Jobs open by day');
    // expect(result).toBeInTheDocument();
  });

  test('display loading icon on init', async () => {
    customRender(<Detail />, { detailInitialState });
    expect(screen.getByText('LOADING')).toBeInTheDocument();

    await act(async () => customRender(<Detail />, { detailInitialState }));
    await waitFor(() => {
      expect(screen.getByText('Jobservatory')).toBeInTheDocument();
    });
  });
});
