import React from 'react';
import Aux from '../../../hoc/Aux';
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
      <p>Continue to Checkout?</p>
    </Aux>
  );
};

export default orderSummary;
