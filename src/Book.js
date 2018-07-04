import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Book extends Component {

	static propTypes = {
		book: PropTypes.object.isRequired,
		moveBook: PropTypes.func.isRequired
	}

	updateBook(shelf) {
		this.props.moveBook(this.props.book, shelf);
	}

	render() {
		const { book } = this.props;

		return (
			<div className="book">
				<div className="book-top">
					<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks !== undefined ? 
						book.imageLinks.smallThumbnail : ''})` }}></div>
					<div className="book-shelf-changer">
						{/* 对book的shelf属性进行判断， 如果是在搜索页出现的book， 则shelf默认为none */}
						<select value={ book.shelf ? book.shelf : 'none'} onChange={(event) => this.updateBook(event.target.value)} >
							<option value="" disabled>Move to...</option>
							<option value="currentlyReading">Currently Reading</option>
							<option value="wantToRead">Want to Read</option>
							<option value="read">Read</option>
							<option value="none">None</option>
						</select>
					</div>
				</div>
				<div className="book-title">{book.title}</div>
				<div className="book-authors">{book.authors}</div>
			</div>
		)
	}
}

export default Book;