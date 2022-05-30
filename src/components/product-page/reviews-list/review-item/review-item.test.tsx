import { render, screen } from '@testing-library/react';

import ReviewItem from './review-item';

const mockReview = {
  id: 'reviewID',
  userName: 'userName',
  advantage: 'advantage',
  disadvantage: 'disadvantage',
  comment: 'text comment text',
  rating: 4,
  createAt: 'date of creating',
  guitarId: 2,
};

describe('Component: ReviewsList', () => {
  it('should render correctly', () => {
    render(<ReviewItem review={mockReview} />);

    expect(screen.getByText(mockReview.userName)).toBeInTheDocument();
    expect(screen.getByText(mockReview.userName)).toBeInTheDocument();
  });
});
