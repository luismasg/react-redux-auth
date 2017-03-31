import React , {Component} from 'react';
import * as actions  from '../../actions';
import {connect} from  'react-redux';
import {Field,reduxForm} from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  TextField
} from 'redux-form-material-ui';

class SignUp extends Component{
    componentWillMount(){
        this.props.signoutUser();
    }
    handleFormSubmit({email,password1,password2}){
        // console.log(form);
        // if(password1 === password2){
        //     console.log('passwords match');
        //     this.props.signUpUser({email:email,password:password1})
        // }
    }

    render(){
        const {handleSubmit} = this.props;
        return (
             <MuiThemeProvider>
                 <form style={{}} onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                     <fieldset>
                         <Field    name="email" component={TextField} floatingLabelText="Username" />
                     </fieldset>
                     <fieldset>
                         <Field name="password1" component={TextField} floatingLabelText="Password" ></Field>
                         {console.log(this.props)}
                     </fieldset>
                     <fieldset>
                         <Field name="password2" component={TextField} floatingLabelText="password confirm" ></Field>
                     </fieldset>
                     <RaisedButton type="submit" style={{marginTop:10}} label="Sign Up" primary={true} />
                 </form>
             </MuiThemeProvider>
        );
    }

}

function validate(formProps){
    const errors={};
     if(formProps.password !== formProps.password2){
         errors.password='passwords must m'
     }
    return errors;
}

const form= reduxForm ({form:'signup',validate})(SignUp)
export default connect(null,actions)(form)
