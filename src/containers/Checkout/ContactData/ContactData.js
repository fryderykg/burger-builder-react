import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import axios from '../../../axios-orders';

import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';


import Styles from './contactData.css';

class ContactData extends Component {
  state ={
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  };

  orderHandler = (e) => {
    e.preventDefault();
    this.setState({
      loading: true
    });

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: 'Max',
        address: {
          street: 'test street',
          zipCode: '32145',
          country: 'Poland'
        },
        email: 'email@test.com'
      },
      deliveryMethod: 'fastest'
    };

    axios.post('/orders.json', order)
      .then(response => {
        console.log(response);
        this.setState({loading: false});
        this.props.history.push('/')
      })
      .catch(error => {
        this.setState({loading: false});
      });
  };

  render() {
    let form = (
      <form>
        <input type="text" name="name" placeholder="Your name"/>
        <input type="email" name="email" placeholder="Your email"/>
        <input type="text" name="street" placeholder="Street"/>
        <input type="text" name="postal" placeholder="Postal Code"/>
        <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner/>;
    }

    return (
      <div className={Styles.ContactData}>
        <h4>Enter you contact data</h4>
        {form}
      </div>
    );
  }
}

export default withRouter(ContactData);
