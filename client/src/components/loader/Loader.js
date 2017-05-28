import React, { Component } from 'react';

class Loader extends Component {
  render() {
    return (
    	<div ref='Loader' className={(this.props.scanned === null)? 'loader' : 'loader loader-hide'} id="loader">
    		<div>
          <div className="spinner" id='spinner'></div>
          <h1>Loading.</h1>
    		</div>
    	</div>
    );
  }
}

export default Loader;
