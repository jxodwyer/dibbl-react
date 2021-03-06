import React from 'react';
import Authenticated from '../../utils/authenticated';
import Router from 'react-router';
import Firebase from 'firebase';


var Link = Router.Link;
var forge = "https://dibbl.firebaseio.com/"; //YOUR FIREBASE URL HERE
var ref = new Firebase(forge);
require('normalize.css');
require('styles/App.scss');
require('styles/Search.scss');

var Discovery = React.createClass({
  mixins: [Authenticated],
  getInitialState: function(){
    return {searchResults: [], query: ''};
  },
  onChange: function(e) {
    this.setState({query: e.target.value});
  },
  handleSubmit: function(e){
    e.preventDefault();
    var searchResults = [];
    ref.child('users').on("child_added", function(snapshot){
      var user = snapshot.val();
      var skills = user.skills;
      if (skills != null) {
        if (skills.indexOf(this.state.query) >= 0) {
          searchResults.push(user);
          this.setState({
            searchResults: searchResults,
            query: ''
          });
        };
      };
    }.bind(this));
  },
  render: function(){
    var skillNodes = function(index) {
      return (
        <span>{index}</span>
      )
    };
    var userBlock = function(index) {
      return (
        <div className="userInfo">
          <span className="glyphicon glyphicon-heart faveIcon" aria-hidden="true"></span>
          <h5 className="userName">{index.firstname} {index.lastname}</h5>
          <div className="rating">
            <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
            <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
            <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
            <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
            <span className="glyphicon glyphicon-star-empty" aria-hidden="true"></span>
          </div>
          <h5 className="userFee">${index.fee.toFixed(2)} / min</h5>
          <div className="userSkills">
            {index.skills.map(skillNodes)}
          </div>
          <p className="userBio">All this fancy schmancy stuff about this person.</p>
          <Link to="room"><button className="connectButton">CONNECT NOW</button></Link>
          <p className="bookLater"><a>or, schedule a call for later >></a></p>
        </div>
      )
    };
    return (
      <div id="search">
        <form id="searchForm" onSubmit={this.handleSubmit}>
          <h2>I'd like to speak to an industry leader about</h2><br />
          <input id="query" placeholder="fill in the blank" width="100%" className="gray-box" onChange={this.onChange} value={this.state.query} />
          <h2>for</h2>
          <input id="query-time" type="number" step="5" min="5" max="20" value="10" width="30px" className="gray-box" />
          <h2>minutes.</h2>
          <input type="submit" value="GO" className="querySubmit" />
        </form>
        <hr />
        {this.state.searchResults.map(userBlock)}
      </div>
   );
  }
});

module.exports = Discovery;
