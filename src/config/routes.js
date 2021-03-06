
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Main = require('../components/Main');
var Register = require('../components/login-register/Register');
var Login = require("../components/login-register/Login");
var Logout = require('../components/login-register/Logout');
var Account = require('../components/secure/Account');
var Discovery = require('../components/secure/Discovery');
var Room = require("../components/secure/Room");
var Home = require("../components/Home");
var Header = require("../components/Header");


var routes = (
  <Route handler={Main} >
    <Route name="login" handler={Login} />
    <Route name="logout" handler={Logout} />
    <Route name="register" handler={Register} />
    <Route name="account" handler={Account} />
    <Route name="discovery" handler={Discovery} />
    <Route name="room" path="room" handler={Room} />
    <Route name="home" path="/" handler={Home} />
    <Route name="header" handler={Header} />
  </Route>
);

module.exports = routes;
