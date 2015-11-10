import React from 'react';
import Authenticated from '../../utils/authenticated';
import Router from 'react-router';
import Firebase from 'firebase';
import FirebaseUtils from '../../utils/firebaseUtils';

// var stripe = require('stripe')('sk_test_l30FERrHXVw4pz7LDQkVEHQI');

var forge = "https://dibbl.firebaseio.com/"; //YOUR FIREBASE URL HERE
var ref = new Firebase(forge);
require('normalize.css');
require('styles/App.scss');
require('styles/Account.scss');

var Account = React.createClass({
  mixins: [Authenticated],
  getInitialState: function(){
    return ({
      currentUserObj: FirebaseUtils.isLoggedIn(),
      firstname: '',
      lastname: '',
      email: '',
      skills: '',
      customerId: '',
    })
  },
  componentWillMount: function() {
    ref.child('users').child(this.state.currentUserObj.uid).once("value", function(snapshot){
      var user = snapshot.val();
      this.setState({
        currentUserObj: user,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        skills: user.skills,
        customerId: user.customerId,
      });
    }.bind(this));
  },
  render: function(){
    return (
      <div id="account">
        <h2>my account</h2>
        <h4>first name: <span id="firstname">{this.state.firstname}</span></h4>
        <h4>last name: <span id="lastname">{this.state.lastname}</span></h4>
        <h4>email: <span id="email">{this.state.email}</span></h4>
        <div id="skills">
          <h4>my skills:</h4>
          {this.state.skills}
        </div>
        <form id="skillsForm">
          <input type="text" id="skill" placeholder="area of expertise" />
          <input type="submit" value="add" />
        </form>
        <div className="saved-cards">
          saved cards
        </div>
        <hr />
        <h4>Your Billing Info</h4>
        <span className="payment-errors"></span>
        <form onSubmit={this.onSubmit}>
          <input type="text" size="20" data-stripe="number" value={this.state.cardNumber} onChange={this.cardNumberOnChange}/>
          <input type="text" size="4" data-stripe="cvc" value={this.state.cvc} onChange={this.cvcOnChange}/>
          <input type="text" size="2" data-stripe="exp-month" value={this.state.expMonth} onChange={this.expMOnChange}/>
          <span> / </span>
          <input type="text" size="4" data-stripe="exp-year" value={this.state.expYear} onChange={this.expYOnChange}/>
          <input type="submit" />
        </form>
      </div>
   );
  }
});

module.exports = Account;
