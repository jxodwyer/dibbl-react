import React from 'react';
import ReactDOM from 'react-dom';
import App from './Main';
import Router from 'react-router'
import routes from '../config/routes';

// Render the main component into the dom
Router.run(routes, function(Handler){
  React.render(<Handler /> , document.getElementById('app'));
});
