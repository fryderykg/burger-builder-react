import React, {Component} from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  showSummaryHandler = () => {
    if (this.props.isAuth) {
      this.setState({purchasing: true});
    } else {
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth')
    }
  };

  hideSummaryHandler = () => {
    this.setState({purchasing: false});
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push({pathname: '/checkout'})
  };

  componentDidMount() {
    // console.log(this.props);
    this.props.onInitIngredients();
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(ingKey => {
        return ingredients[ingKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
  }

  render() {
    const disabledInfo = {...this.props.ings};
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    // Build OrderSummary
    let orderSummary;

    if (this.props.ings) {
      orderSummary = <OrderSummary
        ingredients={this.props.ings}
        price={this.props.price}
        continuePurchasing={this.purchaseContinueHandler}
        cancelPurchasing={this.hideSummaryHandler}/>;
    }

    // Build Burger and BuildControls
    let burger = this.props.error ? <p>Ingredients can't bo loaded!</p> : <Spinner/>;
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings}/>
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ings)}
            showSummary={this.showSummaryHandler}
            price={this.props.price}
            isAuth={this.props.isAuth}
          />
        </Aux>
      );
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing}
               closeSummary={this.hideSummaryHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuth: state.auth.token !== null
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  }
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
