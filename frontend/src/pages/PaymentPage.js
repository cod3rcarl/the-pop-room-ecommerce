import React, { useState } from 'react';

import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/basketActions';
import CheckoutSteps from '../components/CheckoutSteps';

import FormContainer from '../components/FormContainer';

const PaymentPage = ({ history }) => {
  const basket = useSelector((state) => state.basket);
  const { deliveryAddress } = basket;

  if (!deliveryAddress) {
    history.push('/delivery');
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Methoid</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>

          <Col>
            <Form.Check type='radio' label='PayPal or Credit Card' id='PayPal' name='paymentMethod' checked value='PayPal' onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
            {/* <Form.Check type='radio' label='Stripe' id='Stripe' name='paymentMethod' value='Stripe' onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check> */}
          </Col>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentPage;
