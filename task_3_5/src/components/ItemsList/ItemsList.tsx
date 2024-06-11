import Item from '../Item/Item';

interface ItemProps {
  images: string[];
  id: number;
  title: string;
  price: number;
}

interface ItemListProps {
  products: ItemProps[];
}

const ItemsList: React.FC<ItemListProps> = ({ products }) => {
  return (
    <div className='item-list flex flex-row flex-wrap gap-8 mt-8 mx-14 justify-center'>
      {products.map((el) => (
        <Item
          key={el.id}
          image={el.images[0]}
          title={el.title}
          id={el.id}
          price={el.price}
          quantity={1}
        />
      ))}
    </div>
  );
};
export default ItemsList;
