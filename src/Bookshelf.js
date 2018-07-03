import React from 'react';
import sortBy from 'sort-by';
import PropTypes from 'prop-types';
import Book from './Book';
class Bookshelf extends React.Component {
	static propTypes = {
		booksOnShelf: PropTypes.array.isRequired,
		moveBook: PropTypes.func.isRequired
	}
	
	render() {
		const groups = ['Currently Reading', 'Want To Read', 'Read'];
		const bookStatus = ['currentlyReading', 'wantToRead', 'read'];

		return (
			<div>
				{bookStatus.map((shelf, index) => {
					return (
						<div key={index} className='list-books-content'>
							<div className="bookshelf">
								<h2 className="bookshelf-title">{groups[index]}</h2>
								<div className="bookshelf-books">
									<ol className="books-grid">
										{this.props.booksOnShelf.sort(sortBy('title'))
											.filter(book => book.shelf === shelf)
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
						</div>
					)
				})}
			</div>
		)
	}
}

export default Bookshelf;