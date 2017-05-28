import React, { Component } from 'react';

class Login extends Component {
componentDidMount(){
  	var h,
  		  p = this.refs.login;
  	if(window.innerWidth > 799) { h = 81; } else { h = 61; }
  	p.style.height = (window.innerHeight - h) + 'px';
  	window.addEventListener("resize", function(){
      if(window.innerWidth > 799) { h = 81; } else { h = 61; }
  		p.style.height = (window.innerHeight - h) + 'px';
  	});
  }
  login(){
    var teste = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        e = this.refs.e,
        p = this.refs.p,
        n = this.refs.n;
    if(teste.test(e.value) && p !== '') {
      this.props.login(e.value, p.value, n.value);
    } else {
      e.value = '';
      e.placeholder = 'enter a valid email';
      p.value = '';
    }
  }
  render() {
    return (
    	<div ref='login' className={this.props.classes} id="login">
    		<div>
          <h1>Login.</h1>
          <div className="userinfo" id='userInfo'>
          	<input ref='n' type='text' placeholder="Name"/>
          	<input ref='e' type='email' placeholder="Email"/>
          	<input ref='p' type='password' placeholder="Password"/>
          	<button onClick={this.login.bind(this)}>Go!</button>
          </div>
    		</div>
    	</div>
    );
  }
}

export default Login;
