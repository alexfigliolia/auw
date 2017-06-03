import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor'
import Quagga from 'quagga';
import Entrance from './components/entrance/Entrance.jsx';
import Header from './components/header/Header.jsx';
import Page from './components/page/Page.jsx';
import Bag from './components/bag/Bag.jsx';
import Gift from './components/gift/Gift.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squareClasses : ["square", "square", "square", "square", "square", "square"],
      scanned : null,
      loginClasses: "login",
      pageClasses: "page",
      entranceClasses: "entrance",
      bagToggle: true,
      bagClasses: "bag-overlay",
      bagIconClasses: "bag",
      chooseGiftClasses: "choose-gift",
      savedGift1: null,
      savedGift2: null,
      giftUsing: "",
      firstGift: true,
      wrongPassword: null,
      enterClasses: 'enter-button',
      users: this.getMeteorData()
    }
  }
  getMeteorData(){
    var self = this;
    Meteor.subscribe('userData', function(){
      if(Meteor.user() !== null && Meteor.user() !== undefined) {
        var s = Meteor.user();
        self.setState({
          scanned: s.spot,
          savedGift1: s.savedGift1,
          savedGift2: s.savedGift2
        });
        setTimeout(function(){
          self.handleSub();
        }.bind(self), 1000);
        console.log(s);
      } 
    });
    return { isAuthenticated: Meteor.userId() !== null };
  }
  componentDidMount(){
    if (!this.state.users.isAuthenticated) {
      console.log('not authenticated on load');
      this.setState({
        entranceClasses: "entrance"
      });
    } else {
      this.setState({
        loginClasses: "login login-hide",
        pageClasses: "page page-show",
        entranceClasses: "entrance entrance-hide"
      });
    }
  }
  handleSub(){
    if (!this.state.users.isAuthenticated) {
      console.log('not authenticated on load');
    } else {
      console.log('authenticated on load');
      this.getSpot();
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
    if(s === 3 && this.state.savedGift1 === null) {
      var g = document.getElementsByClassName('gift')[0];
      g.classList.add('gift-timing');
      g.classList.add('gift-expload');
      if(g.parentNode.id !== 'circleGift1'){
        this.setState({
          firstGift: false
        });
      }
      setTimeout(function(){
        this.setState({
          chooseGiftClasses: "choose-gift choose-gift-show"
        });
      }.bind(this), 600);
    } else if(s === 6 && this.state.savedGift2 === null){
      var g = document.getElementsByClassName('gift')[1];
      g.classList.add('gift-timing');
      g.classList.add('gift-expload');
      if(g.parentNode.id !== 'circleGift1'){
        this.setState({
          firstGift: false
        });
      }
      setTimeout(function(){
        this.setState({
          chooseGiftClasses: "choose-gift choose-gift-show"
        });
      }.bind(this), 600);
    } else {
      s = parseInt(s);
      this.setState({
        scanned: s
      });
      setTimeout(function(){
        this.getSpot();
      }.bind(this), 200);
      var i = Meteor.userId();
      Meteor.call('user.updateSpot', i, s);
    }
  }
  login(e, p){
    this.setState({
      wrongPassword: null,
      enterClasses: 'enter-button enter-loading'
    });
    Meteor.loginWithPassword(e, p, (err) => {
      if(err){
        // console.log(err.reason);
        if(err.reason === 'Incorrect password') {
          this.setState({
            wrongPassword: true,
            enterClasses: 'enter-button'
          });
          document.getElementById('password').value = '';
        }
        if(err.reason === 'User not found') {
          Accounts.createUser({email: e, spot: 0, password: p}, (err) => {
            if(err){
              // console.log(err.reason);
            } else {
              // console.log('creating new user');
              Meteor.loginWithPassword(e, p, (err) => {
                if(err) {
                  console.log(err.reason);
                } else {
                  // console.log(this.state.users);
                  // console.log('logging in new user');
                  this.setBoard();
                  setTimeout(function(){
                    this.getSpot();
                    this.setState({
                      wrongPassword: null,
                      enterClasses: 'enter-button'
                    });
                  }.bind(this), 600);
                }
              });
            }
          });
        }
      } else {
        if (!this.state.users.isAuthenticated) {
          // console.log(this.state.users);
        } else {
          // console.log(this.state.users);
        }
        this.setBoard();
        setTimeout(function(){
          this.getSpot();
          this.setState({
            wrongPassword: null,
            enterClasses: 'enter-button'
          });
        }.bind(this), 600);
      }
    });
  }
  handleCode(e){
    e.persist()
    var self = this;
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
                  giftUsing: ""
                });
                self.removeGift(0);
              }
              if(gu === g2) {
                self.setState({
                  giftUsing: ""
                });
                self.removeGift(1);
              }
              e.target.value = null;
            }
        } else {
            e.target.value = null;
        }
    });
  }
  removeGift(number){
    var user = Meteor.userId();
    Meteor.call('user.useGift', user, number);
    var d = document.getElementsByClassName('gift')[number];
    d.classList.add('no-click');
    if(number === 0) {
      this.setState({
        firstGift: false,
        savedGift1: 'This gift has been used!'
      });
    } else {
      this.setState({
        firstGift: false,
        savedGift2: 'This gift has been used!'
      });
    }
  }
  saveGift(gift, number) {
    var user = Meteor.userId();
    Meteor.call('user.saveGift', user, gift, number);
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
      e.target.classList.add('gift-timing');
      e.target.classList.add('gift-expload');
      if(e.target.parentNode.id !== 'circleGift1'){
        this.setState({
          firstGift: false
        });
      }
      setTimeout(function(){
        this.setState({
          chooseGiftClasses: "choose-gift choose-gift-show"
        });
      }.bind(this), 800);
    }
    if(e.target.className === 'circle gift gift-timing' && e.target.parentNode.className === 'square square-on') {
      e.target.classList.add('gift-timing');
      e.target.classList.add('gift-expload');
      if(e.target.parentNode.id !== 'circleGift1'){
        this.setState({
          firstGift: false
        });
      }
      setTimeout(function(){
        this.setState({
          chooseGiftClasses: "choose-gift choose-gift-show"
        });
      }.bind(this), 800);
    }
  }
  scaleDown(e){
    var d = document.getElementsByClassName('gift-expload')[0],
        g;
    if(e.target.className === 'gift1') {
      g = e.target.dataset.gift;
      this.setState({
        chooseGiftClasses: "choose-gift",
        savedGift1: g,
      });
      this.saveGift(g, 0);
    }
    if(e.target.className === 'gift2') {
      g = e.target.dataset.gift2;
      this.setState({
        chooseGiftClasses: "choose-gift",
        savedGift2: g,
      });
      this.saveGift(g, 1);
    }
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
  setBoard(){
    this.setState({
      scanned: Meteor.user().spot,
      loginClasses: "login login-hide",
      pageClasses: "page page-show",
      entranceClasses: "entrance entrance-hide"
    }); 
  }
  render() {
    return (
      <div className="App">

      <Entrance 
          login={this.login.bind(this)}
          entranceClasses={this.state.entranceClasses}
          scanned={this.state.scanned}
          password={this.state.wrongPassword}
          buttonClasses={this.state.enterClasses} />

        <Header 
          handleCode={this.handleCode.bind(this)}
          toggleBag={this.toggleBag.bind(this)}
          iconClasses={this.state.bagIconClasses}
          gift1={this.state.savedGift1}
          gift2={this.state.savedGift2} />

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
          scaleDown={this.scaleDown.bind(this)}
          whichGift={this.state.firstGift} />

      </div>
    );
  }
}

export default App;
