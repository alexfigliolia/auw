import React, { Component } from 'react';
import Header from './components/header/Header';
import Page from './components/page/Page';
import './App.css';

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
  		scanned : 2
  	}
  }

  componentDidMount(){
  	this.getSpot();
  }

  getSpot(){
  	var squareOn = this.state.scanned;
  	var classes = this.state.squareClasses;
  	classes[squareOn] = 'square square-on';
  	for(var i = 0; i < squareOn; i++) {
  		classes[i] = 'square square-complete'
  	}
  	setTimeout(function(){
      this.setState({
        squareClasses : classes
      });
    }.bind(this), 1000);
  }
  scan(){
  	var s = this.state.scanned + 1;
  	console.log(s);
  	this.setState({
  		scanned: s
  	});
  }
  render() {
    return (
      <div className="App">
        <Header />
        <Page 
        	squareClasses={this.state.squareClasses} />
      </div>
    );
  }
}

export default App;
