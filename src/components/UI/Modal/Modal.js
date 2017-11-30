import React from 'react';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';
import styles from './modal.css';
import classNames from 'classnames/bind';

const style = classNames.bind(styles);

const modal = (props) => {
  const className = style({
    Modal: true,
    show: props.show
  });

  return (
    <Aux>
      <Backdrop show={props.show} closeModal={props.closeSummary}/>
      <div className={className}>
        {props.children}
      </div>
    </Aux>
  );
};

export default modal;
