import { render, screen, fireEvent } from '@testing-library/react';

import ReviewSuccessModal from './review-success-modal';

const handleClick = jest.fn();

describe('Component: ReviewSuccessModal', () => {
  it('should render correctly', () => {
    render(<ReviewSuccessModal handleCloseSuccessModal={handleClick} />);

    expect(screen.getByText('Спасибо за ваш отзыв!')).toBeInTheDocument();
  });

  it('should call cb-function when click on close button', () => {
    render(<ReviewSuccessModal handleCloseSuccessModal={handleClick} />);

    const button = screen.getByLabelText('Закрыть');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });
});
