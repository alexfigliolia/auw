import React, { Component } from 'react';
import Quagga from 'quagga';
import Entrance from './components/entrance/Entrance.js';
import Header from './components/header/Header';
// import Login from './components/login/Login';
import Page from './components/page/Page';
import Bag from './components/bag/Bag';
import Gift from './components/gift/Gift';
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
      scanned : 2,
      loginClasses: "login",
      pageClasses: "page page-show",
      entranceClasses: "entrance",
      bagToggle: true,
      bagClasses: "bag-overlay",
      bagIconClasses: "bag",
      chooseGiftClasses: "choose-gift"
    }
  }

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
  login(e, p){
    console.log(e + ' ' + p);
    this.setState({
      loginClasses: "login login-hide",
      pageClasses: "page page-show",
      entranceClasses: "entrance entrance-hide"
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
  toggleBag(){
    if(this.state.bagToggle === true) {
      this.setState({
        bagToggle: false,
        bagClasses: "bag-overlay bag-overlay-show",
        bagIconClasses: "bag bag-rotate"
      });
    } else {
      this.setState({
        bagToggle: true,
        bagClasses: "bag-overlay",
        bagIconClasses: "bag"
      });
    }
  }
  chooseGift(e){
    if(e.target.className === 'circle gift' && 
       e.target.parentNode.className === 'square square-on' ||
       e.target.className === 'circle gift gift-timing' &&
       e.target.parentNode.className === 'square square-on' ) {
      console.log(e.target);
      e.target.classList.add('gift-timing');
      e.target.classList.add('gift-expload');
      setTimeout(function(){
        this.setState({
          chooseGiftClasses: "choose-gift choose-gift-show"
        });
      }.bind(this), 800);
    }
  }
  scaleDown(){
    var d = document.getElementsByClassName('gift-expload')[0];
    console.log(d);
    this.setState({
      chooseGiftClasses: "choose-gift"
    });
    d.classList.remove('gift-expload');
  }
  render() {
    return (
      <div className="App">
        <Header 
          handleCode={this.handleCode.bind(this)}
          toggleBag={this.toggleBag.bind(this)}
          iconClasses={this.state.bagIconClasses} />

        <Entrance 
          login={this.login.bind(this)}
          entranceClasses={this.state.entranceClasses} />

        <Page
          pageClasses={this.state.pageClasses}
          squareClasses={this.state.squareClasses}
          gift={this.chooseGift.bind(this)} />

        <Bag
          bagClasses={this.state.bagClasses}
          toggleBag={this.toggleBag.bind(this)} />

        <Gift 
          chooseGiftClasses={this.state.chooseGiftClasses}
          scaleDown={this.scaleDown.bind(this)} />

      </div>
    );
  }
}

export default App;
