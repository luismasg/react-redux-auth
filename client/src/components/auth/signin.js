import React , {Component} from 'react';
import {Field,reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import axios from 'axios';
import * as actions from '../../actions';


class Signin extends Component{

    handleFormSubmit({email,password}){
        if(email && password){
            this.props.signinUser({email,password});
        }else{
            console.log('password error');
        }
    }
    renderAlert(){
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
        // console.log(this.props);
        return (

            <form onSubmit = {handleSubmit(this.handleFormSubmit.bind(this))} >

                <fieldset className="form-group">
                    <label htmlFor="Email">Email:</label>
                    <Field  className="form-control" name="email" component="input" type="text"></Field>
                </fieldset>
                <fieldset className="form-group">
                    <label htmlFor="Password">password:</label>
                    <Field className="form-control" name="password" component="input" type="password"></Field>
                    {this.renderAlert()}
                    <button action="submit" style={{margin:'20px 0'}} className="btn btn-primary">Sign in</button>
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
