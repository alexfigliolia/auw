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
            {
              (this.props.whichGift)
                ? <div>
                    <h3 
                      className='gift1'
                      onClick={this.props.scaleDown} 
                      data-gift="Carisma Tote Bag">Carisma Tote Bag</h3>
                    <h3 
                      className='gift1'
                      onClick={this.props.scaleDown} 
                      data-gift="Free Name Embroidery">Free Name Embroidery</h3>
                    <h3 
                      className='gift1'
                      onClick={this.props.scaleDown} 
                      data-gift="$10 Gift Card">$10 Gift Card</h3>                    
                  </div>
                : <div>
                    <h3 
                      className='gift2'
                      onClick={this.props.scaleDown} 
                      data-gift2="Free Scrub Top">Free Scrub Top</h3>
                    <h3 
                      className='gift2'
                      onClick={this.props.scaleDown} 
                      data-gift2="Barco Gym Bag">Barco Gym Bag</h3>
                    <h3  
                      className='gift2'
                      onClick={this.props.scaleDown} 
                      data-gift2="$20 Gift Card">$20 Gift Card</h3>
                  </div>
            }
          </div>
        </div>
    	</div>
    );
  }
}

export default Gift;