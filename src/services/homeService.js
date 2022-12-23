import axios from "axios";

const getProductList = (avatar_id) => {
    return axios.get('https://uiexercise.onemindindia.com/api/Product');
}
const addProduct = (payload) => {
    return axios.post('https://uiexercise.onemindindia.com/api/Product', payload);
}
const orderProduct = (payload) => {
    return axios.post('https://uiexercise.onemindindia.com/api/OrderProducts', payload);
}

const HomeService = {
    getProductList,
    addProduct,
    orderProduct
}
export default HomeService;