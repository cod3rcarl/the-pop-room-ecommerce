import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Item from '../components/Item';
import { useDispatch, useSelector } from 'react-redux';
import { listItems } from '../actions/itemActions';
import Message from '../components/Message';
import Loader from '../components/Loader';

const HomePage = () => {
  const dispatch = useDispatch();
  const itemList = useSelector((state) => state.itemList);
  const { loading, error, items } = itemList;

  useEffect(() => {
    dispatch(listItems());
  }, [dispatch]);

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {items.map((item) => (
            <Col key={item._id} sm={12} md={6} lg={4} xl={3}>
              <Item item={item} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomePage;
