import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { reduxForm, Field } from 'redux-form';

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <fieldset>
        <label>{label}</label>
        <input className="form-control" {...input} type={type} />
        { touched && error && <span className="danger alert-danger">{error}</span>}
    </fieldset>
)

//Validation
const required = value => value ? undefined : 'Required';
const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined

class SignOut extends Component {
    handleSubmitForm({ email, password }) {
        this.props.signUpUser({ email, password });
    }

    handleAlert() {
        if (this.props.errorMessage) {
            return(
                <div className="danger alert-danger">
                    <strong>Oops! </strong> {this.props.errorMessage}
                </div>
            )
        }
    }

    render() {
        const { handleSubmit } = this.props
        return(
            <form onSubmit={handleSubmit(this.handleSubmitForm.bind(this))}>
                <Field name="email" component={renderField} type="email" label="Email: " validate={[required, email]}></Field>
                <Field name="password" component={renderField} type="password" label="Password: "></Field>
                <Field name="passwordConfirm" component={renderField} type="password" label="Confirm Password: "></Field>
                <button className="btn btn-primary btn-block">Submit</button>
                { this.handleAlert() }
            </form>
        )
    }
}

function validate(formProps) {
    const errors = {};

    if (!formProps.password) {
        errors.password = "Please enter a password"
    }

    if (!formProps.passwordConfirm) {
        errors.password = "Please enter a confirmation password"
    }

    if (formProps.password !== formProps.passwordConfirm) {
        errors.password = "Password must match";
    }
    return errors;
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.error,
    }
}

export default reduxForm({
    form: "signup",
    validate: validate
})(
    connect(mapStateToProps, actions)(SignOut)
)