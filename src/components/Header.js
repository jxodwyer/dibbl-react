import React from 'react';
import Router from 'react-router';
import firebaseUtils from '../utils/firebaseUtils';
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

class HeaderComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {loggedIn: firebaseUtils.isLoggedIn()};
  }

  handleLogout(loggedIn) {
    this.setState({loggedIn: loggedIn});
  }

  componentWillMount() {
    firebaseUtils.onChange = this.handleLogout;
  }

  render() {
    var loginOrOut;
    var register;
    var account;
    if (this.state.loggedIn){
      register = null;
      account =<li><Link to="account" className="navbar-brand">My Account</Link></li>;
      loginOrOut = <li><Link to="logout" className="navbar-brand">Logout</Link></li>;
    } else {
      account = null;
      register = <li><Link to="register" className="navbar-brand">Register</Link></li>;
      loginOrOut = <li><Link to="login" className="navbar-brand">Login</Link></li>;
    }
    return (
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container">
          <div className="navbar-header">
            <Link to="home" className="navbar-brand">DIBBL</Link>
          </div>
          <ul className="nav navbar-nav pull-right">
            <li>
              <span className="glyphicon glyphicon-inbox notifIcon" aria-hidden="true"></span>
              <span className="notifNum">1</span>
            </li>
            <li><Link to="discovery" className="navbar-brand">Find an Expert</Link></li>
            {register}
            {account}
            {loginOrOut}
          </ul>
        </div>
      </nav>
    )
  }
}

HeaderComponent.displayName = 'HeaderComponent';

export default HeaderComponent;
