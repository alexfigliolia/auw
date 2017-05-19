import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
    	<header className="header" id="header">
    		<div>
    			<h1 className="logo">All Uniform Wear</h1>
    			<div className="scan"></div>
    		</div>
    	</header>
    );
  }
}

export default Header;
