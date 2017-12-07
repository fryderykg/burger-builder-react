import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios-orders';

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };

  componentDidMount() {

    axios.get('/orders.json')
      .then(res => {
        console.log(res);
        const fetchOrders = [];
        for (let key in res.data) {
          fetchOrders.push({
            id: key,
            ...res.data[key]
          })
        }
        this.setState({
          loading: false,
          orders: fetchOrders
        });

      })
      .catch(err => {
        this.setState({loading: false});
        console.log(err);
      })

  }

  render() {
    return (
      <div>
        {this.state.orders.map(order => (
          <Order key={order.id}
                 price={order.price}
                 ingredients={order.ingredients}
                 customer={order.customer}/>
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
