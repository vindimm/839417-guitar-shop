import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';

import { sendReviewAction } from '../../../../store/api-actions';
import { useAppSelector, useAppDispatch } from '../../../../hooks';
import { getGuitarById } from '../../../../store/selectors';
import { GuitarRating } from '../../../../const';
import { validateString } from '../../../../utils/utils';
import RatingInputs from './rating-inputs/rating-inputs';

type ReviewFormProps = {
  handleCloseReviewModal: () => void;
  handleOpenSuccessModal: () => void;
}

function ReviewForm({ handleCloseReviewModal, handleOpenSuccessModal }: ReviewFormProps): JSX.Element {
  const { id } = useParams<{id: string}>();
  const guitar = useAppSelector(getGuitarById(Number(id)));
  const dispatch = useAppDispatch();

  const [rating, setRating] = useState(GuitarRating.Initial);
  const [userName, setUserName] = useState('');
  const [advantage, setAdvantage] = useState('');
  const [disadvantage, setDisadvantage] = useState('');
  const [comment, setComment] = useState('');

  const [isRatingWarning, setIsRatingWarning] = useState(false);
  const [isUserNameWarning, setIsUserNameWarning] = useState(false);
  const [isAdvantageWarning, setIsAdvantageWarning] = useState(false);
  const [isDisadvantageWarning, setIsDisadvantageWarning] = useState(false);
  const [isCommentWarning, setIsCommentWarning] = useState(false);

  const [isFormValid, setIsFormValid] = useState(false);

  const handleUserNameChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setUserName(validateString(evt.target.value));
  };

  const handleCommentChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(validateString(evt.target.value));
  };

  const handleAdvantageChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setAdvantage(validateString(evt.target.value));
  };

  const handleDisadvantageChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setDisadvantage(validateString(evt.target.value));
  };

  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setIsRatingWarning(!rating);
    setIsUserNameWarning(!userName);
    setIsAdvantageWarning(!advantage);
    setIsDisadvantageWarning(!disadvantage);
    setIsCommentWarning(!comment);

    if (isFormValid) {
      dispatch(sendReviewAction({guitarId: Number(id), userName, advantage, disadvantage, comment, rating}));
      handleCloseReviewModal();
      handleOpenSuccessModal();
    }
  };

  useEffect(() => {
    if (!rating || !userName || !advantage || !disadvantage || !comment) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  }, [rating, userName, advantage, disadvantage, comment]);

  return (
    <div className="modal is-active modal--review modal-for-ui-kit">
      <div className="modal__wrapper">
        <div className="modal__overlay" data-close-modal onClick={handleCloseReviewModal}>
        </div>
        <div className="modal__content">
          <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
          <h3 className="modal__product-name title title--medium-20 title--uppercase">{guitar?.name}</h3>
          <form className="form-review" onSubmit={handleSubmit}>
            <div className="form-review__wrapper">
              <div className="form-review__name-wrapper">
                <label className="form-review__label form-review__label--required" htmlFor="user-name">
                  Ваше Имя
                </label>
                <input
                  className="form-review__input form-review__input--name"
                  id="user-name"
                  type="text"
                  autoComplete="off"
                  value={userName}
                  onChange={handleUserNameChange}
                />
                <p className="form-review__warning" style={isUserNameWarning ? {} : {visibility: 'hidden'}} >
                  Заполните поле
                </p>
              </div>

              <div>
                <span className="form-review__label form-review__label--required" >Ваша Оценка</span>
                <div className="rate rate--reverse">

                  <RatingInputs rating={rating} maxRating={GuitarRating.Maximal} onRatingChange={handleRatingChange} />

                  <p className="rate__message" style={isRatingWarning ? {} : {visibility: 'hidden'}}>
                    Поставьте оценку
                  </p>
                </div>
              </div>
            </div>

            <label className="form-review__label form-review__label--required" htmlFor="adv">Достоинства</label>
            <input
              className="form-review__input"
              id="adv"
              type="text"
              autoComplete="off"
              value={advantage}
              onChange={handleAdvantageChange}
            />
            <p className="form-review__warning" style={isAdvantageWarning ? {} : {visibility: 'hidden'}}>
              Заполните поле
            </p>

            <label className="form-review__label form-review__label--required" htmlFor="disadv">Недостатки</label>
            <input
              className="form-review__input"
              id="disadv"
              type="text"
              autoComplete="off"
              value={disadvantage}
              onChange={handleDisadvantageChange}
            />
            <p className="form-review__warning" style={isDisadvantageWarning ? {} : {visibility: 'hidden'}}>
              Заполните поле
            </p>

            <label className="form-review__label form-review__label--required" htmlFor="comment">Комментарий</label>
            <textarea
              className="form-review__input form-review__input--textarea"
              id="comment"
              rows={10}
              autoComplete="off"
              value={comment}
              onChange={handleCommentChange}
            >
            </textarea>

            <p className="form-review__warning" style={isCommentWarning ? {} : {visibility: 'hidden'}}>
              Заполните поле
            </p>
            <button
              className="button button--medium-20 form-review__button"
              type="submit"
            >
              Отправить отзыв
            </button>
          </form>
          <button
            className="modal__close-btn button-cross"
            type="button"
            aria-label="Закрыть"
            onClick={handleCloseReviewModal}
          >
            <span className="button-cross__icon"></span>
            <span className="modal__close-btn-interactive-area"></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReviewForm;
