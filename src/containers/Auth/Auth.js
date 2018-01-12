import React, {Component} from 'react';
import { connect }  from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import styles from './auth.css';

import * as actions from '../../store/actions/index';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Mail address',
          autoComplete: "off"
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        edited: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
          autoComplete: "off"
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        edited: false
      },
    }
  };

  checkValidity = (value, rules) => {
    let isValid = true;

    if (!rules) {
      return true;
    }
    if (rules.required) {
      isValid = value.trim() !== '' && isValid
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid
    }
    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid
    }
    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid
    }

    return isValid
  };

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        edited: true
      }
    };

    this.setState({
      controls: updatedControls
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value
    )
  };

  render() {
    const formElementsArr = Object.keys(this.state.controls).map(el => (
      <Input key={el}
             elementType={this.state.controls[el].elementType}
             elementConfig={this.state.controls[el].elementConfig}
             value={this.state.controls[el].value}
             invalid={!this.state.controls[el].valid}
             shouldValidate={this.state.controls[el].validation}
             edited={this.state.controls[el].edited}
             changed={(event) => this.inputChangedHandler(event, el)}
        />
    ));

    let form = (
      <form onSubmit={this.submitHandler}>
        {formElementsArr}
        <Button btnType="Success"
                // disabled={!this.state.formIsValid}
        >
          SUBMIT
        </Button>
      </form>
    );

    return (
      <div className={styles.Auth}>
        {form}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password))
  }
};

export default connect(null, mapDispatchToProps)(Auth);
