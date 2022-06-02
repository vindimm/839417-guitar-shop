import { render, screen } from '@testing-library/react';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Footer from './footer';

const customHistory = createMemoryHistory();

describe('Component: Footer', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={customHistory}>
        <Footer />
      </HistoryRouter>,
    );

    expect(screen.getByText('О нас')).toBeInTheDocument();
    expect(screen.getByText('Информация')).toBeInTheDocument();
    expect(screen.getByText('Контакты')).toBeInTheDocument();
  });
});
