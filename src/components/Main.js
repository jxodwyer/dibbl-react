require('normalize.css');
require('styles/App.css');

import React from 'react';
import Search from './Search';

let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {

  componentWillMount() {
    var users = [];
    this.firebaseRef = new Firebase("https://dibbl.firebaseio.com/users");
    this.firebaseRef.on("child_added", function(snapshot) {
      this.users.push(snapshot.val());
      this.setState({
        users: this.users
      });
    }.bind(this));
  }

  render() {
    return (
      <div className="index">
        <img src={yeomanImage} alt="Yeoman Generator" />
        <Search users={this.state.users} />
        <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
