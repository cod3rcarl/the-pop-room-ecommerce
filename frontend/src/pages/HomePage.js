import React from 'react';
import { Row, Col } from 'react-bootstrap';
import products from '../products';
import Item from '../components/Item';

const HomePage = () => {
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((item) => (
          <Col sm={12} md={6} lg={4} xl={3}>
            <Item item={item} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomePage;
