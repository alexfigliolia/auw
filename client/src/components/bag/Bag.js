import React, { Component } from 'react';

class Bag extends Component {
  componentDidMount(){
    var h,
        p = this.refs.bagOverlay;
    if(window.innerWidth > 799) { h = 81; } else { h = 61; }
    p.style.height = (window.innerHeight - h) + 'px';
    window.addEventListener("resize", function(){
      if(window.innerWidth > 799) { h = 81; } else { h = 61; }
      p.style.height = (window.innerHeight - h) + 'px';
    });
  }
  render() {
    return (
    	<div ref="bagOverlay" className={this.props.bagClasses} id="bag">
    		<div>
          <h1>Your <img src="gift.svg" alt="gift" />'s.</h1>
          <div className='saved-gifts'>
            <h2>When you arrive at a <img src="gift.svg" alt="gift" /> it will be saved in your bag</h2>
          </div>
          <button 
            className="close-bag"
            onClick={this.props.toggleBag}>Back to Punchcard</button>
    		</div>
    	</div>
    );
  }
}

export default Bag;