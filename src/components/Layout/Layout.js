import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import styles from './layout.css';

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar openSideDrawer={this.sideDrawerToggleHandler}/>
        <SideDrawer
          show={this.state.showSideDrawer}
          closeSideDrawer={this.sideDrawerCloseHandler}/>
        <div>Backdrop</div>
        <main className={styles.Content}>
          {this.props.children}
        </main>
      </Aux>
    );
  }
}

export default Layout;
