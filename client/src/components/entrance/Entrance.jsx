import React, { Component } from 'react';
import Flickity from 'flickity';

class Entrance extends Component {
  componentDidMount(){
      const carousel = document.getElementById('c');
      const options = {
            contain: true,
            prevNextButtons: false,
            pageDots: true
      }

      this.flkty = new Flickity(carousel, options);
      this.flkty.on('cellSelect', this.updateSelected);
  }
  componentWillUnmount() {
      if (this.flkty) {
          this.flkty.destroy();
      }
  }
  login(){
    var teste = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        e = this.refs.e,
        p = this.refs.p;
    if(teste.test(e.value) && p.value !== '') {
      this.props.login(e.value, p.value);
    } 
    if(!teste.test(e.value)) {
      e.value = '';
      e.placeholder = 'enter a valid email';
    }
  }
  next(){
    this.flkty.next();
  }
  render() {
    return (
    	<div ref='entrance' className={this.props.entranceClasses} id="entrance">
        <button onClick={this.next.bind(this)} className='arrow-next'></button>
        <div ref='carousel' className='carousel' id='c' data-flickity='{"contain" : true, "prevNextButtons": false, "pageDots" : true}'>
            <div className="slide">
              <div>
                <img src='emoticon17.svg' alt='smile' />
                <h1>Welcome.</h1>
                <p>This app is your digital punch card for All Uniform Wear. You'll receive discounts and free gifts for purchases you make everyday.</p>
              </div>
            </div>
            <div className="slide">
              <div>
                <img src='confirm.svg' alt='smile' />
                <h1>Purchase.</h1>
                <p>As you are checking out you will use your phone's camera to scan a barcode. Each scan will advance you along the punchcard.</p>
              </div>
            </div>
            <div className="slide">
              <div>
                <img src='gift.svg' alt='smile' />
                <h1>Free Gifts.</h1>
                <p>When you arrive at a <img src='gift.svg' alt='gift'/> you will be allowed to choose a free gift! Choose from discounts, free merchandise and store credit!</p>
              </div>
            </div>
            <div ref='slideLogin' className={this.props.loginClasses} id="slideLogin">
              <div>
                <h1>Login.</h1>
                {
                  this.props.password &&
                    <h3>Incorrect Password</h3>
                }
                <div className="userinfo" id='userInfo'>
                  <input ref='e' type='text' placeholder="Email"/>
                  <input ref='p' type='password' placeholder='Password' id='password' onBlur={this.login.bind(this) }/>
                  <button className="enter-button" onClick={this.login.bind(this)}>{this.props.buttonText}</button>
                </div>
              </div>
            </div>
        </div>
    	</div>
    );
  }
}

export default Entrance;