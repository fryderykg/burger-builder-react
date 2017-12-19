import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
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
        value: '',
        validation: {
          required: true
        },
        valid: false,
        edited: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        edited: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        edited: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        edited: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        edited: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {displayValue: 'cheapest', value: 'cheapest'},
            {displayValue: 'fastest', value: 'fastest'}
          ],
        },
        value: 'cheapest',
        validation: {},
        valid: true
      },
    },
    formIsValid: false,
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

  checkValidity(value, rules) {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid
    }

    return isValid
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {...this.state.orderForm};
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };

    updatedFormElement.value = event.target.value;
    updatedFormElement.edited = true;

    updatedFormElement.valid =
      this.checkValidity(updatedFormElement.value, updatedFormElement.validation);

    updatedOrderForm[inputIdentifier] = updatedFormElement;

    // Check validity for all inputs
    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }


    this.setState({
      orderForm: updatedOrderForm,
      formIsValid: formIsValid
    })
  };

  render() {
    const formElementsArr = Object.keys(this.state.orderForm).map(el => (
      <Input key={el}
             elementType={this.state.orderForm[el].elementType}
             elementConfig={this.state.orderForm[el].elementConfig}
             value={this.state.orderForm[el].value}
             invalid={!this.state.orderForm[el].valid}
             shouldValidate={this.state.orderForm[el].validation}
             edited={this.state.orderForm[el].edited}
             changed={(event) => this.inputChangedHandler(event, el)}/>
    ));

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArr}
        <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
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

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    price: state.totalPrice
  }
};


export default connect(mapStateToProps)(withRouter(ContactData));
