var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var firebaseUtils = require('../utils/firebaseUtils');

var Main = React.createClass({
  getInitialState: function(){
    return {
      loggedIn: firebaseUtils.isLoggedIn()
    }
  },
  handleLogout: function(loggedIn){
    this.setState({
      loggedIn: loggedIn
    });
  },
  componentWillMount: function(){
    firebaseUtils.onChange = this.handleLogout;
  },
  render: function(){
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
      <span>
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
