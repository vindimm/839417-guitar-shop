import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { Guitar } from '../../../types/guitar';
import { TabName } from '../../../const';

type ProductTabsProps = {
  guitar: Guitar | undefined,
};

function ProductTabs({ guitar }: ProductTabsProps): JSX.Element {

  const location = useLocation();
  const tabName: string = location.hash || TabName.Characteristic;

  return (
    <div className="tabs">
      <Link
        className={tabName === TabName.Characteristic ?
          'button button--medium tabs__button' :
          'button button--medium tabs__button button--black-border'}
        to="#characteristics"
      >
          Характеристики
      </Link>
      <Link
        className={tabName === TabName.Description ?
          'button button--medium tabs__button' :
          'button button--medium tabs__button button--black-border'}
        to="#description"
      >
        Описание
      </Link>
      <div className="tabs__content">
        {tabName === '#description' ?
          (
            <p className="tabs__product-description">
              Гитара подходит как для старта обучения, так и для домашних занятий или использования в полевых условиях,
              например, в походах или для проведения уличных выступлений. Доступная стоимость, качество и надежная
              конструкция, а также приятный внешний вид, который сделает вас звездой вечеринки.
            </p>
          ) :
          (
            <table className="tabs__table">
              <tbody>
                <tr className="tabs__table-row">
                  <td className="tabs__title">Артикул:</td>
                  <td className="tabs__value">{guitar?.vendorCode}</td>
                </tr>
                <tr className="tabs__table-row">
                  <td className="tabs__title">Тип:</td>
                  <td className="tabs__value">{guitar?.type}</td>
                </tr>
                <tr className="tabs__table-row">
                  <td className="tabs__title">Количество струн:</td>
                  <td className="tabs__value">{guitar?.stringCount} струнная</td>
                </tr>
              </tbody>
            </table>
          )}
      </div>
    </div>
  );
}

export default ProductTabs;
