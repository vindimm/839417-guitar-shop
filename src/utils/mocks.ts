import { Guitars } from '../types/guitar';

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
