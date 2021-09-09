import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { render, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
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

let server = setupServer(...dataHandlers);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('<Detail />', () => {
  test('display jobs open by day title correctly on init', async () => {
    customRender(<Detail />, { detailInitialState });
    expect(screen.getByText('LOADING')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Jobservatory')).toBeInTheDocument();
    });
  });

  test('display loading icon on init', async () => {
    customRender(<Detail />, { detailInitialState });
    expect(screen.getByText('LOADING')).toBeInTheDocument();
  });

  test('return error if fetch fails', async () => {
    server.use(
      rest.get('http://localhost:5000/api/v1/technologies', (req, res, ctx) => {
        return res(ctx.status(500));
      }),
    );
    customRender(<Detail />, { detailInitialState });
    expect(screen.getByText('LOADING')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Error: Server error')).toBeInTheDocument();
    });
  });
});
