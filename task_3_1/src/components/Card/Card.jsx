import PropTypes from 'prop-types';

import { getTitle } from '../../utils/utils';

const Card = ({ imageUrl, tags }) => {
  return (
    <div className='relative w-full h-32'>
      <img
        className='w-full h-full object-cover object-center'
        src={imageUrl}
        alt={tags}
      />
      <div className='absolute z-10 bg-black bottom-0 opacity-75 w-full h-8 text-center '>
        <div className='text-white text-sm leading-8'>{getTitle(tags)}</div>
      </div>
    </div>
  );
};

Card.propTypes = {
  imageUrl: PropTypes.string,
  tags: PropTypes.string,
};

export default Card;
