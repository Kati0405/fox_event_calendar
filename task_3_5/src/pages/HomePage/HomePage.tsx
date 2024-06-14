import ItemsList from 'src/components/ItemsList/ItemsList';
import products from 'src/products.json';

const HomePage = () => {
  return (
    <div className='bg-bg-gray'>
      <ItemsList products={products} />
    </div>
  );
};

export default HomePage;
