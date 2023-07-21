// export const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

// export const getAPIUrl = (endpoint) => API_BASE_URL + endpoint;

// export const POSTS = getAPIUrl('/todos')
// export const POSTS_DELETE = getAPIUrl('/todos/')

export const API_BASE_URL = 'https://dummyjson.com';
export const getAPIUrl = (endPoint) => {API_BASE_URL + endPoint};

export const PRODUCTS = getAPIUrl('/products')
export const CART = getAPIUrl('/carts')