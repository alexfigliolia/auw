import React, { Component } from 'react';

class ErrorOverlay extends Component {
  render() {
    return (
    	<div className={this.props.classes} id="error">
    		<div>
          <h1>Please try scanning again</h1>
          <p>from approximated 5 inches away and with focus</p>
    		</div>
    	</div>
    );
  }
}

export default ErrorOverlay;