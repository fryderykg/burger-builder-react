import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import styles from './burger.css';

const burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map(ingKey => {
      return [...Array(props.ingredients[ingKey])].map((_, i) => {
        return <BurgerIngredient type={ingKey} key={ingKey + i}/>
      })
    })
    .reduce((arr, el) => {
    return arr.concat(el)
    }, []);


  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>
  }

  return (
    <div className={styles.Burger}>
      <BurgerIngredient type="bread-top"/>
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom"/>
    </div>
  );
};

export default burger;
