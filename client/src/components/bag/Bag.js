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
            {
              this.props.gift1 === '' && this.props.gift2 === '' && 
              <h2>When you arrive at a <img src="gift.svg" alt="gift" /> it will be saved in your bag</h2>
            }
            {
              this.props.gift1 !== '' &&
                <h3 className="saved-gift" data-gift={this.props.gift1} onClick={this.props.useGift}><img src="gift.svg" alt="gift" />{this.props.gift1}</h3>
            }
            {
              this.props.gift2 !== '' &&
                <h3 className="saved-gift" data-gift={this.props.gift2} onClick={this.props.useGift}><img src="gift.svg" alt="gift" />{this.props.gift2}</h3>
            }
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