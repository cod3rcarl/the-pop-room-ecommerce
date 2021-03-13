import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, removeFromBasket } from '../actions/basketActions';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import Message from '../components/Message';

const BasketPage = ({ match, location, history }) => {
  const itemId = match.params.id;

  const qty = location.search ? Number(location.search.split('=')[1]) : 1;
  const dispatch = useDispatch();

  const basket = useSelector((state) => state.basket);
  let { basketItems } = basket;

  useEffect(() => {
    if (itemId) {
      dispatch(addToBasket(itemId, qty));
    }
  }, [dispatch, itemId, qty]);

  const handleRemoveFromBasket = (id) => {
    dispatch(removeFromBasket(id));
  };
  const handleCheckout = () => {
    history.push(`/login?redirect=delivery`);
  };
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Basket</h1>

        {basketItems.length === 0 ? (
          <Message>
            Your basket is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {basketItems.map((basket) => (
              <ListGroup.Item key={basket.item}>
                <Row>
                  <Col md={2}>
                    <Image src={basket.image} alt={basket.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/item/${basket.item}`}>{basket.name}</Link>
                  </Col>
                  <Col md={2}>£{basket.price}</Col>
                  <Col md={3}>
                    {' '}
                    <Form.Control as='select' value={basket.qty} onChange={(e) => dispatch(addToBasket(basket.item, Number(e.target.value)))}>
                      {[...Array(basket.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1} {/* {qty > 1 ? x + 1 : qty} */}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button type='button' variant='light' onClick={() => handleRemoveFromBasket(basket.item)}>
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Subtotal ({basketItems.reduce((acc, currentBasket) => acc + currentBasket.qty, 0)}) Item(s)</h2>£{basketItems.reduce((acc, currentBasket) => acc + currentBasket.qty * currentBasket.price, 0).toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button type='button' className='btn-block' disabled={basketItems.length === 0} onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default BasketPage;
