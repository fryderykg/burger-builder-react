import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: .5,
  cheese: .4,
  meat: 1.3,
  bacon: .7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false
  };

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = oldCount + 1;

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = Math.round((oldPrice + priceAddition) * 10) / 10;
    this.updatePurchaseState(updatedIngredients);

    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];

    if (oldCount <= 0) {
      return;
    }

    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = oldCount - 1;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = Math.round((oldPrice - priceDeduction) * 10) / 10;
    this.updatePurchaseState(updatedIngredients);

    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });
  };

  showSummaryHandler = () => {
    this.setState({ purchasing: true });
  };

  hideSummaryHandler = () => {
    this.setState({ purchasing: false });
  };


  purchaseContinueHandler = () => {
    alert('you continue');
  };

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(ingKey => {
        return ingredients[ingKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    this.setState({ purchasable: sum > 0 });
  }

  render() {
    const disabledInfo = { ...this.state.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} closeSummary={this.hideSummaryHandler}>
          <OrderSummary ingredients={this.state.ingredients}
                        continuePurchasing={this.purchaseContinueHandler}
                        cancelPurchasing={this.hideSummaryHandler}/>
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          purchasable={this.state.purchasable}
          showSummary={this.showSummaryHandler}
          price={this.state.totalPrice}/>
      </Aux>
    );
  }
}

export default BurgerBuilder;
