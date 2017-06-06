import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import App from './src/App.jsx';
import '../startup/accounts-config.js';
 
Meteor.startup(() => {
  if(Meteor.isCordova) {
	StatusBar.hide();
  }
  render(<App />, document.getElementById('root'));
});

