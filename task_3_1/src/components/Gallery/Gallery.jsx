import PropTypes from 'prop-types';

import Card from '../Card/Card';

const Gallery = ({ data }) => {
  return (
    <div className='grid grid-cols-2'>
      {data.map((el) => (
        <Card imageUrl={el.previewURL} tags={el.tags} key={el.id} />
      ))}
    </div>
  );
};

Gallery.propTypes = {
  data: PropTypes.array,
};

export default Gallery;
