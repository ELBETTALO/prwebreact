import React, { Component } from 'react';
import { postServiceData, stringToDate } from './util';
import { NavBar } from "./NavBar";



class BorrowAllReturn extends Component {
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

class BorrowAllInList extends Component {
    render() {
        let borrow = this.props.borrow;
        let user = this.props.user;
        return (
			<tr>
				<td>{(new Date(borrow.borrow_date)).toLocaleDateString()}</td>
				<td>{borrow.book_title}</td>
				<td> {borrow.person_firstname}</td>
                <td> {borrow.person_lastname}</td>
                <td className="text-center">
                    <BorrowAllReturn borrow_id={borrow.borrow_id} borrow_return={borrow.borrow_return} />
                </td>
			</tr>        
		);
    }
}

class BorrowsAllInList extends Component {
    render() {
        let borrowsAll = this.props.borrowsAll;
        console.log(borrowsAll);
		return (<tbody>
			{borrowsAll.map((borrow) => <BorrowAllInList borrow={borrow} key={borrow.borrow_id} /> )}

         </tbody>);
    }
}

export class Borrow extends Component {
	constructor(props) {
		super(props);

        this.state = {borrowsAll: [], books:[], selectedBook: -1};
	/*	this.handleChangeSelectedBook = this.handleChangeSelectedBook.bind(this);
		this.createBorrow = this.createBorrow.bind(this);*/
    }
    
    componentDidMount() {
    	    this.fetch();

	}

	fetch() {
		let params = {person_id: this.props.person_id};
		postServiceData("borrowsAll", params).then((data) => {
            this.setState({borrowsAll: data});
		});
		postServiceData("books", params).then((data) => {
            this.setState({books: data});
		});
        

	}

    
	render() {
        let theDate = new Date().toLocaleDateString();
		return (
   <div>
    <NavBar />
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
                                    <th scope="col" className="text-center">Prenom</th>
                                    <th scope="col" className="text-center">Nom</th>
                                    <th scope="col" className="text-center">Return</th>
                                </tr>
                            </thead>
                        	<BorrowsAllInList borrowsAll={this.state.borrowsAll}  />
                    
                        </table>
                    </div>
                </div>
            </div>
        </div>
        </div>
        );
    }


}

export default Borrow;