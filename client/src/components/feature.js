import React , {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';




class Feature extends Component{
    componentDidMount(){
        this.props.fetchMessage();
    }


    render(){
        return(
            <div>{this.props.message}</div>
        );
    }
}

function MapStateToProps(state){
    return {message:state.auth.message};
}

export default connect(MapStateToProps,actions)(Feature);
