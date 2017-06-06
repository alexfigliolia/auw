import React, { Component } from 'react';

class ErrorOverlay extends Component {
  render() {
    return (
    	<div className={this.props.classes} id="error">
    		<div>
          <img src="cancel.svg" alt="error" />
          <h1>Please try scanning again</h1>
          <p>from approximated 5 inches away and with focus</p>
          <button onClick={this.props.tryAgain}>Ok</button>
    		</div>
    	</div>
    );
  }
}

export default ErrorOverlay;