import React from 'react';
import Styles from './order.css';

const Order = (props) => {
  // console.log(props.ingredients);
  let ingredients = [];

  for (let ingrName in props.ingredients) {
    ingredients.push({
      name: ingrName,
      amount: props.ingredients[ingrName]
    })
  }

  const ingredientsOutput = ingredients.map(ig => {
    return <span
      className={Styles.Ingredient}
      key={ig.name}>
      {ig.name} ({ig.amount})</span>;
  });

  return (
    <div className={Styles.Order}>
      <p>Ingredients: {ingredientsOutput}</p>
      <p>Price <strong>{props.price.toFixed(2)} $</strong></p>
    </div>
  );
};

export default Order;
