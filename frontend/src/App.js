import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ItemPage from './pages/ItemPage';
import BasketPage from './pages/BasketPage';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' component={HomePage} exact />
          <Route path='/item/:id' component={ItemPage} />
          <Route path='/basket/:id?' component={BasketPage} />
        </Container>
      </main>

      <Footer />
    </Router>
  );
};

export default App;
