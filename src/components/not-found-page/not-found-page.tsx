import { Link } from 'react-router-dom';

import Header from '../common/header/header';
import Footer from '../common/footer/footer';

function NotFoundPage(): JSX.Element {
  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <h2 className="product-container__title title title--big title--uppercase">
            404. Not Found
          </h2>
          <Link className="link" to="/">
            Вернуться на главную
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default NotFoundPage;
