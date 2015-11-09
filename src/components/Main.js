var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var firebaseUtils = require('../utils/firebaseUtils');
var Header = require('./Header.js');

var Main = React.createClass({
  render: function(){
    return (
      <span>
        <Header />
        <div className="container" id="page-container">
          <div className="row">
            <RouteHandler />
          </div>
        </div>
      </span>
    )
  }
});

module.exports = Main;
