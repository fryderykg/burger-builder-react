import React from 'react';
import styles from './burgerIngredient.css'

const BurgerIngredient = props => {
  let ingredient;

  switch (props.type) {
    case ('bread-bottom'):
      ingredient = <div className={styles.BreadBottom}></div>;
      break;
    case ('bread-top'):
      ingredient = (
        <div className={styles.BreadTop}>
          <div className={styles.Seeds1}></div>
          <div className={styles.Seeds2}></div>
        </div>
      );
      break;
    case ('meat'):
      ingredient = <div className={styles.Meat}></div>
      break;
    case ('salad'):
      ingredient = <div className={styles.Salad}></div>
      break;
    case ('bacon'):
      ingredient = <div className={styles.Bacon}></div>
      break;
    case ('cheese'):
      ingredient = <div className={styles.Cheese}></div>
      break;
    default:
      ingredient = null;
  }

  return (
    <div>
      {ingredient}
    </div>
  );
};

export default BurgerIngredient;
