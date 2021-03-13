import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../actions/orderActions';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';

const PlaceOrderPage = ({ history }) => {
  const dispatch = useDispatch();
  const basket = useSelector((state) => state.basket);

  //calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  basket.itemsPrice = addDecimals(basket.basketItems.reduce((acc, cur) => acc + cur.price * cur.qty, 0));
  basket.deliveryPrice = addDecimals(basket.itemsPrice > 10 ? 0 : 3);
  basket.taxPrice = addDecimals(Number((0.2 * basket.itemsPrice).toFixed(2)));

  basket.totalPrice = (Number(basket.itemsPrice) + Number(basket.deliveryPrice) + Number(basket.taxPrice)).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;
  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
  }, [success, history, order]);
  const handlePlaceOrder = () => {
    dispatch(
      createOrder({
        orderItems: basket.basketItems,
        deliveryAddress: basket.deliveryAddress,
        paymentMethod: basket.paymentMethod,
        itemsPrice: basket.itemsPrice,
        deliveryPrice: basket.deliveryPrice,
        taxPrice: basket.taxPrice,
        totalPrice: basket.totalPrice,
      })
    );
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Delivery</h2>
              <p>
                <strong>Address: </strong>
                {basket.deliveryAddress.address}, {basket.deliveryAddress.city}, {basket.deliveryAddress.postcode}, {basket.deliveryAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {basket.paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {basket.basketItems.length === 0 ? (
                <Message>Your basket is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {basket.basketItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/items/${item.item}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x £{item.price} = £{item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>£{basket.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Delivery</Col>
                  <Col>£{basket.deliveryPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>VAT</Col>
                  <Col>£{basket.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>£{basket.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>{error && <Message variant='danger'>{error}</Message>}</ListGroup.Item>
              <ListGroup.Item>
                <Button type='button' className='btn-block' disabled={basket.basketItems === 0} onClick={handlePlaceOrder}>
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderPage;
