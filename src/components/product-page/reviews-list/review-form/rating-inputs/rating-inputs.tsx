import React, { ChangeEvent } from 'react';

import { getMark } from '../../../../utils';

type RatingInputsProps = {
  onRatingChange: (value: number) => void;
  maxRating: number;
  rating: number;
}

function RatingInputs({onRatingChange, maxRating, rating}: RatingInputsProps): JSX.Element {

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    onRatingChange(Number(evt.target.value));
  };

  return (
    <>
      {
        Array.from({length: maxRating}).map((_, index, arr) => {
          const currentId = arr.length - index;
          return (
            <React.Fragment key={currentId}>
              <input
                className="visually-hidden"
                id={`star-${currentId}`}
                name="rate"
                type="radio"
                value={currentId}
                onChange={handleChange}
                checked={currentId === rating}
              />
              <label
                className="rate__label"
                htmlFor={`star-${currentId}`}
                title={getMark(currentId)}
              >
              </label>
            </React.Fragment>
          );
        })
      }
    </>
  );
}

export default RatingInputs;
