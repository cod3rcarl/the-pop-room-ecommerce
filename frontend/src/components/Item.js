import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Message from '../components/Message';

const Item = ({ item }) => {
  const [toggle, setToggle] = useState(true);
  const [showText, setShowText] = useState('Add to Basket');
  const [message, setMessage] = useState('');

  const history = useHistory();

  const basket = useSelector((state) => state.basket);
  let { basketItems } = basket;

  useEffect(() => {
    basketItems.forEach((basketItem) => {
      if (item._id === basketItem.item) {
        setShowText('Added to Basket');
      } else if (item.countInStock === 0) {
        setShowText('Out of Stock');
      }
    });
  }, [basketItems, item._id, item.countInStock]);

  const toggleImage = () => {
    setToggle(!toggle);
  };
  const handleAddToBasket = () => {
    setMessage('Added to Basket');
    history.push(`/basket/${item._id}?qty=1`);
  };
  return (
    <Card className='my-3  rounded'>
      <Link to={`/item/${item._id}`}>{toggle ? <Card.Img src={item.image_front} variant='top'></Card.Img> : <Card.Img src={item.image_back} variant='top'></Card.Img>}</Link>

      <Button variant='info' onClick={toggleImage}>
        {toggle ? 'Show Back' : 'Show Front'}
      </Button>
      <Button onClick={handleAddToBasket} type='button' className='btn-block' disabled={item.countInStock === 0}>
        {showText}
      </Button>
      <Message variant='success'>{message}</Message>
      <Card.Body>
        {' '}
        <Link to={`/item/${item._id}`}>
          <Card.Title as='div'>
            <strong>{item.name}</strong>
          </Card.Title>
          <Card.Text as='h3'>£{item.price}</Card.Text>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default Item;
