require('normalize.css');
require('styles/App.scss');

import React from 'react';


var SearchComponent = React.createClass({
  render() {
    // console.log(this.props.users);
    // var userNodes = this.props.users.map(function(user){
    //   return (
    //     <UserInfo>
    //       {this.props.children}
    //     </UserInfo>
    //   );
    // });
    return (
      <div className="search">
        {userNodes}
      </div>
    );
  }
});

export default SearchComponent;
