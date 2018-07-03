import React from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Search from './Search';
import Bookshelf from './Bookshelf';
import Header from './Header';

class BooksApp extends React.Component {
  state = {
    books: [],
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <div className='list-books'>
            <Header />
            <Bookshelf />
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )}/>
        <Route exact path='/search' render={() => (
          <Search />
        )} />

      </div>
    )
  }
}

export default BooksApp
