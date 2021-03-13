import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ItemPage from './pages/ItemPage';
import BasketPage from './pages/BasketPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import DeliveryPage from './pages/DeliveryPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import UserListPage from './pages/UserListPage';
import UserEditPage from './pages/UserEditPage';
import ProductListPage from './pages/ProductListPage';
import ProductEditPage from './pages/ProductEditPage';
import OrderListPage from './pages/OrderListPage';
import FilterPage from './pages/FilterPage';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/item/:id' component={ItemPage} />
          <Route path='/basket/:id?' component={BasketPage} />
          <Route path='/profile' component={ProfilePage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/register' component={RegisterPage} />
          <Route path='/delivery' component={DeliveryPage} />
          <Route path='/placeorder' component={PlaceOrderPage} />
          <Route path='/order/:id' component={OrderPage} />
          <Route path='/payment' component={PaymentPage} />
          <Route path='/admin/userlist' component={UserListPage} />
          <Route path='/admin/orderlist' component={OrderListPage} />
          <Route path='/admin/productlist' component={ProductListPage} exact />
          <Route path='/admin/productlist/:pageNumber' component={ProductListPage} exact />
          <Route path='/admin/user/:id/edit' component={UserEditPage} />
          <Route path='/admin/product/:id/edit' component={ProductEditPage} />
          <Route path='/search/:keyword' component={HomePage} exact />
          <Route path='/series/:name' component={FilterPage} exact />
          <Route path='/page/:pageNumber' component={HomePage} />
          <Route path='/search/:keyword/page/:pageNumber' component={HomePage} />
          <Route path='/' component={HomePage} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
