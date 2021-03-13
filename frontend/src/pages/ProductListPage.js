import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import { listItems, deleteItem, createItem } from '../actions/itemActions';
import { ITEM_CREATE_RESET } from '../constants/itemConstants';

const ItemListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const itemList = useSelector((state) => state.itemList);
  const { loading, error, items, page, pages } = itemList;

  const itemDelete = useSelector((state) => state.itemDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = itemDelete;

  const itemCreate = useSelector((state) => state.itemCreate);
  const { loading: loadingCreate, error: errorCreate, success: successCreate, item: createdItem } = itemCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: ITEM_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login');
    }

    if (successCreate) {
      history.push(`/admin/product/${createdItem._id}/edit`);
    } else {
      dispatch(listItems('', pageNumber));
    }
  }, [dispatch, history, userInfo, successDelete, successCreate, createdItem, pageNumber]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteItem(id));
    }
  };

  const handleCreateItem = () => {
    dispatch(createItem());
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={handleCreateItem}>
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>SERIES</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.name}</td>
                  <td>£{item.price}</td>
                  <td>{item.category}</td>
                  <td>{item.series}</td>
                  <td>{item.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${item._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button variant='danger' className='btn-sm' onClick={() => handleDelete(item._id)}>
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ItemListScreen;
