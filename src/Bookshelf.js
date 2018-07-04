import React from 'react';
import sortBy from 'sort-by';
import PropTypes from 'prop-types';
import Book from './Book';

const Bookshelf = (props) => {
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
									{props.booksOnShelf.sort(sortBy('title'))
										.filter(book => book.shelf === shelf)
										.map(book => (
											<Book
												moveBook={props.moveBook}	
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

Bookshelf.propTypes = {
	booksOnShelf: PropTypes.array.isRequired,
	moveBook: PropTypes.func.isRequired
}

export default Bookshelf;