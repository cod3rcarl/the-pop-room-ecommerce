import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Loader from './Loader';
import Message from './Message';
import { useSelector, useDispatch } from 'react-redux';
import { listItems } from '../actions/itemActions';

const ItemCarousel = () => {
  const dispatch = useDispatch();
  const itemList = useSelector((state) => state.itemList);
  const { loading, error, items } = itemList;

  useEffect(() => {
    dispatch(listItems());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <div className='myCarousel'>
      {' '}
      <Carousel pause='hover' className='bg-dark slide '>
        {items.map((item) => (
          <Carousel.Item key={item._id}>
            <Link to={`/item/${item._id}`}>
              <Image src={item.image_front} alt={item.name} fluid />
              <Carousel.Caption className='carousel-capton'>
                <h2>
                  {item.name} (£{item.price})
                </h2>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default ItemCarousel;
