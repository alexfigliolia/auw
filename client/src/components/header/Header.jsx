import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
        <header className={this.props.classes} id="header">
            <div>
                <button className={this.props.iconClasses} onClick={this.props.toggleBag}>
                  {
                      (this.props.gift1 !== null && this.props.gift1 !== 'This gift has been used!' && this.props.gift2 !== null && this.props.gift2 !== 'This gift has been used!') ?
                        <div>2</div>

                      : (this.props.gift1 !== null && this.props.gift1 !== 'This gift has been used!') ?
                        <div>1</div>

                      : (this.props.gift2 !== null && this.props.gift2 !== 'This gift has been used!') ?
                        <div>1</div>

                      : <div></div>
                  }
                </button>
                <h1 className="logo">All Uniform Wear</h1>
                <button className="scan">
                    <input onChange={this.props.handleCode} className="get-file" type="file" accept="image/*" capture="camera" />
                </button>
            </div>
        </header>
    );
  }
}

export default Header;
