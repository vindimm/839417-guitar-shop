import { render, screen } from '@testing-library/react';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import RatingChart from './rating-chart';

const customHistory = createMemoryHistory();

describe('Component: RatingChart', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={customHistory}>
        <RatingChart rating={1} size={'small'}/>
      </HistoryRouter>,
    );

    expect(screen.getAllByTestId('rating-chart-star')).toHaveLength(5);
  });
});
