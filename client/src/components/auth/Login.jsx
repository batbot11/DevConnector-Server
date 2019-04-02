import React from "react";
import {connect} from "react-redux";
import {login} from "../actions/authActions";
import InlineError from "../messages/InlineError";

class Login extends React.Component {

    state = {
        data: {
            email: "",
            password: ""
        },
        errors: {},
        loading: false
    }

    onChange = (event) => {
        this.setState({data: {...this.state.data, [event.target.name]: event.target.value}});
    }


    submit = (e) => {
        e.preventDefault();
        this.props.login(this.state.data).then(() => this.props.history.push("/dashboard"))
        .catch(err => this.setState({errors: err.response.data}))
    }

    render () {
      const {errors} = this.state;
        return (
            <div className="login">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Log In</h1>
                  <p className="lead text-center">Sign in to your DevConnector account</p>
                  <form onSubmit = {this.submit}>
                    <div className="form-group">
                      <input type="email" className="form-control form-control-lg"
                       placeholder="Email Address" name="email" 
                       value = {this.state.data.email}
                       onChange = {this.onChange}
                       />
                       {errors.email && <InlineError text={errors.email} />}
                    </div>
                    <div className="form-group">
                      <input type="password" className="form-control form-control-lg"
                       placeholder="Password" name="password"
                       value = {this.state.data.password}
                       onChange = {this.onChange}
                       />
                       {errors.password && <InlineError text={errors.password} />}
                    </div>
                    <input type="submit" className="btn btn-info btn-block mt-4" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        
        )
    }
}


export default connect(null, {login})(Login);