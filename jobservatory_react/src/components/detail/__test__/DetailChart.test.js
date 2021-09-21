import { DetailChart } from '../DetailChart';
import {
  render,
  fireEvent,
  prettyDOM,
  screen,
  waitFor,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';

describe('<DetailChart />', () => {
  let container = null;
  beforeEach(() => {
    // configurar un elemento del DOM como objetivo del renderizado
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  test("Show loading if the chart don't have data to show", () => {
    render(<DetailChart jobsOpenByDate={[]} loading={true} />);
    expect(screen.queryByTestId('LOADING')).toBeTruthy();
  });

  test('Show chart if exists data to show', async () => {
    const jobsOpenByDate = [
      {
        color: 'hsl(207, 70%, 50%)',
        data: [{ x: '8/8/2021', y: 514836 }],
        id: 'Java',
      },
    ];
    const detailChart = render(
      <DetailChart jobsOpenByDate={jobsOpenByDate} loading={false} />,
    );
    await waitFor(() => {
      expect(detailChart.queryByTestId('chart-id-detail-chart')).toBeTruthy();
    });
  });
});
