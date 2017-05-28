import React, { Component } from 'react';

class Page extends Component {
  render() {
    return (
    	<div ref='page' className={this.props.pageClasses} id="page">
    		<div className={this.props.squareClasses[0]}>
          <div className="circle"></div>
        </div>
    		<div className={this.props.squareClasses[1]}>
          <div className="circle"></div>
        </div>
    		<div className={this.props.squareClasses[2]} id='circleGift1'>
          <div className="circle gift" onClick={this.props.gift}></div>
        </div>
    		<div className={this.props.squareClasses[3]}>
          <div className="circle"></div>
        </div>
    		<div className={this.props.squareClasses[4]}>
          <div className="circle"></div>
        </div>
    		<div className={this.props.squareClasses[5]} id='circleGift2'>
          <div className="circle gift" onClick={this.props.gift}></div>
        </div>
    	</div>
    );
  }
}

export default Page;
