import React, { Component } from 'react';
import { useLocation } from 'react-router-dom';
import { postServiceData, stringToDate } from './util';
import { Navigate } from "react-router-dom";

//Hook def

const User = ({getToken}) => {
    const location = useLocation();
    if (location.state === null) {
        return <Navigate to="/" />;
    }else{
    return  <UserClass id={location.state.id} getToken={getToken} />;
    }

};



// Class def
class UserClass extends Component {
    constructor(props) {
        super(props);
        this.saveUser = this.saveUser.bind(this);

        let theDate = new Date().toLocaleDateString();

        this.state = {
            person_id: "NEW",
            person_lastname: "",
            person_firstname: "",
            person_birthdate: theDate,
            canGoBack: false
        };

        this.handleChangePersonFirstname = this.handleChangePersonFirstname.bind(this);
        this.handleChangePersonLastname = this.handleChangePersonLastname.bind(this);
        this.handleChangePersonBirthDate = this.handleChangePersonBirthDate.bind(this);
    }

    saveUser(event) {
        event.preventDefault();
        var theDate = stringToDate(this.state.person_birthdate);
        var params = {
            person_id: this.state.person_id,
            person_lastname: this.state.person_lastname,
            person_firstname: this.state.person_firstname,
            person_birthdate: theDate
        };
        if (params.person_id === "NEW") {
            params.person_id = -1;
        }

        postServiceData("saveUser", params).then((data) => {
            this.setState({ canGoBack: true });
        });
    }

    handleChangePersonFirstname(event) {
        this.setState({ person_firstname: event.target.value });
    }

    handleChangePersonLastname(event) {
        this.setState({ person_lastname: event.target.value });
    }

    handleChangePersonBirthDate(event) {
        this.setState({ person_birthdate: event.target.value });
    }



    render() {
        if (this.state.canGoBack) {
            return <Navigate to="/users" />;
        }
        return (
            <div className="py-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2 className="">Create / Edit User page</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <tbody>
                                        <tr>
                                            <th scope="col">user #</th>
                                            <td>{this.state.person_id}</td>
                                        </tr>
                                        <tr>
                                            <th scope="col">FirstName</th>
                                            <td><input type="text" className="form-control" onChange={this.handleChangePersonFirstname} value={this.state.person_firstname} /></td>
                                        </tr>
                                        <tr>
                                            <th scope="col">LastName</th>
                                            <td><input type="text" className="form-control" onChange={this.handleChangePersonLastname} value={this.state.person_lastname} /></td>
                                        </tr>
                                        <tr>
                                            <th scope="col">Birthdate</th>
                                            <td><input type="date" className="form-control" onChange={this.handleChangePersonBirthDate} value={this.state.person_birthdate} /></td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan="2" className="text-center">
                                                <button type="submit" className="btn btn-block btn-primary" onClick={this.saveUser}>Save</button>
                                            </td>

                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }




    componentDidMount() {
        if (this.props.id > 0) {
            this.fetch();
        }
    }

    fetch() {
        const params = { id: this.props.id };
        postServiceData("user", params).then((data) => {
            let user = data[0];
            let theDate = new Date(user.person_birthdate).toLocaleDateString();
            theDate = theDate.split('/').reverse().join('-');
            this.setState({ person_id: user.person_id });
            this.setState({ person_lastname: user.person_lastname });
            this.setState({ person_firstname: user.person_firstname });
            this.setState({ person_birthdate: theDate });
        });




    }



}
export default User;
