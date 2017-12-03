import axios from 'axios';

const axiosOrders = axios.create({
  baseURL: 'https://burger-builder-123.firebaseio.com/'
});

export default axiosOrders;
