import { Provider } from 'react-redux';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'react-router-dom/node_modules/history';

import { makeFakeReviewsByGuitar } from '../../../utils/mocks';
import ReviewsList from './reviews-list';

const mockStore = configureMockStore();

const id = 2;
const mockReviewsByGuitar = makeFakeReviewsByGuitar(Number(id));

const customHistory = createMemoryHistory();

describe('Component: ReviewsList', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={customHistory}>
        <Provider store={mockStore({ CATALOG_DATA: {reviewsByGuitar: mockReviewsByGuitar} })}>
          <ReviewsList />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByText('Отзывы')).toBeInTheDocument();
  });
});
