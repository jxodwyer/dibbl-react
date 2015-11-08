var React = require('react');
var Authenticated = require('../../utils/authenticated');
var Router = require('react-router');
var Firebase = require('firebase');
var forge = "https://dibbl.firebaseio.com/"; //YOUR FIREBASE URL HERE
var ref = new Firebase(forge);
require('normalize.css');
require('styles/App.css');
require('styles/Account.scss');

var Account = React.createClass({
  mixins: [Authenticated],
  render: function(){
    return (
      <div id="search">
        hi
      </div>
   );
  }
});

module.exports = Account;
