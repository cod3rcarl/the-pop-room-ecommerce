import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Item from '../components/Item';
import { useDispatch, useSelector } from 'react-redux';
import { filterItems } from '../actions/itemActions';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import Loader from '../components/Loader';

const FilterPage = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;
  const filterName = match.params.name;

  const dispatch = useDispatch();
  const itemFilter = useSelector((state) => state.itemFilter);
  const { loading, error, items, page, pages } = itemFilter;

  useEffect(() => {
    dispatch(filterItems(filterName));
  }, [dispatch, keyword, pageNumber, filterName]);

  return (
    <>
      <h1>{filterName} Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {items.map((item) => (
              <Col key={item._id} sm={12} md={6} lg={4} xl={3}>
                <Item item={item} />
              </Col>
            ))}
          </Row>
          <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
        </>
      )}
    </>
  );
};

export default FilterPage;
