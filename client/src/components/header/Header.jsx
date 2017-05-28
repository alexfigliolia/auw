import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
        <header className="header" id="header">
            <div>
                <button className={this.props.iconClasses} onClick={this.props.toggleBag}></button>
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
