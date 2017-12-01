import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';
import styles from './modal.css';
import classNames from 'classnames/bind';

const style = classNames.bind(styles);

class Modal extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show
  }

  render() {
    const className = style({
      Modal: true,
      show: this.props.show
    });

    return (
      <Aux>
        <Backdrop show={this.props.show} closeBackdrop={this.props.closeSummary}/>
        <div className={className}>
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
