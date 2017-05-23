import React, { Component } from 'react';

class Page extends Component {
  componentDidMount(){
  	var h,
  		  p = this.refs.page;
  	if(window.innerWidth > 799) { h = 81; } else { h = 61; }
  	p.style.height = (window.innerHeight - h) + 'px';
  	window.addEventListener("resize", function(){
      if(window.innerWidth > 799) { h = 81; } else { h = 61; }
  		p.style.height = (window.innerHeight - h) + 'px';
  	});
  }
  render() {
    return (
    	<div ref='page' className={this.props.pageClasses} id="page">
    		<div className={this.props.squareClasses[0]}>
          <div className="circle"></div>
        </div>
    		<div className={this.props.squareClasses[1]}>
          <div className="circle"></div>
        </div>
    		<div className={this.props.squareClasses[2]} id='circleGift'>
          <div className="circle gift" onClick={this.props.gift}></div>
        </div>
    		<div className={this.props.squareClasses[3]}>
          <div className="circle"></div>
        </div>
    		<div className={this.props.squareClasses[4]}>
          <div className="circle"></div>
        </div>
    		<div className={this.props.squareClasses[5]}>
          <div className="circle gift" onClick={this.props.gift}></div>
        </div>
    	</div>
    );
  }
}

export default Page;
