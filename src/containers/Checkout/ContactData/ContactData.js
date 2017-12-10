import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import axios from '../../../axios-orders';

import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';


import Styles from './contactData.css';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name'
        },
        value: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: ''
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip code'
        },
        value: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email'
        },
        value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {displayValue: 'cheapest', value: 'cheapest'},
            {displayValue: 'fastest', value: 'fastest'}
          ],
        },
        value: ''
      },
    },
    loading: false
  };

  orderHandler = (e) => {
    e.preventDefault();
    this.setState({loading: true});
    const formData = {};

    for (let element in this.state.orderForm) {
      formData[element] = this.state.orderForm[element].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
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

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {...this.state.orderForm};
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };

    updatedFormElement.value = event.target.value;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    this.setState({orderForm: updatedOrderForm})

  };

  render() {
    const formElementsArr = Object.keys(this.state.orderForm).map(el => (
      <Input key={el}
             elementType={this.state.orderForm[el].elementType}
             elementConfig={this.state.orderForm[el].elementConfig}
             value={this.state.orderForm[el].value}
             changed={(event) => this.inputChangedHandler(event, el)}/>
    ));

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArr}
        <Button btnType="Success">ORDER</Button>
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
