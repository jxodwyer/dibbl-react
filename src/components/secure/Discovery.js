var React = require('react');
var Authenticated = require('../../utils/authenticated');
var Router = require('react-router');
var Firebase = require('firebase');
var forge = "https://dibbl.firebaseio.com/"; //YOUR FIREBASE URL HERE
var ref = new Firebase(forge);

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
      if (skills.indexOf(this.state.query) >= 0) {
        searchResults.push(user);
        this.setState({
          searchResults: searchResults,
          query: ''
        });
      };
    }.bind(this));
  },
  render: function(){
    var userBlock = function(index) {
      return (
        <div>
          <h4>{index.firstname} {index.lastname}</h4>
        </div>
      )
    };
    return (
      <div>
        <form id="searchForm" onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.onChange} value={this.state.query}></input>
          <input type="submit"></input>
        </form>
        {this.state.searchResults.map(userBlock)}
      </div>
   );
  }
});

module.exports = Discovery;
