import React, { useState } from 'react';

import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { saveDeliveryAddress } from '../actions/basketActions';

import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';

const DeliveryPage = ({ history }) => {
  const basket = useSelector((state) => state.basket);
  const { deliveryAddress } = basket;
  console.log(deliveryAddress);

  const [address, setAddress] = useState(deliveryAddress.address);
  const [city, setCity] = useState(deliveryAddress.city);
  const [postcode, setPostcode] = useState(deliveryAddress.postcode);
  const [country, setCountry] = useState(deliveryAddress.country);

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveDeliveryAddress({ address, city, postcode, country }));
    history.push('/payment');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Delivery</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='Address'>
          <Form.Label>Address</Form.Label>
          <Form.Control type='text' placeholder='Enter Address' value={address} required onChange={(e) => setAddress(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId='City'>
          <Form.Label>City</Form.Label>
          <Form.Control type='text' placeholder='Enter City' value={city} required onChange={(e) => setCity(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId='Postcode'>
          <Form.Label>Postcode</Form.Label>
          <Form.Control type='text' placeholder='Enter Postcode' value={postcode} required onChange={(e) => setPostcode(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId='Country'>
          <Form.Label>Country</Form.Label>
          <Form.Control type='text' placeholder='Enter Country' value={country} required onChange={(e) => setCountry(e.target.value)}></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default DeliveryPage;
