import React from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import SearchBook from './SearchBook';
import Bookshelf from './Bookshelf';
import Header from './Header';

class BooksApp extends React.Component {
  state = {
    books: [],
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books })
    })
  }

  // 移动图书
  moveBook = (book, shelf) => {
    if (this.state.books) {
      BooksAPI.update(book, shelf).then(() => {
        book.shelf = shelf;
        // 对比原来的状态更新现在的状态
        this.setState(state => ({
          // 拼接成一个新数组保存books
          books: state.books.filter(b => b.id !== book.id).concat([book])
        }))
      })
    }
  }

  render() {
    return (
      <div className="app">
        {/* 设置route管理页面 */}
        <Route exact path='/' render={() => (
          <div className='list-books'>
            <Header />
            <Bookshelf 
              moveBook = {this.moveBook}
              booksOnShelf = {this.state.books}
            />
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )}/>
        <Route exact path='/search' render={() => (
          <SearchBook/>
        )} />
      </div>
    )
  }
}

export default BooksApp
