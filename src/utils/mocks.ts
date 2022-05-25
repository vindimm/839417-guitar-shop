import { Guitar, Guitars } from '../types/guitar';
import { Reviews, ReviewsByGuitar } from '../types/review';

export const makeFakeGuitar = (): Guitar => (
  {
    id: 1,
    name: 'fsdafasdfasds',
    vendorCode: 'qwe1231',
    type: 'classic',
    description: 'text description',
    previewImg: 'url/img.jpg',
    stringCount: 6,
    rating: 5,
    price: 12345,
  }
);

export const makeFakeGuitars = (quantity: number): Guitars => (
  new Array(quantity).fill(null).map(() => (
    {
      id: 1,
      name: 'fsdafasdfasds',
      vendorCode: 'qwe1231',
      type: 'classic',
      description: 'text description',
      previewImg: 'url/img.jpg',
      stringCount: 6,
      rating: 5,
      price: 12345,
    }
  ))
);

export const makeFakeReviews = (guitarId: number): Reviews => (
  new Array(5).fill(null).map(() => (
    {
      id: 'id of review',
      userName: 'userName text',
      advantage: 'adv text',
      disadvantage: 'disadv text',
      comment: 'comment text text',
      rating: 4,
      createAt: 'date of creating',
      guitarId: guitarId,
    }
  ))
);

export const makeFakeReviewsByGuitar = (guitarId: number): ReviewsByGuitar => (
  {
    [guitarId]: makeFakeReviews(guitarId),
  }
);
