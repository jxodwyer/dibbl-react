require('normalize.css');
require('styles/App.css');

import React from 'react';
import Search from './search';

let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
  componentWillMount() {
    this.firebaseRef = new Firebase("https://dibbl.firebaseio.com/users");
    this.firebaseRef.on("child_added", function(snapshot) {
      var users = [];
      users.push(snapshot.val());
      this.setState({
        users: users,
      });
    }.bind(this));
  };
  render() {
    return (
      <div className="index">
        <img src={yeomanImage} alt="Yeoman Generator" />
        <Search />
        <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
