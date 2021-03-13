import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Meta from '../components/Meta';
import { Link } from 'react-router-dom';
import Item from '../components/Item';
import { useDispatch, useSelector } from 'react-redux';
import { listItems } from '../actions/itemActions';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import Loader from '../components/Loader';
import ItemCarousel from '../components/ItemCarousel';

const HomePage = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;
  const filterName = match.params.name;

  const dispatch = useDispatch();
  const itemList = useSelector((state) => state.itemList);
  const { loading, error, items, page, pages } = itemList;

  if (items) {
    const seriesList = items.map((item) => {
      return item.series;
    });
    const filterSeries = seriesList.filter((x, i) => {
      return seriesList.indexOf(x) === i;
    });

    localStorage.setItem('series', JSON.stringify(filterSeries));
  }

  useEffect(() => {
    dispatch(listItems(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber, filterName]);

  return (
    <>
      <Meta />
      {!keyword ? (
        <ItemCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
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

export default HomePage;
