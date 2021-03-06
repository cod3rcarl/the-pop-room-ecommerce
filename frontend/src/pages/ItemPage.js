import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import products from '../products';

const ItemPage = ({ match }) => {
  const item = products.find((item) => item._id === match.params.id);
  const [toggle, setToggle] = useState(true);
  const toggleImage = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <Link className='btn btn-dark my-3' to='/'>
        Go Back
      </Link>
      <Row>
        <Col md={6}> {toggle ? <Image className='myImages' src={item.image_front} alt={item.name} fluid></Image> : <Image className='myImages' src={item.image_back} alt={item.name} fluid></Image>} </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <Button variant='info' onClick={toggleImage}>
                {toggle ? 'Show Back' : 'Show Front'}
              </Button>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>{item.brand}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>{item.name}</h3>
            </ListGroup.Item>

            <ListGroup.Item>
              <h3>{item.description}</h3>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>£{item.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>{item.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button type='button' className='btn-block' disabled={item.countInStock === 0}>
                  Add to Basket
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ItemPage;
