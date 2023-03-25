import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { postServiceData } from "./util";



class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {canLogin: false , login:"", pass:""};

        this.handleChangeLogin = this.handleChangeLogin.bind(this);
        this.handleChangePass = this.handleChangePass.bind(this);
        this.checkLogin = this.checkLogin.bind(this);
    }

    handleChangeLogin(event) {
        this.setState({login: event.target.value});

    }
    handleChangePass(event) {
        this.setState({pass: event.target.value});
    }

    checkLogin(event){
        event.preventDefault();
        const params = {login: this.state.login, passwd: this.state.pass};
        postServiceData("authenticate", params).then((data) => {
        if (data.ok === 1) {
            this.setState({canLogin: true});
        }
        });
    }





    render() {
        this.props.removeToken();
        if (this.state.canLogin) {
            this.props.setToken("Platasou was here!")
            return <Navigate push to="/users" />;
            }
            
        return (
            <div className="py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2 className="">Library Login</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <form id="c_form-h" onSubmit={this.checkLogin}>
                                <div className="form-group row">
                                    <div className="col-2">
                                        <label htmlFor="inputlogin" className="col-2 col-form-label">Login</label>
                                    </div>
                                    <div className="col-10">
                                        <input type="text" onChange={this.handleChangeLogin} value={this.state.login}   className="form-control" id="inputlogin" name="myLogin" 
                                            placeholder="login" required="required" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-2">
                                        <label htmlFor="inputpassword" className="form-label">password</label>
                                    </div>
                                    <div className="col-10">
                                        <p>
                                            <input type="password" onChange={this.handleChangePass} value={this.state.pass} className="form-control" id="inputpassword" name="myPasswd" placeholder="password" required="required" />
                                        </p>
                                        <p><button type="submit" className="btn btn-success">Submit</button> </p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Login;