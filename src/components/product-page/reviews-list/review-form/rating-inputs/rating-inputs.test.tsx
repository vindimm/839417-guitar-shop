import { render, screen } from '@testing-library/react';

import RatingInputs from './rating-inputs';

const handleClick = jest.fn();

describe('Component: RatingInputs', () => {
  it('should be checked star number 5', () => {
    render(<RatingInputs onRatingChange={handleClick} maxRating={5} rating={5} />);

    expect(screen.getByTestId('star-5')).toHaveAttribute('checked');
  });

  it('should render 10 stars', () => {
    render(<RatingInputs onRatingChange={handleClick} maxRating={10} rating={0} />);

    expect(screen.getAllByRole('radio')).toHaveLength(10);
  });

  it('should not to be checked stars', () => {
    render(<RatingInputs onRatingChange={handleClick} maxRating={5} rating={0} />);

    expect(screen.queryAllByRole('radio', { checked: true })).toHaveLength(0);
  });
});
