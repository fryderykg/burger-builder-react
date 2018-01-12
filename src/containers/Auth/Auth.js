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
    },
    isSignup: true,
    formIsValid: false
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

    // Check validity for all inputs
    let formIsValid = true;
    for (let inputIdentifier in updatedControls) {
      formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
    }

    this.setState({
      controls: updatedControls,
      formIsValid: formIsValid
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    )
  };

  toggleAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        isSignup: !prevState.isSignup
      }
    })
  };

  render() {
    const headerInfo = (
      <h1>
        {this.state.isSignup
        ? "Register Account"
        : "Login to Your's Account"}
      </h1>
    );

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

    const form = (
      <form onSubmit={this.submitHandler}>
        {formElementsArr}
        <Button btnType="Success"
          // disabled={!this.state.formIsValid}
        >
          {this.state.isSignup ? "REGISTER" : "LOGIN"}
        </Button>
      </form>
    );

    const switchInfo = (
      <div>
        {this.state.isSignup
        ? "Have a account?"
        : "Don't have a account?"}
      </div>
    );

    const switchModeBtn = (
      <Button
        btnType='Primary' clicked={this.toggleAuthModeHandler}>
        {this.state.isSignup ? "Go to login page" : "Go to register page"}
      </Button>
    );

    return (
      <div className={styles.Auth}>
        {headerInfo}
        {form}
        {switchInfo}
        {switchModeBtn}
      </div>
    );
  }
}



const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
  }
};

export default connect(null, mapDispatchToProps)(Auth);
