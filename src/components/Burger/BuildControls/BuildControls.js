import React from 'react';
import styles from './buildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
  { label: 'Salad', type: 'salad'},
  { label: 'Bacon', type: 'bacon'},
  { label: 'Cheese', type: 'cheese'},
  { label: 'Meat', type: 'meat'}
];

const buildControls = (props) => {
  return (
    <div className={styles.BuildControls}>
      <p>Current price: <strong>{props.price.toFixed(2)}$</strong></p>
      {controls.map((el) => (
        <BuildControl
          key={el.label}
          label={el.label}
          addIngredient={() => props.ingredientAdded(el.type)}
          removeIngredient={() => props.ingredientRemoved(el.type)}
          disabled={props.disabled[el.type]}/>
      ))}
      <button className={styles.OrderButton}
              disabled={!props.purchasable}
              onClick={props.showSummary}>
        Order now
      </button>
    </div>
  );
};

export default buildControls;
