import React, { Component } from 'react';
import { postServiceData, stringToDate } from './util';

class BorrowReturn extends Component {
	constructor(props) {
		super(props);

        this.state = {borrow_return: this.props.borrow_return};
		this.returnBorrow = this.returnBorrow.bind(this);
    }
    
    returnBorrow(event) {
		event.preventDefault();
        let curDate = new Date();
        let theDate = stringToDate(curDate.toLocaleDateString());
		const params = {borrow_id: this.props.borrow_id, borrow_return: theDate};
		postServiceData("returnBook", params).then((data) => {
            this.setState({borrow_return: curDate});
		});
    }
	
    render() {
        if (this.state.borrow_return !== null) {
            let theDate = new Date(this.state.borrow_return).toLocaleDateString();
            return <span>{theDate}</span>
        } else {
            return <button className="btn" onClick={this.returnBorrow}><img src="img/return.png" alt="return" className="icon" /></button>
        }
    }
}

class BorrowInList extends Component {
    render() {
        let borrow = this.props.borrow;
        return (
			<tr>
				<td>{(new Date(borrow.borrow_date)).toLocaleDateString()}</td>
				<td>{borrow.book_title}</td>
				<td className="text-center">
                    <BorrowReturn borrow_id={borrow.borrow_id} borrow_return={borrow.borrow_return} />
                </td>
			</tr>        
		);
    }
}

class BorrowsInList extends Component {
    render() {
        let borrows = this.props.borrows;
		return (<tbody>
			{borrows.map((borrow) => <BorrowInList borrow={borrow} key={borrow.borrow_id} /> )}
         </tbody>);
    }
}

export class Borrows extends Component {
	constructor(props) {
		super(props);

        this.state = {borrows: [], books:[], selectedBook: -1};
		this.handleChangeSelectedBook = this.handleChangeSelectedBook.bind(this);
		this.createBorrow = this.createBorrow.bind(this);
    }
    
    componentDidMount() {
        if (this.props.person_id > 0) {
    	    this.fetch();
        }
	}

	fetch() {
		const params = {person_id: this.props.person_id};
		postServiceData("borrows", params).then((data) => {
            this.setState({borrows: data});
		});
		postServiceData("books", params).then((data) => {
            this.setState({books: data});
		});
	}

	handleChangeSelectedBook(event) {
		this.setState({selectedBook: event.target.value});
	}

    createBorrow(event) {
		event.preventDefault();
        if (this.state.selectedBook > 0) {
            let curDate = new Date();
            let theDate = stringToDate(curDate.toLocaleDateString());
            var params = {borrow_id: -1, person_id: this.props.person_id, book_id: this.state.selectedBook, borrow_date: theDate};
            postServiceData("saveBorrow", params).then((data) => {
                let borrow_id = data[0].borrow_id;
                params = {id: borrow_id};
                postServiceData("borrow", params).then((data) => {;
                    let line = data[0]
                    let temp = this.state.borrows;
                    temp.push(line);
                    this.setState({borrows: temp});
                });
            });
        }
    }
    
	render() {
        let theDate = new Date().toLocaleDateString();
		return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h2 className="">List of borrows</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col" className="text-center">Date</th>
                                    <th scope="col" className="text-center">Title</th>
                                    <th scope="col" className="text-center">Return</th>
                                </tr>
                            </thead>
                        	<BorrowsInList borrows={this.state.borrows} />
                            <tfoot>
                                <tr id="addNew">
                                    <td>{theDate}</td>
                                    <td>
                                        <select onChange={this.handleChangeSelectedBook}>
                                            <option value="-1" >-</option>
			                                {this.state.books.map((book) => (<option value={book.book_id} key={book.book_id}>{book.book_title}</option>) )}
                                        </select>
                                    </td>
                                    <td className="text-center">
                                        <button className="btn" onClick={this.createBorrow}><img src="img/plus.png" alt="add" className="icon" /></button>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}