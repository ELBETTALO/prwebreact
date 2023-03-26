import React, { Component } from 'react';



export class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-primary">
                <div className="container">
                    <div className="collapse navbar-collapse" id="navbar1">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item"> <a className="nav-link text-white" href="/users">Users</a></li>
                            <li className="nav-item"> <a className="nav-link text-white" href="/books">Books</a></li>
                        </ul>
                    </div>
                </div>
            </nav>


        );
    }


}
export default NavBar;
