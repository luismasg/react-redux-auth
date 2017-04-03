import React , {Component} from 'react';
import {Field,reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import axios from 'axios';
import * as actions from '../../actions';
import {
    TextField
} from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';


class Signin extends Component{
    componentWillMount(){
        this.props.wipeError();
    }
    handleFormSubmit({email,password}){
        if(email && password){
            this.props.signinUser({email,password});

        }else{
            console.log('provide email and pasword');
        }
    }
    renderAlert(){
        // console.log('this touched');
        if(this.props.errorMessage){
            return (
                <div className="alert alert-danger" style={{marginTop:'10px'}}>
                    <strong>oops!</strong> {this.props.errorMessage}
                </div>
            );
        }
    }

    render(){
        const {handleSubmit}=this.props;

        return (

            <form onSubmit = {handleSubmit(this.handleFormSubmit.bind(this))} >

                <fieldset className="form-group">
                    <Field  name="email" component={TextField} type="text" floatingLabelText="email" ></Field>
                </fieldset>
                <fieldset className="form-group">
                    <Field  name="password" component={TextField} type="password" floatingLabelText="email" ></Field>
                    {this.renderAlert(this.props.errorMessage)}
                    <div> <RaisedButton type="submit" style={{marginTop:10}} label="Sign In" primary={true} /> </div>
                </fieldset>
            </form>
        );
    }
}

// function mapStateToProps(state){
//     return {errorMessage:state.auth.error}
// }
const form =reduxForm({ form:'signin', fields:['email','password'] })(Signin);
export default  connect(state=>{return {errorMessage:state.auth.error}},actions)( form  );












// class Signin extends Component{
//
//
//         handleFormSubmit({email,password}){
//             console.log(`email is: ${email} and password is: ${password}`);
//
//         }
//
//     render(){
//         const {handleSubmit}=this.props;
//         return (
//             <form onSubmit = {handleSubmit(this.handleFormSubmit.bind(this))} >
//                 <fieldset className="form-group">
//                     <label>Email:</label>
//                     <Field  className="form-control" name="email" component="input" type="text"></Field>
//                 </fieldset>
//                 <fieldset className="form-group">
//                     <label>password:</label>
//                     <Field className="form-control" name="password" component="input" type="text"></Field>
//                     <button action="submit" className="btn btn-primary">Sign in</button>
//                 </fieldset>
//             </form>
//         );
//     }
// }
//
//
// export default  reduxForm({
//     form:'signin',
//     fields:['email','password']
// })(Signin) ;
