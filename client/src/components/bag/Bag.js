import React, { Component } from 'react';

class Bag extends Component {
  render() {
    return (
    	<div ref="bagOverlay" className={this.props.bagClasses} id="bag">
    		<div>
          <h1>Your <img src="gift.svg" alt="gift" />'s.</h1>
          <div className='saved-gifts'>
            {
              this.props.gift1 === null && this.props.gift2 === null && 
                <h2>When you arrive at a <img src="gift.svg" alt="gift" /> it will be saved in your bag</h2>
            }
            {
              this.props.gift1 !== null && this.props.gift1 !== 'This gift has been used!' &&
                <h3 className="saved-gift" data-gift={this.props.gift1} onClick={this.props.useGift}><img src="gift.svg" alt="gift" />{this.props.gift1}</h3>
            }
            {
              this.props.gift2 !== null && this.props.gift2 !== 'This gift has been used!' &&
                <h3 className="saved-gift" data-gift={this.props.gift2} onClick={this.props.useGift}><img src="gift.svg" alt="gift" />{this.props.gift2}</h3>
            }
            {
              this.props.gift1 === 'This gift has been used!' && this.props.gift2 === null && 
                <h2>When you arrive at a <img src="gift.svg" alt="gift" /> it will be saved in your bag</h2>
            }
            {
              this.props.gift1 === 'This gift has been used!' && this.props.gift2 === 'This gift has been used!' && 
                <h2>When you arrive at a <img src="gift.svg" alt="gift" /> it will be saved in your bag</h2>
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