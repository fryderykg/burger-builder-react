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
      {controls.map((el) => (
        <BuildControl
          key={el.label}
          label={el.label}
          addIngredient={() => props.ingredientAdded(el.type)}
          removeIngredient={() => props.ingredientRemoved(el.type)}
          disabled={props.disabled[el.type]}/>
      ))}
    </div>
  );
};

export default buildControls;