import { Provider } from 'react-redux';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'react-router-dom/node_modules/history';

import { makeFakeGuitars } from '../../../utils/mocks';
import Pagination from './pagination';

const mockGuitars = makeFakeGuitars(27);
const mockStore = configureMockStore();

describe('Component: Pagination', () => {
  it('should render buttons [1, 2, 3, Далее] and NOT render [Назад]', () => {
    const pageNumber = 1;
    const customHistory = createMemoryHistory();

    render(
      <HistoryRouter history={customHistory}>
        <Provider store={mockStore({
          CATALOG_DATA: {
            guitars: mockGuitars,
          },
        })}
        >
          <Pagination pageNumber={pageNumber}/>,
        </Provider>,
      </HistoryRouter>,
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('Далее')).toBeInTheDocument();
    expect(screen.queryByText('Назад')).not.toBeInTheDocument();
  });

  it('should render buttons [Назад, 1, 2, 3] and NOT render [Далее]', () => {
    const pageNumber = 3;
    const customHistory = createMemoryHistory();

    render(
      <HistoryRouter history={customHistory}>
        <Provider store={mockStore({
          CATALOG_DATA: {
            guitars: mockGuitars,
          },
        })}
        >
          <Pagination pageNumber={pageNumber}/>,
        </Provider>,
      </HistoryRouter>,
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.queryByText('Далее')).not.toBeInTheDocument();
    expect(screen.getByText('Назад')).toBeInTheDocument();
  });

  it('should render buttons [Назад, 1, 2, 3, Далее]', () => {
    const pageNumber = 2;
    const customHistory = createMemoryHistory();

    render(
      <HistoryRouter history={customHistory}>
        <Provider store={mockStore({
          CATALOG_DATA: {
            guitars: mockGuitars,
          },
        })}
        >
          <Pagination pageNumber={pageNumber}/>,
        </Provider>,
      </HistoryRouter>,
    );

    expect(screen.getByText('Назад')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('Далее')).toBeInTheDocument();
  });
});
