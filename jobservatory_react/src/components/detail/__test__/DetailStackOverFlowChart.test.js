import { DetailStackOverFlowChart } from '../DetailStackOverFlowChart';
import {
  render,
  fireEvent,
  prettyDOM,
  screen,
  waitFor,
} from '@testing-library/react';

describe('<DetailStackOverFlowChart />', () => {
  test("Show loading if the chart don't have data to show", () => {
    render(<DetailStackOverFlowChart questionsOpen={[]} loading={true} />);
    expect(screen.queryByTestId('LOADING')).toBeTruthy();
  });

  test('Show chart if exists data to show', async () => {
    const questionsOpen = [
      {
        color: 'hsl(207, 70%, 50%)',
        data: [{ x: '8/8/2021', y: 380 }],
        id: 'Java',
      },
    ];
    render(
      <DetailStackOverFlowChart
        questionsOpen={questionsOpen}
        loading={false}
      />,
    );
    await waitFor(() => {
      expect(
        screen.queryByTestId('chart-id-detail-stack-over-flow'),
      ).toBeTruthy();
    });
  });
});
