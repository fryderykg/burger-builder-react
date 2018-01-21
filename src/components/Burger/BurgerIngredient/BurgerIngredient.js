import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './burgerIngredient.css';

class BurgerIngredient extends Component {
  render() {
    let ingredient;

    switch (this.props.type) {
      case ('bread-bottom'):
        ingredient = <div className={styles.BreadBottom}/>;
        break;
      case ('bread-top'):
        ingredient = (
          <div className={styles.BreadTop}>
            <div className={styles.Seeds1}/>
            <div className={styles.Seeds2}/>
          </div>
        );
        break;
      case ('meat'):
        ingredient = <div className={styles.Meat}/>;
        break;
      case ('lettuce'):
        ingredient = <div className={styles.Lettuce}/>;
        break;
      case ('bacon'):
        ingredient = <div className={styles.Bacon}/>;
        break;
      case ('cheese'):
        ingredient = <div className={styles.Cheese}/>;
        break;
      default:
        ingredient = null;
    }

    return ingredient;
  }
}

BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired
};

export default BurgerIngredient;
