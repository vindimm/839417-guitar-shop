import { render, screen } from '@testing-library/react';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import NotFoundPage from './not-found-page';

describe('Component: NotFoundPage', () => {
  it('should render correctly', () => {
    const customHistory = createMemoryHistory();

    render(
      <HistoryRouter history={customHistory}>
        <NotFoundPage />
      </HistoryRouter>,
    );

    const linkElement = screen.getByText('Вернуться на главную');
    const headerElement = screen.getByText('404. Not Found');

    expect(headerElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});
