import './styles.css';
type Props ={
  price: number;
}

const ProductPrice = ({ price } : Props) => {
  return (
    <div className ="produtc-price-container">
      <span>R$</span>
      <h3>{ price }</h3>
    </div>
  );
};
export default ProductPrice;
