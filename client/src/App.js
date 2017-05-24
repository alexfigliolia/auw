import React, { Component } from 'react';
import Quagga from 'quagga';
import Entrance from './components/entrance/Entrance.js';
import Header from './components/header/Header';
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
      chooseGiftClasses: "choose-gift",
      savedGift1: "",
      savedGift2: "",
      giftUsing: ""
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
        numOfWorkers: 3,  // Needs to be 0 when used within node
        locate: true, // try to locate the barcode in the image
        src: URL.createObjectURL(e.target.files[0]), // or 'data:image/jpg;base64,' + data
        locator: {
            patchSize: "large",
            halfSample: false
        }
    }, function(result){
        if(result.codeResult) {
            console.log("result", result.codeResult.code);
            if(result.codeResult.code === '00786589'){
              self.scan();
              e.target.value = null;
            }
            if(result.codeResult.code === '00786590'){
              var gu = self.state.giftUsing,
                  g1 = self.state.savedGift1,
                  g2 = self.state.savedGift2;
              if(gu === g1) {
                self.setState({
                  giftUsing: "",
                  savedGift1: ""
                });
              }
              if(gu === g2) {
                self.setState({
                  giftUsing: "",
                  savedGift2: ""
                });
              }
              e.target.value = null;
            }
        } else {
            console.log("not detected");
            e.target.value = null;
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
    if(e.target.className === 'circle gift' && e.target.parentNode.className === 'square square-on') {
      console.log(e.target);
      e.target.classList.add('gift-timing');
      e.target.classList.add('gift-expload');
      setTimeout(function(){
        this.setState({
          chooseGiftClasses: "choose-gift choose-gift-show"
        });
      }.bind(this), 600);
    }
    if(e.target.className === 'circle gift gift-timing' && e.target.parentNode.className === 'square square-on') {
      console.log(e.target);
      e.target.classList.add('gift-timing');
      e.target.classList.add('gift-expload');
      setTimeout(function(){
        this.setState({
          chooseGiftClasses: "choose-gift choose-gift-show"
        });
      }.bind(this), 600);
    }
  }
  scaleDown(e){
    var d = document.getElementsByClassName('gift-expload')[0],
        g = e.target.dataset.gift === undefined? '' : e.target.dataset.gift;
        e = e.target.dataset.gift2 === undefined? '' : e.target.dataset.gift;
    this.setState({
      chooseGiftClasses: "choose-gift",
      savedGift1: g,
      savedGift2: e
    });
    d.classList.remove('gift-expload');
  }
  useGift(e){
    var sg = document.getElementsByClassName('saved-gift'),
        g = e.target.dataset.gift;
    for(var i = 0; i < sg.length; i++) {
      sg[i].classList.remove('use-the-gift');
    }
    e.target.classList.add('use-the-gift');
    this.setState({
      giftUsing: g
    });
  }
  render() {
    return (
      <div className="App">
        <Header 
          handleCode={this.handleCode.bind(this)}
          toggleBag={this.toggleBag.bind(this)}
          iconClasses={this.state.bagIconClasses}
          gift1={this.state.savedGift1}
          gift2={this.state.savedGift2} />

        <Entrance 
          login={this.login.bind(this)}
          entranceClasses={this.state.entranceClasses} />

        <Page
          pageClasses={this.state.pageClasses}
          squareClasses={this.state.squareClasses}
          gift={this.chooseGift.bind(this)} />

        <Bag
          bagClasses={this.state.bagClasses}
          toggleBag={this.toggleBag.bind(this)}
          gift1={this.state.savedGift1}
          gift2={this.state.savedGift2}
          useGift={this.useGift.bind(this)} />

        <Gift 
          chooseGiftClasses={this.state.chooseGiftClasses}
          scaleDown={this.scaleDown.bind(this)} />

      </div>
    );
  }
}

export default App;
