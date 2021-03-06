import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Item = ({ item }) => {
  const [toggle, setToggle] = useState(true);
  const toggleImage = () => {
    setToggle(!toggle);
  };
  return (
    <Card className='my-3  rounded'>
      <Link to={`/item/${item._id}`}>{toggle ? <Card.Img src={item.image_front} variant='top'></Card.Img> : <Card.Img src={item.image_back} variant='top'></Card.Img>}</Link>
      <Button variant='info' onClick={toggleImage}>
        {toggle ? 'Show Back' : 'Show Front'}
      </Button>
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
