import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'react-router-dom/node_modules/history';

import { makeFakeGuitar } from '../../../utils/mocks';
import ProductTabs from './product-tabs';

const mockGuitar = makeFakeGuitar();
const customHistory = createMemoryHistory();

describe('Component: ProductTabs', () => {
  it('should render tab "Характеристики"', () => {
    render(
      <HistoryRouter history={customHistory}>
        <ProductTabs guitar={mockGuitar} />
      </HistoryRouter>,
    );

    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('should render tab "Описание" after click', () => {
    render(
      <HistoryRouter history={customHistory}>
        <ProductTabs guitar={mockGuitar} />
      </HistoryRouter>,
    );

    fireEvent.click(screen.getByText('Описание'));
    expect(screen.getByTestId('tabs__product-description')).toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  it('should render tab "Характеристики" after click', () => {
    render(
      <HistoryRouter history={customHistory}>
        <ProductTabs guitar={mockGuitar} />
      </HistoryRouter>,
    );

    fireEvent.click(screen.getByText('Характеристики'));
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.queryByTestId('tabs__product-description')).not.toBeInTheDocument();
  });
});
