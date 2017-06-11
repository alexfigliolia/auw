import React, { Component } from 'react';

class Loader extends Component {
  render() {
    return (
    	<div className={this.props.classes}>
    		<div>
          		<div className="spinner">
          			<img src="auw-small.jpg" alt="logo" />
          		</div>
    		</div>
    	</div>
    );
  }
}

export default Loader;
