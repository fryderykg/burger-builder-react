import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import ContactData from './ContactData/ContactData';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {

  checkoutCanceledHandler = () => {
    this.props.history.goBack()
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data')
  };

  render() {
    let summary = <Redirect to="/"/>;

    if(this.props.ingredients) {
      summary = (
        <div>
          <CheckoutSummary
            ingredients={this.props.ingredients}
            checkoutCancelled={this.checkoutCanceledHandler}
            checkoutContinued={this.checkoutContinuedHandler}/>

          <Route path={this.props.match.path + '/contact-data'}
                 component={ContactData}/>
        </div>
      )
    }
    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients
  }
};

export default connect(mapStateToProps)(Checkout);
