import React, {Component} from 'react';
import { connect }  from 'react-redux';
import {Redirect} from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import Aux from '../../hoc/Aux';

import styles from './auth.css';
import * as actions from '../../store/actions/index';
import {checkValidity} from "../../shared/utility";

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

  componentDidMount() {
    if(!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath('/')
    }
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: checkValidity(
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
          disabled={!this.state.formIsValid}
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

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = (
        <p>{this.props.error.message}</p>
      )
    }

    let authPage = (
      <Aux>
        {headerInfo}
        {errorMessage}
        {form}
        {switchInfo}
        {switchModeBtn}
      </Aux>
    );

    if (this.props.loading) {
      authPage = <Spinner/>
    } else if (this.props.isAuth) {
      authPage = <Redirect to={this.props.authRedirectPath}/>
    }

    return (
      <div className={styles.Auth}>
        {authPage}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.auth.error,
    loading: state.auth.loading,
    isAuth: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath,
    buildingBurger: state.burgerBuilder.building
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
