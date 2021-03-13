import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listItemDetails, updateItem } from '../actions/itemActions';
import { ITEM_UPDATE_RESET } from '../constants/itemConstants';

import FormContainer from '../components/FormContainer';

const ProductEditPage = ({ match, history }) => {
  const itemId = match.params.id;
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [imageFront, setImageFront] = useState('');
  const [imageBack, setImageBack] = useState('');
  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [series, setSeries] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const itemDetails = useSelector((state) => state.itemDetails);
  const { loading, error, item } = itemDetails;
  console.log(item);

  const itemUpdate = useSelector((state) => state.itemUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = itemUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: ITEM_UPDATE_RESET });
      history.push('/admin/productlist');
    } else {
      if (!item.name || item._id !== itemId) {
        dispatch(listItemDetails(itemId));
      } else {
        setName(item.name);
        setPrice(item.price);
        setDescription(item.description);
        setBrand(item.brand);
        setCategory(item.category);
        setSeries(item.series);
        setImageFront(item.image_front);
        setImageBack(item.image_back);
        setCountInStock(item.countInStock);
      }
    }
  }, [item, itemId, dispatch, history, successUpdate]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append('image', file);
    console.log(formData);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const { data } = await axios.post('http://localhost:5000/api/upload', formData, config);

      e.target.id === 'front' && setImageFront(data);
      e.target.id === 'back' && setImageBack(data);
      console.log(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateItem({
        _id: itemId,
        name,
        price,
        imageFront,
        imageBack,
        brand,
        category,
        series,
        description,
        countInStock,
      })
    );
  };
  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Item</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control type='text' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='Price'>
              <Form.Label>Price</Form.Label>
              <Form.Control type='number' placeholder='Enter price' value={price} onChange={(e) => setPrice(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='imageFront'>
              <Form.Label>Image Front</Form.Label>
              <Form.Control type='text' placeholder='Enter front image url' value={imageFront} onChange={(e) => setImageFront(e.target.value)}></Form.Control>
              <Form.File id='front' label='Choose File' custom onChange={handleFileUpload}></Form.File>
              {uploading && <Loader />}
            </Form.Group>
            <Form.Group controlId='imageBack'>
              <Form.Label>Image Back</Form.Label>
              <Form.Control type='text' placeholder='Enter back image url' value={imageBack} onChange={(e) => setImageBack(e.target.value)}></Form.Control>
              <Form.File id='back' label='Choose File' custom onChange={handleFileUpload}></Form.File>
              {uploading && <Loader />}
            </Form.Group>
            <Form.Group controlId='Brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control type='text' placeholder='Enter brand' value={brand} onChange={(e) => setBrand(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='countInStock'>
              <Form.Label>Number In Stock</Form.Label>
              <Form.Control type='number' placeholder='Enter amount in stock' value={countInStock} onChange={(e) => setCountInStock(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='Category'>
              <Form.Label>Category</Form.Label>
              <Form.Control type='text' placeholder='Enter Category' value={category} onChange={(e) => setCategory(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='Series'>
              <Form.Label>Series</Form.Label>
              <Form.Control type='text' placeholder='Enter Series' value={series} onChange={(e) => setSeries(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='Description'>
              <Form.Label>Description</Form.Label>
              <Form.Control type='text' placeholder='Enter Description' value={description} onChange={(e) => setDescription(e.target.value)}></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditPage;
