import { ReactComponent as MainImage } from 'assets/images/Desenho.svg';
import ButtonIcon from 'components/ButtonIcon';
import './styles.css';
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div className="home-container">
      <div className="base-card home-card">
        <div className="home-content-container">
          <div>
            <h1>Conheça o melhor catálogo de produto</h1>
            <p>
              Ajudaremos você a encontrar os melhores produtos disponiveis do
              mercado
            </p>
          </div>
          <Link to= "/products">
            <ButtonIcon />
          </Link>
        </div>
        <div className="home-image-container">
          <MainImage />
        </div>
      </div>
    </div>
  );
};

export default Home;
