var React = require('react');
var Authenticated = require('../../utils/authenticated');
var Router = require('react-router');
// var stripe = require('stripe')('sk_test_l30FERrHXVw4pz7LDQkVEHQI');
var Firebase = require('firebase');
var forge = "https://dibbl.firebaseio.com/"; //YOUR FIREBASE URL HERE
var ref = new Firebase(forge);
require('normalize.css');
require('styles/App.scss');
require('styles/Account.scss');

var Account = React.createClass({
  mixins: [Authenticated],
  getInitialState: function(){
    return ({
      cardNumber: '',
      cvc: '',
      expMonth: '',
      expYear: '',
    })
  },
  // cardNumberOnChange: function(e) {
  //   this.setState({cardNumber: e.target.value});
  // },
  // cvcOnChange: function(e) {
  //   this.setState({cvc: e.target.value});
  // },
  // expMOnChange: function(e) {
  //   this.setState({expMonth: e.target.value});
  // },
  // expYOnChange: function(e) {
  //   this.setState({expYear: e.target.value});
  // },
  // onSubmit: function(e) {
  //   e.preventDefault();
  //   Stripe.card.createToken($form, stripeResponseHandler);
  //   return false;
  //
  //   this.setState({
  //     cardNumber: this.state.cardNumber,
  //     cvc: this.state.cvc,
  //     expMonth: this.state.exp-month,
  //     expYear: this.state.exp-year,
  //   });
  // },
  // stripeResponseHandler: function(status, response) {
  //   if (response.error) {
  //     console.log('error in handler');
  //   } else {
  //     console.log(response);
  //     var token = response.id;
  //     stripe.customers.create({
  //       source: stripeToken,
  //       description: 'payinguser@example.com',
  //       metadata: {
  //         userId: userId,
  //       }
  //     }).then(function(customer) {
  //       usersRef.child(customer.metadata.userId).child('customerId').set(customer.id);
  //     });
  //   }
  // },
  render: function(){
    return (
      <div id="account">
        <h2>my account</h2>
        <h4>first name: <span id="firstname"></span></h4>
        <h4>last name: <span id="lastname"></span></h4>
        <div id="skills">
          <h4>my skills:</h4>
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
