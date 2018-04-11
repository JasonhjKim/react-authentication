import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';

class SignIn extends Component {
    handleSubmitForm({ email, password }) {
        console.log(email, password);
        this.props.signInUser({ email, password });
    }

    handleAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="danger alert-danger"><strong>Oops! </strong>{this.props.errorMessage}</div>
            )
        }
    }
    render() {
        const { handleSubmit } = this.props
        console.log("What the hell is going on?...");
        return(
            <form onSubmit={handleSubmit(this.handleSubmitForm.bind(this))}>
                <fieldset>
                    <label>Email: </label>
                    <Field component="input" name="email" type="email" className="form-control"/>
                </fieldset>
                <fieldset>
                    <label>Password: </label>
                    <Field component="input" name="password" type="password" className="form-control"/>
                </fieldset>
                <button className="btn btn-block btn-outline-primary">Sign In</button>
                { this.handleAlert() }
            </form>
        )
    }   
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.error
    }
}

export default reduxForm({
    form: 'signin'
})(
    connect(mapStateToProps, actions)(SignIn)
)