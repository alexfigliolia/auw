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
  render() {
    return (
    	<div ref='login' className={this.props.classes} id="login">
    		<div>
          <h1>Login.</h1>
          <div className="userinfo" id='userInfo'>
          	<input type='text' placeholder="Name"/>
          	<input type='text' placeholder="Email"/>
          	<input type='text' placeholder="Password"/>
          	<button onClick={this.props.login}>Go!</button>
          </div>
    		</div>
    	</div>
    );
  }
}

export default Login;
