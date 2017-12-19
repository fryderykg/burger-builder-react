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
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false
  };

  showSummaryHandler = () => {
    this.setState({purchasing: true});
  };

  hideSummaryHandler = () => {
    this.setState({purchasing: false});
  };

  purchaseContinueHandler = () => {
    const queryParams = [];
    for (let el in this.state.ingredients) {
      queryParams.push(encodeURIComponent(el) + '='
        + encodeURIComponent(this.state.ingredients[el]));
    }
    queryParams.push('price=' + this.props.price);

    const queryString = queryParams.join('&');

    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString

    })
  };

  componentDidMount() {
    // console.log(this.props);
    // const URL = 'https://burger-builder-123.firebaseio.com/ingredients.json';
    // axios.get(URL)
    //   .then(response => {
    //     this.setState({ingredients: response.data});
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
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
    if (this.state.loading) {
      orderSummary = <Spinner/>;
    } else if (this.props.ings) {
      orderSummary = <OrderSummary
        ingredients={this.props.ings}
        price={this.props.price}
        continuePurchasing={this.purchaseContinueHandler}
        cancelPurchasing={this.hideSummaryHandler}/>;
    }

    // Build Burger and BuildControls
    let burger = <Spinner/>;
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
            price={this.props.price}/>
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
    ings: state.ingredients,
    price: state.totalPrice
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch({
      type: actionTypes.ADD_INGREDIENT,
      ingredientName: ingName
    }),
    onIngredientRemoved: (ingName) => dispatch({
      type: actionTypes.REMOVE_INGREDIENT,
      ingredientName: ingName
    })
  }
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
