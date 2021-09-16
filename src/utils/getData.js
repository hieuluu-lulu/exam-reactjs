/** @format */

export const LocalStorage = {
  setUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  },
  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  removeUser: () => {
    localStorage.removeItem('user');
  },
  setCart: (cart) => {
    localStorage.setItem('productCart', JSON.stringify(cart));
  },
  getCart: () => {
    const cart = localStorage.getItem('productCart');
    return cart ? JSON.parse(cart) : null;
  },
  removeCart: () => {
    localStorage.removeItem('productCart');
  },
};
