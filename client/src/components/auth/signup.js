import React , {Component} from 'react';
import * as actions  from '../../actions';
import {connect} from  'react-redux';
import {Field,reduxForm} from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import TextField from 'material-ui/TextField';
import {
    TextField
} from 'redux-form-material-ui';



class SignUp extends Component{
    componentWillMount(){
        this.props.wipeError();
    }
    handleFormSubmit(formProps){
        console.log('form submitted');
        this.props.signUpUser(formProps)

    }
    renderAlert(error){
        if(this.props.errorMessage){
            return (
            <div className="alert alert-danger">
                <strong>Oops!</strong> {this.props.errorMessage}
            </div>
            );
        }
    }

    render(){
        const {handleSubmit} = this.props;
        return (
                <form style={{}} onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                    <fieldset>
                        <Field name="email" component={TextField} floatingLabelText="email" />
                    </fieldset>
                    <fieldset>
                        <Field name="password" component={TextField} floatingLabelText="Password" ></Field>
                    </fieldset>
                    <fieldset>
                        <Field name="passwordConfirm" component={TextField} floatingLabelText="password confirm" ></Field>
                    </fieldset>
                    {this.renderAlert(this.props.error)}
                    <RaisedButton type="submit" style={{marginTop:10}} label="Sign Up" primary={true} />
                </form>
        );
    }
}

function validate(formProps){
    const errors={};
    ['email','password','passwordConfirm']
    .map((item)=>{
        if(!formProps[item])errors[item]=`Please enter a ${item}`;
    });

    if(formProps.password !== formProps.passwordConfirm){
        errors.password='passwords must match'
    }

    return errors;
}

const form= reduxForm ({form:'signup',validate})(SignUp)
export default connect(state=>{return {errorMessage:state.auth.error}},actions)(form)
