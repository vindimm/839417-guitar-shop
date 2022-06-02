import { render, screen } from '@testing-library/react';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Header from './header';

const customHistory = createMemoryHistory();

describe('Component: Header', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={customHistory}>
        <Header />
      </HistoryRouter>,
    );

    expect(screen.getByText('Каталог')).toBeInTheDocument();
    expect(screen.getByText('О компании')).toBeInTheDocument();
  });
});
