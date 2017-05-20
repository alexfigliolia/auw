import React, { Component } from 'react';
import Quagga from 'quagga';
import Header from './components/header/Header';
import Login from './components/login/Login';
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
  		scanned : 0,
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
    setTimeout(function(){
      this.getSpot();
    }.bind(this), 200);
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
  handleCode(e){
    e.persist()
    var self = this;
    var bc = e.target.files[0].name;
    console.log(bc);
    Quagga.decodeSingle({
        decoder: {
            readers: ["code_128_reader"] // List of active readers
        },
        locate: true, // try to locate the barcode in the image
        src: URL.createObjectURL(e.target.files[0]) // or 'data:image/jpg;base64,' + data
    }, function(result){
        if(result.codeResult) {
            console.log("result", result.codeResult.code);
            if(result.codeResult.code === '0001285112001000040801'){
              self.scan();
              e.target.value = null;
            }
        } else {
            console.log("not detected");
        }
    });
  }
  render() {
    return (
      <div className="App">
        <Header 
          handleCode={this.handleCode.bind(this)} />

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