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
  test('display elements in the main screen if exists data when component init', async () => {
    customRender(<Detail />, { detailInitialState });
    expect(screen.queryAllByTestId('LOADING')).toHaveLength(3);
    await waitFor(() => {
      expect(screen.getByText('Jobservatory')).toBeInTheDocument();
      expect(screen.getByText('Jobs open by day')).toBeInTheDocument();
      expect(screen.getByText('Jobs open by country')).toBeInTheDocument();
      expect(screen.getByText('StackOverFlow activity')).toBeInTheDocument();
      expect(screen.getByTestId('logo-id')).toBeInTheDocument();
      expect(screen.getByTestId('date-select-id')).toBeInTheDocument();
      expect(screen.getByTestId('input-searchbar-group')).toBeInTheDocument();
      expect(
        screen.getByTestId('detail-chart-tag-container-id'),
      ).toBeInTheDocument();
      expect(
        screen.getByTestId('detail-chart-country-container-id'),
      ).toBeInTheDocument();
      expect(
        screen.getByTestId('detail-chart-container-id'),
      ).toBeInTheDocument();
      expect(
        screen.getByTestId('questions-chart-container-id'),
      ).toBeInTheDocument();
    });
  });

  test('hide all elements if fetch fails on init', async () => {
    server.use(
      rest.get('http://localhost:5000/api/v1/technologies', (req, res, ctx) => {
        return res(ctx.status(500));
      }),
    );
    customRender(<Detail />, { detailInitialState });
    expect(screen.queryAllByTestId('LOADING')).toHaveLength(3);
    await waitFor(() => {
      expect(screen.getByText('Error: Server error')).toBeInTheDocument();
      expect(screen.queryByText('Jobservatory')).not.toBeInTheDocument();
      expect(screen.queryByText('Jobs open by day')).not.toBeInTheDocument();
      expect(
        screen.queryByText('Jobs open by country'),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText('StackOverFlow activity'),
      ).not.toBeInTheDocument();
      expect(screen.queryByTestId('logo-id')).not.toBeTruthy();
      expect(screen.queryByTestId('date-select-id')).not.toBeTruthy();
      expect(screen.queryByTestId('input-searchbar-group')).not.toBeTruthy();
      expect(
        screen.queryByTestId('detail-chart-tag-container-id'),
      ).not.toBeTruthy();
      expect(
        screen.queryByTestId('detail-chart-country-container-id'),
      ).not.toBeTruthy();
      expect(
        screen.queryByTestId('questions-chart-container-id'),
      ).not.toBeTruthy();
    });
  });

  test('display loading icon on init', async () => {
    customRender(<Detail />, { detailInitialState });
    expect(screen.queryAllByTestId('LOADING')).toHaveLength(3);
  });

  test('return error if fetch fails', async () => {
    server.use(
      rest.get('http://localhost:5000/api/v1/technologies', (req, res, ctx) => {
        return res(ctx.status(500));
      }),
    );
    customRender(<Detail />, { detailInitialState });
    expect(screen.queryAllByTestId('LOADING')).toHaveLength(3);
    await waitFor(() => {
      expect(screen.getByText('Error: Server error')).toBeInTheDocument();
    });
  });
});
