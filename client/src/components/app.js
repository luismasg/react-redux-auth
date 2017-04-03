import React, { Component } from 'react';
import Header from './header';
import Signin from './auth/signin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


export default class App extends Component {
  render() {


    return (
            <MuiThemeProvider>
                <div>
                    <Header />
                    {this.props.children}
                </div>
            </MuiThemeProvider>
    );
  }
}
