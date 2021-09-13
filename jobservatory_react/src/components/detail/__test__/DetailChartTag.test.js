import { DetailChartTag } from '../DetailChartTag';
import { Detail } from '../Detail';
import {
  render,
  fireEvent,
  prettyDOM,
  screen,
  waitFor,
} from '@testing-library/react';
import { rest } from 'msw';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { setupServer } from 'msw/node';
import {
  detailReducer,
  initialState as detailInitialState,
} from '../../../features/detail/reducer';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { dataHandlers } from '../../../mocks/dataMock';

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

describe('<DetailChartTag />', () => {
  test("Don't show tags only if data is empty", () => {
    render(<DetailChartTag jobsOpenByDate={[]} loading={true} />);
    expect(screen.queryByTestId('tags-pills')).not.toBeTruthy();
  });

  test('Show tags if data exists', () => {
    const jobsOpenByDate = [
      {
        color: 'hsl(207, 70%, 50%)',
        data: [{ x: '8/8/2021', y: 514836 }],
        id: 'Java',
      },
    ];
    render(<DetailChartTag jobsOpenByDate={jobsOpenByDate} loading={false} />);
    expect(screen.queryByTestId('tags-pills')).toBeTruthy();
  });

  test('Should the X icon inside the tag remove one element', async () => {
    customRender(<Detail />, { detailInitialState });
    expect(screen.getByText('LOADING')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId('tag-close-button-Java')).toBeInTheDocument();
    });
    const tagButtonComponent = screen.getByTestId('tag-close-button-Java');
    fireEvent.click(tagButtonComponent);
    await waitFor(() => {
      expect(screen.queryByTestId('tag-close-button-Java')).not.toBeTruthy();
    });
  });
});
