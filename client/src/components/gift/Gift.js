import React, { Component } from 'react';

class Gift extends Component {
  componentDidMount(){
  	var h,
  		  p = this.refs.gift;
  	if(window.innerWidth > 799) { h = 81; } else { h = 61; }
  	p.style.height = (window.innerHeight - h) + 'px';
  	window.addEventListener("resize", function(){
      if(window.innerWidth > 799) { h = 81; } else { h = 61; }
  		p.style.height = (window.innerHeight - h) + 'px';
  	});
  }
  render() {
    return (
    	<div ref='gift' className={this.props.chooseGiftClasses} id="chooseGift">
    		<div>
          <h1>Congrats!!</h1>
          <h2>You get to choose a gift!</h2>
          <div className="arrow"></div>
          <div className="gift-choices">
            <h3 
              onClick={this.props.scaleDown} 
              data-gift="$10 off your next purchase">$10 off your next purchase</h3>
            <h3 
              onClick={this.props.scaleDown} 
              data-gift="A Coffee Thurmace">A Coffee Thurmace</h3>
            <h3 
              onClick={this.props.scaleDown} 
              data-gift="Carisma Toate Bag">Carisma Toate Bag</h3>
          </div>
        </div>
    	</div>
    );
  }
}

export default Gift;