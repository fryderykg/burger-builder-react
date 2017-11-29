import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import styles from './burger.css';

const burger = (props) => {
  const transformedIngredients = Object.keys(props.ingredients)
    .map(ingKey => {
      return [...Array(props.ingredients[ingKey])].map((_, i) => {
        return <BurgerIngredient type={ingKey} key={ingKey + i}/>
      })
    });

  console.log(props.ingredients['meat']);

  return (
    <div className={styles.Burger}>
      <BurgerIngredient type="bread-top"/>
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom"/>
    </div>
  );
};

export default burger;
