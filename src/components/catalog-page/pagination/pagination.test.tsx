import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';

import Pagination from './pagination';

const pageNumber = 3;
const mockStore = configureMockStore();

describe('Component: Pagination', () => {
  it('should render correctly', () => {

    render(
      <Provider store={mockStore({})}>
        <Pagination pageNumber={pageNumber}/>,
      </Provider>,
    );

    const nextButtonElement = screen.getByText('Далее');
    expect(nextButtonElement).toBeInTheDocument();
  });
});
