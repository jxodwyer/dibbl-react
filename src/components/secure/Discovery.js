var React = require('react');
var Authenticated = require('../../utils/authenticated');
var Router = require('react-router');
var Firebase = require('firebase');
var forge = "https://dibbl.firebaseio.com/"; //YOUR FIREBASE URL HERE
var ref = new Firebase(forge);
var searchResults = [];


var Discovery = React.createClass({
  mixins: [Authenticated],
  getInitialState: function(){
    return {searchResults: []};
  },
  handleSearch: function(e){
    e.preventDefault();
    var query = "computer";
    ref.child('users').on("child_added", function(snapshot){
      var user = snapshot.val();
      var skills = user.skills;
      if (skills.indexOf(query) >= 0) {
        searchResults.push(user);
        console.log('1', searchResults);
        this.setState({
          searchResults: searchResults,
        });
      };
    }.bind(this));
  },
  render: function(){
    console.log('2', this.state.searchResults);
    var userBlock = function(index) {
      return (
        <div>
          <h4>{index.firstname} {index.lastname}</h4>
        </div>
      )
    };
    return (
      <div>
        <form id="searchForm" onSubmit={this.handleSearch}>
          <input type="text"></input>
          <input type="submit"></input>
        </form>
        {this.state.searchResults.map(userBlock)}
      </div>
   );
  }
});

module.exports = Discovery;
