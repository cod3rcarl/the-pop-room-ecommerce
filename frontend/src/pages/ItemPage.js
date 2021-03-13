import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listItemDetails } from '../actions/itemActions';
import Meta from '../components/Meta';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';

const ItemPage = ({ match, history }) => {
  const [qty, setQty] = useState(1);
  const [toggle, setToggle] = useState(true);
  const dispatch = useDispatch();
  const itemDetails = useSelector((state) => state.itemDetails);
  const { loading, error, item } = itemDetails;

  useEffect(() => {
    dispatch(listItemDetails(match.params.id));
  }, [dispatch, match]);

  const toggleImage = () => {
    setToggle(!toggle);
  };

  const handleAddToBasket = () => {
    history.push(`/basket/${match.params.id}?qty=${qty}`);
  };
  return (
    <>
      <Link className='btn btn-dark my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta title={item.name} />
          <Row>
            <Col md={6}> {toggle ? <Image src={item.image_front} alt={item.name} fluid></Image> : <Image className='myImages' src={item.image_back} alt={item.name} fluid></Image>} </Col>
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
                  {item.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1} {/* {qty > 1 ? x + 1 : qty} */}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button onClick={handleAddToBasket} type='button' className='btn-block' disabled={item.countInStock === 0}>
                      Add to Basket
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ItemPage;
