import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
    	<header className="header" id="header">
    		<div>
    			<h1 className="logo">All Uniform Wear</h1>
    			<div className="scan"></div>
                <input className="get-file" type="file" accept="image/*" capture="camera" />
    		</div>
    	</header>
    );
  }
}

export default Header;
