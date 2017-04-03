import React , {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import {browserHistory,Link} from 'react-router';
import AppBar from 'material-ui/AppBar';


class Feature extends Component{
    componentWillMount(){
        if(localStorage.getItem('token')) this.props. userIsSignedIn();
    }

    renderLinks(){
        if(this.props.authenticated){
            return (
                <li className="nav-item">
                    <Link className="nav-link" to="/signout">Sign Out</Link>
                </li>
            );
        }else{
            return [
                <li className="nav-item" key={2}>
                    <Link className="nav-link" to='/signup'>Sign up</Link>
                </li>,
                <li className="nav-item" key={1}>
                    <Link to='/signin' className="nav-link">Sign In</Link>
                </li>
            ];
        }
    }

    render(){

        return(



            <nav className="navbar navbar-light">

                <ul className="nav navbar-nav">
                    <li>secefret</li>
                    <li>secree</li>
                    <li>secretd</li>
                    <li>secregt</li>
                </ul>
            </nav>
        );
    }
}

function MapStateToProps(state){
    return {authenticated:state.auth.authenticated};
}
export default connect(MapStateToProps,actions)(Feature);
