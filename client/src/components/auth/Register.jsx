import React from "react";
import axios from "axios";
import InlineError from "../messages/InlineError";


class Register extends React.Component {

    state = {
        data: {
            name: "",
            email: "",
            password: "",
            password2: ""
        },
        errors: {},
        loading: false
    }

    onChange = (event) => {
        this.setState({data: {...this.state.data, [event.target.name]: event.target.value}})
    }

    submit = (e) => {
        e.preventDefault();
        axios.post("/api/users/register", this.state.data )
        .then(res => console.log(res.data))
        .catch(err => this.setState({errors: err.response.data}))
    }

    render () {
        const {errors} = this.state;
        return (
            <div className="register">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Sign Up</h1>
                  <p className="lead text-center">Create your DevConnector account</p>
                  <form onSubmit = {this.submit}>
                    <div className="form-group">
                      <input type="text" className="form-control form-control-lg" 
                      placeholder="Name" name="name" 
                      value = {this.state.data.name}
                      onChange = {this.onChange}
                      />
                      {errors.name && <InlineError text={errors.name} /> }
                    </div>
                    <div className="form-group">
                      <input type="email" className="form-control form-control-lg"
                       placeholder="Email Address" name="email"
                       value = {this.state.data.email}
                       onChange = {this.onChange}
                       />
                       {errors.email && <InlineError text={errors.email} />}
                      <small className="form-text text-muted">
                      This site uses Gravatar so if you want a profile image, 
                      use a Gravatar email</small>
                    </div>
                    <div className="form-group">
                      <input type="password" className="form-control form-control-lg"
                       placeholder="Password" name="password" 
                       value = {this.state.data.password}
                       onChange = {this.onChange}
                       />
                       {errors.password && <InlineError text={errors.password} />}
                    </div>
                    <div className="form-group">
                      <input type="password" className="form-control form-control-lg"
                       placeholder="Confirm Password" name="password2" 
                       value = {this.state.data.password2}
                       onChange = {this.onChange}
                       />
                       {errors.password2 && <InlineError text={errors.password2} />}
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


export default Register;