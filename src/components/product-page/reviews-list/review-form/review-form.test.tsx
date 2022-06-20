import { Provider } from 'react-redux';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'react-router-dom/node_modules/history';

import { makeFakeReviewsByGuitar, makeFakeGuitars } from '../../../../utils/mocks';
import ReviewForm from './review-form';

const mockStore = configureMockStore();

const id = 2;
const mockReviewsByGuitar = makeFakeReviewsByGuitar(Number(id));
const mockGuitars = makeFakeGuitars(5);

const customHistory = createMemoryHistory();
const handleClick = jest.fn();

describe('Component: ReviewForm', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={customHistory}>
        <Provider store={mockStore({
          CATALOG_DATA: {
            guitars: mockGuitars,
            reviewsByGuitar: mockReviewsByGuitar,
          },
        })}
        >
          <ReviewForm handleCloseReviewModal={handleClick} handleOpenSuccessModal={handleClick} />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByText('Оставить отзыв')).toBeInTheDocument();
  });
});
