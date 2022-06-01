type Review = {
  id: string,
  userName: string,
  advantage: string,
  disadvantage: string,
  comment: string,
  rating: number,
  createAt: string,
  guitarId: number
}

type Reviews = Review[];

type ReviewsByGuitar = Record<number, Reviews>;

type PostingReview = {
  userName: string,
  advantage: string,
  disadvantage: string,
  comment: string,
  rating: number,
  guitarId: number,
}

export type {Review, Reviews, ReviewsByGuitar, PostingReview};
