import React from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import sortBy from 'sort-by';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';

class SearchBook extends React.Component {

	static propTypes = {
		moveBook: PropTypes.func.isRequired,
		booksOnShelf: PropTypes.array
	}

	state = {
		query: '',
		books: []
	}

	// 更新查询数据
	updateQuery = (query) => {
		if (!query) {
			this.setState({ query: '', books: [] })
		} else {
			this.setState({ query: query.trim() })
			// 获取搜索数据
			BooksAPI.search(query).then(books => {
				if (books.error) {
					books = [];
				}
				books.map(book => (this.props.booksOnShelf.filter(b => b.id === book.id).map(b => book.shelf = b.shelf)))
				this.setState({ books })
			})
		}
	}

	render() {
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link className="close-search" to='/'>Close</Link>
					<div className="search-books-input-wrapper">
						<input
							type="text"
							placeholder="Search by title or author"
							// 监控输入框的状态变化
							onChange={e => this.updateQuery(e.target.value)}
						/>
					</div>
				</div>
				<div className='search-books-results'>
					<ol className='books-grid'>
					{/* 按名称排序 */}
						{this.state.books.sort(sortBy('title'))
							.map(book => (
								<Book 
									moveBook={this.props.moveBook}
									key={book.id}
									book={book}
								/>
							))
						}
					</ol>
				</div>
			</div>
		)
	}
}

export default SearchBook;