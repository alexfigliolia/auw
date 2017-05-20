import React, { Component } from 'react';
import Header from './header/Header';
import Login from './login/Login';
import Page from './page/Page';
import '../main.css';

class App extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		squareClasses : [
  			"square",
  			"square",
  			"square",
  			"square",
  			"square",
  			"square"
  		],
  		scanned : 2,
      loginClasses: "login",
      pageClasses: "page"
  	}
  }

  // componentDidMount(){
  // 	this.getSpot();
  // }

  getSpot(){
  	var squareOn = this.state.scanned;
  	var classes = this.state.squareClasses;
  	classes[squareOn] = 'square square-on';
  	for(var i = 0; i < squareOn; i++) {
  		classes[i] = 'square square-complete'
  	}
    this.setState({
      squareClasses : classes
    });
  }
  scan(){
  	var s = this.state.scanned + 1;
  	console.log(s);
  	this.setState({
  		scanned: s
  	});
    this.getSpot();
  }
  login(){
    this.setState({
      loginClasses: "login login-hide",
      pageClasses: "page page-show"
    });
    setTimeout(function(){
      this.getSpot();
    }.bind(this), 600);
  }
  render() {
    return (
      <div className="App">
        <Header />

        <Login 
          classes={this.state.loginClasses}
          login={this.login.bind(this)} />

        <Page
          pageClasses={this.state.pageClasses}
          squareClasses={this.state.squareClasses} />

      </div>
    );
  }
}

export default App;
