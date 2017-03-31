import React , {Component} from 'react';
import * as actions  from '../../actions';
import {connect} from  'react-redux';

class SignOut extends Component{
    componentWillMount(){
        this.props.signoutUser();
    }

    render(){
        return (<div>Sorry to see you go</div>);
    }

}


export default connect(null,actions)(SignOut)
