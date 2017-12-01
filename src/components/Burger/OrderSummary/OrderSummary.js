import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';
import styles from './orderSummary.css';

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
    .map(ingKey => {
      return (
        <li key={ingKey}>
          <span className={styles.IngredientName}>{ingKey}</span>: {props.ingredients[ingKey]}
        </li>
      );
    });

  return (
    <Aux>
      <h3>Your order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><strong>Total Price: {props.price}$</strong></p>
      <p>Continue to Checkout?</p>
      <Button btnType={'Danger'} clicked={props.cancelPurchasing}>Cancel</Button>
      <Button btnType={'Success'} clicked={props.continuePurchasing}>Continue</Button>
    </Aux>
  );
};

export default orderSummary;
